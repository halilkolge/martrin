import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { Button } from "./button";
import { Modal } from "./modal";

afterEach(cleanup);

function ModalHarness() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Modalı aç</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Örnek modal"
        footer={<Button onClick={() => setOpen(false)}>Anladım</Button>}
      >
        Modal içeriği
      </Modal>
    </div>
  );
}

describe("Modal", () => {
  it("başlığıyla erişilebilir bir dialog açar", () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Modalı aç" }));

    expect(
      screen.getByRole("dialog", { name: "Örnek modal" }),
    ).toBeInTheDocument();
  });

  it("Esc ile kapanır ve odağı açan butona döndürür", () => {
    render(<ModalHarness />);

    const opener = screen.getByRole("button", { name: "Modalı aç" });
    opener.focus();
    fireEvent.click(opener);

    expect(screen.getByRole("dialog", { name: "Örnek modal" })).toHaveFocus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it("kapatma butonuyla kapanır", () => {
    render(<ModalHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Modalı aç" }));
    fireEvent.click(screen.getByRole("button", { name: "Kapat" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
