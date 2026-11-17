"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

import { cn, fieldClasses } from "./utils";

export type SelectProps = Omit<
  ComponentPropsWithoutRef<"select">,
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
  labelClassName?: string;
};

/** Etiketi ve hata bağlantıları hazır açılır seçim alanı. */
export function Select({
  label,
  id,
  error,
  hint,
  className,
  containerClassName,
  labelClassName,
  children,
  ...selectProps
}: SelectProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      <label
        htmlFor={fieldId}
        className={cn(
          "font-display text-sm font-medium text-ink",
          labelClassName,
        )}
      >
        {label}
      </label>
      <select
        {...selectProps}
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(fieldClasses(Boolean(error)), "h-11", className)}
      >
        {children}
      </select>
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
