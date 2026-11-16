import { useState } from "react";
import { COMMISSION, tl } from "../data";
import { Badge, Btn, Page } from "../ui";

const QUEUE = [
  { what: "Yeni alan: Lara Sahil Dijital Ekran", who: "Akdeniz Dijital Ekran Ağı", why: "Vergi levhası yüklendi, saha fotoğrafı bekleniyor" },
  { what: "Influencer başvurusu: @selinfit", who: "Selin Doğan", why: "Takipçi beyanı 195 B · ekran görüntüsü kontrolü" },
  { what: "Belediye hesabı: Nilüfer Kıyı Belediyesi", who: "Basın Yayın Müdürlüğü", why: "Resmi yazı ve yetki belgesi" },
  { what: "Uyuşmazlık: kanıt reddedildi", who: "Kampanya #k1 · Billboard", why: "Reklam veren 'görsel eksik asılmış' diyor, saha denetimi önerildi" },
];

export default function Admin() {
  const [rates, setRates] = useState(COMMISSION.map(c => c.rate));
  const [minF, setMinF] = useState(5000);
  const [done, setDone] = useState<number[]>([]);
  return (
    <Page>
      <div className="text-[14px] text-muted">Yönetim</div>
      <h1 className="font-display font-semibold tracking-tight text-[32px] md:text-[40px] leading-none mt-1 mb-6">Platform ayarları</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[["Aylık işlem hacmi", tl(18400000)], ["Komisyon geliri", tl(1620000)], ["Öne çıkarma geliri", tl(212000)], ["Aktif satıcı", "1.284"]].map(([k, v]) => (
          <div key={k} className="bg-white rounded-card p-4"><div className="text-[13px] text-muted">{k}</div><div className="font-display font-semibold tracking-tight text-[22px] tnum mt-1">{v}</div></div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white rounded-card p-5 grid gap-3 content-start">
          <h2 className="font-display font-medium text-[20px]">Kategori bazlı komisyon</h2>
          <table className="w-full text-[15px]"><thead><tr className="text-left text-[13px] text-muted"><th className="py-1 font-semibold">Kategori</th><th className="font-semibold">Oran</th><th className="font-semibold">Ödeyen</th></tr></thead>
            <tbody>{COMMISSION.map((c, k) => (
              <tr key={c.cat} className="border-t border-line"><td className="py-2.5">{c.cat}</td>
                <td>{c.rate ? <span className="inline-flex items-center gap-1"><input id={"rate-" + k} type="number" min={0} max={30} value={rates[k]} onChange={e => setRates(r => r.map((x, j) => j === k ? +e.target.value : x))} className="w-16 border border-line rounded px-2 py-1 tnum" />%</span> : "—"}</td>
                <td className="text-muted text-[14px]">{c.payer}</td></tr>
            ))}</tbody></table>
          <label className="flex items-center justify-between gap-3 border-t border-line pt-3 text-[15px]"><span>Influencer minimum takipçi</span><input id="minf" type="number" step={1000} value={minF} onChange={e => setMinF(+e.target.value)} className="w-28 border border-line rounded px-2 py-1 tnum" /></label>
          <label className="flex items-center justify-between gap-3 text-[15px]"><span>Kanıt sonrası otomatik onay süresi</span><span className="font-semibold">72 saat</span></label>
          <label className="flex items-center justify-between gap-3 text-[15px]"><span>Saha denetimi ücreti</span><span className="font-semibold tnum">{tl(3500)}</span></label>
          <div className="text-[13px] text-muted">Abonelik paketleri sonraki fazda açılacak.</div>
        </section>
        <section className="bg-white rounded-card p-5 grid gap-3 content-start">
          <h2 className="font-display font-medium text-[20px]">Onay ve moderasyon kuyruğu</h2>
          {QUEUE.map((q, k) => (
            <div key={k} className="border border-line rounded-2xl p-4 grid gap-1.5">
              <div className="flex justify-between gap-2 flex-wrap"><b>{q.what}</b>{k === 3 && <Badge tone="bad">Uyuşmazlık</Badge>}</div>
              <div className="text-[14px] text-muted">{q.who} · {q.why}</div>
              {done.includes(k) ? <span className="text-ok font-bold text-[14px]">İşlendi</span> :
                <div className="flex gap-2 mt-1"><Btn kind="dark" onClick={() => setDone(d => [...d, k])}>{k === 3 ? "Saha denetimi ata" : "Onayla"}</Btn><Btn kind="light" onClick={() => setDone(d => [...d, k])}>{k === 3 ? "Kararı ver" : "Ek belge iste"}</Btn></div>}
            </div>
          ))}
        </section>
      </div>
    </Page>
  );
}
