"use client";
import { useActionState } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/(marketing)/iletisim/actions";
const initial: ContactState = {};
export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  if (state.ticket)
    return (
      <section className="rounded-card bg-white p-8">
        <h2 className="font-display text-3xl font-semibold">Mesajın alındı</h2>
        <p className="mt-3">Mesajını ilgili ekibe ilettik.</p>
        <p className="mt-4">
          Takip numaran: <b>{state.ticket}</b>
        </p>
      </section>
    );
  const fields = [
    ["name", "Ad soyad", "text"],
    ["email", "E-posta", "email"],
    ["phone", "Telefon (isteğe bağlı)", "tel"],
    ["topic", "Konu", "text"],
  ] as const;
  return (
    <form
      action={action}
      className="grid gap-4 rounded-card bg-white p-6"
      noValidate
    >
      <h2 className="font-display text-2xl font-semibold">Mesaj gönder</h2>
      {fields.map(([name, label, type]) => (
        <div key={name} className="grid gap-1">
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            className="h-12 rounded-2xl bg-paper px-4"
            aria-invalid={Boolean(state.errors?.[name])}
            aria-describedby={
              state.errors?.[name] ? `${name}-error` : undefined
            }
          />
          {state.errors?.[name] ? (
            <p id={`${name}-error`} className="text-bad" role="alert">
              {state.errors[name]}
            </p>
          ) : null}
        </div>
      ))}
      <div className="grid gap-1">
        <label htmlFor="message">Mesaj</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="rounded-2xl bg-paper p-4"
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
        />
        {state.errors?.message ? (
          <p id="message-error" className="text-bad" role="alert">
            {state.errors.message}
          </p>
        ) : null}
      </div>
      <label className="flex items-start gap-3">
        <input
          id="kvkk"
          type="checkbox"
          name="kvkk"
          className="mt-1"
          aria-invalid={Boolean(state.errors?.kvkk)}
          aria-describedby={state.errors?.kvkk ? "kvkk-error" : undefined}
        />
        <span>Aydınlatma metnini okudum ve onaylıyorum.</span>
      </label>
      {state.errors?.kvkk ? (
        <p id="kvkk-error" className="text-bad" role="alert">
          {state.errors.kvkk}
        </p>
      ) : null}
      <button disabled={pending} className="h-12 rounded-2xl bg-ink text-white">
        {pending ? "Gönderiliyor…" : "Mesaj gönder"}
      </button>
    </form>
  );
}
