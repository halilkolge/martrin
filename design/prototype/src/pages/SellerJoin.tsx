import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { CITIES, NICHE_TONE, TYPE_LABEL, tl, type Platform } from "../data";
import { A, Icon, Img, LogoMark, Page, Social } from "../ui";

type Mode = "alan" | "inf";
type Errs = Record<string, string>;

const modeFromHash = (): Mode | null => {
  const h = typeof location !== "undefined" ? location.hash.toLowerCase() : "";
  if (h.includes("influencer")) return "inf";
  if (h.includes("satici-ol-alan")) return "alan";
  return null;
};

const CITY_LIST = CITIES.filter(c => c !== "Tüm Türkiye");
const BIZ_TYPES = ["Açık hava şirketi", "AVM", "Belediye işleticisi", "Bina / site yönetimi", "Ulaşım / araç filosu", "Diğer işletme"];
const LIGHTS = ["Aydınlatma yok", "Önden aydınlatmalı", "Arkadan ışıklı"];
const NICHES = Object.keys(NICHE_TONE);
const PLATFORMS: Platform[] = ["Instagram", "TikTok", "YouTube", "X", "LinkedIn", "Twitch", "Kick"];
const MIN_FOLLOWERS = 5000;

const ALAN_STEPS = ["İşletme bilgileri", "İlk alan", "Belgeler", "Özet ve onay"];
const INF_STEPS = ["Kişisel bilgiler", "Platformlar", "Ödeme", "İlk paket", "Özet ve onay"];

const inputCls = (bad?: string) => `w-full h-12 rounded-2xl bg-paper px-4 text-[15px] outline-none ring-1 ${bad ? "ring-live" : "ring-transparent"} focus:ring-ink`;
const digits = (s: string) => s.replace(/\D/g, "");
const ibanClean = (s: string) => s.replace(/\s/g, "").toUpperCase();
const ibanFmt = (s: string) => ibanClean(s).replace(/(.{4})/g, "$1 ").trim();

