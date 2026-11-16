import { useMemo, useState } from "react";
import { tl } from "../data";
import { A, Icon, Page } from "../ui";

type Entry = { id: number; date: string; kind: "Gelir" | "Gider"; src: "Martrin" | "Dışarıdan"; title: string; cat: string; amount: number; status: "Tahsil edildi" | "Bekliyor" | "Emanette"; note?: string };

const E0: Entry[] = [
  { id: 1, date: "2026-11-02", kind: "Gelir", src: "Martrin", title: "Yöre Kahve Evleri · Reels + 3 Story", cat: "Kampanya", amount: 44200, status: "Emanette", note: "₺52.000 − %15 komisyon" },
  { id: 2, date: "2026-10-28", kind: "Gelir", src: "Dışarıdan", title: "Mutfak robotu markasıyla doğrudan anlaşma", cat: "Marka iş birliği", amount: 35000, status: "Bekliyor" },
  { id: 3, date: "2026-10-24", kind: "Gelir", src: "Martrin", title: "Vadi Kaynak Su · 1 Reels", cat: "Kampanya", amount: 32300, status: "Tahsil edildi", note: "₺38.000 − %15 komisyon" },
  { id: 4, date: "2026-10-20", kind: "Gider", src: "Dışarıdan", title: "Video kurgu ücreti · Can Öztürk", cat: "Ekip", amount: 9000, status: "Tahsil edildi" },
  { id: 5, date: "2026-10-15", kind: "Gelir", src: "Dışarıdan", title: "YouTube reklam geliri · Ekim", cat: "Platform geliri", amount: 12850, status: "Tahsil edildi" },
  { id: 6, date: "2026-10-09", kind: "Gelir", src: "Martrin", title: "Atlas Elektronik · YouTube entegrasyon", cat: "Kampanya", amount: 54400, status: "Tahsil edildi", note: "₺64.000 − %15 komisyon" },
  { id: 7, date: "2026-10-05", kind: "Gider", src: "Dışarıdan", title: "Işık seti ve mikrofon", cat: "Ekipman", amount: 14600, status: "Tahsil edildi" },
  { id: 8, date: "2026-09-27", kind: "Gelir", src: "Dışarıdan", title: "Gastronomi festivali sunuculuğu", cat: "Etkinlik", amount: 25000, status: "Tahsil edildi" },
];
const MONTHS = [["Haz", 61, 22, 15], ["Tem", 74, 18, 12], ["Ağu", 58, 31, 19], ["Eyl", 92, 25, 16], ["Eki", 87, 48, 24], ["Kas", 44, 35, 0]] as const; // bin ₺: martrin, dışarıdan, gider
const FILTERS = ["Tümü", "Martrin", "Dışarıdan", "Giderler"] as const;
const CATS = { Gelir: ["Marka iş birliği", "Platform geliri", "Etkinlik", "Danışmanlık", "Diğer"], Gider: ["Ekip", "Ekipman", "Prodüksiyon", "Yazılım", "Muhasebe", "Diğer"] };

