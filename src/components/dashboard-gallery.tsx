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
/**
 * Every screen here is an export of the Figma file's own rendered frames
 * (fileKey Fd3uY263mEQKnaTEfrzQxh, node 2128:22476 "Section 1") — the
 * design's actual pixels rather than a recreation of them. None of the
 * earlier hand-supplied screenshots remain anywhere on the site.
 *
 * That section holds six frames; five are here. The sixth (the workspace
 * overview) is the hero's own screenshot and is deliberately left out, since
 * showing it at the top of the page and again halfway down was what made the
 * page feel like it was repeating itself.
 *
 * Ordered to alternate silhouette and theme as they fly past — a dense
 * table, then a board, then the dark screen, then a product grid — so no two
 * adjacent cards read as the same layout at a glance.
 */
const SHOTS = [
  { src: "/showcase/finance.png", alt: "Financial overview dashboard", label: "Finance", url: "app.sakani.com/finance" },
  { src: "/showcase/kanban.png", alt: "Procurement kanban board", label: "Procurement", url: "app.sakani.com/procurement" },
  { src: "/showcase/team-dark.png", alt: "Team management, dark mode", label: "Team", url: "app.sakani.com/team" },
  { src: "/showcase/ecommerce.png", alt: "E-commerce product listing with filters", label: "Storefront", url: "shop.sakani.com/running" },
  { src: "/showcase/settings.png", alt: "Data management settings", label: "Settings", url: "app.sakani.com/settings/data" },
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
 * A small downward drift per step away from centre, in px. Without it the
 * cards travel along a dead-straight rail; lifting the focused card just
 * above its neighbours makes the row read as an arc and gives the centre
 * card somewhere to land.
 */
const ARC = 18;
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
  const progressRef = useRef<HTMLSpanElement>(null);
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
        const y = distance * ARC;
        const z = -distance * DEPTH;
        const rotate = offset * -TURN;
        const scale = 1 - Math.min(distance * 0.12, 0.42);
        card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotate}deg) scale(${scale})`;
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

      // Written straight to the DOM for the same reason the transforms are:
      // it changes every frame and nothing else needs to know about it.
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.max(0.04, progress)})`;
      }

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
              {/* Same window chrome as the scroll variant's cards, so the two
                  renderings of this section are the same design and not two
                  different ones that happen to show the same screenshots. */}
              <div className="force-light flex items-center gap-2 border-b border-black/[0.07] bg-[#fbfbfa] px-3 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto max-w-[70%] truncate rounded-md bg-black/[0.04] px-3 py-1 text-[11px] font-medium text-black/45">
                  {shot.url}
                </div>
              </div>
              <Image src={shot.src} alt={shot.alt} width={800} height={600} className="h-52 w-full object-cover object-top" />
              <figcaption className="px-4 py-3 text-sm font-medium text-ink">{shot.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    /* 50vh of travel per card after the first, so the scrub rate per screen
       stays the same whatever the count -- the old fixed 340vh was tuned for
       seven cards and would have sped the run up now that there are six. */
    <section ref={sectionRef} className="relative h-[300vh]">
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
          {/* Ambient floor under the stage: a soft brand-tinted pool plus a
              wide neutral falloff. Cards were sitting on flat canvas, which
              gave the shadows nothing to fall on and made the whole row look
              pasted down; this gives the centre card something to sit in.
              Sized in vw/vh and blurred heavily so it never reads as a shape,
              and kept behind everything at -z. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[52vh] w-[92vw] max-w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-accent-subtle opacity-60 blur-[90px]"
          />
          {SHOTS.map((shot, i) => (
            <div
              key={shot.src}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="force-light absolute w-[78vw] max-w-[860px] overflow-hidden rounded-xl border border-black/10 bg-surface shadow-[0_2px_8px_rgba(15,14,12,0.04),0_18px_40px_-12px_rgba(15,14,12,0.18),0_48px_80px_-24px_rgba(15,14,12,0.22)] sm:w-[62vw]"
              style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
            >
              {/* Depth scrim. Must stay the card's first child: draw() reaches
                  for firstElementChild to set its opacity each frame. Painted
                  over everything (z-20, chrome included) and tinted with the
                  page background, so a receding card dims into the page rather
                  than going translucent and letting the card behind bleed
                  through it. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-canvas"
                style={{ opacity: 0, willChange: "opacity" }}
              />
              {/* Window chrome, matching the frame the "Real dashboards"
                  section puts around its live demos. A bare screenshot reads
                  as a flat picture pasted on the page; the same image inside
                  a titlebar reads as an application. force-light on the card
                  keeps this bar light even in dark mode, since every shot
                  except the Team one is a light-mode capture and a dark bar
                  over a white screenshot looks like a rendering bug. */}
              <div className="flex items-center gap-2 border-b border-black/[0.07] bg-[#fbfbfa] px-3 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto max-w-[60%] truncate rounded-md bg-black/[0.04] px-3 py-1 text-[11px] font-medium text-black/45">
                  {shot.url}
                </div>
              </div>
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
          <ol className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-4 sm:px-6 lg:px-8">
            {SHOTS.map((shot, i) => (
              <li key={shot.src}>
                <span
                  className={
                    i === active
                      ? "rounded-full bg-accent-subtle px-3 py-1.5 text-sm font-medium text-ink transition-colors"
                      : "rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors"
                  }
                  aria-current={i === active ? "true" : undefined}
                >
                  <span className="sr-only">{shot.alt}. </span>
                  {shot.label}
                </span>
              </li>
            ))}
          </ol>

          {/* Scroll position through the section, as a line. The labels above
              say which screen you are on; this says how far through you are,
              which is the one thing a hijacked scrollbar otherwise hides. */}
          <div aria-hidden="true" className="mx-auto mt-5 h-px w-40 overflow-hidden rounded-full bg-line-subtle">
            <span
              ref={progressRef}
              className="block h-full w-full origin-left bg-ink/35"
              style={{ transform: "scaleX(0.04)", willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
