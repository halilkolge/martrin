import { formatTRY } from "@/lib/format-try";

import { Badge } from "./badge";
import { Card } from "./card";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Section } from "./showcase-section";
import { Select } from "./select";
import { Table, type TableColumn, type TableRow } from "./table";
import { Textarea } from "./textarea";

const TABLE_COLUMNS: TableColumn[] = [
  { key: "space", header: "Alan" },
  { key: "city", header: "Şehir" },
  { key: "price", header: "Başlangıç", align: "right" },
  { key: "status", header: "Durum", align: "right" },
];

const TABLE_ROWS: TableRow[] = [
  {
    key: "alsancak",
    cells: {
      space: "Alsancak billboard",
      city: "İzmir",
      price: formatTRY(1800000),
      status: <Badge variant="success">Yayında</Badge>,
    },
  },
  {
    key: "kordon",
    cells: {
      space: "Kordon CLP",
      city: "İzmir",
      price: formatTRY(950000),
      status: <Badge variant="warning">Onay bekliyor</Badge>,
    },
  },
  {
    key: "avm",
    cells: {
      space: "AVM dijital ekran",
      city: "Ankara",
      price: formatTRY(4250000),
      status: <Badge variant="info">Rezerve</Badge>,
    },
  },
];

/** Form alanları, Card ve Table bölümleri. */
export function ShowcaseFields() {
  return (
    <>
      <Section
        id="form"
        title="Form alanları"
        description="Input, Textarea, Select ve Checkbox; etiket ve hata bağlantıları hazır."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="E-posta"
            type="email"
            placeholder="ornek@martrin.com"
            hint="Kampanya bildirimleri bu adrese gelir."
          />
          <Input
            label="E-posta (hatalı)"
            type="email"
            defaultValue="gecersiz-adres"
            error="Geçersiz e-posta"
          />
          <Textarea
            label="Kampanya notu"
            placeholder="Yayın tarihi ve hedef kitle tercihleriniz."
          />
          <Select label="Şehir" defaultValue="izmir">
            <option value="istanbul">İstanbul</option>
            <option value="izmir">İzmir</option>
            <option value="ankara">Ankara</option>
          </Select>
          <Checkbox
            label="Kampanya onay koşullarını okudum."
            hint="Onay verilen tarih kayda geçer."
          />
          <Checkbox
            label="E-posta bildirimi göndermeyin (hatalı örnek)."
            error="Bu tercih kampanya için zorunludur."
          />
        </div>
      </Section>

      <Section
        id="card"
        title="Card"
        description="Beyaz zemin, geniş köşe yarıçapı ve isteğe bağlı içerik."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="font-display text-lg font-semibold text-ink">
              Kampanya özeti
            </h3>
            <p className="mt-2 text-[15px] text-muted">
              İzmir lansmanı için 3 AVM ekranı ve 2 billboard seçildi.
            </p>
          </Card>
          <Card tone="lime">
            <h3 className="font-display text-lg font-semibold text-ink">
              Öne çıkan
            </h3>
            <p className="mt-2 text-[15px] text-ink">
              Vurgulu kart yüzeyi için token sınıfı yeterlidir.
            </p>
          </Card>
        </div>
      </Section>

      <Section
        id="table"
        title="Table"
        description="Başlık satırı ve dar ekranda kendi içinde kaydırılan sarmalayıcı."
      >
        <Table
          caption="Örnek kampanya alanları"
          columns={TABLE_COLUMNS}
          rows={TABLE_ROWS}
        />
      </Section>
    </>
  );
}
