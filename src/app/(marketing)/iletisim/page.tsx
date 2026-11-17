import { ContactForm } from "@/components/marketing/contact-form";
export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:px-12">
      <header className="grid content-start gap-4">
        <span className="text-muted">İletişim</span>
        <h1 className="font-display text-5xl font-semibold">Bize ulaş</h1>
        <p className="text-lg text-muted">
          Kampanya, listeleme, ödeme ya da iş birliği; sorunu yaz, doğru ekibe
          iletelim. Çoğu mesaja bir iş günü içinde dönüyoruz.
        </p>
        <h2 className="mt-4 font-display text-2xl">Sık sorulanlar</h2>
        <p>
          <b>Ödeme satıcıya ne zaman geçer?</b>
          <br />
          Yayın kanıtı onaylanınca ödeme satıcıya geçer. 72 saat içinde itiraz
          gelmezse kanıt otomatik onaylanır.
        </p>
        <p>
          <b>Komisyon oranları ne kadar?</b>
          <br />
          Komisyon yalnızca satıcıdan, iş tamamlanınca kesilir. Reklam veren
          komisyon ödemez.
        </p>
      </header>
      <ContactForm />
    </div>
  );
}
