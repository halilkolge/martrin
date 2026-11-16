import { useState } from "react";
import { INFLUENCERS, NICHE_TONE, kfmt, tl } from "../data";
import { A, Btn, Img, InfluencerCard, Page, Social, Verified, go, useCart } from "../ui";

const REVIEWS = [
  { who: "Yöre Kahve Evleri", text: "Teslim tarihine tam uydu, içerik doğal ve samimiydi. Şube trafiğimiz ilk hafta belirgin arttı.", stars: 5 },
  { who: "Ege Organik Pazar", text: "Brief'i çok iyi anladı. Revize talebimizi aynı gün karşıladı.", stars: 5 },
  { who: "Atlas Elektronik", text: "Etkileşim beklentimizin üzerindeydi, tekrar çalışacağız.", stars: 4 },
];

export default function InfluencerDetail({ id }: { id: string }) {
  const i = INFLUENCERS.find(x => x.id === id) ?? INFLUENCERS[0];
  const cart = useCart();
  const [pk, setPk] = useState(0);
  const [custom, setCustom] = useState(false);
  const total = i.platforms.reduce((a, b) => a + b.followers, 0);
  return (
    <Page>
      <div className="text-[14px] text-muted mb-4"><A to="influencerlar" className="underline">Influencer'lar</A> / {i.niche}</div>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="grid gap-6 min-w-0">
          <div className="relative overflow-hidden rounded-card bg-ink min-h-[520px] md:min-h-[600px]">
            <Img src={i.img} alt={i.name} className="absolute inset-0 w-full h-full grayscale contrast-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-4 right-4 flex gap-2">{i.platforms.map(p => <Social key={p.p} p={p.p} className="bg-white/90 border-0" />)}</div>
            <div className="absolute left-4 right-4 bottom-4 md:left-6 md:bottom-6 md:right-auto md:w-[460px] rounded-[26px] bg-black/55 backdrop-blur-xl text-white p-6 grid gap-4">
              <div className="flex justify-between items-start gap-3"><h1 className="font-display font-semibold text-[40px] md:text-[48px] leading-[.95] tracking-tight">{i.name.split(" ")[0]}<br />{i.name.split(" ").slice(1).join(" ")}</h1><span className={`rounded-full px-3 py-1 text-[12.5px] font-medium ${NICHE_TONE[i.niche] ?? "bg-paper"}`}>{i.niche}</span></div>
              <div className="text-white/70 -mt-2">{i.handle} · {i.city}</div>
              <p className="text-[15px] text-white/90">{i.bio}</p>
              <div className="grid grid-cols-3 gap-2">{[[kfmt(total), "Takipçi"], [String(i.jobs), "Tamamlanan iş"], [i.rating.toLocaleString("tr-TR"), "Puan"]].map(([v, k]) => <div key={k}><div className="font-display font-semibold text-[26px] tnum">{v}</div><div className="text-[13px] text-white/60">{k}</div></div>)}</div>
              <div className="flex gap-2 flex-wrap text-[12.5px]">{i.verified === "Belge kontrol" && <span className="flex items-center gap-1 bg-white/15 rounded-full px-3 py-1"><Verified className="w-4 h-4" />İstatistikler kontrol edildi</span>}{i.exemption && <span className="bg-white/15 rounded-full px-3 py-1">İstisna hesabı tanımlı</span>}</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {i.platforms.map(p => (
              <div key={p.p} className="bg-white rounded-card p-4 grid gap-1">
                <div className="text-[13px] font-bold text-muted">{p.p}</div>
                <div className="font-display font-semibold tracking-tight text-[28px] tnum leading-none">{kfmt(p.followers)}</div>
                <div className="text-[13px] tnum">Etkileşim oranı <b>%{p.er.toLocaleString("tr-TR")}</b></div>
                <div className="h-1.5 bg-paper rounded overflow-hidden mt-1"><div className="h-full bg-signal" style={{ width: Math.min(100, p.er * 10) + "%" }} /></div>
              </div>
            ))}
          </div>

          <section className="grid gap-3">
            <h2 className="font-display font-medium text-[20px]">Örnek içerikler</h2>
            <div className="grid grid-cols-3 gap-2">{[0, 1, 2].map(k => <div key={k} className="relative aspect-[9/16] rounded-2xl overflow-hidden"><Img src={i.img} alt="İçerik örneği" hint="avm-led" className={`w-full h-full ${k === 1 ? "hue-rotate-15 saturate-150" : k === 2 ? "brightness-75" : ""}`} /><span className="absolute bottom-2 left-2 text-white text-[12px] font-bold bg-black/50 rounded px-1.5 py-0.5 tnum">▶ {kfmt(48000 + k * 91000)}</span></div>)}</div>
          </section>

          <section className="grid gap-3">
            <h2 className="font-display font-medium text-[20px]">Markaların yorumları</h2>
            {REVIEWS.map(r => <div key={r.who} className="bg-white rounded-card p-4"><div className="flex justify-between"><b>{r.who}</b><span className="text-signal tracking-tight">{"★".repeat(r.stars)}</span></div><p className="text-muted text-[15px] mt-1">{r.text}</p></div>)}
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit grid gap-4">
          <div className="bg-white rounded-card ring-2 ring-ink p-5 grid gap-3">
            <div className="font-display font-medium text-[18px]">Paketler</div>
            {i.packages.map((p, k) => (
              <label key={p.name} className={`grid gap-1 border rounded-2xl p-3 cursor-pointer ${pk === k ? "border-ink bg-signal-soft" : "border-line"}`}>
                <span className="flex justify-between gap-2 items-center"><span className="flex items-center gap-2 font-bold"><input id={"pk-" + k} type="radio" name="pk" checked={pk === k} onChange={() => setPk(k)} className="accent-deep" />{p.name}</span><span className="font-display font-semibold tnum">{tl(p.price)}</span></span>
                <span className="text-[14px] text-muted pl-6">{p.desc} · {p.days} günde teslim</span>
              </label>
            ))}
            <Btn kind="signal" className="w-full !bg-gradient-to-r from-[#a9d2ff] via-[#f6c37a] to-[#f39bb6]" onClick={() => { cart.add({ id: i.id, kind: "inf", option: i.packages[pk].name, price: i.packages[pk].price }); go("sepet"); }}>Kampanya sepetine ekle</Btn>
            {!custom ? <Btn kind="ghost" className="w-full" onClick={() => setCustom(true)}>Özel teklif iste</Btn> :
              <div className="text-[14px] bg-paper rounded-2xl p-3">Sohbet açıldı. {i.name.split(" ")[0]} kapsamı ve fiyatı sana özel bir teklif olarak gönderecek. Kabul edince sipariş otomatik oluşur (demo).</div>}
            <div className="text-[12px] text-muted">Her içerikte zorunlu "#reklam" ya da "#işbirliği" etiketi kontrol edilir.</div>
          </div>
          <div className="bg-white rounded-card p-5 text-[14px] grid gap-1.5">
            <b>Satış başına komisyon</b><span className="text-muted">Bu influencer'a özel indirim kodu tanımlayıp, kodla yapılan her satıştan pay da verebilirsin.</span><A to="ilanlar" className="font-bold underline">Performans kampanyası aç →</A>
          </div>
        </aside>
      </div>
      <div className="mt-12"><h2 className="font-display font-semibold tracking-tight text-[24px] mb-4">Benzer influencer'lar</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">{INFLUENCERS.filter(x => x.id !== i.id).map(x => <InfluencerCard key={x.id} i={x} />)}</div></div>
    </Page>
  );
}
