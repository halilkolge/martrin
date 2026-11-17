import Link from "next/link";

import {
  buildInfluencerSearchUrl,
  type InfluencerSearchParams,
} from "@/lib/search-params";

export function InfluencerPagination({
  params,
  page,
  total,
}: {
  params: InfluencerSearchParams;
  page: number;
  total: number;
}) {
  const pageCount = Math.ceil(total / 20);
  if (pageCount <= 1) return null;

  const previousUrl = buildInfluencerSearchUrl({ ...params, page: page - 1 });
  const nextUrl = buildInfluencerSearchUrl({ ...params, page: page + 1 });

  return (
    <nav
      aria-label="Sayfalar"
      className="flex flex-wrap items-center justify-between gap-3"
    >
      <span className="text-sm text-muted">
        {`${(page - 1) * 20 + 1}–${Math.min(page * 20, total)} / ${total}`}
      </span>
      <div className="flex items-center gap-2">
        {page > 1 ? (
          <Link
            href={previousUrl}
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
            href={nextUrl}
            className="grid h-11 place-items-center rounded-2xl bg-lime px-4 font-display text-sm focus-visible:ring-2 focus-visible:ring-violet"
          >
            Sonraki
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
