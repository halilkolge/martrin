import { useState } from "react";
import { BRIEFS, tl } from "../data";
import { Badge, Btn, Page } from "../ui";

export default function Briefs() {
  const [mode, setMode] = useState<"Hepsi" | "İlan" | "Ters ihale">("Hepsi");
  const [open, setOpen] = useState<string | null>("r1");
  const [form, setForm] = useState(false);
  const list = BRIEFS.filter(b => mode === "Hepsi" || b.mode === mode);
  return (
    <Page>
      <div className="flex items-end justify-between gap-4 flex-wrap mb-6">
        <div><h1 className="font-display font-semibold tracking-tight text-[32px] md:text-[40px] leading-none">İlanlar & ihaleler</h1>
          <p className="text-muted mt-2 max-w-[60ch]">Markalar ihtiyacını yazar. Influencer'lar ve alan sahipleri başvurur ya da fiyat teklifi verir. Ters ihalede bütçe görünür, teklifler yarışır.</p></div>
        <Btn kind="signal" onClick={() => setForm(f => !f)}>{form ? "Formu kapat" : "+ İlan / ihale aç"}</Btn>
      </div>

      {form && (
        <form onSubmit={e => { e.preventDefault(); setForm(false); }} className="bg-white rounded-card ring-2 ring-ink p-5 grid md:grid-cols-2 gap-4 mb-6">
          <label className="grid gap-1 text-[13px] font-bold md:col-span-2">Başlık<input id="b-title" defaultValue="Bayram öncesi Anadolu'da 5 şehirde tanıtım" className="border border-line rounded px-3 py-2 font-normal text-[16px]" /></label>
          <label className="grid gap-1 text-[13px] font-bold">Tür<select id="b-mode" className="border border-line rounded px-3 py-2 font-normal"><option>Ters ihale (teklif topla)</option><option>İlan (başvuru al)</option></select></label>
          <label className="grid gap-1 text-[13px] font-bold">Bütçe aralığı<input id="b-budget" defaultValue="₺300.000 – ₺500.000" className="border border-line rounded px-3 py-2 font-normal" /></label>
          <fieldset className="grid gap-1 md:col-span-2"><legend className="text-[13px] font-bold mb-1">Kanallar</legend><div className="flex gap-3 flex-wrap text-[15px]">{["Instagram", "TikTok", "YouTube", "Billboard", "AVM Ekranı", "Durak / CLP", "Belediye noktaları"].map(c => <label key={c} className="flex items-center gap-1.5"><input id={"b-c-" + c} type="checkbox" defaultChecked={c === "Instagram" || c === "Billboard"} className="accent-deep" />{c}</label>)}</div></fieldset>
          <div className="md:col-span-2 flex justify-end"><Btn type="submit">Yayınla (demo)</Btn></div>
        </form>
      )}

      <div className="flex gap-2 mb-4">{(["Hepsi", "İlan", "Ters ihale"] as const).map(m => <button key={m} onClick={() => setMode(m)} className={`px-3 py-1.5 rounded text-[14px] font-semibold border ${mode === m ? "bg-ink text-white border-ink" : "bg-white border-line"}`}>{m}</button>)}</div>
      <div className="grid gap-3">
        {list.map(b => (
          <div key={b.id} className="bg-white rounded-card">
            <button onClick={() => setOpen(o => o === b.id ? null : b.id)} className="w-full text-left p-5 grid md:grid-cols-[1fr_auto] gap-3 items-center">
              <div className="grid gap-1.5 min-w-0">
                <div className="flex gap-2 flex-wrap"><Badge tone={b.mode === "Ters ihale" ? "signal" : "deep"}>{b.mode}</Badge>{b.channels.map(c => <Badge key={c}>{c}</Badge>)}</div>
                <div className="font-display font-medium text-[18px]">{b.title}</div>
                <div className="text-[14px] text-muted">{b.brand} · {b.city} · Son gün {b.deadline}</div>
              </div>
              <div className="grid justify-items-end gap-1 tnum"><span className="font-display font-semibold text-[18px]">{tl(b.budget[0])} – {tl(b.budget[1])}</span><span className="text-[13px] text-muted">{b.offers} teklif</span></div>
            </button>
            {open === b.id && (
              <div className="border-t border-line p-5 grid md:grid-cols-[1fr_320px] gap-5">
                <div className="grid gap-2">
                  <div className="text-[13px] font-bold text-muted">En iyi teklifler (marka görür)</div>
                  {[["Kordon Reklam", "4 megalight, 2 hafta", 92000], ["Deniz Aksoy (@denizsokakta)", "3 Reels + mağaza ziyareti", 61000], ["Kentpark AVM", "Hafta sonu stant + LED spot", 38000]].map(([n, d, p]) => (
                    <div key={n as string} className="flex justify-between gap-3 bg-paper rounded-2xl p-3 text-[15px]"><span><b>{n}</b><br /><span className="text-muted text-[14px]">{d}</span></span><span className="tnum font-bold">{tl(p as number)}</span></div>
                  ))}
                </div>
                <form onSubmit={e => e.preventDefault()} className="grid gap-2 bg-paper rounded-2xl p-4 h-fit">
                  <div className="font-bold">Teklif ver</div>
                  <label className="grid gap-1 text-[13px] font-bold">Fiyat (₺)<input id={"t-" + b.id} defaultValue={Math.round(b.budget[0] * 0.6)} className="border border-line rounded px-3 py-2 font-normal tnum bg-white" /></label>
                  <label className="grid gap-1 text-[13px] font-bold">Ne sunuyorsun?<textarea id={"td-" + b.id} defaultValue="İzmir'de 4 megalight + 2 influencer içeriği" className="border border-line rounded px-3 py-2 font-normal bg-white" /></label>
                  <Btn type="submit">Gönder (demo)</Btn>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </Page>
  );
}
