import "dotenv/config";

import { pathToFileURL } from "node:url";
import { and, eq, sql as drizzleSql } from "drizzle-orm";

import { db, sql } from "./client";
import { influencerPlatforms, packages } from "./schema/influencers";
import { orderItems, orders } from "./schema/orders";
import { spacePrices, spaces } from "./schema/spaces";
import { influencerProfiles, users } from "./schema/users";
import {
  profilePackages,
  profilePlatforms,
  profiles,
  spaceRows,
  userRows,
} from "./seed-data";

export async function seedDatabase(): Promise<void> {
  try {
    for (const [email, role, displayName] of userRows) {
      await db
        .insert(users)
        .values({ email, role, displayName })
        .onConflictDoNothing();
    }
    const allUsers = await db.select().from(users);
    const byEmail = new Map(allUsers.map((user) => [user.email, user.id]));
    for (let index = 0; index < profiles.length; index += 1) {
      const profileData = profiles[index];
      if (!profileData) throw new Error(`Eksik profil: ${index}`);
      const [
        handle,
        city,
        niche,
        profileGender,
        bio,
        avatarUrl,
        skills,
        verified,
      ] = profileData;
      const profileUser = userRows[index + 5];
      if (!profileUser) throw new Error(`Eksik kullanıcı indeksi: ${index}`);
      const userId = byEmail.get(profileUser[0]);
      if (!userId) throw new Error(`Eksik kullanıcı: ${handle}`);
      await db
        .insert(influencerProfiles)
        .values({
          userId,
          handle,
          city,
          niche,
          gender: profileGender,
          bio,
          avatarUrl,
          skills: [...skills],
          verified,
        })
        .onConflictDoUpdate({
          target: influencerProfiles.handle,
          set: {
            city,
            niche,
            gender: profileGender,
            bio,
            avatarUrl,
            skills: [...skills],
            verified,
          },
        });
    }
    const seededHandles: ReadonlySet<string> = new Set(
      profiles.map(([handle]) => handle),
    );
    const allProfiles = (await db.select().from(influencerProfiles)).filter(
      (profile) => seededHandles.has(profile.handle),
    );
    for (const profile of allProfiles) {
      for (const [platform, followers] of profilePlatforms[profile.handle] ??
        []) {
        await db
          .insert(influencerPlatforms)
          .values({
            profileId: profile.id,
            platform,
            url: `https://example.com/${profile.handle}/${platform}`,
            followers,
          })
          .onConflictDoUpdate({
            target: [
              influencerPlatforms.profileId,
              influencerPlatforms.platform,
            ],
            set: {
              url: `https://example.com/${profile.handle}/${platform}`,
              followers,
            },
          });
      }
      for (const packageRow of profilePackages[profile.handle] ?? []) {
        await db
          .insert(packages)
          .values({
            profileId: profile.id,
            title: packageRow[0],
            description: packageRow[1],
            priceKurus: packageRow[2],
            deliveryDays: packageRow[3],
          })
          .onConflictDoNothing();
      }
    }
    for (const [
      title,
      type,
      city,
      district,
      longitude,
      latitude,
      widthCm,
      heightCm,
      option,
      photoUrl,
      priceKurus,
      priceUnit,
    ] of spaceRows) {
      const ownerEmail =
        city === "İstanbul" && title !== "Kentpark Dev LED"
          ? userRows[3][0]
          : title === "Kentpark Dev LED"
            ? userRows[4][0]
            : userRows[3][0];
      const ownerId = byEmail.get(ownerEmail);
      if (!ownerId) throw new Error(`Eksik alan sahibi: ${title}`);
      const existing = await db
        .select()
        .from(spaces)
        .where(eq(spaces.title, title));
      const [space] = existing.length
        ? existing
        : await db
            .insert(spaces)
            .values({
              ownerId,
              title,
              photoUrl,
              type,
              city,
              district,
              location: drizzleSql`ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)`,
              widthCm,
              heightCm,
              lit: true,
              digital: type === "avm_led" || type === "dooh",
              printOption: option,
              estDailyViews: 50_000,
              status: "active",
            })
            .returning();
      if (space && space.photoUrl !== photoUrl) {
        await db
          .update(spaces)
          .set({ photoUrl })
          .where(eq(spaces.id, space.id));
      }
      if (!space) throw new Error(`Alan oluşturulamadı: ${title}`);
      await db
        .insert(spacePrices)
        .values({ spaceId: space.id, unit: priceUnit, priceKurus })
        .onConflictDoUpdate({
          target: [spacePrices.spaceId, spacePrices.unit],
          set: { priceKurus },
        });
    }
    const advertiserId = byEmail.get(userRows[1][0]);
    if (!advertiserId) throw new Error("Eksik reklam veren");
    const existingOrder = await db
      .select()
      .from(orders)
      .where(
        and(eq(orders.advertiserId, advertiserId), eq(orders.status, "live")),
      );
    if (!existingOrder.length) {
      const [order] = await db
        .insert(orders)
        .values({ advertiserId, status: "live", totalKurus: 5_000_000 })
        .returning();
      const selectedSpace = (
        await db.select().from(spaces).where(eq(spaces.title, spaceRows[0][0]))
      )[0];
      const selectedPackage = (
        await db.select().from(packages).where(eq(packages.title, "1 Reels"))
      )[0];
      if (!order || !selectedSpace || !selectedPackage)
        throw new Error("Örnek sipariş için kayıtlar oluşturulamadı");
      const startDate = new Date("2026-12-01T00:00:00Z");
      const endDate = new Date("2026-12-08T00:00:00Z");
      await db.insert(orderItems).values([
        {
          orderId: order.id,
          itemType: "space",
          spaceId: selectedSpace.id,
          startDate,
          endDate,
          priceKurus: 2_500_000,
          commissionRateBp: 800,
        },
        {
          orderId: order.id,
          itemType: "package",
          packageId: selectedPackage.id,
          startDate,
          endDate,
          priceKurus: 2_500_000,
          commissionRateBp: 1500,
        },
      ]);
    }
  } finally {
    await sql.end();
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await seedDatabase();
}
