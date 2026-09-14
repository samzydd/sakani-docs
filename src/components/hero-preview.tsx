import Image from "next/image";

/**
 * The product screenshot that bleeds off the bottom of the hero viewport
 * (see the reference sites: Databuddy, Edinburgh, Linear -- headline up
 * top, real product chrome peeking in below, cropped by the fold and
 * faded into the next section rather than ending abruptly).
 */
export function HeroPreview() {
  return (
    <div className="relative mx-auto mt-16 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-t-2xl border border-b-0 border-line-subtle bg-surface shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line-subtle px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-danger/60" />
            <span className="h-3 w-3 rounded-full bg-warning/60" />
            <span className="h-3 w-3 rounded-full bg-success/60" />
          </div>
          <div className="mx-auto flex w-full max-w-xs items-center justify-center rounded-md bg-canvas px-3 py-1 text-xs text-ink-subtle">
            app.yourcompany.com/crm
          </div>
        </div>
        <Image
          src="/showcase/crm-dashboard.png"
          alt="Sakani CRM — a real production dashboard built on the design system"
          width={1600}
          height={1000}
          priority
          className="h-auto w-full"
        />
      </div>
      {/* Fades the screenshot's lower half into the page background instead
          of cropping it with a hard edge at the fold. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  );
}
