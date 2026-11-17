import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { LogoMark } from "@/components/brand/logo-mark";

import { Badge } from "./badge";
import { Card, type CardTone } from "./card";
import { Checkbox } from "./checkbox";
import { Select } from "./select";
import { Table } from "./table";
import { Textarea } from "./textarea";

afterEach(cleanup);

describe("Card", () => {
  it("içeriği ve ek sınıfı render eder", () => {
    render(<Card className="test-kart">Kampanya özeti</Card>);

    const card = screen.getByText("Kampanya özeti");

    expect(card).toHaveClass("rounded-card", "bg-white", "test-kart");
  });

  it("her tona doğru arka plan sınıfını verir", () => {
    const tones: Array<[CardTone, string]> = [
      ["white", "bg-white"],
      ["ink", "bg-ink"],
      ["violet", "bg-violet"],
      ["lime", "bg-lime"],
      ["paper", "bg-paper"],
    ];

    render(
      <>
        {tones.map(([tone]) => (
          <Card key={tone} tone={tone}>
            {tone}
          </Card>
        ))}
      </>,
    );

    for (const [tone, background] of tones) {
      expect(screen.getByText(tone)).toHaveClass(background);
    }
    expect(screen.getAllByText(/^(white|ink|violet|lime|paper)$/)).toHaveLength(
      5,
    );
    expect(screen.getByText("white")).toHaveClass("bg-white");
    for (const tone of ["ink", "violet", "lime", "paper"] as const) {
      expect(screen.getByText(tone)).not.toHaveClass("bg-white");
    }
  });
});

describe("Badge", () => {
  it("dört varyantı render eder", () => {
    render(
      <>
        <Badge variant="success">Onaylandı</Badge>
        <Badge variant="warning">Bekliyor</Badge>
        <Badge variant="info">Bilgi</Badge>
        <Badge variant="neutral">Nötr</Badge>
      </>,
    );

    expect(screen.getByText("Onaylandı")).toBeInTheDocument();
    expect(screen.getByText("Bekliyor")).toBeInTheDocument();
    expect(screen.getByText("Bilgi")).toBeInTheDocument();
    expect(screen.getByText("Nötr")).toBeInTheDocument();
  });
});

describe("Textarea", () => {
  it("etiket ve hata açıklaması bağlar", () => {
    render(
      <Textarea label="Kampanya notu" error="Not en az 10 karakter olmalı." />,
    );

    const field = screen.getByLabelText("Kampanya notu");

    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAccessibleDescription("Not en az 10 karakter olmalı.");
  });
});

describe("Select", () => {
  it("seçeneklerle render eder ve hatayı bildirir", () => {
    render(
      <Select label="Şehir" error="Şehir seçin.">
        <option value="izmir">İzmir</option>
        <option value="ankara">Ankara</option>
      </Select>,
    );

    const field = screen.getByLabelText("Şehir");

    expect(screen.getByRole("option", { name: "İzmir" })).toBeInTheDocument();
    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAccessibleDescription("Şehir seçin.");
  });
});

describe("Checkbox", () => {
  it("etiketle tıklanınca işaretlenir", () => {
    render(<Checkbox label="Koşulları okudum." />);

    const field = screen.getByLabelText("Koşulları okudum.");

    expect(field).not.toBeChecked();

    fireEvent.click(field);

    expect(field).toBeChecked();
  });

  it("hata metnini açıklamaya bağlar", () => {
    render(<Checkbox label="Onay" error="Onay zorunludur." />);

    expect(screen.getByLabelText("Onay")).toHaveAccessibleDescription(
      "Onay zorunludur.",
    );
  });
});

describe("Table", () => {
  it("başlık, satır ve hücreleri render eder", () => {
    render(
      <Table
        caption="Örnek alanlar"
        columns={[
          { key: "space", header: "Alan" },
          { key: "price", header: "Fiyat", align: "right" },
        ]}
        rows={[
          {
            key: "alsancak",
            cells: { space: "Alsancak billboard", price: "₺18.000" },
          },
        ]}
      />,
    );

    expect(
      screen.getByRole("table", { name: "Örnek alanlar" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Alan" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: "Alsancak billboard" }),
    ).toBeInTheDocument();
  });

  it("satır yoksa boş durum metnini gösterir", () => {
    render(<Table columns={[{ key: "space", header: "Alan" }]} rows={[]} />);

    expect(screen.getByText("Kayıt bulunamadı")).toBeInTheDocument();
  });
});

describe("LogoMark", () => {
  it("varsayılan olarak dekoratiftir", () => {
    const { container } = render(<LogoMark />);

    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("title verilince erişilebilir ad kazanır", () => {
    render(<LogoMark title="Martrin logosu" />);

    expect(
      screen.getByRole("img", { name: "Martrin logosu" }),
    ).toBeInTheDocument();
  });
});
