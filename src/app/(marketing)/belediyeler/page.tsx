"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { formatTRY } from "@/lib/format-try";

const models = [
  {
    tag: "Model 1",
    title: "Doğrudan belediye hesabı",
    text: "Belediye kendi reklam noktalarını Martrin'de açar. Fiyatı, takvimi ve onayı belediye ekibi yönetir.",
    feats: [
      "Kurumsal hesap, birim bazlı yetki",
      "Gelir doğrudan belediye hesabına aktarılır",
      "Kamusal duyuru kotası belediye elinde",
      "Meclis ve denetim için dışa aktarılabilir rapor",
    ],
  },
  {
    tag: "Model 2",
    title: "İhaleyi kazanmış işletici şirket",
    text: "Reklam noktalarının işletme hakkını ihaleyle alan şirket envanteri listeler. Belediye salt okunur izleme hesabıyla süreci görür.",
    feats: [
      "Şirket satıcı hesabı, toplu envanter yükleme",
      "Belediyeye gözlemci erişimi",
      "Sözleşmedeki pay oranına göre raporlama",
      "İhale şartnamesi alanlarını kayda ekleme",
    ],
  },
];
const benefits = [
  [
    "Şeffaf doluluk",
    "Her noktanın hangi hafta dolu olduğunu herkes aynı takvimde görür. Boş kalan haftalar kendiliğinden öne çıkar.",
  ],
  [
    "Emanetli tahsilat",
    "Reklam veren ödemeyi baştan yapar. Para lisanslı ödeme kuruluşunda emanette bekler, yayın onaylanınca aktarılır.",
  ],
  [
    "Kanıtlı yayın",
    "Montajdan sonra tarih damgalı, konumlu fotoğraf ve video yüklenir. Reklam veren 72 saat içinde itiraz etmezse iş onaylanır.",
  ],
  [
    "Raporlama",
    "Nokta, ilçe ve dönem bazında doluluk ve gelir raporu. Excel ve PDF olarak indirilebilir.",
  ],
];
const stats = [
  ["Nokta", "214", "CLP, megalight ve dijital ekran"],
  ["Ortalama doluluk", "%71", "İlk 6 ayda %48'den yükseldi"],
  ["Aylık net gelir", formatTRY(1_184_000 * 100), "Komisyon düşülmüş"],
  ["Kamusal duyuru", "1.920", "Ücretsiz yayın haftası / yıl"],
];
const types = [
  { label: "CLP (raket)", price: 3500 },
  { label: "Megalight", price: 9000 },
  { label: "Dijital ekran", price: 6500 },
];
const orgTypes = [
  "Büyükşehir belediyesi",
  "İlçe belediyesi",
  "Belde belediyesi",
  "Belediye iştiraki",
  "İşletici şirket (ihale)",
];
const RATE = 6;

