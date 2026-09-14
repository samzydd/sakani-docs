"use client";

import Image from "next/image";

/**
 * A continuously auto-scrolling row of real screenshots (a ticker/marquee,
 * not a scroll-scrubbed effect) -- the track is rendered twice back to
 * back and animated exactly -50% of its own width, so the loop point is
 * invisible as long as both halves are identical. Pauses on hover so a
 * curious visitor can actually look at one, and freezes entirely under
 * prefers-reduced-motion (see .dashboard-ticker in globals.css).
 */
const SHOTS = [
  { src: "/showcase/finance.png", alt: "Financial overview dashboard", position: "top" },
  { src: "/showcase/crm-dashboard.png", alt: "Sakani CRM, a real production app built on the design system", position: "top" },
  { src: "/showcase/ecommerce.png", alt: "E-commerce dashboard", position: "top" },
  { src: "/showcase/sales-dark.png", alt: "Sales dashboard, dark mode", position: "top" },
  { src: "/showcase/stocks.png", alt: "Stock market app", position: "top" },
  { src: "/showcase/settings.png", alt: "Data management settings", position: "top" },
  { src: "/showcase/kanban.png", alt: "Kanban board", position: "top" },
] as const;

export function DashboardTicker() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-xl px-8">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Built for real products
        </h2>
        <p className="mt-3 text-ink-muted">
          Real dashboards and apps shipped with Sakani.
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="dashboard-ticker flex w-max gap-6">
          {[...SHOTS, ...SHOTS].map((shot, i) => (
            <div
              key={`${shot.src}-${i}`}
              className="h-48 w-72 shrink-0 overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-lg sm:h-60 sm:w-96"
            >
              <Image
                src={shot.src}
                alt={i < SHOTS.length ? shot.alt : ""}
                aria-hidden={i >= SHOTS.length}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                style={{ objectPosition: shot.position }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
