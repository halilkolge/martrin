import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Icon, SocialIcon, Verified } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { formatTRY } from "@/lib/format-try";

import {
  TYPE_LABEL,
  type HomeInfluencer,
  type HomeSpace,
  type SpaceType,
} from "./data";
import { compactCount } from "./home-utils";

const TYPE_TONE: Record<SpaceType, string> = {
  billboard: "bg-violet-soft text-violet-ink",
  megalight: "bg-sky-soft text-sky-ink",
  clp: "bg-mint-soft text-mint-ink",
  "avm-led": "bg-rose-soft text-rose-ink",
  "avm-stant": "bg-warn-soft text-warn-ink",
  dijital: "bg-sky-soft text-sky-ink",
  bina: "bg-violet-soft text-violet-ink",
  arac: "bg-rose-soft text-rose-ink",
};

const NICHE_TONE: Record<string, string> = {
  "Yemek & Tarif": "bg-warn-soft text-warn-ink",
  "Moda & Stil": "bg-violet-soft text-violet-ink",
  Teknoloji: "bg-sky-soft text-sky-ink",
  "Spor & Sağlık": "bg-mint-soft text-mint-ink",
  Seyahat: "bg-sky-soft text-sky-ink",
  "Oyun & Canlı Yayın": "bg-rose-soft text-rose-ink",
  Lifestyle: "bg-rose-soft text-rose-ink",
  Komedi: "bg-mint-soft text-mint-ink",
};

export function SectionHead({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[13px] text-muted">{eyebrow}</p>
        ) : null}
        <h2 className="font-display text-[28px] leading-[1.05] font-semibold tracking-tight md:text-[40px]">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}

function IconButton({
  name,
  label,
}: {
  name: "mail" | "bookmark";
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-11 place-items-center rounded-2xl border border-line bg-white text-ink transition hover:border-ink"
    >
      <Icon name={name} />
    </button>
  );
}

export function SpaceCard({ space }: { space: HomeSpace }) {
  const digital = space.type === "avm-led" || space.type === "dijital";

  return (
    <article className="group grid min-w-0 gap-4 rounded-card bg-white p-4 transition hover:shadow-card">
      <Link
        href="/alanlar"
        className="relative block aspect-[4/3] overflow-hidden rounded-img"
      >
        <Image
          unoptimized
          src={`/images/v2/${space.image}`}
          alt={space.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        {digital ? (
          <span className="absolute top-3 left-3 rounded-full bg-live px-3 py-1 text-[12.5px] font-medium whitespace-nowrap text-ink">
            ● Dijital
          </span>
        ) : null}
        <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-ink">
          <Icon name="arrow" className="size-4" />
        </span>
      </Link>

      <div className="flex min-w-0 items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <Link
            href="/alanlar"
            className="flex min-w-0 items-center gap-1.5 font-display text-[17px] leading-snug font-medium"
          >
            <span className="min-w-0 truncate">{space.title}</span>
            {space.verified ? <Verified className="size-4 shrink-0" /> : null}
          </Link>
          <p className="mt-0.5 text-[13.5px] text-muted">
            {space.district}, {space.city}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-[17px] font-semibold tabular-nums">
            {compactCount(space.dailyViews)}
          </p>
          <p className="text-[12px] text-muted">günlük göz</p>
        </div>
      </div>

      <div className="mx-1 h-px bg-line" />

      <div className="flex items-center justify-between px-1">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-[12.5px] font-medium whitespace-nowrap ${TYPE_TONE[space.type]}`}
        >
          {TYPE_LABEL[space.type]}
        </span>
        <span className="text-[13px] text-muted">{space.unit} başına</span>
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-[14px] text-muted">Başlangıç fiyatı</span>
        <span className="font-display text-[22px] font-semibold tabular-nums">
          {formatTRY(space.priceKurus)}
        </span>
      </div>

      <div className="flex gap-2">
        <IconButton name="mail" label="Mesaj gönder" />
        <IconButton name="bookmark" label="Kaydet" />
        <Button href="/alanlar" className="flex-1">
          İncele &amp; kirala
        </Button>
      </div>
    </article>
  );
}

export function InfluencerCard({ influencer }: { influencer: HomeInfluencer }) {
  return (
    <article className="group grid min-w-0 gap-4 rounded-card bg-white p-4 transition hover:shadow-card">
      <Link
        href="/influencerlar"
        className="relative block aspect-square overflow-hidden rounded-img"
      >
        <Image
          unoptimized
          src={`/images/v2/${influencer.image}`}
          alt={influencer.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      <div className="flex min-w-0 items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <Link
            href="/influencerlar"
            className="flex min-w-0 items-center gap-1.5 font-display text-[17px] font-medium"
          >
            <span className="min-w-0 truncate">{influencer.name}</span>
            {influencer.verified ? (
              <Verified className="size-4 shrink-0" />
            ) : null}
          </Link>
          <p className="mt-0.5 text-[13.5px] text-muted">{influencer.city}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-[17px] font-semibold tabular-nums">
            {compactCount(influencer.followers)}
          </p>
          <p className="text-[12px] text-muted">takipçi</p>
        </div>
      </div>

      <div className="mx-1 h-px bg-line" />

      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex gap-1.5">
          {influencer.platforms.slice(0, 3).map((platform) => (
            <SocialIcon key={platform} platform={platform} />
          ))}
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[12.5px] font-medium ${NICHE_TONE[influencer.niche] ?? "bg-paper"}`}
        >
          {influencer.niche}
        </span>
      </div>

      <div className="flex items-center justify-between px-1">
        <span className="text-[14px] text-muted">Reklam fiyatı</span>
        <span className="font-display text-[22px] font-semibold tabular-nums">
          {formatTRY(influencer.priceKurus)}
        </span>
      </div>

      <div className="flex gap-2">
        <IconButton name="mail" label="Mesaj gönder" />
        <IconButton name="bookmark" label="Kaydet" />
        <Button href="/influencerlar" className="flex-1">
          Teklif al
        </Button>
      </div>
    </article>
  );
}
