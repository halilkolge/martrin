import Image from "next/image";

import { SocialIcon, Verified } from "@/components/icons";
import { formatTRY } from "@/lib/format-try";
import type { Platform } from "@/lib/search-params";
import type { InfluencerCard as InfluencerCardData } from "@/server/influencers/search";

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  x: "X",
  linkedin: "LinkedIn",
  twitch: "Twitch",
  kick: "Kick",
};

function compactCount(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function InfluencerCard({
  influencer,
}: {
  influencer: InfluencerCardData;
}) {
  return (
    <article className="group grid min-w-0 gap-4 rounded-card bg-white p-4 transition hover:shadow-card">
      <div className="relative block aspect-square overflow-hidden rounded-img bg-paper">
        {influencer.avatarUrl ? (
          <Image
            unoptimized
            src={influencer.avatarUrl}
            alt={influencer.displayName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            className="grid h-full place-items-center font-display text-5xl text-muted"
            aria-hidden="true"
          >
            {influencer.displayName.slice(0, 1)}
          </span>
        )}
      </div>
      <div className="flex min-w-0 items-start justify-between gap-3 px-1">
        <div className="min-w-0">
          <h2 className="flex min-w-0 items-center gap-1.5 font-display text-[17px] font-medium">
            <span className="truncate">{influencer.displayName}</span>
            {influencer.verified ? (
              <Verified className="size-4 shrink-0" />
            ) : null}
          </h2>
          <p className="mt-0.5 text-[13.5px] text-muted">{influencer.city}</p>
          <p className="text-[13px] text-muted">@{influencer.handle}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-[17px] font-semibold tabular-nums">
            {compactCount(influencer.totalFollowers)}
          </p>
          <p className="text-[12px] text-muted">takipçi</p>
        </div>
      </div>
      <div className="mx-1 h-px bg-line" />
      <div className="flex min-w-0 items-center justify-between gap-2 px-1">
        <div className="flex gap-1.5">
          {influencer.platforms.slice(0, 3).map((platform) => (
            <SocialIcon key={platform} platform={PLATFORM_LABEL[platform]} />
          ))}
        </div>
        <span className="max-w-[65%] truncate rounded-full bg-paper px-3 py-1 text-[12.5px] font-medium">
          {influencer.niche}
        </span>
      </div>
      <div className="flex items-center justify-between px-1">
        <span className="text-[14px] text-muted">Reklam fiyatı</span>
        <span className="font-display text-[20px] font-semibold tabular-nums">
          {influencer.minPriceKurus === null
            ? "Teklif al"
            : formatTRY(influencer.minPriceKurus)}
        </span>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          aria-label={`${influencer.displayName} için mesaj gönder`}
          className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-white text-ink transition hover:border-ink"
        >
          <span aria-hidden="true">✉</span>
        </button>
        <button
          type="button"
          aria-label={`${influencer.displayName} kaydet`}
          className="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-white text-ink transition hover:border-ink"
        >
          <span aria-hidden="true">♡</span>
        </button>
        <a
          href="/influencerlar"
          className="grid min-h-11 flex-1 place-items-center rounded-2xl bg-lime px-3 text-center font-display text-[15px] font-medium hover:brightness-95"
        >
          Teklif al
        </a>
      </div>
    </article>
  );
}
