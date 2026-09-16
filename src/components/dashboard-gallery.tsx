"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { TextReveal } from "@/components/text-reveal";
import { MaskReveal } from "@/components/mask-reveal";

/**
 * Scroll-scrubbed depth gallery, replacing the auto-scrolling marquee.
 *
 * The section is deliberately tall and holds a sticky, full-height stage: as
 * you scroll past it the page appears to stop and the screenshots fly through
 * a perspective space instead, one coming fully upright and sharp at the
 * centre while its neighbours rotate away and recede. Scroll position drives
 * the whole thing, so it reads as something you're steering rather than
 * something looping on a timer -- which was the problem with the marquee: it
 * moved constantly and therefore said nothing.
 *
 * Every frame writes transforms straight to the DOM from a rAF loop rather
 * than going through React state. Seven cards re-rendering on every scroll
 * event would be the one thing guaranteed to make this feel cheap.
 */
const SHOTS = [
  { src: "/showcase/finance.png", alt: "Financial overview dashboard", label: "Finance" },
  { src: "/showcase/crm-dashboard.png", alt: "Sakani CRM, a real production app built on the design system", label: "CRM" },
  { src: "/showcase/ecommerce.png", alt: "E-commerce dashboard", label: "E-commerce" },
  { src: "/showcase/sales-dark.png", alt: "Sales dashboard, dark mode", label: "Sales" },
  { src: "/showcase/stocks.png", alt: "Stock market app", label: "Stocks" },
  { src: "/showcase/settings.png", alt: "Data management settings", label: "Settings" },
  { src: "/showcase/kanban.png", alt: "Kanban board", label: "Kanban" },
] as const;

/**
 * Reduced-motion as an external store rather than state synced in an effect:
 * it's a subscription to something outside React, which is exactly what this
 * hook is for. It also gives a defined server snapshot, so the markup React
 * renders on the server matches the first client render instead of flipping
 * layout immediately after hydration.
 */
const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeToMotion = (onChange: () => void) => {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};
const getMotionSnapshot = () => window.matchMedia(MOTION_QUERY).matches;
/** Assume full motion on the server; the client corrects on first read. */
const getMotionServerSnapshot = () => false;

/** How far apart the cards sit along x, as a fraction of the stage width. */
const SPREAD = 0.46;
/** How far each step recedes into z, in px. */
const DEPTH = 300;
/** Degrees each step rotates away from the viewer. */
const TURN = 34;
/**
 * Cards stay fully opaque out to here, and only fade over the short run
 * between this and CULL.
 *
 * They used to start fading immediately (opacity 0.62 one step out, 0.24 two
 * steps out), which meant overlapping cards were translucent and you saw one
 * dashboard straight through another -- two busy UIs blended into a muddy
 * seam wherever they crossed. Opaque cards occlude each other cleanly
 * instead, the way physical cards would, and depth is carried by the scrim
 * below rather than by transparency.
 */
const SOLID_UNTIL = 2;
/** Beyond this a card contributes nothing but overdraw. */
const CULL = 3.2;
/**
 * How far each receding card is dimmed toward the page background. Tinting
 * with the canvas color (rather than black, or plain transparency) reads as
 * distance in both themes: far cards settle back into the page instead of
 * turning grey in light mode or glowing in dark.
 */
const MAX_SCRIM = 0.55;

