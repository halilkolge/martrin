"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/brand/logo-mark";

import {
  HERO_AVATARS,
  HERO_BADGE_AVATAR,
  HERO_IMAGE,
  SEARCH_CHIPS,
} from "./data";
import { buildSearchHref } from "./home-utils";

/** Ana sayfa hero alanı: arama, kategori çipleri ve "Nasıl çalışıyor?" çağrısı. */
export function HomeHero() {
  const router = useRouter();
  const [chip, setChip] = useState<string>(SEARCH_CHIPS[0]);
  const [query, setQuery] = useState("");

  function submitSearch() {
    router.push(buildSearchHref(chip, query));
  }

  function scrollToHow() {
    document
      .getElementById("nasil-calisiyor")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section className="bg-ink px-4 pt-6 pb-24 text-white sm:px-8 md:pb-28 lg:px-12">
      <div className="grid items-stretch gap-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="grid content-center gap-8">
          <h1 className="font-display text-[46px] leading-[.98] font-semibold tracking-[-.035em] sm:text-[68px] xl:text-[92px]">
            <span className="block">
              Göz{" "}
              <span className="mx-1 inline-grid h-[.78em] w-[1.5em] -translate-y-[.06em] place-items-center rounded-full border-[3px] border-lime align-middle text-lime">
                <Icon
                  name="eye"
                  className="h-[.42em] w-[.42em]"
                  strokeWidth={2.4}
                />
              </span>{" "}
              neredeyse,
            </span>
            <span className="block">
              <span className="mr-3 inline-flex -translate-y-[.05em] -space-x-3 align-middle">
                {HERO_AVATARS.map((avatar) => (
                  <Image
                    unoptimized
                    key={avatar}
                    src={`/images/v2/${avatar}`}
                    alt=""
                    width={64}
                    height={64}
                    className="h-[.72em] w-[.72em] rounded-full border-[3px] border-ink object-cover"
                  />
                ))}
              </span>
              markan
            </span>
            <span className="block text-lime">orada.</span>
          </h1>

          <div className="-mt-2 flex flex-wrap items-center gap-2.5 font-display text-[15px] font-medium sm:gap-3 sm:text-[21px]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[.07] py-1.5 pr-3.5 pl-1.5 ring-1 ring-white/15 sm:gap-2.5 sm:pr-4">
              <Image
                unoptimized
                src={`/images/v2/${HERO_BADGE_AVATAR}`}
                alt=""
                width={40}
                height={40}
                className="size-8 rounded-full object-cover sm:size-10"
              />
              Influencer&apos;dan
            </span>
            <span
              className="hidden items-center text-lime sm:flex"
              aria-hidden="true"
            >
              <i className="block h-[2px] w-6 rounded-full bg-gradient-to-r from-white/20 to-lime sm:w-10" />
              <Icon name="right" className="-ml-1.5 size-5" strokeWidth={2.4} />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/[.07] py-1.5 pr-3.5 pl-1.5 ring-1 ring-white/15 sm:gap-2.5 sm:pr-4">
              <span className="grid size-8 place-items-center rounded-full bg-violet sm:size-10">
                <LogoMark body="white" className="size-5 sm:size-6" />
              </span>
              billboarda
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-lime py-1.5 pr-5 pl-2 font-semibold text-ink shadow-[0_0_40px_-6px_rgba(214,244,91,.55)]">
              <span className="grid size-8 place-items-center rounded-full bg-ink text-lime sm:size-10">
                <Icon name="cart" className="size-5" />
              </span>
              <span>
                <span className="tabular-nums">81</span> ilde tek sepet
              </span>
            </span>
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submitSearch();
            }}
            className="grid max-w-[720px] gap-4"
          >
            <div className="flex items-center gap-3 rounded-[22px] bg-ink-2 p-2 pl-5">
              <Icon name="search" className="size-5 text-white/50" />
              <label htmlFor="hero-search" className="sr-only">
                Ara
              </label>
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="İstanbul'da AVM ekranı, Ankara'da teknoloji influencer'ı…"
                className="min-w-0 flex-1 bg-transparent text-[17px] outline-none placeholder:text-white/60"
              />
              <Icon
                name="mic"
                className="hidden size-5 text-white/60 sm:block"
              />
              <button
                type="submit"
                aria-label="Ara"
                className="grid size-12 place-items-center rounded-2xl bg-lime text-ink"
              >
                <Icon name="search" strokeWidth={2.2} />
              </button>
            </div>

            <div
              role="group"
              aria-label="Kategori"
              className="flex flex-wrap gap-2"
            >
              {SEARCH_CHIPS.map((item) => {
                const selected = chip === item;
                return (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setChip(item)}
                    className={`rounded-full border px-4 py-2 text-[14px] transition ${
                      selected
                        ? "border-white bg-white text-ink"
                        : "border-white/20 text-white/80 hover:border-white/50"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </form>
        </div>

        <div className="grid min-h-[420px] grid-rows-[1fr_auto] gap-4">
          <div className="relative min-h-[300px] overflow-hidden rounded-[28px] bg-sky">
            <Image
              unoptimized
              src={`/images/v2/${HERO_IMAGE}`}
              alt="Gökyüzüne kaldırılmış telefon ve billboard"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="absolute top-5 left-4 grid max-w-[78%] gap-3">
              <div className="w-fit rounded-[18px] rounded-tl-md bg-white px-4 py-2.5 text-[14px] text-ink shadow-lg">
                Merhaba! Sahil yolu billboard&apos;unuz 7 Aralık&apos;ta boş mu?
                👋
                <span className="mt-0.5 block text-right text-[11px] text-muted">
                  14:02
                </span>
              </div>
              <div className="flex w-fit items-center gap-3 rounded-[18px] rounded-tl-md bg-white px-3 py-2 text-ink shadow-lg">
                <span className="grid size-8 place-items-center rounded-full bg-sky text-white">
                  <Icon name="play" className="size-4" />
                </span>
                <span className="flex h-5 items-end gap-[3px]">
                  {[6, 12, 8, 16, 10, 18, 7, 13, 9, 15, 6, 11].map(
                    (height, index) => (
                      <i
                        key={index}
                        className="w-[3px] rounded bg-ink/70"
                        style={{ height }}
                      />
                    ),
                  )}
                </span>
                <Image
                  unoptimized
                  src="/images/v2/p3.jpg"
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 rounded-full object-cover"
                />
              </div>
              <div className="ml-10 w-fit rounded-[18px] rounded-tr-md bg-lime px-4 py-2.5 text-[14px] font-medium text-ink shadow-lg">
                Evet! ₺72.000&apos;e anlaşalım, kanıtı 19:00&apos;da yüklerim 👍
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={scrollToHow}
            className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden rounded-[28px] bg-lime p-6 text-left text-ink transition hover:brightness-95"
          >
            <span className="grid size-14 place-items-center rounded-full bg-ink text-white">
              <Icon name="play" />
            </span>
            <span className="relative z-10 font-display text-[26px] leading-[1.05] font-semibold tracking-tight">
              Nasıl
              <br />
              çalışıyor?
            </span>
            <Icon
              name="arrow"
              className="relative z-10 size-10"
              strokeWidth={2}
            />
            <span className="absolute -top-16 -right-10 size-48 rounded-full border-2 border-ink/80" />
            <span className="absolute -bottom-24 right-16 size-48 rounded-full border-2 border-ink/80" />
          </button>
        </div>
      </div>
    </section>
  );
}
