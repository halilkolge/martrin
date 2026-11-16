import React from "react";
import { useMemo, useState } from "react";
import { CITIES, INFLUENCERS, INFLUENCER_SKILLS, SPACES, TYPE_LABEL, tl, type Platform, type SpaceType } from "../data";
import { A, Icon, InfluencerCard, SpaceCard, go } from "../ui";

export const TR_PATH = "M3 22 L8 14 L15 12 L21 18 L27 16 L35 12 L45 9 L55 11 L63 9 L72 12 L82 10 L92 13 L98 22 L97 35 L92 44 L96 56 L88 60 L78 62 L68 62 L62 70 L56 64 L48 72 L38 76 L30 74 L22 70 L14 66 L8 58 L5 48 L8 40 L4 32 Z";

export function TurkeyMap({ pins, active, onPick }: { pins: { id: string; x: number; y: number; label: string }[]; active?: string; onPick?: (id: string) => void }) {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-auto" role="img" aria-label="Türkiye haritasında reklam alanları (temsili)">
      <rect x="0" y="0" width="100" height="80" fill="#e7f0f9" rx="4" />
      <path d={TR_PATH} fill="#ffffff" stroke="#bcd6ee" strokeWidth=".4" />
      {pins.map(p => (
        <g key={p.id} onClick={() => onPick?.(p.id)} className="cursor-pointer">
          <circle cx={p.x} cy={p.y} r={active === p.id ? 2.6 : 1.8} fill={active === p.id ? "#d6f45b" : "#151515"} stroke="#fff" strokeWidth=".5" />
          <title>{p.label}</title>
        </g>
      ))}
      <text x="97" y="77" textAnchor="end" fontSize="2.4" fill="#5d6370">Harita temsilidir</text>
    </svg>
  );
}

