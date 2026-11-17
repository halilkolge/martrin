import type { ReactNode } from "react";

import { cn } from "./utils";

/** Durum etiketi renkleri. */
export type BadgeVariant = "success" | "warning" | "info" | "neutral";

export type BadgeProps = {
  /** Etiket rengi. Varsayılan `neutral`. */
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  success: "bg-mint-soft text-mint-ink",
  warning: "bg-warn-soft text-warn-ink",
  info: "bg-sky-soft text-sky-ink",
  neutral: "bg-paper text-muted",
};

/** Kısa durum bilgisi gösteren, satır kırmayan etiket. */
export function Badge({
  variant = "neutral",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[12.5px] font-medium",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
