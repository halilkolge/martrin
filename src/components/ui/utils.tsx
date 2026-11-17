/**
 * Koşullu Tailwind sınıflarını birleştirir.
 * Yalnızca `false`, `null` ve `undefined` değerler atlanır.
 */
export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Input, textarea ve select için ortak alan sınıfları.
 * Hata durumunda kenarlık `bad` rengine döner.
 */
export function fieldClasses(hasError: boolean): string {
  return cn(
    "w-full rounded-2xl border bg-white px-4 text-[15px] text-ink transition",
    "placeholder:text-muted focus:border-violet focus:ring-2 focus:ring-violet/40",
    hasError ? "border-bad" : "border-line",
  );
}