export default function Ledger() {
  const [rows, setRows] = useState(E0);
  const [f, setF] = useState<(typeof FILTERS)[number]>("Tümü");
  const [form, setForm] = useState({ kind: "Gelir" as Entry["kind"], title: "", cat: "Marka iş birliği", amount: "", date: "2026-11-04", status: "Tahsil edildi" as Entry["status"] });
  const [saved, setSaved] = useState(false);
  const list = rows.filter(r => f === "Tümü" || (f === "Giderler" ? r.kind === "Gider" : r.kind === "Gelir" && r.src === f)).sort((a, b) => b.date.localeCompare(a.date));
  const sum = useMemo(() => {
    const g = rows.filter(r => r.kind === "Gelir"), m = g.filter(r => r.src === "Martrin").reduce((a, r) => a + r.amount, 0), d = g.filter(r => r.src === "Dışarıdan").reduce((a, r) => a + r.amount, 0), x = rows.filter(r => r.kind === "Gider").reduce((a, r) => a + r.amount, 0);
    return { m, d, x, net: m + d - x, wait: rows.filter(r => r.kind === "Gelir" && r.status !== "Tahsil edildi").reduce((a, r) => a + r.amount, 0) };
  }, [rows]);
  const add = (e: React.FormEvent) => {
    e.preventDefault(); const amount = Number(String(form.amount).replace(/\D/g, "")); if (!form.title || !amount) return;
    setRows(r => [{ id: Date.now(), date: form.date, kind: form.kind, src: "Dışarıdan", title: form.title, cat: form.cat, amount, status: form.status }, ...r]);
    setForm({ ...form, title: "", amount: "" }); setSaved(true); setTimeout(() => setSaved(false), 2200);
  };
  const max = 140, H = 180, bw = 18;
  const d = (s: string) => new Date(s + "T12:00:00").toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
  return (
    <Page>
      <div className="flex justify-between items-end flex-wrap gap-4 mb-6">
        <div><A to="panel-satici" className="text-[14px] text-muted">← Satıcı paneli</A><h1 className="font-display font-semibold tracking-tight text-[34px] md:text-[44px] leading-none mt-1">Kazanç defteri</h1>
          <p className="text-muted mt-2 max-w-[62ch]">Martrin'deki işlerin kendiliğinden düşer. Dışarıdan kazandıklarını ve giderlerini elle ekle, bütün tabloyu tek yerde gör.</p></div>
        <div className="flex gap-2"><span className="bg-white rounded-2xl px-4 py-2.5 font-display text-[15px]">2026 · Son 6 ay</span><button className="bg-ink text-white rounded-2xl px-4 py-2.5 font-display text-[15px] flex items-center gap-2"><Icon n="arrow" className="w-4 h-4 rotate-90" />Excel'e aktar</button></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {[["Martrin'den", sum.m, "bg-lime"], ["Dışarıdan", sum.d, "bg-violet text-white"], ["Giderler", sum.x, "bg-white"], ["Net kazanç", sum.net, "bg-ink text-white"], ["Tahsil bekleyen", sum.wait, "bg-white"]].map(([k, v, c]) => (
          <div key={k as string} className={`rounded-card p-5 ${c} ${k === "Net kazanç" ? "col-span-2 lg:col-span-1" : ""}`}><div className="text-[14px] opacity-70 font-display">{k}</div><div className="font-display font-semibold tracking-tight text-[26px] tnum mt-1">{k === "Giderler" ? "−" : ""}{tl(v as number)}</div></div>
        ))}
      </div>

      <div className="grid xl:grid-cols-[1fr_380px] gap-6">
        <div className="grid gap-6 min-w-0">
          <section className="bg-white rounded-card p-5 md:p-6 grid gap-3">
            <div className="flex justify-between items-center flex-wrap gap-2"><h2 className="font-display font-semibold text-[22px]">Aylık gelir</h2>
              <div className="flex gap-4 text-[13px] font-display"><span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-lime" />Martrin</span><span className="flex items-center gap-1.5"><i className="w-3 h-3 rounded bg-violet" />Dışarıdan</span><span className="flex items-center gap-1.5"><i className="w-3 h-[3px] rounded bg-ink" />Gider</span></div></div>
            <div className="overflow-x-auto"><svg viewBox={`0 0 560 ${H + 34}`} className="w-full min-w-[460px] h-auto" role="img" aria-label="Aylık gelir grafiği">
              {[0, 50, 100].map(t => { const y = 10 + H - t / max * H; return <g key={t}><line x1="40" x2="556" y1={y} y2={y} stroke="#e6e7e2" /><text x="34" y={y + 4} textAnchor="end" fontSize="11" fill="#76797d">₺{t}B</text></g>; })}
              {MONTHS.map(([m, a, b], i) => { const x = 70 + i * 84; const ya = a / max * H, yb = b / max * H; return <g key={m}>
                <rect x={x} y={10 + H - ya} width={bw} height={ya} rx="5" fill="#d6f45b" /><rect x={x + bw + 4} y={10 + H - yb} width={bw} height={yb} rx="5" fill="#a77bff" />
                <text x={x + bw + 2} y={H + 30} textAnchor="middle" fontSize="12" fill="#151515" fontFamily="Poppins">{m}</text></g>; })}
              <polyline fill="none" stroke="#151515" strokeWidth="2.5" strokeLinejoin="round" points={MONTHS.filter(m => m[3]).map(([, , , g], i) => `${70 + i * 84 + bw + 2},${10 + H - g / max * H}`).join(" ")} />
            </svg></div>
            <p className="text-[13px] text-muted">Kasım ayı devam ediyor. Martrin tutarları komisyon düşülmüş net hakedişlerdir.</p>
          </section>

          <section className="bg-white rounded-card p-5 md:p-6 grid gap-3 min-w-0">
            <div className="flex justify-between items-center flex-wrap gap-3"><h2 className="font-display font-semibold text-[22px]">Hareketler</h2>
              <div className="flex gap-1.5 flex-wrap">{FILTERS.map(x => <button key={x} onClick={() => setF(x)} className={`px-3.5 py-1.5 rounded-xl font-display text-[14px] ${f === x ? "bg-ink text-white" : "bg-paper"}`}>{x}</button>)}</div></div>
            {list.map(r => (
              <div key={r.id} className="grid grid-cols-[44px_1fr_auto] gap-3 items-center border-t border-line pt-3">
                <span className={`grid place-items-center w-11 h-11 rounded-2xl ${r.kind === "Gider" ? "bg-rose-soft text-rose-ink" : r.src === "Martrin" ? "bg-lime" : "bg-violet-soft text-violet-ink"}`}>{r.src === "Martrin" && r.kind === "Gelir" ? <svg viewBox="0 0 120 120" className="w-6 h-6"><path d="M14 48a34 34 0 0 1 34-34h24a34 34 0 0 1 34 34v56a4 4 0 0 1-4 4H88a4 4 0 0 1-4-4V74H71v30a4 4 0 0 1-4 4H53a4 4 0 0 1-4-4V74H36v30a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="#151515" /></svg> : <Icon n={r.kind === "Gider" ? "cart" : "arrow"} className="w-5 h-5" />}</span>
                <span className="min-w-0"><b className="font-display font-medium block truncate">{r.title}</b>
                  <span className="text-[13px] text-muted flex flex-wrap gap-x-2">{d(r.date)} · {r.cat} · {r.src === "Martrin" ? "Martrin (otomatik)" : "Elle eklendi"}{r.note && <span>· {r.note}</span>}</span></span>
                <span className="text-right"><b className={`font-display tnum text-[17px] ${r.kind === "Gider" ? "text-rose-ink" : ""}`}>{r.kind === "Gider" ? "−" : "+"}{tl(r.amount)}</b>
                  <span className={`block text-[12px] font-display ${r.status === "Tahsil edildi" ? "text-mint-ink" : r.status === "Emanette" ? "text-sky-ink" : "text-warn"}`}>{r.status}</span></span>
              </div>
            ))}
          </section>
        </div>

        <aside className="grid gap-6 content-start">
          <form onSubmit={add} className="bg-ink text-white rounded-card p-6 grid gap-3">
            <b className="font-display font-semibold text-[20px]">Elle kayıt ekle</b>
            <div className="grid grid-cols-2 bg-white/10 rounded-2xl p-1 font-display text-[15px]">
              {(["Gelir", "Gider"] as const).map(k => <button type="button" key={k} onClick={() => setForm({ ...form, kind: k, cat: CATS[k][0] })} className={`py-2 rounded-xl ${form.kind === k ? "bg-lime text-ink" : ""}`}>{k}</button>)}
            </div>
            <label htmlFor="l-t" className="grid gap-1 text-[13px] text-white/60">Açıklama<input id="l-t" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder={form.kind === "Gelir" ? "Örn. Doğrudan marka anlaşması" : "Örn. Kamera lensi"} className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] outline-none placeholder:text-white/30" /></label>
            <div className="grid grid-cols-2 gap-3">
              <label htmlFor="l-a" className="grid gap-1 text-[13px] text-white/60">Tutar (₺)<input id="l-a" inputMode="numeric" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0" className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] outline-none tnum placeholder:text-white/30" /></label>
              <label htmlFor="l-d" className="grid gap-1 text-[13px] text-white/60">Tarih<input id="l-d" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] outline-none [color-scheme:dark]" /></label>
            </div>
            <label htmlFor="l-c" className="grid gap-1 text-[13px] text-white/60">Kategori<select id="l-c" value={form.cat} onChange={e => setForm({ ...form, cat: e.target.value })} className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] [&>option]:text-ink">{CATS[form.kind].map(c => <option key={c}>{c}</option>)}</select></label>
            <label htmlFor="l-s" className="grid gap-1 text-[13px] text-white/60">Durum<select id="l-s" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Entry["status"] })} className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] [&>option]:text-ink"><option>Tahsil edildi</option><option>Bekliyor</option></select></label>
            <button className="h-12 rounded-2xl bg-lime text-ink font-display font-medium mt-1">{saved ? "Kaydedildi ✓" : "Kaydı ekle"}</button>
            <p className="text-[12.5px] text-white/50">Fatura ya da dekont fotoğrafını da ekleyebilirsin. Kayıtlar yalnızca sana ve yetki verdiğin muhasebeciye görünür.</p>
          </form>
          <div className="bg-white rounded-card p-6 grid gap-3">
            <b className="font-display font-semibold text-[18px]">Gelir dağılımı</b>
            <div className="h-4 rounded-full overflow-hidden flex"><i style={{ width: `${sum.m / (sum.m + sum.d) * 100}%` }} className="bg-lime" /><i className="flex-1 bg-violet" /></div>
            <div className="flex justify-between text-[14px] font-display"><span>Martrin %{Math.round(sum.m / (sum.m + sum.d) * 100)}</span><span>Dışarıdan %{Math.round(sum.d / (sum.m + sum.d) * 100)}</span></div>
            <p className="text-[13px] text-muted">Bu defter takip içindir, resmi muhasebe kaydı yerine geçmez. Dökümü muhasebecinle paylaşabilirsin.</p>
          </div>
        </aside>
      </div>
    </Page>
  );
}
