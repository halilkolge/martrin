import { describe, expect, it } from "vitest";

import {
  buildInfluencerSearchUrl,
  parseInfluencerSearchParams,
} from "./search-params";

describe("parseInfluencerSearchParams", () => {
  it("geçersiz değerleri yok sayar", () => {
    expect(
      parseInfluencerSearchParams({ min: "abc", gender: "x", page: "-1" }),
    ).toEqual({});
  });

  it("geçerli filtreleri doğru türlere çevirir", () => {
    expect(
      parseInfluencerSearchParams({
        q: "  İstanbul  ",
        gender: "female",
        city: "İstanbul",
        niche: "Yemek & Tarif",
        skill: "Reels",
        platform: "instagram",
        min: "50000",
        sort: "followers",
        page: "2",
      }),
    ).toEqual({
      q: "İstanbul",
      gender: "female",
      city: "İstanbul",
      niche: "Yemek & Tarif",
      skill: "Reels",
      platform: "instagram",
      minFollowers: 50_000,
      sort: "followers",
      page: 2,
    });
  });

  it("arama durumunu Türkçe karakterleriyle URL'ye yazar", () => {
    expect(
      buildInfluencerSearchUrl({
        city: "İstanbul",
        gender: "female",
        minFollowers: 50_000,
      }),
    ).toBe("/influencerlar?gender=female&city=%C4%B0stanbul&min=50000");
  });
});
