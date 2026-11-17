"use client";

import dynamic from "next/dynamic";

import type { SpaceCard } from "@/server/spaces/search";

const SpaceMap = dynamic(
  () => import("./space-map").then((module) => module.SpaceMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[420px] animate-pulse rounded-2xl bg-paper"
        aria-busy="true"
      />
    ),
  },
);

export function SpaceMapLoader(props: {
  spaces: SpaceCard[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  return <SpaceMap {...props} />;
}
