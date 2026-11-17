import {
  and,
  asc,
  count,
  desc,
  eq,
  exists,
  gte,
  sql,
  type SQL,
  type SQLWrapper,
} from "drizzle-orm";

import { db } from "@/db/client";
import { influencerPlatforms, packages } from "@/db/schema/influencers";
import { influencerProfiles, users } from "@/db/schema/users";
import type { InfluencerSearchParams, Platform } from "@/lib/search-params";

export type InfluencerCard = {
  id: string;
  displayName: string;
  handle: string;
  city: string;
  niche: string;
  avatarUrl: string | null;
  totalFollowers: number;
  platforms: Platform[];
  minPriceKurus: number | null;
  verified: boolean;
};

export const INFLUENCER_PAGE_SIZE = 20;

const totalFollowersExpression = sql<number>`coalesce((
  select sum(${influencerPlatforms.followers})::int
  from ${influencerPlatforms}
  where ${influencerPlatforms.profileId} = ${influencerProfiles.id}
), 0)`;
const platformsExpression = sql<Platform[]>`coalesce((
  select array_agg(${influencerPlatforms.platform} order by ${influencerPlatforms.platform})
  from ${influencerPlatforms}
  where ${influencerPlatforms.profileId} = ${influencerProfiles.id}
), ARRAY[]::social_platform[])`;
const minPriceExpression = sql<number | null>`(
  select min(${packages.priceKurus})
  from ${packages}
  where ${packages.profileId} = ${influencerProfiles.id}
    and ${packages.active} = true
)`;

function normalizeForSearch(column: SQLWrapper): SQL {
  return sql`translate(replace(lower(${column}), '̇', ''), 'ı', 'i')`;
}

function escapeLikePattern(value: string): string {
  return value.replace(/[\\%_]/g, "\\$&");
}

function getConditions(params: InfluencerSearchParams): SQL[] {
  const conditions: SQL[] = [];

  if (params.gender)
    conditions.push(eq(influencerProfiles.gender, params.gender));
  if (params.city) conditions.push(eq(influencerProfiles.city, params.city));
  if (params.niche) conditions.push(eq(influencerProfiles.niche, params.niche));
  if (params.skill) {
    conditions.push(
      sql`${influencerProfiles.skills} @> ARRAY[${params.skill}]::text[]`,
    );
  }
  if (params.platform) {
    conditions.push(
      exists(
        db
          .select({ id: influencerPlatforms.id })
          .from(influencerPlatforms)
          .where(
            and(
              eq(influencerPlatforms.profileId, influencerProfiles.id),
              eq(influencerPlatforms.platform, params.platform),
            ),
          ),
      ),
    );
  }
  if (params.minFollowers) {
    conditions.push(gte(totalFollowersExpression, params.minFollowers));
  }
  if (params.q) {
    const pattern = `%${escapeLikePattern(params.q.trim())}%`;
    conditions.push(
      sql`(
        ${normalizeForSearch(users.displayName)} LIKE ${normalizeForSearch(sql`${pattern}`)} ESCAPE '\\'
        OR ${normalizeForSearch(influencerProfiles.handle)} LIKE ${normalizeForSearch(sql`${pattern}`)} ESCAPE '\\'
        OR ${normalizeForSearch(influencerProfiles.niche)} LIKE ${normalizeForSearch(sql`${pattern}`)} ESCAPE '\\'
        OR ${normalizeForSearch(influencerProfiles.city)} LIKE ${normalizeForSearch(sql`${pattern}`)} ESCAPE '\\'
      )`,
    );
  }
  return conditions;
}

/**
 * Builds the public card query. Its Drizzle `toSQL()` output is available for EXPLAIN.
 * Only fields in InfluencerCard are selected; user contact and credential fields are excluded.
 */
export function createInfluencerSearchQuery(
  params: InfluencerSearchParams = {},
) {
  const page = params.page ?? 1;
  const query = db
    .select({
      id: influencerProfiles.id,
      displayName: users.displayName,
      handle: influencerProfiles.handle,
      city: influencerProfiles.city,
      niche: influencerProfiles.niche,
      avatarUrl: influencerProfiles.avatarUrl,
      totalFollowers: totalFollowersExpression,
      platforms: platformsExpression,
      minPriceKurus: minPriceExpression,
      verified: influencerProfiles.verified,
    })
    .from(influencerProfiles)
    .innerJoin(users, eq(influencerProfiles.userId, users.id))
    .where(and(...getConditions(params)));

  if (params.sort === "price") {
    return query
      .orderBy(asc(minPriceExpression), desc(totalFollowersExpression))
      .limit(INFLUENCER_PAGE_SIZE)
      .offset((page - 1) * INFLUENCER_PAGE_SIZE);
  }
  return query
    .orderBy(desc(totalFollowersExpression), asc(influencerProfiles.handle))
    .limit(INFLUENCER_PAGE_SIZE)
    .offset((page - 1) * INFLUENCER_PAGE_SIZE);
}

export async function searchInfluencers(
  params: InfluencerSearchParams = {},
): Promise<{
  items: InfluencerCard[];
  total: number;
  page: number;
  pageSize: 20;
}> {
  const conditions = getConditions(params);
  const [items, countRows] = await Promise.all([
    createInfluencerSearchQuery(params),
    db
      .select({ total: count() })
      .from(influencerProfiles)
      .innerJoin(users, eq(influencerProfiles.userId, users.id))
      .where(and(...conditions)),
  ]);

  return {
    items,
    total: countRows[0]?.total ?? 0,
    page: params.page ?? 1,
    pageSize: INFLUENCER_PAGE_SIZE,
  };
}
