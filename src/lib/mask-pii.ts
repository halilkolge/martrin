const EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

// Türkiye IBAN'ı: TR + 24 rakam. Rakamlar gruplar hâlinde boşluklu yazılabilir.
const IBAN_PATTERN = /\bTR\d{2}(?:\s*\d{4}){5}\s*\d{2}\b/gi;

// +90'lı, 0'lı ya da baş kodsuz yazılabilen sabit ve cep telefonları.
const PHONE_PATTERN =
  /(?<!\d)(?:\+90[\s.-]?|0)?(?:5\d{2}|[2-4]\d{2})[\s.-]?\d{3}[\s.-]?\d{2}[\s.-]?\d{2}(?!\d)/g;

// Telefonlardan sonra kalan 11 haneli sayılar TCKN kabul edilir.
const TCKN_PATTERN = /(?<!\d)\d{11}(?!\d)/g;

/**
 * Metin içindeki kişisel verileri sabit etiketlerle değiştirir.
 * E-posta, telefon, TCKN ve Türkiye IBAN'ı maskelenir; sipariş numarası,
 * tutar ve posta kodu gibi 4–6 haneli sayılar olduğu gibi kalır.
 */
export function maskPII(text: string): string {
  if (text.length === 0) {
    return text;
  }

  return text
    .replace(EMAIL_PATTERN, "[email]")
    .replace(IBAN_PATTERN, "[iban]")
    .replace(PHONE_PATTERN, "[telefon]")
    .replace(TCKN_PATTERN, "[tckn]");
}

/**
 * Bir değerin içindeki bütün metinleri maskeler. Nesne ve dizilerde
 * özyinelemeli çalışır; sayı ve boolean gibi diğer değerleri korur.
 */
export function maskPIIValue(value: unknown): unknown {
  if (typeof value === "string") {
    return maskPII(value);
  }

  if (Array.isArray(value)) {
    return value.map(maskPIIValue);
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, item]) => [
        key,
        maskPIIValue(item),
      ]),
    );
  }

  return value;
}
