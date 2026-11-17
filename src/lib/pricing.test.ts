import { describe, expect, it } from "vitest";
import { yearlyMonthly, yearlyTotal } from "./pricing";

describe("yıllık paket fiyatı", () => {
  it("aylık eşdeğer ve yıllık toplamı hesaplar", () => {
    expect(yearlyMonthly(149000)).toBe(124167);
    expect(yearlyTotal(149000)).toBe(1490000);
  });
  it("ücretsiz paketi sıfırda tutar", () => {
    expect(yearlyMonthly(0)).toBe(0);
    expect(yearlyTotal(0)).toBe(0);
  });
});
