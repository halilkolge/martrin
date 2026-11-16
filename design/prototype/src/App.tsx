import { useEffect, useState } from "react";
import { A, CartProvider, Icon, IconBtn, useCart, LogoMark } from "./ui";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SpaceDetail from "./pages/SpaceDetail";
import InfluencerDetail from "./pages/InfluencerDetail";
import Cart from "./pages/Cart";
import Briefs from "./pages/Briefs";
import AdvertiserPanel from "./pages/AdvertiserPanel";
import SellerPanel from "./pages/SellerPanel";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";
import Team from "./pages/Team";
import Ledger from "./pages/Ledger";
import Contact from "./pages/Contact";
import { Escrow, Proof, Legal } from "./pages/Trust";
import Municipalities from "./pages/Municipalities";
import SellerJoin from "./pages/SellerJoin";

function useRoute() {
  const read = () => location.hash.replace(/^#/, "") || "kesfet";
  const [r, setR] = useState(read);
  useEffect(() => { const f = () => setR(read()); addEventListener("hashchange", f); return () => removeEventListener("hashchange", f); }, []);
  return r;
}

const NAV = [
  { to: "kesfet", label: "Keşfet" },
  { to: "alanlar", label: "Reklam alanları" },
  { to: "influencerlar", label: "Influencer'lar" },
  { to: "ilanlar", label: "İlanlar & ihaleler" },
  { to: "ucretler", label: "Ücretler" },
];
const PANELS = [
  { to: "panel-reklamveren", label: "Reklam veren paneli" },
  { to: "panel-satici", label: "Satıcı paneli" },
  { to: "panel-ekip", label: "Ekibim" },
  { to: "panel-kazanc", label: "Kazanç defteri" },
  { to: "iletisim", label: "İletişim" },
  { to: "yonetim", label: "Yönetim" },
];

function Header({ route }: { route: string }) {
  const { items } = useCart();
  const [open, setOpen] = useState(false);
  const active = (to: string) => route === to || (to === "alanlar" && route.startsWith("alan-")) || (to === "influencerlar" && route.startsWith("inf-"));
  return (
    <header className="bg-ink text-white">
      <div className="px-4 sm:px-8 lg:px-12 h-[84px] flex items-center gap-8">
        <A to="kesfet" className="flex items-center gap-3 shrink-0" label="Martrin ana sayfa">
          <LogoMark body="#ffffff" className="w-11 h-11" />
          <span className="font-display font-semibold text-[22px] tracking-tight">martrin</span>
        </A>
        <nav className="hidden xl:flex gap-6 2xl:gap-8 text-[16px] font-display whitespace-nowrap">
          {NAV.map(n => <A key={n.to} to={n.to} className={`relative py-7 ${active(n.to) ? "text-lime after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px] after:rounded-full after:bg-lime" : "text-white/85 hover:text-white"}`}>{n.label}</A>)}
        </nav>
        <div className="hidden lg:flex xl:hidden 2xl:flex items-center gap-2 text-white/90 font-display text-[15px] ml-auto whitespace-nowrap"><Icon n="pin" className="w-5 h-5" />İstanbul, TR</div>
        <div className="ml-auto lg:ml-6 xl:ml-auto 2xl:ml-6 flex items-center gap-2.5">
          <div className="relative hidden md:block">
            <IconBtn n="gear" label="Paneller" dark onClick={() => setOpen(o => !o)} />
            {open && <div className="absolute right-0 mt-2 w-72 bg-white text-ink rounded-3xl shadow-2xl p-2 z-40" onClick={() => setOpen(false)}>
              {PANELS.map(p => <A key={p.to} to={p.to} className="block px-4 py-3 rounded-2xl hover:bg-paper text-[15px] font-display">{p.label}</A>)}
            </div>}
          </div>
          <span className="relative hidden md:block"><IconBtn n="bell" label="Bildirimler" dark /><span className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-live" /></span>
          <A to="sepet" className="relative inline-flex items-center gap-2 h-11 px-4 rounded-2xl bg-lime text-ink font-display font-medium text-[15px]" label="Kampanya sepeti"><Icon n="cart" />Sepet<span className="grid place-items-center min-w-6 h-6 px-1.5 rounded-full bg-ink text-white text-[12px] tnum">{items.length}</span></A>
          <span className="hidden sm:flex items-center gap-3 pl-2"><span className="hidden md:block font-display text-[15px] whitespace-nowrap">Yöre Kahve</span><span className="grid place-items-center w-11 h-11 rounded-full bg-violet text-white font-display font-semibold">YK</span></span>
        </div>
      </div>
      <div className="xl:hidden border-t border-white/10 overflow-x-auto">
        <div className="px-4 sm:px-8 flex gap-5 py-3 text-[14px] whitespace-nowrap font-display">
          {[...NAV, ...PANELS].map(n => <A key={n.to} to={n.to} className={active(n.to) ? "text-lime" : "text-white/75"}>{n.label}</A>)}
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white/70 rounded-t-[36px] mt-10">
      <div className="px-4 sm:px-8 lg:px-12 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] text-[15px]">
        <div className="grid gap-4 content-start"><div className="flex items-center gap-3"><LogoMark body="#ffffff" className="w-12 h-12" /><span className="font-display font-semibold text-white text-[28px] tracking-tight">martrin</span></div><div className="font-display font-semibold text-white text-[34px] leading-tight tracking-tight">Göz neredeyse,<br />markan <span className="text-lime">orada.</span></div><p className="max-w-[40ch]">Influencer'dan billboard'a, AVM ekranından belediye noktasına kadar Türkiye'nin reklam alanları.</p></div>
        <div className="grid gap-2 content-start"><b className="text-white font-display font-medium">Reklam verenler</b><A to="alanlar">Alan bul</A><A to="influencerlar">Influencer bul</A><A to="ilanlar">İlan / ihale aç</A><A to="ucretler">Ücretler ve paketler</A></div>
        <div className="grid gap-2 content-start"><b className="text-white font-display font-medium">Satıcılar</b><A to="satici-ol-alan">Alanını listele</A><A to="satici-ol-influencer">Influencer olarak katıl</A><A to="belediyeler">Belediyeler için</A></div>
        <div className="grid gap-2 content-start"><b className="text-white font-display font-medium">Güven</b><A to="emanet-odeme">Emanet ödeme</A><A to="yayin-kaniti">Yayın kanıtı</A><A to="kvkk">KVKK · Reklam kılavuzu</A><A to="iletisim">İletişim</A></div>
      </div>
      <div className="px-4 sm:px-8 lg:px-12 pb-8 text-[12.5px] text-white/45">Prototip · Tüm kişi, işletme, fiyat ve istatistikler örnek amaçlıdır.</div>
    </footer>
  );
}

function Router({ route }: { route: string }) {
  if (route.startsWith("alan-")) return <SpaceDetail id={route.slice(5)} />;
  if (route.startsWith("inf-")) return <InfluencerDetail id={route.slice(4)} />;
  if (route.startsWith("satici-ol")) return <SellerJoin />;
  switch (route) {
    case "alanlar": return <Explore tab="alan" />;
    case "influencerlar": return <Explore tab="inf" />;
    case "ilanlar": return <Briefs />;
    case "sepet": return <Cart />;
    case "panel-reklamveren": return <AdvertiserPanel />;
    case "panel-satici": return <SellerPanel />;
    case "yonetim": return <Admin />;
    case "ucretler": return <Pricing />;
    case "panel-ekip": return <Team />;
    case "panel-kazanc": return <Ledger />;
    case "iletisim": return <Contact />;
    case "belediyeler": return <Municipalities />;
    case "emanet-odeme": return <Escrow />;
    case "yayin-kaniti": return <Proof />;
    case "kvkk": return <Legal />;
    default: return <Home />;
  }
}

export default function App() {
  const route = useRoute();
  return (
    <CartProvider>
      <div className="text-center text-[12.5px] text-ink/70 gutter py-2.5">Tasarım prototipi · İçerik ve isimler örnektir, işlemler gerçek değildir</div>
      <div className="mx-2 sm:mx-4 lg:mx-6 mb-6 rounded-[28px] sm:rounded-[36px] overflow-hidden bg-paper max-w-[1480px] xl:mx-auto">
        <Header route={route} />
        <main key={route}><Router route={route} /></main>
        <Footer />
      </div>
    </CartProvider>
  );
}
