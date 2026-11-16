// Tüm içerik DEMO amaçlıdır. Kişi ve işletme adları hayalidir; şehir ve ilçe adları gerçektir.

export type SpaceType = "billboard" | "megalight" | "clp" | "avm-led" | "avm-stant" | "dijital" | "bina" | "arac";
export type Unit = "gün" | "hafta" | "15 gün" | "ay" | "spot" | "etkinlik";

export const TYPE_LABEL: Record<SpaceType, string> = {
  billboard: "Billboard",
  megalight: "Megalight",
  clp: "Durak / CLP",
  "avm-led": "AVM LED Ekran",
  "avm-stant": "AVM Stant & Etkinlik",
  dijital: "Dijital Ekran (DOOH)",
  bina: "Bina Giydirme",
  arac: "Araç Giydirme",
};

export type Seller = { id: string; name: string; kind: "Açık hava şirketi" | "AVM" | "Belediye" | "Belediye işleticisi" | "İşletme"; city: string; verified: boolean; rating: number; deals: number };

export const SELLERS: Seller[] = [
  { id: "s1", name: "Boğaziçi Açık Hava Medya", kind: "Açık hava şirketi", city: "İstanbul", verified: true, rating: 4.8, deals: 412 },
  { id: "s2", name: "Kentpark AVM", kind: "AVM", city: "İstanbul", verified: true, rating: 4.7, deals: 138 },
  { id: "s3", name: "Başkent Kent Mobilyaları A.Ş.", kind: "Belediye işleticisi", city: "Ankara", verified: true, rating: 4.6, deals: 265 },
  { id: "s4", name: "Kordon Reklam", kind: "Açık hava şirketi", city: "İzmir", verified: true, rating: 4.9, deals: 189 },
  { id: "s5", name: "Nilüfer Kıyı Belediyesi", kind: "Belediye", city: "Bursa", verified: true, rating: 4.5, deals: 47 },
  { id: "s6", name: "Akdeniz Dijital Ekran Ağı", kind: "İşletme", city: "Antalya", verified: false, rating: 4.4, deals: 33 },
  { id: "s7", name: "Raylı Sistem Medya", kind: "Belediye işleticisi", city: "İstanbul", verified: true, rating: 4.7, deals: 301 },
  { id: "s8", name: "Hareketli Reklam Filo", kind: "İşletme", city: "Gaziantep", verified: true, rating: 4.6, deals: 58 },
];

export type Price = { unit: Unit; price: number };
export type Space = {
  id: string; title: string; type: SpaceType; city: string; district: string; address: string;
  sellerId: string; img: string; size: string; lit: boolean; digital: boolean;
  dailyViews: number; prices: Price[]; negotiable: boolean; printing: "Baskı dahil" | "Baskı ayrı ücretli" | "Reklam veren getirir" | "Dijital, baskı yok";
  x: number; y: number; // Türkiye haritası üzerinde yüzde konum
  busy: number[]; // takvimde dolu günler (Aralık 2026)
  tags: string[];
};

