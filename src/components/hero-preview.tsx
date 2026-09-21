import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

/**
 * The product screenshot under the hero copy: a crisp main dashboard with
 * two more dashboards stacked behind it (offset up and inset from the
 * sides, lower z-index) so only a sliver of their top edge peeks out --
 * a card-stack depth effect rather than a single flat screenshot. The
 * whole stack fades into the page background at the bottom instead of
 * ending with a hard edge at the fold.
 *
 * All three are Figma frames now (node 2128:22476), like the gallery below.
 * The hero's main screen is deliberately the one screen the gallery does NOT
 * carry: showing the same dashboard here and again down the page was the
 * thing that made the page feel repetitive. Only a ~24px header sliver of
 * each back layer is ever visible, which is why those two can be shared with
 * the gallery without reading as a repeat.
 */
const BACK_LAYERS = [
  { src: "/showcase/team-dark.png", alt: "", inset: "inset-x-16 sm:inset-x-24", offset: "-top-6 sm:-top-8", opacity: "opacity-40", z: "z-0" },
  { src: "/showcase/finance.png", alt: "", inset: "inset-x-8 sm:inset-x-12", offset: "-top-3 sm:-top-4", opacity: "opacity-70", z: "z-10" },
] as const;

export function HeroPreview() {
  return (
    <div className="relative mx-auto mt-24 w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
      <div className="relative h-full min-h-[280px]">
        {BACK_LAYERS.map((layer) => (
          <div
            key={layer.src}
            aria-hidden="true"
            className={`force-light absolute ${layer.inset} ${layer.offset} ${layer.opacity} ${layer.z} h-full overflow-hidden rounded-t-2xl border border-b-0 border-line-subtle bg-surface shadow-xl`}
          >
            <Image
              src={layer.src}
              alt={layer.alt}
              fill
              sizes="(min-width: 1024px) 900px, 90vw"
              className="object-cover object-top"
            />
          </div>
        ))}

        {/* force-light: the screenshot is a static light-mode capture, so the
            chrome bar around it needs to stay light too -- without this it
            read the site's own ambient theme via bg-surface and went dark in
            dark mode while the screenshot inside stayed light, an obviously
            mismatched mockup. */}
        <div className="force-light absolute inset-x-0 top-0 z-20 h-full overflow-hidden rounded-t-2xl border border-b-0 border-line-subtle shadow-2xl">
          <div className="flex items-center gap-3 border-b border-line-subtle bg-surface px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-danger/60" />
              <span className="h-3 w-3 rounded-full bg-warning/60" />
              <span className="h-3 w-3 rounded-full bg-success/60" />
            </div>
            <div className="mx-auto flex w-full max-w-xs items-center justify-center rounded-md bg-canvas px-3 py-1 text-xs text-ink-muted">
              app.sakani.com/dashboard
            </div>
          </div>
          <div className="relative h-[calc(100%-49px)]">
            <Image
              src="/showcase/overview.png"
              alt="Workspace overview dashboard built with Sakani"
              fill
              priority
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover object-top"
            />
          </div>
        </div>

        <Link
          href="#showcase"
          className="absolute bottom-4 left-4 z-30 inline-flex items-center gap-1.5 rounded-full bg-canvas/90 px-4 py-2 text-sm font-medium text-ink shadow-lg backdrop-blur transition-colors hover:bg-canvas"
        >
          See it live <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Fades the whole stack into the page background instead of
          cropping it with a hard edge at the fold. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-48 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}