export function DashboardGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = useSyncExternalStore(
    subscribeToMotion,
    getMotionSnapshot,
    getMotionServerSnapshot
  );

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let lastActive = -1;

    const draw = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;

      // 0 at the moment the section's top reaches the viewport top, 1 when
      // its bottom does. Clamped so the cards hold their end positions
      // rather than flying off while the section is still partly on screen.
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      const focus = progress * (SHOTS.length - 1);
      const stageWidth = section.offsetWidth;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const offset = i - focus;
        const distance = Math.abs(offset);
        if (distance > CULL) {
          card.style.opacity = "0";
          card.style.visibility = "hidden";
          return;
        }
        card.style.visibility = "visible";
        const x = offset * stageWidth * SPREAD;
        const z = -distance * DEPTH;
        const rotate = offset * -TURN;
        const scale = 1 - Math.min(distance * 0.12, 0.42);
        card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotate}deg) scale(${scale})`;
        // Fully opaque while cards overlap; the fade only runs over the last
        // stretch, by which point the card is mostly past the stage edge.
        card.style.opacity = String(
          distance <= SOLID_UNTIL
            ? 1
            : Math.max(0, 1 - (distance - SOLID_UNTIL) / (CULL - SOLID_UNTIL))
        );
        const scrim = card.firstElementChild as HTMLElement | null;
        if (scrim) {
          scrim.style.opacity = String(Math.min(distance * 0.2, MAX_SCRIM));
        }
        // Nearer cards paint over farther ones; translateZ alone doesn't
        // settle paint order reliably across browsers.
        card.style.zIndex = String(100 - Math.round(distance * 10));
      });

      const nearest = Math.round(focus);
      if (nearest !== lastActive) {
        lastActive = nearest;
        setActive(nearest);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  const heading = (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <TextReveal
        as="h2"
        lines={["Built for real products"]}
        className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
      />
      <MaskReveal as="p" delay={180} className="mt-3 text-ink-muted">
        Real dashboards and apps shipped with Sakani.
      </MaskReveal>
    </div>
  );

  // No pinning, no perspective, no scroll coupling: a plain grid that says
  // the same thing. Anyone who asks the OS for less motion should not get a
  // section that hijacks the scrollbar.
  if (reduced) {
    return (
      <section className="py-20">
        {heading}
        <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {SHOTS.map((shot) => (
            <figure key={shot.src} className="overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-lg">
              <Image src={shot.src} alt={shot.alt} width={800} height={600} className="h-52 w-full object-cover object-top" />
              <figcaption className="px-4 py-3 text-sm font-medium text-ink">{shot.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[340vh]">
      {/* Sticky, not fixed: the stage releases the page naturally at the end
          of the section instead of needing a scroll listener to unpin it. */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* 80px, matching the py-20 the reduced-motion variant and the rest
            of the landing sections use. */}
        <div className="pt-20">{heading}</div>

        <div
          className="relative mt-8 flex flex-1 items-center justify-center"
          style={{ perspective: "1600px", perspectiveOrigin: "50% 50%" }}
          aria-hidden="true"
        >
          {SHOTS.map((shot, i) => (
            <div
              key={shot.src}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute w-[78vw] max-w-[820px] overflow-hidden rounded-2xl border border-line-subtle bg-surface shadow-2xl sm:w-[62vw]"
              style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            >
              {/* Depth scrim. Must stay the card's first child: draw() reaches
                  for firstElementChild to set its opacity each frame. Painted
                  over the image (z-10) and tinted with the page background, so
                  a receding card dims into the page rather than going
                  translucent and letting the card behind bleed through it. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 bg-canvas"
                style={{ opacity: 0, willChange: "opacity" }}
              />
              <Image
                src={shot.src}
                alt=""
                width={1200}
                height={800}
                /* Eager, deliberately. Next/Image lazy-loads through an
                   IntersectionObserver on the image, and this layout defeats
                   it: cards are pushed out of the viewport by transforms and
                   some are visibility:hidden, so five of the seven never
                   intersected, never fetched, and arrived blank. Anything
                   observer-driven would be fighting the same geometry that
                   caused the bug, so these just load. It is also no worse
                   than the marquee this replaced, which rendered all seven
                   twice over and loaded every copy. */
                loading="eager"
                /* Without this Next cannot know how wide these render and
                   takes the top of the srcset -- it was fetching the 3840px
                   variant for a card that is never wider than 820. */
                sizes="(max-width: 640px) 78vw, (max-width: 1400px) 62vw, 820px"
                className="aspect-[3/2] w-full object-cover object-top"
              />
            </div>
          ))}
        </div>

        {/* The gallery itself is aria-hidden (it's a scroll-driven visual),
            so the real content lives here: a readable list where the current
            item is marked, rather than seven decorative images. */}
        <div className="pb-12">
          <ol className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 sm:px-6 lg:px-8">
            {SHOTS.map((shot, i) => (
              <li key={shot.src}>
                <span
                  className={
                    i === active
                      ? "text-sm font-medium text-ink transition-colors"
                      : "text-sm text-ink-muted transition-colors"
                  }
                  aria-current={i === active ? "true" : undefined}
                >
                  <span className="sr-only">{shot.alt}. </span>
                  {shot.label}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
