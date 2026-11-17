"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
const rules = [
  [
    "Fotoğraf ve video birlikte",
    "İkisi de zorunlu. Yalnızca fotoğraf ya da yalnızca video kabul edilmez.",
  ],
  [
    "Tarih damgası",
    "Çekim zamanı kampanya tarih aralığında olmalı. Damga, Martrin uygulamasının kamerasıyla otomatik basılır.",
  ],
  [
    "Konum eşleşmesi",
    "Çekim konumu, alanın kayıtlı konumuna 150 metreden yakın olmalı.",
  ],
  [
    "En az 15 saniye video",
    "Video, reklamı ve çevresini tek çekimde, kesintisiz göstermeli.",
  ],
  [
    "Kreatif okunur olmalı",
    "Onaylanan tasarım net seçilmeli. Bulanık ya da gece ışıksız çekim reddedilir.",
  ],
  [
    "Galeriden yükleme yok",
    "Kanıt uygulama içinden çekilir. Eski ya da düzenlenmiş dosya yüklenemez.",
  ],
];
const simulator = {
  alan: {
    label: "Billboard / AVM / belediye",
    items: [
      "Tarih damgalı fotoğraf çektim",
      "En az 15 saniyelik video çektim",
      "Konum servisleri açıktı, konum eşleşti",
      "Kreatif onaylı tasarımla aynı ve okunuyor",
      "Videoda alanın çevresi ve tabelası görünüyor",
    ],
  },
  dooh: {
    label: "Dijital ekran (DOOH)",
    items: [
      "Ekranda yayın anının fotoğrafını çektim",
      "Spotun tamamını içeren en az 15 sn video çektim",
      "Konum eşleşti",
      "Oynatma raporunu (play log) yükledim",
      "Rapordaki gösterim sayısı siparişle tutuyor",
    ],
  },
  inf: {
    label: "Influencer",
    items: [
      "Yayın linkini ekledim",
      "Paylaşımın ekran görüntüsünü yükledim",
      "#reklam ya da #işbirliği etiketi görünüyor",
      "Paylaşım anlaşılan süre boyunca yayında kalacak",
      "48 saat sonra istatistik ekran görüntüsünü yükleyeceğim",
    ],
  },
} as const;
type SimulatorKind = keyof typeof simulator;
function ProofSimulator() {
  const [kind, setKind] = useState<SimulatorKind>("alan");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const items = simulator[kind].items;
  const done = items.filter((item) => checked[item]).length;
  const ready = done === items.length;
  return (
    <Card className="grid gap-5 lg:grid-cols-2">
      <div>
        <span className="text-sm text-muted">Simülatör</span>
        <h2 className="font-display text-2xl font-semibold">
          Kanıt kontrol listesi
        </h2>
        <p className="text-muted">
          Satıcı panelindeki listenin aynısı. Her maddeyi işaretle, liste
          tamamlanınca gönderim açılır.
        </p>
        <div
          className="my-4 flex flex-wrap gap-2"
          role="group"
          aria-label="Alan türü"
        >
          {(Object.keys(simulator) as SimulatorKind[]).map((key) => (
            <Button
              key={key}
              variant={kind === key ? "dark" : "outline"}
              onClick={() => {
                setKind(key);
                setSent(false);
              }}
            >
              {simulator[key].label}
            </Button>
          ))}
        </div>
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item}>
              <Checkbox
                label={item}
                checked={Boolean(checked[item])}
                onChange={() => {
                  setChecked((state) => ({ ...state, [item]: !state[item] }));
                  setSent(false);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div
        className="grid content-start gap-4 rounded-[22px] bg-ink p-5 text-white"
        aria-live="polite"
      >
        <div className="flex flex-wrap justify-between gap-2">
          <b className="font-display text-xl">
            {sent
              ? "Kanıt gönderildi"
              : ready
                ? "Gönderime hazır"
                : "Eksik maddeler var"}
          </b>
          <span>
            {done} / {items.length}
          </span>
        </div>
        <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
          <span
            className="block h-full bg-lime"
            style={{ width: `${(done / items.length) * 100}%` }}
          />
        </div>
        <ul className="grid gap-2">
          {items.map((item) => (
            <li key={item}>
              <span
                aria-hidden="true"
                className={`mr-2 inline-block size-4 rounded-full ring-2 ring-current ${checked[item] ? "bg-lime" : ""}`}
              />
              {item}
            </li>
          ))}
        </ul>
        {sent ? (
          <p className="rounded-2xl bg-white/10 p-4">
            Reklam verenin 72 saatlik onay süresi başladı. İtiraz gelmezse ödeme
            otomatik olarak sana geçer.
          </p>
        ) : (
          <Button
            disabled={!ready}
            onClick={() => setSent(true)}
            variant="primary"
          >
            {ready ? "Kanıtı gönder" : `${items.length - done} madde kaldı`}
          </Button>
        )}
      </div>
    </Card>
  );
}
export default function ProofPage() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <nav aria-label="Güven sayfaları" className="flex flex-wrap gap-2">
        <Button href="/emanet-odeme" variant="outline">
          Emanet ödeme
        </Button>
        <Button href="/yayin-kaniti" variant="dark">
          Yayın kanıtı
        </Button>
        <Button href="/kvkk" variant="outline">
          KVKK ve reklam kılavuzu
        </Button>
      </nav>
      <header className="grid max-w-3xl gap-4">
        <p className="text-muted">Yayın kanıtı</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          Reklam yayında mı?{" "}
          <span className="rounded-full bg-lime px-3 py-1">Kanıtı</span> konuşur
        </h1>
        <p className="text-lg text-muted">
          Satıcı, ödemeyi almak için reklamın gerçekten yayında olduğunu tarih
          damgalı ve konumlu fotoğraf ile videoyla gösterir. Reklam veren kanıtı
          panelinden inceler.
        </p>
      </header>
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Card>
          <h2 className="font-display text-2xl font-semibold">
            Kanıt kuralları
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {rules.map(([title, desc]) => (
              <div key={title} className="rounded-2xl bg-paper p-4">
                <b>{title}</b>
                <p className="mt-2 text-sm text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card tone="ink">
          <span className="text-sm text-white/60">Örnek kanıt kartı</span>
          <h2 className="font-display text-xl">
            Kahve Durağı · sonbahar kampanyası
          </h2>
          <p className="text-white/60">Satıcı: Boğaziçi Açıkhava</p>
          <p>04.11.2026 · 14:32:07 GMT+3</p>
          <p>41.0438° K · 29.0094° D · ±6 m</p>
          <p className="text-lime">Beşiktaş / İstanbul · Alan #BLB-3412</p>
          <p>
            <span>Uygulama içi çekim</span> · <span>Onay bekliyor</span>
          </p>
          <ul className="grid gap-2">
            {[
              "Konum eşleşti · 38 m",
              "Video 18 sn",
              "Tarih damgası kampanya aralığında",
              "Kreatif onaylı tasarımla aynı",
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
          <p className="text-sm text-white/60">
            Otomatik onaya kalan süre: <span>71:24:10</span>
          </p>
        </Card>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-xl font-semibold">
            Dijital ekran (DOOH) için ek kanıt
          </h2>
          <p className="my-3">
            Ekranda reklam dönüşümlü gösterilir. Fotoğraf ve video anlık durumu
            gösterir, toplam gösterimi ise oynatma raporu kanıtlar.
          </p>
          <ul className="grid gap-2">
            {[
              "Oynatma raporu (play log): tarih, saat ve gösterim sayısı",
              "Rapordaki gösterim, siparişteki döngü sayısını karşılar",
              "Ekran kapalı kaldıysa eksik gösterim kadar iade hesaplanır",
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
          <p className="mt-3">
            <span>Örnek: AVM LED ekran</span> ·{" "}
            <span>Örnek: otobüs durağı ekranı</span>
          </p>
        </Card>
        <Card>
          <h2 className="font-display text-xl font-semibold">
            Influencer için kanıt
          </h2>
          <p className="my-3">
            Konum gerekmez, ama paylaşımın kendisi ve sonucu kayda geçer.
          </p>
          <ol className="grid gap-2">
            {[
              ["Yayın linki", "Paylaşım anında"],
              ["Ekran görüntüsü", "Etiket ve iş birliği ibaresi görünür"],
              ["İstatistik ekran görüntüsü", "Paylaşımdan 48 saat sonra"],
            ].map(([title, detail]) => (
              <li key={title}>
                <b>{title}</b>
                <p className="text-sm text-muted">{detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-muted">
            İstatistikler şimdilik beyan ve ekran görüntüsüyle alınır. Platform
            bağlantıları açılınca otomatik çekilecek.
          </p>
        </Card>
      </div>
      <ProofSimulator />
      <Card
        tone="lime"
        className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold">Saha denetimi</h2>
          <p>
            Kanıta güvenmiyor musun? Bağımsız bir denetçi 48 saat içinde alana
            gider, kendi fotoğraf ve videosunu çeker, rapor yazar. Denetim
            satıcı aleyhine çıkarsa ücreti iade ederiz.
          </p>
        </div>
        <div className="grid gap-2">
          <b className="font-display text-3xl">₺3.500</b>
          <span>alan başına</span>
          <Button href="/iletisim" variant="dark">
            Denetim iste
          </Button>
        </div>
      </Card>
    </div>
  );
}
