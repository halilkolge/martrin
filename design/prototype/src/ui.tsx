import { createContext, useContext, useState, type ReactNode } from "react";
import { INFLUENCERS, NICHE_TONE, SPACES, TYPE_LABEL, kfmt, seller, tl, type Influencer, type Platform, type Space } from "./data";

/* ---------- navigation ---------- */
export const go = (name: string) => { location.hash = name; window.scrollTo({ top: 0 }); };
export function A({ to, className = "", children, label }: { to: string; className?: string; children: ReactNode; label?: string }) {
  return <a href={"#" + to} aria-label={label} onClick={() => window.scrollTo({ top: 0 })} className={className}>{children}</a>;
}

/* ---------- cart ---------- */
export type CartItem = { id: string; kind: "space" | "inf"; option: string; price: number };
type CartCtx = { items: CartItem[]; add: (i: CartItem) => void; remove: (id: string) => void; has: (id: string) => boolean };
const Ctx = createContext<CartCtx>(null!);
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    { id: "b01", kind: "space", option: "1 hafta · 7–13 Aralık", price: 78000 },
    { id: "i1", kind: "inf", option: "Reels + 3 Story", price: 52000 },
  ]);
  const add = (i: CartItem) => setItems(s => [...s.filter(x => x.id !== i.id), i]);
  const remove = (id: string) => setItems(s => s.filter(x => x.id !== id));
  const has = (id: string) => items.some(x => x.id === id);
  return <Ctx.Provider value={{ items, add, remove, has }}>{children}</Ctx.Provider>;
}
export const useCart = () => useContext(Ctx);

