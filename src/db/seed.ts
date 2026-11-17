import "dotenv/config";

import { and, eq, sql as drizzleSql } from "drizzle-orm";

import { db, sql } from "./client";
import { influencerPlatforms, packages } from "./schema/influencers";
import { orderItems, orders } from "./schema/orders";
import { spacePrices, spaces } from "./schema/spaces";
import { influencerProfiles, users } from "./schema/users";

const userRows = [
  ["admin@martrin.example", "admin", "Demo Yönetici"],
  ["yore@martrin.example", "advertiser", "Yöre Kahve Evleri"],
  ["atlas@martrin.example", "advertiser", "Atlas Elektronik"],
  ["bogazici@martrin.example", "space_owner", "Boğaziçi Açık Hava Medya"],
  ["kentpark@martrin.example", "space_owner", "Kentpark AVM"],
  ["elif@martrin.example", "influencer", "Elif Karaca"],
  ["deniz@martrin.example", "influencer", "Deniz Aksoy"],
  ["mert@martrin.example", "influencer", "Mert Yalçın"],
  ["selin@martrin.example", "influencer", "Selin Doğan"],
] as const;

const profiles = [
  [
    "elifmutfakta",
    "İstanbul",
    "Yemek & Tarif",
    "female",
    "Yerel üreticiler ve mutfak ürünleri.",
  ],
  [
    "denizsokakta",
    "İzmir",
    "Moda & Stil",
    "female",
    "Yerli tasarımcılar ve sürdürülebilir stil.",
  ],
  [
    "mertteknoloji",
    "Ankara",
    "Teknoloji",
    "male",
    "Telefon ve akıllı ev ürün incelemeleri.",
  ],
  [
    "selinfit",
    "Antalya",
    "Spor & Sağlık",
    "female",
    "Antrenman ve beslenme önerileri.",
  ],
] as const;
const profilePackages = [
  ["Kısa Reels", "60 sn tanıtım videosu", 3_800_000, 7],
  ["Reels ve Story", "Linkli story serisi", 5_200_000, 7],
  ["Kombin Reels", "Ürünle kombin önerileri", 2_200_000, 5],
  ["Mağaza ziyareti", "Çekim ve story", 3_000_000, 10],
  ["İnceleme videosu", "Detaylı ürün incelemesi", 8_500_000, 21],
  ["Kutu açılışı", "Dikey kısa video", 2_400_000, 7],
  ["Antrenman Reels", "Ürünlü antrenman videosu", 1_250_000, 5],
  ["Aylık iş birliği", "İçerik serisi", 4_200_000, 30],
] as const;
const spaceRows = [
  [
    "Taksim Işıklı Billboard",
    "billboard",
    "İstanbul",
    "Beyoğlu",
    28.985,
    41.0369,
    1200,
    400,
    "extra",
  ],
  [
    "Kadıköy Sahil Billboard",
    "billboard",
    "İstanbul",
    "Kadıköy",
    29.027,
    40.991,
    1200,
    400,
    "extra",
  ],
  [
    "Kentpark Dev LED",
    "avm_led",
    "İstanbul",
    "Ataşehir",
    29.12,
    40.99,
    800,
    450,
    "advertiser",
  ],
  [
    "Kordon Megalight",
    "megalight",
    "İzmir",
    "Konak",
    27.14,
    38.43,
    320,
    240,
    "included",
  ],
  [
    "Alsancak Dijital Ekran",
    "dooh",
    "İzmir",
    "Konak",
    27.15,
    38.44,
    500,
    300,
    "advertiser",
  ],
  [
    "Kızılay CLP",
    "clp",
    "Ankara",
    "Çankaya",
    32.86,
    39.92,
    118,
    175,
    "included",
  ],
] as const;

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
  const [handle, city, niche, profileGender, bio] = profileData;
  const profileUser = userRows[index + 5];
  if (!profileUser) throw new Error(`Eksik kullanıcı indeksi: ${index}`);
  const userId = byEmail.get(profileUser[0]);
  if (!userId) throw new Error(`Eksik kullanıcı: ${handle}`);
  await db
    .insert(influencerProfiles)
    .values({ userId, handle, city, niche, gender: profileGender, bio })
    .onConflictDoNothing();
}
const seededHandles: ReadonlySet<string> = new Set(
  profiles.map(([handle]) => handle),
);
const allProfiles = (await db.select().from(influencerProfiles)).filter(
  (profile) => seededHandles.has(profile.handle),
);
for (const profile of allProfiles) {
  const platform = profile.handle === "mertteknoloji" ? "youtube" : "instagram";
  await db
    .insert(influencerPlatforms)
    .values({
      profileId: profile.id,
      platform,
      url: `https://example.com/${profile.handle}`,
      followers: 50_000,
    })
    .onConflictDoNothing();
  const profileIndex = profiles.findIndex(
    ([handle]) => handle === profile.handle,
  );
  for (const packageRow of profilePackages.slice(
    profileIndex * 2,
    profileIndex * 2 + 2,
  )) {
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
  if (!space) throw new Error(`Alan oluşturulamadı: ${title}`);
  for (const [unit, priceKurus] of [
    ["week", 2_600_000],
    ["month", 8_800_000],
  ] as const) {
    await db
      .insert(spacePrices)
      .values({ spaceId: space.id, unit, priceKurus })
      .onConflictDoNothing();
  }
}
const advertiserId = byEmail.get(userRows[1][0]);
if (!advertiserId) throw new Error("Eksik reklam veren");
const existingOrder = await db
  .select()
  .from(orders)
  .where(and(eq(orders.advertiserId, advertiserId), eq(orders.status, "live")));
if (!existingOrder.length) {
  const [order] = await db
    .insert(orders)
    .values({ advertiserId, status: "live", totalKurus: 5_000_000 })
    .returning();
  const selectedSpace = (
    await db.select().from(spaces).where(eq(spaces.title, spaceRows[0][0]))
  )[0];
  const selectedPackage = (
    await db
      .select()
      .from(packages)
      .where(eq(packages.title, profilePackages[0][0]))
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
await sql.end();
