"use client";
import { useActionState } from "react";
import {
  submitContact,
  type ContactState,
} from "@/app/(marketing)/iletisim/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
const initial: ContactState = {};
const topics = [
  "Reklam vermek istiyorum",
  "Alanımı listelemek istiyorum",
  "Influencer olarak katılmak",
  "Belediye iş birliği",
  "Ödeme ve fatura",
  "Basın",
];
export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);
  if (state.ticket)
    return (
      <section className="grid gap-4 rounded-card bg-white p-6 md:p-8">
        <h2 className="font-display text-3xl font-semibold">Mesajın alındı</h2>
        <p>Takip numaran</p>
        <b className="font-display text-2xl">{state.ticket}</b>
        <p>Sonraki yazışmalarda bu numarayı belirt.</p>
      </section>
    );
  return (
    <form
      action={action}
      className="grid gap-4 rounded-card bg-white p-6 md:p-8"
      noValidate
    >
      <div>
        <h2 className="font-display text-2xl font-semibold">Mesaj gönder</h2>
        <p className="mt-1 text-muted">
          &quot;İsteğe bağlı&quot; yazanlar dışında tüm alanlar zorunlu.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Ad soyad"
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Elif Aydın"
          required
          error={state.errors?.name}
        />
        <Input
          label="E-posta"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="elif@ornek.com"
          required
          error={state.errors?.email}
        />
        <Input
          label={
            <>
              Telefon<span className="text-muted"> (isteğe bağlı)</span>
            </>
          }
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="05xx xxx xx xx"
          error={state.errors?.phone}
        />
        <Input
          label={
            <>
              Şirket<span className="text-muted"> (isteğe bağlı)</span>
            </>
          }
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Kuzey Kahve A.Ş."
        />
      </div>
      <Select
        label="Konu"
        id="topic"
        name="topic"
        defaultValue=""
        required
        error={state.errors?.topic}
      >
        <option value="">Yukarıdan seç ya da yaz</option>
        {topics.map((topic) => (
          <option key={topic}>{topic}</option>
        ))}
      </Select>
      <Textarea
        label="Mesaj"
        id="message"
        name="message"
        rows={6}
        placeholder="Kampanya dönemi, şehir, bütçe ya da sipariş numarası gibi detayları ekle."
        required
        error={state.errors?.message}
      />
      <Checkbox
        label={
          <>
            <a className="underline underline-offset-2" href="/kvkk">
              KVKK aydınlatma metnini
            </a>{" "}
            okudum; iletişim bilgilerimin bu talebe yanıt vermek için
            işlenmesini onaylıyorum.
          </>
        }
        id="kvkk"
        name="kvkk"
        error={state.errors?.kvkk}
      />
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={pending}>
          Gönder
        </Button>
        {Object.values(state.errors ?? {}).length > 0 ? (
          <span className="text-sm text-bad">
            İşaretli alanları kontrol et.
          </span>
        ) : null}
      </div>
    </form>
  );
}
