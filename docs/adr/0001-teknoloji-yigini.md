# ADR 0001: Teknoloji yığını

- **Tarih:** 16 Kasım 2026
- **Durum:** Kabul edildi
- **Karar veren:** Okan (karar kartı, issue #3)

## Bağlam

İlk plan notları ([docs/ilk-plan.md](../ilk-plan.md)) .NET Core + jQuery + PostgreSQL öneriyordu. Karar defterindeki E3 kararı ise Next.js + TypeScript + PostgreSQL (PostGIS) idi. Kodlama görevleri ücretsiz modellerle çalışan kodlama ajanlarına (opencode) verilecek. Bu ajanların hata payını düşürmek önemli.

## Seçenekler

1. **Next.js + TypeScript (tek dil):** Ön ve arka yüz tek projede ve tek dilde. Prototip (React + TS + Tailwind) bileşenleri doğrudan taşınabilir. SEO ve PWA desteği güçlü.
2. **.NET Core API + Next.js ön yüz:** İki dil, iki proje. Görevler ve testler ikiye bölünür.
3. **.NET Core + jQuery:** Prototip yeniden yazılır. PWA, SEO ve bileşen tekrar kullanımı için ek iş çıkar.

## Karar

**Next.js (App Router) + TypeScript (strict) + Tailwind CSS + PostgreSQL/PostGIS + Drizzle ORM.** Testler Vitest + Testing Library ve Playwright ile yazılır. Paket yöneticisi pnpm.

## Gerekçe

- Tek dil ve tek proje, ajan görevlerini küçük ve bağımsız tutmayı kolaylaştırır.
- Prototip kodu tasarım kaynağı olarak doğrudan kullanılabilir.
- Drizzle'ın PostGIS `geometry` kolon desteği, harita ve konum sorguları için yeterli.
- Sunucu tarafı render, influencer ve alan sayfalarının arama motorlarında görünmesini sağlar.

## Sonuçlar

- AGENTS.md'deki yığın bölümü bu karara göre kesinleşti.
- .NET planı arşivde ([docs/ilk-plan.md](../ilk-plan.md)) kalır.
- Barındırma (hosting) ve staging ortamı ayrı bir kararla seçilecek (E0.3).
