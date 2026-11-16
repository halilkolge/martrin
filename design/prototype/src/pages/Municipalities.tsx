import { useState, type FormEvent, type ReactNode } from "react";
import { tl } from "../data";
import { A, Badge, Icon, Img, LogoMark, Page } from "../ui";

const RATE = 6;

const MODELS = [
  { tag: "Model 1", title: "Doğrudan belediye hesabı", tone: "bg-white", chip: "bg-lime-soft",
    d: "Belediye kendi reklam noktalarını Martrin'de açar. Fiyatı, takvimi ve onayı belediye ekibi yönetir.",
    feats: ["Kurumsal hesap, birim bazlı yetki", "Gelir doğrudan belediye hesabına aktarılır", "Kamusal duyuru kotası belediye elinde", "Meclis ve denetim için dışa aktarılabilir rapor"] },
  { tag: "Model 2", title: "İhaleyi kazanmış işletici şirket", tone: "bg-ink text-white", chip: "bg-white/10",
    d: "Reklam noktalarının işletme hakkını ihaleyle alan şirket envanteri listeler. Belediye salt okunur izleme hesabıyla süreci görür.",
    feats: ["Şirket satıcı hesabı, toplu envanter yükleme", "Belediyeye gözlemci erişimi", "Sözleşmedeki pay oranına göre raporlama", "İhale şartnamesi alanlarını kayda ekleme"] },
];

const BENEFITS = [
  { icon: "calendar", t: "Şeffaf doluluk", d: "Her noktanın hangi hafta dolu olduğunu herkes aynı takvimde görür. Boş kalan haftalar kendiliğinden öne çıkar." },
  { icon: "shield", t: "Emanetli tahsilat", d: "Reklam veren ödemeyi baştan yapar. Para lisanslı ödeme kuruluşunda emanette bekler, yayın onaylanınca aktarılır." },
  { icon: "camera", t: "Kanıtlı yayın", d: "Montajdan sonra tarih damgalı, konumlu fotoğraf ve video yüklenir. Reklam veren 72 saat içinde itiraz etmezse iş onaylanır." },
  { icon: "layers", t: "Raporlama", d: "Nokta, ilçe ve dönem bazında doluluk ve gelir raporu. Excel ve PDF olarak indirilebilir." },
];

const STATS = [
  { k: "Nokta", v: "214", s: "CLP, megalight ve dijital ekran" },
  { k: "Ortalama doluluk", v: "%71", s: "İlk 6 ayda %48'den yükseldi" },
  { k: "Aylık net gelir", v: tl(1_184_000), s: "Komisyon düşülmüş" },
  { k: "Kamusal duyuru", v: "1.920", s: "Ücretsiz yayın haftası / yıl" },
];

const TYPES = [
  { k: "clp", l: "CLP (raket)", p: 3500 },
  { k: "megalight", l: "Megalight", p: 9000 },
  { k: "dijital", l: "Dijital ekran", p: 6500 },
] as const;
type TypeKey = typeof TYPES[number]["k"];

const ORG_TYPES = ["Büyükşehir belediyesi", "İlçe belediyesi", "Belde belediyesi", "Belediye iştiraki", "İşletici şirket (ihale)"];

type Form = { org: string; orgType: string; name: string; title: string; email: string; phone: string; points: string; msg: string };
const EMPTY: Form = { org: "", orgType: "", name: "", title: "", email: "", phone: "", points: "", msg: "" };

const inputCls = (bad?: string) => `w-full h-12 rounded-2xl bg-paper px-4 text-[15px] outline-none ring-1 ${bad ? "ring-live" : "ring-transparent"} focus:ring-ink`;

function Field({ id, label, err, children }: { id: string; label: string; err?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5 min-w-0">
      <label htmlFor={id} className="font-display text-[14px] font-medium">{label}</label>
      {children}
      {err && <span id={id + "-err"} className="text-[13px] text-live">{err}</span>}
    </div>
  );
}

