import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Chip } from "./chip";

afterEach(cleanup);

describe("Chip", () => {
  it("tıklanınca aria-pressed false'tan true'ya geçer", () => {
    render(<Chip>Billboard</Chip>);

    const chip = screen.getByRole("button", { name: "Billboard" });

    expect(chip).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(chip);

    expect(chip).toHaveAttribute("aria-pressed", "true");
  });

  it("kontrollü kullanımda değişikliği dışarı bildirir", () => {
    const onPressedChange = vi.fn();

    render(
      <Chip pressed={false} onPressedChange={onPressedChange}>
        AVM ekranı
      </Chip>,
    );

    fireEvent.click(screen.getByRole("button", { name: "AVM ekranı" }));

    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(screen.getByRole("button", { name: "AVM ekranı" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });
});