export const SPACES: Space[] = [
  { id: "b01", title: "Sahil Yolu Işıklı Billboard", type: "billboard", city: "İstanbul", district: "Kadıköy", address: "Kadıköy, Fenerbahçe sahil yolu girişi", sellerId: "s1", img: "hero-billboard.jpg", size: "12 × 4 m", lit: true, digital: false, dailyViews: 185000, prices: [{ unit: "hafta", price: 78000 }, { unit: "15 gün", price: 142000 }, { unit: "ay", price: 265000 }], negotiable: true, printing: "Baskı ayrı ücretli", x: 22, y: 22, busy: [1,2,3,4,5,6,7,15,16,17,18,19,20,21], tags: ["Trafik yoğun", "Deniz manzarası"] },
  { id: "a01", title: "Atrium Dev LED Ekran", type: "avm-led", city: "İstanbul", district: "Ataşehir", address: "Kentpark AVM, zemin kat atrium", sellerId: "s2", img: "avm-led.jpg", size: "8 × 4,5 m · 4K", lit: true, digital: true, dailyViews: 62000, prices: [{ unit: "spot", price: 450 }, { unit: "gün", price: 18500 }, { unit: "hafta", price: 112000 }], negotiable: true, printing: "Dijital, baskı yok", x: 23.5, y: 23, busy: [8,9,10,24,25,26,31], tags: ["Saatte 6 gösterim", "Hafta sonu yoğun"] },
  { id: "c01", title: "Kızılay Durak CLP Paketi (10 durak)", type: "clp", city: "Ankara", district: "Çankaya", address: "Kızılay – Tunalı Hilmi hattı", sellerId: "s3", img: "durak-clp.jpg", size: "118 × 175 cm × 10", lit: true, digital: false, dailyViews: 240000, prices: [{ unit: "hafta", price: 32000 }, { unit: "15 gün", price: 56000 }], negotiable: false, printing: "Baskı dahil", x: 40, y: 34, busy: [1,2,3,4,5,6,7,8,9,10,11,12,13,14], tags: ["Belediye onaylı", "Paket"] },
  { id: "m01", title: "Bulvar Megalight Hattı", type: "megalight", city: "Ankara", district: "Çankaya", address: "Eskişehir Yolu, 6 yüz", sellerId: "s3", img: "megalight.jpg", size: "3,2 × 2,4 m × 6", lit: true, digital: false, dailyViews: 310000, prices: [{ unit: "hafta", price: 48000 }, { unit: "ay", price: 168000 }], negotiable: true, printing: "Baskı ayrı ücretli", x: 39, y: 35, busy: [20,21,22,23,24,25,26,27,28,29,30,31], tags: ["Gece ışıklı"] },
  { id: "k01", title: "Kordon Boyu Megalight", type: "megalight", city: "İzmir", district: "Konak", address: "Alsancak Kordon, 4 yüz", sellerId: "s4", img: "megalight.jpg", size: "3,2 × 2,4 m × 4", lit: true, digital: false, dailyViews: 120000, prices: [{ unit: "hafta", price: 26000 }, { unit: "15 gün", price: 47000 }, { unit: "ay", price: 88000 }], negotiable: true, printing: "Baskı dahil", x: 8, y: 48, busy: [5,6,7,12,13,14], tags: ["Yaya yoğun"] },
  { id: "g01", title: "Merkez Bina Giydirme", type: "bina", city: "İzmir", district: "Bayraklı", address: "Bayraklı iş merkezi cephesi", sellerId: "s4", img: "bina-giydirme.jpg", size: "28 × 40 m", lit: false, digital: false, dailyViews: 210000, prices: [{ unit: "ay", price: 420000 }], negotiable: true, printing: "Baskı ayrı ücretli", x: 9, y: 47, busy: [], tags: ["Dev format", "İzin süreçli"] },
  { id: "n01", title: "Sahil Parkı Kent Panoları", type: "billboard", city: "Bursa", district: "Nilüfer", address: "Belediye sahil parkı girişleri, 3 pano", sellerId: "s5", img: "hero-billboard.jpg", size: "6 × 3 m × 3", lit: false, digital: false, dailyViews: 54000, prices: [{ unit: "15 gün", price: 21000 }, { unit: "ay", price: 38000 }], negotiable: false, printing: "Reklam veren getirir", x: 20, y: 30, busy: [1,2,3,4,5], tags: ["Belediye", "Etkinlik dönemi"] },
  { id: "d01", title: "Metro Peron Dijital Ekranları", type: "dijital", city: "İstanbul", district: "Şişli", address: "Mecidiyeköy – Levent hattı, 24 ekran", sellerId: "s7", img: "metro-ekran.jpg", size: "75\" × 24", lit: true, digital: true, dailyViews: 420000, prices: [{ unit: "spot", price: 120 }, { unit: "hafta", price: 64000 }], negotiable: false, printing: "Dijital, baskı yok", x: 22.5, y: 21.5, busy: [10,11,12], tags: ["Belediye işleticisi", "Toplu taşıma"] },
  { id: "t01", title: "Lara Sahil Dijital Ekran", type: "dijital", city: "Antalya", district: "Muratpaşa", address: "Lara yolu kavşağı", sellerId: "s6", img: "metro-ekran.jpg", size: "10 × 5 m LED", lit: true, digital: true, dailyViews: 98000, prices: [{ unit: "spot", price: 90 }, { unit: "gün", price: 7500 }, { unit: "hafta", price: 42000 }], negotiable: true, printing: "Dijital, baskı yok", x: 30, y: 74, busy: [], tags: ["Turizm sezonu"] },
  { id: "s01", title: "Koridor Tanıtım Standı", type: "avm-stant", city: "İstanbul", district: "Ataşehir", address: "Kentpark AVM, 1. kat ana koridor", sellerId: "s2", img: "stant-avm.jpg", size: "3 × 3 m", lit: true, digital: false, dailyViews: 28000, prices: [{ unit: "gün", price: 6500 }, { unit: "etkinlik", price: 24000 }], negotiable: true, printing: "Reklam veren getirir", x: 24, y: 23.5, busy: [6,7,13,14,20,21], tags: ["Sampling", "Hafta sonu"] },
  { id: "v01", title: "Şehir İçi Otobüs Giydirme (5 araç)", type: "arac", city: "Gaziantep", district: "Şahinbey", address: "Şehir içi 3 hat", sellerId: "s8", img: "arac-giydirme.jpg", size: "Tam giydirme × 5", lit: false, digital: false, dailyViews: 75000, prices: [{ unit: "ay", price: 58000 }], negotiable: true, printing: "Baskı dahil", x: 70, y: 62, busy: [], tags: ["Hareketli"] },
];