function Calculator() {
  const [points, setPoints] = useState(40);
  const [type, setType] = useState<TypeKey>("clp");
  const [price, setPrice] = useState(3500);
  const [occ, setOcc] = useState(60);

  const pickType = (k: TypeKey) => { setType(k); setPrice(TYPES.find(t => t.k === k)!.p); };
  const yearGross = points * price * 52 * (occ / 100);
  const yearNet = Math.round(yearGross * (1 - RATE / 100));
  const monthNet = Math.round(yearNet / 12);
  const monthFee = Math.round(yearGross * RATE / 100 / 12);

  return (
    <section id="gelir" className="mt-12 grid lg:grid-cols-[1.15fr_1fr] gap-5">
      <div className="bg-white rounded-card p-6 md:p-8 grid gap-6 content-start min-w-0">
        <div>
          <p className="text-[14px] text-muted">Gelir tahmini</p>
          <h2 className="font-display font-semibold text-[26px] md:text-[30px] tracking-tight mt-1">Noktaların ne kadar kazandırır?</h2>
          <p className="text-muted text-[15px] mt-1">Değerleri değiştir, tahmin anında güncellenir.</p>
        </div>

        <div className="grid gap-2">
          <span className="font-display text-[14px] font-medium" id="calc-type-label">Nokta tipi</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="radiogroup" aria-labelledby="calc-type-label">
            {TYPES.map(t => (
              <button key={t.k} type="button" role="radio" aria-checked={type === t.k} onClick={() => pickType(t.k)}
                className={`rounded-2xl px-4 py-3 text-left font-display text-[15px] ring-1 ${type === t.k ? "bg-ink text-white ring-ink" : "bg-paper ring-transparent hover:ring-line"}`}>
                {t.l}<span className={`block text-[12.5px] mt-0.5 ${type === t.k ? "text-white/60" : "text-muted"}`}>ort. {tl(t.p)} / hafta</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field id="calc-points" label="Nokta sayısı">
            <input id="calc-points" type="number" min={1} max={5000} value={points}
              onChange={e => setPoints(Math.max(0, Math.min(5000, Number(e.target.value) || 0)))} className={inputCls()} />
          </Field>
          <Field id="calc-price" label="Ortalama haftalık fiyat (₺)">
            <input id="calc-price" type="number" min={0} step={250} value={price}
              onChange={e => setPrice(Math.max(0, Number(e.target.value) || 0))} className={inputCls()} />
          </Field>
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-baseline">
            <label htmlFor="calc-occ" className="font-display text-[14px] font-medium">Doluluk oranı</label>
            <span className="font-display font-semibold text-[20px] tnum">%{occ}</span>
          </div>
          <input id="calc-occ" type="range" min={0} max={100} step={5} value={occ} onChange={e => setOcc(Number(e.target.value))} className="w-full accent-[#151515]" />
          <div className="flex justify-between text-[12.5px] text-muted"><span>%0</span><span>Pilot belediyelerde ortalama %71</span><span>%100</span></div>
        </div>
      </div>

      <div className="bg-lime rounded-card p-6 md:p-8 grid gap-5 content-start min-w-0">
        <div className="flex items-center justify-between gap-3">
          <b className="font-display font-semibold text-[20px] tracking-tight">Tahmini net gelir</b>
          <span className="bg-ink text-lime text-[12px] font-display rounded-full px-3 py-1">%{RATE} komisyon düşüldü</span>
        </div>
        <div className="grid gap-1">
          <span className="text-[14px] text-ink/70">Aylık</span>
          <span className="font-display font-semibold text-[40px] md:text-[52px] tracking-tight leading-none tnum break-all" aria-live="polite">{tl(monthNet)}</span>
        </div>
        <div className="bg-white/60 rounded-2xl p-4 grid gap-2 text-[15px]">
          <div className="flex justify-between gap-3"><span>Yıllık net</span><b className="font-display tnum">{tl(yearNet)}</b></div>
          <div className="flex justify-between gap-3"><span>Yıllık brüt satış</span><span className="tnum">{tl(Math.round(yearGross))}</span></div>
          <div className="flex justify-between gap-3"><span>Aylık Martrin komisyonu</span><span className="tnum">{tl(monthFee)}</span></div>
          <div className="flex justify-between gap-3"><span>Ayda satılan nokta-hafta</span><span className="tnum">{Math.round(points * 52 / 12 * occ / 100).toLocaleString("tr-TR")}</span></div>
        </div>
        <p className="text-[13px] text-ink/70">Tahmin yılı 52 hafta sayar. KDV, ihale payı ve kamusal duyuru haftaları dahil değildir.</p>
        <a href="#basvuru" onClick={e => { e.preventDefault(); document.getElementById("basvuru")?.scrollIntoView({ behavior: "smooth" }); }}
          className="h-12 rounded-2xl bg-ink text-white grid place-items-center font-display font-medium">Bu tahminle başvur</a>
      </div>
    </section>
  );
}

function Apply() {
  const [f, setF] = useState<Form>(EMPTY);
  const [err, setErr] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof Form) => (e: { target: { value: string } }) => { setF(p => ({ ...p, [k]: e.target.value })); setErr(p => ({ ...p, [k]: undefined })); };

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (f.org.trim().length < 3) e.org = "Kurum adını yaz.";
    if (!f.orgType) e.orgType = "Kurum tipini seç.";
    if (f.name.trim().length < 3) e.name = "Yetkilinin adını ve soyadını yaz.";
    if (f.title.trim().length < 2) e.title = "Unvanı yaz.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Geçerli bir e-posta adresi yaz.";
    if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Telefonu alan koduyla birlikte yaz.";
    const n = Number(f.points);
    if (!f.points || !Number.isInteger(n) || n < 1) e.points = "Nokta sayısını 1 veya daha büyük bir tam sayı olarak yaz.";
    return e;
  };
  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErr(e);
    if (Object.keys(e).length === 0) setSent(true);
    else document.getElementById("m-" + Object.keys(e)[0])?.focus();
  };

  if (sent) return (
    <div className="bg-white rounded-card p-6 md:p-10 grid gap-5 justify-items-start" role="status">
      <span className="grid place-items-center w-14 h-14 rounded-2xl bg-lime"><Icon n="check" className="w-7 h-7" sw={2.6} /></span>
      <div>
        <h3 className="font-display font-semibold text-[28px] tracking-tight">Başvurun alındı</h3>
        <p className="text-muted text-[16px] mt-1 max-w-[52ch]">{f.org} için kamu ekibimiz 2 iş günü içinde {f.email} adresine yazacak. Görüşmede envanter listesi şablonunu ve örnek sözleşmeyi paylaşırız.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-3 w-full">
        {[["Kurum", f.org], ["Kurum tipi", f.orgType], ["Nokta", Number(f.points).toLocaleString("tr-TR")]].map(([k, v]) => (
          <div key={k} className="bg-paper rounded-2xl p-4 min-w-0"><span className="text-[13px] text-muted">{k}</span><b className="block font-display font-medium text-[16px] truncate">{v}</b></div>
        ))}
      </div>
      <button type="button" onClick={() => { setF(EMPTY); setSent(false); }} className="h-12 px-6 rounded-2xl bg-ink text-white font-display font-medium">Yeni başvuru</button>
    </div>
  );

  const e = err;
  const aria = (k: keyof Form) => ({ "aria-invalid": !!e[k], "aria-describedby": e[k] ? `m-${k}-err` : undefined });
  return (
    <form onSubmit={submit} noValidate className="bg-white rounded-card p-6 md:p-8 grid gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field id="m-org" label="Kurum adı" err={e.org}><input id="m-org" value={f.org} onChange={set("org")} placeholder="Örn. Yeşilvadi Belediyesi" className={inputCls(e.org)} {...aria("org")} /></Field>
        <Field id="m-orgType" label="Kurum tipi" err={e.orgType}>
          <select id="m-orgType" value={f.orgType} onChange={set("orgType")} className={inputCls(e.orgType)} {...aria("orgType")}>
            <option value="">Seç</option>
            {ORG_TYPES.map(o => <option key={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="m-name" label="Yetkili adı soyadı" err={e.name}><input id="m-name" value={f.name} onChange={set("name")} autoComplete="name" className={inputCls(e.name)} {...aria("name")} /></Field>
        <Field id="m-title" label="Unvan" err={e.title}><input id="m-title" value={f.title} onChange={set("title")} placeholder="Örn. Basın Yayın Müdürü" className={inputCls(e.title)} {...aria("title")} /></Field>
        <Field id="m-email" label="Kurumsal e-posta" err={e.email}><input id="m-email" type="email" value={f.email} onChange={set("email")} autoComplete="email" placeholder="ad.soyad@kurum.bel.tr" className={inputCls(e.email)} {...aria("email")} /></Field>
        <Field id="m-phone" label="Telefon" err={e.phone}><input id="m-phone" type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" placeholder="0 (5xx) xxx xx xx" className={inputCls(e.phone)} {...aria("phone")} /></Field>
        <Field id="m-points" label="Reklam noktası sayısı" err={e.points}><input id="m-points" type="number" min={1} value={f.points} onChange={set("points")} placeholder="Örn. 120" className={inputCls(e.points)} {...aria("points")} /></Field>
      </div>
      <Field id="m-msg" label="Mesaj (isteğe bağlı)">
        <textarea id="m-msg" rows={4} value={f.msg} onChange={set("msg")} placeholder="Nokta tipleri, ihale süresi, öncelikli ilçeler…" className="w-full rounded-2xl bg-paper px-4 py-3 text-[15px] outline-none ring-1 ring-transparent focus:ring-ink resize-y" />
      </Field>
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <p className="text-[13px] text-muted max-w-[48ch]">Bilgilerin yalnızca başvuruyu değerlendirmek için kullanılır. Ayrıntılar <A to="kvkk" className="underline">KVKK metninde</A>.</p>
        <button type="submit" className="h-12 px-6 rounded-2xl bg-lime text-ink font-display font-medium">Başvuruyu gönder</button>
      </div>
    </form>
  );
}

export default function Municipalities() {
  return (
    <Page>
      {/* hero */}
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-5 items-stretch">
        <div className="bg-white rounded-card p-6 md:p-10 grid gap-6 content-center min-w-0">
          <p className="text-[14px] text-muted">Belediyeler ve işletici şirketler için</p>
          <h1 className="font-display font-semibold tracking-tight text-[34px] md:text-[44px] leading-none text-balance">Kent reklam noktalarını <span className="pill-word">şeffaf</span> biçimde kirala</h1>
          <p className="text-muted text-[17px] max-w-[52ch]">Durak panoları, megalight'lar ve dijital ekranlar tek takvimde. Ödeme emanette bekler, yayın kanıtlanınca hesabına geçer. Martrin yalnızca satılan haftadan %{RATE} komisyon alır.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#basvuru" onClick={e => { e.preventDefault(); document.getElementById("basvuru")?.scrollIntoView({ behavior: "smooth" }); }} className="h-12 px-6 rounded-2xl bg-lime text-ink grid place-items-center font-display font-medium">Başvuru yap</a>
            <a href="#gelir" onClick={e => { e.preventDefault(); document.getElementById("gelir")?.scrollIntoView({ behavior: "smooth" }); }} className="h-12 px-6 rounded-2xl bg-ink text-white grid place-items-center font-display font-medium">Gelirini hesapla</a>
          </div>
        </div>
        <div className="relative rounded-card overflow-hidden min-h-[300px]">
          <Img src="v2/c4.jpg" alt="Otobüs durağında dijital reklam ekranı" className="absolute inset-0 w-full h-full" />
          <div className="absolute left-4 right-4 bottom-4 bg-white/95 rounded-2xl p-4 flex items-center gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-lime shrink-0"><Icon n="pin" /></span>
            <div className="min-w-0 flex-1"><b className="font-display font-medium block truncate">Durak ekranı · Çankaya</b><span className="text-[13px] text-muted">Bu hafta dolu · kanıt onaylandı</span></div>
            <Badge tone="mint">Yayında</Badge>
          </div>
        </div>
      </div>

      {/* models */}
      <div className="mt-12 grid gap-2">
        <p className="text-[14px] text-muted">İki çalışma modeli</p>
        <h2 className="font-display font-semibold tracking-tight text-[28px] md:text-[34px] leading-none">Hesabı kim açar?</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mt-6">
        {MODELS.map(m => (
          <div key={m.title} className={`${m.tone} rounded-card p-6 md:p-8 grid gap-4 content-start min-w-0`}>
            <span className={`justify-self-start text-[12.5px] font-display rounded-full px-3 py-1 ${m.chip}`}>{m.tag}</span>
            <b className="font-display font-semibold text-[24px] tracking-tight">{m.title}</b>
            <p className={`text-[15px] ${m.tone.includes("ink") ? "text-white/70" : "text-muted"}`}>{m.d}</p>
            <div className="grid gap-2.5">
              {m.feats.map(f => <div key={f} className="flex gap-3 items-start text-[15px]"><span className="grid place-items-center w-6 h-6 rounded-full shrink-0 bg-lime text-ink"><Icon n="check" className="w-3.5 h-3.5" sw={3} /></span>{f}</div>)}
            </div>
          </div>
        ))}
      </div>

      {/* benefits */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {BENEFITS.map(b => (
          <div key={b.t} className="bg-white rounded-card p-6 grid gap-3 content-start min-w-0">
            <span className="grid place-items-center w-11 h-11 rounded-xl bg-violet-soft text-violet-ink"><Icon n={b.icon} /></span>
            <b className="font-display font-medium text-[18px]">{b.t}</b>
            <p className="text-muted text-[15px]">{b.d}</p>
          </div>
        ))}
      </div>

      {/* local quota */}
      <section className="mt-12 rounded-card bg-violet text-white p-6 md:p-10 grid md:grid-cols-[1.1fr_1fr] gap-6 items-center">
        <div className="grid gap-3 min-w-0">
          <p className="text-[14px] text-white/70">Kente geri dönen reklam</p>
          <h2 className="font-display font-semibold tracking-tight text-[28px] md:text-[34px] leading-none">Yerel esnafa indirim, kamuya kota</h2>
          <p className="text-white/80 text-[16px] max-w-[52ch]">Belediye her noktanın bir bölümünü ayırabilir. Mahalle esnafı bu haftaları indirimli alır, boş kalan haftalarda kamusal duyurular yayınlanır. Kota kuralları hesabında tanımlanır, takvim kendiliğinden uygular.</p>
        </div>
        <div className="grid gap-3">
          {[["Esnaf indirimi", "Vergi kaydı ilçede olan işletmelere %30'a varan indirim"], ["Kamusal duyuru kotası", "Her noktada yılda en az 8 hafta aşı, seçim, afet ve etkinlik duyurusu"], ["Boş hafta kuralı", "Yayından 3 gün önce satılmayan hafta duyuru havuzuna düşer"]].map(([t, d]) => (
            <div key={t} className="bg-white/10 ring-1 ring-white/15 rounded-2xl p-4"><b className="font-display font-medium">{t}</b><p className="text-white/70 text-[14px] mt-0.5">{d}</p></div>
          ))}
        </div>
      </section>

      {/* stats */}
      <section className="mt-12 bg-white rounded-card p-6 md:p-8 grid gap-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-[14px] text-muted">Örnek pilot · Yeşilvadi Belediyesi (hayali)</p><h2 className="font-display font-semibold text-[26px] tracking-tight mt-1">İlk yılın sonunda</h2></div>
          <Badge tone="sky">Örnek veri</Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STATS.map(s => (
            <div key={s.k} className="bg-paper rounded-2xl p-5 grid gap-1 min-w-0">
              <span className="text-[14px] text-muted">{s.k}</span>
              <b className="font-display font-semibold text-[32px] tracking-tight tnum leading-none">{s.v}</b>
              <span className="text-[13px] text-muted">{s.s}</span>
            </div>
          ))}
        </div>
      </section>

      <Calculator />

      {/* apply */}
      <section id="basvuru" className="mt-12 grid lg:grid-cols-[1fr_1.4fr] gap-5 scroll-mt-6">
        <div className="bg-ink text-white rounded-card p-6 md:p-8 grid gap-5 content-start min-w-0">
          <LogoMark body="#ffffff" className="w-14 h-14" />
          <div><p className="text-[14px] text-white/60">Başvuru</p><h2 className="font-display font-semibold text-[28px] tracking-tight mt-1">Kamu ekibimizle görüş</h2></div>
          <div className="grid gap-3">
            {["Formu doldur, 2 iş günü içinde dönüş yapalım.", "Envanter listeni şablona aktaralım.", "Pilot ilçede 4 haftalık deneme başlatalım.", "Sonuçları birlikte raporlayalım."].map((s, i) => (
              <div key={s} className="flex gap-3 items-start text-[15px]"><span className="grid place-items-center w-7 h-7 rounded-full bg-lime text-ink font-display text-[13px] font-semibold shrink-0">{i + 1}</span><span className="text-white/80 pt-0.5">{s}</span></div>
            ))}
          </div>
          <div className="bg-white/[.06] ring-1 ring-white/10 rounded-2xl p-4 text-[14px] text-white/70">Doğrudan ulaşmak için: kamu@martrin.com.tr · 0 (212) 000 00 00</div>
        </div>
        <Apply />
      </section>
      <p className="text-[13px] text-muted mt-6 text-center">İstatistikler ve kurum adları hayalidir. Sözleşme ve kota koşulları örnek metindir, avukat onayından geçecek.</p>
    </Page>
  );
}
