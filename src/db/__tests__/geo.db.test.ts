import { afterAll, describe, expect, it } from "vitest";

import { sql } from "../client";

describe("PostGIS alan araması", () => {
  afterAll(async () => sql.end());

  it("Taksim yakınını döndürür, Kadıköy'ü dışarıda bırakır", async () => {
    const results = await sql<{ title: string }[]>`
      SELECT title FROM spaces
      WHERE ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(28.985, 41.0369), 4326)::geography, 5000)
    `;
    const titles = results.map((row) => row.title);
    expect(titles).toContain("Taksim Işıklı Billboard");
    expect(titles).not.toContain("Kadıköy Sahil Billboard");
  }, 30_000);
});
