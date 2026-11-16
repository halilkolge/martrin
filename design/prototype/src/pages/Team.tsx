import { useState } from "react";
import { A, Icon, Img, Page } from "../ui";

const PAGES = ["Gelen talepler", "Teklif verme", "Mesajlar", "İçerik teslimi", "Takvim", "Paketlerim", "Kazanç defteri", "Ödeme bilgileri", "Ekip yönetimi"] as const;
type Level = 0 | 1 | 2; // 0 yok, 1 görür, 2 düzenler
type Role = { name: string; desc: string; perm: Level[] };

const ROLES0: Role[] = [
  { name: "Sahip", desc: "Hesabın sahibi, her şeye erişir", perm: [2, 2, 2, 2, 2, 2, 2, 2, 2] },
  { name: "Menajer", desc: "Talepleri yönetir, teklif verir", perm: [2, 2, 2, 1, 2, 1, 1, 0, 0] },
  { name: "İçerik asistanı", desc: "Çekim ve kurgu, teslim yükler", perm: [1, 0, 2, 2, 1, 0, 0, 0, 0] },
  { name: "Muhasebe", desc: "Kazançları ve faturaları izler", perm: [0, 0, 0, 0, 0, 0, 2, 1, 0] },
];
const MEMBERS0 = [
  { n: "Elif Karaca", e: "elif@elifmutfakta.com", r: "Sahip", img: "v2/p6.jpg", st: "Aktif" },
  { n: "Ayşe Kılıç", e: "ayse@menajerlik.com", r: "Menajer", c: "bg-sky", st: "Aktif" },
  { n: "Can Öztürk", e: "can.ozturk@mail.com", r: "İçerik asistanı", c: "bg-mint-soft", st: "Aktif" },
  { n: "Derya Yıldız", e: "derya@yildizmusavirlik.com", r: "Muhasebe", c: "bg-rose-soft", st: "Aktif" },
];
const LOG = [
  ["Can Öztürk", "Yöre Kahve için Reels taslağını yükledi", "Onayını bekliyor", "12 dk önce"],
  ["Ayşe Kılıç", "Atlas Elektronik'e ₺58.000 karşı teklif hazırladı", "Onayını bekliyor", "1 sa önce"],
  ["Derya Yıldız", "Ekim ayı kazanç dökümünü indirdi", "", "Dün"],
  ["Ayşe Kılıç", "Moda Sokağı Butik talebini kabul etti", "", "2 gün önce"],
];
const LV = ["Yok", "Görür", "Düzenler"];
const LV_CLS = ["bg-paper text-muted", "bg-sky-soft text-sky-ink", "bg-lime text-ink"];

