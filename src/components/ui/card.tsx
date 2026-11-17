import type { ComponentPropsWithoutRef } from "react";

import { cn } from "./utils";

/** Kart bileşeninin prop'ları; ek sınıflar dış kapsayıcıya uygulanır. */
export type CardProps = ComponentPropsWithoutRef<"div">;

/** Beyaz zeminli, geniş köşe yarıçaplı içerik kartı. */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      {...props}
      className={cn("rounded-card bg-white p-5 md:p-6", className)}
    />
  );
}