function Calculator() {
  const [points, setPoints] = useState(40);
  const [price, setPrice] = useState(3500);
  const [occupancy, setOccupancy] = useState(60);
  const gross = (points * price * 52 * occupancy) / 100;
  const net = Math.round(gross * (1 - RATE / 100));
  return (
    <section id="gelir" className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
      <Card className="grid gap-5">
        <div>
          <p className="text-sm text-muted">Gelir tahmini</p>
          <h2 className="font-display text-2xl font-semibold">
            Noktaların ne kadar kazandırır?
          </h2>
          <p className="text-muted">
            Değerleri değiştir, tahmin anında güncellenir.
          </p>
        </div>
        <div className="grid gap-2">
          <span className="font-medium">Nokta tipi</span>
          <div className="grid gap-2 sm:grid-cols-3">
            {types.map((t) => (
              <Button
                key={t.label}
                variant={price === t.price ? "dark" : "outline"}
                onClick={() => setPrice(t.price)}
                className="h-auto min-h-11 flex-col py-2"
              >
                {t.label}
                <span className="text-xs">
                  ort. {formatTRY(t.price * 100)} / hafta
                </span>
              </Button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nokta sayısı"
            type="number"
            min={1}
            max={5000}
            value={points}
            onChange={(e) =>
              setPoints(
                Math.max(0, Math.min(5000, Number(e.target.value) || 0)),
              )
            }
          />
          <Input
            label="Ortalama haftalık fiyat (₺)"
            type="number"
            min={0}
            step={250}
            value={price}
            onChange={(e) => setPrice(Math.max(0, Number(e.target.value) || 0))}
          />
        </div>
        <div className="grid gap-2">
          <Input
            label={
              <>
                Doluluk oranı <span>%{occupancy}</span>
              </>
            }
            type="range"
            min={0}
            max={100}
            step={5}
            value={occupancy}
            className="accent-ink"
            onChange={(e) => setOccupancy(Number(e.target.value))}
          />
          <span className="flex justify-between text-xs text-muted">
            <span>%0</span>
            <span>Pilot belediyelerde ortalama %71</span>
            <span>%100</span>
          </span>
        </div>
      </Card>
      <div className="grid content-start gap-4 rounded-card bg-lime p-6 md:p-8">
        <div className="flex justify-between gap-2">
          <b className="font-display text-xl">Tahmini net gelir</b>
          <span className="rounded-full bg-ink px-3 py-1 text-xs text-lime">
            %{RATE} komisyon düşüldü
          </span>
        </div>
        <div>
          <span className="text-sm">Aylık</span>
          <p
            className="break-all font-display text-4xl font-semibold"
            aria-live="polite"
          >
            {formatTRY(Math.round(net / 12) * 100)}
          </p>
        </div>
        <div className="grid gap-2 rounded-2xl bg-white/60 p-4 text-sm">
          <p className="flex justify-between">
            <span>Yıllık net</span>
            <b>{formatTRY(net * 100)}</b>
          </p>
          <p className="flex justify-between">
            <span>Yıllık brüt satış</span>
            <span>{formatTRY(Math.round(gross) * 100)}</span>
          </p>
          <p className="flex justify-between">
            <span>Aylık Martrin komisyonu</span>
            <span>
              {formatTRY(Math.round((gross * (RATE / 100)) / 12) * 100)}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Ayda satılan nokta-hafta</span>
            <span>
              {Math.round(
                (((points * 52) / 12) * occupancy) / 100,
              ).toLocaleString("tr-TR")}
            </span>
          </p>
        </div>
        <p className="text-sm">
          Tahmin yılı 52 hafta sayar. KDV, ihale payı ve kamusal duyuru
          haftaları dahil değildir.
        </p>
        <Button href="#basvuru" variant="dark">
          Bu tahminle başvur
        </Button>
      </div>
    </section>
  );
}

function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  if (submitted)
    return (
      <Card role="status">
        <h3 className="font-display text-2xl font-semibold">Başvurun alındı</h3>
        <p className="mt-2 text-muted">
          Görüşmede envanter listesi şablonunu ve örnek sözleşmeyi paylaşırız.
        </p>
        <Button className="mt-4" onClick={() => setSubmitted(false)}>
          Yeni başvuru
        </Button>
      </Card>
    );
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="grid gap-4 rounded-card bg-white p-6 md:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Kurum adı"
          placeholder="Örn. Yeşilvadi Belediyesi"
          required
          minLength={3}
        />
        <Select label="Kurum tipi" required defaultValue="">
          <option value="">Seç</option>
          {orgTypes.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </Select>
        <Input
          label="Yetkili adı soyadı"
          autoComplete="name"
          required
          minLength={3}
        />
        <Input label="Unvan" placeholder="Örn. Basın Yayın Müdürü" required />
        <Input
          label="Kurumsal e-posta"
          type="email"
          autoComplete="email"
          placeholder="ad.soyad@kurum.bel.tr"
          required
        />
        <Input
          label="Telefon"
          type="tel"
          autoComplete="tel"
          placeholder="0 (5xx) xxx xx xx"
          required
        />
        <Input
          label="Reklam noktası sayısı"
          type="number"
          min={1}
          placeholder="Örn. 120"
          required
        />
      </div>
      <Textarea
        label="Mesaj (isteğe bağlı)"
        rows={4}
        placeholder="Nokta tipleri, ihale süresi, öncelikli ilçeler…"
      />
      <p className="text-sm text-muted">
        Bilgilerin yalnızca başvuruyu değerlendirmek için kullanılır. Ayrıntılar{" "}
        <a href="/kvkk" className="underline">
          KVKK metninde
        </a>
        .
      </p>
      <Button type="submit">Başvuruyu gönder</Button>
    </form>
  );
}

export default function MunicipalitiesPage() {
  return (
    <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <header className="grid max-w-3xl gap-4">
        <p className="text-muted">Belediyeler ve işletici şirketler için</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          Kent reklam noktalarını{" "}
          <span className="rounded-full bg-lime px-3 py-1">şeffaf</span> biçimde
          kirala
        </h1>
        <p className="text-lg text-muted">
          Durak panoları, megalight&apos;lar ve dijital ekranlar tek takvimde.
          Ödeme emanette bekler, yayın kanıtlanınca hesabına geçer. Martrin
          yalnızca satılan haftadan %{RATE} komisyon alır.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href="#basvuru">Başvuru yap</Button>
          <Button href="#gelir" variant="dark">
            Gelirini hesapla
          </Button>
        </div>
      </header>
      <section>
        <p className="text-sm text-muted">İki çalışma modeli</p>
        <h2 className="font-display text-3xl font-semibold">
          Hesabı kim açar?
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {models.map((model) => (
            <Card key={model.tag}>
              <span>{model.tag}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold">
                {model.title}
              </h3>
              <p className="my-3 text-muted">{model.text}</p>
              <ul className="grid gap-2">
                {model.feats.map((feat) => (
                  <li key={feat}>
                    <span
                      aria-hidden="true"
                      className="mr-2 inline-block size-3 rounded-full bg-lime"
                    />
                    {feat}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(([title, desc]) => (
          <Card key={title}>
            <h3 className="font-display text-lg font-medium">{title}</h3>
            <p className="mt-2 text-muted">{desc}</p>
          </Card>
        ))}
      </section>
      <section className="grid gap-5 rounded-card bg-violet p-6 text-ink md:grid-cols-2 md:p-10">
        <div>
          <p className="text-ink">Kente geri dönen reklam</p>
          <h2 className="font-display text-3xl font-semibold">
            Yerel esnafa indirim, kamuya kota
          </h2>
          <p className="mt-3">
            Belediye her noktanın bir bölümünü ayırabilir. Mahalle esnafı bu
            haftaları indirimli alır, boş kalan haftalarda kamusal duyurular
            yayınlanır. Kota kuralları hesabında tanımlanır, takvim
            kendiliğinden uygular.
          </p>
        </div>
        <div className="grid gap-3">
          {[
            [
              "Esnaf indirimi",
              "Vergi kaydı ilçede olan işletmelere %30'a varan indirim",
            ],
            [
              "Kamusal duyuru kotası",
              "Her noktada yılda en az 8 hafta aşı, seçim, afet ve etkinlik duyurusu",
            ],
            [
              "Boş hafta kuralı",
              "Yayından 3 gün önce satılmayan hafta duyuru havuzuna düşer",
            ],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl bg-white/10 p-4">
              <b>{title}</b>
              <p className="text-sm text-ink">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <Card>
        <p className="text-sm text-muted">
          Örnek pilot · Yeşilvadi Belediyesi (hayali)
        </p>
        <span>Örnek veri</span>
        <h2 className="font-display text-2xl font-semibold">
          İlk yılın sonunda
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([label, value, detail]) => (
            <div key={label} className="rounded-2xl bg-paper p-5">
              <span className="text-sm text-muted">{label}</span>
              <b className="my-1 block font-display text-3xl">{value}</b>
              <span className="text-sm text-muted">{detail}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted">
          İstatistikler ve kurum adları hayalidir. Sözleşme ve kota koşulları
          örnek metindir, avukat onayından geçecek.
        </p>
      </Card>
      <Calculator />
      <section id="basvuru" className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid content-start gap-4 rounded-card bg-ink p-6 text-white md:p-8">
          <p className="text-sm text-white/60">Başvuru</p>
          <h2 className="font-display text-3xl font-semibold">
            Kamu ekibimizle görüş
          </h2>
          <ol className="grid gap-3">
            {[
              "Formu doldur, 2 iş günü içinde dönüş yapalım.",
              "Envanter listeni şablona aktaralım.",
              "Pilot ilçede 4 haftalık deneme başlatalım.",
              "Sonuçları birlikte raporlayalım.",
            ].map((item, index) => (
              <li key={item}>
                {index + 1}. {item}
              </li>
            ))}
          </ol>
          <p className="rounded-2xl bg-white/10 p-4 text-sm">
            Doğrudan ulaşmak için: kamu@martrin.com.tr · 0 (212) 000 00 00
          </p>
        </div>
        <ApplicationForm />
      </section>
      <p className="text-center text-sm text-muted">
        İstatistikler ve kurum adları hayalidir. Sözleşme ve kota koşulları
        örnek metindir, avukat onayından geçecek.
      </p>
    </div>
  );
}
