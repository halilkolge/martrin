import {
  boolean,
  check,
  customType,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { users } from "./users";

const geometry = customType<{ data: string; driverData: string }>({
  dataType: () => "geometry(Point, 4326)",
});
export const spaceType = pgEnum("space_type", [
  "billboard",
  "megalight",
  "clp",
  "avm_led",
  "avm_stand",
  "dooh",
  "vehicle",
  "other",
]);
export const printOption = pgEnum("print_option", [
  "included",
  "extra",
  "advertiser",
]);
export const spaceStatus = pgEnum("space_status", [
  "draft",
  "pending",
  "active",
  "rejected",
]);
export const priceUnit = pgEnum("price_unit", [
  "day",
  "week",
  "two_weeks",
  "month",
  "spot",
  "event",
]);

export const spaces = pgTable(
  "spaces",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    title: text("title").notNull(),
    type: spaceType("type").notNull(),
    city: text("city").notNull(),
    district: text("district").notNull(),
    location: geometry("location").notNull(),
    widthCm: integer("width_cm").notNull(),
    heightCm: integer("height_cm").notNull(),
    lit: boolean("lit").notNull(),
    digital: boolean("digital").notNull(),
    printOption: printOption("print_option").notNull(),
    estDailyViews: integer("est_daily_views").notNull(),
    status: spaceStatus("status").notNull().default("draft"),
  },
  (table) => [
    index("spaces_location_gist_idx").using("gist", table.location),
    check(
      "spaces_dimensions_positive_check",
      sql`${table.widthCm} > 0 AND ${table.heightCm} > 0`,
    ),
  ],
);

export const spacePrices = pgTable(
  "space_prices",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    spaceId: uuid("space_id")
      .notNull()
      .references(() => spaces.id, { onDelete: "cascade" }),
    unit: priceUnit("unit").notNull(),
    priceKurus: integer("price_kurus").notNull(),
  },
  (table) => [
    unique("space_prices_space_unit_unique").on(table.spaceId, table.unit),
    check("space_prices_nonnegative_check", sql`${table.priceKurus} >= 0`),
  ],
);
