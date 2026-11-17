import Link from "next/link";

import { LogoMark } from "@/components/brand/logo-mark";

const LINK_GROUPS = [
  {
    title: "Reklam verenler",
    links: [
      { href: "#", label: "Alan bul" },
      { href: "#", label: "Influencer bul" },
      { href: "#", label: "İlan / ihale aç" },
      { href: "/ucretler", label: "Ücretler ve paketler" },
    ],
  },
  {
    title: "Satıcılar",
    links: [
      { href: "#", label: "Alanını listele" },
      { href: "#", label: "Influencer olarak katıl" },
      { href: "/belediyeler", label: "Belediyeler için" },
    ],
  },
  {
    title: "Güven",
    links: [
      { href: "/emanet-odeme", label: "Emanet ödeme" },
      { href: "/yayin-kaniti", label: "Yayın kanıtı" },
      { href: "#", label: "KVKK · Reklam kılavuzu" },
      { href: "/iletisim", label: "İletişim" },
    ],
  },
] as const;

/** Koyu zeminli, sloganlı site alt bilgisi. */
export function SiteFooter() {
  return (
    <footer className="mt-10 rounded-t-card bg-ink text-[15px] text-white/70">
      <div className="mx-auto grid w-full max-w-[1480px] gap-10 px-4 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-12">
        <div className="grid content-start gap-4">
          <div className="flex items-center gap-3">
            <LogoMark body="currentColor" className="size-12" />
            <span className="font-display text-[28px] font-semibold tracking-tight text-white">
              martrin
            </span>
          </div>
          <p className="font-display text-[34px] font-semibold leading-tight tracking-tight text-white">
            Göz neredeyse,
            <br />
            markan <span className="text-lime">orada.</span>
          </p>
          <p className="max-w-[40ch]">
            Influencer&apos;dan billboard&apos;a, AVM ekranından belediye
            noktasına kadar Türkiye&apos;nin reklam alanları.
          </p>
        </div>

        {LINK_GROUPS.map((group) => (
          <nav
            key={group.title}
            aria-label={group.title}
            className="grid content-start gap-2"
          >
            <h2 className="font-display font-medium text-white">
              {group.title}
            </h2>
            {group.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="mx-auto w-full max-w-[1480px] px-4 pb-8 text-[12.5px] text-white/60 sm:px-8 lg:px-12">
        Prototip · Tüm kişi, işletme, fiyat ve istatistikler örnek amaçlıdır.
      </div>
    </footer>
  );
}
