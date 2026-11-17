import Link from "next/link";

import { LogoMark } from "@/components/brand/logo-mark";

const NAV_LINKS = [
  { href: "#", label: "Keşfet" },
  { href: "#", label: "Reklam alanları" },
  { href: "#", label: "Influencer'lar" },
  { href: "#", label: "İlanlar & ihaleler" },
  { href: "#", label: "Ücretler" },
] as const;

const PANEL_LINKS = [
  { href: "#", label: "Reklam veren paneli" },
  { href: "#", label: "Satıcı paneli" },
  { href: "#", label: "Ekibim" },
  { href: "#", label: "Kazanç defteri" },
  { href: "#", label: "İletişim" },
  { href: "#", label: "Yönetim" },
] as const;

/** Koyu zeminli site başlığı. Prototipteki menü metinleriyle kurulur. */
export function SiteHeader() {
  return (
    <header className="bg-ink text-white">
      <div className="mx-auto flex h-[84px] w-full max-w-[1480px] items-center gap-4 px-4 sm:px-8 lg:px-12">
        <Link
          href="#"
          aria-label="Martrin ana sayfa"
          className="flex shrink-0 items-center gap-3"
        >
          <LogoMark body="currentColor" className="size-11" />
          <span className="font-display text-[22px] font-semibold tracking-tight">
            martrin
          </span>
        </Link>

        <nav
          aria-label="Ana menü"
          className="hidden gap-6 whitespace-nowrap font-display text-[16px] xl:flex 2xl:gap-8"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-7 text-white/85 transition hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <Link
            href="#"
            className="inline-flex h-11 items-center gap-2 rounded-2xl bg-lime px-4 font-display text-[15px] font-medium text-ink transition hover:brightness-95"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 4h2l2.4 11h10.2L20 8H6.2" />
              <circle cx="9" cy="19.5" r="1.3" />
              <circle cx="17" cy="19.5" r="1.3" />
            </svg>
            Sepet
          </Link>
          <span className="hidden items-center gap-3 pl-2 sm:flex">
            <span className="hidden whitespace-nowrap font-display text-[15px] md:block">
              Yöre Kahve
            </span>
            <span className="grid size-11 place-items-center rounded-full bg-violet font-display font-semibold text-ink">
              YK
            </span>
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 xl:hidden">
        <nav aria-label="Mobil menü" className="overflow-x-auto">
          <ul className="flex gap-5 whitespace-nowrap px-4 py-3 font-display text-sm sm:px-8">
            {[...NAV_LINKS, ...PANEL_LINKS].map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-white/75 transition hover:text-lime"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
