import type { ReactNode } from "react";

import { cn } from "./utils";

/** Tablo sütunu tanımı. */
export type TableColumn = {
  /** Sütun anahtarı; satır hücreleri bu anahtarla eşleşir. */
  key: string;
  /** Başlık hücresi içeriği. */
  header: ReactNode;
  /** Hücre hizalaması. Varsayılan `left`. */
  align?: "left" | "center" | "right";
};

/** Tablo satırı tanımı. */
export type TableRow = {
  /** Satır anahtarı. */
  key: string;
  /** Sütun anahtarına göre hücre içerikleri. */
  cells: Record<string, ReactNode>;
};

export type TableProps = {
  /** Sütunlar. */
  columns: TableColumn[];
  /** Satırlar. */
  rows: TableRow[];
  /** Tablonun erişilebilir başlığı. */
  caption?: string;
  /** Satır yoksa gösterilecek metin. */
  emptyLabel?: string;
  className?: string;
};

const ALIGN_CLASSES: Record<NonNullable<TableColumn["align"]>, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

/**
 * Başlık satırı olan, dar ekranda kendi içinde yatay kaydırılan tablo.
 * Sarmalayıcı sayfanın yatay taşmasını engeller.
 */
export function Table({
  columns,
  rows,
  caption,
  emptyLabel = "Kayıt bulunamadı",
  className,
}: TableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-card border border-line bg-white",
        className,
      )}
    >
      <table className="w-full border-collapse text-left text-[15px]">
        {caption ? (
          <caption className="px-5 py-4 text-left font-display font-semibold text-ink">
            {caption}
          </caption>
        ) : null}
        <thead className="bg-paper">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "whitespace-nowrap px-5 py-3 font-display text-xs font-medium uppercase tracking-wide text-muted",
                  ALIGN_CLASSES[column.align ?? "left"],
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-5 py-6 text-center text-muted"
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.key} className="border-t border-line">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn(
                      "whitespace-nowrap px-5 py-3 text-ink",
                      ALIGN_CLASSES[column.align ?? "left"],
                    )}
                  >
                    {row.cells[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