export type Platform = "Instagram" | "TikTok" | "YouTube" | "X" | "LinkedIn" | "Twitch" | "Kick";
export type Package = { name: string; desc: string; price: number; days: number };
export type Influencer = {
  id: string; name: string; handle: string; city: string; niche: string; img: string; gender: "Kadın" | "Erkek"; skills: string[];
  platforms: { p: Platform; followers: number; er: number }[];
  packages: Package[]; rating: number; jobs: number; verified: "Beyan" | "Belge kontrol" ; bio: string; exemption: boolean;
};

export const INFLUENCER_SKILLS = ["Reels", "Ürün incelemesi", "Kutu açılışı", "YouTube entegrasyon", "Ürün yerleşimi", "Mekân tanıtımı", "Mağaza ziyareti", "Vlog", "Canlı yayın", "Skeç", "Seri içerik", "Tarif videosu", "Kombin önerisi", "İndirim kodu", "Çekiliş", "Uzun dönem iş birliği"];

export const INFLUENCERS: Influencer[] = [
  { id: "i1", gender: "Kadın", skills: ["Reels", "Tarif videosu", "YouTube entegrasyon", "Ürün yerleşimi"], name: "Elif Karaca", handle: "@elifmutfakta", city: "İstanbul", niche: "Yemek & Tarif", img: "v2/p6.jpg", platforms: [{ p: "Instagram", followers: 412000, er: 4.1 }, { p: "TikTok", followers: 268000, er: 6.3 }, { p: "YouTube", followers: 96000, er: 3.2 }], packages: [{ name: "1 Reels", desc: "60 sn tarif videosu, ürün yerleşimi", price: 38000, days: 7 }, { name: "Reels + 3 Story", desc: "Link'li story serisi ile", price: 52000, days: 7 }, { name: "YouTube entegrasyon", desc: "Bölüm içi 90 sn tanıtım", price: 64000, days: 14 }], rating: 4.9, jobs: 87, verified: "Belge kontrol", bio: "Evde kolay tarifler, yerel üreticiler ve mutfak ürünleri.", exemption: true },
  { id: "i2", gender: "Kadın", skills: ["Reels", "Mağaza ziyareti", "Kombin önerisi"], name: "Deniz Aksoy", handle: "@denizsokakta", city: "İzmir", niche: "Moda & Stil", img: "v2/p1.jpg", platforms: [{ p: "Instagram", followers: 186000, er: 5.4 }, { p: "TikTok", followers: 342000, er: 7.8 }], packages: [{ name: "Kombin Reels", desc: "Ürünle 3 kombin önerisi", price: 22000, days: 5 }, { name: "Mağaza ziyareti", desc: "Mağazada çekim + story", price: 30000, days: 10 }], rating: 4.8, jobs: 54, verified: "Belge kontrol", bio: "Sokak modası, yerli tasarımcılar ve sürdürülebilir stil.", exemption: true },
  { id: "i3", gender: "Erkek", skills: ["Ürün incelemesi", "Kutu açılışı", "YouTube entegrasyon"], name: "Mert Yalçın", handle: "@mertteknoloji", city: "Ankara", niche: "Teknoloji", img: "v2/p2.jpg", platforms: [{ p: "YouTube", followers: 524000, er: 4.6 }, { p: "X", followers: 132000, er: 1.9 }, { p: "Instagram", followers: 88000, er: 2.7 }], packages: [{ name: "İnceleme videosu", desc: "8–12 dk detaylı inceleme", price: 85000, days: 21 }, { name: "Kutu açılışı Shorts", desc: "60 sn dikey video", price: 24000, days: 7 }], rating: 4.7, jobs: 112, verified: "Belge kontrol", bio: "Telefon, bilgisayar ve akıllı ev ürün incelemeleri.", exemption: false },
  { id: "i4", gender: "Kadın", skills: ["Reels", "İndirim kodu", "Uzun dönem iş birliği"], name: "Selin Doğan", handle: "@selinfit", city: "Antalya", niche: "Spor & Sağlık", img: "v2/p8.jpg", platforms: [{ p: "Instagram", followers: 74000, er: 6.9 }, { p: "TikTok", followers: 121000, er: 8.4 }], packages: [{ name: "Antrenman Reels", desc: "Ürünlü antrenman videosu", price: 12500, days: 5 }, { name: "30 gün iş birliği", desc: "4 Reels + 8 Story + indirim kodu", price: 42000, days: 30 }], rating: 4.9, jobs: 39, verified: "Beyan", bio: "Evde ve salonda antrenman, beslenme önerileri.", exemption: true },
  { id: "i5", gender: "Erkek", skills: ["Mekân tanıtımı", "Vlog", "YouTube entegrasyon"], name: "Kaan Erdem", handle: "@kaanyolda", city: "Nevşehir", niche: "Seyahat", img: "v2/p5.jpg", platforms: [{ p: "Instagram", followers: 236000, er: 3.8 }, { p: "YouTube", followers: 158000, er: 4.0 }], packages: [{ name: "Otel/Destinasyon tanıtımı", desc: "2 gün konaklama, Reels + Story", price: 46000, days: 14 }, { name: "Vlog bölümü", desc: "YouTube vlog içinde tanıtım", price: 58000, days: 21 }], rating: 4.8, jobs: 61, verified: "Belge kontrol", bio: "Anadolu rotaları, butik oteller, yerel lezzetler.", exemption: true },
  { id: "i6", gender: "Erkek", skills: ["Canlı yayın", "Çekiliş"], name: "Burak Şen", handle: "@buraklive", city: "İstanbul", niche: "Oyun & Canlı Yayın", img: "v2/p7.jpg", platforms: [{ p: "Twitch", followers: 98000, er: 9.1 }, { p: "Kick", followers: 64000, er: 8.2 }, { p: "YouTube", followers: 77000, er: 3.5 }], packages: [{ name: "Yayın sponsorluğu", desc: "3 saatlik yayında logo + söz", price: 18000, days: 3 }, { name: "Haftalık seri", desc: "4 yayın + çekiliş", price: 56000, days: 30 }], rating: 4.6, jobs: 28, verified: "Beyan", bio: "Rekabetçi oyunlar ve topluluk etkinlikleri.", exemption: true },
  { id: "i7", gender: "Kadın", skills: ["Reels", "Mekân tanıtımı", "Vlog"], name: "Zeynep Arslan", handle: "@zeynepgunluk", city: "Bursa", niche: "Lifestyle", img: "v2/p3.jpg", platforms: [{ p: "Instagram", followers: 154000, er: 4.4 }, { p: "TikTok", followers: 61000, er: 5.9 }], packages: [{ name: "Günlük vlog Reels", desc: "Gün içinde doğal ürün kullanımı", price: 16000, days: 7 }, { name: "Mekân tanıtımı", desc: "Kafe/mağaza ziyareti + 4 story", price: 21000, days: 10 }], rating: 4.8, jobs: 46, verified: "Belge kontrol", bio: "Şehir hayatı, ev dekorasyonu ve yerel mekânlar.", exemption: true },
  { id: "i8", gender: "Kadın", skills: ["Skeç", "Seri içerik", "Reels"], name: "Ece Tunç", handle: "@ecekomedi", city: "Eskişehir", niche: "Komedi", img: "v2/p4.jpg", platforms: [{ p: "TikTok", followers: 688000, er: 9.6 }, { p: "Instagram", followers: 241000, er: 6.1 }, { p: "YouTube", followers: 52000, er: 3.9 }], packages: [{ name: "Skeç video", desc: "Ürünü konu alan 45 sn skeç", price: 48000, days: 7 }, { name: "Seri (3 video)", desc: "Haftalık 3 skeç + yorum etkileşimi", price: 120000, days: 21 }], rating: 4.9, jobs: 73, verified: "Belge kontrol", bio: "Günlük hayattan komik anlar ve karakterler.", exemption: true },
];

