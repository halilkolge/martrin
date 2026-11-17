import { maskPII, maskPIIValue } from "./mask-pii";

export type LogLevel = "info" | "warn" | "error";

export type LogContext = Record<string, unknown>;

interface LogEntry {
  level: LogLevel;
  msg: string;
  ctx?: unknown;
  ts: string;
}

function writeLine(level: LogLevel, line: string): void {
  const stream = level === "error" ? process.stderr : process.stdout;
  stream.write(line);
}

function log(level: LogLevel, message: string, context?: LogContext): void {
  const entry: LogEntry = {
    level,
    msg: maskPII(message),
    ...(context === undefined ? {} : { ctx: maskPIIValue(context) }),
    ts: new Date().toISOString(),
  };

  writeLine(level, `${JSON.stringify(entry)}\n`);
}

/**
 * Tek satırlık JSON çıktısı üreten küçük logger. Mesaj ve bağlamdaki bütün
 * metinler `maskPII` üzerinden geçer; böylece kişisel veri loglara yazılmaz.
 */
export const logger = {
  info(message: string, context?: LogContext): void {
    log("info", message, context);
  },

  warn(message: string, context?: LogContext): void {
    log("warn", message, context);
  },

  error(message: string, context?: LogContext): void {
    log("error", message, context);
  },
};
