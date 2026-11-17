import type { ErrorEvent } from "@sentry/nextjs";
import { describe, expect, it } from "vitest";

import { createSentryOptions, maskSentryEvent } from "./sentry-options";

function createEvent(): ErrorEvent {
  return {
    type: undefined,
    message: "Ödeme ali@ornek.com için başarısız",
    exception: {
      values: [
        { type: "Error", value: "Tel: 0532 123 45 67" },
        { type: "Error", value: "Güvenli mesaj" },
      ],
    },
    breadcrumbs: [{ message: "IBAN TR33 0006 1005 1978 6457 8413 26" }],
    user: { id: "42", email: "ali@ornek.com" },
  };
}

describe("maskSentryEvent", () => {
  it("olay metinlerini maskeler ve kullanıcı bilgisini siler", () => {
    const event = maskSentryEvent(createEvent());

    expect(event.message).toBe("Ödeme [email] için başarısız");
    expect(event.exception?.values?.[0]?.value).toBe("Tel: [telefon]");
    expect(event.exception?.values?.[1]?.value).toBe("Güvenli mesaj");
    expect(event.breadcrumbs?.[0]?.message).toBe("IBAN [iban]");
    expect(event.user).toBeUndefined();
  });

  it("kişisel veri içermeyen olayı bozmadan döndürür", () => {
    const event: ErrorEvent = {
      type: undefined,
      message: "Sunucu hatası",
    };

    expect(maskSentryEvent(event)).toEqual({
      type: undefined,
      message: "Sunucu hatası",
    });
  });
});

describe("createSentryOptions", () => {
  it("DSN boşken SDK'yı kapatır ve performans izlemeyi kapatır", () => {
    const options = createSentryOptions(undefined);

    expect(options.enabled).toBe(false);
    expect(options.dsn).toBeUndefined();
    expect(options.sendDefaultPii).toBe(false);
    expect(options.tracesSampleRate).toBe(0);
    expect(options.beforeSend).toBe(maskSentryEvent);
  });

  it("DSN doluyken SDK'yı etkinleştirir", () => {
    const options = createSentryOptions(
      "https://examplePublicKey@example.invalid/0",
    );

    expect(options.enabled).toBe(true);
    expect(options.dsn).toBe("https://examplePublicKey@example.invalid/0");
    expect(options.sendDefaultPii).toBe(false);
    expect(options.tracesSampleRate).toBe(0);
  });
});
