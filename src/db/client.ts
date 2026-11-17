import "dotenv/config";

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema/index";

const databaseUrl =
  process.env.DATABASE_URL ??
  "postgres://martrin:martrin@localhost:5432/martrin";
const sql = postgres(databaseUrl, { max: 1 });

export const db = drizzle(sql, { schema });
export { sql };
