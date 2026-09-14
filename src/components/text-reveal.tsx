"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Splits a heading into explicit lines and reveals them one at a time,
 * each rising up out of a clipped mask rather than the whole block
 * fading in at once. `lines` are author-declared (not measured from
 * actual layout) since our headlines are short, controlled copy -- the
 * trade-off is that at very wide or very narrow viewports a declared
 * "line" may itself wrap again, which just makes that chunk animate
 * together rather than breaking the effect.
 *
 * `trigger="mount"` fires shortly after mount (the hero, already in view
 * on load); `trigger="scroll"` fires via IntersectionObserver the first
 * time it scrolls into view (every other section title).
 */
export function TextReveal({
  lines,
  as: Tag = "span",
  trigger = "scroll",
  lineDelay = 110,
  className,
}: {
  lines: string[];
  as?: "span" | "h1" | "h2";
  trigger?: "mount" | "scroll";
  lineDelay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger === "mount") {
      // A tick late so the transition actually runs instead of starting in
      // its end state (mounting already-visible skips the transition). A
      // timeout rather than requestAnimationFrame -- rAF callbacks can be
      // throttled or skipped entirely for a backgrounded/hidden tab, and
      // this is exactly the kind of "just fire shortly after mount" timer
      // that doesn't need frame-precision.
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
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    // @ts-expect-error -- Tag is one of a fixed set of intrinsic elements
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="text-reveal-line">
          <span style={{ transitionDelay: visible ? `${i * lineDelay}ms` : "0ms" }} className={cn(visible && "is-visible")}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
