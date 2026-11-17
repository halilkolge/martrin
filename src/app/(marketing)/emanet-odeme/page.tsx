"use client";
import { useState } from "react";
import { formatTRY } from "@/lib/format-try";
const flow = [
  "Sepeti onayla",
  "Para emanete geçer",
  "Satıcı yayınlar",
  "Kanıt yüklenir",
  "Onay ya da 72 saat",
  "Para satıcıya geçer",
];
export default function EscrowPage() {
  const [amount, setAmount] = useState(40000);
  const [rate, setRate] = useState(8);
  const fee = Math.round((amount * rate) / 100);
  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <header className="grid max-w-3xl gap-4">
        <p className="text-muted">Güvenli ödeme</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          Paran, yayın kanıtına kadar emanette
        </h1>
        <p className="text-lg text-muted">
          Ödeme lisanslı ödeme kuruluşunda bekler. İş tamamlanıp kanıt
          onaylanınca satıcıya aktarılır.
        </p>
      </header>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {flow.map((step, i) => (
          <li key={step} className="rounded-card bg-white p-5">
            <span className="grid size-9 place-items-center rounded-full bg-lime font-semibold">
              {i + 1}
            </span>
            <h2 className="mt-3 font-display text-xl">{step}</h2>
          </li>
        ))}
      </ol>
      <section className="grid gap-4 rounded-card bg-white p-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Kim ne kadar alır?</h2>
          <label htmlFor="amount">Kampanya tutarı (₺)</label>
          <input
            id="amount"
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="block rounded-xl bg-paper p-3"
          />
          <label htmlFor="rate">Satıcı komisyonu (%)</label>
          <input
            id="rate"
            type="range"
            min="0"
            max="20"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>
        <div>
          <p>Satıcıya aktarılacak</p>
          <b className="font-display text-4xl">
            {formatTRY((amount - fee) * 100)}
          </b>
          <p>
            Komisyon: {formatTRY(fee * 100)} · Reklam veren yalnızca kampanya
            tutarını öder.
          </p>
        </div>
      </section>
      <p className="text-center text-sm text-muted">
        Ödeme altyapısı henüz seçilmedi. TCMB lisanslı bir pazaryeri ödeme
        kuruluşu kullanılacak. Tutarlar KDV hariçtir.
      </p>
    </div>
  );
}
