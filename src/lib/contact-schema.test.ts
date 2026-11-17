import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";
const valid = {
  name: "Elif Aydın",
  email: "elif@ornek.com",
  phone: "",
  topic: "Basın",
  message: "Merhaba, bilgi almak istiyorum.",
  kvkk: true,
};
describe("iletişim şeması", () => {
  it("geçerli mesajı kabul eder", () =>
    expect(contactSchema.safeParse(valid).success).toBe(true));
  it.each([
    [{ ...valid, name: "" }, "ad"],
    [{ ...valid, email: "ali@" }, "e-posta"],
    [{ ...valid, phone: "123456789" }, "telefon"],
    [{ ...valid, message: "çok kısa" }, "mesaj"],
    [{ ...valid, kvkk: false }, "KVKK"],
  ])("geçersiz %s değerini reddeder (%s)", (input) =>
    expect(contactSchema.safeParse(input).success).toBe(false),
  );
});
