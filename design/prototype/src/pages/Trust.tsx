import { useState, type ReactNode } from "react";
import { COMMISSION, tl } from "../data";
import { A, Badge, Icon, Img, Page } from "../ui";

/* ---------- ortak ---------- */
const TABS = [
  { to: "emanet-odeme", label: "Emanet ödeme" },
  { to: "yayin-kaniti", label: "Yayın kanıtı" },
  { to: "kvkk", label: "KVKK ve reklam kılavuzu" },
] as const;

function TrustTabs({ active }: { active: (typeof TABS)[number]["to"] }) {
  return (
    <nav aria-label="Güven sayfaları" className="max-w-full overflow-x-auto mb-8">
      <div className="inline-flex bg-white rounded-2xl p-1.5 font-display text-[14px] sm:text-[15px] whitespace-nowrap">
        {TABS.map(t => (
          <A key={t.to} to={t.to} className={`px-4 sm:px-5 py-2.5 rounded-xl ${active === t.to ? "bg-ink text-white" : "text-ink hover:bg-paper"}`}>
            <span aria-current={active === t.to ? "page" : undefined}>{t.label}</span>
          </A>
        ))}
      </div>
    </nav>
  );
}

function Hero({ eyebrow, title, text, children }: { eyebrow: string; title: ReactNode; text: string; children?: ReactNode }) {
  return (
    <header className="grid gap-4 pb-10 max-w-[760px]">
      <span className="text-[14px] text-muted">{eyebrow}</span>
      <h1 className="font-display font-semibold tracking-tight text-[34px] md:text-[44px] leading-none text-balance">{title}</h1>
      <p className="text-muted text-[17px] md:text-[18px] max-w-[60ch]">{text}</p>
      {children}
    </header>
  );
}

const Check = ({ on = true, dark = false }: { on?: boolean; dark?: boolean }) => (
  <span className={`grid place-items-center w-6 h-6 rounded-full shrink-0 ${on ? (dark ? "bg-lime text-ink" : "bg-lime text-ink") : dark ? "bg-white/10 text-white/40" : "bg-paper text-muted"}`}>
    <Icon n="check" className="w-3.5 h-3.5" sw={3} />
  </span>
);

/* =========================================================
   1) EMANET ÖDEME
   ========================================================= */
const FLOW = [
  { icon: "cart", t: "Sepeti onayla", d: "Alanları ve influencer paketlerini tek sepette topla, ödemeyi yap." },
  { icon: "shield", t: "Para emanete geçer", d: "Ödeme lisanslı ödeme kuruluşunda emanet hesapta durur. Satıcıya henüz geçmez." },
  { icon: "play", t: "Satıcı yayınlar", d: "Satıcı kreatifi asar, ekrana yükler ya da içeriği paylaşır." },
  { icon: "camera", t: "Kanıt yüklenir", d: "Tarih damgalı ve konumlu fotoğraf ile video panele gelir." },
  { icon: "eye", t: "Onay ya da 72 saat", d: "Reklam veren kanıtı onaylar. 72 saat içinde itiraz yoksa sistem otomatik onaylar." },
  { icon: "check", t: "Para satıcıya geçer", d: "Komisyon düşülür, kalan tutar satıcının banka hesabına aktarılır." },
];

const CATS = COMMISSION.filter(c => c.rate > 0);

const DISPUTE = [
  { t: "İtirazı aç", d: "Kanıt yüklendikten sonraki 72 saat içinde gerekçeni yaz, fotoğraf ya da not ekle." },
  { t: "Satıcı yanıtlar", d: "Satıcı 48 saat içinde açıklama yapar ya da eksiği giderip yeni kanıt yükler." },
  { t: "Martrin inceler", d: "Uyuşmazlık sürerse ekibimiz 5 iş günü içinde inceler. Gerekirse saha denetimi ister." },
  { t: "Karar uygulanır", d: "Tam ödeme, kısmi iade ya da tam iade. Karara kadar para emanette kalır." },
];

