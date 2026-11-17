"use client";

import { useState } from "react";
import Link from "next/link";

import type { SpaceSearchParams } from "@/lib/search-params";
import type { SpaceCard as SpaceCardData } from "@/server/spaces/search";

import { SpaceCard } from "./space-card";
import { SpaceFilters } from "./space-filters";
import { SpaceMapLoader } from "./space-map-loader";
import { SpacePagination } from "./space-pagination";

export function SpaceExplorer({
  params,
  spaces,
  total,
}: {
  params: SpaceSearchParams;
  spaces: SpaceCardData[];
  total: number;
}) {
  const [view, setView] = useState<"list" | "map">("list");
  const [selectedId, setSelectedId] = useState<string>();

  return (
    <div className="grid items-start gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 lg:px-12">
      <SpaceFilters params={params} />
      <section
        aria-label="Reklam alanı sonuçları"
        className="grid min-w-0 content-start gap-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          {view === "map" ? (
            <p className="font-display text-[17px]">
              <b className="tabular-nums">{spaces.length}</b> alan haritada
            </p>
          ) : null}
          <div
            className="inline-flex rounded-2xl bg-white p-1 text-[14px] font-display"
            role="group"
            aria-label="Görünüm"
          >
            <button
              type="button"
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
              className={`rounded-xl px-4 py-2 ${view === "list" ? "bg-ink text-white" : ""}`}
            >
              Liste
            </button>
            <button
              type="button"
              aria-pressed={view === "map"}
              onClick={() => setView("map")}
              className={`rounded-xl px-4 py-2 ${view === "map" ? "bg-ink text-white" : ""}`}
            >
              Harita
            </button>
          </div>
        </div>
        {view === "map" ? (
          <SpaceMapLoader
            spaces={spaces}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        ) : null}
        {spaces.length ? (
          <div className="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                highlighted={selectedId === space.id}
                onSelect={() => setSelectedId(space.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid justify-items-center gap-4 rounded-card bg-white p-10 text-center">
            <b className="font-display text-[20px]">
              Bu filtrelere uyan sonuç yok. Şehri &quot;Tüm Türkiye&quot; yap ya
              da filtreleri sıfırla.
            </b>
            <Link
              href="/alanlar"
              className="grid h-12 place-items-center rounded-2xl bg-lime px-6 font-display font-medium"
            >
              Filtreleri sıfırla
            </Link>
          </div>
        )}
        {view === "list" && total > 20 ? (
          <SpacePagination
            params={params}
            page={params.page ?? 1}
            total={total}
          />
        ) : null}
      </section>
    </div>
  );
}
