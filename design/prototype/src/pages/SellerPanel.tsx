import { useState } from "react";
import { SPACES, TYPE_LABEL, tl } from "../data";
import { A, Badge, Btn, Img, Page } from "../ui";

const REQUESTS = [
  { who: "Yöre Kahve Evleri", what: "Sahil Yolu Işıklı Billboard · 1 hafta", when: "7–13 Aralık", price: 78000, kind: "Sipariş" },
  { who: "Atlas Elektronik", what: "Sahil Yolu Işıklı Billboard · 1 ay", when: "1–31 Ocak", price: 225000, kind: "Teklif", list: 265000 },
  { who: "Moda Sokağı Butik", what: "Koridor Tanıtım Standı · 2 gün", when: "20–21 Aralık", price: 13000, kind: "Sipariş" },
];

export default function SellerPanel() {
  const [role, setRole] = useState<"alan" | "inf">("alan");
  const [uploaded, setUploaded] = useState(false);
  const [answered, setAnswered] = useState<Record<number, string>>({});
  const mine = SPACES.filter(s => s.sellerId === "s1" || s.sellerId === "s2");
  return (
    <Page>
      <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
        <div><div className="text-[14px] text-muted">Satıcı paneli</div><h1 className="font-display font-semibold tracking-tight text-[32px] md:text-[40px] leading-none mt-1">{role === "alan" ? "Boğaziçi Açık Hava Medya" : "Elif Karaca · @elifmutfakta"}</h1></div>
        <div className="flex flex-wrap gap-2 items-center">
        <A to="panel-ekip" className="inline-flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 font-display text-[14px] hover:ring-2 hover:ring-ink">Ekibim</A>
        <A to="panel-kazanc" className="inline-flex items-center gap-2 bg-lime rounded-2xl px-4 py-2.5 font-display text-[14px] hover:ring-2 hover:ring-ink">Kazanç defteri</A>
        <div className="inline-flex bg-white border border-line rounded-2xl p-1 text-[14px] font-semibold">
          <button onClick={() => setRole("alan")} className={`px-3 py-1.5 rounded ${role === "alan" ? "bg-ink text-white" : ""}`}>Alan sahibi görünümü</button>
          <button onClick={() => setRole("inf")} className={`px-3 py-1.5 rounded ${role === "inf" ? "bg-ink text-white" : ""}`}>Influencer görünümü</button>
        </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {(role === "alan"
          ? [["Bu ay kazanç", tl(684000)], ["Emanette, kanıt bekleyen", tl(78000)], ["Doluluk (Aralık)", "%62"], ["Bekleyen talep", "3"]]
          : [["Bu ay kazanç", tl(146000)], ["Emanette", tl(52000)], ["Aktif iş", "4"], ["Yeni teklif", "2"]]).map(([k, v]) => (
          <div key={k} className="bg-white rounded-card p-4"><div className="text-[13px] text-muted">{k}</div><div className="font-display font-semibold tracking-tight text-[24px] tnum mt-1">{v}</div></div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6">
        <div className="grid gap-6 min-w-0">
          <section className="bg-white rounded-card p-5 grid gap-3">
            <h2 className="font-display font-medium text-[20px]">Gelen talepler</h2>
            {REQUESTS.map((r, k) => (
              <div key={k} className="border border-line rounded-2xl p-4 grid md:grid-cols-[1fr_auto] gap-3 items-center">
                <div className="grid gap-1"><div className="flex gap-2"><Badge tone={r.kind === "Teklif" ? "signal" : "deep"}>{r.kind}</Badge><b>{r.who}</b></div>
                  <div className="text-[14px] text-muted">{role === "alan" ? r.what : "Reels + 3 Story · yemek kategorisi"} · {r.when}</div>
                  <div className="tnum text-[15px]"><b>{tl(r.price)}</b>{r.list && <span className="text-muted"> · liste fiyatı {tl(r.list)}</span>}</div></div>
                {answered[k] ? <span className="font-bold text-[14px] text-ok">{answered[k]}</span> :
                  <div className="flex gap-2 flex-wrap">{r.kind === "Teklif" ? <><Btn kind="dark" onClick={() => setAnswered(a => ({ ...a, [k]: "Kabul edildi" }))}>Kabul</Btn><Btn kind="light" onClick={() => setAnswered(a => ({ ...a, [k]: "Karşı teklif: " + tl(245000) }))}>Karşı teklif</Btn></> : <><Btn kind="dark" onClick={() => setAnswered(a => ({ ...a, [k]: "Onaylandı" }))}>Onayla</Btn><Btn kind="light" onClick={() => setAnswered(a => ({ ...a, [k]: "Reddedildi" }))}>Reddet</Btn></>}</div>}
              </div>
            ))}
          </section>

          {role === "alan" && (
            <section className="bg-white rounded-card p-5 grid gap-3 overflow-x-auto">
              <h2 className="font-display font-medium text-[20px]">Doluluk takvimi · Aralık 2026</h2>
              <div className="min-w-[640px] grid gap-1.5">
                <div className="grid grid-cols-[180px_repeat(31,1fr)] gap-0.5 text-[10px] text-muted tnum"><span />{Array.from({ length: 31 }, (_, d) => <span key={d} className="text-center">{d + 1}</span>)}</div>
                {mine.map(s => (
                  <div key={s.id} className="grid grid-cols-[180px_repeat(31,1fr)] gap-0.5 items-center">
                    <span className="text-[13px] font-semibold truncate pr-2">{s.title}</span>
                    {Array.from({ length: 31 }, (_, d) => <span key={d} title={`${d + 1} Aralık`} className={`h-6 rounded-sm ${s.busy.includes(d + 1) ? "bg-deep" : "bg-paper border border-line"}`} />)}
                  </div>
                ))}
              </div>
              <div className="text-[13px] text-muted">Koyu kutular satılmış ya da bloke edilmiş günler. Bir güne tıklayıp elle bloke edebilir ya da opsiyon koyabilirsin.</div>
            </section>
          )}

          <section className="bg-white rounded-card p-5 grid gap-3">
            <div className="flex justify-between items-center flex-wrap gap-2"><h2 className="font-display font-medium text-[20px]">{role === "alan" ? "İlanlarım" : "Paketlerim"}</h2><Btn kind="light">+ Yeni {role === "alan" ? "alan" : "paket"}</Btn></div>
            {role === "alan" ? mine.map(s => (
              <div key={s.id} className="grid grid-cols-[72px_1fr_auto] gap-3 items-center border-b border-line last:border-0 pb-3 last:pb-0">
                <Img src={s.img} alt="" hint={s.type} className="w-[72px] h-[54px] rounded" />
                <div className="min-w-0"><b className="block truncate">{s.title}</b><span className="text-[13px] text-muted">{TYPE_LABEL[s.type]} · {s.prices.map(p => p.unit).join(", ")}</span></div>
                <Badge tone="ok">Yayında</Badge>
              </div>
            )) : ["1 Reels · " + tl(38000), "Reels + 3 Story · " + tl(52000), "YouTube entegrasyon · " + tl(64000)].map(p => <div key={p} className="flex justify-between border-b border-line last:border-0 pb-2"><span>{p}</span><Badge tone="ok">Aktif</Badge></div>)}
            <div className="text-[13px] text-muted">İlanını haftalık <b>{tl(1500)}</b> karşılığında öne çıkarabilirsin.</div>
          </section>
        </div>

        <aside className="grid gap-4 h-fit">
          <div className="bg-white rounded-card ring-2 ring-ink p-5 grid gap-3">
            <div className="font-display font-medium text-[18px]">{role === "alan" ? "Yayın kanıtı yükle" : "İçerik teslim et"}</div>
            <div className="text-[14px] text-muted">{role === "alan" ? "Yöre Kahve Evleri · Sahil Yolu Billboard · 7 Aralık başlangıç" : "Yöre Kahve Evleri · Reels + 3 Story"}</div>
            {uploaded ? (
              <div className="grid gap-2"><Img src={role === "alan" ? "hero-billboard.jpg" : "influencer-1.jpg"} alt="Yüklenen kanıt" className="w-full aspect-video rounded" />
                <div className="text-[13px] font-mono bg-paper rounded-2xl p-2">07.12.2026 19:42 · Konum eşleşti ✓ · Video 18 sn ✓</div>
                <div className="text-ok font-bold text-[14px]">Gönderildi. Reklam veren onaylayınca {tl(role === "alan" ? 78000 : 52000)} hesabına geçer.</div></div>
            ) : (
              <button onClick={() => setUploaded(true)} className="border-2 border-dashed border-line rounded-2xl p-6 text-center hover:border-ink">
                <div className="font-bold">📷 Fotoğraf + 🎥 video çek</div><div className="text-[13px] text-muted mt-1">Telefonundan aç. Konum ve saat otomatik eklenir.</div>
              </button>
            )}
          </div>
          <div className="bg-white rounded-card p-5 grid gap-2 text-[14px]">
            <b>Ödeme bilgileri</b>
            {role === "alan" ? <span className="text-muted">Şirket hesabı · e-Fatura mükellefi. Faturanı reklam verene platform üzerinden iletirsin.</span>
              : <span className="text-muted">Sosyal içerik üreticisi istisna hesabı tanımlı. Ödemeler bu hesaba yapılır, gerekli kesinti banka tarafından uygulanır.</span>}
          </div>
        </aside>
      </div>
    </Page>
  );
}
