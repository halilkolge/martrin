import Link from "next/link";

import {
  buildSpaceSearchUrl,
  type SpaceSearchParams,
} from "@/lib/search-params";

export function SpacePagination({
  params,
  page,
  total,
}: {
  params: SpaceSearchParams;
  page: number;
  total: number;
}) {
  const pageSize = 20;
  const pageCount = Math.ceil(total / pageSize);
  if (pageCount <= 1) return null;

  return (
    <nav
      aria-label="Sayfalar"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <span className="text-sm text-muted">
        {`${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} / ${total}`}
      </span>
      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link
            href={buildSpaceSearchUrl({ ...params, page: page - 1 })}
            className="grid h-11 place-items-center rounded-2xl border border-ink px-4 font-display text-sm focus-visible:ring-2 focus-visible:ring-violet"
          >
            Önceki
          </Link>
        ) : null}
        <span
          aria-current="page"
          className="grid size-11 place-items-center rounded-2xl bg-ink font-display text-sm text-white"
        >
          {page}
        </span>
        {page < pageCount ? (
          <Link
            href={buildSpaceSearchUrl({ ...params, page: page + 1 })}
            className="grid h-11 place-items-center rounded-2xl bg-lime px-4 font-display text-sm focus-visible:ring-2 focus-visible:ring-violet"
          >
            Sonraki
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