export default function Team() {
  const [roles, setRoles] = useState(ROLES0);
  const [members, setMembers] = useState<typeof MEMBERS0>(MEMBERS0);
  const [preview, setPreview] = useState("İçerik asistanı");
  const [approve, setApprove] = useState(true);
  const [inv, setInv] = useState({ n: "", e: "", r: "İçerik asistanı" });
  const cycle = (ri: number, pi: number) => ri > 0 && setRoles(rs => rs.map((r, i) => i !== ri ? r : { ...r, perm: r.perm.map((l, j) => j !== pi ? l : ((l + 1) % 3) as Level) }));
  const pr = roles.find(r => r.name === preview)!;
  return (
    <Page>
      <div className="flex justify-between items-end flex-wrap gap-4 mb-6">
        <div><A to="panel-satici" className="text-[14px] text-muted">← Satıcı paneli</A><h1 className="font-display font-semibold tracking-tight text-[34px] md:text-[44px] leading-none mt-1">Ekibim</h1>
          <p className="text-muted mt-2 max-w-[60ch]">Menajerini, kurgucunu ya da muhasebecini davet et. Her biri yalnızca rolünün izin verdiği sayfaları görür.</p></div>
        <span className="inline-flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 font-display text-[15px]"><Img src="v2/p6.jpg" alt="" className="w-8 h-8 rounded-full" />@elifmutfakta · Pro paket · 4/5 koltuk</span>
      </div>

      <div className="grid xl:grid-cols-[1fr_380px] gap-6">
        <div className="grid gap-6 min-w-0">
          <section className="bg-white rounded-card p-5 md:p-6 grid gap-3">
            <h2 className="font-display font-semibold text-[22px]">Üyeler</h2>
            {members.map(m => (
              <div key={m.e} className="grid grid-cols-[44px_1fr_auto] sm:grid-cols-[44px_1fr_180px_auto] gap-3 items-center border-t border-line pt-3">
                {"img" in m && m.img ? <Img src={m.img} alt="" className="w-11 h-11 rounded-full" /> : <span className={`grid place-items-center w-11 h-11 rounded-full font-display font-semibold ${"c" in m ? m.c : "bg-paper"}`}>{m.n.split(" ").map(x => x[0]).join("")}</span>}
                <span className="min-w-0"><b className="font-display font-medium block truncate">{m.n}</b><span className="text-[13px] text-muted truncate block">{m.e}</span></span>
                {m.r === "Sahip" ? <span className="hidden sm:block font-display text-[15px]">Sahip</span> :
                  <select id={"role-" + m.e} value={m.r} onChange={e => setMembers(ms => ms.map(x => x.e === m.e ? { ...x, r: e.target.value } : x))} className="hidden sm:block bg-paper rounded-xl px-3 py-2 font-display text-[15px]">{roles.slice(1).map(r => <option key={r.name}>{r.name}</option>)}</select>}
                <span className={`text-[12.5px] font-display rounded-full px-3 py-1 ${m.st === "Aktif" ? "bg-mint-soft text-mint-ink" : "bg-[#fff1dc] text-warn"}`}>{m.st}</span>
              </div>
            ))}
          </section>

          <section className="bg-white rounded-card p-5 md:p-6 grid gap-4 min-w-0">
            <div><h2 className="font-display font-semibold text-[22px]">Roller ve sayfa yetkileri</h2><p className="text-muted text-[14px] mt-1">Bir hücreye dokunarak yetkiyi değiştir: Yok → Görür → Düzenler.</p></div>
            <div className="overflow-x-auto -mx-1 px-1">
              <table className="w-full min-w-[720px] text-[14px] border-separate border-spacing-y-1.5">
                <thead><tr className="text-left text-muted font-display"><th className="font-medium pb-1">Sayfa</th>{roles.map(r => <th key={r.name} className="font-medium pb-1 text-center">{r.name}</th>)}</tr></thead>
                <tbody>{PAGES.map((p, pi) => (
                  <tr key={p}><td className="pr-3 font-display">{p}</td>
                    {roles.map((r, ri) => <td key={r.name} className="text-center"><button type="button" disabled={ri === 0} onClick={() => cycle(ri, pi)} className={`w-[104px] rounded-xl py-1.5 font-display text-[13px] ${LV_CLS[r.perm[pi]]} ${ri === 0 ? "opacity-70 cursor-default" : "hover:ring-2 hover:ring-ink"}`}>{LV[r.perm[pi]]}</button></td>)}
                  </tr>))}</tbody>
              </table>
            </div>
            <label className="flex items-center justify-between gap-4 bg-paper rounded-2xl p-4 cursor-pointer" htmlFor="approve">
              <span><b className="font-display font-medium">Ekibin gönderdiği teklif ve teslimler onayıma düşsün</b><span className="block text-[13px] text-muted">Açıkken ekip üyeleri hazırlar, son gönderimi sen yaparsın.</span></span>
              <input id="approve" type="checkbox" checked={approve} onChange={() => setApprove(a => !a)} className="peer sr-only" />
              <span className={`w-12 h-7 rounded-full p-1 transition shrink-0 ${approve ? "bg-ink" : "bg-line"}`}><i className={`block w-5 h-5 rounded-full bg-lime transition ${approve ? "translate-x-5" : ""}`} /></span>
            </label>
          </section>

          <section className="bg-white rounded-card p-5 md:p-6 grid gap-3">
            <h2 className="font-display font-semibold text-[22px]">Ekip hareketleri</h2>
            {LOG.map(([who, what, st, when]) => (
              <div key={what} className="flex flex-wrap gap-x-3 gap-y-1 items-center border-t border-line pt-3 text-[15px]">
                <b className="font-display font-medium">{who}</b><span className="text-muted flex-1 min-w-[200px]">{what}</span>
                {st && approve && <span className="flex gap-2"><button className="bg-lime rounded-xl px-3 py-1 font-display text-[13px]">Onayla</button><button className="bg-paper rounded-xl px-3 py-1 font-display text-[13px]">Düzelt</button></span>}
                <span className="text-[13px] text-muted">{when}</span>
              </div>
            ))}
          </section>
        </div>

        <aside className="grid gap-6 content-start">
          <form onSubmit={e => { e.preventDefault(); if (!inv.e) return; setMembers(ms => [...ms, { n: inv.n || inv.e.split("@")[0], e: inv.e, r: inv.r, c: "bg-violet-soft", st: "Davet gönderildi" }]); setInv({ n: "", e: "", r: inv.r }); }} className="bg-ink text-white rounded-card p-6 grid gap-3">
            <b className="font-display font-semibold text-[20px]">Ekibe davet et</b>
            <label className="grid gap-1 text-[13px] text-white/60" htmlFor="inv-n">Ad soyad<input id="inv-n" value={inv.n} onChange={e => setInv({ ...inv, n: e.target.value })} placeholder="Örn. Mehmet Kaya" className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] outline-none placeholder:text-white/30" /></label>
            <label className="grid gap-1 text-[13px] text-white/60" htmlFor="inv-e">E-posta<input id="inv-e" type="email" value={inv.e} onChange={e => setInv({ ...inv, e: e.target.value })} placeholder="ornek@mail.com" className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] outline-none placeholder:text-white/30" /></label>
            <label className="grid gap-1 text-[13px] text-white/60" htmlFor="inv-r">Rol<select id="inv-r" value={inv.r} onChange={e => setInv({ ...inv, r: e.target.value })} className="bg-white/10 rounded-xl px-3 py-2.5 text-white text-[15px] [&>option]:text-ink">{roles.slice(1).map(r => <option key={r.name}>{r.name}</option>)}</select></label>
            <button className="h-12 rounded-2xl bg-lime text-ink font-display font-medium mt-1">Davet gönder</button>
            <p className="text-[12.5px] text-white/50">Davet edilen kişi kendi şifresiyle giriş yapar. Ödeme bilgilerini ve şifreni hiçbir zaman görmez.</p>
          </form>

          <div className="bg-white rounded-card p-6 grid gap-4">
            <div className="flex justify-between items-center gap-2"><b className="font-display font-semibold text-[18px]">Ekip üyesi ne görür?</b>
              <select id="preview" value={preview} onChange={e => setPreview(e.target.value)} className="bg-paper rounded-xl px-3 py-1.5 font-display text-[14px]">{roles.slice(1).map(r => <option key={r.name}>{r.name}</option>)}</select></div>
            <div className="rounded-2xl bg-ink p-3 grid gap-1">
              {PAGES.map((p, i) => (
                <div key={p} className={`flex items-center justify-between rounded-xl px-3 py-2 text-[14px] font-display ${pr.perm[i] ? "text-white" : "text-white/25"}`}>
                  <span className="flex items-center gap-2">{pr.perm[i] ? <i className="w-2 h-2 rounded-full bg-lime" /> : <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>}{p}</span>
                  <span className="text-[12px] opacity-70">{pr.perm[i] === 2 ? "Düzenler" : pr.perm[i] === 1 ? "Görür" : ""}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-muted flex gap-2"><Icon n="shield" className="w-4 h-4 shrink-0 mt-0.5" />Kilitli sayfalar menüde görünmez, bağlantıyla açılmaya çalışılırsa erişim reddedilir.</p>
          </div>
        </aside>
      </div>
    </Page>
  );
}
