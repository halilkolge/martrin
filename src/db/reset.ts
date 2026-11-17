import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("DATABASE_URL tanımlı değil; db:reset çalıştırılmadı.");
  process.exit(1);
}

let databaseHost: string;

try {
  databaseHost = new URL(databaseUrl).hostname;
} catch {
  console.error("DATABASE_URL geçerli bir URL değil; db:reset çalıştırılmadı.");
  process.exit(1);
}

if (databaseHost !== "localhost" && databaseHost !== "127.0.0.1") {
  console.error(
    `db:reset yalnızca localhost veya 127.0.0.1 üzerinde çalışır (alınan host: ${databaseHost}).`,
  );
  process.exit(1);
}

const { sql } = await import("./client");

await sql`DROP SCHEMA public CASCADE`;
await sql`DROP SCHEMA IF EXISTS drizzle CASCADE`;
await sql`CREATE SCHEMA public`;
await sql.end();
const { spawnSync } = await import("node:child_process");
const migration = spawnSync("pnpm", ["db:migrate"], { stdio: "inherit" });
if (migration.status !== 0) process.exit(migration.status ?? 1);
const seed = spawnSync("pnpm", ["db:seed"], { stdio: "inherit" });
process.exit(seed.status ?? 1);
