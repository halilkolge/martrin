import { afterAll, describe, expect, it } from "vitest";
import { and, eq } from "drizzle-orm";

import { db, sql } from "@/db/client";
import { packages } from "@/db/schema/influencers";
import { influencerProfiles } from "@/db/schema/users";
import { searchInfluencers } from "./search";

const expectedHandles = {
  female: [
    "elifmutfakta",
    "denizsokakta",
    "selinfit",
    "zeynepgunluk",
    "ecekomedi",
  ],
  istanbul: ["elifmutfakta", "buraklive"],
  food: ["elifmutfakta"],
  reels: [
    "elifmutfakta",
    "denizsokakta",
    "selinfit",
    "zeynepgunluk",
    "ecekomedi",
  ],
  instagram: [
    "elifmutfakta",
    "denizsokakta",
    "mertteknoloji",
    "selinfit",
    "kaanyolda",
    "zeynepgunluk",
    "ecekomedi",
  ],
  atLeast500000: ["elifmutfakta", "denizsokakta", "mertteknoloji", "ecekomedi"],
  istanbulWomen: ["elifmutfakta"],
};

async function handlesFor(params: Parameters<typeof searchInfluencers>[0]) {
  const result = await searchInfluencers(params);
  return result.items.map((item) => item.handle).sort();
}

async function orderedHandles(params: Parameters<typeof searchInfluencers>[0]) {
  const result = await searchInfluencers(params);
  return result.items.map((item) => item.handle);
}

describe("searchInfluencers", () => {
  it("her desteklenen filtreyi ve bir ikili birleşimi uygular", async () => {
    expect(await handlesFor({ gender: "female" })).toEqual(
      [...expectedHandles.female].sort(),
    );
    expect(await handlesFor({ city: "İstanbul" })).toEqual(
      [...expectedHandles.istanbul].sort(),
    );
    expect(await handlesFor({ niche: "Yemek & Tarif" })).toEqual(
      [...expectedHandles.food].sort(),
    );
    expect(await handlesFor({ skill: "Reels" })).toEqual(
      [...expectedHandles.reels].sort(),
    );
    expect(await handlesFor({ platform: "instagram" })).toEqual(
      [...expectedHandles.instagram].sort(),
    );
    expect(await handlesFor({ minFollowers: 500_000 })).toEqual(
      [...expectedHandles.atLeast500000].sort(),
    );
    expect(await handlesFor({ gender: "female", city: "İstanbul" })).toEqual(
      [...expectedHandles.istanbulWomen].sort(),
    );
  });

  it("Türkçe şehir aramasında I, ı, i ve İ yazımlarını eşler", async () => {
    const expected = ["buraklive", "elifmutfakta"];

    for (const query of [
      "istanbul",
      "İSTANBUL",
      "Istanbul",
      "ISTANBUL",
      "ıstanbul",
    ]) {
      expect(await handlesFor({ q: query })).toEqual(expected);
    }
  });

  it("takipçiyi azalan, aktif paket fiyatını artan sıralar", async () => {
    const followers = await orderedHandles({ sort: "followers" });
    const prices = await orderedHandles({ sort: "price" });

    expect(followers).toEqual([
      "ecekomedi",
      "elifmutfakta",
      "mertteknoloji",
      "denizsokakta",
      "kaanyolda",
      "buraklive",
      "zeynepgunluk",
      "selinfit",
    ]);
    expect(prices).toEqual([
      "selinfit",
      "zeynepgunluk",
      "buraklive",
      "denizsokakta",
      "mertteknoloji",
      "elifmutfakta",
      "kaanyolda",
      "ecekomedi",
    ]);
  });

  it("yalnızca açık InfluencerCard alanlarını döndürür", async () => {
    const result = await searchInfluencers();

    expect(result.items.length).toBeGreaterThan(0);
    for (const item of result.items) {
      expect(item).not.toHaveProperty("email");
      expect(item).not.toHaveProperty("phone");
      expect(item).not.toHaveProperty("passwordHash");
      expect(Object.keys(item).sort()).toEqual(
        [
          "id",
          "displayName",
          "handle",
          "city",
          "niche",
          "avatarUrl",
          "totalFollowers",
          "platforms",
          "minPriceKurus",
          "verified",
        ].sort(),
      );
    }
  });

  it("aktif paketi olmayanları fiyat sıralamasında sona bırakır", async () => {
    const [profile] = await db
      .select({ id: influencerProfiles.id })
      .from(influencerProfiles)
      .where(eq(influencerProfiles.handle, "ecekomedi"));
    expect(profile).toBeDefined();
    if (!profile) return;

    const deactivated = await db
      .update(packages)
      .set({ active: false })
      .where(and(eq(packages.profileId, profile.id), eq(packages.active, true)))
      .returning({ id: packages.id });
    try {
      const result = await searchInfluencers({ sort: "price" });
      expect(result.items.at(-1)?.handle).toBe("ecekomedi");
      expect(result.items.at(-1)?.minPriceKurus).toBeNull();
    } finally {
      for (const row of deactivated) {
        await db
          .update(packages)
          .set({ active: true })
          .where(eq(packages.id, row.id));
      }
    }
  });

  afterAll(async () => {
    await sql.end();
  });
});
