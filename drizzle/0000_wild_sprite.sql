CREATE EXTENSION IF NOT EXISTS postgis;--> statement-breakpoint
CREATE EXTENSION IF NOT EXISTS pgcrypto;--> statement-breakpoint
CREATE TYPE "public"."social_platform" AS ENUM('instagram', 'tiktok', 'youtube', 'x', 'linkedin', 'twitch', 'kick');--> statement-breakpoint
CREATE TYPE "public"."item_type" AS ENUM('space', 'package');--> statement-breakpoint
CREATE TYPE "public"."order_status" AS ENUM('pending', 'accepted', 'live', 'proof_pending', 'approved', 'completed', 'cancelled', 'disputed');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('initiated', 'held', 'released', 'refunded', 'failed');--> statement-breakpoint
CREATE TYPE "public"."proof_kind" AS ENUM('photo', 'video', 'link', 'screenshot');--> statement-breakpoint
CREATE TYPE "public"."proof_status" AS ENUM('submitted', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."price_unit" AS ENUM('day', 'week', 'two_weeks', 'month', 'spot', 'event');--> statement-breakpoint
CREATE TYPE "public"."print_option" AS ENUM('included', 'extra', 'advertiser');--> statement-breakpoint
CREATE TYPE "public"."space_status" AS ENUM('draft', 'pending', 'active', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."space_type" AS ENUM('billboard', 'megalight', 'clp', 'avm_led', 'avm_stand', 'dooh', 'vehicle', 'other');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('female', 'male', 'other');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('advertiser', 'influencer', 'space_owner', 'agency', 'admin');--> statement-breakpoint
CREATE TABLE "influencer_platforms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"platform" "social_platform" NOT NULL,
	"url" text NOT NULL,
	"followers" integer NOT NULL,
	CONSTRAINT "influencer_platforms_profile_platform_unique" UNIQUE("profile_id","platform"),
	CONSTRAINT "influencer_platforms_followers_nonnegative_check" CHECK ("influencer_platforms"."followers" >= 0)
);
--> statement-breakpoint
CREATE TABLE "packages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price_kurus" integer NOT NULL,
	"delivery_days" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "packages_profile_title_unique" UNIQUE("profile_id","title"),
	CONSTRAINT "packages_price_nonnegative_check" CHECK ("packages"."price_kurus" >= 0),
	CONSTRAINT "packages_delivery_days_check" CHECK ("packages"."delivery_days" BETWEEN 1 AND 90)
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"item_type" "item_type" NOT NULL,
	"space_id" uuid,
	"package_id" uuid,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"price_kurus" integer NOT NULL,
	"commission_rate_bp" integer NOT NULL,
	CONSTRAINT "order_items_price_nonnegative_check" CHECK ("order_items"."price_kurus" >= 0),
	CONSTRAINT "order_items_commission_nonnegative_check" CHECK ("order_items"."commission_rate_bp" >= 0),
	CONSTRAINT "order_items_product_match_check" CHECK (("order_items"."item_type" = 'space' AND "order_items"."space_id" IS NOT NULL AND "order_items"."package_id" IS NULL) OR ("order_items"."item_type" = 'package' AND "order_items"."package_id" IS NOT NULL AND "order_items"."space_id" IS NULL)),
	CONSTRAINT "order_items_dates_check" CHECK ("order_items"."end_date" >= "order_items"."start_date")
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"advertiser_id" uuid NOT NULL,
	"status" "order_status" NOT NULL,
	"total_kurus" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "orders_total_nonnegative_check" CHECK ("orders"."total_kurus" >= 0)
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_id" uuid NOT NULL,
	"provider" text NOT NULL,
	"provider_ref" text,
	"status" "payment_status" NOT NULL,
	"amount_kurus" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "payments_amount_nonnegative_check" CHECK ("payments"."amount_kurus" >= 0)
);
--> statement-breakpoint
CREATE TABLE "proofs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_item_id" uuid NOT NULL,
	"kind" "proof_kind" NOT NULL,
	"url" text NOT NULL,
	"location" geometry(Point, 4326),
	"taken_at" timestamp with time zone NOT NULL,
	"status" "proof_status" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "space_prices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"space_id" uuid NOT NULL,
	"unit" "price_unit" NOT NULL,
	"price_kurus" integer NOT NULL,
	CONSTRAINT "space_prices_space_unit_unique" UNIQUE("space_id","unit"),
	CONSTRAINT "space_prices_nonnegative_check" CHECK ("space_prices"."price_kurus" >= 0)
);
--> statement-breakpoint
CREATE TABLE "spaces" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"title" text NOT NULL,
	"type" "space_type" NOT NULL,
	"city" text NOT NULL,
	"district" text NOT NULL,
	"location" geometry(Point, 4326) NOT NULL,
	"width_cm" integer NOT NULL,
	"height_cm" integer NOT NULL,
	"lit" boolean NOT NULL,
	"digital" boolean NOT NULL,
	"print_option" "print_option" NOT NULL,
	"est_daily_views" integer NOT NULL,
	"status" "space_status" DEFAULT 'draft' NOT NULL,
	CONSTRAINT "spaces_dimensions_positive_check" CHECK ("spaces"."width_cm" > 0 AND "spaces"."height_cm" > 0)
);
--> statement-breakpoint
CREATE TABLE "influencer_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"handle" text NOT NULL,
	"city" text NOT NULL,
	"niche" text NOT NULL,
	"gender" "gender" NOT NULL,
	"bio" text NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "influencer_profiles_user_id_unique" UNIQUE("user_id"),
	CONSTRAINT "influencer_profiles_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"password_hash" text,
	"role" "user_role" NOT NULL,
	"display_name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone"),
	CONSTRAINT "users_email_lowercase_check" CHECK ("users"."email" = lower("users"."email"))
);
--> statement-breakpoint
ALTER TABLE "influencer_platforms" ADD CONSTRAINT "influencer_platforms_profile_id_influencer_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."influencer_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "packages" ADD CONSTRAINT "packages_profile_id_influencer_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."influencer_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_package_id_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."packages"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_advertiser_id_users_id_fk" FOREIGN KEY ("advertiser_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "proofs" ADD CONSTRAINT "proofs_order_item_id_order_items_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "public"."order_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "space_prices" ADD CONSTRAINT "space_prices_space_id_spaces_id_fk" FOREIGN KEY ("space_id") REFERENCES "public"."spaces"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spaces" ADD CONSTRAINT "spaces_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "influencer_profiles" ADD CONSTRAINT "influencer_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "proofs_location_gist_idx" ON "proofs" USING gist ("location");--> statement-breakpoint
CREATE INDEX "spaces_location_gist_idx" ON "spaces" USING gist ("location");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_lower_idx" ON "users" USING btree (lower("email"));
