import { useState, type FormEvent, type ReactNode } from "react";
import { A, Icon, LogoMark, Page } from "../ui";

const TOPICS = [
  { k: "Reklam vermek istiyorum", icon: "eye", days: 1 },
  { k: "Alanımı listelemek istiyorum", icon: "pin", days: 1 },
  { k: "Influencer olarak katılmak", icon: "camera", days: 2 },
  { k: "Belediye iş birliği", icon: "shield", days: 3 },
  { k: "Ödeme ve fatura", icon: "cart", days: 1 },
  { k: "Basın", icon: "mail", days: 2 },
];

const FAQ = [
  { q: "Ödeme satıcıya ne zaman geçer?", a: "Reklam verenin ödemesi lisanslı ödeme kuruluşunda emanette tutulur. Satıcı yayın kanıtını yükler, reklam veren onaylayınca ödeme satıcıya geçer. Reklam veren 72 saat içinde itiraz etmezse kanıt otomatik onaylanır. Uzun kampanyalarda ödeme aşamalara bölünür, her aşama kendi kanıtıyla serbest kalır." },
  { q: "Yayın kanıtını nasıl yüklerim?", a: "Panelindeki siparişe tarih damgalı ve konumlu bir fotoğraf ile bir video yükle. İkisi de zorunlu. Reklam veren isterse ₺3.500 ücretle bağımsız saha denetimi de talep edebilir; denetçi alanı yerinde kontrol eder." },
  { q: "Komisyon oranları ne kadar?", a: "Komisyon yalnızca satıcıdan, iş tamamlanınca kesilir: influencer %15, billboard %8, AVM %10, DOOH %10, belediye alanları %6. Reklam veren komisyon ödemez. İlanını öne çıkarmak istersen haftalık ₺1.500 ödersin." },
  { q: "Belediye alanları nasıl listeleniyor?", a: "İki yol var: ihaleyi kazanmış işletici şirket kendi hesabıyla listeler ya da belediye doğrudan kendi hesabını açar. Her iki durumda da ödeme ve kanıt akışı diğer alanlarla aynıdır." },
  { q: "Faturayı kim keser?", a: "Satıcı hizmet faturasını reklam verene kendisi keser. Martrin yalnızca kendi komisyonu için satıcıya fatura keser. Faturası olmayan influencer'lara ödeme, sosyal içerik üreticisi istisnası kapsamındaki banka hesabına yapılır." },
  { q: "Siparişi iptal edebilir miyim?", a: "Satıcı siparişi kabul etmeden önce iptal edersen ödemenin tamamı iade edilir. Yayın başladıktan sonra iptal ve iade talepleri itiraz süreciyle değerlendirilir; destek ekibi iki tarafı dinleyerek karar verir." },
];

type F = { name: string; email: string; phone: string; company: string; topic: string; message: string; kvkk: boolean };
const EMPTY: F = { name: "", email: "", phone: "", company: "", topic: "", message: "", kvkk: false };

function validate(f: F) {
  const e: Partial<Record<keyof F, string>> = {};
  if (!f.name.trim()) e.name = "Adını ve soyadını yaz.";
  if (!f.email.trim()) e.email = "E-posta adresini yaz.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Geçerli bir e-posta adresi yaz (ornek@alan.com).";
  if (f.phone.trim() && f.phone.replace(/\D/g, "").length < 10) e.phone = "Telefon numarası en az 10 haneli olmalı.";
  if (!f.topic.trim()) e.topic = "Bir konu seç ya da yaz.";
  if (f.message.trim().length < 10) e.message = "Mesajın en az 10 karakter olmalı.";
  if (!f.kvkk) e.kvkk = "Devam etmek için aydınlatma metnini onayla.";
  return e;
}

