import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "./utils";

/** Buton görsel varyantları. */
export type ButtonVariant = "primary" | "dark" | "outline" | "ghost";

/** Buton yükseklikleri: sm 36px, md 44px, lg 48px. */
export type ButtonSize = "sm" | "md" | "lg";

type ButtonBaseProps = {
  /** Görsel varyant. Varsayılan `primary` (lime zemin, ink yazı). */
  variant?: ButtonVariant;
  /** Buton yüksekliği. Varsayılan `md`. */
  size?: ButtonSize;
  /** Yükleniyor durumu. Butonu devre dışı bırakır ve `aria-busy` ekler. */
  loading?: boolean;
  className?: string;
  children?: ReactNode;
};

/** Normal `<button>` olarak render edilen buton prop'ları. */
export type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: undefined;
  };

/** `href` verilince `next/link` ile `<a>` olarak render edilen buton prop'ları. */
export type ButtonAsLinkProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "children" | "href"> & {
    href: string;
    /** Bağlantıyı erişilebilir biçimde devre dışı bırakır. */
    disabled?: boolean;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-lime text-ink hover:brightness-95",
  dark: "bg-ink text-white hover:bg-ink-2",
  outline: "border border-ink text-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:bg-line/70",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 gap-2 px-5 text-[15px]",
  lg: "h-12 gap-2 px-6 text-base",
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center rounded-2xl font-display font-medium transition",
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

/**
 * Martrin butonu. Dört varyant, üç boyut, `disabled` ve `loading` durumları.
 * `href` verilirse bağlantı olarak render edilir.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const {
      href,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      className,
      children,
      onClick,
      ...linkProps
    } = props;

    return (
      <Link
        {...linkProps}
        href={href}
        className={buttonClasses(variant, size, className)}
        aria-busy={loading || undefined}
        aria-disabled={disabled || loading || undefined}
        onClick={(event) => {
          if (disabled || loading) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {loading ? <Spinner /> : null}
        {children}
      </Link>
    );
  }

  const {
    variant = "primary",
    size = "md",
    loading = false,
    className,
    children,
    type = "button",
    disabled,
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      className={buttonClasses(variant, size, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  );
}