export type Brief = { id: string; brand: string; title: string; budget: [number, number]; city: string; channels: string[]; deadline: string; offers: number; mode: "İlan" | "Ters ihale" };
export const BRIEFS: Brief[] = [
  { id: "r1", brand: "Yöre Kahve Evleri", title: "Ege'de 12 yeni şube açılışı için yerel tanıtım", budget: [150000, 250000], city: "İzmir", channels: ["Influencer", "Megalight", "AVM Stant"], deadline: "18 Kasım", offers: 14, mode: "Ters ihale" },
  { id: "r2", brand: "Atlas Elektronik", title: "Yeni kulaklık serisi için teknoloji inceleme videoları", budget: [200000, 400000], city: "Tüm Türkiye", channels: ["YouTube", "TikTok"], deadline: "25 Kasım", offers: 22, mode: "İlan" },
  { id: "r3", brand: "Vadi Kaynak Su", title: "Yaz öncesi 3 büyük şehirde açık hava kampanyası", budget: [1200000, 2000000], city: "İstanbul · Ankara · İzmir", channels: ["Billboard", "Metro Ekran", "CLP"], deadline: "2 Aralık", offers: 9, mode: "Ters ihale" },
  { id: "r4", brand: "Moda Sokağı Butik", title: "Kış koleksiyonu için moda içerikçileri", budget: [40000, 80000], city: "İstanbul", channels: ["Instagram", "TikTok"], deadline: "15 Kasım", offers: 31, mode: "İlan" },
];

