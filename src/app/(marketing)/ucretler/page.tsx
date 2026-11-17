"use client";
import { useState } from "react";
import { formatTRY } from "@/lib/format-try";
import { yearlyMonthly, yearlyTotal } from "@/lib/pricing";
const plans = {
  seller: [
    ["Başlangıç", "Bireysel influencer ve tek alanlı işletmeler", 0],
    ["Pro", "Düzenli iş alan içerik üreticileri ve alan sahipleri", 149000],
    ["Kurumsal", "Açık hava şirketleri, AVM'ler ve ajans ekipleri", 499000],
  ],
  buyer: [
    ["Ücretsiz", "Ara sıra kampanya yapan işletmeler", 0],
    ["Marka Pro", "Her ay kampanya yapan markalar", 99000],
    ["Ajans", "Birden fazla markayı yöneten ajanslar", 399000],
  ],
} as const;
const features = [
  "Sınırsız ilan ve paket",
  "Standart kategori komisyonu",
  "Emanetli ödeme ve kanıt yükleme",
];
export default function PricingPage() {
  const [buyer, setBuyer] = useState(false);
  const [annual, setAnnual] = useState(false);
  return (
    <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <header className="mx-auto grid max-w-3xl justify-items-center gap-4 text-center">
        <h1 className="font-display text-4xl font-semibold md:text-6xl">
          Ücretler ve <span className="pill-word">paketler</span>
        </h1>
        <p className="text-lg text-muted">
          Listelemek ücretsiz. Martrin yalnızca iş tamamlanınca komisyon alır.
          Daha fazlasına ihtiyacın olursa paket seç.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            className="rounded-xl bg-white px-4 py-3"
            onClick={() => setBuyer(false)}
            aria-pressed={!buyer}
          >
            Satıcılar için
          </button>
          <button
            className="rounded-xl bg-white px-4 py-3"
            onClick={() => setBuyer(true)}
            aria-pressed={buyer}
          >
            Reklam verenler için
          </button>
          <button
            className="rounded-xl bg-violet-soft px-4 py-3"
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
          >
            Aylık
          </button>
          <button
            className="rounded-xl bg-violet-soft px-4 py-3"
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
          >
            Yıllık · 2 ay bedava
          </button>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {(buyer ? plans.buyer : plans.seller).map(([name, desc, price]) => (
          <article key={name} className="rounded-card bg-white p-6">
            <h2 className="font-display text-2xl font-semibold">{name}</h2>
            <p className="my-3 text-muted">{desc}</p>
            <p className="font-display text-4xl font-semibold">
              {formatTRY(annual ? yearlyMonthly(price) : price)}
              <small className="text-base">
                {price ? " / ay" : " her zaman"}
              </small>
            </p>
            {annual && price > 0 ? (
              <p>Yıllık {formatTRY(yearlyTotal(price))} olarak faturalanır</p>
            ) : null}
            <h3 className="mt-5 font-medium">Neler dahil?</h3>
            <ul className="mt-2 list-inside list-disc">
              {features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-card bg-white p-6">
          <h2 className="font-display text-2xl font-semibold">
            Kategori komisyonları
          </h2>
          <p className="my-3 text-muted">
            İş tamamlanıp ödeme satıcıya aktarılınca kesilir. Paket indirimi bu
            oranlardan düşülür.
          </p>
          <ul className="grid gap-2">
            {[
              ["Influencer", 15],
              ["Billboard / Megalight", 8],
              ["AVM LED & Stant", 10],
              ["Belediye noktaları", 6],
              ["Dijital ekran (DOOH)", 10],
            ].map(([label, rate]) => (
              <li
                key={label}
                className="flex justify-between rounded-xl bg-paper p-3"
              >
                {label}
                <b>%{rate}</b>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">
            Reklam veren komisyon ödemez. Kart ve ödeme altyapısı masrafları
            dahildir.
          </p>
        </section>
        <section className="rounded-card bg-ink p-6 text-white">
          <h2 className="font-display text-2xl font-semibold">Ek hizmetler</h2>
          <ul className="mt-4 grid gap-3">
            {[
              [
                "Öne çıkarma",
                "Arama ve ana sayfada üst sıra",
                "₺1.500 / hafta",
              ],
              [
                "Saha denetimi",
                "Bağımsız denetçi panoyu yerinde kontrol eder",
                "₺3.500 / alan",
              ],
              [
                "Kreatif tasarım",
                "Billboard, ekran ve story tasarımı",
                "₺4.000'den",
              ],
              [
                "Ölçüm raporu",
                "QR, indirim kodu ve link takibiyle sonuç raporu",
                "₺2.500 / kampanya",
              ],
            ].map(([a, b, c]) => (
              <li key={a}>
                <b>{a}</b>
                <p>{b}</p>
                <span className="text-lime">{c}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="text-center text-sm text-muted">
        Fiyatlar prototip içindir ve KDV hariçtir. Gelir modeli kararları (A1,
        A2, A5) netleşince güncellenecek.
      </p>
    </div>
  );
}
