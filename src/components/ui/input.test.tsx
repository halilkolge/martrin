import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Input } from "./input";

afterEach(cleanup);

describe("Input", () => {
  it("etiketiyle alanı bulur", () => {
    render(<Input label="E-posta" type="email" />);

    const field = screen.getByLabelText("E-posta");

    expect(field.tagName).toBe("INPUT");
    expect(field).not.toHaveAttribute("aria-invalid");
  });

  it("hata verilince aria-invalid olur ve açıklamaya bağlanır", () => {
    render(<Input label="E-posta" type="email" error="Geçersiz e-posta" />);

    const field = screen.getByLabelText("E-posta");

    expect(field).toHaveAttribute("aria-invalid", "true");
    expect(field).toHaveAccessibleDescription("Geçersiz e-posta");
  });

  it("ipucu metnini açıklamaya bağlar", () => {
    render(<Input label="Telefon" hint="Başında 0 olmadan girin." />);

    expect(screen.getByLabelText("Telefon")).toHaveAccessibleDescription(
      "Başında 0 olmadan girin.",
    );
  });
});
