import type { ErrorEvent } from "@sentry/nextjs";

import { maskPII } from "./mask-pii";

function maskEventTexts(event: ErrorEvent): void {
  if (event.message) {
    event.message = maskPII(event.message);
  }

  if (event.logentry?.message) {
    event.logentry.message = maskPII(event.logentry.message);
  }

  for (const exception of event.exception?.values ?? []) {
    if (exception.value) {
      exception.value = maskPII(exception.value);
    }
  }

  for (const breadcrumb of event.breadcrumbs ?? []) {
    if (breadcrumb.message) {
      breadcrumb.message = maskPII(breadcrumb.message);
    }
  }
}

/**
 * Sentry olayını göndermeden önce kişisel verileri maskeler ve kullanıcı
 * bilgisini kaldırır.
 */
export function maskSentryEvent(event: ErrorEvent): ErrorEvent {
  maskEventTexts(event);
  delete event.user;
  return event;
}

/**
 * Sentry istemci, sunucu ve edge başlangıçlarında kullanılan ortak ayarlar.
 * DSN boşsa SDK etkinleşmez; performans izleme ve replay kapalıdır.
 */
export function createSentryOptions(dsn: string | undefined) {
  return {
    dsn,
    enabled: Boolean(dsn),
    sendDefaultPii: false,
    tracesSampleRate: 0,
    beforeSend: maskSentryEvent,
  };
}
