"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { formatTRY } from "@/lib/format-try";
import { type SpaceSearchParams, type SpaceType } from "@/lib/search-params";

const TYPE_LABELS: Record<SpaceType, string> = {
  billboard: "Billboard",
  megalight: "Megalight",
  clp: "Durak / CLP",
  avm_led: "AVM LED",
  avm_stand: "AVM Stant & Etkinlik",
  dooh: "Dijital Ekran (DOOH)",
  vehicle: "Araç Giydirme",
  other: "Diğer",
};
const CITIES = ["İstanbul", "Ankara", "İzmir"];

export function SpaceFilterFields({
  params,
  maxPrice,
  onNavigate,
  onPriceChange,
}: {
  params: SpaceSearchParams;
  maxPrice: number;
  onNavigate: (params: SpaceSearchParams) => void;
  onPriceChange: (value: number) => void;
}) {
  return (
    <>
      <Select
        label="Şehir"
        value={params.city ?? ""}
        onChange={(event) =>
          onNavigate({
            ...params,
            city: event.target.value || undefined,
            page: undefined,
          })
        }
      >
        <option value="">Tüm Türkiye</option>
        {CITIES.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </Select>
      <fieldset className="grid gap-2 border-t border-line pt-4">
        <legend className="font-display text-[12.5px] text-muted">
          Alan tipi
        </legend>
        <div className="grid gap-3">
          {(Object.entries(TYPE_LABELS) as [SpaceType, string][]).map(
            ([type, label]) => {
              const selected = params.types?.includes(type) ?? false;
              return (
                <Checkbox
                  key={type}
                  label={label}
                  checked={selected}
                  onChange={() =>
                    onNavigate({
                      ...params,
                      types: selected
                        ? (params.types ?? []).filter((item) => item !== type)
                        : [...(params.types ?? []), type],
                      page: undefined,
                    })
                  }
                />
              );
            },
          )}
        </div>
      </fieldset>
      <fieldset className="grid gap-2 border-t border-line pt-4">
        <legend className="font-display text-[12.5px] text-muted">Fiyat</legend>
        <label
          htmlFor="space-max-price"
          className="flex justify-between gap-2 text-[14px]"
        >
          <span>Başlangıç fiyatı</span>
          <span className="shrink-0 font-medium tabular-nums">
            ≤ {formatTRY(maxPrice)}
          </span>
        </label>
        <input
          id="space-max-price"
          type="range"
          min={500_000}
          max={50_000_000}
          step={500_000}
          value={maxPrice}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          className="w-full accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet"
        />
      </fieldset>
      <fieldset className="grid gap-2 border-t border-line pt-4">
        <legend className="font-display text-[12.5px] text-muted">Ekran</legend>
        <Checkbox
          label="Sadece dijital ekranlar"
          checked={params.digital ?? false}
          onChange={(event) =>
            onNavigate({
              ...params,
              digital: event.target.checked || undefined,
              page: undefined,
            })
          }
        />
      </fieldset>
      <div className="grid gap-1 border-t border-line pt-4">
        <p className="font-display text-[12.5px] text-muted">
          Tarih aralığında müsaitlik
        </p>
        <p className="text-sm text-muted">Yakında</p>
      </div>
    </>
  );
}
