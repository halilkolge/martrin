import type { ComponentPropsWithoutRef } from "react";

import { cn } from "./utils";

export type CardTone = "white" | "ink" | "violet" | "lime" | "paper";

const toneClasses: Record<CardTone, string> = {
  white: "bg-white text-ink",
  ink: "bg-ink text-white",
  violet: "bg-violet text-ink",
  lime: "bg-lime text-ink",
  paper: "bg-paper text-ink",
};

/** Kart bileşeninin prop'ları; ek sınıflar dış kapsayıcıya uygulanır. */
export type CardProps = ComponentPropsWithoutRef<"div"> & {
  tone?: CardTone;
};

/** Tonu seçilebilen, geniş köşe yarıçaplı içerik kartı. */
export function Card({ className, tone = "white", ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn("rounded-card p-5 md:p-6", toneClasses[tone], className)}
    />
  );
}
