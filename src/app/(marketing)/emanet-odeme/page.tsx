"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { formatTRY } from "@/lib/format-try";

const flow = [
  [
    "Sepeti onayla",
    "Alanları ve influencer paketlerini tek sepette topla, ödemeyi yap.",
  ],
  [
    "Para emanete geçer",
    "Ödeme lisanslı ödeme kuruluşunda emanet hesapta durur. Satıcıya henüz geçmez.",
  ],
  [
    "Satıcı yayınlar",
    "Satıcı kreatifi asar, ekrana yükler ya da içeriği paylaşır.",
  ],
  [
    "Kanıt yüklenir",
    "Tarih damgalı ve konumlu fotoğraf ile video panele gelir.",
  ],
  [
    "Onay ya da 72 saat",
    "Reklam veren kanıtı onaylar. 72 saat içinde itiraz yoksa sistem otomatik onaylar.",
  ],
  [
    "Para satıcıya geçer",
    "Komisyon düşülür, kalan tutar satıcının banka hesabına aktarılır.",
  ],
];
const categories = [
  ["Influencer", 15],
  ["Billboard / Megalight", 8],
  ["AVM LED & Stant", 10],
  ["Belediye noktaları", 6],
  ["Dijital ekran (DOOH)", 10],
] as const;
const disputes = [
  [
    "İtirazı aç",
    "Kanıt yüklendikten sonraki 72 saat içinde gerekçeni yaz, fotoğraf ya da not ekle.",
  ],
  [
    "Satıcı yanıtlar",
    "Satıcı 48 saat içinde açıklama yapar ya da eksiği giderip yeni kanıt yükler.",
  ],
  [
    "Martrin inceler",
    "Uyuşmazlık sürerse ekibimiz 5 iş günü içinde inceler. Gerekirse saha denetimi ister.",
  ],
  [
    "Karar uygulanır",
    "Tam ödeme, kısmi iade ya da tam iade. Karara kadar para emanette kalır.",
  ],
];
function EscrowCalculator() {
  const [amount, setAmount] = useState("40000");
  const [category, setCategory] = useState("Billboard / Megalight");
  const [stages, setStages] = useState(1);
  const [period, setPeriod] = useState<"hafta" | "ay">("hafta");
  const rate = categories.find(([name]) => name === category)?.[1] ?? 0;
  const gross = Math.max(
    0,
    Math.round(Number(amount.replace(/[^\d]/g, "")) || 0),
  );
  const fee = Math.round((gross * rate) / 100);
  const base = Math.floor(gross / stages);
  const feeBase = Math.round((base * rate) / 100);
  return (
    <Card className="grid gap-5 lg:grid-cols-2">
      <div className="grid content-start gap-4">
        <div>
          <span className="text-sm text-muted">Hesaplayıcı</span>
          <h2 className="font-display text-2xl font-semibold">
            Kim ne kadar alır?
          </h2>
          <p className="text-muted">
            Kampanya tutarını gir, kategoriyi seç. Komisyonu satıcı öder, reklam
            veren yalnızca kampanya tutarını öder.
          </p>
        </div>
        <Input
          label="Kampanya tutarı (₺, KDV hariç)"
          inputMode="numeric"
          value={amount}
          onChange={(event) =>
            setAmount(event.target.value.replace(/[^\d]/g, "").slice(0, 9))
          }
        />
        {[15000, 40000, 120000, 300000].map((value) => (
          <Button
            key={value}
            variant="outline"
            size="sm"
            onClick={() => setAmount(String(value))}
          >
            {formatTRY(value * 100)}
          </Button>
        ))}
        <Select
          label="Kategori"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map(([name, percentage]) => (
            <option key={name} value={name}>
              {name} · %{percentage}
            </option>
          ))}
        </Select>
        <Select
          label="Aşama sayısı"
          value={stages}
          onChange={(event) => setStages(Number(event.target.value))}
        >
          <option value={1}>Tek seferde öde</option>
          {[2, 3, 4, 6, 8, 12].map((value) => (
            <option key={value} value={value}>
              {value} aşama
            </option>
          ))}
        </Select>
        <p>Aşama aralığı</p>
        <div className="flex gap-2">
          <Button
            variant={period === "hafta" ? "dark" : "outline"}
            disabled={stages === 1}
            aria-pressed={period === "hafta"}
            onClick={() => setPeriod("hafta")}
          >
            Haftalık
          </Button>
          <Button
            variant={period === "ay" ? "dark" : "outline"}
            disabled={stages === 1}
            aria-pressed={period === "ay"}
            onClick={() => setPeriod("ay")}
          >
            Aylık
          </Button>
        </div>
      </div>
      <div className="grid content-start gap-4" aria-live="polite">
        <div className="grid gap-3 rounded-[22px] bg-ink p-5 text-white sm:grid-cols-3">
          <div>
            <span>Reklam veren öder</span>
            <b className="block font-display text-xl">
              {formatTRY(gross * 100)}
            </b>
          </div>
          <div>
            <span>Martrin komisyonu · %{rate}</span>
            <b className="block font-display text-xl">{formatTRY(fee * 100)}</b>
          </div>
          <div>
            <span>Satıcıya geçen net</span>
            <b className="block font-display text-xl text-lime">
              {formatTRY((gross - fee) * 100)}
            </b>
          </div>
          <p className="sm:col-span-3">
            Kart ve ödeme altyapısı masrafları komisyona dahildir. Satıcı kendi
            faturasını keser, Martrin yalnızca komisyon faturası keser.
          </p>
        </div>
        {stages > 1 ? (
          <div className="rounded-2xl bg-paper p-4">
            <b>Aşama planı</b>
            <div className="mt-3 grid gap-2">
              {Array.from({ length: stages }, (_, index) => {
                const stageGross =
                  index === stages - 1 ? gross - base * (stages - 1) : base;
                const stageFee =
                  index === stages - 1 ? fee - feeBase * (stages - 1) : feeBase;
                return (
                  <p
                    key={index}
                    className="flex justify-between rounded-xl bg-white p-3"
                  >
                    <span>
                      {index + 1}. {period}
                    </span>
                    <span>{formatTRY(stageGross * 100)}</span>
                    <b>{formatTRY((stageGross - stageFee) * 100)}</b>
                  </p>
                );
              })}
            </div>
            <p className="mt-3 text-sm text-muted">
              Her aşama kendi kanıtı onaylanınca serbest kalır. Sonraki aşamanın
              parası o döneme kadar emanette bekler.
            </p>
          </div>
        ) : (
          <p className="rounded-2xl bg-paper p-5 text-muted">
            Kampanya bir haftadan uzunsa aşama sayısı seç. Her parçanın satıcıya
            ne zaman ve ne kadar geçtiğini burada gör.
          </p>
        )}
      </div>
    </Card>
  );
}
export default function EscrowPage() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <nav aria-label="Güven sayfaları" className="flex flex-wrap gap-2">
        <Button href="/emanet-odeme" variant="dark">
          Emanet ödeme
        </Button>
        <Button href="/yayin-kaniti" variant="outline">
          Yayın kanıtı
        </Button>
        <Button href="/kvkk" variant="outline">
          KVKK ve reklam kılavuzu
        </Button>
      </nav>
      <header className="grid max-w-3xl gap-4">
        <p className="text-muted">Emanet ödeme</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          Paran, reklamın yayına çıkana kadar{" "}
          <span className="rounded-full bg-lime px-3 py-1">güvende</span>
        </h1>
        <p className="text-lg text-muted">
          Ödediğin tutar satıcıya hemen geçmez. Lisanslı ödeme kuruluşunda
          emanette bekler, yayın kanıtını onayladığında satıcıya aktarılır.
        </p>
        <div className="flex flex-wrap gap-2">
          <span>Lisanslı ödeme kuruluşu</span>
          <span>Fotoğraf + video kanıt</span>
          <span>72 saat itiraz süresi</span>
        </div>
      </header>
      <section>
        <h2 className="font-display text-2xl font-semibold">
          Para nasıl ilerler?
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {flow.map(([title, desc], index) => (
            <li key={title}>
              <Card>
                <span className="grid size-9 place-items-center rounded-full bg-lime">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl">{title}</h3>
                <p className="mt-2 text-muted">{desc}</p>
                {index > 0 && index < 5 ? <span>Para emanette</span> : null}
              </Card>
            </li>
          ))}
        </ol>
      </section>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card tone="violet">
          <h2 className="font-display text-2xl font-semibold">
            Uzun kampanyada aşamalı ödeme
          </h2>
          <p className="my-3">
            Üç aylık bir billboard kiralamasında tüm parayı ilk gün bağlaman
            gerekmez. Kampanyayı haftalık ya da aylık parçalara böl.
          </p>
          <ul className="grid gap-3">
            {[
              "Her parça kendi dönemi başlamadan emanete alınır.",
              "Satıcı her dönem için yeni kanıt yükler.",
              "Onaylanan parça satıcıya geçer, sıradaki parça bekler.",
              "Kampanyayı erken bitirirsen başlamamış dönemlerin parası emanete hiç girmez.",
            ].map((item) => (
              <li key={item}>
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block size-3 rounded-full bg-lime"
                />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <span className="text-sm text-muted">Bir şey ters giderse</span>
          <h2 className="font-display text-2xl font-semibold">
            İtiraz ve uyuşmazlık
          </h2>
          <p className="my-2">Para karara kadar emanette</p>
          <ol className="grid gap-2">
            {disputes.map(([title, desc], index) => (
              <li key={title} className="rounded-2xl bg-paper p-4">
                <b>
                  {index + 1}. {title}
                </b>
                <p className="text-muted">{desc}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-muted">
            Kanıt yetersizse ₺3.500 karşılığında bağımsız saha denetimi
            isteyebilirsin. Denetim satıcı aleyhine sonuçlanırsa ücret iade
            edilir.
          </p>
        </Card>
      </div>
      <EscrowCalculator />
      <Card
        tone="ink"
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <b className="font-display text-2xl">Kanıt neyi kapsıyor?</b>
          <p>Onay düğmesine basmadan önce neye bakman gerektiğini anlattık.</p>
        </div>
        <Button href="/yayin-kaniti">Yayın kanıtı kuralları</Button>
      </Card>
      <p className="text-center text-sm text-muted">
        Ödeme altyapısı henüz seçilmedi. TCMB lisanslı bir pazaryeri ödeme
        kuruluşu kullanılacak. Tutarlar KDV hariçtir.
      </p>
    </div>
  );
}
