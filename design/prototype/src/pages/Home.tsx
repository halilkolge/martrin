import { useState } from "react";
import { INFLUENCERS, SPACES, TYPE_LABEL } from "../data";
import { A, Badge, Btn, Icon, Img, InfluencerCard, LogoMark, SectionHead, SpaceCard, go } from "../ui";

const AV = ["v2/p1.jpg", "v2/p2.jpg", "v2/p4.jpg"];
const CHIPS = ["Hepsi", "Influencer", ...Object.values(TYPE_LABEL)];

function Sparkle({ className = "" }: { className?: string }) {
  return <svg viewBox="0 0 100 100" className={className} aria-hidden="true"><path d="M50 0C53 30 70 47 100 50 70 53 53 70 50 100 47 70 30 53 0 50 30 47 47 30 50 0Z" fill="currentColor" /></svg>;
}

export default function Home() {
  const [chip, setChip] = useState("Hepsi");
  const [q, setQ] = useState("");
  const search = () => go(chip === "Influencer" ? "influencerlar" : "alanlar");
  return (
    <>
      {/* HERO */}
      <section className="bg-ink text-white px-4 sm:px-8 lg:px-12 pt-6 pb-24 md:pb-28">
        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 items-stretch">
          <div className="grid gap-8 content-center">
            <h1 className="font-display font-semibold tracking-[-.035em] leading-[.98] text-[46px] sm:text-[68px] xl:text-[92px]">
              <span className="block">Göz <span className="inline-grid place-items-center align-middle w-[1.5em] h-[.78em] rounded-full border-[3px] border-lime text-lime mx-1 -translate-y-[.06em]"><Icon n="eye" className="w-[.42em] h-[.42em]" sw={2.4} /></span> neredeyse,</span>
              <span className="block"><span className="inline-flex align-middle -space-x-3 mr-3 -translate-y-[.05em]">{AV.map(a => <Img key={a} src={a} alt="" className="w-[.72em] h-[.72em] rounded-full border-[3px] border-ink" />)}</span>markan</span>
              <span className="block text-lime">orada.</span>
            </h1>
            <div className="-mt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 font-display text-[15px] sm:text-[21px] font-medium">
              <span className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/[.07] ring-1 ring-white/15 pl-1.5 pr-3.5 sm:pr-4 py-1.5"><Img src="v2/p6.jpg" alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />Influencer'dan</span>
              <span className="hidden sm:flex items-center text-lime" aria-hidden="true"><i className="block w-6 sm:w-10 h-[2px] bg-gradient-to-r from-white/20 to-lime rounded-full" /><Icon n="right" className="w-5 h-5 -ml-1.5" sw={2.4} /></span>
              <span className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-white/[.07] ring-1 ring-white/15 pl-1.5 pr-3.5 sm:pr-4 py-1.5"><span className="grid place-items-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-violet"><LogoMark body="#ffffff" className="w-5 h-5 sm:w-6 sm:h-6" /></span>billboarda</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-lime text-ink pl-2 pr-5 py-1.5 font-semibold shadow-[0_0_40px_-6px_rgba(214,244,91,.55)]"><span className="grid place-items-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ink text-lime"><Icon n="cart" className="w-5 h-5" /></span><span><span className="tnum">81</span> ilde tek sepet</span></span>
            </div>
            <form onSubmit={e => { e.preventDefault(); search(); }} className="grid gap-4 max-w-[720px]">
              <div className="flex items-center gap-3 bg-deep-2 rounded-[22px] p-2 pl-5">
                <Icon n="search" className="w-5 h-5 text-white/50" />
                <input id="h-q" value={q} onChange={e => setQ(e.target.value)} placeholder="İstanbul'da AVM ekranı, Ankara'da teknoloji influencer'ı…" className="flex-1 min-w-0 bg-transparent outline-none text-[17px] placeholder:text-white/40" />
                <Icon n="mic" className="w-5 h-5 text-white/60 hidden sm:block" />
                <button type="submit" aria-label="Ara" className="grid place-items-center w-12 h-12 rounded-2xl bg-lime text-ink"><Icon n="search" sw={2.2} /></button>
              </div>
              <div className="flex gap-2 flex-wrap">{CHIPS.slice(0, 7).map(c => <button key={c} type="button" onClick={() => setChip(c)} className={`px-4 py-2 rounded-full text-[14px] border transition ${chip === c ? "bg-white text-ink border-white" : "border-white/20 text-white/80 hover:border-white/50"}`}>{c}</button>)}</div>
            </form>
          </div>

          <div className="grid gap-4 grid-rows-[1fr_auto] min-h-[420px]">
            <div className="relative rounded-[28px] overflow-hidden bg-sky min-h-[300px]">
              <Img src="v2/hero.jpg" alt="Gökyüzüne kaldırılmış telefon ve billboard" className="absolute inset-0 w-full h-full" />
              <div className="absolute left-4 top-5 grid gap-3 max-w-[78%]">
                <div className="floaty bg-white text-ink rounded-[18px] rounded-tl-md px-4 py-2.5 text-[14px] shadow-lg w-fit">Merhaba! Sahil yolu billboard'unuz 7 Aralık'ta boş mu? 👋<span className="block text-[11px] text-muted text-right mt-0.5">14:02</span></div>
                <div className="floaty [animation-delay:1.2s] bg-white text-ink rounded-[18px] rounded-tl-md px-3 py-2 shadow-lg w-fit flex items-center gap-3"><span className="grid place-items-center w-8 h-8 rounded-full bg-sky text-white"><Icon n="play" className="w-4 h-4" /></span><span className="flex items-end gap-[3px] h-5">{[6, 12, 8, 16, 10, 18, 7, 13, 9, 15, 6, 11].map((h, k) => <i key={k} className="w-[3px] rounded bg-ink/70" style={{ height: h }} />)}</span><Img src="v2/p3.jpg" alt="" className="w-7 h-7 rounded-full" /></div>
                <div className="floaty [animation-delay:.6s] ml-10 bg-lime text-ink rounded-[18px] rounded-tr-md px-4 py-2.5 text-[14px] shadow-lg w-fit font-medium">Evet! ₺72.000'e anlaşalım, kanıtı 19:00'da yüklerim 👍</div>
              </div>
            </div>
            <button type="button" onClick={() => document.getElementById("nasil-calisiyor")?.scrollIntoView({ behavior: "smooth", block: "start" })} className="relative overflow-hidden rounded-[28px] bg-lime text-ink p-6 grid grid-cols-[auto_1fr_auto] gap-5 items-center text-left w-full hover:brightness-95 transition">
              <span className="grid place-items-center w-14 h-14 rounded-full bg-ink text-white"><Icon n="play" /></span>
              <span className="font-display font-semibold text-[26px] leading-[1.05] tracking-tight relative z-10">Nasıl<br />çalışıyor?</span>
              <Icon n="arrow" className="w-10 h-10 relative z-10" sw={2} />
              <span className="absolute -right-10 -top-16 w-48 h-48 rounded-full border-2 border-ink/80" /><span className="absolute right-16 -bottom-24 w-48 h-48 rounded-full border-2 border-ink/80" />
            </button>
          </div>
        </div>
      </section>

      {/* OVERLAP ROW */}
      <section className="relative -mt-14 bg-paper rounded-t-[36px] px-4 sm:px-8 lg:px-12 pt-6">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <InfluencerCard i={INFLUENCERS[1]} />
          <SpaceCard s={SPACES[1]} />
          <A to="alanlar" className="relative overflow-hidden rounded-card bg-violet text-white p-8 grid content-between min-h-[460px]">
            <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-white/15"><Icon n="right" className="w-7 h-7" /></span>
            <div className="text-center"><div className="font-display font-semibold text-[48px] leading-none tracking-tight">Tümünü gör</div><div className="font-display text-[20px] text-white/70 mt-2 tnum">1.284 alan · 8.450 içerik üreticisi</div></div>
            <div className="relative h-36">
              <Sparkle className="absolute left-0 bottom-0 w-24 h-24 text-lime" />
              <Img src="v2/p4.jpg" alt="" className="absolute right-6 top-0 w-28 h-28 rounded-full border-4 border-violet" />
              <Img src="v2/p7.jpg" alt="" className="absolute right-32 top-16 w-14 h-14 rounded-full border-4 border-violet" />
              <Img src="v2/p2.jpg" alt="" className="absolute right-20 bottom-0 w-16 h-16 rounded-full border-4 border-violet" />
            </div>
          </A>
          <InfluencerCard i={INFLUENCERS[7]} />
        </div>
      </section>

      {/* HOW IT WORKS — editorial */}
      <section id="nasil-calisiyor" className="px-4 sm:px-8 lg:px-12 py-16 md:py-24 scroll-mt-4">
        <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
          <h2 className="font-display font-medium text-[34px] md:text-[54px] leading-[1.15] tracking-tight max-w-[18ch]">
            <span className="pill-word">Planla.</span> <span className="pill-word">Öde.</span> <span className="inline-grid place-items-center align-middle w-[1.1em] h-[1.1em] rounded-full bg-sky text-white"><Icon n="right" className="w-[.5em] h-[.5em]" sw={2.4} /></span><br />
            <span className="pill-word">Yayınla.</span> <span className="pill-word">Kanıtla.</span>
          </h2>
          <div className="grid gap-2 text-[16px] max-w-[42ch]">
            <span className="flex gap-2 items-center"><i className="w-2.5 h-2.5 rounded-full bg-ink" />Influencer ve fiziksel alan aynı kampanyada</span>
            <span className="flex gap-2 items-center"><Icon n="shield" className="w-4 h-4" />Paran yayın kanıtına kadar emanette</span>
            <span className="flex gap-2 items-center"><Icon n="camera" className="w-4 h-4" />Konumlu fotoğraf + video ile doğrulama</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: "01/", t: "Keşfet & planla", tag: "81 il · 8 alan tipi", img: "v2/c1.jpg", blob: "blob-1", bg: "from-sky to-sky-soft", to: "alanlar" },
            { n: "02/", t: "Emanetle öde", tag: "aşamalı serbest bırakma", img: "v2/c2.jpg", blob: "blob-2", bg: "from-lime-soft to-[#e9f2d9]", to: "sepet" },
            { n: "03/", t: "Yayınla & kanıtla", tag: "fotoğraf · video · saha", img: "v2/c3.jpg", blob: "blob-3", bg: "from-violet-soft to-sky-soft", to: "panel-reklamveren" },
          ].map(c => (
            <A key={c.n} to={c.to} className={`group relative overflow-hidden rounded-card bg-gradient-to-br ${c.bg} aspect-[4/5] p-5 grid content-between`}>
              <Img src={c.img} alt={c.t} className={`absolute inset-[12%] ${c.blob} group-hover:scale-105 transition duration-700`} />
              <div className="relative flex justify-between items-start"><span className="bg-white rounded-full px-4 py-1.5 text-[13px]">{c.tag}</span><span className="grid place-items-center w-11 h-11 rounded-full bg-white"><Icon n="arrow" className="w-5 h-5" /></span></div>
              <div className="relative grid gap-4 justify-items-start"><span className="font-display font-semibold text-white text-[30px] leading-[1.05] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,.35)]">{c.n} {c.t}</span><span className="bg-white rounded-full pl-5 pr-4 py-2 text-[14px] flex items-center gap-3">İncele <i className="w-2 h-2 rounded-full bg-sky" /></span></div>
            </A>
          ))}
        </div>
      </section>

      {/* LIVE NOW — dark band */}
      <section className="mx-2 sm:mx-6 lg:mx-8 rounded-[32px] bg-ink text-white px-4 sm:px-8 py-10">
        <div className="flex items-end justify-between gap-4 flex-wrap mb-6"><h2 className="font-display font-medium text-[22px]">Şu an <span className="text-white/50">yayında</span></h2><A to="panel-reklamveren" className="text-[14px] text-white/70 hover:text-white">Tüm kampanyalar →</A></div>
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {["v2/p1.jpg", "v2/p2.jpg", "v2/p3.jpg", "v2/p4.jpg", "v2/p5.jpg", "v2/p6.jpg", "v2/p7.jpg", "v2/p8.jpg"].map((a, k) => (
            <span key={a} className="relative shrink-0"><Img src={a} alt="" className="w-[72px] h-[72px] rounded-[22px]" />{k < 5 && <i className="absolute right-0 bottom-0 w-4 h-4 rounded-full bg-[#3ccf6e] border-[3px] border-ink" />}</span>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "Kış indirimi", who: "Yöre Kahve", img: "hero-billboard.jpg", v: "185 B", ch: "Billboard + 2 influencer" },
            { t: "Ankara lansman", who: "Atlas Elektronik", img: "v2/c4.jpg", v: "310 B", ch: "CLP + megalight" },
            { t: "Kapadokya rotası", who: "Vadi Turizm", img: "v2/c5.jpg", v: "236 B", ch: "Seyahat içerikçisi" },
            { t: "AVM hafta sonu", who: "Moda Sokağı", img: "v2/c3.jpg", v: "62 B", ch: "LED + stant" },
          ].map(c => (
            <div key={c.t} className="relative overflow-hidden rounded-[26px] aspect-[3/4] bg-deep-2">
              <Img src={c.img} alt={c.t} className="absolute inset-0 w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
              <div className="absolute top-3 left-3 right-3 flex items-center gap-2 bg-black/35 backdrop-blur-md rounded-full p-1.5 pr-3"><span className="grid place-items-center w-8 h-8 rounded-full bg-lime text-ink font-display font-semibold text-[12px]">{c.who.slice(0, 2)}</span><span className="text-[13px] leading-tight">{c.who}<span className="block text-[10.5px] text-white/60 uppercase tracking-wide">{c.ch}</span></span></div>
              <div className="absolute left-4 right-4 bottom-4 grid gap-3">
                <span className="font-display font-extrabold uppercase text-[28px] leading-[.95] tracking-tight">{c.t}</span>
                <span className="flex items-center gap-3 text-[13px]"><Badge tone="live">YAYINDA</Badge><span className="text-white/70">● 2 gün</span><span className="flex items-center gap-1 text-white/90"><Icon n="eye" className="w-4 h-4" />{c.v}/gün</span></span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-4 sm:px-8 lg:px-12 pt-16">
        <SectionHead eyebrow="Bu hafta öne çıkan" title="Fiziksel reklam alanları" action={<Btn kind="light" onClick={() => go("alanlar")}>Tümü <Icon n="right" className="w-4 h-4" /></Btn>} />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">{SPACES.slice(2, 6).map(s => <SpaceCard key={s.id} s={s} />)}</div>
      </section>
      <section className="px-4 sm:px-8 lg:px-12 pt-16">
        <SectionHead eyebrow="5.000+ takipçi · 7 platform" title="İçerik üreticileri" action={<Btn kind="light" onClick={() => go("influencerlar")}>Tümü <Icon n="right" className="w-4 h-4" /></Btn>} />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">{[0, 2, 6, 5].map(k => <InfluencerCard key={k} i={INFLUENCERS[k]} />)}</div>
      </section>

      {/* SELLER CTA */}
      <section className="px-4 sm:px-8 lg:px-12 pt-16">
        <div className="relative overflow-hidden rounded-[32px] bg-lime grid md:grid-cols-[1.2fr_1fr]">
          <div className="p-8 md:p-12 grid gap-5 content-center relative z-10">
            <Badge tone="deep" className="w-fit">AVM · açık hava şirketi · belediye</Badge>
            <h2 className="font-display font-semibold text-[36px] md:text-[52px] leading-[1.02] tracking-tight">Boş panon,<br />boş ekranın<br />satılmayı bekliyor.</h2>
            <p className="text-[17px] max-w-[46ch]">Alanını ücretsiz listele. Takvimini yönet, teklifleri kabul et, kanıtı yükle, paranı al.</p>
            <div className="flex gap-3 flex-wrap"><Btn kind="dark" size="lg" onClick={() => go("panel-satici")}>Alanını listele</Btn><Btn kind="ghost" size="lg" onClick={() => go("panel-satici")}>Influencer olarak katıl</Btn></div>
          </div>
          <div className="relative min-h-[320px]"><Img src="v2/c4.jpg" alt="Durakta ışıklı pano" className="absolute inset-6 md:inset-8 blob-2" /><Sparkle className="absolute left-2 bottom-6 w-16 h-16 text-violet" /></div>
        </div>
      </section>
    </>
  );
}
