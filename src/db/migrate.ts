import "dotenv/config";

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./client";

import { sql } from "./client";

await migrate(db, { migrationsFolder: "./drizzle" });
await sql.end();
