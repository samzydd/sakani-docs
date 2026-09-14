import Image from "next/image";

const SHOTS = [
  { src: "/showcase/crm-dashboard.png", alt: "CRM dashboard", position: "left top" },
  { src: "/showcase/finance.png", alt: "Financial overview dashboard", position: "right top" },
  { src: "/showcase/ecommerce.png", alt: "E-commerce dashboard", position: "left top" },
  { src: "/showcase/sales-dark.png", alt: "Sales dashboard, dark mode", position: "right top" },
  { src: "/showcase/stocks.png", alt: "Stock market app", position: "left top" },
  { src: "/showcase/settings.png", alt: "Data management settings", position: "right top" },
  { src: "/showcase/kanban.png", alt: "Kanban board", position: "left top" },
] as const;

function Card({ shot }: { shot: (typeof SHOTS)[number] }) {
  return (
    <div className="relative h-56 w-96 shrink-0 overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-sm">
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes="384px"
        className="object-cover"
        style={{ objectPosition: shot.position }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas/25 via-transparent to-transparent" />
    </div>
  );
}

export function ShowcaseMarquee() {
  return (
    <section className="overflow-hidden border-y border-line-subtle bg-surface/40 py-14">
      <div className="mx-auto mb-8 max-w-xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Built for real products
        </h2>
        <p className="mt-3 text-ink-muted">
          A sample of dashboards and apps shipped with Sakani — not concepts.
        </p>
      </div>

      <div className="group relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-5 group-hover:[animation-play-state:paused]">
          {[...SHOTS, ...SHOTS].map((shot, i) => (
            <Card key={i} shot={shot} />
          ))}
        </div>
      </div>
    </section>
  );
}
