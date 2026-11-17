ALTER TABLE "influencer_profiles" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "influencer_profiles" ADD COLUMN "skills" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
CREATE INDEX "influencer_platforms_platform_profile_idx" ON "influencer_platforms" USING btree ("platform","profile_id");--> statement-breakpoint
CREATE INDEX "influencer_platforms_profile_followers_idx" ON "influencer_platforms" USING btree ("profile_id","followers");--> statement-breakpoint
CREATE INDEX "packages_active_price_profile_idx" ON "packages" USING btree ("active","price_kurus","profile_id");--> statement-breakpoint
CREATE INDEX "influencer_profiles_gender_city_idx" ON "influencer_profiles" USING btree ("gender","city");--> statement-breakpoint
CREATE INDEX "influencer_profiles_niche_idx" ON "influencer_profiles" USING btree ("niche");--> statement-breakpoint
CREATE INDEX "influencer_profiles_skills_gin_idx" ON "influencer_profiles" USING gin ("skills");