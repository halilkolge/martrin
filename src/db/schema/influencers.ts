import {
  boolean,
  check,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { influencerProfiles } from "./users";

export const socialPlatform = pgEnum("social_platform", [
  "instagram",
  "tiktok",
  "youtube",
  "x",
  "linkedin",
  "twitch",
  "kick",
]);

export const influencerPlatforms = pgTable(
  "influencer_platforms",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => influencerProfiles.id, { onDelete: "cascade" }),
    platform: socialPlatform("platform").notNull(),
    url: text("url").notNull(),
    followers: integer("followers").notNull(),
  },
  (table) => [
    unique("influencer_platforms_profile_platform_unique").on(
      table.profileId,
      table.platform,
    ),
    index("influencer_platforms_platform_profile_idx").on(
      table.platform,
      table.profileId,
    ),
    index("influencer_platforms_profile_followers_idx").on(
      table.profileId,
      table.followers,
    ),
    check(
      "influencer_platforms_followers_nonnegative_check",
      sql`${table.followers} >= 0`,
    ),
  ],
);

export const packages = pgTable(
  "packages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => influencerProfiles.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    priceKurus: integer("price_kurus").notNull(),
    deliveryDays: integer("delivery_days").notNull(),
    active: boolean("active").notNull().default(true),
  },
  (table) => [
    unique("packages_profile_title_unique").on(table.profileId, table.title),
    index("packages_active_price_profile_idx").on(
      table.active,
      table.priceKurus,
      table.profileId,
    ),
    check("packages_price_nonnegative_check", sql`${table.priceKurus} >= 0`),
    check(
      "packages_delivery_days_check",
      sql`${table.deliveryDays} BETWEEN 1 AND 90`,
    ),
  ],
);
