"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  buildSpaceSearchUrl,
  type SpaceSearchParams,
} from "@/lib/search-params";

import { Card } from "@/components/ui/card";

import { SpaceFilterFields } from "./space-filter-fields";

const MAX_PRICE = 50_000_000;

export function SpaceFilters({ params }: { params: SpaceSearchParams }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [draftPrice, setDraftPrice] = useState<{
    query: string;
    value: number;
  } | null>(null);
  const maxPrice =
    draftPrice?.query === queryString
      ? draftPrice.value
      : (params.maxPriceKurus ?? MAX_PRICE);
  const activeCount =
    (params.city ? 1 : 0) +
    (params.types?.length ?? 0) +
    (params.digital ? 1 : 0) +
    (params.maxPriceKurus !== undefined ? 1 : 0);

  function navigate(next: SpaceSearchParams) {
    router.replace(buildSpaceSearchUrl(next), { scroll: false });
  }

  useEffect(() => {
    if (
      !draftPrice ||
      draftPrice.query !== queryString ||
      draftPrice.value === (params.maxPriceKurus ?? MAX_PRICE)
    )
      return;
    const timer = window.setTimeout(
      () =>
        router.replace(
          buildSpaceSearchUrl({
            ...params,
            maxPriceKurus: draftPrice.value,
            page: undefined,
          }),
          { scroll: false },
        ),
      300,
    );
    return () => window.clearTimeout(timer);
  }, [draftPrice, params, queryString, router]);

  return (
    <aside className="grid content-start gap-3">
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-controls="space-filter-panel"
        className="flex h-12 items-center justify-between rounded-2xl bg-white px-4 font-display font-medium lg:hidden"
      >
        <span>Filtreler{activeCount > 0 ? ` (${activeCount})` : ""}</span>
        <span aria-hidden="true">{mobileOpen ? "⌃" : "⌄"}</span>
      </button>
      <Card
        id="space-filter-panel"
        tone="white"
        className={`${mobileOpen ? "grid" : "hidden"} content-start gap-4 lg:grid`}
        style={{ padding: "1.25rem" }}
      >
        <div className="flex items-center justify-between">
          <b className="flex items-center gap-2 font-display text-[18px] font-semibold">
            Filtreler
            {activeCount > 0 ? (
              <span className="grid size-6 place-items-center rounded-full bg-lime text-[12px] tabular-nums">
                {activeCount}
              </span>
            ) : null}
          </b>
          <button
            type="button"
            onClick={() => router.replace("/alanlar", { scroll: false })}
            disabled={activeCount === 0}
            className="text-[13px] underline underline-offset-4 disabled:text-muted disabled:no-underline"
          >
            Sıfırla
          </button>
        </div>
        <SpaceFilterFields
          params={params}
          maxPrice={maxPrice}
          onNavigate={navigate}
          onPriceChange={(value) =>
            setDraftPrice({ query: queryString, value })
          }
        />
      </Card>
    </aside>
  );
}
