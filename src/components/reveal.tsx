"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades + rises a section into place every time it scrolls into view, and
 * fades back out on the way past -- not a one-shot reveal, so scrolling up
 * and down repeatedly re-triggers it both ways. Always starts at `false`
 * on both server and client renders -- checking `typeof
 * IntersectionObserver` for the initial value looks tempting (it's
 * `undefined` in Node) but that makes the server-rendered markup start
 * "visible" while the client's first render starts "hidden", a real
 * hydration mismatch React has to reconcile away as an extra render.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      // Very old browser with no IntersectionObserver — show content
      // immediately rather than leaving it permanently hidden.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    // A generous negative bottom margin keeps a section visible until it's
    // genuinely well past the viewport, rather than fading out the instant
    // its edge touches the fold -- the fade-out reads as intentional, not
    // flickery.
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={visible ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
