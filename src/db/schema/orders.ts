import {
  check,
  customType,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { packages } from "./influencers";
import { spaces } from "./spaces";
import { users } from "./users";

const geometry = customType<{ data: string | null; driverData: string | null }>(
  { dataType: () => "geometry(Point, 4326)" },
);
export const orderStatus = pgEnum("order_status", [
  "pending",
  "accepted",
  "live",
  "proof_pending",
  "approved",
  "completed",
  "cancelled",
  "disputed",
]);
export const itemType = pgEnum("item_type", ["space", "package"]);
export const paymentStatus = pgEnum("payment_status", [
  "initiated",
  "held",
  "released",
  "refunded",
  "failed",
]);
export const proofKind = pgEnum("proof_kind", [
  "photo",
  "video",
  "link",
  "screenshot",
]);
export const proofStatus = pgEnum("proof_status", [
  "submitted",
  "approved",
  "rejected",
]);

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    advertiserId: uuid("advertiser_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    status: orderStatus("status").notNull(),
    totalKurus: integer("total_kurus").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check("orders_total_nonnegative_check", sql`${table.totalKurus} >= 0`),
  ],
);
export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    itemType: itemType("item_type").notNull(),
    spaceId: uuid("space_id").references(() => spaces.id, {
      onDelete: "restrict",
    }),
    packageId: uuid("package_id").references(() => packages.id, {
      onDelete: "restrict",
    }),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    priceKurus: integer("price_kurus").notNull(),
    commissionRateBp: integer("commission_rate_bp").notNull(),
  },
  (table) => [
    check("order_items_price_nonnegative_check", sql`${table.priceKurus} >= 0`),
    check(
      "order_items_commission_nonnegative_check",
      sql`${table.commissionRateBp} >= 0`,
    ),
    check(
      "order_items_product_match_check",
      sql`(${table.itemType} = 'space' AND ${table.spaceId} IS NOT NULL AND ${table.packageId} IS NULL) OR (${table.itemType} = 'package' AND ${table.packageId} IS NOT NULL AND ${table.spaceId} IS NULL)`,
    ),
    check(
      "order_items_dates_check",
      sql`${table.endDate} >= ${table.startDate}`,
    ),
  ],
);
export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerRef: text("provider_ref"),
    status: paymentStatus("status").notNull(),
    amountKurus: integer("amount_kurus").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    check("payments_amount_nonnegative_check", sql`${table.amountKurus} >= 0`),
  ],
);
export const proofs = pgTable(
  "proofs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    orderItemId: uuid("order_item_id")
      .notNull()
      .references(() => orderItems.id, { onDelete: "cascade" }),
    kind: proofKind("kind").notNull(),
    url: text("url").notNull(),
    location: geometry("location"),
    takenAt: timestamp("taken_at", { withTimezone: true }).notNull(),
    status: proofStatus("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [index("proofs_location_gist_idx").using("gist", table.location)],
);
