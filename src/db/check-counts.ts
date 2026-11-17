import "dotenv/config";

import { sql } from "./client";
import { SEED_COUNTS } from "./seed-data";

const expected = SEED_COUNTS;

try {
  const [actual] = await sql<
    {
      users: number;
      spaces: number;
      packages: number;
    }[]
  >`
    SELECT
      (SELECT count(*)::integer FROM users) AS users,
      (SELECT count(*)::integer FROM spaces) AS spaces,
      (SELECT count(*)::integer FROM packages) AS packages
  `;

  if (!actual) {
    throw new Error("Tablo satır sayıları alınamadı.");
  }

  const mismatches = Object.entries(expected).filter(
    ([table, count]) => actual[table as keyof typeof expected] !== count,
  );

  if (mismatches.length > 0) {
    for (const [table, count] of mismatches) {
      console.error(
        `${table}: beklenen ${count}, alınan ${actual[table as keyof typeof expected]}`,
      );
    }
    process.exitCode = 1;
  } else {
    const summary = Object.entries(expected)
      .map(([table, count]) => `${table}=${count}`)
      .join(", ");
    console.log(`Satır sayıları doğru: ${summary}.`);
  }
} finally {
  await sql.end();
}
