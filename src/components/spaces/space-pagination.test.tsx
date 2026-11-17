import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import type { SpaceSearchParams } from "@/lib/search-params";

import { SpacePagination } from "./space-pagination";

afterEach(cleanup);

const params: SpaceSearchParams = {
  city: "İstanbul",
  types: ["avm_led", "billboard"],
  maxPriceKurus: 10_000_000,
  digital: true,
};

describe("SpacePagination", () => {
  it("sayfa bağlantılarında filtreleri korur ve ilk sayfada page yazmaz", () => {
    render(
      <SpacePagination params={{ ...params, page: 2 }} page={2} total={60} />,
    );

    const previous = screen.getByRole("link", { name: "Önceki" });
    const next = screen.getByRole("link", { name: "Sonraki" });
    const previousUrl = new URL(
      previous.getAttribute("href") ?? "",
      "http://localhost",
    );
    const nextUrl = new URL(
      next.getAttribute("href") ?? "",
      "http://localhost",
    );

    expect(previousUrl.searchParams.has("page")).toBe(false);
    expect(previousUrl.searchParams.get("city")).toBe("İstanbul");
    expect(previousUrl.searchParams.getAll("type")).toEqual([
      "avm_led",
      "billboard",
    ]);
    expect(previousUrl.searchParams.get("max")).toBe("10000000");
    expect(previousUrl.searchParams.get("digital")).toBe("1");
    expect(nextUrl.searchParams.get("page")).toBe("3");
    expect(nextUrl.searchParams.get("city")).toBe("İstanbul");
  });
});
