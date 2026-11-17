"use client";
import { useState } from "react";
import { formatTRY } from "@/lib/format-try";
import { yearlyMonthly, yearlyTotal } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const plans = {
  seller: [
    {
      name: "Başlangıç",
      desc: "Bireysel influencer ve tek alanlı işletmeler",
      price: 0,
      cta: "Ücretsiz başla",
      href: "/panel/satici",
      feats: [
        "Sınırsız ilan ve paket",
        "Standart kategori komisyonu",
        "Emanetli ödeme ve kanıt yükleme",
        "Teklif ve ters ihalelere katılım",
        "Kazanç defteri",
      ],
    },
    {
      name: "Pro",
      desc: "Düzenli iş alan içerik üreticileri ve alan sahipleri",
      price: 149000,
      cta: "Pro'ya geç",
      href: "/panel/satici",
      feats: [
        "Komisyonda 2 puan indirim",
        "Ayda 1 hafta ücretsiz öne çıkarma",
        "3 kişilik ekip, rol ve yetki yönetimi",
        "Doluluk takvimi senkronu",
        "Gelişmiş kazanç raporu ve dışa aktarma",
      ],
    },
    {
      name: "Kurumsal",
      desc: "Açık hava şirketleri, AVM'ler ve ajans ekipleri",
      price: 499000,
      cta: "Satışla görüş",
      href: "/iletisim",
      feats: [
        "Komisyonda 4 puan indirim",
        "Toplu envanter yükleme (Excel)",
        "Sınırsız ekip üyesi",
        "API ve entegrasyon erişimi",
        "Özel hesap yöneticisi",
      ],
    },
  ],
  buyer: [
    {
      name: "Ücretsiz",
      desc: "Ara sıra kampanya yapan işletmeler",
      price: 0,
      cta: "Hemen keşfet",
      href: "/alanlar",
      feats: [
        "Tüm alanlara ve influencer'lara erişim",
        "Tek sepetten karma kampanya",
        "Emanetli ödeme ve kanıt onayı",
        "İlan ve ters ihale açma",
      ],
    },
    {
      name: "Marka Pro",
      desc: "Her ay kampanya yapan markalar",
      price: 99000,
      cta: "Pro'ya geç",
      href: "/panel/reklamveren",
      feats: [
        "Ayda 1 ücretsiz saha denetimi",
        "Kampanya ölçüm raporu (QR, kod, link)",
        "Kayıtlı aramalar ve fiyat alarmı",
        "Öncelikli destek",
      ],
    },
    {
      name: "Ajans",
      desc: "Birden fazla markayı yöneten ajanslar",
      price: 399000,
      cta: "Satışla görüş",
      href: "/iletisim",
      feats: [
        "Sınırsız marka hesabı",
        "Ekip üyeleri ve onay akışı",
        "Toplu teklif isteme",
        "Müşteriye özel beyaz etiketli rapor",
      ],
    },
  ],
} as const;
export default function PricingPage() {
  const [buyer, setBuyer] = useState(false);
  const [annual, setAnnual] = useState(false);
  return (
    <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <header className="mx-auto grid max-w-3xl justify-items-center gap-4 text-center">
        <h1 className="font-display text-4xl font-semibold md:text-6xl">
          Ücretler ve{" "}
          <span className="rounded-full bg-lime px-3 py-1">paketler</span>
        </h1>
        <p className="text-lg text-muted">
          Listelemek ücretsiz. Martrin yalnızca iş tamamlanınca komisyon alır.
          Daha fazlasına ihtiyacın olursa paket seç.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant={!buyer ? "dark" : "outline"}
            onClick={() => setBuyer(false)}
            aria-pressed={!buyer}
          >
            Satıcılar için
          </Button>
          <Button
            variant={buyer ? "dark" : "outline"}
            onClick={() => setBuyer(true)}
            aria-pressed={buyer}
          >
            Reklam verenler için
          </Button>
          <Button
            variant={!annual ? "dark" : "outline"}
            onClick={() => setAnnual(false)}
            aria-pressed={!annual}
          >
            Aylık
          </Button>
          <Button
            variant={annual ? "dark" : "outline"}
            onClick={() => setAnnual(true)}
            aria-pressed={annual}
          >
            Yıllık{" "}
            <span className="rounded-full bg-white px-2 py-0.5 text-xs">
              2 ay bedava
            </span>
          </Button>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {(buyer ? plans.buyer : plans.seller).map((plan) => (
          <Card
            key={plan.name}
            role="article"
            className="grid content-start gap-3"
          >
            <h2 className="font-display text-2xl font-semibold">{plan.name}</h2>
            <p className="text-muted">{plan.desc}</p>
            <p className="font-display text-4xl font-semibold">
              {formatTRY(annual ? yearlyMonthly(plan.price) : plan.price)}
              <small className="text-base">
                {plan.price ? " / ay" : " her zaman"}
              </small>
            </p>
            {annual && plan.price > 0 ? (
              <p>
                Yıllık {formatTRY(yearlyTotal(plan.price))} olarak faturalanır
              </p>
            ) : null}
            <Button href={plan.href} variant="dark">
              {plan.cta}
            </Button>
            <h3 className="mt-5 font-medium">Neler dahil?</h3>
            <ul className="mt-2 list-inside list-disc">
              {plan.feats.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
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
        </Card>
        <Card tone="ink">
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
        </Card>
      </div>
      <Card
        tone="violet"
        className="grid gap-4 md:grid-cols-[auto_1fr_auto] md:items-center"
      >
        <div>
          <b className="font-display text-2xl">
            Büyük bir kampanya mı planlıyorsun?
          </b>
          <p>81 ilde karma kampanyalar için ekibimiz teklif hazırlar.</p>
        </div>
        <Button href="/iletisim">Teklif iste</Button>
      </Card>
      <p className="text-center text-sm text-muted">
        Fiyatlar prototip içindir ve KDV hariçtir. Gelir modeli kararları (A1,
        A2, A5) netleşince güncellenecek.
      </p>
    </div>
  );
}
