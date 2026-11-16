import { useState } from "react";
import { COMMISSION, tl } from "../data";
import { A, Icon, LogoMark, Page } from "../ui";

type Plan = { name: string; tag: string; month: number; feats: string[]; cta: string; to: string; hi?: boolean; note?: string };

const SELLER: Plan[] = [
  { name: "Başlangıç", tag: "Bireysel influencer ve tek alanlı işletmeler", month: 0, cta: "Ücretsiz başla", to: "panel-satici",
    feats: ["Sınırsız ilan ve paket", "Standart kategori komisyonu", "Emanetli ödeme ve kanıt yükleme", "Teklif ve ters ihalelere katılım", "Kazanç defteri"] },
  { name: "Pro", tag: "Düzenli iş alan içerik üreticileri ve alan sahipleri", month: 1490, cta: "Pro'ya geç", to: "panel-satici", hi: true,
    feats: ["Komisyonda 2 puan indirim", "Ayda 1 hafta ücretsiz öne çıkarma", "3 kişilik ekip, rol ve yetki yönetimi", "Doluluk takvimi senkronu", "Gelişmiş kazanç raporu ve dışa aktarma"] },
  { name: "Kurumsal", tag: "Açık hava şirketleri, AVM'ler ve ajans ekipleri", month: 4990, cta: "Satışla görüş", to: "panel-satici",
    feats: ["Komisyonda 4 puan indirim", "Toplu envanter yükleme (Excel)", "Sınırsız ekip üyesi", "API ve entegrasyon erişimi", "Özel hesap yöneticisi"] },
];
const BUYER: Plan[] = [
  { name: "Ücretsiz", tag: "Ara sıra kampanya yapan işletmeler", month: 0, cta: "Hemen keşfet", to: "kesfet",
    feats: ["Tüm alanlara ve influencer'lara erişim", "Tek sepetten karma kampanya", "Emanetli ödeme ve kanıt onayı", "İlan ve ters ihale açma"] },
  { name: "Marka Pro", tag: "Her ay kampanya yapan markalar", month: 990, cta: "Pro'ya geç", to: "panel-reklamveren", hi: true,
    feats: ["Ayda 1 ücretsiz saha denetimi", "Kampanya ölçüm raporu (QR, kod, link)", "Kayıtlı aramalar ve fiyat alarmı", "Öncelikli destek"] },
  { name: "Ajans", tag: "Birden fazla markayı yöneten ajanslar", month: 3990, cta: "Satışla görüş", to: "panel-reklamveren",
    feats: ["Sınırsız marka hesabı", "Ekip üyeleri ve onay akışı", "Toplu teklif isteme", "Müşteriye özel beyaz etiketli rapor"] },
];
const EXTRAS = [
  { n: "Öne çıkarma", d: "Arama ve ana sayfada üst sıra", p: "₺1.500 / hafta", icon: "arrow" },
  { n: "Saha denetimi", d: "Bağımsız denetçi panoyu yerinde kontrol eder", p: "₺3.500 / alan", icon: "shield" },
  { n: "Kreatif tasarım", d: "Billboard, ekran ve story tasarımı", p: "₺4.000'den", icon: "layers" },
  { n: "Ölçüm raporu", d: "QR, indirim kodu ve link takibiyle sonuç raporu", p: "₺2.500 / kampanya", icon: "eye" },
];

