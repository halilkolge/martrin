# design/

Bu klasör **yalnızca referanstır**, uygulamanın parçası değildir. Derlenmez, lint ve tip kontrolüne girmez.

- `prototype/`: Tıklanabilir prototipin kaynak kodu (Vite + React + TS + Tailwind). Ekran düzeni, metinler, renkler ve bileşen davranışı için kaynak olarak kullanılır. Kod kopyalanabilir ama Next.js yapısına ve AGENTS.md standartlarına uyarlanmalıdır. İçerikteki kişi ve firma isimleri hayalidir.
  - Sayfalar: `prototype/src/pages/*.tsx`
  - Ortak bileşenler ve logo: `prototype/src/ui.tsx`
  - Örnek veri ve komisyon oranları: `prototype/src/data.ts`
  - Renk ve font ayarları: `prototype/tailwind.config.js`, `prototype/src/index.css`
- `brand/`: Logo ("Pano-m") SVG ve PNG dosyaları. Uygulamaya `public/brand/` altına kopyalanarak kullanılır.
