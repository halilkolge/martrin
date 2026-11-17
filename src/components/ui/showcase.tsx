"use client";

import { useState } from "react";

import { Button } from "./button";
import { Modal } from "./modal";
import { Section } from "./showcase-section";
import { ShowcaseFields } from "./showcase-fields";
import { ShowcaseFoundations } from "./showcase-foundations";

/** `/ui` önizleme sayfasının istemci tarafı: her bileşenin varyantları. */
export function UiShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-8">
      <header className="max-w-[60ch]">
        <p className="text-sm text-muted">Tasarım sistemi · E0.5</p>
        <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink">
          Bileşen önizleme
        </h1>
        <p className="mt-3 text-[15px] text-muted">
          Martrin tasarım token&apos;ları ve ortak bileşenleri. Bu sayfa
          yalnızca geliştirme içindir, arama motorlarına kapalıdır.
        </p>
      </header>

      <div className="mt-8 grid gap-6">
        <ShowcaseFoundations />
        <ShowcaseFields />

        <Section
          id="modal"
          title="Modal"
          description="Odak yönetimi, Esc ile kapatma ve açan öğeye geri dönüş."
        >
          <Button onClick={() => setModalOpen(true)}>Modalı aç</Button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Örnek modal"
            footer={
              <Button onClick={() => setModalOpen(false)}>Anladım</Button>
            }
          >
            <p>
              Bu pencere Esc tuşuyla, sağ üstteki kapatma butonuyla ya da arka
              plana tıklanarak kapatılabilir.
            </p>
          </Modal>
        </Section>
      </div>
    </div>
  );
}
