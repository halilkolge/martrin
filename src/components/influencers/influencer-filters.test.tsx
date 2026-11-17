import { render } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { InfluencerFilters } from "./influencer-filters";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

it("filtre panelinde beyaz kart ve eski padding bulunur", () => {
  const { container } = render(<InfluencerFilters params={{}} />);
  const panel = container.querySelector("#influencer-filter-panel");

  expect(panel).toHaveClass("rounded-card", "bg-white");
  expect(panel).toHaveAttribute("style", "padding: 1.25rem;");
});
