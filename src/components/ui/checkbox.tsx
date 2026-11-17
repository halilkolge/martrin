"use client";

import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "./utils";

export type CheckboxProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "id" | "className" | "type"
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

/** Onay kutusu ve yanında tıklanabilir etiketi. */
export function Checkbox({
  label,
  id,
  error,
  hint,
  className,
  containerClassName,
  ...checkboxProps
}: CheckboxProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn("grid gap-1.5", containerClassName)}>
      <div className="flex items-start gap-2.5">
        <input
          {...checkboxProps}
          id={fieldId}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "mt-0.5 size-5 shrink-0 cursor-pointer rounded border-line accent-lime",
            className,
          )}
        />
        <label
          htmlFor={fieldId}
          className="cursor-pointer text-[15px] leading-6 text-ink"
        >
          {label}
        </label>
      </div>
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