const ticketNo = () => {
  const d = new Date();
  const ym = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}`;
  return `MRT-${ym}-${Math.floor(1000 + Math.random() * 9000)}`;
};

const inputCls = (err?: string) => `w-full h-12 rounded-2xl bg-paper px-4 text-[15px] outline-none ring-1 focus:ring-2 focus:ring-ink ${err ? "ring-live" : "ring-transparent"}`;

function Field({ id, label, opt, err, children }: { id: string; label: string; opt?: boolean; err?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5 min-w-0">
      <label htmlFor={id} className="font-display text-[14px] font-medium">{label}{opt && <span className="text-muted font-normal"> (isteğe bağlı)</span>}</label>
      {children}
      {err && <span id={`${id}-err`} className="text-[13px] text-live">{err}</span>}
    </div>
  );
}

function CopyRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");
  const copy = async () => {
    try {
      if (!navigator.clipboard) throw new Error("no clipboard");
      await navigator.clipboard.writeText(value);
      setState("ok");
    } catch {
      setState("fail");
    }
    setTimeout(() => setState("idle"), 2200);
  };
  return (
    <div className="flex items-center gap-3 bg-paper rounded-2xl p-3 pl-4">
      <span className="grid place-items-center w-10 h-10 rounded-xl bg-white shrink-0"><Icon n={icon} /></span>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] text-muted">{label}</div>
        <div className="font-display font-medium text-[16px] truncate tnum select-all">{value}</div>
      </div>
      <button type="button" onClick={copy} className={`h-9 px-3 rounded-xl font-display text-[13px] shrink-0 ${state === "ok" ? "bg-lime text-ink" : state === "fail" ? "bg-rose-soft text-rose-ink" : "bg-white text-ink"}`} aria-live="polite">
        {state === "ok" ? "Kopyalandı" : state === "fail" ? "Kopyalanamadı" : "Kopyala"}
      </button>
    </div>
  );
}

export default function Contact() {
  const [f, setF] = useState<F>(EMPTY);
  const [errs, setErrs] = useState<Partial<Record<keyof F, string>>>({});
  const [sent, setSent] = useState<{ no: string; days: number; topic: string } | null>(null);
  const [open, setOpen] = useState<number | null>(0);

  const set = <K extends keyof F>(k: K, v: F[K]) => {
    setF(p => ({ ...p, [k]: v }));
    if (errs[k]) setErrs(p => ({ ...p, [k]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate(f);
    setErrs(v);
    if (Object.values(v).some(Boolean)) {
      const first = (Object.keys(v) as (keyof F)[]).find(k => v[k]);
      if (first) document.getElementById(`c-${first}`)?.focus();
      return;
    }
    const days = TOPICS.find(t => t.k === f.topic)?.days ?? 2;
    setSent({ no: ticketNo(), days, topic: f.topic });
  };

  const reset = () => { setF(EMPTY); setErrs({}); setSent(null); };
  const ariaErr = (k: keyof F) => errs[k] ? { "aria-invalid": true, "aria-describedby": `c-${k}-err` } : {};

  return (
    <Page>
      <div className="grid gap-4 pt-4 pb-8 max-w-[760px]">
        <span className="text-[14px] text-muted">İletişim</span>
        <h1 className="font-display font-semibold tracking-[-.035em] leading-[1] text-[40px] md:text-[64px] text-balance">Bize <span className="pill-word">ulaş</span></h1>
        <p className="text-muted text-[18px] max-w-[56ch]">Kampanya, listeleme, ödeme ya da iş birliği; sorunu yaz, doğru ekibe iletelim. Çoğu mesaja bir iş günü içinde dönüyoruz.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Konu seç">
        {TOPICS.map(t => {
          const on = f.topic === t.k;
          return (
            <button key={t.k} type="button" aria-pressed={on} disabled={!!sent} onClick={() => set("topic", t.k)}
              className={`inline-flex items-center gap-2 h-11 px-4 rounded-2xl font-display text-[14px] transition-colors disabled:opacity-50 ${on ? "bg-ink text-white" : "bg-white text-ink hover:bg-lime-soft"}`}>
              <Icon n={on ? "check" : t.icon} className="w-4 h-4" sw={on ? 2.6 : 1.8} />{t.k}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5 items-start">
        <section className="bg-white rounded-card p-5 md:p-8 min-w-0">
          {sent ? (
            <div className="grid gap-5 justify-items-start py-4">
              <span className="grid place-items-center w-14 h-14 rounded-2xl bg-lime text-ink"><Icon n="check" className="w-7 h-7" sw={2.6} /></span>
              <div>
                <h2 className="font-display font-semibold text-[28px] md:text-[34px] tracking-tight leading-tight">Mesajın alındı</h2>
                <p className="text-muted text-[16px] mt-2 max-w-[48ch]">"{sent.topic}" konulu mesajını ilgili ekibe ilettik. {sent.days} iş günü içinde {f.email} adresine dönüş yapacağız.</p>
              </div>
              <div className="bg-paper rounded-2xl px-5 py-4 grid gap-1 w-full sm:w-auto">
                <span className="text-[13px] text-muted">Takip numaran</span>
                <b className="font-display font-semibold text-[24px] tracking-tight tnum select-all">{sent.no}</b>
                <span className="text-[13px] text-muted">Sonraki yazışmalarda bu numarayı belirt.</span>
              </div>
              <button type="button" onClick={reset} className="h-12 px-6 rounded-2xl bg-ink text-white font-display font-medium">Yeni mesaj</button>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="grid gap-4">
              <div>
                <h2 className="font-display font-semibold text-[26px] tracking-tight">Mesaj gönder</h2>
                <p className="text-muted text-[15px] mt-1">"İsteğe bağlı" yazanlar dışında tüm alanlar zorunlu.</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field id="c-name" label="Ad soyad" err={errs.name}>
                  <input id="c-name" autoComplete="name" value={f.name} onChange={e => set("name", e.target.value)} className={inputCls(errs.name)} placeholder="Elif Aydın" {...ariaErr("name")} />
                </Field>
                <Field id="c-email" label="E-posta" err={errs.email}>
                  <input id="c-email" type="email" autoComplete="email" inputMode="email" value={f.email} onChange={e => set("email", e.target.value)} className={inputCls(errs.email)} placeholder="elif@ornek.com" {...ariaErr("email")} />
                </Field>
                <Field id="c-phone" label="Telefon" opt err={errs.phone}>
                  <input id="c-phone" type="tel" autoComplete="tel" inputMode="tel" value={f.phone} onChange={e => set("phone", e.target.value)} className={inputCls(errs.phone)} placeholder="05xx xxx xx xx" {...ariaErr("phone")} />
                </Field>
                <Field id="c-company" label="Şirket" opt>
                  <input id="c-company" autoComplete="organization" value={f.company} onChange={e => set("company", e.target.value)} className={inputCls()} placeholder="Kuzey Kahve A.Ş." />
                </Field>
              </div>
              <Field id="c-topic" label="Konu" err={errs.topic}>
                <input id="c-topic" list="c-topic-list" value={f.topic} onChange={e => set("topic", e.target.value)} className={inputCls(errs.topic)} placeholder="Yukarıdan seç ya da yaz" {...ariaErr("topic")} />
                <datalist id="c-topic-list">{TOPICS.map(t => <option key={t.k} value={t.k} />)}</datalist>
              </Field>
              <Field id="c-message" label="Mesaj" err={errs.message}>
                <textarea id="c-message" rows={6} value={f.message} onChange={e => set("message", e.target.value)} className={`${inputCls(errs.message)} h-auto py-3 resize-y`} placeholder="Kampanya dönemi, şehir, bütçe ya da sipariş numarası gibi detayları ekle." {...ariaErr("message")} />
                <span className="text-[12px] text-muted text-right tnum">{f.message.length} karakter</span>
              </Field>
              <div className="grid gap-1.5">
                <label htmlFor="c-kvkk" className="flex gap-3 items-start text-[14px] cursor-pointer">
                  <input id="c-kvkk" type="checkbox" checked={f.kvkk} onChange={e => set("kvkk", e.target.checked)} className="mt-0.5 w-5 h-5 accent-[#151515] shrink-0" {...ariaErr("kvkk")} />
                  <span><A to="kvkk" className="underline underline-offset-2">KVKK aydınlatma metnini</A> okudum; iletişim bilgilerimin bu talebe yanıt vermek için işlenmesini onaylıyorum.</span>
                </label>
                {errs.kvkk && <span id="c-kvkk-err" className="text-[13px] text-live pl-8">{errs.kvkk}</span>}
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button type="submit" className="h-12 px-7 rounded-2xl bg-lime text-ink font-display font-medium inline-flex items-center gap-2">Gönder <Icon n="arrow" className="w-4 h-4" /></button>
                {Object.values(errs).some(Boolean) && <span className="text-[13px] text-live" role="alert">İşaretli alanları kontrol et.</span>}
              </div>
            </form>
          )}
        </section>

        <aside className="grid gap-5 min-w-0">
          <div className="bg-white rounded-card p-5 md:p-6 grid gap-3">
            <b className="font-display font-semibold text-[20px] tracking-tight">İletişim bilgileri</b>
            <CopyRow icon="mail" label="Destek e-postası" value="destek@martrin.com.tr" />
            <CopyRow icon="bell" label="Telefon" value="0850 000 00 00" />
          </div>
          <div className="bg-white rounded-card p-5 md:p-6 grid gap-3">
            <div className="flex items-center gap-3"><span className="grid place-items-center w-10 h-10 rounded-xl bg-violet-soft text-violet-ink"><Icon n="calendar" /></span><b className="font-display font-semibold text-[20px] tracking-tight">Çalışma saatleri</b></div>
            <div className="grid gap-2 text-[15px]">
              {[["Hafta içi", "09.00 – 18.00"], ["Cumartesi", "10.00 – 15.00"], ["Pazar ve resmî tatiller", "Kapalı"]].map(([d, h]) => (
                <div key={d} className="flex justify-between gap-3 bg-paper rounded-2xl px-4 py-2.5"><span className="min-w-0">{d}</span><span className="font-display tnum shrink-0">{h}</span></div>
              ))}
            </div>
            <p className="text-[13px] text-muted">Kampanyası yayında olan reklam verenler için hafta sonu acil hat açık.</p>
          </div>
          <div className="bg-white rounded-card p-5 md:p-6 grid gap-3">
            <div className="flex items-center gap-3"><span className="grid place-items-center w-10 h-10 rounded-xl bg-sky-soft text-sky-ink"><Icon n="pin" /></span><b className="font-display font-semibold text-[20px] tracking-tight">Ofis</b></div>
            <address className="not-italic text-[15px] leading-relaxed bg-paper rounded-2xl px-4 py-3">Levent Mah. Çarşı Cad. No: 12, Kat 7<br />34330 Beşiktaş / İstanbul</address>
            <p className="text-[13px] text-muted">Ziyaretler randevu ile. Örnek adrestir.</p>
          </div>
          <div className="bg-lime rounded-card p-5 md:p-6 grid gap-1">
            <span className="text-[14px] text-ink/70">Ortalama ilk yanıt süresi</span>
            <b className="font-display font-semibold text-[44px] tracking-tight leading-none tnum">3 saat</b>
            <span className="text-[14px] text-ink/70">Son 30 günde, mesai saatleri içinde</span>
          </div>
        </aside>
      </div>

      <section className="mt-12 grid lg:grid-cols-[1fr_1.6fr] gap-5 items-start">
        <div className="min-w-0">
          <span className="text-[14px] text-muted">Sık sorulan sorular</span>
          <h2 className="font-display font-semibold tracking-tight text-[34px] md:text-[44px] leading-none mt-2">Önce buraya bak</h2>
          <p className="text-muted text-[16px] mt-3 max-w-[40ch]">Ödeme, kanıt ve fatura sorularının çoğu burada yanıtlı. Detaylar için <A to="emanet-odeme" className="underline underline-offset-2">emanetli ödeme</A> ve <A to="yayin-kaniti" className="underline underline-offset-2">yayın kanıtı</A> sayfalarına bak.</p>
        </div>
        <div className="bg-white rounded-card p-2 md:p-3 grid gap-1 min-w-0">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={`rounded-2xl ${isOpen ? "bg-paper" : ""}`}>
                <h3>
                  <button type="button" id={`faq-b-${i}`} aria-expanded={isOpen} aria-controls={`faq-p-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 font-display font-medium text-[16px] md:text-[17px]">
                    <span className="min-w-0">{item.q}</span>
                    <span className={`grid place-items-center w-8 h-8 rounded-full shrink-0 transition-transform ${isOpen ? "bg-ink text-white rotate-90" : "bg-paper"}`}><Icon n="right" className="w-4 h-4" /></span>
                  </button>
                </h3>
                {isOpen && <div id={`faq-p-${i}`} role="region" aria-labelledby={`faq-b-${i}`} className="px-4 pb-4 text-[15px] text-ink/80 leading-relaxed max-w-[68ch]">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-12 rounded-card bg-ink text-white p-6 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-6 items-center">
        <LogoMark body="#ffffff" className="w-16 h-16" />
        <div className="min-w-0"><b className="font-display font-semibold text-[26px] tracking-tight">Büyük kampanya için satış ekibiyle görüş</b><p className="text-white/70 mt-1">Birden fazla şehirde billboard, AVM ekranı ve influencer'ı tek planda birleştirelim.</p></div>
        <A to="ilanlar" className="h-12 px-6 rounded-2xl bg-lime text-ink grid place-items-center font-display font-medium">Kampanya ilanı aç</A>
      </div>
      <p className="text-[13px] text-muted mt-6 text-center">SSS yanıtları örnek metindir, avukat onayından geçecek.</p>
    </Page>
  );
}
