import type { ReactNode } from "react";

/**
 * Prototipteki 24'lük çizgi ikonları (`design/prototype/src/ui.tsx`).
 * Renk `currentColor` ile gelir; boyut `className` ile verilir.
 */
const ICON_PATHS: Record<string, ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  right: <path d="M5 12h14m-6-6 6 6-6 6" />,
  cart: (
    <>
      <path d="M3 4h2l2.4 11h10.2L20 8H6.2" />
      <circle cx="9" cy="19.5" r="1.3" />
      <circle cx="17" cy="19.5" r="1.3" />
    </>
  ),
  play: <path d="M8 5v14l11-7Z" />,
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l2-3h6l2 3h3v11H4Z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  bookmark: <path d="M6 4h12v17l-6-4-6 4Z" />,
};

export type IconName = keyof typeof ICON_PATHS;

type IconProps = {
  name: IconName;
  className?: string;
  strokeWidth?: number;
};

/** Prototipteki çizgi ikon. Dekoratiftir, ekran okuyucudan gizlenir. */
export function Icon({
  name,
  className = "size-5",
  strokeWidth = 1.8,
}: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}

const SOCIAL_MARKS: Record<string, ReactNode> = {
  Instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" fill="currentColor" />
      <circle
        cx="12"
        cy="12"
        r="3.6"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
      />
      <circle cx="16.6" cy="7.4" r="1.1" fill="white" />
    </>
  ),
  YouTube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" fill="currentColor" />
      <path d="M10 9v6l5-3Z" fill="white" />
    </>
  ),
  TikTok: (
    <path
      fill="currentColor"
      d="M14 3h3c.2 2 1.6 3.6 3.6 3.8v3c-1.4 0-2.7-.4-3.7-1.1V15a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 14 15Z"
    />
  ),
  X: (
    <path
      fill="currentColor"
      d="M4 4h4.2l3.9 5.3L16.8 4H20l-6.4 7.3L20.5 20h-4.2l-4.3-5.8L6.9 20H3.7l6.8-7.7Z"
    />
  ),
  LinkedIn: (
    <>
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="3.5"
        fill="currentColor"
      />
      <path
        d="M8 10v6M8 7.6v.1M11.5 16v-3.4a2 2 0 0 1 4 0V16"
        stroke="white"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </>
  ),
  Twitch: (
    <path
      fill="currentColor"
      d="M5 3h15v10l-4.5 4.5H12L9 20.5H7v-3H3V6.5Zm4 4v6m5-6v6"
      stroke="white"
      strokeWidth="1.6"
    />
  ),
  Kick: (
    <path
      fill="currentColor"
      d="M4 3h5v5h2V6h2V4h2V3h5v6h-2v2h-2v2h2v2h2v6h-5v-1h-2v-2h-2v-2H9v5H4Z"
    />
  ),
};

/** Influencer kartındaki sosyal platform işareti. */
export function SocialIcon({
  platform,
  className = "size-[18px]",
}: {
  platform: string;
  className?: string;
}) {
  const mark = SOCIAL_MARKS[platform];
  if (!mark) return null;

  return (
    <span
      title={platform}
      className="grid size-9 place-items-center rounded-xl border border-line bg-white"
    >
      <svg
        viewBox="0 0 24 24"
        className={`${className} text-ink`}
        role="img"
        aria-label={platform}
      >
        {mark}
      </svg>
    </span>
  );
}

/** Prototipteki dört uçlu parıltı. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 0C53 30 70 47 100 50 70 53 53 70 50 100 47 70 30 53 0 50 30 47 47 30 50 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Doğrulanmış satıcı/influencer rozeti. */
export function Verified({
  className = "size-[18px]",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role="img"
      aria-label="Doğrulanmış"
    >
      <path
        fill="currentColor"
        d="m12 1.8 2.6 1.9 3.2-.1 1 3 2.6 1.9-1 3.1 1 3.1-2.6 1.9-1 3-3.2-.1L12 22.2l-2.6-1.9-3.2.1-1-3-2.6-1.9 1-3.1-1-3.1 2.6-1.9 1-3 3.2.1Z"
      />
      <path
        d="m8 12 2.8 2.8L16.5 9"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
