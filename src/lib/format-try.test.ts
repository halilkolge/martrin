import { describe, expect, it } from "vitest";
import { formatTRY } from "./format-try";

describe("formatTRY", () => {
  it("149000 kuruşu ₺1.490 olarak gösterir", () => {
    expect(formatTRY(149000)).toBe("₺1.490");
  });

  it("0 kuruşu ₺0 olarak gösterir", () => {
    expect(formatTRY(0)).toBe("₺0");
  });

  it("12345 kuruşu ₺123,45 olarak gösterir", () => {
    expect(formatTRY(12345)).toBe("₺123,45");
  });

  it("5 kuruşu ₺0,05 olarak gösterir", () => {
    expect(formatTRY(5)).toBe("₺0,05");
  });

  it("123456789 kuruşu ₺1.234.567,89 olarak gösterir", () => {
    expect(formatTRY(123456789)).toBe("₺1.234.567,89");
  });

  it("negatif tutarı -₺1.490 olarak gösterir", () => {
    expect(formatTRY(-149000)).toBe("-₺1.490");
  });

  it("tamsayı olmayan tutarda RangeError fırlatır", () => {
    expect(() => formatTRY(1.5)).toThrow(RangeError);
  });

  it("NaN tutarda RangeError fırlatır", () => {
    expect(() => formatTRY(Number.NaN)).toThrow(RangeError);
  });

  it("Infinity tutarda RangeError fırlatır", () => {
    expect(() => formatTRY(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});
