"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll progress (0-1) through a tall "scroll runway" element, meant to be
 * paired with a `position: sticky` child that stays pinned for the
 * runway's full height -- the classic scroll-scrub pattern (Untitled UI's
 * own Figma-section explode effect works the same way): 0 while the
 * runway's top is still at the viewport top, 1 once the user has scrolled
 * all the way through (runway height - one viewport height) of extra
 * scroll distance.
 *
 * Under prefers-reduced-motion, always returns 1 (settled/final state) --
 * no scroll-jacking feel, no motion, just the end result.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // No scroll-jacked runway for these users -- the settled state renders
      // immediately and the caller collapses the tall scroll-runway height
      // back to normal using this flag, so it isn't several dead screens
      // of scrolling to get past a section that never visibly changes.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setReducedMotion(true);
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      setProgress(p);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress, reducedMotion };
}

export function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t;
}

/** easeInOutCubic -- matches Sakani's own --ease-out family in spirit,
 * gives the scrub weight instead of a linear 1:1 scroll mapping. */
export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
