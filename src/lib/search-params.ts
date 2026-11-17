export const SOCIAL_PLATFORMS = [
  "instagram",
  "tiktok",
  "youtube",
  "x",
  "linkedin",
  "twitch",
  "kick",
] as const;

export type Platform = (typeof SOCIAL_PLATFORMS)[number];
export type InfluencerSort = "popular" | "followers" | "price";
export type InfluencerSearchParams = {
  q?: string;
  gender?: "female" | "male" | "other";
  city?: string;
  niche?: string;
  skill?: string;
  platform?: Platform;
  minFollowers?: number;
  sort?: InfluencerSort;
  page?: number;
};

const GENDERS = ["female", "male", "other"] as const;
const FOLLOWER_MINIMUMS = [5_000, 50_000, 100_000, 250_000, 500_000, 1_000_000];
const SORTS = ["popular", "followers", "price"] as const;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function parseInfluencerSearchParams(
  input: Record<string, string | string[] | undefined>,
): InfluencerSearchParams {
  const result: InfluencerSearchParams = {};
  const q = firstValue(input.q)?.trim();
  const gender = firstValue(input.gender);
  const city = firstValue(input.city)?.trim();
  const niche = firstValue(input.niche)?.trim();
  const skill = firstValue(input.skill)?.trim();
  const platform = firstValue(input.platform);
  const min = firstValue(input.min);
  const sort = firstValue(input.sort);
  const page = firstValue(input.page);

  if (q) result.q = q.slice(0, 120);
  if (GENDERS.some((value) => value === gender)) {
    result.gender = gender as InfluencerSearchParams["gender"];
  }
  if (city && city.length <= 80) result.city = city;
  if (niche && niche.length <= 80) result.niche = niche;
  if (skill && skill.length <= 80) result.skill = skill;
  if (SOCIAL_PLATFORMS.some((value) => value === platform)) {
    result.platform = platform as Platform;
  }

  const minFollowers = Number(min);
  if (FOLLOWER_MINIMUMS.includes(minFollowers)) {
    result.minFollowers = minFollowers;
  }
  if (SORTS.some((value) => value === sort)) {
    result.sort = sort as InfluencerSort;
  }
  const pageNumber = Number(page);
  if (Number.isSafeInteger(pageNumber) && pageNumber > 0) {
    result.page = Math.min(pageNumber, 1_000_000);
  }

  return result;
}

export function buildInfluencerSearchUrl(
  params: InfluencerSearchParams,
): string {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.gender) search.set("gender", params.gender);
  if (params.city) search.set("city", params.city);
  if (params.niche) search.set("niche", params.niche);
  if (params.skill) search.set("skill", params.skill);
  if (params.platform) search.set("platform", params.platform);
  if (params.minFollowers && params.minFollowers > 5_000) {
    search.set("min", String(params.minFollowers));
  }
  if (params.sort && params.sort !== "popular") {
    search.set("sort", params.sort);
  }
  if (params.page && params.page > 1) search.set("page", String(params.page));
  const query = search.toString();
  return query ? `/influencerlar?${query}` : "/influencerlar";
}