export type Step = { label: string; status: "tamam" | "bekliyor" | "sırada"; amount?: number };
export type Campaign = { id: string; name: string; status: "Yayında" | "Kanıt bekleniyor" | "Teklif aşamasında" | "Tamamlandı"; items: string[]; total: number; escrow: number; steps: Step[] };
export const CAMPAIGNS: Campaign[] = [
  { id: "k1", name: "Kış İndirimi · İstanbul", status: "Kanıt bekleniyor", items: ["b01", "a01", "i1", "i2"], total: 286000, escrow: 214000, steps: [{ label: "Ödeme emanete alındı", status: "tamam", amount: 286000 }, { label: "Billboard yayın kanıtı", status: "bekliyor", amount: 78000 }, { label: "AVM ekran kanıtı", status: "tamam", amount: 112000 }, { label: "Influencer içerikleri", status: "sırada", amount: 96000 }] },
  { id: "k2", name: "Ankara Lansman", status: "Yayında", items: ["c01", "m01", "i3"], total: 165000, escrow: 48000, steps: [{ label: "Ödeme emanete alındı", status: "tamam", amount: 165000 }, { label: "CLP yayın kanıtı", status: "tamam", amount: 32000 }, { label: "Megalight 1. hafta", status: "tamam", amount: 48000 }, { label: "Megalight 2. hafta", status: "bekliyor", amount: 48000 }] },
  { id: "k3", name: "Ege Şube Açılışları", status: "Teklif aşamasında", items: ["k01", "i2"], total: 0, escrow: 0, steps: [{ label: "14 teklif geldi", status: "bekliyor" }] },
];

export const COMMISSION = [
  { cat: "Influencer", rate: 15, payer: "Satıcı" },
  { cat: "Billboard / Megalight", rate: 8, payer: "Satıcı" },
  { cat: "AVM LED & Stant", rate: 10, payer: "Satıcı" },
  { cat: "Belediye noktaları", rate: 6, payer: "Satıcı" },
  { cat: "Dijital ekran (DOOH)", rate: 10, payer: "Satıcı" },
  { cat: "Öne çıkarma", rate: 0, payer: "Sabit ücret · ₺1.500/hafta" },
];

export const CITIES = ["Tüm Türkiye", "İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Gaziantep", "Nevşehir", "Eskişehir"];

export const tl = (n: number) => "₺" + n.toLocaleString("tr-TR");
export const kfmt = (n: number) => n >= 1_000_000 ? (n / 1_000_000).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) + " Mn" : n >= 1000 ? Math.round(n / 1000).toLocaleString("tr-TR") + " B" : String(n);
export const seller = (id: string) => SELLERS.find(s => s.id === id)!;

export const NICHE_TONE: Record<string, string> = {
  "Yemek & Tarif": "bg-[#fff1dc] text-[#c46a00]", "Moda & Stil": "bg-violet-soft text-violet-ink", "Teknoloji": "bg-sky-soft text-sky-ink",
  "Spor & Sağlık": "bg-mint-soft text-mint-ink", "Seyahat": "bg-[#e1f5f4] text-[#14857c]", "Oyun & Canlı Yayın": "bg-rose-soft text-rose-ink",
  "Lifestyle": "bg-rose-soft text-rose-ink", "Komedi": "bg-mint-soft text-mint-ink",
};
