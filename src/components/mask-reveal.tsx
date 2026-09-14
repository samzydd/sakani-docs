"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRevealTrigger, type RevealTrigger } from "@/lib/use-reveal-trigger";

/**
 * TextReveal's rise-out-of-a-mask motion, but for arbitrary children --
 * eyebrow pills, subtext paragraphs, button rows -- so everything in a
 * section shares one motion language instead of headings rising while
 * everything around them cross-fades.
 *
 * The mask is only applied while hidden. Leaving overflow:hidden on
 * permanently would clip anything that legitimately paints outside its
 * box afterwards (focus rings on the buttons, the eyebrow's hover
 * border), so it's dropped the moment the reveal finishes.
 */
export function MaskReveal({
  children,
  trigger = "scroll",
  delay = 0,
  duration,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  trigger?: RevealTrigger;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "p";
}) {
  const { ref, visible } = useRevealTrigger<HTMLDivElement>(trigger);
  const [settled, setSettled] = useState(false);

  // transitionend alone isn't enough to drop the mask: it never fires if
  // the transition doesn't actually run (a backgrounded tab, an element
  // that never paints) or if it gets interrupted, which would leave
  // overflow:hidden on permanently and clip focus rings forever. This
  // guarantees the mask comes off regardless.
  useEffect(() => {
    if (!visible || settled) return;
    const timer = setTimeout(() => setSettled(true), delay + (duration ?? 900) + 120);
    return () => clearTimeout(timer);
  }, [visible, settled, delay, duration]);

  return (
    <Tag
      ref={ref}
      className={cn("mask-reveal", visible && "is-visible", settled && "is-settled", className)}
    >
      <span
        className="mask-reveal__inner"
        style={{
          transitionDelay: visible ? `${delay}ms` : "0ms",
          ...(duration ? { transitionDuration: `${duration}ms` } : null),
        }}
        onTransitionEnd={(e) => {
          if (e.propertyName === "transform") setSettled(true);
        }}
      >
        {children}
      </span>
    </Tag>
  );
}
