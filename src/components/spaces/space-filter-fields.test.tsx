import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SpaceFilterFields } from "./space-filter-fields";

afterEach(cleanup);

describe("SpaceFilterFields", () => {
  it("seçimleri hemen gösterir ve aynı düğümde odağı korur", () => {
    const onNavigate = vi.fn();
    render(
      <SpaceFilterFields
        params={{}}
        maxPrice={50_000_000}
        onNavigate={onNavigate}
        onPriceChange={vi.fn()}
      />,
    );
    const type = screen.getByRole("checkbox", { name: "AVM LED" });
    const digital = screen.getByRole("checkbox", {
      name: "Sadece dijital ekranlar",
    });

    type.focus();
    fireEvent.click(type);
    fireEvent.click(digital);
    expect(type).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "AVM LED" })).toBe(type);
    expect(document.activeElement).toBe(type);
    expect(digital).toBeChecked();
    expect(onNavigate).toHaveBeenCalledTimes(2);
  });

  it("params değişince seçimleri URL değerleriyle eşitler", () => {
    const { rerender, getByRole } = render(
      <SpaceFilterFields
        params={{}}
        maxPrice={50_000_000}
        onNavigate={vi.fn()}
        onPriceChange={vi.fn()}
      />,
    );

    rerender(
      <SpaceFilterFields
        params={{ types: ["avm_led"], digital: true }}
        maxPrice={50_000_000}
        onNavigate={vi.fn()}
        onPriceChange={vi.fn()}
      />,
    );

    expect(getByRole("checkbox", { name: "AVM LED" })).toBeChecked();
    expect(
      getByRole("checkbox", { name: "Sadece dijital ekranlar" }),
    ).toBeChecked();
  });
});
