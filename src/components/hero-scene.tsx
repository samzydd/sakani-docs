"use client";

/**
 * Decorative background for the hero: a uniform dot grid plus a pair of
 * vertical guide lines framing the content column, each corner marked
 * with a small cross -- the grid-blueprint look from the reference sites
 * (Databuddy, Edinburgh), not a colored glow. An earlier version used a
 * blurred brand-color blob behind the headline; that read as generic
 * SaaS-template decoration rather than anything considered, so it's gone.
 */
function CornerMark({ className }: { className: string }) {
  return (
    <span className={`absolute h-3 w-3 ${className}`} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line-default" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-line-default" />
    </span>
  );
}

export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.55] [background-image:radial-gradient(var(--color-line-default)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_88%,transparent)]"
      />

      {/* Vertical guide lines framing the content column, corners marked
          with a small cross -- echoes the grid-blueprint framing in the
          reference screenshots without literally copying a world map or
          product chrome that isn't ours. */}
      <div className="absolute inset-y-10 left-1/2 hidden w-full max-w-4xl -translate-x-1/2 sm:block">
        <div className="absolute inset-y-0 left-0 w-px bg-line-subtle" />
        <div className="absolute inset-y-0 right-0 w-px bg-line-subtle" />
        <CornerMark className="-left-1.5 -top-1.5" />
        <CornerMark className="-right-1.5 -top-1.5" />
        <CornerMark className="-bottom-1.5 -left-1.5" />
        <CornerMark className="-bottom-1.5 -right-1.5" />
      </div>
    </div>
  );
}
