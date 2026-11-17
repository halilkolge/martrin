import "dotenv/config";

import { sql } from "./client";

await sql`DROP SCHEMA public CASCADE`;
await sql`CREATE SCHEMA public`;
await sql.end();
const { spawnSync } = await import("node:child_process");
const migration = spawnSync("pnpm", ["db:migrate"], { stdio: "inherit" });
if (migration.status !== 0) process.exit(migration.status ?? 1);
const seed = spawnSync("pnpm", ["db:seed"], { stdio: "inherit" });
process.exit(seed.status ?? 1);
