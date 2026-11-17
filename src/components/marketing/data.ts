/** Ana sayfa vitrini için sabit örnek veriler. Kaynak: design/prototype/src/data.ts. */

export const TYPE_LABEL = {
  billboard: "Billboard",
  megalight: "Megalight",
  clp: "Durak / CLP",
  "avm-led": "AVM LED Ekran",
  "avm-stant": "AVM Stant & Etkinlik",
  dijital: "Dijital Ekran (DOOH)",
  bina: "Bina Giydirme",
  arac: "Araç Giydirme",
} as const;

export type SpaceType = keyof typeof TYPE_LABEL;
export type Platform =
  "Instagram" | "TikTok" | "YouTube" | "X" | "LinkedIn" | "Twitch" | "Kick";

/** Prototipteki gibi ilk yedi çip: Hepsi, Influencer ve ilk beş alan tipi. */
export const SEARCH_CHIPS = [
  "Hepsi",
  "Influencer",
  ...Object.values(TYPE_LABEL).slice(0, 5),
] as const;

export type HomeSpace = {
  id: string;
  title: string;
  type: SpaceType;
  city: string;
  district: string;
  image: string;
  dailyViews: number;
  unit: string;
  /** Kuruş cinsinden başlangıç fiyatı. */
  priceKurus: number;
  verified: boolean;
};

export const OVERLAP_SPACE: HomeSpace = {
  id: "a01",
  title: "Atrium Dev LED Ekran",
  type: "avm-led",
  city: "İstanbul",
  district: "Ataşehir",
  image: "c5.jpg",
  dailyViews: 62000,
  unit: "spot",
  priceKurus: 45000,
  verified: true,
};

export const FEATURED_SPACES: HomeSpace[] = [
  {
    id: "c01",
    title: "Kızılay Durak CLP Paketi (10 durak)",
    type: "clp",
    city: "Ankara",
    district: "Çankaya",
    image: "c1.jpg",
    dailyViews: 240000,
    unit: "hafta",
    priceKurus: 3200000,
    verified: true,
  },
  {
    id: "m01",
    title: "Bulvar Megalight Hattı",
    type: "megalight",
    city: "Ankara",
    district: "Çankaya",
    image: "c2.jpg",
    dailyViews: 310000,
    unit: "hafta",
    priceKurus: 4800000,
    verified: true,
  },
  {
    id: "k01",
    title: "Kordon Boyu Megalight",
    type: "megalight",
    city: "İzmir",
    district: "Konak",
    image: "c3.jpg",
    dailyViews: 120000,
    unit: "hafta",
    priceKurus: 2600000,
    verified: true,
  },
  {
    id: "g01",
    title: "Merkez Bina Giydirme",
    type: "bina",
    city: "İzmir",
    district: "Bayraklı",
    image: "c4.jpg",
    dailyViews: 210000,
    unit: "ay",
    priceKurus: 42000000,
    verified: true,
  },
];

export type HomeInfluencer = {
  id: string;
  name: string;
  city: string;
  niche: string;
  image: string;
  followers: number;
  platforms: Platform[];
  /** Kuruş cinsinden en düşük paket fiyatı. */
  priceKurus: number;
  verified: boolean;
};

export const FEATURED_INFLUENCERS: HomeInfluencer[] = [
  {
    id: "i1",
    name: "Elif Karaca",
    city: "İstanbul",
    niche: "Yemek & Tarif",
    image: "p6.jpg",
    followers: 776000,
    platforms: ["Instagram", "TikTok", "YouTube"],
    priceKurus: 3800000,
    verified: true,
  },
  {
    id: "i3",
    name: "Mert Yalçın",
    city: "Ankara",
    niche: "Teknoloji",
    image: "p2.jpg",
    followers: 744000,
    platforms: ["YouTube", "X", "Instagram"],
    priceKurus: 2400000,
    verified: true,
  },
  {
    id: "i7",
    name: "Zeynep Arslan",
    city: "Bursa",
    niche: "Lifestyle",
    image: "p3.jpg",
    followers: 215000,
    platforms: ["Instagram", "TikTok"],
    priceKurus: 1600000,
    verified: true,
  },
  {
    id: "i6",
    name: "Burak Şen",
    city: "İstanbul",
    niche: "Oyun & Canlı Yayın",
    image: "p7.jpg",
    followers: 239000,
    platforms: ["Twitch", "Kick", "YouTube"],
    priceKurus: 1800000,
    verified: false,
  },
];

export const OVERLAP_INFLUENCERS: HomeInfluencer[] = [
  {
    id: "i2",
    name: "Deniz Aksoy",
    city: "İzmir",
    niche: "Moda & Stil",
    image: "p1.jpg",
    followers: 528000,
    platforms: ["Instagram", "TikTok"],
    priceKurus: 2200000,
    verified: true,
  },
  {
    id: "i8",
    name: "Ece Tunç",
    city: "Eskişehir",
    niche: "Komedi",
    image: "p4.jpg",
    followers: 981000,
    platforms: ["TikTok", "Instagram", "YouTube"],
    priceKurus: 4800000,
    verified: true,
  },
];

export const HERO_AVATARS = ["p1.jpg", "p2.jpg", "p4.jpg"];
export const HERO_BADGE_AVATAR = "p6.jpg";
export const HERO_IMAGE = "hero.jpg";

export type LiveCampaign = {
  title: string;
  brand: string;
  image: string;
  views: string;
  channel: string;
  days: string;
};

export const LIVE_CAMPAIGNS: LiveCampaign[] = [
  {
    title: "Kış indirimi",
    brand: "Yöre Kahve",
    image: "c1.jpg",
    views: "185 B",
    channel: "Billboard + 2 influencer",
    days: "2 gün",
  },
  {
    title: "Ankara lansman",
    brand: "Atlas Elektronik",
    image: "c4.jpg",
    views: "310 B",
    channel: "CLP + megalight",
    days: "2 gün",
  },
  {
    title: "Kapadokya rotası",
    brand: "Vadi Turizm",
    image: "c5.jpg",
    views: "236 B",
    channel: "Seyahat içerikçisi",
    days: "2 gün",
  },
  {
    title: "AVM hafta sonu",
    brand: "Moda Sokağı",
    image: "c3.jpg",
    views: "62 B",
    channel: "LED + stant",
    days: "2 gün",
  },
];

export const LIVE_AVATARS = [
  "p1.jpg",
  "p2.jpg",
  "p3.jpg",
  "p4.jpg",
  "p5.jpg",
  "p6.jpg",
  "p7.jpg",
  "p8.jpg",
];

export const HOW_STEPS = [
  {
    no: "01/",
    title: "Keşfet & planla",
    tag: "81 il · 8 alan tipi",
    image: "c1.jpg",
    to: "/alanlar",
    background: "from-sky to-sky-soft",
    blob: "[border-radius:62%_38%_46%_54%/45%_55%_45%_55%]",
  },
  {
    no: "02/",
    title: "Emanetle öde",
    tag: "aşamalı serbest bırakma",
    image: "c2.jpg",
    to: "/sepet",
    background: "from-lime-soft to-[#e9f2d9]",
    blob: "[border-radius:40%_60%_60%_40%/60%_40%_60%_40%]",
  },
  {
    no: "03/",
    title: "Yayınla & kanıtla",
    tag: "fotoğraf · video · saha",
    image: "c3.jpg",
    to: "/panel-reklamveren",
    background: "from-violet-soft to-sky-soft",
    blob: "[border-radius:55%_45%_35%_65%/40%_60%_40%_60%]",
  },
] as const;
