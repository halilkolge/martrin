/** 185000 -> "185 B", 1250000 -> "1,3 Mn". */
export function compactCount(value: number): string {
  if (value >= 1_000_000) {
    return (
      (value / 1_000_000).toLocaleString("tr-TR", {
        maximumFractionDigits: 1,
      }) + " Mn"
    );
  }
  if (value >= 1000) {
    return Math.round(value / 1000).toLocaleString("tr-TR") + " B";
  }
  return String(value);
}

/** Seçili çipe ve arama metnine göre liste sayfası adresini üretir. */
export function buildSearchHref(chip: string, query: string): string {
  const params = new URLSearchParams();
  const trimmed = query.trim();
  if (trimmed) params.set("q", trimmed);

  const base = chip === "Influencer" ? "/influencerlar" : "/alanlar";
  const search = params.toString();
  return search ? `${base}?${search}` : base;
}
