"use client";

/**
 * Decorative background for the hero: a soft brand-colored glow and a
 * masked dot grid behind the headline. Deliberately minimal -- an earlier
 * version scattered real component cards around the periphery, but that
 * read as clutter/competing UI rather than atmosphere, so this version
 * just sets a quiet backdrop and lets the headline + product preview do
 * the work.
 */
export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[110px]" />
      <div
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--color-line-default)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_55%_55%_at_50%_30%,transparent_35%,black_75%)]"
      />
    </div>
  );
}
