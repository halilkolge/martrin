import Image from "next/image";
import Link from "next/link";

import { Icon, Sparkle } from "@/components/icons";
import { Button } from "@/components/ui/button";

import {
  InfluencerCard,
  SectionHead,
  SpaceCard,
} from "@/components/marketing/cards";
import {
  FEATURED_INFLUENCERS,
  FEATURED_SPACES,
  HOW_STEPS,
  LIVE_AVATARS,
  LIVE_CAMPAIGNS,
  OVERLAP_INFLUENCERS,
  OVERLAP_SPACE,
} from "@/components/marketing/data";
import { HomeHero } from "@/components/marketing/home-hero";

const PILL =
  "inline-block rounded-full border-2 border-current px-[.32em] leading-[1.08]";

export default function HomePage() {
  const [firstInfluencer, secondInfluencer] = OVERLAP_INFLUENCERS;

  return (
    <>
      <HomeHero />

      <section className="relative -mt-14 rounded-t-[36px] bg-paper px-4 pt-6 sm:px-8 lg:px-12">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {firstInfluencer ? (
            <InfluencerCard influencer={firstInfluencer} />
          ) : null}
          <SpaceCard space={OVERLAP_SPACE} />
          <Link
            href="/alanlar"
            className="relative grid min-h-[460px] content-between overflow-hidden rounded-card bg-violet p-8 text-white"
          >
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-white/15">
              <Icon name="right" className="size-7" />
            </span>
            <div className="text-center">
              <p className="font-display text-[48px] leading-none font-semibold tracking-tight">
                Tümünü gör
              </p>
              <p className="mt-2 font-display text-[20px] text-ink tabular-nums">
                1.284 alan · 8.450 içerik üreticisi
              </p>
            </div>
            <div className="relative h-36">
              <Sparkle className="absolute bottom-0 left-0 size-24 text-lime" />
              <Image
                unoptimized
                src="/images/v2/p4.jpg"
                alt=""
                width={112}
                height={112}
                className="absolute top-0 right-6 size-28 rounded-full border-4 border-violet object-cover"
              />
              <Image
                unoptimized
                src="/images/v2/p7.jpg"
                alt=""
                width={56}
                height={56}
                className="absolute top-16 right-32 size-14 rounded-full border-4 border-violet object-cover"
              />
              <Image
                unoptimized
                src="/images/v2/p2.jpg"
                alt=""
                width={64}
                height={64}
                className="absolute right-20 bottom-0 size-16 rounded-full border-4 border-violet object-cover"
              />
            </div>
          </Link>
          {secondInfluencer ? (
            <InfluencerCard influencer={secondInfluencer} />
          ) : null}
        </div>
      </section>

      <section
        id="nasil-calisiyor"
        className="scroll-mt-4 px-4 py-16 sm:px-8 md:py-24 lg:px-12"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-[18ch] font-display text-[34px] leading-[1.15] font-medium tracking-tight md:text-[54px]">
            <span className={PILL}>Planla.</span>{" "}
            <span className={PILL}>Öde.</span>{" "}
            <span className="inline-grid size-[1.1em] place-items-center rounded-full bg-sky align-middle text-white">
              <Icon name="right" className="size-[.5em]" strokeWidth={2.4} />
            </span>
            <br />
            <span className={PILL}>Yayınla.</span>{" "}
            <span className={PILL}>Kanıtla.</span>
          </h2>
          <div className="grid max-w-[42ch] gap-2 text-[16px]">
            <span className="flex items-center gap-2">
              <i className="size-2.5 rounded-full bg-ink" />
              Influencer ve fiziksel alan aynı kampanyada
            </span>
            <span className="flex items-center gap-2">
              <Icon name="shield" className="size-4" />
              Paran yayın kanıtına kadar emanette
            </span>
            <span className="flex items-center gap-2">
              <Icon name="camera" className="size-4" />
              Konumlu fotoğraf + video ile doğrulama
            </span>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {HOW_STEPS.map((step) => (
            <Link
              key={step.no}
              href={step.to}
              className={`group relative grid aspect-[4/5] content-between overflow-hidden rounded-card bg-gradient-to-br p-5 ${step.background}`}
            >
              <Image
                unoptimized
                src={`/images/v2/${step.image}`}
                alt={step.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={`absolute inset-[12%] object-cover transition duration-700 group-hover:scale-105 ${step.blob}`}
              />
              <div className="relative flex items-start justify-between">
                <span className="rounded-full bg-white px-4 py-1.5 text-[13px]">
                  {step.tag}
                </span>
                <span className="grid size-11 place-items-center rounded-full bg-white">
                  <Icon name="arrow" className="size-5" />
                </span>
              </div>
              <div className="relative grid justify-items-start gap-4">
                <span className="font-display text-[30px] leading-[1.05] font-semibold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,.35)]">
                  {step.no} {step.title}
                </span>
                <span className="flex items-center gap-3 rounded-full bg-white py-2 pr-4 pl-5 text-[14px]">
                  İncele <i className="size-2 rounded-full bg-sky" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-2 rounded-[32px] bg-ink px-4 py-10 text-white sm:mx-6 sm:px-8 lg:mx-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[22px] font-medium">
            Şu an <span className="text-white/50">yayında</span>
          </h2>
          <Link
            href="/panel-reklamveren"
            className="text-[14px] text-white/70 transition hover:text-white"
          >
            Tüm kampanyalar →
          </Link>
        </div>

        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {LIVE_AVATARS.map((avatar, index) => (
            <span key={avatar} className="relative shrink-0">
              <Image
                unoptimized
                src={`/images/v2/${avatar}`}
                alt=""
                width={72}
                height={72}
                className="size-[72px] rounded-[22px] object-cover"
              />
              {index < 5 ? (
                <i className="absolute right-0 bottom-0 size-4 rounded-full border-[3px] border-ink bg-ok" />
              ) : null}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LIVE_CAMPAIGNS.map((campaign) => (
            <Link
              key={campaign.title}
              href="/panel-reklamveren"
              className="relative block aspect-[3/4] overflow-hidden rounded-[26px] bg-ink-2"
            >
              <Image
                unoptimized
                src={`/images/v2/${campaign.image}`}
                alt={campaign.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
              <div className="absolute top-3 right-3 left-3 flex items-center gap-2 rounded-full bg-black/35 p-1.5 pr-3 backdrop-blur-md">
                <span className="grid size-8 place-items-center rounded-full bg-lime font-display text-[12px] font-semibold text-ink">
                  {campaign.brand.slice(0, 2)}
                </span>
                <span className="text-[13px] leading-tight">
                  {campaign.brand}
                  <span className="block text-[10.5px] tracking-wide text-white/60 uppercase">
                    {campaign.channel}
                  </span>
                </span>
              </div>
              <div className="absolute right-4 bottom-4 left-4 grid gap-3">
                <span className="font-display text-[28px] leading-[.95] font-extrabold tracking-tight uppercase">
                  {campaign.title}
                </span>
                <span className="flex items-center gap-3 text-[13px]">
                  <span className="inline-flex items-center rounded-full bg-live px-3 py-1 text-[12.5px] font-medium whitespace-nowrap text-ink">
                    YAYINDA
                  </span>
                  <span className="text-white/70">● {campaign.days}</span>
                  <span className="flex items-center gap-1 text-white/90">
                    <Icon name="eye" className="size-4" />
                    {campaign.views}/gün
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-4 pt-16 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="Bu hafta öne çıkan"
          title="Fiziksel reklam alanları"
          action={
            <Button
              href="/alanlar"
              variant="ghost"
              className="border border-line bg-white hover:border-ink"
            >
              Tümü <Icon name="right" className="size-4" />
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURED_SPACES.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </section>

      <section className="px-4 pt-16 sm:px-8 lg:px-12">
        <SectionHead
          eyebrow="5.000+ takipçi · 7 platform"
          title="İçerik üreticileri"
          action={
            <Button
              href="/influencerlar"
              variant="ghost"
              className="border border-line bg-white hover:border-ink"
            >
              Tümü <Icon name="right" className="size-4" />
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURED_INFLUENCERS.map((influencer) => (
            <InfluencerCard key={influencer.id} influencer={influencer} />
          ))}
        </div>
      </section>

      <section className="px-4 pt-16 sm:px-8 lg:px-12">
        <div className="relative grid overflow-hidden rounded-[32px] bg-lime md:grid-cols-[1.2fr_1fr]">
          <div className="relative z-10 grid content-center gap-5 p-8 md:p-12">
            <span className="w-fit rounded-full bg-ink px-3 py-1 text-[12.5px] font-medium whitespace-nowrap text-white">
              AVM · açık hava şirketi · belediye
            </span>
            <h2 className="font-display text-[36px] leading-[1.02] font-semibold tracking-tight md:text-[52px]">
              Boş panon,
              <br />
              boş ekranın
              <br />
              satılmayı bekliyor.
            </h2>
            <p className="max-w-[46ch] text-[17px]">
              Alanını ücretsiz listele. Takvimini yönet, teklifleri kabul et,
              kanıtı yükle, paranı al.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/panel-satici" variant="dark" size="lg">
                Alanını listele
              </Button>
              <Button
                href="/panel-satici"
                variant="outline"
                size="lg"
                className="border-ink"
              >
                Influencer olarak katıl
              </Button>
            </div>
          </div>
          <div className="relative min-h-[320px]">
            <Image
              unoptimized
              src="/images/v2/c4.jpg"
              alt="Durakta ışıklı pano"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="absolute inset-6 rounded-[40%_60%_60%_40%/60%_40%_60%_40%] object-cover md:inset-8"
            />
            <Sparkle className="absolute bottom-6 left-2 size-16 text-violet" />
          </div>
        </div>
      </section>
    </>
  );
}
