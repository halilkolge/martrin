import { describe, expect, it } from "vitest";

import { maskPII, maskPIIValue } from "./mask-pii";

describe("maskPII", () => {
  it("e-posta adresini [email] olarak maskeler", () => {
    expect(maskPII("ali.veli@ornek.com ile iletişim")).toBe(
      "[email] ile iletişim",
    );
  });

  it("boşluklu 0'lı telefonu [telefon] olarak maskeler", () => {
    expect(maskPII("Tel: 0532 123 45 67")).toBe("Tel: [telefon]");
  });

  it("+90'lı telefonu [telefon] olarak maskeler", () => {
    expect(maskPII("+90 532 123 4567")).toBe("[telefon]");
  });

  it("boşluksuz 0'lı telefonu [telefon] olarak maskeler", () => {
    expect(maskPII("05321234567")).toBe("[telefon]");
  });

  it("11 haneli TCKN'yi [tckn] olarak maskeler", () => {
    expect(maskPII("TCKN 10000000146")).toBe("TCKN [tckn]");
  });

  it("boşluklu Türkiye IBAN'ını [iban] olarak maskeler", () => {
    expect(maskPII("IBAN TR33 0006 1005 1978 6457 8413 26")).toBe(
      "IBAN [iban]",
    );
  });

  it("sipariş numarası ve tutarı değiştirmez", () => {
    expect(maskPII("Sipariş #12345 tutarı ₺1.490")).toBe(
      "Sipariş #12345 tutarı ₺1.490",
    );
  });

  it("boş metni olduğu gibi döndürür", () => {
    expect(maskPII("")).toBe("");
  });

  it("boşluksuz Türkiye IBAN'ını [iban] olarak maskeler", () => {
    expect(maskPII("TR330006100519786457841326")).toBe("[iban]");
  });

  it("4–6 haneli sayıları maskelerken korur", () => {
    expect(maskPII("Posta kodu 34000, sipariş 123456")).toBe(
      "Posta kodu 34000, sipariş 123456",
    );
  });

  it("aynı metindeki bütün kişisel verileri maskeler", () => {
    expect(
      maskPII(
        "ali@ornek.com, 0532 123 45 67, TCKN 10000000146, IBAN TR33 0006 1005 1978 6457 8413 26",
      ),
    ).toBe("[email], [telefon], TCKN [tckn], IBAN [iban]");
  });
});

describe("maskPIIValue", () => {
  it("nesne ve dizilerdeki metinleri maskeler", () => {
    expect(
      maskPIIValue({
        email: "ali@ornek.com",
        attempt: 3,
        recipients: ["veli@ornek.com", 42],
      }),
    ).toEqual({
      email: "[email]",
      attempt: 3,
      recipients: ["[email]", 42],
    });
  });

  it("metin olmayan değerleri olduğu gibi bırakır", () => {
    expect(maskPIIValue(123456)).toBe(123456);
    expect(maskPIIValue(true)).toBe(true);
    expect(maskPIIValue(null)).toBeNull();
  });
});
