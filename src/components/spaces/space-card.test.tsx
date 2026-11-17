import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { formatTRY } from "@/lib/format-try";
import type { SpaceCard as SpaceCardData } from "@/server/spaces/search";

import { SpaceCard } from "./space-card";

afterEach(cleanup);

const space: SpaceCardData = {
  id: "space-1",
  title: "Taksim Işıklı Billboard",
  type: "billboard",
  city: "İstanbul",
  district: "Beyoğlu",
  lat: 41.0369,
  lng: 28.985,
  photoUrl: null,
  digital: false,
  lit: true,
  minPriceKurus: 7_800_000,
  minPriceUnit: "week",
};

describe("SpaceCard", () => {
  it("fiyatı ve fiyat birimini gösterir", () => {
    render(<SpaceCard space={space} />);

    expect(screen.getByText(formatTRY(7_800_000))).toBeInTheDocument();
    expect(screen.getByText("hafta başına")).toBeInTheDocument();
  });

  it("fiyat ve birim null olduğunda teklif metnini gösterir", () => {
    render(
      <SpaceCard
        space={{ ...space, minPriceKurus: null, minPriceUnit: null }}
      />,
    );

    expect(screen.getByText("Teklif al")).toBeInTheDocument();
    expect(screen.queryByText(/başına/)).not.toBeInTheDocument();
  });
});