function EscrowCalculator() {
  const [amount, setAmount] = useState("40000");
  const [cat, setCat] = useState(CATS[1].cat);
  const [stages, setStages] = useState(1);
  const [period, setPeriod] = useState<"hafta" | "ay">("hafta");

  const gross = Math.max(0, Math.round(Number(amount.replace(/[^\d]/g, "")) || 0));
  const rate = CATS.find(c => c.cat === cat)?.rate ?? 0;
  const fee = Math.round(gross * rate / 100);
  const net = gross - fee;

  const base = Math.floor(gross / stages);
  const feeBase = Math.round(base * rate / 100);
  const rows = Array.from({ length: stages }, (_, i) => {
    const last = i === stages - 1;
    const g = last ? gross - base * (stages - 1) : base;
    const f = last ? fee - feeBase * (stages - 1) : feeBase;
    return { i: i + 1, g, f, n: g - f };
  });

  return (
    <section aria-labelledby="hesap-baslik" className="bg-white rounded-card p-5 md:p-8 grid lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-8">
      <div className="grid gap-5 content-start min-w-0">
        <div>
          <span className="text-[14px] text-muted">Hesaplayıcı</span>
          <h2 id="hesap-baslik" className="font-display font-semibold text-[26px] tracking-tight mt-1">Kim ne kadar alır?</h2>
          <p className="text-muted text-[15px] mt-1">Kampanya tutarını gir, kategoriyi seç. Komisyonu satıcı öder, reklam veren yalnızca kampanya tutarını öder.</p>
        </div>
        <div className="grid gap-2">
          <label htmlFor="esc-amount" className="font-display text-[15px] font-medium">Kampanya tutarı (₺, KDV hariç)</label>
          <input id="esc-amount" inputMode="numeric" value={amount} onChange={e => setAmount(e.target.value.replace(/[^\d]/g, "").slice(0, 9))}
            className="h-12 rounded-2xl bg-paper px-4 font-display text-[18px] tnum outline-none focus:ring-2 focus:ring-ink w-full" />
          <div className="flex flex-wrap gap-2">
            {[15000, 40000, 120000, 300000].map(v => (
              <button key={v} type="button" onClick={() => setAmount(String(v))} className={`px-3 py-1.5 rounded-xl text-[13px] font-display tnum ${gross === v ? "bg-ink text-white" : "bg-paper"}`}>{tl(v)}</button>
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <label htmlFor="esc-cat" className="font-display text-[15px] font-medium">Kategori</label>
          <select id="esc-cat" value={cat} onChange={e => setCat(e.target.value)} className="h-12 rounded-2xl bg-paper px-4 text-[16px] outline-none focus:ring-2 focus:ring-ink w-full">
            {CATS.map(c => <option key={c.cat} value={c.cat}>{c.cat} · %{c.rate}</option>)}
          </select>
        </div>
        <div className="grid gap-2">
          <label htmlFor="esc-stages" className="font-display text-[15px] font-medium">Aşama sayısı</label>
          <div className="grid grid-cols-[1fr_auto] gap-2">
            <select id="esc-stages" value={stages} onChange={e => setStages(Number(e.target.value))} className="h-12 rounded-2xl bg-paper px-4 text-[16px] outline-none focus:ring-2 focus:ring-ink w-full min-w-0">
              <option value={1}>Tek seferde öde</option>
              {[2, 3, 4, 6, 8, 12].map(n => <option key={n} value={n}>{n} aşama</option>)}
            </select>
            <div className="inline-flex bg-paper rounded-2xl p-1 font-display text-[14px]" role="group" aria-label="Aşama aralığı">
              {(["hafta", "ay"] as const).map(p => (
                <button key={p} type="button" aria-pressed={period === p} disabled={stages === 1} onClick={() => setPeriod(p)}
                  className={`px-3 rounded-xl disabled:opacity-40 ${period === p ? "bg-ink text-white" : ""}`}>{p === "hafta" ? "Haftalık" : "Aylık"}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 content-start min-w-0" aria-live="polite">
        <div className="bg-ink text-white rounded-[22px] p-5 md:p-6 grid gap-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="min-w-0"><div className="text-white/60 text-[13px]">Reklam veren öder</div><div className="font-display font-semibold text-[24px] tnum tracking-tight break-words">{tl(gross)}</div></div>
            <div className="min-w-0"><div className="text-white/60 text-[13px]">Martrin komisyonu · %{rate}</div><div className="font-display font-semibold text-[24px] tnum tracking-tight text-violet break-words">{tl(fee)}</div></div>
            <div className="min-w-0"><div className="text-white/60 text-[13px]">Satıcıya geçen net</div><div className="font-display font-semibold text-[24px] tnum tracking-tight text-lime break-words">{tl(net)}</div></div>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden flex" aria-hidden>
            <i className="block h-full bg-lime" style={{ width: `${100 - rate}%` }} />
            <i className="block h-full bg-violet" style={{ width: `${rate}%` }} />
          </div>
          <p className="text-white/60 text-[13px]">Kart ve ödeme altyapısı masrafları komisyona dahildir. Satıcı kendi faturasını keser, Martrin yalnızca komisyon faturası keser.</p>
        </div>

        {stages > 1 ? (
          <div className="bg-paper rounded-[22px] p-4 md:p-5 grid gap-2">
            <div className="flex justify-between items-center gap-2 flex-wrap">
              <b className="font-display font-medium text-[16px]">Aşama planı</b>
              <Badge tone="violet">{stages} × {period === "hafta" ? "hafta" : "ay"}</Badge>
            </div>
            <div className="grid grid-cols-[auto_1fr_1fr] gap-x-3 text-[12.5px] text-muted px-3 pt-1"><span>Aşama</span><span className="text-right">Emanete</span><span className="text-right">Satıcıya</span></div>
            <div className="grid gap-1.5 max-h-[280px] overflow-y-auto">
              {rows.map(r => (
                <div key={r.i} className="grid grid-cols-[auto_1fr_1fr] gap-x-3 items-center bg-white rounded-xl px-3 py-2.5 text-[14px]">
                  <span className="font-display">{r.i}. {period}</span>
                  <span className="text-right font-display tnum">{tl(r.g)}</span>
                  <span className="text-right font-display tnum font-medium">{tl(r.n)}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-muted">Her aşama kendi kanıtı onaylanınca serbest kalır. Sonraki aşamanın parası o döneme kadar emanette bekler.</p>
          </div>
        ) : (
          <div className="bg-paper rounded-[22px] p-5 text-[14px] text-muted">Kampanya bir haftadan uzunsa aşama sayısı seç. Her parçanın satıcıya ne zaman ve ne kadar geçtiğini burada gör.</div>
        )}
      </div>
    </section>
  );
}

export function Escrow() {
  return (
    <Page>
      <TrustTabs active="emanet-odeme" />
      <Hero eyebrow="Emanet ödeme" title={<>Paran, reklamın yayına çıkana kadar <span className="pill-word">güvende</span></>}
        text="Ödediğin tutar satıcıya hemen geçmez. Lisanslı ödeme kuruluşunda emanette bekler, yayın kanıtını onayladığında satıcıya aktarılır.">
        <div className="flex flex-wrap gap-2">
          <Badge tone="ok"><Icon n="shield" className="w-3.5 h-3.5" /> Lisanslı ödeme kuruluşu</Badge>
          <Badge tone="sky"><Icon n="camera" className="w-3.5 h-3.5" /> Fotoğraf + video kanıt</Badge>
          <Badge tone="violet"><Icon n="calendar" className="w-3.5 h-3.5" /> 72 saat itiraz süresi</Badge>
        </div>
      </Hero>

      <section aria-labelledby="akis-baslik" className="grid gap-4">
        <h2 id="akis-baslik" className="font-display font-semibold text-[26px] tracking-tight">Para nasıl ilerler?</h2>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {FLOW.map((s, i) => {
            const hold = i >= 1 && i <= 4;
            const done = i === FLOW.length - 1;
            return (
              <li key={s.t} className={`relative rounded-card p-5 grid gap-3 content-start min-w-0 ${done ? "bg-lime" : i === 4 ? "bg-ink text-white" : "bg-white"}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className={`grid place-items-center w-10 h-10 rounded-xl ${done ? "bg-ink text-lime" : i === 4 ? "bg-lime text-ink" : "bg-paper"}`}><Icon n={s.icon} /></span>
                  <span className={`font-display text-[13px] tnum ${i === 4 ? "text-white/50" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <b className="font-display font-medium text-[17px] leading-tight">{s.t}</b>
                <p className={`text-[14px] ${done ? "text-ink/70" : i === 4 ? "text-white/70" : "text-muted"}`}>{s.d}</p>
                {hold && <span className={`text-[12px] font-display rounded-full px-2.5 py-1 w-fit ${i === 4 ? "bg-white/10 text-white/80" : "bg-violet-soft text-violet-ink"}`}>Para emanette</span>}
                {i < FLOW.length - 1 && <span aria-hidden className="hidden lg:grid absolute -right-[13px] top-1/2 -translate-y-1/2 z-10 place-items-center w-6 h-6 rounded-full bg-paper text-muted"><Icon n="right" className="w-3.5 h-3.5" sw={2.4} /></span>}
              </li>
            );
          })}
        </ol>
      </section>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-5 mt-12">
        <section aria-labelledby="asama-baslik" className="bg-violet text-white rounded-card p-6 md:p-8 grid gap-4 content-start">
          <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white/15"><Icon n="layers" className="w-6 h-6" /></span>
          <h2 id="asama-baslik" className="font-display font-semibold text-[26px] tracking-tight">Uzun kampanyada aşamalı ödeme</h2>
          <p className="text-white/80 text-[15px]">Üç aylık bir billboard kiralamasında tüm parayı ilk gün bağlaman gerekmez. Kampanyayı haftalık ya da aylık parçalara böl.</p>
          <ul className="grid gap-3 text-[15px]">
            {["Her parça kendi dönemi başlamadan emanete alınır.", "Satıcı her dönem için yeni kanıt yükler.", "Onaylanan parça satıcıya geçer, sıradaki parça bekler.", "Kampanyayı erken bitirirsen başlamamış dönemlerin parası emanete hiç girmez."].map(t => (
              <li key={t} className="flex gap-3 items-start"><span className="grid place-items-center w-6 h-6 rounded-full bg-lime text-ink shrink-0"><Icon n="check" className="w-3.5 h-3.5" sw={3} /></span><span className="min-w-0">{t}</span></li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="itiraz-baslik" className="bg-white rounded-card p-6 md:p-8 grid gap-4 content-start">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <span className="text-[14px] text-muted">Bir şey ters giderse</span>
              <h2 id="itiraz-baslik" className="font-display font-semibold text-[26px] tracking-tight mt-1">İtiraz ve uyuşmazlık</h2>
            </div>
            <Badge tone="rose">Para karara kadar emanette</Badge>
          </div>
          <ol className="grid gap-2">
            {DISPUTE.map((s, i) => (
              <li key={s.t} className="grid grid-cols-[auto_1fr] gap-4 bg-paper rounded-2xl p-4">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-ink text-white font-display text-[14px] tnum">{i + 1}</span>
                <div className="min-w-0"><b className="font-display font-medium text-[16px]">{s.t}</b><p className="text-muted text-[14px] mt-0.5">{s.d}</p></div>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-muted">Kanıt yetersizse ₺3.500 karşılığında bağımsız saha denetimi isteyebilirsin. Denetim satıcı aleyhine sonuçlanırsa ücret iade edilir.</p>
        </section>
      </div>

      <div className="mt-12"><EscrowCalculator /></div>

      <div className="mt-12 rounded-card bg-ink text-white p-6 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div className="min-w-0"><b className="font-display font-semibold text-[26px] tracking-tight">Kanıt neyi kapsıyor?</b><p className="text-white/70 mt-1">Onay düğmesine basmadan önce neye bakman gerektiğini anlattık.</p></div>
        <A to="yayin-kaniti" className="h-12 px-6 rounded-2xl bg-lime text-ink grid place-items-center font-display font-medium">Yayın kanıtı kuralları</A>
      </div>
      <p className="text-[13px] text-muted mt-6 text-center">Ödeme altyapısı henüz seçilmedi. TCMB lisanslı bir pazaryeri ödeme kuruluşu kullanılacak. Tutarlar KDV hariçtir.</p>
    </Page>
  );
}

/* =========================================================
   2) YAYIN KANITI
   ========================================================= */
const RULES = [
  { icon: "camera", t: "Fotoğraf ve video birlikte", d: "İkisi de zorunlu. Yalnızca fotoğraf ya da yalnızca video kabul edilmez." },
  { icon: "calendar", t: "Tarih damgası", d: "Çekim zamanı kampanya tarih aralığında olmalı. Damga, Martrin uygulamasının kamerasıyla otomatik basılır." },
  { icon: "pin", t: "Konum eşleşmesi", d: "Çekim konumu, alanın kayıtlı konumuna 150 metreden yakın olmalı." },
  { icon: "play", t: "En az 15 saniye video", d: "Video, reklamı ve çevresini tek çekimde, kesintisiz göstermeli." },
  { icon: "eye", t: "Kreatif okunur olmalı", d: "Onaylanan tasarım net seçilmeli. Bulanık ya da gece ışıksız çekim reddedilir." },
  { icon: "layers", t: "Galeriden yükleme yok", d: "Kanıt uygulama içinden çekilir. Eski ya da düzenlenmiş dosya yüklenemez." },
];

type SimKey = "alan" | "dooh" | "inf";
const SIM: Record<SimKey, { label: string; items: { id: string; t: string }[] }> = {
  alan: { label: "Billboard / AVM / belediye", items: [
    { id: "k-alan-foto", t: "Tarih damgalı fotoğraf çektim" },
    { id: "k-alan-video", t: "En az 15 saniyelik video çektim" },
    { id: "k-alan-konum", t: "Konum servisleri açıktı, konum eşleşti" },
    { id: "k-alan-kreatif", t: "Kreatif onaylı tasarımla aynı ve okunuyor" },
    { id: "k-alan-cevre", t: "Videoda alanın çevresi ve tabelası görünüyor" },
  ] },
  dooh: { label: "Dijital ekran (DOOH)", items: [
    { id: "k-dooh-foto", t: "Ekranda yayın anının fotoğrafını çektim" },
    { id: "k-dooh-video", t: "Spotun tamamını içeren en az 15 sn video çektim" },
    { id: "k-dooh-konum", t: "Konum eşleşti" },
    { id: "k-dooh-rapor", t: "Oynatma raporunu (play log) yükledim" },
    { id: "k-dooh-sure", t: "Rapordaki gösterim sayısı siparişle tutuyor" },
  ] },
  inf: { label: "Influencer", items: [
    { id: "k-inf-link", t: "Yayın linkini ekledim" },
    { id: "k-inf-ekran", t: "Paylaşımın ekran görüntüsünü yükledim" },
    { id: "k-inf-etiket", t: "#reklam ya da #işbirliği etiketi görünüyor" },
    { id: "k-inf-sure", t: "Paylaşım anlaşılan süre boyunca yayında kalacak" },
    { id: "k-inf-stat", t: "48 saat sonra istatistik ekran görüntüsünü yükleyeceğim" },
  ] },
};

function ProofSimulator() {
  const [kind, setKind] = useState<SimKey>("alan");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const items = SIM[kind].items;
  const done = items.filter(i => checked[i.id]).length;
  const ready = done === items.length;

  const pick = (k: SimKey) => { setKind(k); setSent(false); };
  const toggle = (id: string) => { setChecked(c => ({ ...c, [id]: !c[id] })); setSent(false); };

  return (
    <section aria-labelledby="sim-baslik" className="bg-white rounded-card p-5 md:p-8 grid lg:grid-cols-[1fr_1fr] gap-6 lg:gap-8">
      <div className="grid gap-4 content-start min-w-0">
        <div>
          <span className="text-[14px] text-muted">Simülatör</span>
          <h2 id="sim-baslik" className="font-display font-semibold text-[26px] tracking-tight mt-1">Kanıt kontrol listesi</h2>
          <p className="text-muted text-[15px] mt-1">Satıcı panelindeki listenin aynısı. Her maddeyi işaretle, liste tamamlanınca gönderim açılır.</p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Alan türü">
          {(Object.keys(SIM) as SimKey[]).map(k => (
            <button key={k} type="button" aria-pressed={kind === k} onClick={() => pick(k)} className={`px-4 py-2 rounded-xl font-display text-[14px] ${kind === k ? "bg-ink text-white" : "bg-paper"}`}>{SIM[k].label}</button>
          ))}
        </div>
        <ul className="grid gap-2">
          {items.map(i => (
            <li key={i.id}>
              <label htmlFor={i.id} className={`flex gap-3 items-center rounded-2xl px-4 py-3 cursor-pointer transition ${checked[i.id] ? "bg-lime-soft" : "bg-paper hover:bg-line"}`}>
                <input id={i.id} type="checkbox" checked={!!checked[i.id]} onChange={() => toggle(i.id)} className="w-5 h-5 accent-[#151515] shrink-0" />
                <span className="text-[15px] min-w-0">{i.t}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className={`rounded-[22px] p-5 md:p-6 grid gap-4 content-start min-w-0 transition ${ready ? "bg-lime" : "bg-ink text-white"}`} aria-live="polite">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <b className="font-display font-semibold text-[22px] tracking-tight">{sent ? "Kanıt gönderildi" : ready ? "Gönderime hazır" : "Eksik maddeler var"}</b>
          <span className={`font-display tnum text-[15px] rounded-full px-3 py-1 ${ready ? "bg-ink text-lime" : "bg-white/10"}`}>{done} / {items.length}</span>
        </div>
        <div className={`h-2.5 rounded-full overflow-hidden ${ready ? "bg-ink/15" : "bg-white/10"}`}>
          <i className={`block h-full rounded-full transition-all ${ready ? "bg-ink" : "bg-lime"}`} style={{ width: `${done / items.length * 100}%` }} />
        </div>
        <ul className="grid gap-2 text-[14px]">
          {items.map(i => (
            <li key={i.id} className="flex gap-3 items-center">
              <Check on={!!checked[i.id]} dark={!ready} />
              <span className={`min-w-0 ${checked[i.id] ? "" : ready ? "" : "text-white/50"}`}>{i.t}</span>
            </li>
          ))}
        </ul>
        {sent ? (
          <p className="text-[15px] bg-ink/10 rounded-2xl p-4">Reklam verenin 72 saatlik onay süresi başladı. İtiraz gelmezse ödeme otomatik olarak sana geçer.</p>
        ) : (
          <button type="button" disabled={!ready} onClick={() => setSent(true)}
            className={`h-12 rounded-2xl font-display font-medium ${ready ? "bg-ink text-white" : "bg-white/10 text-white/40 cursor-not-allowed"}`}>
            {ready ? "Kanıtı gönder" : `${items.length - done} madde kaldı`}
          </button>
        )}
      </div>
    </section>
  );
}

export function Proof() {
  return (
    <Page>
      <TrustTabs active="yayin-kaniti" />
      <Hero eyebrow="Yayın kanıtı" title={<>Reklam yayında mı? <span className="pill-word">Kanıtı</span> konuşur</>}
        text="Satıcı, ödemeyi almak için reklamın gerçekten yayında olduğunu tarih damgalı ve konumlu fotoğraf ile videoyla gösterir. Reklam veren kanıtı panelinden inceler." />

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-5">
        <section aria-labelledby="kural-baslik" className="bg-white rounded-card p-6 md:p-8 grid gap-4 content-start">
          <h2 id="kural-baslik" className="font-display font-semibold text-[26px] tracking-tight">Kanıt kuralları</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {RULES.map(r => (
              <div key={r.t} className="bg-paper rounded-2xl p-4 grid gap-2 content-start min-w-0">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-white"><Icon n={r.icon} /></span>
                <b className="font-display font-medium text-[16px]">{r.t}</b>
                <span className="text-muted text-[14px]">{r.d}</span>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="ornek-baslik" className="bg-ink text-white rounded-card p-2 grid content-start">
          <div className="relative rounded-[22px] overflow-hidden">
            <Img src="v2/c1.jpg" alt="İstanbul'da bina cephesindeki billboardın kanıt fotoğrafı" className="w-full aspect-[4/3]" />
            <div className="absolute left-3 right-3 bottom-3 bg-black/70 backdrop-blur rounded-xl px-3 py-2 font-mono text-[11.5px] sm:text-[12px] leading-relaxed text-white">
              <div>04.11.2026 · 14:32:07 GMT+3</div>
              <div>41.0438° K · 29.0094° D · ±6 m</div>
              <div className="text-lime">Beşiktaş / İstanbul · Alan #BLB-3412</div>
            </div>
            <span className="absolute top-3 left-3"><Badge tone="live"><Icon n="camera" className="w-3.5 h-3.5" /> Uygulama içi çekim</Badge></span>
          </div>
          <div className="p-4 md:p-5 grid gap-3">
            <div className="flex justify-between gap-3 items-start flex-wrap">
              <div className="min-w-0">
                <span className="text-white/60 text-[13px]">Örnek kanıt kartı</span>
                <h2 id="ornek-baslik" className="font-display font-medium text-[18px]">Kahve Durağı · sonbahar kampanyası</h2>
                <span className="text-white/60 text-[13px]">Satıcı: Boğaziçi Açıkhava</span>
              </div>
              <Badge tone="signal">Onay bekliyor</Badge>
            </div>
            <ul className="grid gap-2 text-[14px]">
              {["Konum eşleşti · 38 m", "Video 18 sn", "Tarih damgası kampanya aralığında", "Kreatif onaylı tasarımla aynı"].map(t => (
                <li key={t} className="flex gap-3 items-center"><Check dark />{t}</li>
              ))}
            </ul>
            <div className="text-[13px] text-white/60">Otomatik onaya kalan süre: <span className="font-mono text-white">71:24:10</span></div>
          </div>
        </section>
      </div>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <section aria-labelledby="dooh-baslik" className="bg-sky-soft rounded-card p-6 md:p-8 grid gap-4 content-start">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white text-sky-ink"><Icon n="play" className="w-6 h-6" /></span>
            <h2 id="dooh-baslik" className="font-display font-semibold text-[22px] tracking-tight text-sky-ink">Dijital ekran (DOOH) için ek kanıt</h2>
          </div>
          <p className="text-[15px] text-ink/80">Ekranda reklam dönüşümlü gösterilir. Fotoğraf ve video anlık durumu gösterir, toplam gösterimi ise oynatma raporu kanıtlar.</p>
          <ul className="grid gap-2 text-[15px]">
            {["Oynatma raporu (play log): tarih, saat ve gösterim sayısı", "Rapordaki gösterim, siparişteki döngü sayısını karşılar", "Ekran kapalı kaldıysa eksik gösterim kadar iade hesaplanır"].map(t => (
              <li key={t} className="flex gap-3 items-start bg-white rounded-2xl px-4 py-3"><Check /><span className="min-w-0">{t}</span></li>
            ))}
          </ul>
          <div className="flex gap-2 flex-wrap"><Badge tone="sky">Örnek: AVM LED ekran</Badge><Badge tone="sky">Örnek: otobüs durağı ekranı</Badge></div>
        </section>

        <section aria-labelledby="inf-baslik" className="bg-violet-soft rounded-card p-6 md:p-8 grid gap-4 content-start">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white text-violet-ink"><Icon n="mic" className="w-6 h-6" /></span>
            <h2 id="inf-baslik" className="font-display font-semibold text-[22px] tracking-tight text-violet-ink">Influencer için kanıt</h2>
          </div>
          <p className="text-[15px] text-ink/80">Konum gerekmez, ama paylaşımın kendisi ve sonucu kayda geçer.</p>
          <ol className="grid gap-2 text-[15px]">
            {[["Yayın linki", "Paylaşım anında"], ["Ekran görüntüsü", "Etiket ve iş birliği ibaresi görünür"], ["İstatistik ekran görüntüsü", "Paylaşımdan 48 saat sonra"]].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[auto_1fr] gap-3 items-center bg-white rounded-2xl px-4 py-3">
                <span className="grid place-items-center w-7 h-7 rounded-full bg-violet text-white font-display text-[13px]">{i + 1}</span>
                <span className="min-w-0"><b className="font-display font-medium">{t}</b><span className="text-muted text-[14px] block">{d}</span></span>
              </li>
            ))}
          </ol>
          <p className="text-[13px] text-ink/60">İstatistikler şimdilik beyan ve ekran görüntüsüyle alınır. Platform bağlantıları açılınca otomatik çekilecek.</p>
        </section>
      </div>

      <div className="mt-12"><ProofSimulator /></div>

      <section aria-labelledby="denetim-baslik" className="mt-12 rounded-card bg-lime p-6 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
        <span className="grid place-items-center w-16 h-16 rounded-2xl bg-ink text-lime"><Icon n="shield" className="w-8 h-8" /></span>
        <div className="min-w-0">
          <h2 id="denetim-baslik" className="font-display font-semibold text-[26px] tracking-tight">Saha denetimi</h2>
          <p className="text-ink/75 mt-1 max-w-[60ch]">Kanıta güvenmiyor musun? Bağımsız bir denetçi 48 saat içinde alana gider, kendi fotoğraf ve videosunu çeker, rapor yazar. Denetim satıcı aleyhine çıkarsa ücreti iade ederiz.</p>
        </div>
        <div className="grid gap-2 justify-items-start md:justify-items-end">
          <span className="font-display font-semibold text-[34px] tracking-tight tnum leading-none">₺3.500</span>
          <span className="text-[13px] text-ink/60">alan başına</span>
          <A to="panel-reklamveren" className="h-12 px-6 rounded-2xl bg-ink text-white grid place-items-center font-display font-medium">Denetim iste</A>
        </div>
      </section>
    </Page>
  );
}

/* =========================================================
   3) KVKK VE REKLAM KILAVUZU
   ========================================================= */
const TOC = [
  { id: "kvkk-ozet", t: "KVKK aydınlatma özeti" },
  { id: "kvkk-haklar", t: "Kişisel veri hakların" },
  { id: "reklam-kilavuzu", t: "Etkileyici reklam kılavuzuna uyum" },
  { id: "cerez-tercihleri", t: "Çerez tercihleri" },
];

const KVKK_ROWS = [
  { t: "Veri sorumlusu", d: "Martrin Teknoloji A.Ş. (prototip için hayali unvan). Başvuru adresi: kvkk@martrin.example" },
  { t: "İşlenen veriler", d: "Kimlik ve iletişim bilgileri, şirket ve vergi bilgileri, banka hesabı, kampanya ve sipariş kayıtları, yayın kanıtındaki konum ve zaman bilgisi, sosyal medya istatistikleri." },
  { t: "Amaçlar", d: "Üyelik ve sözleşme süreçleri, emanetli ödemenin yürütülmesi, yayın kanıtının doğrulanması, uyuşmazlık çözümü, yasal yükümlülükler ve güvenlik." },
  { t: "Hukuki sebepler", d: "Sözleşmenin kurulması ve ifası, hukuki yükümlülük, meşru menfaat. Pazarlama iletişimi ve analitik çerezler için açık rıza." },
  { t: "Aktarım", d: "Lisanslı ödeme kuruluşu, barındırma ve e-posta hizmet sağlayıcıları, saha denetçileri ve yetkili kamu kurumları. Yalnızca amaç için gereken kadar." },
  { t: "Saklama süresi", d: "İlgili mevzuattaki süreler boyunca; süre dolunca silinir, yok edilir ya da anonim hâle getirilir." },
];

const RIGHTS = [
  "Verinin işlenip işlenmediğini öğrenme", "İşlendiyse bilgi talep etme", "İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme",
  "Aktarıldığı üçüncü kişileri bilme", "Eksik ya da yanlış verinin düzeltilmesini isteme", "Silinmesini ya da yok edilmesini isteme",
  "Otomatik analizle aleyhine çıkan sonuca itiraz etme", "Kanuna aykırı işleme nedeniyle zararın giderilmesini talep etme",
];

const AD_RULES = [
  { t: "Reklam olduğu ilk bakışta anlaşılmalı", d: "İş birliği, paylaşımın başında ve açıkça belirtilir. Uzun açıklama metninin sonuna saklanmaz." },
  { t: "#reklam ya da #işbirliği etiketi", d: "Etiket Türkçe, okunur ve paylaşımla birlikte görünür. Videoda sesli ya da yazılı ifade de eklenir." },
  { t: "Platform araçları kullanılır", d: "Platformun “ücretli ortaklık” gibi işaretleme aracı varsa etkinleştirilir." },
  { t: "Hediye ve indirim de iş birliğidir", d: "Para ödenmese bile ücretsiz ürün, hizmet ya da indirim karşılığı yapılan paylaşım reklam sayılır." },
  { t: "Yanıltıcı ifade yok", d: "Denenmemiş ürün denenmiş gibi gösterilmez, sonuçlar abartılmaz, filtre ürünün etkisini değiştirmez." },
  { t: "Sorumluluk paylaşılır", d: "Reklam veren ve içerik üreticisi kurallara uyumdan birlikte sorumludur." },
];

type CookieKey = "zorunlu" | "analitik" | "pazarlama";
const COOKIES: { k: CookieKey; t: string; d: string; locked?: boolean }[] = [
  { k: "zorunlu", t: "Zorunlu çerezler", d: "Oturum, sepet ve güvenlik için gerekir. Kapatılamaz.", locked: true },
  { k: "analitik", t: "Analitik çerezler", d: "Hangi sayfaların kullanıldığını anonim olarak ölçer." },
  { k: "pazarlama", t: "Pazarlama çerezleri", d: "Sana uygun kampanya ve alan önerileri göstermemizi sağlar." },
];

function CookiePanel() {
  const [prefs, setPrefs] = useState<Record<CookieKey, boolean>>({ zorunlu: true, analitik: false, pazarlama: false });
  const [saved, setSaved] = useState(false);
  const set = (k: CookieKey, v: boolean) => { setPrefs(p => ({ ...p, [k]: v })); setSaved(false); };
  const all = (v: boolean) => { setPrefs({ zorunlu: true, analitik: v, pazarlama: v }); setSaved(false); };

  return (
    <form onSubmit={e => { e.preventDefault(); setSaved(true); }} className="grid gap-3">
      {COOKIES.map(c => {
        const on = prefs[c.k];
        const id = `cerez-${c.k}`;
        return (
          <div key={c.k} className="flex items-center gap-4 bg-paper rounded-2xl px-4 py-4">
            <div className="flex-1 min-w-0">
              <label htmlFor={id} className="font-display font-medium text-[16px] cursor-pointer">{c.t}</label>
              <p className="text-muted text-[14px]">{c.d}</p>
            </div>
            <button id={id} type="button" role="switch" aria-checked={on} disabled={c.locked} onClick={() => set(c.k, !on)}
              className={`relative w-12 h-7 rounded-full shrink-0 transition ${on ? "bg-ink" : "bg-line"} ${c.locked ? "opacity-60 cursor-not-allowed" : ""}`}>
              <span className={`absolute top-1 left-1 w-5 h-5 rounded-full transition-transform ${on ? "translate-x-5 bg-lime" : "bg-white"}`} />
            </button>
          </div>
        );
      })}
      <div className="flex flex-wrap gap-2 pt-1">
        <button type="submit" className="h-12 px-6 rounded-2xl bg-lime text-ink font-display font-medium">Tercihleri kaydet</button>
        <button type="button" onClick={() => all(true)} className="h-12 px-5 rounded-2xl bg-ink text-white font-display font-medium">Tümünü aç</button>
        <button type="button" onClick={() => all(false)} className="h-12 px-5 rounded-2xl bg-paper font-display font-medium">Yalnızca zorunlu</button>
      </div>
      <div aria-live="polite">
        {saved && (
          <div className="flex gap-3 items-center bg-mint-soft text-mint-ink rounded-2xl px-4 py-3 text-[15px]">
            <Check />
            <span className="min-w-0"><b className="font-display font-medium">Tercihlerin kaydedildi.</b> Analitik {prefs.analitik ? "açık" : "kapalı"}, pazarlama {prefs.pazarlama ? "açık" : "kapalı"}. İstediğin zaman buradan değiştirebilirsin.</span>
          </div>
        )}
      </div>
    </form>
  );
}

export function Legal() {
  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Page>
      <TrustTabs active="kvkk" />
      <div role="note" className="flex gap-3 items-start bg-[#fff1dc] text-ink rounded-2xl px-4 py-3 mb-8 text-[15px]">
        <span className="grid place-items-center w-6 h-6 rounded-full bg-live text-white shrink-0 font-display text-[13px]">!</span>
        <span className="min-w-0"><b className="font-display font-medium">Örnek metindir, avukat onayından geçecek.</b> Bu sayfa tasarım prototipidir, hukuki bağlayıcılığı yoktur.</span>
      </div>
      <Hero eyebrow="KVKK ve reklam kılavuzu" title={<>Verin ve reklamın <span className="pill-word">açık</span> kurallarla</>}
        text="Hangi veriyi neden işlediğimizi, haklarını ve influencer iş birliklerinde uyduğumuz reklam ilkelerini kısaca anlattık." />

      <div className="grid lg:grid-cols-[260px_1fr] gap-5 items-start">
        <nav aria-label="İçindekiler" className="bg-white rounded-card p-5 grid gap-1 lg:sticky lg:top-6">
          <b className="font-display font-medium text-[15px] px-3 pb-2">İçindekiler</b>
          {TOC.map((t, i) => (
            <button key={t.id} type="button" onClick={() => jump(t.id)} className="flex gap-3 items-center text-left rounded-xl px-3 py-2.5 hover:bg-paper text-[15px]">
              <span className="font-display text-muted text-[13px] tnum w-5">{String(i + 1).padStart(2, "0")}</span>
              <span className="min-w-0">{t.t}</span>
            </button>
          ))}
        </nav>

        <div className="grid gap-5 min-w-0">
          <section id="kvkk-ozet" aria-labelledby="kvkk-ozet-h" className="bg-white rounded-card p-6 md:p-8 grid gap-4 scroll-mt-6">
            <div><span className="text-[14px] text-muted">01</span><h2 id="kvkk-ozet-h" className="font-display font-semibold text-[26px] tracking-tight">KVKK aydınlatma özeti</h2>
              <p className="text-muted text-[15px] mt-1">6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında hazırlanan aydınlatma metninin kısa hâli.</p></div>
            <dl className="grid gap-2">
              {KVKK_ROWS.map(r => (
                <div key={r.t} className="grid sm:grid-cols-[180px_1fr] gap-1 sm:gap-4 bg-paper rounded-2xl px-4 py-3">
                  <dt className="font-display font-medium text-[15px]">{r.t}</dt>
                  <dd className="text-[15px] text-ink/80 min-w-0">{r.d}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="kvkk-haklar" aria-labelledby="kvkk-haklar-h" className="bg-white rounded-card p-6 md:p-8 grid gap-4 scroll-mt-6">
            <div><span className="text-[14px] text-muted">02</span><h2 id="kvkk-haklar-h" className="font-display font-semibold text-[26px] tracking-tight">Kişisel veri hakların</h2></div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {RIGHTS.map(r => <li key={r} className="flex gap-3 items-start bg-paper rounded-2xl px-4 py-3 text-[15px]"><Check /><span className="min-w-0">{r}</span></li>)}
            </ul>
            <p className="text-[14px] text-muted">Başvurunu yazılı olarak ya da kayıtlı e-posta adresinden iletebilirsin. En geç 30 gün içinde ücretsiz yanıtlarız.</p>
          </section>

          <section id="reklam-kilavuzu" aria-labelledby="reklam-h" className="bg-ink text-white rounded-card p-6 md:p-8 grid gap-4 scroll-mt-6">
            <div><span className="text-[14px] text-white/50">03</span><h2 id="reklam-h" className="font-display font-semibold text-[26px] tracking-tight">Etkileyici reklam kılavuzuna uyum</h2>
              <p className="text-white/70 text-[15px] mt-1">Ticaret Bakanlığı'nın sosyal medya etkileyicileri tarafından yapılan ticari reklam ve haksız ticari uygulamalara ilişkin kılavuzunun genel ilkelerini Martrin'deki her influencer işine uygularız.</p></div>
            <div className="grid sm:grid-cols-2 gap-3">
              {AD_RULES.map(r => (
                <div key={r.t} className="bg-white/[.06] ring-1 ring-white/10 rounded-2xl p-4 grid gap-1.5 content-start min-w-0">
                  <b className="font-display font-medium text-[16px]">{r.t}</b>
                  <span className="text-white/65 text-[14px]">{r.d}</span>
                </div>
              ))}
            </div>
            <div className="bg-lime text-ink rounded-2xl p-4 grid gap-2">
              <b className="font-display font-medium">Martrin bunu nasıl uygular?</b>
              <ul className="grid gap-1.5 text-[14px]">
                <li>• Her influencer siparişinin brifine etiket zorunluluğu otomatik eklenir.</li>
                <li>• Kanıt kontrolünde etiketin görünür olup olmadığı ayrıca işaretlenir.</li>
                <li>• Etiketsiz paylaşım onaylanmaz, düzeltilene kadar ödeme emanette kalır.</li>
              </ul>
            </div>
          </section>

          <section id="cerez-tercihleri" aria-labelledby="cerez-h" className="bg-white rounded-card p-6 md:p-8 grid gap-4 scroll-mt-6">
            <div><span className="text-[14px] text-muted">04</span><h2 id="cerez-h" className="font-display font-semibold text-[26px] tracking-tight">Çerez tercihleri</h2>
              <p className="text-muted text-[15px] mt-1">Zorunlu çerezler dışındakiler yalnızca onay verirsen çalışır.</p></div>
            <CookiePanel />
          </section>
        </div>
      </div>
    </Page>
  );
}
