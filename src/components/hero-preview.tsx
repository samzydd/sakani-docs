import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

/**
 * The product screenshot under the hero copy -- dimmed/blurred rather
 * than a crisp bleed, with a single overlay pill inviting the click
 * through to the real interactive demo further down the page. Matches
 * the "locked preview" pattern from the reference site rather than
 * showing the dashboard at full clarity twice on the same page (it's
 * shown live, in full, in the "Real dashboards, not mockups" section).
 */
export function HeroPreview() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8">
      <div className="relative h-full min-h-[260px] overflow-hidden rounded-t-2xl border border-b-0 border-line-subtle">
        <Image
          src="/showcase/crm-dashboard.png"
          alt="Sakani CRM — a real production dashboard built on the design system"
          fill
          priority
          sizes="(min-width: 1024px) 1152px, 100vw"
          className="scale-105 object-cover object-top opacity-70 blur-[2px] brightness-[0.55]"
        />

        <Link
          href="#showcase"
          className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-canvas/90 px-4 py-2 text-sm font-medium text-ink shadow-lg backdrop-blur transition-colors hover:bg-canvas"
        >
          See it live <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* Fades the screenshot's lower half into the page background instead
          of cropping it with a hard edge at the fold. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}
