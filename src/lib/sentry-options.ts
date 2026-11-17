import type { ErrorEvent } from "@sentry/nextjs";

import { maskPII, maskPIIValue } from "./mask-pii";

function maskStructuredValue<T>(value: T): T {
  return maskPIIValue(value) as T;
}

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

    if (breadcrumb.data !== undefined) {
      breadcrumb.data = maskStructuredValue(breadcrumb.data);
    }
  }

  if (event.request) {
    if (event.request.url) {
      event.request.url = maskPII(event.request.url);
    }

    if (event.request.query_string !== undefined) {
      event.request.query_string = maskStructuredValue(
        event.request.query_string,
      );
    }

    if (event.request.data !== undefined) {
      event.request.data = maskStructuredValue(event.request.data);
    }
  }

  if (event.extra !== undefined) {
    event.extra = maskStructuredValue(event.extra);
  }

  if (event.contexts !== undefined) {
    event.contexts = maskStructuredValue(event.contexts);
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
