import { useState } from "react";
import { CAMPAIGNS, tl } from "../data";
import { Badge, Btn, Img, Page } from "../ui";

const TONE = { "Yayında": "ok", "Kanıt bekleniyor": "warn", "Teklif aşamasında": "deep", "Tamamlandı": "neutral" } as const;

export default function AdvertiserPanel() {
  const [sel, setSel] = useState(CAMPAIGNS[0].id);
  const [approved, setApproved] = useState(false);
  const c = CAMPAIGNS.find(x => x.id === sel)!;
  return (
    <Page>
      <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
        <div><div className="text-[14px] text-muted">Reklam veren paneli · Yöre Kahve Evleri</div><h1 className="font-display font-semibold tracking-tight text-[32px] md:text-[40px] leading-none mt-1">Kampanyalarım</h1></div>
        <Btn kind="signal" onClick={() => (location.hash = "sepet")}>+ Yeni kampanya</Btn>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[["Aktif kampanya", "2"], ["Emanette bekleyen", tl(262000)], ["Bu ay harcanan", tl(451000)], ["Tahmini gösterim", "6,4 Mn"]].map(([k, v]) => (
          <div key={k} className="bg-white rounded-card p-4"><div className="text-[13px] text-muted">{k}</div><div className="font-display font-semibold tracking-tight text-[24px] tnum mt-1">{v}</div></div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        <div className="grid gap-2 content-start">
          {CAMPAIGNS.map(x => (
            <button key={x.id} onClick={() => setSel(x.id)} className={`text-left bg-white border rounded-2xl p-4 grid gap-1.5 ${sel === x.id ? "border-ink border-2" : "border-line"}`}>
              <div className="flex justify-between gap-2"><b>{x.name}</b></div>
              <div className="flex justify-between items-center"><Badge tone={TONE[x.status]}>{x.status}</Badge><span className="tnum text-[14px] text-muted">{x.total ? tl(x.total) : "—"}</span></div>
            </button>
          ))}
        </div>
        <div className="bg-white rounded-card p-5 grid gap-5 min-w-0">
          <div className="flex justify-between flex-wrap gap-2 items-center"><h2 className="font-display font-medium text-[22px]">{c.name}</h2><Badge tone={TONE[c.status]}>{c.status}</Badge></div>
          <div>
            <div className="text-[13px] font-bold text-muted mb-3">Ödeme akışı</div>
            <ol className="grid gap-0">
              {c.steps.map((s, k) => (
                <li key={k} className="grid grid-cols-[28px_1fr_auto] gap-3 items-start pb-4 relative">
                  {k < c.steps.length - 1 && <span className="absolute left-[13px] top-7 bottom-0 w-0.5 bg-line" />}
                  <span className={`w-7 h-7 rounded-full grid place-items-center text-[13px] font-bold ${s.status === "tamam" ? "bg-ok text-white" : s.status === "bekliyor" ? "bg-signal text-signal-ink" : "bg-paper border border-line text-muted"}`}>{s.status === "tamam" ? "✓" : k + 1}</span>
                  <span className="pt-0.5"><b>{s.label}</b><br /><span className="text-[13px] text-muted">{s.status === "tamam" ? "Tamamlandı" : s.status === "bekliyor" ? "Senin onayını bekliyor" : "Sırada"}</span></span>
                  {s.amount && <span className="tnum text-[14px] pt-0.5">{tl(s.amount)}</span>}
                </li>
              ))}
            </ol>
          </div>
          {c.id === "k1" && (
            <div className="rounded-card ring-2 ring-lime p-4 grid md:grid-cols-[200px_1fr] gap-4 bg-signal-soft/40">
              <div className="relative"><Img src="hero-billboard.jpg" alt="Yayın kanıtı fotoğrafı" className="w-full aspect-[4/3] rounded" /><span className="absolute bottom-1.5 left-1.5 text-[11px] font-mono bg-black/70 text-white px-1.5 py-0.5 rounded">07.12.2026 19:42 · 40.9638, 29.0381</span></div>
              <div className="grid gap-2 content-start">
                <b>Billboard yayın kanıtı geldi</b>
                <p className="text-[14px] text-muted">Boğaziçi Açık Hava Medya bir fotoğraf ve 18 saniyelik bir video yükledi. Konum alanla eşleşiyor. Onaylarsan {tl(78000)} satıcıya aktarılır.</p>
                {approved ? <div className="text-ok font-bold">✓ Onaylandı, ödeme aktarıldı (demo)</div> :
                  <div className="flex gap-2 flex-wrap"><Btn kind="dark" onClick={() => setApproved(true)}>Onayla ve ödemeyi aktar</Btn><Btn kind="light">Sorun bildir</Btn><Btn kind="light">Saha denetimi iste</Btn></div>}
              </div>
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-3 text-[14px]">
            <div className="bg-paper rounded-2xl p-3"><b>Emanette</b><div className="font-display font-semibold text-[20px] tnum">{tl(c.escrow)}</div></div>
            <div className="bg-paper rounded-2xl p-3"><b>Faturalar</b><div className="text-muted">Her satıcıdan ayrı e-Fatura, Martrin'den hizmet faturası</div></div>
          </div>
        </div>
      </div>
    </Page>
  );
}
