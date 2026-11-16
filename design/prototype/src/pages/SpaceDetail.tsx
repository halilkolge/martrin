import { useState } from "react";
import { SPACES, TYPE_LABEL, kfmt, seller, tl } from "../data";
import { A, Badge, Btn, Img, Page, SpaceCard, Stars, go, useCart } from "../ui";

const DOW = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];

export default function SpaceDetail({ id }: { id: string }) {
  const s = SPACES.find(x => x.id === id) ?? SPACES[0];
  const sl = seller(s.sellerId);
  const cart = useCart();
  const [unit, setUnit] = useState(0);
  const [start, setStart] = useState<number | null>(null);
  const [offer, setOffer] = useState(false);
  const [sent, setSent] = useState(false);
  const p = s.prices[unit];
  const len = ({ gün: 1, hafta: 7, "15 gün": 15, ay: 30, spot: 1, etkinlik: 1 } as const)[p.unit];
  const sel = (d: number) => start !== null && d >= start && d < start + len;
  const clash = start !== null && s.busy.some(b => b >= start && b < start + len);

  return (
    <Page>
      <div className="text-[14px] text-muted mb-4"><A to="alanlar" className="underline">Reklam alanları</A> / {s.city} / {TYPE_LABEL[s.type]}</div>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="grid gap-6 min-w-0">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden aspect-[16/8]">
            <Img src={s.img} alt={s.title} hint={s.type} className="col-span-3 row-span-2 w-full h-full" />
            <Img src={s.img} alt="Yakın çekim" hint={s.type} className="w-full h-full saturate-50" />
            <div className="relative"><Img src={s.img} alt="Gece görünümü" hint={s.type} className="w-full h-full brightness-50" /><span className="absolute inset-0 grid place-items-center text-white text-[13px] font-bold">+6 fotoğraf</span></div>
          </div>
          <div className="grid gap-3">
            <div className="flex gap-2 flex-wrap"><Badge tone="deep">{TYPE_LABEL[s.type]}</Badge>{s.tags.map(t => <Badge key={t}>{t}</Badge>)}{s.negotiable && <Badge tone="signal">Teklife açık</Badge>}</div>
            <h1 className="font-display font-semibold tracking-tight text-[30px] md:text-[38px] leading-tight text-balance">{s.title}</h1>
            <div className="text-muted">{s.address}</div>
          </div>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
            {[["Ölçü", s.size], ["Günlük gösterim", "≈ " + kfmt(s.dailyViews)], ["Aydınlatma", s.lit ? "Işıklı" : "Işıksız"], ["Baskı", s.printing]].map(([k, v]) => (
              <div key={k} className="bg-white p-4"><dt className="text-[12px] font-bold uppercase tracking-wider text-muted">{k}</dt><dd className="font-semibold mt-1">{v}</dd></div>
            ))}
          </dl>

          <section className="bg-white rounded-card p-5 grid gap-4">
            <div className="flex justify-between items-end flex-wrap gap-2"><h2 className="font-display font-medium text-[20px]">Müsaitlik · Aralık 2026</h2>
              <div className="flex gap-3 text-[13px] text-muted"><span className="flex items-center gap-1"><i className="w-3 h-3 bg-paper border border-line inline-block" /> Boş</span><span className="flex items-center gap-1"><i className="w-3 h-3 bg-[#e6e7e3] inline-block bg-[repeating-linear-gradient(45deg,#d2d4cf_0,#d2d4cf_2px,transparent_2px,transparent_5px)]" /> Dolu</span><span className="flex items-center gap-1"><i className="w-3 h-3 bg-signal inline-block" /> Seçimin</span></div></div>
            <div className="grid grid-cols-7 gap-1 text-center text-[13px]">
              {DOW.map(d => <div key={d} className="font-bold text-muted py-1">{d}</div>)}
              <div /> {/* 1 Aralık 2026 Salı */}
              {Array.from({ length: 31 }, (_, k) => k + 1).map(d => {
                const busy = s.busy.includes(d);
                return <button key={d} disabled={busy} onClick={() => setStart(d)} aria-pressed={sel(d)}
                  className={`tnum py-2 rounded ${busy ? "text-muted/60 bg-[repeating-linear-gradient(45deg,#e3e5e0_0,#e3e5e0_2px,transparent_2px,transparent_6px)] cursor-not-allowed line-through" : sel(d) ? "bg-signal font-bold" : "bg-paper hover:bg-signal-soft"}`}>{d}</button>;
              })}
            </div>
            {clash && <div className="text-[14px] text-bad font-semibold">Seçtiğin dönem dolu günlerle çakışıyor. Başka bir başlangıç günü seç ya da alan sahibine teklif gönder.</div>}
          </section>

          <section className="bg-white rounded-card p-5 grid gap-3">
            <h2 className="font-display font-medium text-[20px]">Yayın kanıtı ve güvence</h2>
            <ul className="grid gap-2 text-[15px]">
              <li>✓ Alan sahibi, yayın başladığında <b>konumlu ve tarih damgalı fotoğraf ile video</b> yükler.</li>
              <li>✓ Ödemen, sen kanıtı onaylayana kadar <b>emanette</b> bekler. Aylık işlerde ödeme haftalık aşamalarla serbest kalır.</li>
              <li>✓ İstersen <b>{tl(3500)}</b> karşılığında bağımsız saha denetimi ekleyebilirsin.</li>
            </ul>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit grid gap-4">
          <div className="bg-white rounded-card ring-2 ring-ink p-5 grid gap-4">
            <div className="flex gap-1 bg-paper rounded-2xl p-1 flex-wrap">{s.prices.map((pr, k) => <button key={pr.unit} onClick={() => setUnit(k)} className={`flex-1 px-2 py-1.5 rounded text-[14px] font-semibold ${unit === k ? "bg-ink text-white" : ""}`}>{pr.unit}</button>)}</div>
            <div className="tnum"><span className="font-display font-semibold tracking-tight text-[34px]">{tl(p.price)}</span><span className="text-muted"> / {p.unit}</span></div>
            <div className="text-[14px] text-muted">{start ? <>Başlangıç: <b className="text-ink">{start} Aralık</b>{len > 1 && <> · Bitiş: <b className="text-ink">{Math.min(start + len - 1, 31)} Aralık</b></>}</> : "Takvimden başlangıç günü seç"}</div>
            <Btn kind="signal" className="w-full" onClick={() => { cart.add({ id: s.id, kind: "space", option: `1 ${p.unit}${start ? ` · ${start} Aralık'tan` : ""}`, price: p.price }); go("sepet"); }}>{cart.has(s.id) ? "Sepette · Güncelle" : "Kampanya sepetine ekle"}</Btn>
            {s.negotiable && !offer && <Btn kind="ghost" className="w-full" onClick={() => setOffer(true)}>Teklif ver</Btn>}
            {offer && (sent ? <div className="text-[14px] bg-[#e3f3ea] text-ok rounded p-3 font-semibold">Teklifin alan sahibine iletildi. Cevabı mesajlarında göreceksin (demo).</div> :
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="grid gap-2">
                <label className="grid gap-1 text-[13px] font-bold">Teklifin (₺)<input id="offer" defaultValue={Math.round(p.price * 0.85)} className="border border-line rounded px-3 py-2 font-normal text-[16px] tnum" /></label>
                <label className="grid gap-1 text-[13px] font-bold">Not<textarea id="offer-note" defaultValue="3 aylık düzenli kiralama düşünüyoruz." className="border border-line rounded px-3 py-2 font-normal text-[15px]" /></label>
                <Btn type="submit" className="w-full">Teklifi gönder</Btn>
              </form>)}
            <div className="text-[12px] text-muted">Platform hizmet bedeli satıcının hakedişinden düşülür. Gördüğün fiyat ödeyeceğin fiyattır.</div>
          </div>
          <div className="bg-white rounded-card p-5 grid gap-2">
            <div className="text-[12px] font-bold uppercase tracking-wider text-muted">Alan sahibi</div>
            <div className="font-bold text-[17px]">{sl.name}</div>
            <div className="flex gap-2 flex-wrap items-center text-[14px]"><Badge>{sl.kind}</Badge>{sl.verified && <Badge tone="ok">✓ Doğrulanmış</Badge>}<Stars v={sl.rating} /><span className="text-muted tnum">{sl.deals} işlem</span></div>
            <Btn kind="light" className="mt-1">Mesaj gönder</Btn>
          </div>
        </aside>
      </div>
      <div className="mt-12"><h2 className="font-display font-semibold tracking-tight text-[24px] mb-4">Yakındaki diğer alanlar</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{SPACES.filter(x => x.id !== s.id && x.city === s.city).concat(SPACES.filter(x => x.city !== s.city)).slice(0, 4).map(x => <SpaceCard key={x.id} s={x} />)}</div></div>
    </Page>
  );
}
