"use client";

import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn, fieldClasses } from "./utils";

export type InputProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "className"
> & {
  /** Görünür alan etiketi. Zorunludur. */
  label: ReactNode;
  /** Alan kimliği. Verilmezse `useId` ile üretilir. */
  id?: string;
  /** Hata metni. Verilirse alan `aria-invalid` olur ve hata açıklamasına bağlanır. */
  error?: string;
  /** Alanın altında gösterilen yardım metni. Hata varsa gizlenir. */
  hint?: string;
  className?: string;
  containerClassName?: string;
};

/** Etiketi, hata ve yardım metni bağlantıları hazır tek satırlı metin alanı. */
export function Input({
  label,
  id,
  error,
  hint,
  className,
  containerClassName,
  ...inputProps
}: InputProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      <label
        htmlFor={fieldId}
        className="font-display text-sm font-medium text-ink"
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(fieldClasses(Boolean(error)), "h-11", className)}
      />
      {error ? (
        <p id={errorId} role="alert" className="text-sm text-bad">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
