"use client";

import Image from "next/image";
import { useScrollProgress, lerp, easeInOutCubic } from "@/lib/use-scroll-progress";
import { cn } from "@/lib/utils";

interface Shot {
  src: string;
  alt: string;
  position: string;
  /** Final scattered offset, as a percentage of the card's OWN size (so it
   * scales naturally with the card's own responsive breakpoints instead of
   * needing separate mobile/desktop pixel values). */
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

const SHOTS: Shot[] = [
  { src: "/showcase/crm-dashboard.png", alt: "CRM dashboard", position: "left top", x: -145, y: -95, rotate: -7, scale: 1.05 },
  { src: "/showcase/finance.png", alt: "Financial overview dashboard", position: "right top", x: 140, y: -110, rotate: 6, scale: 0.95 },
  { src: "/showcase/ecommerce.png", alt: "E-commerce dashboard", position: "left top", x: -165, y: 70, rotate: 5, scale: 0.9 },
  { src: "/showcase/sales-dark.png", alt: "Sales dashboard, dark mode", position: "right top", x: 0, y: 125, rotate: -4, scale: 1.1 },
  { src: "/showcase/stocks.png", alt: "Stock market app", position: "left top", x: 160, y: 55, rotate: -6, scale: 0.92 },
  { src: "/showcase/settings.png", alt: "Data management settings", position: "right top", x: -30, y: -150, rotate: 4, scale: 0.85 },
  { src: "/showcase/kanban.png", alt: "Kanban board", position: "left top", x: 45, y: 145, rotate: 8, scale: 0.98 },
];

export function DashboardExplode() {
  const { ref, progress, reducedMotion } = useScrollProgress<HTMLDivElement>();
  const t = easeInOutCubic(progress);

  return (
    <section ref={ref} className="relative h-[320vh]" style={reducedMotion ? { height: "auto" } : undefined}>
      <div
        className="flex h-screen flex-col items-center justify-center overflow-hidden border-y border-line-subtle bg-surface/40"
        style={reducedMotion ? { position: "relative", height: "auto", padding: "4rem 0" } : { position: "sticky", top: 0 }}
      >
        <div
          className={cn(
            "mx-auto max-w-xl px-4 text-center",
            reducedMotion ? "relative mb-10" : "pointer-events-none absolute inset-x-0 top-14 z-10 sm:top-20"
          )}
          style={reducedMotion ? undefined : { opacity: 1 - t * 0.85, transform: `translateY(${t * -12}px)` }}
        >
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Built for real products
          </h2>
          <p className="mt-3 text-ink-muted">
            Scroll — these are real dashboards and apps shipped with Sakani.
          </p>
        </div>

        <div className="relative h-[420px] w-full max-w-5xl sm:h-[520px]">
          {SHOTS.map((shot, i) => {
            const tx = lerp(0, shot.x, t);
            const ty = lerp(0, shot.y, t);
            const rotate = lerp(0, shot.rotate, t);
            const scale = lerp(0.72, shot.scale, t);
            return (
              <div
                key={shot.src}
                className="absolute top-1/2 left-1/2 h-32 w-52 overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-lg sm:h-44 sm:w-72 lg:h-52 lg:w-[22rem]"
                style={{
                  transform: `translate(-50%, -50%) translate(${tx}%, ${ty}%) rotate(${rotate}deg) scale(${scale})`,
                  zIndex: SHOTS.length - i,
                }}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 22rem, (min-width: 640px) 288px, 208px"
                  className="object-cover"
                  style={{ objectPosition: shot.position }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
