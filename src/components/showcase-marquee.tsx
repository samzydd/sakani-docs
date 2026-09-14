import Image from "next/image";
import { Reveal } from "@/components/reveal";

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
    <div className="relative h-52 w-80 shrink-0 overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg sm:h-72 sm:w-[30rem] lg:h-80 lg:w-[34rem]">
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes="(min-width: 1024px) 34rem, (min-width: 640px) 30rem, 320px"
        className="object-cover"
        style={{ objectPosition: shot.position }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-canvas/20 via-transparent to-transparent" />
    </div>
  );
}

export function ShowcaseMarquee() {
  return (
    <section className="overflow-hidden border-y border-line-subtle bg-surface/40 py-14 sm:py-20">
      <Reveal>
        <div className="mx-auto mb-8 max-w-xl px-4 text-center sm:mb-10 sm:px-6 lg:px-8">
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Built for real products
          </h2>
          <p className="mt-3 text-ink-muted">
            A sample of dashboards and apps shipped with Sakani — not concepts.
          </p>
        </div>
      </Reveal>

      <div className="group relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 group-hover:[animation-play-state:paused]">
          {[...SHOTS, ...SHOTS].map((shot, i) => (
            <Card key={i} shot={shot} />
          ))}
        </div>
      </div>
    </section>
  );
}