function Field({ id, label, err, hint, children, className = "" }: { id: string; label: string; err?: string; hint?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-1.5 content-start min-w-0 ${className}`}>
      <label htmlFor={id} className="font-display text-[14px] font-medium">{label}</label>
      {children}
      {err ? <span id={id + "-err"} className="text-[13px] text-live">{err}</span> : hint ? <span className="text-[13px] text-muted">{hint}</span> : null}
    </div>
  );
}
const aria = (id: string, err?: string) => ({ "aria-invalid": !!err, "aria-describedby": err ? id + "-err" : undefined });

function Choice({ id, label, value, current, onPick, sub }: { id: string; label: string; value: string; current: string; onPick: (v: string) => void; sub?: string }) {
  const on = current === value;
  return (
    <label htmlFor={id} className={`cursor-pointer rounded-2xl px-4 py-3 ring-1 grid gap-0.5 min-w-0 ${on ? "bg-ink text-white ring-ink" : "bg-paper ring-transparent hover:ring-line"}`}>
      <span className="flex items-center gap-2 font-display text-[15px]">
        <input id={id} type="radio" className="sr-only" checked={on} onChange={() => onPick(value)} />
        <span className={`w-4 h-4 rounded-full ring-2 shrink-0 ${on ? "ring-lime bg-lime" : "ring-line bg-white"}`} />{label}
      </span>
      {sub && <span className={`text-[13px] pl-6 ${on ? "text-white/60" : "text-muted"}`}>{sub}</span>}
    </label>
  );
}

function FilePick({ id, label, hint, multiple, files, onFiles, err }: { id: string; label: string; hint: string; multiple?: boolean; files: string[]; onFiles: (f: string[]) => void; err?: string }) {
  return (
    <div className="grid gap-2 min-w-0">
      <span className="font-display text-[14px] font-medium">{label}</span>
      <label htmlFor={id} className={`cursor-pointer rounded-2xl border-2 border-dashed ${err ? "border-live" : "border-line"} bg-paper p-5 flex items-center gap-4 hover:border-ink`}>
        <span className="grid place-items-center w-11 h-11 rounded-xl bg-white shrink-0"><Icon n={multiple ? "camera" : "layers"} /></span>
        <span className="min-w-0"><b className="font-display font-medium block">Dosya seç</b><span className="text-[13px] text-muted">{hint}</span></span>
        <input id={id} type="file" multiple={multiple} accept="image/*,application/pdf" className="sr-only" {...aria(id, err)}
          onChange={e => { const n = Array.from(e.target.files ?? []).map(f => f.name); if (n.length) onFiles(multiple ? [...files, ...n.filter(x => !files.includes(x))] : n); e.target.value = ""; }} />
      </label>
      {err && <span id={id + "-err"} className="text-[13px] text-live">{err}</span>}
      {files.length > 0 && (
        <ul className="grid gap-1.5">
          {files.map(f => (
            <li key={f} className="flex items-center gap-3 bg-white ring-1 ring-line rounded-xl px-3 py-2 text-[14px]">
              <Icon n="check" className="w-4 h-4 text-mint-ink shrink-0" sw={2.6} /><span className="flex-1 truncate">{f}</span>
              <button type="button" onClick={() => onFiles(files.filter(x => x !== f))} className="text-muted hover:text-ink text-[13px]" aria-label={`${f} dosyasını kaldır`}>Kaldır</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Steps({ steps, at }: { steps: string[]; at: number }) {
  return (
    <ol className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" aria-label="Adımlar">
      {steps.map((s, i) => (
        <li key={s} aria-current={i === at ? "step" : undefined} className={`flex items-center gap-2 rounded-full pl-1.5 pr-4 py-1.5 shrink-0 font-display text-[14px] ${i === at ? "bg-ink text-white" : i < at ? "bg-lime-soft" : "bg-white text-muted"}`}>
          <span className={`grid place-items-center w-7 h-7 rounded-full text-[13px] font-semibold ${i === at ? "bg-lime text-ink" : i < at ? "bg-lime text-ink" : "bg-paper"}`}>{i < at ? <Icon n="check" className="w-3.5 h-3.5" sw={3} /> : i + 1}</span>
          <span className={i === at ? "" : "hidden sm:inline"}>{s}</span>
        </li>
      ))}
    </ol>
  );
}

function SumRow({ k, v }: { k: string; v: ReactNode }) {
  return <div className="flex justify-between gap-4 py-2.5 border-b border-line last:border-0 text-[15px]"><span className="text-muted shrink-0">{k}</span><span className="text-right min-w-0 break-words font-medium">{v}</span></div>;
}

function Terms({ ok, setOk, err }: { ok: boolean; setOk: (b: boolean) => void; err?: string }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor="sj-terms" className={`flex gap-3 items-start rounded-2xl p-4 cursor-pointer ring-1 ${err ? "ring-live" : "ring-transparent"} bg-paper`}>
        <input id="sj-terms" type="checkbox" checked={ok} onChange={e => setOk(e.target.checked)} className="mt-1 w-4 h-4 accent-[#151515] shrink-0" {...aria("sj-terms", err)} />
        <span className="text-[14.5px]">Satıcı sözleşmesini, komisyon oranlarını ve KVKK aydınlatma metnini okudum, kabul ediyorum. Ödemelerin emanette tutulacağını ve yayın kanıtı onaylanınca aktarılacağını biliyorum.</span>
      </label>
      {err && <span id="sj-terms-err" className="text-[13px] text-live">{err}</span>}
      <p className="text-[13px] text-muted">Koşulları <A to="ucretler" className="underline">Ücretler</A> ve <A to="kvkk" className="underline">KVKK</A> sayfalarında görebilirsin. Sözleşme metni örnek metindir, avukat onayından geçecek.</p>
    </div>
  );
}

/* ---------------- Alan sahibi ---------------- */
type AlanForm = { company: string; taxNo: string; city: string; bizType: string; spaceType: string; address: string; district: string; width: string; height: string; light: string; digital: string; price: string; taxDoc: string[]; photos: string[]; terms: boolean };
const ALAN0: AlanForm = { company: "", taxNo: "", city: "", bizType: "", spaceType: "", address: "", district: "", width: "", height: "", light: "", digital: "", price: "", taxDoc: [], photos: [], terms: false };

function validateAlan(step: number, f: AlanForm): Errs {
  const e: Errs = {};
  if (step === 0) {
    if (f.company.trim().length < 3) e.company = "Ticari ünvanı yaz.";
    if (!/^\d{10}$/.test(f.taxNo)) e.taxNo = "Vergi numarası 10 haneli olmalı.";
    if (!f.city) e.city = "Şehir seç.";
    if (!f.bizType) e.bizType = "İşletme tipini seç.";
  }
  if (step === 1) {
    if (!f.spaceType) e.spaceType = "Alan tipini seç.";
    if (f.address.trim().length < 8) e.address = "Alanın açık adresini yaz.";
    if (f.district.trim().length < 2) e.district = "İlçeyi yaz.";
    if (!(Number(f.width) > 0) || !(Number(f.height) > 0)) e.size = "En ve boyu metre cinsinden yaz.";
    if (!f.light) e.light = "Aydınlatma durumunu seç.";
    if (!f.digital) e.digital = "Alanın dijital olup olmadığını seç.";
    if (!(Number(f.price) >= 500)) e.price = "Haftalık fiyat en az ₺500 olmalı.";
  }
  if (step === 2) {
    if (!f.taxDoc.length) e.taxDoc = "Vergi levhasını seç.";
    if (!f.photos.length) e.photos = "En az bir saha fotoğrafı seç.";
  }
  if (step === 3 && !f.terms) e.terms = "Devam etmek için koşulları onayla.";
  return e;
}

function AlanStep({ step, f, set, e }: { step: number; f: AlanForm; set: <K extends keyof AlanForm>(k: K, v: AlanForm[K]) => void; e: Errs }) {
  const txt = (k: keyof AlanForm) => (ev: { target: { value: string } }) => set(k, ev.target.value as never);
  if (step === 0) return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field id="sj-company" label="Ticari ünvan" err={e.company} className="sm:col-span-2"><input id="sj-company" value={f.company} onChange={txt("company")} placeholder="Örn. Kavaklı Açık Hava Reklamcılık A.Ş." className={inputCls(e.company)} {...aria("sj-company", e.company)} /></Field>
      <Field id="sj-taxNo" label="Vergi numarası" err={e.taxNo} hint={`${f.taxNo.length}/10 hane`}>
        <input id="sj-taxNo" inputMode="numeric" maxLength={10} value={f.taxNo} onChange={ev => set("taxNo", digits(ev.target.value).slice(0, 10))} placeholder="0000000000" className={inputCls(e.taxNo) + " tnum"} {...aria("sj-taxNo", e.taxNo)} />
      </Field>
      <Field id="sj-city" label="Şehir" err={e.city}>
        <select id="sj-city" value={f.city} onChange={txt("city")} className={inputCls(e.city)} {...aria("sj-city", e.city)}><option value="">Seç</option>{CITY_LIST.map(c => <option key={c}>{c}</option>)}</select>
      </Field>
      <Field id="sj-bizType" label="İşletme tipi" err={e.bizType} className="sm:col-span-2">
        <select id="sj-bizType" value={f.bizType} onChange={txt("bizType")} className={inputCls(e.bizType)} {...aria("sj-bizType", e.bizType)}><option value="">Seç</option>{BIZ_TYPES.map(c => <option key={c}>{c}</option>)}</select>
      </Field>
    </div>
  );
  if (step === 1) return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field id="sj-spaceType" label="Alan tipi" err={e.spaceType}>
        <select id="sj-spaceType" value={f.spaceType} onChange={txt("spaceType")} className={inputCls(e.spaceType)} {...aria("sj-spaceType", e.spaceType)}><option value="">Seç</option>{Object.values(TYPE_LABEL).map(c => <option key={c}>{c}</option>)}</select>
      </Field>
      <Field id="sj-district" label="İlçe" err={e.district}><input id="sj-district" value={f.district} onChange={txt("district")} placeholder={f.city === "Ankara" ? "Örn. Çankaya" : "Örn. Kadıköy"} className={inputCls(e.district)} {...aria("sj-district", e.district)} /></Field>
      <Field id="sj-address" label="Açık adres" err={e.address} className="sm:col-span-2"><input id="sj-address" value={f.address} onChange={txt("address")} placeholder="Mahalle, cadde, bina no veya kavşak tarifi" className={inputCls(e.address)} {...aria("sj-address", e.address)} /></Field>
      <div className="grid gap-1.5 min-w-0">
        <span className="font-display text-[14px] font-medium">Boyut (metre)</span>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-w-0"><label htmlFor="sj-width" className="sr-only">En (metre)</label><input id="sj-width" type="number" min={0} step={0.1} value={f.width} onChange={txt("width")} placeholder="En" className={inputCls(e.size)} {...aria("sj-size", e.size)} /></div>
          <div className="min-w-0"><label htmlFor="sj-height" className="sr-only">Boy (metre)</label><input id="sj-height" type="number" min={0} step={0.1} value={f.height} onChange={txt("height")} placeholder="Boy" className={inputCls(e.size)} {...aria("sj-size", e.size)} /></div>
        </div>
        {e.size && <span id="sj-size-err" className="text-[13px] text-live">{e.size}</span>}
      </div>
      <Field id="sj-price" label="Haftalık fiyat (₺)" err={e.price} hint={Number(f.price) > 0 ? `Aylık yaklaşık ${tl(Math.round(Number(f.price) * 52 / 12))}` : "KDV hariç"}>
        <input id="sj-price" type="number" min={0} step={100} value={f.price} onChange={txt("price")} placeholder="Örn. 12000" className={inputCls(e.price)} {...aria("sj-price", e.price)} />
      </Field>
      <fieldset className="grid gap-2 min-w-0 sm:col-span-2">
        <legend className="font-display text-[14px] font-medium mb-1.5">Aydınlatma</legend>
        <div className="grid sm:grid-cols-3 gap-2">{LIGHTS.map((l, i) => <Choice key={l} id={`sj-light-${i}`} label={l} value={l} current={f.light} onPick={v => set("light", v)} />)}</div>
        {e.light && <span className="text-[13px] text-live">{e.light}</span>}
      </fieldset>
      <fieldset className="grid gap-2 min-w-0 sm:col-span-2">
        <legend className="font-display text-[14px] font-medium mb-1.5">Dijital mi?</legend>
        <div className="grid sm:grid-cols-2 gap-2">
          <Choice id="sj-digital-yes" label="Evet, dijital ekran" sub="Spot ve döngü bazlı satış açılır" value="evet" current={f.digital} onPick={v => set("digital", v)} />
          <Choice id="sj-digital-no" label="Hayır, baskılı" sub="Baskı ve montaj takvimi eklenir" value="hayir" current={f.digital} onPick={v => set("digital", v)} />
        </div>
        {e.digital && <span className="text-[13px] text-live">{e.digital}</span>}
      </fieldset>
    </div>
  );
  if (step === 2) return (
    <div className="grid gap-5">
      <FilePick id="sj-taxDoc" label="Vergi levhası" hint="PDF veya fotoğraf, tek dosya" files={f.taxDoc} onFiles={v => set("taxDoc", v)} err={e.taxDoc} />
      <FilePick id="sj-photos" label="Saha fotoğrafları" hint="Alanı uzaktan ve yakından gösteren fotoğraflar, birden çok seçebilirsin" multiple files={f.photos} onFiles={v => set("photos", v)} err={e.photos} />
      <p className="text-[13px] text-muted">Prototipte dosyalar yüklenmez, yalnızca adları listelenir.</p>
    </div>
  );
  return (
    <div className="grid gap-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-paper rounded-2xl p-4 min-w-0"><b className="font-display font-medium">İşletme</b>
          <SumRow k="Ünvan" v={f.company} /><SumRow k="Vergi no" v={f.taxNo} /><SumRow k="Şehir" v={f.city} /><SumRow k="Tip" v={f.bizType} />
        </div>
        <div className="bg-paper rounded-2xl p-4 min-w-0"><b className="font-display font-medium">İlk alan</b>
          <SumRow k="Alan tipi" v={f.spaceType} /><SumRow k="Konum" v={`${f.district}, ${f.city}`} /><SumRow k="Boyut" v={`${f.width} × ${f.height} m`} />
          <SumRow k="Aydınlatma" v={f.light} /><SumRow k="Dijital" v={f.digital === "evet" ? "Evet" : "Hayır"} /><SumRow k="Haftalık fiyat" v={tl(Number(f.price))} />
        </div>
      </div>
      <div className="bg-paper rounded-2xl p-4"><b className="font-display font-medium">Belgeler</b><SumRow k="Vergi levhası" v={f.taxDoc.join(", ")} /><SumRow k="Saha fotoğrafı" v={`${f.photos.length} dosya`} /></div>
      <Terms ok={f.terms} setOk={b => set("terms", b)} err={e.terms} />
    </div>
  );
}

/* ---------------- Influencer ---------------- */
type Row = { id: number; p: Platform | ""; followers: string; eng: string };
type InfForm = { name: string; handle: string; city: string; niche: string; rows: Row[]; payType: string; holder: string; iban: string; pkName: string; pkDesc: string; pkPrice: string; pkDays: string; terms: boolean };
const INF0: InfForm = { name: "", handle: "", city: "", niche: "", rows: [{ id: 1, p: "", followers: "", eng: "" }], payType: "", holder: "", iban: "", pkName: "", pkDesc: "", pkPrice: "", pkDays: "", terms: false };
const totalFollowers = (rows: Row[]) => rows.reduce((s, r) => s + (Number(digits(r.followers)) || 0), 0);

function validateInf(step: number, f: InfForm): Errs {
  const e: Errs = {};
  if (step === 0) {
    if (f.name.trim().length < 3) e.name = "Adını ve soyadını yaz.";
    if (!/^@?[a-zA-Z0-9._]{3,30}$/.test(f.handle.trim())) e.handle = "Kullanıcı adı 3–30 karakter; harf, rakam, nokta ve alt çizgi içerebilir.";
    if (!f.city) e.city = "Şehir seç.";
    if (!f.niche) e.niche = "Kategori seç.";
  }
  if (step === 1) {
    const seen = new Set<string>();
    f.rows.forEach(r => {
      if (!r.p) e[`p-${r.id}`] = "Platform seç.";
      else if (seen.has(r.p)) e[`p-${r.id}`] = "Bu platform zaten ekli.";
      else seen.add(r.p);
      if (!(Number(digits(r.followers)) > 0)) e[`f-${r.id}`] = "Takipçi sayısını yaz.";
      const g = Number(r.eng.replace(",", "."));
      if (r.eng === "" || isNaN(g) || g < 0 || g > 100) e[`e-${r.id}`] = "0 ile 100 arası yaz.";
    });
    if (totalFollowers(f.rows) < MIN_FOLLOWERS) e.total = `Toplam takipçin ${MIN_FOLLOWERS.toLocaleString("tr-TR")} altında. Martrin'e katılmak için en az ${MIN_FOLLOWERS.toLocaleString("tr-TR")} takipçi gerekiyor.`;
  }
  if (step === 2) {
    if (!f.payType) e.payType = "Ödeme tipini seç.";
    if (f.holder.trim().length < 3) e.holder = "Hesap sahibinin adını yaz.";
    const ib = ibanClean(f.iban);
    if (!ib.startsWith("TR")) e.iban = "IBAN TR ile başlamalı.";
    else if (ib.length !== 26) e.iban = `IBAN 26 karakter olmalı, şu an ${ib.length}.`;
    else if (!/^TR\d{24}$/.test(ib)) e.iban = "TR'den sonra yalnızca rakam olmalı.";
  }
  if (step === 3) {
    if (f.pkName.trim().length < 3) e.pkName = "Paket adını yaz.";
    if (f.pkDesc.trim().length < 10) e.pkDesc = "Pakette neler olduğunu kısaca anlat (en az 10 karakter).";
    if (!(Number(f.pkPrice) >= 500)) e.pkPrice = "Fiyat en az ₺500 olmalı.";
    const d = Number(f.pkDays);
    if (!Number.isInteger(d) || d < 1 || d > 90) e.pkDays = "1 ile 90 gün arası yaz.";
  }
  if (step === 4 && !f.terms) e.terms = "Devam etmek için koşulları onayla.";
  return e;
}

