import { afterAll, describe, expect, it } from "vitest";

import { sql } from "../client";

describe("veritabanı kısıtları", () => {
  afterAll(async () => sql.end());

  it("order item içinde tam bir ürün bağlantısı ister", async () => {
    const [row] = await sql<{ id: string }[]>`SELECT id FROM orders LIMIT 1`;
    const [space] = await sql<{ id: string }[]>`SELECT id FROM spaces LIMIT 1`;
    const [pack] = await sql<{ id: string }[]>`SELECT id FROM packages LIMIT 1`;
    if (!row || !space || !pack)
      throw new Error("Test verisi eksik; önce pnpm db:seed çalıştırın");
    const begin = new Date("2026-12-01T00:00:00Z");
    const end = new Date("2026-12-02T00:00:00Z");
    await expect(
      sql`INSERT INTO order_items (order_id, item_type, space_id, package_id, start_date, end_date, price_kurus, commission_rate_bp) VALUES (${row.id}, 'space', ${space.id}, ${pack.id}, ${begin}, ${end}, 100, 100)`,
    ).rejects.toThrow();
    await expect(
      sql`INSERT INTO order_items (order_id, item_type, start_date, end_date, price_kurus, commission_rate_bp) VALUES (${row.id}, 'space', ${begin}, ${end}, 100, 100)`,
    ).rejects.toThrow();
  }, 30_000);

  it("negatif fiyatı reddeder", async () => {
    const [space] = await sql<{ id: string }[]>`SELECT id FROM spaces LIMIT 1`;
    if (!space)
      throw new Error("Test verisi eksik; önce pnpm db:seed çalıştırın");
    await expect(
      sql`INSERT INTO space_prices (space_id, unit, price_kurus) VALUES (${space.id}, 'event', -1)`,
    ).rejects.toThrow();
  });

  it("yinelenen e-posta ve alan fiyat birimini reddeder", async () => {
    await expect(
      sql`INSERT INTO users (email, role, display_name) VALUES ('yore@martrin.example', 'advertiser', 'İkinci')`,
    ).rejects.toThrow();
    const [price] = await sql<
      { space_id: string; unit: string }[]
    >`SELECT space_id, unit FROM space_prices LIMIT 1`;
    if (!price)
      throw new Error("Test verisi eksik; önce pnpm db:seed çalıştırın");
    await expect(
      sql`INSERT INTO space_prices (space_id, unit, price_kurus) VALUES (${price.space_id}, ${price.unit}, 100)`,
    ).rejects.toThrow();
  });
});
