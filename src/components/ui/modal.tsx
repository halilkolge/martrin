"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

import { cn } from "./utils";

export type ModalProps = {
  /** Modal açık mı? Kapalıyken hiçbir şey render edilmez. */
  open: boolean;
  /** Kapatma isteğini bildirir (Esc, kapatma butonu ya da arka plan). */
  onClose: () => void;
  /** `aria-labelledby` ile bağlanan modal başlığı. */
  title: string;
  /** Kapatma butonunun erişilebilir adı. */
  closeLabel?: string;
  /** İçerik. */
  children?: ReactNode;
  /** Başlığın altında, içeriğin sonunda gösterilen eylem alanı. */
  footer?: ReactNode;
  className?: string;
};

/**
 * Erişilebilir modal. Açılınca odak modalın içine gider, Esc ve kapatma
 * butonu kapatır, kapanınca odak açan öğeye döner.
 */
export function Modal({
  open,
  onClose,
  title,
  closeLabel = "Kapat",
  children,
  footer,
  className,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      opener?.focus();
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/60 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "w-full max-w-lg rounded-card bg-white p-5 shadow-float md:p-6",
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <h2
            id={titleId}
            className="font-display text-xl font-semibold text-ink"
          >
            {title}
          </h2>
          <button
            type="button"
            aria-label={closeLabel}
            className="grid size-9 shrink-0 place-items-center rounded-2xl border border-line text-ink transition hover:border-ink"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <div className="mt-4 text-[15px] text-muted">{children}</div>
        {footer ? (
          <div className="mt-6 flex justify-end gap-2">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}
