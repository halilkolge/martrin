"use client";
import { useState } from "react";
const rules = [
  "Tarih damgalı fotoğraf",
  "Konum bilgisi",
  "Yayın videosu",
  "Siparişle eşleşen reklam içeriği",
];
export default function ProofPage() {
  const [checked, setChecked] = useState<string[]>([]);
  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <header className="grid max-w-3xl gap-4">
        <p className="text-muted">Yayın kanıtı</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          Yayını kanıtla, ödemen serbest kalsın
        </h1>
        <p className="text-lg text-muted">
          Satıcı tarih damgalı ve konumlu fotoğraf ile video yükler. Reklam
          veren kanıtı inceler; 72 saat içinde itiraz gelmezse onay
          otomatikleşir.
        </p>
      </header>
      <section className="grid gap-5 rounded-card bg-white p-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">Kanıt kontrol listesi</h2>
          <p className="my-3 text-muted">
            Her maddeyi işaretle, liste tamamlanınca gönderim açılır.
          </p>
          {rules.map((rule) => (
            <label key={rule} className="flex gap-3 border-b border-line py-3">
              <input
                type="checkbox"
                checked={checked.includes(rule)}
                onChange={(e) =>
                  setChecked(
                    e.target.checked
                      ? [...checked, rule]
                      : checked.filter((item) => item !== rule),
                  )
                }
              />
              {rule}
            </label>
          ))}
        </div>
        <div className="rounded-card bg-lime p-6">
          <h2 className="font-display text-2xl">Kanıt kuralları</h2>
          <p className="mt-3">
            Fotoğraf ve video kampanyanın gerçekten yayınlandığını göstermeli.
            Konum ve tarih bilgileri doğrulanır; eksik kanıt düzeltilene kadar
            ödeme emanette kalır.
          </p>
          <p className="mt-3">
            Influencer paylaşımlarında paylaşım bağlantısı ve istatistik ekran
            görüntüsü eklenir.
          </p>
          <button
            disabled={checked.length !== rules.length}
            className="mt-5 rounded-xl bg-ink px-5 py-3 text-white"
          >
            Kanıtı gönder
          </button>
        </div>
      </section>
    </div>
  );
}
