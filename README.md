# Martrin

> **Göz neredeyse, markan orada.**  
> Influencer'dan billboarda, 81 ilde tek sepet.

Martrin, Türkiye'de reklam vermek isteyen herkesi (küçük esnaftan ulusal markaya, ajanslardan kamu kurumlarına) reklam alanı sunan herkesle buluşturan bir pazaryeridir. Reklam alanları iki gruptan oluşur:

1. **Dijital alanlar:** Influencer'lar ve içerik üreticileri (Instagram, TikTok, YouTube, X, LinkedIn, Twitch, Kick)
2. **Fiziksel alanlar:** AVM ekranları ve stantları, billboard / raket / megalight panoları, belediye reklam noktaları (durak, CLP, köprü), dijital ekranlar (DOOH)

Benzer ürünler yalnızca influencer tarafını çözüyor. **Martrin'in farkı, dijital ve fiziksel reklamı tek kampanyada, tek sepette ve tek ödemeyle birleştirmesi.** Örneğin bir marka İzmir lansmanında 10 yerel influencer'ı, 3 AVM ekranını ve 5 billboard'u aynı ekrandan planlayıp öder.

## Bağlantılar

| | |
|---|---|
| Tıklanabilir prototip | https://claude.ai/artifact/46Q2bjVMCLp5g5pwodibr8 |
| Karar defteri (tüm sorular ve şıklar) | https://claude.ai/artifact/B1FFZ1PSgV2U5aCqc6kkRo |
| İş listesi (issue'lar) | https://github.com/halilkolge/martrin/issues |
| MVP kilometre taşı | https://github.com/halilkolge/martrin/milestone/1 |
| Faz 2 kilometre taşı | https://github.com/halilkolge/martrin/milestone/2 |
| İlk plan notları (eski README) | [docs/ilk-plan.md](docs/ilk-plan.md) |
| Backlog verisi | [docs/backlog.json](docs/backlog.json) |

## Roller

| Rol | Açıklama |
|---|---|
| Reklam veren | Bireysel, KOBİ ya da kurumsal marka. Alan ve influencer bulur, sepete ekler, öder, kanıtı onaylar. |
| Ajans | Birden fazla reklam vereni yönetir, ekip üyeleri ve onay akışı vardır. |
| Influencer / içerik üreticisi | En az 5.000 takipçiyle katılır, paket satar, teklif ve ilanlara yanıt verir. |
| Fiziksel alan sahibi | AVM, açık hava şirketi, işletme ya da belediye. Alanlarını takvimle satar. |
| Ekip üyesi | Satıcının davet ettiği menajer, içerik asistanı ya da muhasebeci. Yalnızca rolünün izin verdiği sayfaları görür. |
| Admin / moderatör | Başvuru ve ilan onayı, uyuşmazlık, komisyon ayarları, finans. |

## Nasıl çalışır?

1. Reklam veren alanları ve influencer'ları filtreleyip **tek sepete** ekler (ya da ilan açar, teklif ister, ters ihale başlatır).
2. Ödeme lisanslı bir ödeme kuruluşunda **emanette** bekler. Uzun kampanyalarda ödeme aşamalara bölünür.
3. Satıcı reklamı yayınlar ve **yayın kanıtı** yükler: tarih damgalı, konumlu fotoğraf ve video (influencer için paylaşım linki ve istatistik).
4. Reklam veren kanıtı onaylar. 72 saat içinde itiraz etmezse sistem kendiliğinden onaylar.
5. Kategori komisyonu düşülür, kalan tutar satıcıya aktarılır. Anlaşmazlıkta Martrin inceler ve karar verir.

## Alınan kararlar

Kararların tamamı ve şıkları karar defterinde. Özet (4 Kasım 2026):

| Kod | Konu | Karar |
|---|---|---|
| A1 | Gelir modeli | Komisyon + ücretli öne çıkarma. Abonelik de eklenebilir, kesin değil. |
| A3 | Platformun rolü | Her ölçekte self-servis pazaryeri, istenirse ekip desteği. |
| A4 | Komisyon oranı | Kategoriye göre, oranları admin ayarlar. |
| B1 | İlk fiziksel envanter | Hepsi birlikte: kendi ağımız, açık hava şirketleriyle toplu anlaşma ve self-servis kayıt. |
| B2 | Belediye alanları | İkisi birden: ihaleyi almış işletici şirketler ve doğrudan belediye hesabı. |
| B3 | Fiziksel alan fiyatlama | Liste fiyatı + karşı teklif. |
| B4 | Satış birimleri | Günlük, haftalık, 15 günlük, aylık, dijital ekran spotu, tek seferlik etkinlik (alan sahibi seçer). |
| B5 | Baskı / montaj / söküm | Seçenekli, ama ilk aşamada yalnızca reklam veren ile alan sahibi arasında. Platform baskı hizmeti vermez. |
| B6 | Yayın kanıtı | Zorunlu tarih damgalı ve konumlu fotoğraf + video. Ödeme kanıttan sonra. İstenirse ücretli saha denetimi. |
| C1 | Sosyal platformlar | Hepsi: Instagram, TikTok, YouTube, X, LinkedIn, Twitch, Kick. |
| C2 | Minimum takipçi | 5.000+ (admin panelinden değiştirilebilir). |
| C3 | Veri doğrulama | Önce beyan + ekran görüntüsü, API bağlantıları ikinci fazda. |
| C4 | Influencer satış modelleri | Hepsi: ilan + başvuru, hazır paket, özel teklif, satış başına komisyon, ters ihale. |
| D2 | Emanet ödeme | Emanet + aşamalı: küçük işler tek seferde, uzun kampanyalar aşama aşama. |
| D3 | Fatura modeli | Satıcı kendi faturasını keser, platform yalnızca komisyonunu faturalar (mali müşavirle teyit edilecek). |
| D4 | Faturasız influencer | Sosyal içerik üreticisi vergi istisnası kapsamındaki banka hesabına ödeme (güncel kurallar müşavirle teyit edilecek). |
| D5 | Hukuk / müşavir | Henüz yok. Danışman kontrol listesi hazırlanacak. |
| E1 | İlk sürüm kanalı | Web + PWA. Mağaza uygulamaları ikinci fazda. |
| E2 | Hazır script mi, sıfırdan mı | Hibrit: scriptler ilham, çekirdek sıfırdan. |
| E3 | Teknoloji | Next.js + TypeScript + PostgreSQL (PostGIS). **Not:** [ilk plan notları](docs/ilk-plan.md) .NET Core + jQuery öneriyor; son karar [E0.1](https://github.com/halilkolge/martrin/issues/3) işinde verilecek. |
| Marka | Logo ve slogan | Logo: "Pano-m" (üç ayaklı pano biçiminde m). Slogan: "Göz neredeyse, markan orada." |

### Açık sorular

- **A2:** Satış komisyonunu kim ödesin?
- **A5:** Komisyon dışında hangi gelir kalemleri olsun?
- **D1:** Hangi ödeme altyapısını kullanalım? (iyzico Pazaryeri, PayTR, Param, Sipay, Craftgate karşılaştırması hazırlanacak)
- **E4:** İlk sürüm için hedef süre ne olsun?
- **F1:** Hangi coğrafyada başlayalım?
- **F2:** Önce hangi tarafı toplayalım?
- **F3:** İlk sürümde ajans hesabı olsun mu?
- **F4:** Birleşik kampanya planlayıcı ne zaman gelsin?

## Prototip

Tıklanabilir prototip (Vite + React + TypeScript + Tailwind) tasarım ve akışları göstermek içindir, içerikler ve isimler hayalidir. Sayfalar:

- Ana sayfa, Reklam alanları (harita ve filtre), İçerik üreticileri (sol filtre paneli), alan ve influencer detayları
- Sepet, İlanlar ve ihaleler, Ücretler ve paketler, İletişim
- Reklam veren paneli, Satıcı paneli, Ekibim (rol ve sayfa yetkisi), Kazanç defteri, Yönetim
- Belediyeler için, Satıcı ol (alan sahibi / influencer başvurusu), Emanet ödeme, Yayın kanıtı, KVKK ve reklam kılavuzu

Görsel yön: koyu zemin (#151515), lime (#D6F45B) ve mor (#A77BFF) vurgular, Poppins / DM Sans, geniş köşe yarıçapları.

## Yol haritası ve iş listesi

İşler GitHub issue'ları olarak takip edilir: **12 epic, 60 PBI**, toplam **309 puan** (MVP: 52 PBI, 248 puan). Her PBI'da kullanıcı hikâyesi, kabul kriterleri ve işaretlenebilir adımlar var. PBI'lar epic'lerine alt görev olarak bağlı.

Etiketler: `epic`, `pbi`, `E0`–`E11` (epic kodu), `sp-1`…`sp-13` (puan). Kilometre taşları: `MVP`, `Faz 2`.

### E0 · Temel ve altyapı ([#2](https://github.com/halilkolge/martrin/issues/2))

Ekibin aynı zeminde, güvenle geliştirip yayına alabilmesi. Toplam 20 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#3](https://github.com/halilkolge/martrin/issues/3) | Teknoloji yığını kararı | MVP | 2 | İki seçeneğin artı/eksi tablosunu çıkar; Ekip yetkinliği, hız, SEO, PWA ihtiyacını puanla; Kararı ADR olarak yaz ve README'yi güncelle |
| [#4](https://github.com/halilkolge/martrin/issues/4) | Repo iskeleti ve kod standartları | MVP | 3 | Seçilen yığınla proje iskeletini kur; Lint, format, commit kurallarını ekle; Dal koruma ve PR şablonunu ayarla; .env örnek dosyasını ekle |
| [#5](https://github.com/halilkolge/martrin/issues/5) | CI/CD hattı | MVP | 3 | GitHub Actions iş akışını yaz; Staging ortamını kur; Gizli anahtarları ortam değişkenlerine taşı |
| [#6](https://github.com/halilkolge/martrin/issues/6) | Veritabanı şeması ve göç altyapısı | MVP | 5 | Varlık-ilişki diyagramını çiz; Göç aracını kur; İlk göçü yaz; Prototipteki hayali verilerle seed oluştur |
| [#7](https://github.com/halilkolge/martrin/issues/7) | Tasarım sistemi ve ortak bileşenler | MVP | 5 | Prototipten tasarım token'larını çıkar; Temel bileşenleri yaz; Header ve footer'ı kur; Bileşen önizleme sayfası ekle |
| [#8](https://github.com/halilkolge/martrin/issues/8) | Hata izleme ve loglama | MVP | 2 | Hata izleme aracını seç ve kur; Log seviyelerini ve maskelemeyi ayarla |

### E1 · Hesap, kimlik ve ekip ([#9](https://github.com/halilkolge/martrin/issues/9))

Herkesin doğru rolle, güvenle girebilmesi. Toplam 34 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#10](https://github.com/halilkolge/martrin/issues/10) | Kayıt ve giriş | MVP | 5 | Kimlik doğrulama altyapısını kur; Kayıt, giriş, şifre sıfırlama ekranlarını yap; SMS sağlayıcısını bağla; Oturum ve hız sınırını ekle |
| [#11](https://github.com/halilkolge/martrin/issues/11) | Roller ve yetkilendirme | MVP | 3 | Rol ve izin modelini kur; Sunucu tarafı yetki kontrolünü ekle; Menüyü role göre süz |
| [#12](https://github.com/halilkolge/martrin/issues/12) | Alan sahibi başvurusu | MVP | 5 | Prototipteki SellerJoin akışını gerçek forma çevir; Belge yüklemeyi ekle; Admin onay kuyruğuna bağla; Onay/red e-postası gönder |
| [#13](https://github.com/halilkolge/martrin/issues/13) | Influencer başvurusu | MVP | 5 | Platform hesap satırlarını yap; Eşik kontrolünü ayardan oku; Ekran görüntüsü yüklemeyi ekle; Admin onayına bağla |
| [#14](https://github.com/halilkolge/martrin/issues/14) | Kimlik ve vergi doğrulama (KYC) | MVP | 5 | Doğrulama yöntemini seç (servis ya da elle); Admin inceleme ekranını yap; Rozeti ekle |
| [#15](https://github.com/halilkolge/martrin/issues/15) | Ekip yönetimi | MVP | 8 | Hesap altı kullanıcı modelini kur; Davet akışını yap; Yetki matrisini sunucuda uygula; Onay akışını ve günlüğü ekle |
| [#16](https://github.com/halilkolge/martrin/issues/16) | İki adımlı doğrulama | Faz 2 | 3 | 2FA altyapısını kur; Ayarlar ekranını yap |

### E2 · Influencer vitrini ([#17](https://github.com/halilkolge/martrin/issues/17))

Reklam verenin doğru içerik üreticisini hızla bulması. Toplam 28 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#18](https://github.com/halilkolge/martrin/issues/18) | Influencer profili ve paketler | MVP | 5 | Profil düzenleme ekranı; Platform hesapları bileşeni; Paket CRUD |
| [#19](https://github.com/halilkolge/martrin/issues/19) | Influencer listeleme ve filtre | MVP | 5 | Arama sorgusu ve indeksleri yaz; Sol filtre panelini kur (prototipteki gibi); Sayfalama ve URL senkronu; Boş sonuç durumu |
| [#20](https://github.com/halilkolge/martrin/issues/20) | Influencer detay sayfası | MVP | 5 | Detay sayfasını kur; Değerlendirme ve soru modelleri; Benzer önerisi (aynı kategori+şehir) |
| [#21](https://github.com/halilkolge/martrin/issues/21) | Sosyal medya API doğrulaması | Faz 2 | 13 | Her platform için API başvurusu; Bağlama akışı; Zamanlanmış güncelleme |

### E3 · Fiziksel alan envanteri ([#22](https://github.com/halilkolge/martrin/issues/22))

Billboard, AVM ve belediye alanlarının takvimle satılabilmesi. Toplam 45 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#23](https://github.com/halilkolge/martrin/issues/23) | Alan oluşturma | MVP | 8 | Alan formu; PostGIS konum alanı ve harita seçici; Fotoğraf yükleme; Admin onayına bağla |
| [#24](https://github.com/halilkolge/martrin/issues/24) | Fiyat birimleri | MVP | 3 | Fiyat modelini kur; Fiyat düzenleme bileşeni |
| [#25](https://github.com/halilkolge/martrin/issues/25) | Doluluk takvimi ve opsiyon | MVP | 8 | Takvim veri modeli; Takvim bileşeni; Opsiyon zamanlayıcısı; Çakışma kontrolü |
| [#26](https://github.com/halilkolge/martrin/issues/26) | Toplu envanter yükleme | MVP | 5 | Excel şablonu; İçe aktarma ve doğrulama; Hata raporu ekranı |
| [#27](https://github.com/halilkolge/martrin/issues/27) | Alan arama ve harita | MVP | 8 | Coğrafi sorgular; Harita bileşeni; Filtre paneli |
| [#28](https://github.com/halilkolge/martrin/issues/28) | Alan detay sayfası | MVP | 5 | Detay sayfası; Tarih seçici ve fiyat hesabı |
| [#29](https://github.com/halilkolge/martrin/issues/29) | Belediye ve işletici hesapları | Faz 2 | 8 | Kurum hesap tipi; Gözlemci rolü; Kota ve indirim kuralları; Belediye başvuru formu |

### E4 · Kampanya, sepet ve teklif ([#30](https://github.com/halilkolge/martrin/issues/30))

Dijital ve fiziksel reklamı tek kampanyada satın alabilmek. Toplam 41 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#31](https://github.com/halilkolge/martrin/issues/31) | Tek sepet karma kampanya | MVP | 5 | Sepet modeli; Sepet sayfası; Sipariş oluşturma |
| [#32](https://github.com/halilkolge/martrin/issues/32) | Sipariş durum akışı | MVP | 5 | Durum makinesini yaz; Geçiş kurallarını test et; Bildirimleri bağla |
| [#33](https://github.com/halilkolge/martrin/issues/33) | Teklif ve karşı teklif | MVP | 5 | Teklif modeli; Teklif ekranları; Süre aşımı |
| [#34](https://github.com/halilkolge/martrin/issues/34) | İlan ve başvuru (brief) | MVP | 5 | İlan formu; Başvuru akışı; İlanlar sayfası |
| [#35](https://github.com/halilkolge/martrin/issues/35) | Ters ihale | Faz 2 | 8 | İhale modeli; Canlı teklif listesi; Kapanış işi |
| [#36](https://github.com/halilkolge/martrin/issues/36) | Mesajlaşma | MVP | 5 | Mesaj modeli; Sohbet ekranı; Yasaklı içerik filtresi |
| [#37](https://github.com/halilkolge/martrin/issues/37) | Satış başına komisyon (kod/link) | Faz 2 | 8 | Kod modeli; Takip linki; Raporlama |

### E5 · Ödeme, emanet ve fatura ([#38](https://github.com/halilkolge/martrin/issues/38))

Paranın güvenle tutulup kanıttan sonra satıcıya geçmesi. Toplam 35 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#39](https://github.com/halilkolge/martrin/issues/39) | Ödeme sağlayıcı seçimi | MVP | 3 | Sağlayıcıların pazaryeri koşullarını topla; Teklif iste; Karar toplantısı |
| [#40](https://github.com/halilkolge/martrin/issues/40) | Ödeme entegrasyonu | MVP | 8 | Sağlayıcı SDK entegrasyonu; Ödeme sayfası; Webhook işleme |
| [#41](https://github.com/halilkolge/martrin/issues/41) | Emanet ve aşamalı ödeme | MVP | 8 | Emanet bakiye modeli; Milestone planı; Serbest bırakma işi; İade kuralları |
| [#42](https://github.com/halilkolge/martrin/issues/42) | Satıcı alt üye işyeri ve aktarım | MVP | 5 | Alt üye kayıt akışı; IBAN doğrulama; Aktarım raporu |
| [#43](https://github.com/halilkolge/martrin/issues/43) | Kategori bazlı komisyon | MVP | 3 | Komisyon ayar ekranı; Hesap fonksiyonu ve testleri |
| [#44](https://github.com/halilkolge/martrin/issues/44) | Komisyon faturası | MVP | 5 | e-Fatura sağlayıcısını seç; Fatura oluşturma; Fatura yükleme alanı |
| [#45](https://github.com/halilkolge/martrin/issues/45) | İptal ve iade | MVP | 3 | İptal kuralları; İade çağrısı |

### E6 · Yayın kanıtı ve uyuşmazlık ([#46](https://github.com/halilkolge/martrin/issues/46))

Reklamın gerçekten yayınlandığının kanıtlanması. Toplam 26 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#47](https://github.com/halilkolge/martrin/issues/47) | Fiziksel alan kanıtı | MVP | 8 | Kanıt yükleme ekranı; EXIF/konum doğrulama; Kanıt kontrol listesi |
| [#48](https://github.com/halilkolge/martrin/issues/48) | Influencer kanıtı | MVP | 5 | Kanıt formu; Hatırlatma işi; Etiket kontrolü |
| [#49](https://github.com/halilkolge/martrin/issues/49) | Onay ve otomatik onay | MVP | 3 | Onay ekranı; Zamanlayıcı |
| [#50](https://github.com/halilkolge/martrin/issues/50) | İtiraz ve uyuşmazlık | MVP | 5 | Uyuşmazlık modeli; Admin karar ekranı; Kısmi iade |
| [#51](https://github.com/halilkolge/martrin/issues/51) | Saha denetimi siparişi | Faz 2 | 5 | Ek hizmet ürünü; Denetçi rolü ve rapor |

### E7 · Paneller ve bildirimler ([#52](https://github.com/halilkolge/martrin/issues/52))

Her rolün işini tek ekrandan yönetmesi. Toplam 20 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#53](https://github.com/halilkolge/martrin/issues/53) | Reklam veren paneli | MVP | 5 | Panel sayfası; Özet sorguları |
| [#54](https://github.com/halilkolge/martrin/issues/54) | Satıcı paneli | MVP | 5 | Panel sayfası; Talepler listesi; Takvim görünümü |
| [#55](https://github.com/halilkolge/martrin/issues/55) | Kazanç defteri | MVP | 5 | Defter modeli; Elle kayıt formu; Grafik ve dışa aktarma |
| [#56](https://github.com/halilkolge/martrin/issues/56) | Bildirimler | MVP | 5 | E-posta servisi; Push altyapısı; Tercihler ekranı |

### E8 · Gelir kalemleri ([#57](https://github.com/halilkolge/martrin/issues/57))

Komisyon dışı gelirlerin satılabilmesi. Toplam 21 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#58](https://github.com/halilkolge/martrin/issues/58) | Öne çıkarma | MVP | 5 | Ürün ve ödeme; Sıralama ağırlığı; Süre işi |
| [#59](https://github.com/halilkolge/martrin/issues/59) | Abonelik paketleri | Faz 2 | 8 | Abonelik modeli; Tekrarlayan ödeme; Özellik bayrakları; Ücretler sayfası |
| [#60](https://github.com/halilkolge/martrin/issues/60) | Ölçüm raporu | Faz 2 | 8 | Kısa link servisi; Rapor sayfası |

### E9 · Yönetim paneli ([#61](https://github.com/halilkolge/martrin/issues/61))

Operasyon ekibinin platformu yönetmesi. Toplam 13 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#62](https://github.com/halilkolge/martrin/issues/62) | Onay kuyrukları | MVP | 5 | Kuyruk ekranları; Durum güncelleme |
| [#63](https://github.com/halilkolge/martrin/issues/63) | Platform ayarları | MVP | 3 | Ayar modeli; Ayar ekranı |
| [#64](https://github.com/halilkolge/martrin/issues/64) | Finans ve raporlar | MVP | 5 | Rapor sorguları; Rapor ekranı |

### E10 · İçerik, hukuk ve SEO ([#65](https://github.com/halilkolge/martrin/issues/65))

Ziyaretçiye güven veren ve yasal uyumlu bir site. Toplam 13 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#66](https://github.com/halilkolge/martrin/issues/66) | Ana sayfa ve bilgi sayfaları | MVP | 5 | Prototip sayfalarını gerçek içerikle kur; İletişim formu gönderimi |
| [#67](https://github.com/halilkolge/martrin/issues/67) | Hukuki metinler ve danışman kontrol listesi | MVP | 3 | Kontrol listesini hazırla; Avukattan metin al; Sayfalara yerleştir |
| [#68](https://github.com/halilkolge/martrin/issues/68) | Çerez yönetimi | MVP | 2 | Çerez bandı; Tercih paneli |
| [#69](https://github.com/halilkolge/martrin/issues/69) | SEO ve analitik | MVP | 3 | SEO bileşenleri; Site haritası; Analitik kurulumu |

### E11 · PWA ve yayına alma ([#70](https://github.com/halilkolge/martrin/issues/70))

Pilotla canlıya güvenle çıkmak. Toplam 13 puan.

| # | PBI | Faz | Puan | Adımlar |
|---|---|---|---|---|
| [#71](https://github.com/halilkolge/martrin/issues/71) | PWA | MVP | 3 | Manifest ve ikonlar; Service worker |
| [#72](https://github.com/halilkolge/martrin/issues/72) | Güvenlik ve performans testi | MVP | 5 | Güvenlik taraması; Performans iyileştirmeleri |
| [#73](https://github.com/halilkolge/martrin/issues/73) | Pilot ve canlıya alma | MVP | 5 | Pilot planı; Canlı ortam kurulumu; Lansman kontrol listesi |

## Çalışma şekli

- `main` dalı korunur, doğrudan commit atılmaz. Geliştirme `prototip` ya da iş başına açılan dallarda yapılır ve PR ile birleştirilir.
- PR açıklamasına `Closes #<issue>` yazılınca ilgili iş birleşmeyle kapanır.
- Pano: GitHub Projects'te Board görünümü (Backlog → Sprint → Yapılıyor → İncelemede → Bitti).
