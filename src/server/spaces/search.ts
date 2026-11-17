import { and, asc, count, eq, inArray, lte, sql, type SQL } from "drizzle-orm";

import { db } from "@/db/client";
import { spacePrices, spaces, type spaceType } from "@/db/schema/spaces";
import type { SpaceSearchParams, SpaceType } from "@/lib/search-params";

export type SpaceCard = {
  id: string;
  title: string;
  type: SpaceType;
  city: string;
  district: string;
  lat: number;
  lng: number;
  photoUrl: string | null;
  digital: boolean;
  lit: boolean;
  minPriceKurus: number | null;
  minPriceUnit: string | null;
  distanceM?: number;
};

export const SPACE_PAGE_SIZE = 20;
const spacesIdExpression = sql`${sql.identifier("spaces")}.${sql.identifier("id")}`;
const spacesLocationExpression = sql`${sql.identifier("spaces")}.${sql.identifier("location")}`;
const minPriceExpression = sql<number>`(
  select ${spacePrices.priceKurus}
  from ${spacePrices}
  where ${spacePrices.spaceId} = ${spacesIdExpression}
  order by ${spacePrices.priceKurus} asc, ${spacePrices.unit} asc
  limit 1
)`;
const minPriceUnitExpression = sql<string>`(
  select ${spacePrices.unit}
  from ${spacePrices}
  where ${spacePrices.spaceId} = ${spacesIdExpression}
  order by ${spacePrices.priceKurus} asc, ${spacePrices.unit} asc
  limit 1
)`;

function getConditions(params: SpaceSearchParams): SQL[] {
  const conditions: SQL[] = [eq(spaces.status, "active")];
  if (params.city) conditions.push(eq(spaces.city, params.city));
  if (params.types?.length)
    conditions.push(
      inArray(
        spaces.type,
        params.types as (typeof spaceType.enumValues)[number][],
      ),
    );
  if (params.maxPriceKurus !== undefined)
    conditions.push(lte(minPriceExpression, params.maxPriceKurus));
  if (params.digital) conditions.push(eq(spaces.digital, true));
  if (params.near) {
    const { lat, lng, km } = params.near;
    conditions.push(sql`ST_DWithin(
      ${spacesLocationExpression}::geography,
      ST_MakePoint(${lng}, ${lat})::geography,
      ${km} * 1000
    )`);
  }
  return conditions;
}

export function createSpaceSearchQuery(params: SpaceSearchParams = {}) {
  const page = params.page ?? 1;
  const conditions = getConditions(params);
  const distanceExpression = params.near
    ? sql<number>`ST_Distance(
        ${spacesLocationExpression}::geography,
        ST_MakePoint(${params.near.lng}, ${params.near.lat})::geography
      )`
    : undefined;
  const itemQuery = db
    .select({
      id: spaces.id,
      title: spaces.title,
      type: spaces.type,
      city: spaces.city,
      district: spaces.district,
      lat: sql<number>`ST_Y(${spaces.location})`,
      lng: sql<number>`ST_X(${spaces.location})`,
      photoUrl: spaces.photoUrl,
      digital: spaces.digital,
      lit: spaces.lit,
      minPriceKurus: minPriceExpression,
      minPriceUnit: minPriceUnitExpression,
      ...(distanceExpression ? { distanceM: distanceExpression } : {}),
    })
    .from(spaces)
    .where(and(...conditions));

  if (distanceExpression && (!params.sort || params.sort === "distance")) {
    itemQuery.orderBy(asc(distanceExpression), asc(spaces.id));
  } else if (params.sort === "price") {
    itemQuery.orderBy(
      sql`${minPriceExpression} ASC NULLS LAST`,
      asc(spaces.id),
    );
  } else {
    itemQuery.orderBy(asc(spaces.city), asc(spaces.title));
  }

  return itemQuery.limit(SPACE_PAGE_SIZE).offset((page - 1) * SPACE_PAGE_SIZE);
}

export async function searchSpaces(params: SpaceSearchParams = {}): Promise<{
  items: SpaceCard[];
  total: number;
  page: number;
  pageSize: 20;
}> {
  const page = params.page ?? 1;
  const conditions = getConditions(params);

  const [items, countRows] = await Promise.all([
    createSpaceSearchQuery(params),
    db
      .select({ total: count() })
      .from(spaces)
      .where(and(...conditions)),
  ]);

  return {
    items: items as SpaceCard[],
    total: countRows[0]?.total ?? 0,
    page,
    pageSize: SPACE_PAGE_SIZE,
  };
}
