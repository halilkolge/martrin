import Link from "next/link";

import { InfluencerCard } from "@/components/influencers/influencer-card";
import { InfluencerFilters } from "@/components/influencers/influencer-filters";
import { InfluencerPagination } from "@/components/influencers/influencer-pagination";
import { InfluencerSearchControls } from "@/components/influencers/influencer-search-controls";
import { Card } from "@/components/ui/card";
import { parseInfluencerSearchParams } from "@/lib/search-params";
import { searchInfluencers } from "@/server/influencers/search";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InfluencersPage({ searchParams }: PageProps) {
  const params = parseInfluencerSearchParams(await searchParams);
  const result = await searchInfluencers(params);

  return (
    <>
      <InfluencerSearchControls params={params} />
      <div className="grid items-start gap-6 px-4 py-8 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 lg:px-12">
        <InfluencerFilters params={params} />
        <section
          aria-label="İçerik üreticisi sonuçları"
          className="grid min-w-0 content-start gap-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-display text-[17px]">
              <b className="tabular-nums">{result.total}</b> içerik üreticisi
              bulundu
            </p>
            <InfluencerSearchControls params={params} variant="sort" />
          </div>
          {result.items.length > 0 ? (
            <div className="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {result.items.map((influencer) => (
                <InfluencerCard key={influencer.id} influencer={influencer} />
              ))}
            </div>
          ) : (
            <Card
              className="grid justify-items-center gap-4 text-center"
              style={{ padding: "2.5rem" }}
            >
              <b className="font-display text-[20px]">
                Bu filtrelere uyan içerik üreticisi yok
              </b>
              <span className="text-muted">
                Birkaç filtreyi kaldır ya da hepsini sıfırla.
              </span>
              <Link
                href="/influencerlar"
                className="grid h-12 place-items-center rounded-2xl bg-lime px-6 font-display font-medium focus-visible:ring-2 focus-visible:ring-violet"
              >
                Filtreleri sıfırla
              </Link>
            </Card>
          )}
          <InfluencerPagination
            params={params}
            page={result.page}
            total={result.total}
          />
        </section>
      </div>
    </>
  );
}
