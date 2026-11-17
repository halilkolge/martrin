import { ContactForm } from "@/components/marketing/contact-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
const faq = [
  [
    "Ödeme satıcıya ne zaman geçer?",
    "Reklam verenin ödemesi lisanslı ödeme kuruluşunda emanette tutulur. Satıcı yayın kanıtını yükler, reklam veren onaylayınca ödeme satıcıya geçer. Reklam veren 72 saat içinde itiraz etmezse kanıt otomatik onaylanır. Uzun kampanyalarda ödeme aşamalara bölünür, her aşama kendi kanıtıyla serbest kalır.",
  ],
  [
    "Yayın kanıtını nasıl yüklerim?",
    "Panelindeki siparişe tarih damgalı ve konumlu bir fotoğraf ile bir video yükle. İkisi de zorunlu. Reklam veren isterse ₺3.500 ücretle bağımsız saha denetimi de talep edebilir; denetçi alanı yerinde kontrol eder.",
  ],
  [
    "Komisyon oranları ne kadar?",
    "Komisyon yalnızca satıcıdan, iş tamamlanınca kesilir: influencer %15, billboard %8, AVM %10, DOOH %10, belediye alanları %6. Reklam veren komisyon ödemez. İlanını öne çıkarmak istersen haftalık ₺1.500 ödersin.",
  ],
  [
    "Belediye alanları nasıl listeleniyor?",
    "İki yol var: ihaleyi kazanmış işletici şirket kendi hesabıyla listeler ya da belediye doğrudan kendi hesabını açar. Her iki durumda da ödeme ve kanıt akışı diğer alanlarla aynıdır.",
  ],
  [
    "Faturayı kim keser?",
    "Satıcı hizmet faturasını reklam verene kendisi keser. Martrin yalnızca kendi komisyonu için satıcıya fatura keser. Faturası olmayan influencer'lara ödeme, sosyal içerik üreticisi istisnası kapsamındaki banka hesabına yapılır.",
  ],
  [
    "Siparişi iptal edebilir miyim?",
    "Satıcı siparişi kabul etmeden önce iptal edersen ödemenin tamamı iade edilir. Yayın başladıktan sonra iptal ve iade talepleri itiraz süreciyle değerlendirilir; destek ekibi iki tarafı dinleyerek karar verir.",
  ],
];
export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:px-8 lg:px-12">
      <header className="grid max-w-[760px] gap-4">
        <span className="text-muted">İletişim</span>
        <h1 className="font-display text-5xl font-semibold">
          Bize <span className="rounded-full bg-lime px-3 py-1">ulaş</span>
        </h1>
        <p className="text-lg text-muted">
          Kampanya, listeleme, ödeme ya da iş birliği; sorunu yaz, doğru ekibe
          iletelim. Çoğu mesaja bir iş günü içinde dönüyoruz.
        </p>
      </header>
      <section className="grid items-start gap-5 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />
        <aside className="grid gap-4">
          <Card>
            <b className="font-display text-xl">İletişim bilgileri</b>
            <p className="mt-3">Destek e-postası</p>
            <b>destek@martrin.com.tr</b>
            <p className="mt-2">Telefon</p>
            <b>0850 000 00 00</b>
          </Card>
          <Card>
            <b className="font-display text-xl">Çalışma saatleri</b>
            <p className="mt-3 flex justify-between">
              <span>Hafta içi</span>
              <span>09.00 – 18.00</span>
            </p>
            <p className="flex justify-between">
              <span>Cumartesi</span>
              <span>10.00 – 15.00</span>
            </p>
            <p className="flex justify-between">
              <span>Pazar ve resmî tatiller</span>
              <span>Kapalı</span>
            </p>
            <p className="mt-2 text-sm text-muted">
              Kampanyası yayında olan reklam verenler için hafta sonu acil hat
              açık.
            </p>
          </Card>
          <Card>
            <b className="font-display text-xl">Ofis</b>
            <address className="mt-3 not-italic">
              Levent Mah. Çarşı Cad. No: 12, Kat 7<br />
              34330 Beşiktaş / İstanbul
            </address>
            <p className="mt-2 text-sm text-muted">
              Ziyaretler randevu ile. Örnek adrestir.
            </p>
          </Card>
          <Card tone="lime">
            <span className="text-sm">Ortalama ilk yanıt süresi</span>
            <b className="block font-display text-4xl">3 saat</b>
            <span>Son 30 günde, mesai saatleri içinde</span>
          </Card>
        </aside>
      </section>
      <section className="grid gap-5 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <span className="text-sm text-muted">Sık sorulan sorular</span>
          <h2 className="mt-2 font-display text-3xl font-semibold">
            Önce buraya bak
          </h2>
          <p className="mt-3 text-muted">
            Ödeme, kanıt ve fatura sorularının çoğu burada yanıtlı. Detaylar
            için{" "}
            <a className="underline" href="/emanet-odeme">
              emanetli ödeme
            </a>{" "}
            ve{" "}
            <a className="underline" href="/yayin-kaniti">
              yayın kanıtı
            </a>{" "}
            sayfalarına bak.
          </p>
        </div>
        <div className="grid gap-3">
          {faq.map(([question, answer]) => (
            <Card key={question}>
              <h3 className="font-display font-medium">{question}</h3>
              <p className="mt-2 text-muted">{answer}</p>
            </Card>
          ))}
        </div>
      </section>
      <Card tone="ink">
        <b className="font-display text-2xl">
          Büyük kampanya için satış ekibiyle görüş
        </b>
        <p className="mt-2">
          Birden fazla şehirde billboard, AVM ekranı ve influencer&apos;ı tek
          planda birleştirelim.
        </p>
        <Button className="mt-4" href="/ilanlar">
          Kampanya ilanı aç
        </Button>
        <p className="mt-3">
          SSS yanıtları örnek metindir, avukat onayından geçecek.
        </p>
      </Card>
    </div>
  );
}