function InfStep({ step, f, set, e }: { step: number; f: InfForm; set: <K extends keyof InfForm>(k: K, v: InfForm[K]) => void; e: Errs }) {
  const txt = (k: keyof InfForm) => (ev: { target: { value: string } }) => set(k, ev.target.value as never);
  const total = totalFollowers(f.rows);
  const setRow = (id: number, patch: Partial<Row>) => set("rows", f.rows.map(r => r.id === id ? { ...r, ...patch } : r));
  const used = f.rows.map(r => r.p);

  if (step === 0) return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field id="sj-name" label="Ad soyad" err={e.name}><input id="sj-name" value={f.name} onChange={txt("name")} autoComplete="name" className={inputCls(e.name)} {...aria("sj-name", e.name)} /></Field>
      <Field id="sj-handle" label="Kullanıcı adı" err={e.handle}><input id="sj-handle" value={f.handle} onChange={txt("handle")} placeholder="@kullaniciadi" className={inputCls(e.handle)} {...aria("sj-handle", e.handle)} /></Field>
      <Field id="sj-icity" label="Şehir" err={e.city}>
        <select id="sj-icity" value={f.city} onChange={txt("city")} className={inputCls(e.city)} {...aria("sj-icity", e.city)}><option value="">Seç</option>{CITY_LIST.map(c => <option key={c}>{c}</option>)}</select>
      </Field>
      <Field id="sj-niche" label="Kategori" err={e.niche}>
        <select id="sj-niche" value={f.niche} onChange={txt("niche")} className={inputCls(e.niche)} {...aria("sj-niche", e.niche)}><option value="">Seç</option>{NICHES.map(c => <option key={c}>{c}</option>)}</select>
      </Field>
    </div>
  );
  if (step === 1) return (
    <div className="grid gap-4">
      <p className="text-[15px] text-muted">Önce beyan ettiğin sayıları yaz. Onaydan sonra ekran görüntüsü isteriz, ardından hesabını API ile bağlarsın.</p>
      {f.rows.map((r, i) => (
        <div key={r.id} className="bg-paper rounded-2xl p-4 grid sm:grid-cols-[1.2fr_1fr_.8fr_auto] gap-3 items-start">
          <Field id={`sj-p-${r.id}`} label={`Platform ${i + 1}`} err={e[`p-${r.id}`]}>
            <div className="flex gap-2 items-center">
              {r.p && <Social p={r.p} className="shrink-0" />}
              <select id={`sj-p-${r.id}`} value={r.p} onChange={ev => setRow(r.id, { p: ev.target.value as Platform })} className={inputCls(e[`p-${r.id}`]).replace("bg-paper", "bg-white")} {...aria(`sj-p-${r.id}`, e[`p-${r.id}`])}>
                <option value="">Seç</option>
                {PLATFORMS.map(p => <option key={p} value={p} disabled={p !== r.p && used.includes(p)}>{p}</option>)}
              </select>
            </div>
          </Field>
          <Field id={`sj-f-${r.id}`} label="Takipçi" err={e[`f-${r.id}`]}>
            <input id={`sj-f-${r.id}`} inputMode="numeric" value={r.followers} onChange={ev => { const d = digits(ev.target.value); setRow(r.id, { followers: d ? Number(d).toLocaleString("tr-TR") : "" }); }} placeholder="Örn. 24.500" className={inputCls(e[`f-${r.id}`]).replace("bg-paper", "bg-white") + " tnum"} {...aria(`sj-f-${r.id}`, e[`f-${r.id}`])} />
          </Field>
          <Field id={`sj-e-${r.id}`} label="Etkileşim %" err={e[`e-${r.id}`]}>
            <input id={`sj-e-${r.id}`} inputMode="decimal" value={r.eng} onChange={ev => setRow(r.id, { eng: ev.target.value.replace(/[^\d.,]/g, "") })} placeholder="Örn. 4,2" className={inputCls(e[`e-${r.id}`]).replace("bg-paper", "bg-white") + " tnum"} {...aria(`sj-e-${r.id}`, e[`e-${r.id}`])} />
          </Field>
          <button type="button" disabled={f.rows.length === 1} onClick={() => set("rows", f.rows.filter(x => x.id !== r.id))} className="sm:mt-[26px] h-12 px-4 rounded-2xl bg-white text-[14px] font-display disabled:opacity-40" aria-label={`Platform ${i + 1} satırını sil`}>Sil</button>
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" disabled={f.rows.length >= PLATFORMS.length} onClick={() => set("rows", [...f.rows, { id: Math.max(...f.rows.map(r => r.id)) + 1, p: "", followers: "", eng: "" }])} className="h-11 px-5 rounded-2xl ring-1 ring-ink font-display text-[15px] disabled:opacity-40">+ Platform ekle</button>
        <span className="font-display text-[15px]">Toplam takipçi: <b className="tnum text-[18px]">{total.toLocaleString("tr-TR")}</b></span>
      </div>
      {total < MIN_FOLLOWERS && (
        <div role="alert" className="flex gap-3 items-start rounded-2xl bg-rose-soft text-rose-ink p-4 text-[14.5px]">
          <Icon n="bell" className="w-5 h-5 shrink-0 mt-0.5" />
          <span>Toplam takipçin {MIN_FOLLOWERS.toLocaleString("tr-TR")} altında{total > 0 ? ` (${(MIN_FOLLOWERS - total).toLocaleString("tr-TR")} eksik)` : ""}. Bu sınırı geçene kadar devam edemezsin.</span>
        </div>
      )}
    </div>
  );
  if (step === 2) return (
    <div className="grid gap-4">
      <fieldset className="grid gap-2 min-w-0">
        <legend className="font-display text-[14px] font-medium mb-1.5">Ödemeyi nasıl alacaksın?</legend>
        <div className="grid md:grid-cols-2 gap-2">
          <Choice id="sj-pay-fatura" label="Şirket / şahıs firması (faturalı)" sub="Her iş için faturayı sen kesersin. Martrin yalnızca komisyon faturası keser." value="fatura" current={f.payType} onPick={v => set("payType", v)} />
          <Choice id="sj-pay-istisna" label="Sosyal içerik üreticisi istisna hesabı" sub="Fatura kesmeden, bankada açtırdığın istisna hesabına ödeme alırsın." value="istisna" current={f.payType} onPick={v => set("payType", v)} />
        </div>
        {e.payType && <span className="text-[13px] text-live">{e.payType}</span>}
      </fieldset>
      {f.payType === "istisna" && <p className="text-[13px] text-muted bg-sky-soft text-sky-ink rounded-2xl p-3">İstisna yalnızca bu amaçla açılmış banka hesabına yapılan ödemelerde geçerlidir. Aşağıya o hesabın IBAN'ını yaz.</p>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="sj-holder" label="Hesap sahibi" err={e.holder}><input id="sj-holder" value={f.holder} onChange={txt("holder")} placeholder="Hesaptaki ad veya ünvan" className={inputCls(e.holder)} {...aria("sj-holder", e.holder)} /></Field>
        <Field id="sj-iban" label="IBAN" err={e.iban} hint={`${ibanClean(f.iban).length}/26 karakter · gerçek IBAN yazma, bu bir prototip`}>
          <input id="sj-iban" value={f.iban} onChange={ev => set("iban", ibanFmt(ev.target.value).slice(0, 32))} placeholder="TR00 0000 0000 0000 0000 0000 00" autoComplete="off" className={inputCls(e.iban) + " tnum uppercase"} {...aria("sj-iban", e.iban)} />
        </Field>
      </div>
    </div>
  );
  if (step === 3) return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Field id="sj-pkName" label="Paket adı" err={e.pkName}><input id="sj-pkName" value={f.pkName} onChange={txt("pkName")} placeholder="Örn. 1 Reels + 3 Story" className={inputCls(e.pkName)} {...aria("sj-pkName", e.pkName)} /></Field>
      <div className="grid grid-cols-2 gap-4 min-w-0">
        <Field id="sj-pkPrice" label="Fiyat (₺)" err={e.pkPrice}><input id="sj-pkPrice" type="number" min={0} step={100} value={f.pkPrice} onChange={txt("pkPrice")} placeholder="Örn. 15000" className={inputCls(e.pkPrice)} {...aria("sj-pkPrice", e.pkPrice)} /></Field>
        <Field id="sj-pkDays" label="Teslim (gün)" err={e.pkDays}><input id="sj-pkDays" type="number" min={1} max={90} value={f.pkDays} onChange={txt("pkDays")} placeholder="Örn. 7" className={inputCls(e.pkDays)} {...aria("sj-pkDays", e.pkDays)} /></Field>
      </div>
      <Field id="sj-pkDesc" label="Açıklama" err={e.pkDesc} className="sm:col-span-2">
        <textarea id="sj-pkDesc" rows={4} value={f.pkDesc} onChange={txt("pkDesc")} placeholder="Ne çekeceksin, kaç paylaşım, link veya indirim kodu var mı?" className={`w-full rounded-2xl bg-paper px-4 py-3 text-[15px] outline-none ring-1 ${e.pkDesc ? "ring-live" : "ring-transparent"} focus:ring-ink resize-y`} {...aria("sj-pkDesc", e.pkDesc)} />
      </Field>
      {Number(f.pkPrice) > 0 && <p className="sm:col-span-2 text-[14px] text-muted">%15 komisyon sonrası eline geçecek tutar: <b className="text-ink tnum">{tl(Math.round(Number(f.pkPrice) * 0.85))}</b></p>}
    </div>
  );
  return (
    <div className="grid gap-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-paper rounded-2xl p-4 min-w-0"><b className="font-display font-medium">Profil</b>
          <SumRow k="Ad" v={f.name} /><SumRow k="Kullanıcı adı" v={f.handle.startsWith("@") ? f.handle : "@" + f.handle} /><SumRow k="Şehir" v={f.city} /><SumRow k="Kategori" v={f.niche} />
        </div>
        <div className="bg-paper rounded-2xl p-4 min-w-0"><b className="font-display font-medium">Platformlar</b>
          {f.rows.map(r => <SumRow key={r.id} k={r.p || "-"} v={`${r.followers} · %${r.eng}`} />)}
          <SumRow k="Toplam" v={total.toLocaleString("tr-TR")} />
        </div>
        <div className="bg-paper rounded-2xl p-4 min-w-0"><b className="font-display font-medium">Ödeme</b>
          <SumRow k="Tip" v={f.payType === "fatura" ? "Faturalı" : "İstisna hesabı"} /><SumRow k="Hesap sahibi" v={f.holder} /><SumRow k="IBAN" v={ibanFmt(f.iban).slice(0, 7) + " •••• " + ibanClean(f.iban).slice(-4)} />
        </div>
        <div className="bg-paper rounded-2xl p-4 min-w-0"><b className="font-display font-medium">İlk paket</b>
          <SumRow k="Ad" v={f.pkName} /><SumRow k="Fiyat" v={tl(Number(f.pkPrice))} /><SumRow k="Teslim" v={`${f.pkDays} gün`} />
        </div>
      </div>
      <Terms ok={f.terms} setOk={b => set("terms", b)} err={e.terms} />
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function SellerJoin() {
  const [mode, setMode] = useState<Mode | null>(modeFromHash);
  const [step, setStep] = useState(0);
  const [errs, setErrs] = useState<Errs>({});
  const [done, setDone] = useState(false);
  const [alan, setAlan] = useState<AlanForm>(ALAN0);
  const [inf, setInf] = useState<InfForm>(INF0);

  useEffect(() => {
    const on = () => {
      if (!location.hash.toLowerCase().startsWith("#satici-ol")) return;
      const m = modeFromHash();
      if (m) { setMode(m); setStep(0); setErrs({}); setDone(false); }
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  const steps = mode === "inf" ? INF_STEPS : ALAN_STEPS;
  const last = step === steps.length - 1;
  const pick = (m: Mode) => { setMode(m); setStep(0); setErrs({}); setDone(false); };
  const setA = <K extends keyof AlanForm>(k: K, v: AlanForm[K]) => { setAlan(p => ({ ...p, [k]: v })); setErrs(p => { const n = { ...p }; delete n[k as string]; if (k === "width" || k === "height") delete n.size; return n; }); };
  const setI = <K extends keyof InfForm>(k: K, v: InfForm[K]) => { setInf(p => ({ ...p, [k]: v })); setErrs(p => { const n = { ...p }; delete n[k as string]; if (k === "rows") return {}; return n; }); };

  const next = (ev: FormEvent) => {
    ev.preventDefault();
    const e = mode === "inf" ? validateInf(step, inf) : validateAlan(step, alan);
    setErrs(e);
    if (Object.keys(e).length) {
      setTimeout(() => document.querySelector<HTMLElement>("form [aria-invalid='true']")?.focus(), 0);
      return;
    }
    if (last) { setDone(true); window.scrollTo({ top: 0 }); }
    else { setStep(s => s + 1); window.scrollTo({ top: 0 }); }
  };
  const back = () => { setErrs({}); if (step === 0) setMode(null); else setStep(s => s - 1); window.scrollTo({ top: 0 }); };

  if (done && mode) return (
    <Page>
      <div className="max-w-[720px] mx-auto bg-white rounded-card p-6 md:p-10 grid gap-6 justify-items-center text-center" role="status">
        <span className="grid place-items-center w-16 h-16 rounded-2xl bg-lime"><Icon n="check" className="w-8 h-8" sw={2.6} /></span>
        <div className="grid gap-2">
          <h1 className="font-display font-semibold tracking-tight text-[30px] md:text-[38px] leading-none">Başvurun incelemede</h1>
          <p className="text-muted text-[17px] max-w-[48ch]">Ekibimiz {mode === "inf" ? "profilini ve takipçi beyanını" : "işletme belgelerini ve saha fotoğraflarını"} 1–2 iş günü içinde kontrol eder. Sonucu bildirimle ve e-postayla iletiriz.</p>
        </div>
        <div className="w-full grid sm:grid-cols-3 gap-3 text-left">
          {(mode === "inf"
            ? [["Başvuru", "Alındı"], ["Takipçi kontrolü", "Ekran görüntüsü istenecek"], ["İlk paket", inf.pkName]]
            : [["Başvuru", "Alındı"], ["Belge kontrolü", "1–2 iş günü"], ["İlk alan", `${alan.spaceType} · ${alan.district}`]]
          ).map(([k, v], i) => (
            <div key={k} className={`rounded-2xl p-4 min-w-0 ${i === 0 ? "bg-lime-soft" : "bg-paper"}`}><span className="text-[13px] text-muted">{k}</span><b className="block font-display font-medium truncate">{v}</b></div>
          ))}
        </div>
        <A to="panel-satici" className="h-12 px-6 rounded-2xl bg-ink text-white grid place-items-center font-display font-medium">Satıcı paneline git</A>
      </div>
    </Page>
  );

  if (!mode) return (
    <Page>
      <div className="grid justify-items-center text-center gap-4 pt-4 pb-10">
        <p className="text-[14px] text-muted">Martrin'de satıcı ol</p>
        <h1 className="font-display font-semibold tracking-tight text-[34px] md:text-[44px] leading-none max-w-[18ch] text-balance">Ne <span className="pill-word">satmak</span> istiyorsun?</h1>
        <p className="text-muted text-[17px] max-w-[52ch]">Kayıt ücretsiz. Yalnızca iş tamamlanıp ödeme sana aktarılınca komisyon kesilir.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5 max-w-[1000px] mx-auto">
        {([
          { m: "alan" as Mode, t: "Alanımı listelemek istiyorum", d: "Billboard, megalight, durak panosu, AVM ekranı veya stant. Takvimini aç, emanetli ödemeyle sat.", img: "v2/c1.jpg", alt: "İstanbul'da bina cephesinde billboard", rate: "%6–%10 komisyon", dark: false },
          { m: "inf" as Mode, t: "Influencer olarak katılmak istiyorum", d: "Instagram, TikTok, YouTube ve diğer kanallarda paketlerini yayınla. En az 5.000 toplam takipçi gerekir.", img: "v2/c2.jpg", alt: "Ring light önünde çekim yapan içerik üreticisi", rate: "%15 komisyon", dark: true },
        ]).map(c => (
          <button key={c.m} type="button" onClick={() => pick(c.m)} className={`text-left rounded-card p-2 grid group ${c.dark ? "bg-ink text-white" : "bg-white"}`}>
            <Img src={c.img} alt={c.alt} className="w-full h-48 md:h-56 rounded-[22px]" />
            <div className="p-5 grid gap-3">
              <b className="font-display font-semibold text-[22px] tracking-tight">{c.t}</b>
              <span className={`text-[15px] ${c.dark ? "text-white/70" : "text-muted"}`}>{c.d}</span>
              <span className="flex items-center justify-between gap-3 mt-1">
                <span className={`text-[13px] font-display rounded-full px-3 py-1 ${c.dark ? "bg-white/10" : "bg-paper"}`}>{c.rate}</span>
                <span className="grid place-items-center w-11 h-11 rounded-full bg-lime text-ink group-hover:translate-x-0.5 transition"><Icon n="right" /></span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </Page>
  );

  return (
    <Page>
      <div className="max-w-[880px] mx-auto grid gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-2 min-w-0">
            <p className="text-[14px] text-muted">{mode === "inf" ? "Influencer kaydı" : "Alan sahibi kaydı"} · Adım {step + 1}/{steps.length}</p>
            <h1 className="font-display font-semibold tracking-tight text-[30px] md:text-[40px] leading-none">{steps[step]}</h1>
          </div>
          <button type="button" onClick={() => pick(mode === "inf" ? "alan" : "inf")} className="text-[14px] underline text-muted hover:text-ink">{mode === "inf" ? "Alan sahibi olarak katıl" : "Influencer olarak katıl"}</button>
        </div>
        <Steps steps={steps} at={step} />
        <form onSubmit={next} noValidate className="bg-white rounded-card p-5 md:p-8 grid gap-6">
          {mode === "inf" ? <InfStep step={step} f={inf} set={setI} e={errs} /> : <AlanStep step={step} f={alan} set={setA} e={errs} />}
          {errs.total && <p className="text-[13px] text-live">{errs.total}</p>}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-line">
            <button type="button" onClick={back} className="h-12 px-5 rounded-2xl ring-1 ring-line font-display font-medium hover:ring-ink">{step === 0 ? "Seçime dön" : "Geri"}</button>
            <button type="submit" className={`h-12 px-6 rounded-2xl font-display font-medium flex items-center gap-2 ${last ? "bg-lime text-ink" : "bg-ink text-white"}`}>
              {last ? "Başvuruyu gönder" : "İleri"}{!last && <Icon n="right" className="w-4 h-4" />}
            </button>
          </div>
        </form>
        <div className="flex items-center gap-3 text-[13px] text-muted">
          <LogoMark className="w-7 h-7 shrink-0" />
          <span>Bilgilerin yalnızca başvuruyu değerlendirmek için kullanılır. Ödemeler lisanslı ödeme kuruluşu üzerinden emanette tutulur.</span>
        </div>
      </div>
    </Page>
  );
}
