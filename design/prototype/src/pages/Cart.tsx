import { useState } from "react";
import { INFLUENCERS, SPACES, TYPE_LABEL, tl } from "../data";
import { A, Badge, Btn, Img, Page, findItem, useCart } from "../ui";

export default function Cart() {
  const { items, remove } = useCart();
  const [staged, setStaged] = useState(true);
  const [audit, setAudit] = useState(false);
  const [done, setDone] = useState(false);
  const sub = items.reduce((a, b) => a + b.price, 0);
  const total = sub + (audit ? 3500 : 0);

  if (done) return (
    <Page><div className="max-w-[640px] mx-auto bg-white rounded-card p-8 grid gap-4 text-center">
      <div className="mx-auto w-14 h-14 rounded-full bg-signal grid place-items-center text-[28px]">✓</div>
      <h1 className="font-display font-semibold tracking-tight text-[30px]">Kampanyan oluşturuldu</h1>
      <p className="text-muted"><b className="text-ink tnum">{tl(total)}</b> emanete alındı. Satıcılar 24 saat içinde onaylayacak. Her kalemin parası yayın kanıtını onayladığında aktarılır.</p>
      <div className="flex gap-2 justify-center"><Btn onClick={() => (location.hash = "panel-reklamveren")}>Kampanyayı takip et</Btn></div>
      <div className="text-[12px] text-muted">Demo: gerçek bir ödeme yapılmadı.</div>
    </div></Page>
  );

  return (
    <Page>
      <h1 className="font-display font-semibold tracking-tight text-[32px] md:text-[40px] leading-none mb-2">Kampanya sepeti</h1>
      <p className="text-muted mb-6">Influencer'ları ve fiziksel alanları aynı kampanyada topla, tek ödemeyle başlat.</p>
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div className="grid gap-3 content-start min-w-0">
          {items.length === 0 && <div className="bg-white rounded-card p-10 text-center text-muted">Sepetin boş. <A to="alanlar" className="underline font-bold text-ink">Alanlara</A> ya da <A to="influencerlar" className="underline font-bold text-ink">influencer'lara</A> göz at.</div>}
          {items.map(it => {
            const x = findItem(it.id)!; const isS = it.kind === "space";
            const s = isS ? SPACES.find(v => v.id === it.id)! : null; const inf = !isS ? INFLUENCERS.find(v => v.id === it.id)! : null;
            return (
              <div key={it.id} className="bg-white rounded-card p-3 grid grid-cols-[88px_1fr_auto] gap-4 items-center">
                <Img src={(x as { img: string }).img} alt="" hint={s?.type} className="w-[88px] h-[88px] rounded-2xl" />
                <div className="grid gap-1 min-w-0">
                  <div className="flex gap-1.5 flex-wrap"><Badge tone={isS ? "deep" : "signal"}>{isS ? TYPE_LABEL[s!.type] : "Influencer"}</Badge>{s && <Badge>{s.city}</Badge>}</div>
                  <A to={(isS ? "alan-" : "inf-") + it.id} className="font-bold truncate hover:underline">{isS ? s!.title : inf!.name + " · " + inf!.handle}</A>
                  <div className="text-[14px] text-muted">{it.option}</div>
                </div>
                <div className="grid gap-1 justify-items-end"><span className="font-display font-semibold tnum">{tl(it.price)}</span><button onClick={() => remove(it.id)} className="text-[13px] text-muted underline">Çıkar</button></div>
              </div>
            );
          })}
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            <A to="alanlar" className="border-2 border-dashed border-line rounded-2xl p-4 text-center font-semibold hover:border-ink">+ Fiziksel alan ekle</A>
            <A to="influencerlar" className="border-2 border-dashed border-line rounded-2xl p-4 text-center font-semibold hover:border-ink">+ Influencer ekle</A>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 h-fit bg-white rounded-card ring-2 ring-ink p-5 grid gap-4">
          <div className="font-display font-medium text-[18px]">Ödeme özeti</div>
          <div className="grid gap-1.5 text-[15px]">
            <div className="flex justify-between"><span>{items.length} kalem</span><span className="tnum">{tl(sub)}</span></div>
            {audit && <div className="flex justify-between"><span>Saha denetimi</span><span className="tnum">{tl(3500)}</span></div>}
            <div className="flex justify-between text-muted text-[13px]"><span>Hizmet bedeli</span><span>Satıcıdan kesilir</span></div>
            <div className="flex justify-between border-t border-line pt-2 mt-1 font-bold text-[18px]"><span>Toplam</span><span className="font-display wide tnum">{tl(total)}</span></div>
          </div>
          <label className="flex gap-2 items-start text-[14px]"><input id="staged" type="checkbox" checked={staged} onChange={e => setStaged(e.target.checked)} className="accent-deep w-4 h-4 mt-0.5" /><span><b>Aşamalı serbest bırakma</b><br /><span className="text-muted">Aylık ve uzun işlerde para haftalık kanıtlarla parça parça aktarılır.</span></span></label>
          <label className="flex gap-2 items-start text-[14px]"><input id="audit" type="checkbox" checked={audit} onChange={e => setAudit(e.target.checked)} className="accent-deep w-4 h-4 mt-0.5" /><span><b>Bağımsız saha denetimi</b> (+{tl(3500)})<br /><span className="text-muted">Fotoğraf ve video kanıtına ek olarak yerinde kontrol.</span></span></label>
          <div className="grid gap-2 bg-paper rounded-2xl p-3 text-[13px]">
            <b className="text-[14px]">Paran nasıl ilerler?</b>
            <ol className="grid gap-1 list-decimal pl-4 text-muted"><li>Ödeme Martrin emanet hesabına geçer</li><li>Satıcı yayını başlatır, kanıt yükler</li><li>Sen onaylarsın (ya da 72 saat sonra otomatik onaylanır)</li><li>Para satıcıya aktarılır</li></ol>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[12px] text-center text-muted"><span className="border border-line rounded py-1.5">Kredi kartı</span><span className="border border-line rounded py-1.5">Taksit</span><span className="border border-line rounded py-1.5">Havale/EFT</span></div>
          <Btn kind="signal" className="w-full" onClick={() => setDone(true)}>Öde ve kampanyayı başlat</Btn>
          <div className="text-[12px] text-muted">Her satıcı kendi faturasını keser. Martrin yalnızca kendi hizmet bedelini faturalar.</div>
        </aside>
      </div>
    </Page>
  );
}
