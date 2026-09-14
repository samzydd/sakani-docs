"use client";

import { useEffect, useRef, useState } from "react";

export type RevealTrigger = "mount" | "scroll";

/**
 * Shared "is this thing revealed yet" signal behind TextReveal and
 * MaskReveal, so a heading, its eyebrow, and its subtext all fire off the
 * same logic instead of three near-identical observers.
 *
 * "mount" fires a tick after mount (the hero, already in view on load) --
 * a timeout rather than requestAnimationFrame, since rAF callbacks can be
 * throttled or skipped entirely for a backgrounded tab and this only
 * needs to be "shortly after mount", not frame-precise.
 *
 * "scroll" fires the first time the element scrolls into view, then stops
 * observing: a heading that re-animates every time it re-enters the
 * viewport reads as twitchy, unlike the section-level Reveal where the
 * gentler block fade can survive repeating.
 */
export function useRevealTrigger<T extends HTMLElement>(trigger: RevealTrigger) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === "mount") {
      const timer = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(timer);
    }
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return { ref, visible };
}
