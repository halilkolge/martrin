import type { ReactNode } from "react";

type SectionProps = {
  /** Bölüm kimliği; başlık kimliği buradan üretilir. */
  id: string;
  title: string;
  description: string;
  children: ReactNode;
};

/** Önizleme sayfasındaki başlıklı bölüm kabuğu. */
export function Section({ id, title, description, children }: SectionProps) {
  const headingId = `${id}-baslik`;

  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 scroll-mt-6 rounded-card bg-white p-5 md:p-6"
    >
      <h2
        id={headingId}
        className="font-display text-2xl font-semibold tracking-tight text-ink"
      >
        {title}
      </h2>
      <p className="mt-1 text-[15px] text-muted">{description}</p>
      <div className="mt-5">{children}</div>
    </section>
  );
}
