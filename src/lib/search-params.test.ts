import { describe, expect, it } from "vitest";

import {
  buildInfluencerSearchUrl,
  buildSpaceSearchUrl,
  parseInfluencerSearchParams,
  parseSpaceSearchParams,
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

describe("space search params", () => {
  it("çoklu tip ve geçerli yakınlık değerlerini ayrıştırır", () => {
    expect(
      parseSpaceSearchParams({
        type: ["billboard", "avm_led", "unknown"],
        city: " İstanbul ",
        max: "5000000",
        digital: "1",
        near: "41.0369,28.985,5",
      }),
    ).toEqual({
      city: "İstanbul",
      types: ["billboard", "avm_led"],
      maxPriceKurus: 5_000_000,
      digital: true,
      near: { lat: 41.0369, lng: 28.985, km: 5 },
    });
  });

  it("geçersiz yakınlık ve tipleri yok sayar", () => {
    expect(
      parseSpaceSearchParams({ type: "invalid", near: "91,181,0" }),
    ).toEqual({});
  });

  it("arama durumunu tekrarlanan tip parametreleriyle URL'ye yazar", () => {
    expect(
      buildSpaceSearchUrl({
        city: "İstanbul",
        types: ["billboard", "avm_led"],
        digital: true,
        near: { lat: 41.0369, lng: 28.985, km: 5 },
      }),
    ).toBe(
      "/alanlar?city=%C4%B0stanbul&type=billboard&type=avm_led&digital=1&near=41.0369%2C28.985%2C5",
    );
  });
});
