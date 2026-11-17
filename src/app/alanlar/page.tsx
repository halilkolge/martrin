import { SpaceExplorer } from "@/components/spaces/space-explorer";
import { parseSpaceSearchParams } from "@/lib/search-params";
import { searchSpaces } from "@/server/spaces/search";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SpacesPage({ searchParams }: PageProps) {
  const params = parseSpaceSearchParams(await searchParams);
  const result = await searchSpaces(params);

  return (
    <>
      <header className="border-t border-white/10 bg-ink px-4 py-7 sm:px-8 lg:px-12">
        <div className="text-[14px] font-display text-white/50">Keşfet</div>
        <h1 className="mt-1 font-display text-[36px] font-semibold leading-none tracking-tight text-white md:text-[48px]">
          Reklam alanları
        </h1>
      </header>
      <SpaceExplorer
        params={params}
        spaces={result.items}
        total={result.total}
      />
    </>
  );
}
