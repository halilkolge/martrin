import Image from "next/image";

import { formatTRY } from "@/lib/format-try";
import type { SpaceCard as SpaceCardData } from "@/server/spaces/search";

const UNIT_LABELS: Record<string, string> = {
  day: "gün",
  week: "hafta",
  two_weeks: "15 gün",
  month: "ay",
  spot: "spot",
  event: "etkinlik",
};
const TYPE_LABELS: Record<SpaceCardData["type"], string> = {
  billboard: "Billboard",
  megalight: "Megalight",
  clp: "Durak / CLP",
  avm_led: "AVM LED Ekran",
  avm_stand: "AVM Stant & Etkinlik",
  dooh: "Dijital Ekran (DOOH)",
  vehicle: "Araç Giydirme",
  other: "Diğer",
};

export function SpaceCard({
  space,
  highlighted = false,
  onSelect,
}: {
  space: SpaceCardData;
  highlighted?: boolean;
  onSelect?: () => void;
}) {
  return (
    <article
      data-space-id={space.id}
      className={`grid min-w-0 gap-3 rounded-card bg-white p-3 transition ${highlighted ? "ring-2 ring-violet" : "hover:shadow-card"}`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`${space.title} haritada göster${space.digital ? " · ● Dijital" : ""}`}
        className="relative block aspect-[16/10] overflow-hidden rounded-img bg-paper text-left focus-visible:ring-2 focus-visible:ring-violet"
      >
        {space.photoUrl ? (
          <Image
            src={space.photoUrl}
            alt={space.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
          />
        ) : null}
        {space.digital ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[12px] font-medium text-lime">
            ● Dijital
          </span>
        ) : null}
      </button>
      <div className="grid min-w-0 gap-1 px-1">
        <h2 className="truncate font-display text-[17px] font-medium">
          {space.title}
        </h2>
        <p className="text-[13.5px] text-muted">
          {space.city} · {space.district}
        </p>
      </div>
      <div className="mx-1 h-px bg-line" />
      <div className="flex items-center justify-between gap-2 px-1">
        <span className="rounded-full bg-paper px-3 py-1 text-[12.5px] font-medium">
          {TYPE_LABELS[space.type]}
        </span>
        {space.minPriceUnit ? (
          <span className="text-[13px] text-muted">
            {UNIT_LABELS[space.minPriceUnit] ?? space.minPriceUnit} başına
          </span>
        ) : null}
      </div>
      <div className="flex items-end justify-between gap-2 px-1">
        <span className="text-[14px] text-muted">Başlangıç fiyatı</span>
        <span className="shrink-0 font-display text-[18px] font-semibold tabular-nums">
          {space.minPriceKurus === null
            ? "Teklif al"
            : formatTRY(space.minPriceKurus)}
        </span>
      </div>
    </article>
  );
}
