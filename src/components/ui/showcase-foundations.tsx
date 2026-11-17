import { LogoMark } from "@/components/brand/logo-mark";

import { Badge } from "./badge";
import { Button } from "./button";
import { Chip } from "./chip";
import { Section } from "./showcase-section";
import { cn } from "./utils";

const COLOR_TOKENS = [
  { name: "ink", className: "bg-ink" },
  { name: "paper", className: "bg-paper" },
  { name: "line", className: "bg-line" },
  { name: "muted", className: "bg-muted" },
  { name: "lime", className: "bg-lime" },
  { name: "lime-soft", className: "bg-lime-soft" },
  { name: "violet", className: "bg-violet" },
  { name: "violet-soft", className: "bg-violet-soft" },
  { name: "sky-soft", className: "bg-sky-soft" },
  { name: "rose-soft", className: "bg-rose-soft" },
  { name: "mint-soft", className: "bg-mint-soft" },
  { name: "live", className: "bg-live" },
] as const;

/** Renk, Button, Badge, Chip ve LogoMark bölümleri. */
export function ShowcaseFoundations() {
  return (
    <>
      <Section
        id="renkler"
        title="Renkler ve token'lar"
        description="Renkler globals.css içindeki @theme bloğunda tanımlıdır."
      >
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {COLOR_TOKENS.map((token) => (
            <li key={token.name} className="grid gap-2">
              <span
                className={cn(
                  "block h-12 rounded-2xl border border-line",
                  token.className,
                )}
              />
              <span className="font-display text-sm text-ink">
                {token.name}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="button"
        title="Button"
        description="primary, dark, outline ve ghost varyantları; sm, md ve lg boyutları."
      >
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Küçük</Button>
            <Button size="md">Orta</Button>
            <Button size="lg">Büyük</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button disabled>Devre dışı</Button>
            <Button loading>Yükleniyor</Button>
            <Button href="#" variant="outline">
              Bağlantı butonu
            </Button>
          </div>
        </div>
      </Section>

      <Section
        id="badge-chip"
        title="Badge ve Chip"
        description="Badge durum etiketleri; Chip aç/kapa seçimleri."
      >
        <div className="grid gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="success">Onaylandı</Badge>
            <Badge variant="warning">Bekliyor</Badge>
            <Badge variant="info">Bilgi</Badge>
            <Badge variant="neutral">Nötr</Badge>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Chip defaultPressed>Billboard</Chip>
            <Chip>AVM ekranı</Chip>
            <Chip>Influencer</Chip>
            <Chip disabled>Devre dışı</Chip>
          </div>
        </div>
      </Section>

      <Section
        id="logo"
        title="LogoMark"
        description="Pano-m işareti; gövde, ekran ve nokta renkleri prop ile değişir."
      >
        <div className="flex flex-wrap items-center gap-6">
          <LogoMark title="Martrin logosu" className="size-16" />
          <span className="grid place-items-center rounded-2xl bg-ink p-3 text-white">
            <LogoMark body="currentColor" className="size-12" />
          </span>
          <LogoMark
            body="var(--color-violet)"
            screen="var(--color-lime)"
            className="size-12"
          />
        </div>
      </Section>
    </>
  );
}
