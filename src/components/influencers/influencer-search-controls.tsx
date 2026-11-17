"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Icon } from "@/components/icons";
import { type InfluencerSearchParams } from "@/lib/search-params";

export function InfluencerSearchControls({
  params,
  variant = "hero",
}: {
  params: InfluencerSearchParams;
  variant?: "hero" | "sort";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    const query = next.toString();
    router.replace(query ? `/influencerlar?${query}` : "/influencerlar", {
      scroll: false,
    });
  }

  return (
    <>
      {variant === "hero" ? (
        <section className="border-t border-white/10 bg-ink px-4 py-7 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-display text-[14px] text-white/50">Keşfet</p>
              <h1 className="mt-1 font-display text-[36px] leading-none font-semibold tracking-tight text-white md:text-[48px]">
                İçerik üreticileri
              </h1>
            </div>
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="flex w-full items-center gap-2 md:w-[460px]"
            >
              <label className="flex h-[52px] min-w-0 flex-1 items-center gap-3 rounded-2xl bg-white px-4">
                <Icon name="search" className="size-5 shrink-0 text-ink/50" />
                <span className="sr-only">
                  İsim, kullanıcı adı ya da kategori ara
                </span>
                <input
                  aria-label="İsim, kullanıcı adı ya da kategori ara"
                  value={params.q ?? ""}
                  onChange={(event) => update("q", event.target.value)}
                  placeholder="İsim, kullanıcı adı ya da kategori ara"
                  className="min-w-0 flex-1 bg-transparent text-ink outline-none placeholder:text-ink/40"
                />
              </label>
              <button
                type="submit"
                aria-label="Ara"
                className="grid size-[52px] shrink-0 place-items-center rounded-2xl bg-lime text-ink"
              >
                <Icon name="search" className="size-5" strokeWidth={2.4} />
              </button>
            </form>
          </div>
        </section>
      ) : null}
      {variant === "sort" ? (
        <label className="flex items-center gap-2 text-[15px]">
          Sırala:
          <select
            aria-label="Sırala"
            value={params.sort ?? "popular"}
            onChange={(event) => update("sort", event.target.value)}
            className="rounded-xl bg-white px-3 py-2 font-display outline-none focus-visible:ring-2 focus-visible:ring-violet"
          >
            <option value="popular">Popüler</option>
            <option value="followers">Takipçi (çoktan aza)</option>
            <option value="price">Fiyat (artan)</option>
          </select>
        </label>
      ) : null}
    </>
  );
}
