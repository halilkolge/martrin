import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button, type ButtonVariant } from "./button";

afterEach(cleanup);

const VARIANTS: ButtonVariant[] = ["primary", "dark", "outline", "ghost"];

describe("Button", () => {
  it("dört varyantı render eder", () => {
    for (const variant of VARIANTS) {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole("button", { name: variant })).toBeInTheDocument();
    }
  });

  it("disabled iken tıklama onClick'i çağırmaz", () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Kaydet
      </Button>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Kaydet" }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading iken aria-busy olur ve devre dışı kalır", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Gönder
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Gönder" });

    expect(button).toHaveAttribute("aria-busy", "true");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("href verilince bağlantı render eder", () => {
    render(<Button href="/kampanyalar">Kampanyalar</Button>);

    const link = screen.getByRole("link", { name: "Kampanyalar" });

    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/kampanyalar");
  });
});
