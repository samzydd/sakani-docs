"use client";

import Image from "next/image";
import { TextReveal } from "@/components/text-reveal";

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
    <section className="py-20">
      {/* Matches the hero's own container exactly (mx-auto max-w-5xl px-4
          sm:px-6 lg:px-8) so this heading's left edge lines up with the
          hero headline's, rather than the wider max-w-7xl the ticker
          track below uses. */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <TextReveal
          as="h2"
          lines={["Built for real products"]}
          className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        />
        <p className="mt-3 text-ink-muted">
          Real dashboards and apps shipped with Sakani.
        </p>
      </div>

      <div className="relative mx-auto mt-10 max-w-7xl overflow-hidden px-4 sm:px-6 lg:px-8 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
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