export default function Explore({ tab }: { tab: "alan" | "inf" }) {
  const [city, setCity] = useState("Tüm Türkiye");
  const [types, setTypes] = useState<SpaceType[]>([]);
  const [max, setMax] = useState(500000);
  const [digital, setDigital] = useState(false);
  const [hover, setHover] = useState<string>();
  const [plat, setPlat] = useState<Platform | "Hepsi">("Hepsi");
  const [minF, setMinF] = useState(5000);
  const [q, setQ] = useState("");
  const [gender, setGender] = useState("");
  const [niche, setNiche] = useState("");
  const [skill, setSkill] = useState("");
  const [sort, setSort] = useState("Popüler");
  const [showF, setShowF] = useState(false);
  const resetInf = () => { setQ(""); setGender(""); setCity("Tüm Türkiye"); setNiche(""); setSkill(""); setPlat("Hepsi"); setMinF(5000); };

  const spaces = useMemo(() => SPACES.filter(s => (city === "Tüm Türkiye" || s.city === city) && (!types.length || types.includes(s.type)) && s.prices[0].price <= max && (!digital || s.digital)), [city, types, max, digital]);
  const total = (i: (typeof INFLUENCERS)[number]) => i.platforms.reduce((a, b) => a + b.followers, 0);
  const infs = useMemo(() => {
    const t = q.trim().toLocaleLowerCase("tr-TR");
    const list = INFLUENCERS.filter(i => (!t || [i.name, i.handle, i.niche, i.city].some(x => x.toLocaleLowerCase("tr-TR").includes(t)))
      && (!gender || i.gender === gender) && (city === "Tüm Türkiye" || i.city === city) && (!niche || i.niche === niche)
      && (!skill || i.skills.includes(skill)) && (plat === "Hepsi" || i.platforms.some(p => p.p === plat)) && total(i) >= minF);
    const by: Record<string, (a: typeof list[number], b: typeof list[number]) => number> = {
      "Popüler": (a, b) => b.jobs - a.jobs, "Takipçi (çoktan aza)": (a, b) => total(b) - total(a), "Puan": (a, b) => b.rating - a.rating,
      "Fiyat (artan)": (a, b) => Math.min(...a.packages.map(p => p.price)) - Math.min(...b.packages.map(p => p.price)) };
    return [...list].sort(by[sort]);
  }, [q, gender, city, niche, skill, plat, minF, sort]);
  const activeCount = [q, gender, niche, skill].filter(Boolean).length + (city !== "Tüm Türkiye" ? 1 : 0) + (plat !== "Hepsi" ? 1 : 0) + (minF > 5000 ? 1 : 0);
  const toggle = (t: SpaceType) => setTypes(ts => ts.includes(t) ? ts.filter(x => x !== t) : [...ts, t]);

  const Box = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-white rounded-card p-6 grid gap-4"><div className="flex justify-between items-center"><b className="font-display font-medium text-[17px]">{title}</b><button type="button" className="text-[12.5px] bg-paper rounded-full px-3 py-1">Sıfırla</button></div>{children}</div>
  );
  const Check = ({ id, on, label, onChange }: { id: string; on: boolean; label: string; onChange: () => void }) => (
    <label htmlFor={id} className="flex items-center gap-3 text-[15px] cursor-pointer"><input id={id} type="checkbox" checked={on} onChange={onChange} className="peer sr-only" /><span className={`grid place-items-center w-5 h-5 rounded-md border-2 ${on ? "bg-ink border-ink text-white" : "border-ink/30"} peer-focus-visible:outline peer-focus-visible:outline-violet`}>{on && <Icon n="check" className="w-3.5 h-3.5" sw={3} />}</span>{label}</label>
  );
  const Sel = ({ id, icon, value, onChange, opts }: { id: string; icon: string; value: string; onChange: (v: string) => void; opts: string[] }) => (
    <label className="flex items-center gap-2.5 px-4 h-14 lg:border-l border-white/10 min-w-0"><Icon n={icon} className="w-5 h-5 text-white/70 shrink-0" /><select id={id} value={value} onChange={e => onChange(e.target.value)} className="bg-transparent text-white font-display text-[15px] outline-none min-w-0 [&>option]:text-ink">{opts.map(o => <option key={o}>{o}</option>)}</select></label>
  );
  const NICHES = [...new Set(INFLUENCERS.map(i => i.niche))];
  const CITY_OPTS = CITIES.filter(c => c === "Tüm Türkiye" || INFLUENCERS.some(i => i.city === c));
  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="grid gap-2 border-t border-line pt-4 first:border-0 first:pt-0"><span className="text-[12.5px] text-muted font-display">{label}</span>{children}</div>
  );
  const Chips = ({ value, onChange, opts }: { value: string; onChange: (v: string) => void; opts: [string, string][] }) => (
    <div className="flex flex-wrap gap-1.5">{opts.map(([v, l]) => <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)} className={`px-3 py-1.5 rounded-full text-[13.5px] font-display transition ${value === v ? "bg-ink text-white" : "bg-paper hover:bg-line"}`}>{l}</button>)}</div>
  );
  const Drop = ({ id, value, onChange, opts }: { id: string; value: string; onChange: (v: string) => void; opts: [string, string][] }) => (
    <span className="relative block"><select id={id} value={value} onChange={e => onChange(e.target.value)} className={`appearance-none w-full rounded-xl h-11 pl-3.5 pr-9 font-display text-[14.5px] outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-violet ${value ? "bg-lime" : "bg-paper"}`}>{opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
      <svg viewBox="0 0 24 24" className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6" /></svg></span>
  );
  if (tab === "inf") return (
    <>
      <div className="bg-ink px-4 sm:px-8 lg:px-12 py-7 border-t border-white/10">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div><div className="text-white/50 text-[14px] font-display">Keşfet</div><h1 className="font-display font-semibold text-white text-[36px] md:text-[48px] leading-none tracking-tight mt-1">İçerik üreticileri</h1></div>
          <form onSubmit={e => e.preventDefault()} className="flex items-center gap-2 w-full md:w-[460px]">
            <label htmlFor="f-q" className="flex-1 flex items-center gap-3 bg-white rounded-2xl h-[52px] px-4 min-w-0"><Icon n="search" className="w-5 h-5 text-ink/50" /><input id="f-q" value={q} onChange={e => setQ(e.target.value)} placeholder="İsim, kullanıcı adı ya da kategori ara" className="bg-transparent text-ink outline-none flex-1 min-w-0 placeholder:text-ink/40" /></label>
            <button className="grid place-items-center h-[52px] w-[52px] rounded-2xl bg-lime text-ink shrink-0" aria-label="Ara"><Icon n="search" className="w-5 h-5" sw={2.4} /></button>
          </form>
        </div>
      </div>
      <div className="px-4 sm:px-8 lg:px-12 py-8 grid lg:grid-cols-[280px_minmax(0,1fr)] gap-6 lg:gap-8 items-start">
        <aside className="lg:sticky lg:top-4 grid gap-3">
          <button type="button" onClick={() => setShowF(o => !o)} aria-expanded={showF} className="lg:hidden flex items-center justify-between bg-white rounded-2xl h-12 px-4 font-display font-medium"><span className="flex items-center gap-2"><Icon n="filter" className="w-5 h-5" />Filtreler{activeCount ? ` (${activeCount})` : ""}</span><svg viewBox="0 0 24 24" className={`w-4 h-4 transition ${showF ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m6 9 6 6 6-6" /></svg></button>
          <div className={`${showF ? "grid" : "hidden"} lg:grid bg-white rounded-card p-5 gap-4`}>
            <div className="flex items-center justify-between"><b className="font-display font-semibold text-[18px] flex items-center gap-2">Filtreler{activeCount > 0 && <span className="grid place-items-center min-w-6 h-6 px-1.5 rounded-full bg-lime text-[12px] tnum">{activeCount}</span>}</b>
              <button type="button" onClick={resetInf} disabled={!activeCount} className="text-[13px] font-display underline underline-offset-4 disabled:no-underline disabled:text-muted">Sıfırla</button></div>
            <Field label="Cinsiyet"><Chips value={gender} onChange={setGender} opts={[["", "Hepsi"], ["Kadın", "Kadın"], ["Erkek", "Erkek"]]} /></Field>
            <Field label="Şehir"><Drop id="f-city" value={city === "Tüm Türkiye" ? "" : city} onChange={v => setCity(v || "Tüm Türkiye")} opts={CITY_OPTS.map(c => [c === "Tüm Türkiye" ? "" : c, c])} /></Field>
            <Field label="Kategori"><Drop id="f-niche" value={niche} onChange={setNiche} opts={[["", "Tüm kategoriler"], ...NICHES.map(n => [n, n] as [string, string])]} /></Field>
            <Field label="İçerik türü"><Drop id="f-skill" value={skill} onChange={setSkill} opts={[["", "Tüm içerik türleri"], ...INFLUENCER_SKILLS.map(n => [n, n] as [string, string])]} /></Field>
            <Field label="Platform"><Chips value={plat === "Hepsi" ? "" : plat} onChange={v => setPlat((v || "Hepsi") as Platform)} opts={[["", "Hepsi"], ...(["Instagram", "TikTok", "YouTube", "X", "LinkedIn", "Twitch", "Kick"] as const).map(n => [n, n] as [string, string])]} /></Field>
            <Field label="En az takipçi"><Chips value={minF > 5000 ? String(minF) : ""} onChange={v => setMinF(+v || 5000)} opts={[["", "5 B"], ["50000", "50 B"], ["100000", "100 B"], ["250000", "250 B"], ["500000", "500 B"], ["1000000", "1 Mn"]]} /></Field>
          </div>
        </aside>
        <div className="grid gap-6 min-w-0 content-start">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="font-display text-[17px]"><b className="tnum">{infs.length}</b> içerik üreticisi bulundu</div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="inline-flex bg-white rounded-2xl p-1 text-[14px] font-display">
                <A to="alanlar" className="px-4 py-2 rounded-xl">Alanlar</A>
                <A to="influencerlar" className="px-4 py-2 rounded-xl bg-ink text-white">Influencer'lar</A>
              </div>
              <label htmlFor="f-sort" className="text-[15px] flex items-center gap-2">Sırala:<select id="f-sort" value={sort} onChange={e => setSort(e.target.value)} className="bg-white rounded-xl px-3 py-2 font-display outline-none">{["Popüler", "Takipçi (çoktan aza)", "Puan", "Fiyat (artan)"].map(o => <option key={o}>{o}</option>)}</select></label>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{infs.map(i => <InfluencerCard key={i.id} i={i} />)}</div>
          {infs.length === 0 && <div className="bg-white rounded-card p-10 grid gap-4 justify-items-center text-center"><b className="font-display text-[20px]">Bu filtrelere uyan içerik üreticisi yok</b><span className="text-muted">Birkaç filtreyi kaldır ya da hepsini sıfırla.</span><button type="button" onClick={resetInf} className="h-12 px-6 rounded-2xl bg-lime font-display font-medium">Filtreleri sıfırla</button></div>}
        </div>
      </div>
    </>
  );
  return (
    <>
      <div className="bg-ink px-4 sm:px-8 lg:px-12 pb-6 border-t border-white/10 pt-6">
        <form onSubmit={e => e.preventDefault()} className="grid lg:grid-cols-[minmax(0,1.4fr)_auto_repeat(2,minmax(0,1fr))_auto] gap-3 lg:gap-0 items-center">
          <label className="flex items-center gap-3 bg-deep-2 rounded-2xl h-14 px-4 border border-white/10"><Icon n="search" className="w-5 h-5 text-white/60" /><input id="f-q" defaultValue={tab === "alan" ? "İstanbul'da ışıklı billboard" : "Lifestyle içerik üreticisi"} className="bg-transparent text-white outline-none flex-1 min-w-0" /></label>
          <button className="h-14 px-7 rounded-2xl bg-lime text-ink font-display font-medium lg:ml-3 lg:mr-3">Bul</button>
          <Sel id="f-city" icon="pin" value={city} onChange={setCity} opts={CITIES} />
          {<Sel id="f-type1" icon="layers" value={types[0] ? TYPE_LABEL[types[0]] : "Tüm alan tipleri"} onChange={v => { const k = (Object.keys(TYPE_LABEL) as SpaceType[]).find(t => TYPE_LABEL[t] === v); setTypes(k ? [k] : []); }} opts={["Tüm alan tipleri", ...Object.values(TYPE_LABEL)]} />}
          <button type="button" className="h-14 px-6 rounded-2xl bg-lime text-ink font-display font-medium flex items-center gap-2 justify-center lg:ml-3"><Icon n="bookmark" className="w-5 h-5" />Aramayı kaydet</button>
        </form>
      </div>
      <div className="px-4 sm:px-8 lg:px-12 py-8 grid lg:grid-cols-[300px_1fr] gap-8">
        <aside className="grid gap-4 content-start">
          <div className="flex justify-between items-center px-1 h-12"><b className="font-display font-medium text-[22px]">Filtreler</b><Icon n="filter" className="w-6 h-6" /></div>
          {tab === "alan" ? <>
            <Box title="Alan tipi"><div className="grid gap-3">{(Object.keys(TYPE_LABEL) as SpaceType[]).map(t => <Check key={t} id={"f-t-" + t} on={types.includes(t)} onChange={() => toggle(t)} label={TYPE_LABEL[t]} />)}</div></Box>
            <Box title="Fiyat"><div className="flex justify-between text-[14px]"><span>Başlangıç fiyatı</span><span className="tnum font-medium">≤ {tl(max)}</span></div><input id="f-max" type="range" min={5000} max={500000} step={5000} value={max} onChange={e => setMax(+e.target.value)} className="accent-ink" /></Box>
            <Box title="Ekran"><Check id="f-dig" on={digital} onChange={() => setDigital(d => !d)} label="Sadece dijital ekranlar" /></Box>
          </> : <>
            <Box title="Takipçi"><div className="flex justify-between text-[14px]"><span>En az</span><span className="tnum font-medium">{minF.toLocaleString("tr-TR")}+</span></div><input id="f-min" type="range" min={5000} max={500000} step={5000} value={minF} onChange={e => setMinF(+e.target.value)} className="accent-ink" /></Box>
            <Box title="Doğrulama"><p className="text-[14px] text-muted">Katılım için en az 5.000 takipçi gerekir. İstatistikler şimdilik beyan ve ekran görüntüsüyle kontrol ediliyor.</p></Box>
          </>}
        </aside>
        <div className="grid gap-6 min-w-0 content-start">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h1 className="font-display font-medium text-[40px] md:text-[52px] leading-none tracking-tight">{tab === "alan" ? "Reklam alanları" : "İçerik üreticileri"}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="inline-flex bg-white rounded-2xl p-1 text-[14px] font-display">
                <A to="alanlar" className={`px-4 py-2 rounded-xl ${tab === "alan" ? "bg-ink text-white" : ""}`}>Alanlar</A>
                <A to="influencerlar" className={`px-4 py-2 rounded-xl `}>Influencer'lar</A>
              </div>
              <span className="text-[15px]">Sırala: <span className="text-muted">Popüler</span></span>
            </div>
          </div>
          {tab === "alan" && (
            <div className="grid md:grid-cols-[1fr_300px] gap-4 bg-white rounded-card p-4">
              <TurkeyMap pins={spaces.map(s => ({ id: s.id, x: s.x, y: s.y, label: s.title }))} active={hover} onPick={id => go("alan-" + id)} />
              <div className="grid gap-1 content-start p-2">
                <div className="text-[13px] text-muted mb-1">{spaces.length} alan haritada</div>
                {spaces.slice(0, 6).map(s => (
                  <A key={s.id} to={"alan-" + s.id} className={`text-[14px] rounded-xl px-3 py-2 flex justify-between gap-2 ${hover === s.id ? "bg-lime-soft" : "hover:bg-paper"}`}>
                    <span onMouseEnter={() => setHover(s.id)} className="truncate">{s.city} · {s.title}</span><span className="tnum shrink-0 text-muted">{tl(s.prices[0].price)}</span>
                  </A>
                ))}
              </div>
            </div>
          )}
          {tab === "alan"
            ? <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{spaces.map(s => <SpaceCard key={s.id} s={s} />)}</div>
            : <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">{infs.map(i => <InfluencerCard key={i.id} i={i} />)}</div>}
          {(tab === "alan" ? spaces.length : infs.length) === 0 && <div className="bg-white rounded-card p-10 text-center text-muted">Bu filtrelere uyan sonuç yok. Şehri "Tüm Türkiye" yap ya da filtreleri sıfırla.</div>}
        </div>
      </div>
    </>
  );
}
