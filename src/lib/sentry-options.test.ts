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

  it("request.url içindeki kişisel veriyi maskeler", () => {
    const event: ErrorEvent = {
      type: undefined,
      request: { url: "https://martrin.com/ara?email=ali@ornek.com" },
    };

    const masked = maskSentryEvent(event);

    expect(masked.request?.url).toBe("https://martrin.com/ara?email=[email]");
    expect(masked.request?.url).not.toContain("ali@ornek.com");
  });

  it("request.query_string içindeki kişisel veriyi maskeler", () => {
    const event: ErrorEvent = {
      type: undefined,
      request: { query_string: "email=ali@ornek.com&telefon=05321234567" },
    };

    const masked = maskSentryEvent(event);

    expect(masked.request?.query_string).toBe(
      "email=[email]&telefon=[telefon]",
    );
    expect(masked.request?.query_string).not.toContain("ali@ornek.com");
  });

  it("request.data içindeki kişisel veriyi maskeler", () => {
    const event: ErrorEvent = {
      type: undefined,
      request: { data: { email: "ali@ornek.com", siparisNo: 1234 } },
    };

    const masked = maskSentryEvent(event);

    expect(masked.request?.data).toEqual({ email: "[email]", siparisNo: 1234 });
  });

  it("breadcrumb data içindeki kişisel veriyi maskeler", () => {
    const event: ErrorEvent = {
      type: undefined,
      breadcrumbs: [
        { message: "İstek", data: { email: "ali@ornek.com", tutar: 1490 } },
      ],
    };

    const masked = maskSentryEvent(event);

    expect(masked.breadcrumbs?.[0]?.data).toEqual({
      email: "[email]",
      tutar: 1490,
    });
    expect(masked.breadcrumbs?.[0]?.message).toBe("İstek");
  });

  it("extra içindeki kişisel veriyi maskeler", () => {
    const event: ErrorEvent = {
      type: undefined,
      extra: { email: "ali@ornek.com", telefon: "0532 123 45 67" },
    };

    const masked = maskSentryEvent(event);

    expect(masked.extra).toEqual({
      email: "[email]",
      telefon: "[telefon]",
    });
  });

  it("contexts içindeki kişisel veriyi maskeler", () => {
    const event: ErrorEvent = {
      type: undefined,
      contexts: { payment: { email: "ali@ornek.com", deneme: 3 } },
    };

    const masked = maskSentryEvent(event);

    expect(masked.contexts).toEqual({
      payment: { email: "[email]", deneme: 3 },
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
