import { afterAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { sql as drizzleSql } from "drizzle-orm";

import { db, sql } from "@/db/client";
import { spaces } from "@/db/schema/spaces";
import { createSpaceSearchQuery, searchSpaces } from "./search";

const expectedTitles = {
  istanbul: [
    "Taksim Işıklı Billboard",
    "Kadıköy Sahil Billboard",
    "Kentpark Dev LED",
  ],
  billboardAndAvm: [
    "Taksim Işıklı Billboard",
    "Kadıköy Sahil Billboard",
    "Kentpark Dev LED",
  ],
  under500Lira: ["Alsancak Dijital Ekran", "Kentpark Dev LED"],
  digital: ["Alsancak Dijital Ekran", "Kentpark Dev LED"],
  taksimFiveKm: ["Taksim Işıklı Billboard"],
  taksimTenKm: ["Taksim Işıklı Billboard", "Kadıköy Sahil Billboard"],
  byPrice: [
    "Alsancak Dijital Ekran",
    "Kentpark Dev LED",
    "Kadıköy Sahil Billboard",
    "Kordon Megalight",
    "Kızılay CLP",
    "Taksim Işıklı Billboard",
  ],
};

async function titlesFor(params: Parameters<typeof searchSpaces>[0]) {
  const result = await searchSpaces(params);
  return result.items.map((item) => item.title).sort();
}

describe("searchSpaces", () => {
  it("SQL'de ilişkili fiyat ve konum ifadelerini dış tabloya bağlar", () => {
    const query = createSpaceSearchQuery({
      maxPriceKurus: 50_000,
      near: { lat: 41.0369, lng: 28.985, km: 5 },
      sort: "price",
    });
    const querySql = query.toSQL().sql;

    expect(querySql).toContain('"space_id" = "spaces"."id"');
    expect(querySql).toContain('"spaces"."location"::geography');
  });

  it("şehir, çoklu tip, fiyat ve dijital filtrelerinde beklenen alanları döndürür", async () => {
    expect(await titlesFor({ city: "İstanbul" })).toEqual(
      [...expectedTitles.istanbul].sort(),
    );
    expect(await titlesFor({ types: ["billboard", "avm_led"] })).toEqual(
      [...expectedTitles.billboardAndAvm].sort(),
    );
    expect(await titlesFor({ maxPriceKurus: 50_000 })).toEqual(
      [...expectedTitles.under500Lira].sort(),
    );
    expect(await titlesFor({ digital: true })).toEqual(
      [...expectedTitles.digital].sort(),
    );
  });

  it("Taksim yarıçapında yakın alanları mesafeye göre sıralar", async () => {
    const near = { lat: 41.0369, lng: 28.985, km: 5 };
    expect(await titlesFor({ near })).toEqual(expectedTitles.taksimFiveKm);
    const tenKm = await searchSpaces({ near: { ...near, km: 10 } });
    expect(tenKm.items.map((item) => item.title)).toEqual(
      expectedTitles.taksimTenKm,
    );
    expect(tenKm.items[0]?.distanceM).toBeLessThan(
      tenKm.items[1]?.distanceM ?? 0,
    );
  });

  it("taslak alanları listelemez", async () => {
    const [seedSpace] = await db
      .select({ ownerId: spaces.ownerId })
      .from(spaces)
      .where(eq(spaces.title, "Taksim Işıklı Billboard"));
    expect(seedSpace).toBeDefined();
    if (!seedSpace) return;

    const [draft] = await db
      .insert(spaces)
      .values({
        ownerId: seedSpace.ownerId,
        title: "Test Taslak Alan",
        type: "billboard",
        city: "İstanbul",
        district: "Beyoğlu",
        location: drizzleSql`ST_SetSRID(ST_MakePoint(28.985, 41.0369), 4326)`,
        widthCm: 1200,
        heightCm: 400,
        lit: true,
        digital: false,
        printOption: "extra",
        estDailyViews: 1,
        status: "draft",
      })
      .returning({ id: spaces.id });
    expect(draft).toBeDefined();
    if (!draft) return;
    try {
      expect(await titlesFor({ city: "İstanbul" })).toEqual(
        [...expectedTitles.istanbul].sort(),
      );
    } finally {
      await db.delete(spaces).where(eq(spaces.id, draft.id));
    }
  });

  it("yalnız SpaceCard alanlarını döndürür", async () => {
    const result = await searchSpaces();
    expect(result.items).toHaveLength(6);
    expect(result.items.every((item) => item.minPriceKurus !== null)).toBe(
      true,
    );

    const taksim = result.items.find(
      (item) => item.title === "Taksim Işıklı Billboard",
    );
    expect(taksim).toMatchObject({
      minPriceKurus: 7_800_000,
      minPriceUnit: "week",
    });

    for (const item of result.items) {
      expect(item).not.toHaveProperty("email");
      expect(item).not.toHaveProperty("phone");
      expect(item).not.toHaveProperty("passwordHash");
      expect(Object.keys(item).sort()).toEqual(
        [
          "id",
          "title",
          "type",
          "city",
          "district",
          "lat",
          "lng",
          "photoUrl",
          "digital",
          "lit",
          "minPriceKurus",
          "minPriceUnit",
        ].sort(),
      );
    }
  });

  it("fiyat sıralamasında alanları başlangıç fiyatına göre artan döndürür", async () => {
    const result = await searchSpaces({ sort: "price" });
    expect(result.items.map((item) => item.title)).toEqual(
      expectedTitles.byPrice,
    );
  });

  afterAll(async () => {
    await sql.end();
  });
});
