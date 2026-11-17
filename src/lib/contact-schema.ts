import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ad soyad en az 2 karakter olmalı.")
    .max(80, "Ad soyad en fazla 80 karakter olmalı."),
  email: z.email("Geçerli bir e-posta adresi yaz (ornek@alan.com)."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => !value || /^\d{10,11}$/.test(value.replace(/\s/g, "")),
      "Telefon numarası 10–11 haneli olmalı.",
    ),
  topic: z.string().trim(),
  message: z
    .string()
    .trim()
    .min(10, "Mesaj en az 10 karakter olmalı.")
    .max(2000, "Mesaj en fazla 2000 karakter olmalı."),
  kvkk: z.literal(true, {
    error: "Devam etmek için aydınlatma metnini onayla.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;
