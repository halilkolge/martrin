import {
  boolean,
  check,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const userRole = pgEnum("user_role", [
  "advertiser",
  "influencer",
  "space_owner",
  "agency",
  "admin",
]);
export const gender = pgEnum("gender", ["female", "male", "other"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    phone: text("phone").unique(),
    passwordHash: text("password_hash"),
    role: userRole("role").notNull(),
    displayName: text("display_name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("users_email_lower_idx").on(sql`lower(${table.email})`),
    check(
      "users_email_lowercase_check",
      sql`${table.email} = lower(${table.email})`,
    ),
  ],
);

export const influencerProfiles = pgTable(
  "influencer_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    handle: text("handle").notNull().unique(),
    city: text("city").notNull(),
    niche: text("niche").notNull(),
    gender: gender("gender").notNull(),
    bio: text("bio").notNull(),
    avatarUrl: text("avatar_url"),
    skills: text("skills").array().notNull().default([]),
    verified: boolean("verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("influencer_profiles_gender_city_idx").on(table.gender, table.city),
    index("influencer_profiles_niche_idx").on(table.niche),
    index("influencer_profiles_skills_gin_idx").using("gin", table.skills),
  ],
);
