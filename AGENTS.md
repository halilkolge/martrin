# AGENTS.md: Martrin için kodlama ajanı kuralları

Bu dosya, bu repoda çalışan her kodlama ajanının (opencode vb.) uyması gereken sözleşmedir. Her oturumun başında bu dosyayı ve [README.md](README.md) dosyasını baştan sona oku.

## 1. Proje özeti

Martrin, Türkiye'de reklam verenleri influencer'larla ve fiziksel reklam alanlarıyla (billboard, AVM ekranı, belediye noktası) buluşturan bir pazaryeridir. Reklam veren dijital ve fiziksel reklamı tek sepette alır, ödeme emanette bekler, satıcı yayın kanıtı yükler, onaylanınca ödeme satıcıya geçer. Kararların tamamı README'de.

- Arayüz dili: **Türkçe**. Kod, değişken, dosya ve commit önekleri: **İngilizce**.
- Tasarım kaynağı: tıklanabilir prototip (README'deki bağlantı) ve kaynak kodu `design/prototype/`. Logo dosyaları `design/brand/`. Renkler: `#151515` (ink), `#D6F45B` (lime), `#A77BFF` (violet), zemin `#F4F4EF`. Fontlar: Poppins (başlık), DM Sans (gövde).

## 2. Senin görevin

Her seferinde **tek bir GitHub issue'su** üzerinde çalışırsın. Issue'daki **"Ajan görevi"** bölümü senin iş tanımındır:

- **Kapsam:** Ne yapılacak, ne yapılmayacak.
- **Dosyalar:** Dokunabileceğin yerler.
- **Adımlar:** Sırayla uygula.
- **EVAL:** Numaralı, doğrulanabilir kontroller. Her biri bir komutla ya da otomatik testle kanıtlanır.
- **DoD:** Bitti tanımı. Hepsi sağlanmadan iş bitmiş sayılmaz.

Issue'da "Ajan görevi" bölümü yoksa **kod yazma**. Issue'ya "Ajan görevi eksik" diye yorum bırak ve dur.

## 3. Asla yapma

1. `main` dalına doğrudan commit ya da push yapma. Force push yapma.
2. Issue kapsamı dışında kod değiştirme. Fark ettiğin başka sorunları PR açıklamasındaki **Ek bulgular** bölümüne yaz.
3. Testi silme, atlama (`skip`, `only`, `xit`) ya da gevşetme. Lint ya da tip kuralını kapatma. `any`, `@ts-ignore`, `@ts-expect-error`, `eslint-disable` kullanma.
4. Gizli anahtar, şifre, token ya da `.env` dosyası commit etme. Yalnızca `.env.example` güncellenir.
5. Issue izin vermiyorsa yeni paket ekleme. Gerekiyorsa dur ve PR'da gerekçesini yaz.
6. Var olmayan bir API, paket sürümü ya da fonksiyon uydurma. Emin değilsen paketin kendi dokümanına bak. Bulamazsan PR'da "doğrulanamadı" diye belirt.
7. Bir EVAL maddesi geçmediyse işi bitti diye raporlama. Geçmeyen maddeyi olduğu gibi yaz.
8. Veritabanı göçlerini (migration) sonradan düzenleme. Yeni göç ekle.
9. Gerçek kişi, firma ya da kişisel veri kullanma. Örnek veriler hayali olmalı.

## 4. Çalışma akışı

1. **Oku:** Bu dosyayı, README'yi ve issue'nun tamamını oku: hikâye, kabul kriterleri, Ajan görevi.
2. **Dal aç:** Güncel `main`'den `feat/<issue-no>-<kisa-ad>` dalını aç. Örnek: `feat/4-repo-skeleton`.
3. **Plan:** Uygulamadan önce 3–8 maddelik planını yaz. Bu plan PR açıklamasının "Plan" bölümüne girecek.
4. **Uygula:** Küçük ve anlamlı commitler at. Commit mesajı biçimi: `feat(#4): kısa açıklama`. Önekler: `feat`, `fix`, `chore`, `test`, `docs`, `refactor`.
5. **Doğrula:** Bölüm 6'daki standart komutları ve issue'daki her EVAL maddesini çalıştır. Komut çıktılarının son satırlarını sakla.
6. **PR aç:** `.github/pull_request_template.md` şablonunu doldur. Açıklamada `Closes #<issue-no>` olsun. Her EVAL için sonucu ve kanıtı yaz. DoD maddelerini yalnızca gerçekten sağlandıysa işaretle.
7. **Takılırsan:** Aynı hatayı 2 denemede çözemezsen dur. PR'ı **Draft** olarak aç ve "Engeller" bölümüne hatayı, denediklerini ve tam hata çıktısını yaz. Tahminle devam etme.

## 5. Teknoloji yığını (kesinleşti)

Karar: [docs/adr/0001-teknoloji-yigini.md](docs/adr/0001-teknoloji-yigini.md)

- **Uygulama:** Next.js (App Router, `src/` dizini) + TypeScript (`strict: true`)
- **Stil:** Tailwind CSS. Renkler, fontlar ve yarıçaplar tek yerde token olarak tanımlıdır (Tailwind sürümüne göre `@theme` bloğu ya da config). Sabit renk kodunu bileşen içine yazma, token kullan.
- **Veritabanı:** PostgreSQL + PostGIS, Drizzle ORM ve drizzle-kit göçleri. Yerel ortamda Docker Compose.
- **Doğrulama:** Zod şemaları (form ve sunucu tarafı ortak).
- **Test:** Vitest + Testing Library (birim ve bileşen), Playwright (uçtan uca).
- **Paket yöneticisi:** pnpm. Lockfile commit edilir. Node sürümü `.nvmrc`'de.
- **Referans tasarım:** `design/prototype/` (yalnızca okunur, derlenmez).

## 6. Standart komutlar

Her PR'dan önce hepsi hatasız geçmeli. Komutlar E0.2 issue'sunda kurulur, kurulduktan sonra bu liste geçerlidir.

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e      # yalnızca issue'da e2e EVAL'i varsa
```

## 7. Kod standartları

- Dosya ve klasör adları `kebab-case`. React bileşenleri `PascalCase`. Fonksiyon ve değişkenler `camelCase`.
- Bileşenler küçük ve tek amaçlı olmalı. 200 satırı geçen dosyayı böl.
- Para tutarları kuruş cinsinden tamsayı tutulur (`priceKurus: number`), ekranda `₺1.490` biçiminde gösterilir. Biçimleme yalnızca ortak `formatTRY` yardımcı fonksiyonuyla yapılır.
- Tarih ve saat veritabanında UTC tutulur, ekranda `Europe/Istanbul` ile gösterilir.
- Erişilebilirlik: her form alanının `label`'ı, her görselin `alt`'ı olmalı. Klavyeyle kullanılabilir olmalı, odak halkası görünmeli.
- Duyarlı tasarım: 360px genişlikte yatay kaydırma olmamalı. 1440px'te düzen bozulmamalı.
- Kullanıcıya görünen bütün metinler Türkçe olmalı. Hata mesajları kullanıcının ne yapacağını söylemeli.
- Sunucu tarafında her girdi doğrulanır (şema doğrulama). Yetki kontrolü yalnızca arayüzde yapılmaz.

## 8. Genel Bitti Tanımı (DoD)

Her PR için, issue'daki DoD maddelerine ek olarak şunlar geçerlidir:

- [ ] Issue'daki bütün EVAL maddeleri geçti ve kanıtı PR'da.
- [ ] `lint`, `typecheck`, `test` ve `build` hatasız. Uyarı sayısı artmadı.
- [ ] Yeni mantık için test yazıldı: her yeni fonksiyon ya da uç nokta için en az 1 başarılı ve 1 hatalı durum.
- [ ] Kapsam dışı değişiklik yok. Değişen dosyalar issue'nun "Dosyalar" listesiyle uyumlu.
- [ ] Yeni ortam değişkeni varsa `.env.example`'a eklendi.
- [ ] Arayüz değiştiyse 360px ve 1440px ekran görüntüleri PR'da.
- [ ] README ya da dokümanlar etkilendiyse güncellendi.
- [ ] PR açıklamasında `Closes #<issue-no>` var.

## 9. Görev tanımlarının yeri

- Görev şablonu: [docs/agent-task-template.md](docs/agent-task-template.md)
- Backlog verisi: [docs/backlog.json](docs/backlog.json)
- İlk plan notları: [docs/ilk-plan.md](docs/ilk-plan.md)

## 10. Risk seviyeleri: hangi iş ajana gider

Her PBI issue'sunda bir risk etiketi vardır. **Çalışmaya başlamadan önce etikete bak.**

| Etiket | Ne demek | Ajan ne yapar |
|---|---|---|
| `risk: yeşil` | İskelet, arayüz bileşenleri, statik sayfalar, CI, testler, dokümantasyon | Görevi uygular, PR açar |
| `risk: sarı` | Veritabanı şeması, sorgular, API uç noktaları, form işleme, kişisel veri maskeleme | Görevi uygular, PR açar. PR satır satır incelenir. Her EVAL koordinatör tarafından yeniden çalıştırılır |
| `risk: kırmızı` | Giriş, şifre, oturum, yetkilendirme, ödeme, emanet, komisyon hesabı, IBAN/TCKN gibi kişisel veri, gizli anahtarlar, güvenlik testi | **Çalışmaz.** Issue'ya yorum yazmadan dur. Bu işler ajana verilmez |
| `insan işi` | Karar, sözleşme, hesap açma, avukat/müşavir işi | **Çalışmaz** |

Sarı ya da yeşil bir işte kırmızı kapsamda koda dokunman gerekirse dur. PR'ı Draft aç ve "Engeller" bölümüne yaz.

## 11. İnceleme ve red kuralı

- Koordinatör, PR'daki her EVAL'i kendi ortamında yeniden çalıştırır.
- PR'da "geçti" diye işaretlenen tek bir madde gerçekte geçmiyorsa PR'ın tamamı reddedilir.
- Kapsam dışı değişiklik varsa PR reddedilir.
- Geçmeyen bir maddeyi dürüstçe "geçmedi" diye yazmak red sebebi değildir. Bu durumda düzeltme istenir.
- Her inceleme `docs/ajan-incelemeleri.md` dosyasına kaydedilir: PR, model, karar ve neden.
