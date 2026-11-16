const THOUSANDS_SEPARATOR = ".";
const DECIMAL_SEPARATOR = ",";
const CURRENCY_SYMBOL = "₺";

/**
 * Kuruş cinsinden tamsayı tutarı Türk lirası biçiminde gösterir.
 * Örnek: 149000 -> "₺1.490", 12345 -> "₺123,45", -149000 -> "-₺1.490".
 */
export function formatTRY(kurus: number): string {
  if (!Number.isSafeInteger(kurus)) {
    throw new RangeError(
      "Tutar kuruş cinsinden güvenli bir tamsayı olmalıdır.",
    );
  }

  const sign = kurus < 0 ? "-" : "";
  const absolute = Math.abs(kurus);
  const lira = Math.trunc(absolute / 100);
  const cents = absolute % 100;

  const groupedLira = String(lira).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    THOUSANDS_SEPARATOR,
  );
  const centsPart =
    cents === 0 ? "" : `${DECIMAL_SEPARATOR}${String(cents).padStart(2, "0")}`;

  return `${sign}${CURRENCY_SYMBOL}${groupedLira}${centsPart}`;
}
