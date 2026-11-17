import { describe, expect, it } from "vitest";

import { buildSearchHref, compactCount } from "./home-utils";

describe("compactCount", () => {
  it("bin ve milyon değerlerini kısaltır", () => {
    expect(compactCount(185000)).toBe("185 B");
    expect(compactCount(1250000)).toBe("1,3 Mn");
  });

  it("binden küçük değeri olduğu gibi bırakır", () => {
    expect(compactCount(999)).toBe("999");
  });
});

describe("buildSearchHref", () => {
  it("Influencer çipinde influencer listesine yönlendirir", () => {
    expect(buildSearchHref("Influencer", "kahve")).toBe(
      "/influencerlar?q=kahve",
    );
  });

  it("diğer çiplerde alan listesine yönlendirir", () => {
    expect(buildSearchHref("Billboard", " ankara ")).toBe("/alanlar?q=ankara");
  });

  it("boş aramada sorgu parametresi eklemez", () => {
    expect(buildSearchHref("Hepsi", "   ")).toBe("/alanlar");
  });
});
