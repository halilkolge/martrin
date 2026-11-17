import "dotenv/config";

import { sql } from "./client";

const expected = { users: 9, spaces: 6, packages: 8 };

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
    console.log("Satır sayıları doğru: users=9, spaces=6, packages=8.");
  }
} finally {
  await sql.end();
}
