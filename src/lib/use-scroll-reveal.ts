"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Continuous scroll-linked reveal (as opposed to Reveal's one-shot
 * IntersectionObserver fade-up): tracks how far an element has traveled
 * through the bottom half of the viewport and maps that directly to
 * scale/opacity/translateY, so the effect tracks scroll position itself
 * rather than just firing once at a fixed threshold -- the "grows into
 * place as you scroll" feel on sites like framer.university, without a
 * scroll-jacking library.
 *
 * Settles at a fully-revealed rest state once the element has scrolled
 * fully into the top half of the viewport, and never re-hides on scrolling
 * back down past it -- a first-load flourish, not a peekaboo toggle.
 */
export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const settledRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      if (settledRef.current) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the element's top is at the bottom of the viewport,
      // 1 once its top has reached the viewport's vertical center.
      const p = 1 - Math.min(Math.max(rect.top / (vh * 0.55), 0), 1);
      setProgress(p);
      if (p >= 1) settledRef.current = true;
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

  const style: CSSProperties = {
    opacity: 0.4 + progress * 0.6,
    transform: `scale(${0.94 + progress * 0.06}) translateY(${(1 - progress) * 24}px)`,
    willChange: "transform, opacity",
  };

  return { ref, style };
}
