"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { type InfluencerSearchParams } from "@/lib/search-params";

const CITIES = [
  "İstanbul",
  "İzmir",
  "Ankara",
  "Antalya",
  "Nevşehir",
  "Bursa",
  "Eskişehir",
];
const NICHES = [
  "Yemek & Tarif",
  "Moda & Stil",
  "Teknoloji",
  "Spor & Sağlık",
  "Seyahat",
  "Oyun & Canlı Yayın",
  "Lifestyle",
  "Komedi",
];
const SKILLS = [
  "Reels",
  "Ürün incelemesi",
  "Kutu açılışı",
  "YouTube entegrasyon",
  "Ürün yerleşimi",
  "Mekân tanıtımı",
  "Mağaza ziyareti",
  "Vlog",
  "Canlı yayın",
  "Skeç",
  "Seri içerik",
  "Tarif videosu",
  "Kombin önerisi",
  "İndirim kodu",
  "Çekiliş",
  "Uzun dönem iş birliği",
];
const PLATFORMS = [
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
  ["youtube", "YouTube"],
  ["x", "X"],
  ["linkedin", "LinkedIn"],
  ["twitch", "Twitch"],
  ["kick", "Kick"],
] as const;
const FOLLOWERS = [
  ["", "5 B"],
  ["50000", "50 B"],
  ["100000", "100 B"],
  ["250000", "250 B"],
  ["500000", "500 B"],
  ["1000000", "1 Mn"],
] as const;

function selectedFilters(params: InfluencerSearchParams): number {
  return (
    [
      params.q,
      params.gender,
      params.city,
      params.niche,
      params.skill,
      params.platform,
    ].filter(Boolean).length +
    (params.minFollowers && params.minFollowers > 5_000 ? 1 : 0)
  );
}

function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly (readonly [string, string])[];
  value: string;
  onChange: (nextValue: string) => void;
}) {
  return (
    <fieldset className="grid gap-2 border-t border-line pt-4 first:border-0 first:pt-0">
      <legend className="text-[12.5px] text-muted font-display">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {options.map(([optionValue, optionLabel]) => (
          <Chip
            key={optionValue}
            pressed={value === optionValue}
            onPressedChange={(pressed) => {
              if (pressed) onChange(optionValue);
            }}
            className={`!h-auto !min-h-0 !border-0 !px-3 !py-1.5 !text-[13.5px] focus-visible:ring-2 focus-visible:ring-violet ${value === optionValue ? "!bg-ink !text-white" : "!bg-paper !text-ink hover:!bg-line"}`}
          >
            {optionLabel}
          </Chip>
        ))}
      </div>
    </fieldset>
  );
}

export function InfluencerFilters({
  params,
}: {
  params: InfluencerSearchParams;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeCount = selectedFilters(params);

  function update(key: string, value: string, resetPage = true) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    if (resetPage) next.delete("page");
    const query = next.toString();
    router.replace(query ? `/influencerlar?${query}` : "/influencerlar", {
      scroll: false,
    });
  }

  function reset() {
    router.replace("/influencerlar", { scroll: false });
  }

  return (
    <aside className="grid content-start gap-3">
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-controls="influencer-filter-panel"
        className="flex h-12 items-center justify-between rounded-2xl bg-white px-4 font-display font-medium lg:hidden"
      >
        <span>Filtreler{activeCount > 0 ? ` (${activeCount})` : ""}</span>
        <span aria-hidden="true">{mobileOpen ? "⌃" : "⌄"}</span>
      </button>
      <Card
        id="influencer-filter-panel"
        className={`${mobileOpen ? "grid" : "hidden"} gap-4 lg:grid`}
        style={{ padding: "1.25rem" }}
      >
        <div className="flex items-center justify-between">
          <b className="flex items-center gap-2 font-display text-[18px] font-semibold">
            Filtreler
            {activeCount > 0 ? (
              <span className="grid h-6 min-w-6 place-items-center rounded-full bg-lime px-1.5 text-[12px] tabular-nums">
                {activeCount}
              </span>
            ) : null}
          </b>
          <button
            type="button"
            onClick={reset}
            disabled={activeCount === 0}
            className="text-[13px] underline underline-offset-4 disabled:text-muted disabled:no-underline"
          >
            Sıfırla
          </button>
        </div>
        <ChipGroup
          label="Cinsiyet"
          value={params.gender ?? ""}
          options={[
            ["", "Hepsi"],
            ["female", "Kadın"],
            ["male", "Erkek"],
          ]}
          onChange={(value) => update("gender", value)}
        />
        <Select
          label="Şehir"
          labelClassName="!text-[12.5px] !font-normal !text-muted"
          containerClassName="grid gap-2 border-t border-line pt-4"
          value={params.city ?? ""}
          onChange={(event) => update("city", event.target.value)}
          className="!h-11 !rounded-xl !border-0 !bg-paper !px-3.5 !text-[14.5px] !text-ink focus-visible:ring-2 focus-visible:ring-violet"
        >
          <option value="">Tüm Türkiye</option>
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
        <Select
          label="Kategori"
          labelClassName="!text-[12.5px] !font-normal !text-muted"
          containerClassName="grid gap-2 border-t border-line pt-4"
          value={params.niche ?? ""}
          onChange={(event) => update("niche", event.target.value)}
          className="!h-11 !rounded-xl !border-0 !bg-paper !px-3.5 !text-[14.5px] !text-ink focus-visible:ring-2 focus-visible:ring-violet"
        >
          <option value="">Tüm kategoriler</option>
          {NICHES.map((niche) => (
            <option key={niche} value={niche}>
              {niche}
            </option>
          ))}
        </Select>
        <Select
          label="İçerik türü"
          labelClassName="!text-[12.5px] !font-normal !text-muted"
          containerClassName="grid gap-2 border-t border-line pt-4"
          value={params.skill ?? ""}
          onChange={(event) => update("skill", event.target.value)}
          className="!h-11 !rounded-xl !border-0 !bg-paper !px-3.5 !text-[14.5px] !text-ink focus-visible:ring-2 focus-visible:ring-violet"
        >
          <option value="">Tüm içerik türleri</option>
          {SKILLS.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </Select>
        <ChipGroup
          label="Platform"
          value={params.platform ?? ""}
          options={[["", "Hepsi"], ...PLATFORMS]}
          onChange={(value) => update("platform", value)}
        />
        <ChipGroup
          label="En az takipçi"
          value={
            params.minFollowers && params.minFollowers > 5_000
              ? String(params.minFollowers)
              : ""
          }
          options={FOLLOWERS}
          onChange={(value) => update("min", value)}
        />
      </Card>
    </aside>
  );
}
