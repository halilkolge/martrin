"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

import { cn, fieldClasses } from "./utils";

export type TextareaProps = Omit<
  ComponentPropsWithoutRef<"textarea">,
  "id" | "className"
> & {
  /** Görünür alan etiketi. Zorunludur. */
  label: string;
  /** Alan kimliği. Verilmezse `useId` ile üretilir. */
  id?: string;
  /** Hata metni. Verilirse alan `aria-invalid` olur ve hata açıklamasına bağlanır. */
  error?: string;
  /** Alanın altında gösterilen yardım metni. Hata varsa gizlenir. */
  hint?: string;
  className?: string;
  containerClassName?: string;
};

/** Etiketi ve hata bağlantıları hazır çok satırlı metin alanı. */
export function Textarea({
  label,
  id,
  error,
  hint,
  className,
  containerClassName,
  rows = 4,
  ...textareaProps
}: TextareaProps) {
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
      <textarea
        {...textareaProps}
        id={fieldId}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(fieldClasses(Boolean(error)), "py-3", className)}
      />
      {error ? (
        <p id={errorId} className="text-sm text-bad">
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
