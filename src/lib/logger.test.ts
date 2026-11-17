import { afterEach, describe, expect, it, vi } from "vitest";

import { logger } from "./logger";

function readWrittenChunk(
  write: ReturnType<typeof vi.spyOn>,
  callIndex = 0,
): string {
  const chunk = write.mock.calls[callIndex]?.[0];
  return typeof chunk === "string" ? chunk : String(chunk);
}

function parseLogLine(write: ReturnType<typeof vi.spyOn>): unknown {
  const line = readWrittenChunk(write).trimEnd();
  return JSON.parse(line);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("logger", () => {
  it("error seviyesinde geçerli JSON satırı yazar ve e-postayı maskeler", () => {
    const write = vi
      .spyOn(process.stderr, "write")
      .mockImplementation(() => true);

    logger.error("Ödeme başarısız", { email: "ali@ornek.com" });

    const entry = parseLogLine(write) as {
      level?: unknown;
      msg?: unknown;
      ctx?: unknown;
      ts?: unknown;
    };

    expect(entry.level).toBe("error");
    expect(entry.msg).toBe("Ödeme başarısız");
    expect(entry.ctx).toEqual({ email: "[email]" });
    expect(typeof entry.ts).toBe("string");
    expect(Number.isNaN(Date.parse(String(entry.ts)))).toBe(false);
    expect(readWrittenChunk(write).endsWith("\n")).toBe(true);
  });

  it("info seviyesinde stdout'a yazar ve mesajdaki telefonu maskeler", () => {
    const write = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);

    logger.info("Arayan: 0532 123 45 67");

    const entry = parseLogLine(write) as { level?: unknown; msg?: unknown };

    expect(entry.level).toBe("info");
    expect(entry.msg).toBe("Arayan: [telefon]");
  });

  it("warn seviyesinde iç içe bağlam metinlerini maskeler", () => {
    const write = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);

    logger.warn("Doğrulama uyarısı", {
      user: { email: "veli@ornek.com" },
      attempts: 2,
    });

    const entry = parseLogLine(write) as { ctx?: unknown };

    expect(entry.ctx).toEqual({
      user: { email: "[email]" },
      attempts: 2,
    });
  });

  it("bağlam verilmezse ctx alanı eklemez", () => {
    const write = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);

    logger.info("Sağlık kontrolü");

    const entry = parseLogLine(write) as Record<string, unknown>;

    expect(entry).not.toHaveProperty("ctx");
    expect(entry.level).toBe("info");
  });
});
