"use client";
import { useState } from "react";
import { formatTRY } from "@/lib/format-try";
export default function MunicipalitiesPage() {
  const [points, setPoints] = useState(40);
  const [occupancy, setOccupancy] = useState(60);
  const net = Math.round(
    (((points * 350000 * 52 * occupancy) / 100) * 0.94) / 12,
  );
  return (
    <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <header className="grid max-w-3xl gap-4">
        <p className="text-muted">Belediyeler ve işletici şirketler için</p>
        <h1 className="font-display text-4xl font-semibold md:text-5xl">
          Kent reklam noktalarını şeffaf biçimde kirala
        </h1>
        <p className="text-lg text-muted">
          Durak panoları, megalight&apos;lar ve dijital ekranlar tek takvimde.
          Ödeme emanette bekler, yayın kanıtlanınca hesabına geçer. Martrin
          yalnızca satılan haftadan %6 komisyon alır.
        </p>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <article className="rounded-card bg-white p-6">
          <h2 className="font-display text-2xl">Doğrudan belediye hesabı</h2>
          <p>
            Belediye kendi reklam noktalarını Martrin&apos;de açar. Fiyatı,
            takvimi ve onayı belediye ekibi yönetir.
          </p>
        </article>
        <article className="rounded-card bg-ink p-6 text-white">
          <h2 className="font-display text-2xl">
            İhaleyi kazanmış işletici şirket
          </h2>
          <p>
            Reklam noktalarının işletme hakkını ihaleyle alan şirket envanteri
            listeler.
          </p>
        </article>
      </section>
      <section className="grid gap-4 rounded-card bg-white p-6 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl">
            Noktaların ne kadar kazandırır?
          </h2>
          <label htmlFor="points">Nokta sayısı</label>
          <input
            id="points"
            type="number"
            min="0"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="block rounded-xl bg-paper p-3"
          />
          <label htmlFor="occupancy">Doluluk oranı %{occupancy}</label>
          <input
            id="occupancy"
            type="range"
            min="0"
            max="100"
            step="5"
            value={occupancy}
            onChange={(e) => setOccupancy(Number(e.target.value))}
          />
        </div>
        <div>
          <p>Tahmini aylık net gelir</p>
          <strong className="font-display text-4xl">{formatTRY(net)}</strong>
          <p>
            Tahmin yılı 52 hafta sayar. KDV, ihale payı ve kamusal duyuru
            haftaları dahil değildir.
          </p>
        </div>
      </section>
      <p className="text-center text-sm text-muted">
        İstatistikler ve kurum adları hayalidir. Sözleşme ve kota koşulları
        örnek metindir, avukat onayından geçecek.
      </p>
    </div>
  );
}