/* ---------- icons (stroke, 24 grid) ---------- */
const P: Record<string, ReactNode> = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></>,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  bell: <><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z" /><path d="M10 20a2 2 0 0 0 4 0" /></>,
  gear: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3.1 14H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 10 3.1V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 20.9 10H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></>,
  bookmark: <path d="M6 4h12v17l-6-4-6 4Z" />,
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  right: <path d="M5 12h14m-6-6 6 6-6 6" />,
  cart: <><path d="M3 4h2l2.4 11h10.2L20 8H6.2" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></>,
  filter: <><path d="M4 7h10M18 7h2M4 17h4M12 17h8" /><circle cx="16" cy="7" r="2" /><circle cx="10" cy="17" r="2" /></>,
  play: <path d="M8 5v14l11-7Z" />,
  shield: <><path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6Z" /><path d="m9 12 2 2 4-4" /></>,
  camera: <><path d="M4 8h3l2-3h6l2 3h3v11H4Z" /><circle cx="12" cy="13" r="3.5" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5Z" /><path d="m3 13 9 5 9-5" /></>,
  check: <path d="m5 12 5 5 9-10" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
};
export function Icon({ n, className = "w-5 h-5", sw = 1.8 }: { n: keyof typeof P | string; className?: string; sw?: number }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{P[n]}</svg>;
}
export function Verified({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-label="Doğrulanmış"><path fill="#151515" d="m12 1.8 2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3-3.2-.1L12 22.2l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3.1-1-3.1 2.6-1.9 1-3 3.2.1Z" /><path d="m8 12 2.8 2.8L16.5 9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
const SOC: Record<Platform, ReactNode> = {
  Instagram: <><rect x="4" y="4" width="16" height="16" rx="5" fill="currentColor" /><circle cx="12" cy="12" r="3.6" fill="none" stroke="#fff" strokeWidth="1.8" /><circle cx="16.6" cy="7.4" r="1.1" fill="#fff" /></>,
  YouTube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" /><path d="M10 9v6l5-3Z" fill="#fff" /></>,
  TikTok: <path fill="currentColor" d="M14 3h3c.2 2 1.6 3.6 3.6 3.8v3c-1.4 0-2.7-.4-3.7-1.1V15a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 14 15Z" />,
  X: <path fill="currentColor" d="M4 4h4.2l3.9 5.3L16.8 4H20l-6.4 7.3L20.5 20h-4.2l-4.3-5.8L6.9 20H3.7l6.8-7.7Z" />,
  LinkedIn: <><rect x="3.5" y="3.5" width="17" height="17" rx="3.5" fill="currentColor" /><path d="M8 10v6M8 7.6v.1M11.5 16v-3.4a2 2 0 0 1 4 0V16" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" /></>,
  Twitch: <path fill="currentColor" d="M5 3h15v10l-4.5 4.5H12L9 20.5H7v-3H3V6.5Zm4 4v6m5-6v6" stroke="#fff" strokeWidth="1.6" />,
  Kick: <path fill="currentColor" d="M4 3h5v5h2V6h2V4h2V3h5v6h-2v2h-2v2h2v2h2v6h-5v-1h-2v-2h-2v-2H9v5H4Z" />,
};
export function Social({ p, className = "" }: { p: Platform; className?: string }) {
  return <span title={p} className={`grid place-items-center w-9 h-9 rounded-xl border border-line bg-white ${className}`}><svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-ink">{SOC[p]}</svg></span>;
}

/* ---------- primitives ---------- */
export function Img({ src, alt, className = "" }: { src: string; alt: string; className?: string; hint?: string }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div role="img" aria-label={alt} className={`bg-gradient-to-br from-violet-soft via-sky-soft to-lime-soft ${className}`} />;
  return <img src={"assets/" + src} alt={alt} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />;
}
type Tone = "neutral" | "signal" | "ok" | "warn" | "deep" | "bad" | "violet" | "sky" | "rose" | "mint" | "live";
export function Badge({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  const t: Record<Tone, string> = {
    neutral: "bg-paper text-muted", signal: "bg-lime text-ink", ok: "bg-mint-soft text-mint-ink", warn: "bg-[#fff1dc] text-warn", deep: "bg-ink text-white",
    bad: "bg-rose-soft text-bad", violet: "bg-violet-soft text-violet-ink", sky: "bg-sky-soft text-sky-ink", rose: "bg-rose-soft text-rose-ink", mint: "bg-mint-soft text-mint-ink", live: "bg-live text-white",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12.5px] font-medium whitespace-nowrap ${t[tone]} ${className}`}>{children}</span>;
}
export function Btn({ children, onClick, kind = "lime", className = "", type = "button", size = "md" }: { children: ReactNode; onClick?: () => void; kind?: "dark" | "lime" | "signal" | "ghost" | "light" | "violet"; className?: string; type?: "button" | "submit"; size?: "md" | "lg" }) {
  const k = {
    dark: "bg-ink text-white hover:bg-deep-2", lime: "bg-lime text-ink hover:brightness-95", signal: "bg-lime text-ink hover:brightness-95",
    ghost: "border border-ink text-ink hover:bg-ink hover:text-white", light: "bg-white text-ink border border-line hover:border-ink", violet: "bg-violet text-white hover:brightness-105",
  }[kind];
  const s = size === "lg" ? "px-6 py-3.5 text-[16px]" : "px-5 py-2.5 text-[15px]";
  return <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 rounded-2xl font-display font-medium transition ${s} ${k} ${className}`}>{children}</button>;
}
export const IconBtn = ({ n, label, onClick, dark }: { n: string; label: string; onClick?: () => void; dark?: boolean }) => (
  <button type="button" aria-label={label} onClick={onClick} className={`grid place-items-center w-11 h-11 rounded-2xl border transition ${dark ? "border-white/15 text-white hover:bg-white/10" : "border-line bg-white text-ink hover:border-ink"}`}><Icon n={n} /></button>
);
export const Stars = ({ v }: { v: number }) => <span className="inline-flex items-center gap-1 text-[13px] font-medium text-ink tnum"><span className="text-[#f5b301]">★</span>{v.toLocaleString("tr-TR")}</span>;
export function SectionHead({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
      <div>{eyebrow && <div className="text-[13px] text-muted mb-1">{eyebrow}</div>}
        <h2 className="font-display font-semibold text-[28px] md:text-[40px] leading-[1.05] tracking-tight">{title}</h2></div>
      {action}
    </div>
  );
}
export const Page = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`px-4 sm:px-8 lg:px-12 py-8 md:py-10 ${className}`}>{children}</div>;
export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => <div className={`bg-white rounded-card p-5 md:p-6 ${className}`}>{children}</div>;

/* ---------- cards ---------- */
const TYPE_TONE: Record<string, Tone> = { billboard: "violet", megalight: "sky", clp: "mint", "avm-led": "rose", "avm-stant": "warn", dijital: "sky", bina: "violet", arac: "rose" };
export function SpaceCard({ s }: { s: Space }) {
  const sl = seller(s.sellerId); const p = s.prices[0];
  return (
    <div className="group bg-white rounded-card p-4 grid grid-cols-[minmax(0,1fr)] gap-4 min-w-0 hover:shadow-[0_18px_40px_-24px_rgba(21,21,21,.35)] transition">
      <A to={"alan-" + s.id} className="relative block aspect-[4/3] rounded-img overflow-hidden">
        <Img src={s.img} alt={s.title} className="w-full h-full group-hover:scale-[1.03] transition duration-500" />
        {s.digital && <span className="absolute top-3 left-3"><Badge tone="live">● Dijital</Badge></span>}
        <span className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full bg-white/90 text-ink"><Icon n="arrow" className="w-4 h-4" /></span>
      </A>
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="min-w-0"><A to={"alan-" + s.id} className="flex items-center gap-1.5 font-display font-medium text-[17px] leading-snug"><span className="truncate">{s.title}</span>{sl.verified && <Verified className="w-4 h-4 shrink-0" />}</A>
          <div className="text-[13.5px] text-muted mt-0.5">{s.district}, {s.city}</div></div>
        <div className="text-right shrink-0"><div className="font-display font-semibold text-[17px] tnum">{kfmt(s.dailyViews)}</div><div className="text-[12px] text-muted">günlük göz</div></div>
      </div>
      <div className="h-px bg-line mx-1" />
      <div className="flex items-center justify-between px-1"><Badge tone={TYPE_TONE[s.type]}>{TYPE_LABEL[s.type]}</Badge><span className="text-[13px] text-muted">{p.unit} başına</span></div>
      <div className="flex items-center justify-between px-1"><span className="text-[14px] text-muted">Başlangıç fiyatı</span><span className="font-display font-semibold text-[22px] tnum">{tl(p.price)}</span></div>
      <div className="flex gap-2"><IconBtn n="mail" label="Mesaj gönder" /><IconBtn n="bookmark" label="Kaydet" /><A to={"alan-" + s.id} className="flex-1 grid place-items-center rounded-2xl bg-lime font-display font-medium text-[15px] hover:brightness-95">İncele & kirala</A></div>
    </div>
  );
}
export function InfluencerCard({ i }: { i: Influencer }) {
  const total = i.platforms.reduce((a, b) => a + b.followers, 0);
  const min = Math.min(...i.packages.map(p => p.price));
  return (
    <div className="group bg-white rounded-card p-4 grid grid-cols-[minmax(0,1fr)] gap-4 min-w-0 hover:shadow-[0_18px_40px_-24px_rgba(21,21,21,.35)] transition">
      <A to={"inf-" + i.id} className="block aspect-square rounded-img overflow-hidden"><Img src={i.img} alt={i.name} className="w-full h-full group-hover:scale-[1.03] transition duration-500" /></A>
      <div className="flex items-start justify-between gap-3 px-1">
        <div className="min-w-0"><A to={"inf-" + i.id} className="flex items-center gap-1.5 font-display font-medium text-[17px]"><span className="truncate">{i.name}</span>{i.verified === "Belge kontrol" && <Verified className="w-4 h-4 shrink-0" />}</A>
          <div className="text-[13.5px] text-muted mt-0.5">{i.city}</div></div>
        <div className="text-right shrink-0"><div className="font-display font-semibold text-[17px] tnum">{kfmt(total)}</div><div className="text-[12px] text-muted">takipçi</div></div>
      </div>
      <div className="h-px bg-line mx-1" />
      <div className="flex items-center justify-between gap-2 px-1"><div className="flex gap-1.5">{i.platforms.slice(0, 3).map(p => <Social key={p.p} p={p.p} />)}</div><span className={`rounded-full px-3 py-1 text-[12.5px] font-medium ${NICHE_TONE[i.niche] ?? "bg-paper"}`}>{i.niche}</span></div>
      <div className="flex items-center justify-between px-1"><span className="text-[14px] text-muted">Reklam fiyatı</span><span className="font-display font-semibold text-[22px] tnum">{tl(min)}</span></div>
      <div className="flex gap-2"><IconBtn n="mail" label="Mesaj gönder" /><IconBtn n="bookmark" label="Kaydet" /><A to={"inf-" + i.id} className="flex-1 grid place-items-center rounded-2xl bg-lime font-display font-medium text-[15px] hover:brightness-95">Teklif al</A></div>
    </div>
  );
}
export const findItem = (id: string) => SPACES.find(s => s.id === id) ?? INFLUENCERS.find(i => i.id === id);

export const PANO_M_PATH = "M14 48a34 34 0 0 1 34-34h24a34 34 0 0 1 34 34v56a4 4 0 0 1-4 4H88a4 4 0 0 1-4-4V74H71v30a4 4 0 0 1-4 4H53a4 4 0 0 1-4-4V74H36v30a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z";
export function LogoMark({ body = "#151515", screen = "#D6F45B", dot = "#FF5A1F", className = "w-10 h-10" }: { body?: string; screen?: string; dot?: string; className?: string }) {
  return <svg viewBox="0 0 120 120" className={className} aria-hidden="true"><path d={PANO_M_PATH} fill={body} /><rect x="26" y="27" width="68" height="34" rx="12" fill={screen} /><circle cx="82" cy="38" r="5" fill={dot} /></svg>;
}