export default function Pricing() {
  const [who, setWho] = useState<"satici" | "reklam">("satici");
  const [yearly, setYearly] = useState(false);
  const plans = who === "satici" ? SELLER : BUYER;
  const price = (m: number) => yearly ? Math.round(m * 10 / 12) : m;
  return (
    <Page>
      <div className="grid justify-items-center text-center gap-5 pt-4 pb-10">
        <h1 className="font-display font-semibold tracking-[-.035em] leading-[1] text-[40px] md:text-[64px] max-w-[16ch] text-balance">Ücretler ve <span className="pill-word">paketler</span></h1>
        <p className="text-muted text-[18px] max-w-[52ch]">Listelemek ücretsiz. Martrin yalnızca iş tamamlanınca komisyon alır. Daha fazlasına ihtiyacın olursa paket seç.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <div className="inline-flex bg-white rounded-2xl p-1.5 font-display text-[15px]" role="tablist">
            {([["satici", "Satıcılar için"], ["reklam", "Reklam verenler için"]] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={who === k} onClick={() => setWho(k)} className={`px-5 py-2.5 rounded-xl ${who === k ? "bg-ink text-white" : ""}`}>{l}</button>)}
          </div>
          <div className="inline-flex bg-violet-soft rounded-2xl p-1.5 font-display text-[15px]">
            <button onClick={() => setYearly(false)} className={`px-5 py-2.5 rounded-xl ${!yearly ? "bg-violet text-white" : "text-violet-ink"}`}>Aylık</button>
            <button onClick={() => setYearly(true)} className={`px-5 py-2.5 rounded-xl flex items-center gap-2 ${yearly ? "bg-violet text-white" : "text-violet-ink"}`}>Yıllık <span className={`text-[12px] rounded-full px-2 py-0.5 ${yearly ? "bg-white/20" : "bg-white"}`}>2 ay bedava</span></button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 items-stretch">
        {plans.map(p => (
          <div key={p.name} className={`rounded-card p-2 grid content-start ${p.hi ? "bg-ink text-white" : "bg-white"}`}>
            <div className={`rounded-[22px] p-6 grid gap-4 ${p.hi ? "bg-gradient-to-br from-lime to-[#c9e94a] text-ink" : "bg-paper"}`}>
              <div className="flex justify-between items-start gap-2"><b className="font-display font-semibold text-[24px] tracking-tight">{p.name}</b>{p.hi && <span className="bg-ink text-lime text-[12px] font-display rounded-full px-3 py-1">En çok tercih edilen</span>}</div>
              <p className={`text-[15px] -mt-2 ${p.hi ? "text-ink/70" : "text-muted"}`}>{p.tag}</p>
              <div className="font-display tnum"><span className="font-semibold text-[44px] tracking-tight leading-none">{p.month ? tl(price(p.month)) : "₺0"}</span><span className="text-[15px] opacity-70"> {p.month ? "/ ay" : "her zaman"}</span></div>
              {yearly && p.month > 0 && <div className="text-[13px] -mt-2 opacity-70">Yıllık {tl(p.month * 10)} olarak faturalanır</div>}
              <A to={p.to} className={`h-12 rounded-2xl grid place-items-center font-display font-medium ${p.hi ? "bg-ink text-white" : "bg-ink text-white"}`}>{p.cta}</A>
            </div>
            <div className="p-6 grid gap-3">
              <b className="font-display font-medium text-[16px]">Neler dahil?</b>
              {p.feats.map(f => <div key={f} className="flex gap-3 items-start text-[15px]"><span className={`grid place-items-center w-6 h-6 rounded-full shrink-0 ${p.hi ? "bg-lime text-ink" : "bg-lime-soft text-ink"}`}><Icon n="check" className="w-3.5 h-3.5" sw={3} /></span>{f}</div>)}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-5 mt-12">
        <section className="bg-white rounded-card p-6 md:p-8 grid gap-4 content-start">
          <div><h2 className="font-display font-semibold text-[26px] tracking-tight">Kategori komisyonları</h2><p className="text-muted text-[15px] mt-1">İş tamamlanıp ödeme satıcıya aktarılınca kesilir. Paket indirimi bu oranlardan düşülür.</p></div>
          <div className="grid gap-2">
            {COMMISSION.filter(c => c.rate).map(c => (
              <div key={c.cat} className="flex items-center gap-4 bg-paper rounded-2xl px-4 py-3">
                <span className="flex-1 font-display text-[16px]">{c.cat}</span>
                <span className="hidden sm:block w-32 h-2 rounded-full bg-line overflow-hidden"><i className="block h-full bg-ink rounded-full" style={{ width: `${c.rate / 20 * 100}%` }} /></span>
                <span className="font-display font-semibold text-[20px] tnum w-14 text-right">%{c.rate}</span>
              </div>
            ))}
          </div>
          <p className="text-[13px] text-muted">Reklam veren komisyon ödemez. Kart ve ödeme altyapısı masrafları dahildir.</p>
        </section>
        <section className="bg-ink text-white rounded-card p-6 md:p-8 grid gap-4 content-start">
          <h2 className="font-display font-semibold text-[26px] tracking-tight">Ek hizmetler</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {EXTRAS.map(e => (
              <div key={e.n} className="bg-white/[.06] ring-1 ring-white/10 rounded-2xl p-4 grid gap-2">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-lime text-ink"><Icon n={e.icon} /></span>
                <b className="font-display font-medium text-[17px]">{e.n}</b>
                <span className="text-white/60 text-[14px]">{e.d}</span>
                <span className="font-display text-lime tnum">{e.p}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-card bg-violet text-white p-6 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
        <LogoMark body="#ffffff" className="w-16 h-16" />
        <div><b className="font-display font-semibold text-[26px] tracking-tight">Büyük bir kampanya mı planlıyorsun?</b><p className="text-white/80 mt-1">81 ilde karma kampanyalar için ekibimiz teklif hazırlar.</p></div>
        <A to="ilanlar" className="h-12 px-6 rounded-2xl bg-lime text-ink grid place-items-center font-display font-medium">Teklif iste</A>
      </div>
      <p className="text-[13px] text-muted mt-6 text-center">Fiyatlar prototip içindir ve KDV hariçtir. Gelir modeli kararları (A1, A2, A5) netleşince güncellenecek.</p>
    </Page>
  );
}
