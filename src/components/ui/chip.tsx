"use client";

import { useState, type ReactNode } from "react";

import { cn } from "./utils";

export type ChipProps = {
  /** Seçili durumu dışarıdan kontrol eder. */
  pressed?: boolean;
  /** Kontrolsüz kullanımda başlangıç seçili durumu. */
  defaultPressed?: boolean;
  /** Seçili durum değiştiğinde yeni değeri bildirir. */
  onPressedChange?: (pressed: boolean) => void;
  /** Tıklamayı engeller. */
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

/** Aç/kapa seçim yapan, `aria-pressed` durumunu yansıtan etiket. */
export function Chip({
  pressed,
  defaultPressed = false,
  onPressedChange,
  disabled = false,
  className,
  children,
}: ChipProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isPressed = pressed ?? internalPressed;

  return (
    <button
      type="button"
      aria-pressed={isPressed}
      disabled={disabled}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border px-4 font-display text-sm transition",
        isPressed
          ? "border-ink bg-ink text-white"
          : "border-line bg-white text-ink hover:border-ink",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      onClick={() => {
        const next = !isPressed;
        if (pressed === undefined) {
          setInternalPressed(next);
        }
        onPressedChange?.(next);
      }}
    >
      {children}
    </button>
  );
}
