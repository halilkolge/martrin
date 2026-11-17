"use server";
import { contactSchema } from "@/lib/contact-schema";
export type ContactState = { errors?: Record<string, string>; ticket?: string };
export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const input = Object.fromEntries(
    ["name", "email", "phone", "topic", "message"].map((key) => [
      key,
      String(formData.get(key) ?? ""),
    ]),
  );
  const parsed = contactSchema.safeParse({
    ...input,
    kvkk: formData.get("kvkk") === "on",
  });
  if (!parsed.success)
    return {
      errors: Object.fromEntries(
        parsed.error.issues.map((issue) => [
          String(issue.path[0]),
          issue.message,
        ]),
      ),
    };
  const now = new Date();
  const ticket = `MRT-${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  console.info("İletişim talebi alındı", { ticket, topic: parsed.data.topic });
  return { ticket };
}
