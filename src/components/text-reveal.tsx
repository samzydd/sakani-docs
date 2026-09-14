"use client";

import { cn } from "@/lib/utils";
import { useRevealTrigger, type RevealTrigger } from "@/lib/use-reveal-trigger";

/**
 * Splits a heading into explicit lines and reveals them one at a time,
 * each rising up out of a clipped mask rather than the whole block
 * fading in at once. `lines` are author-declared (not measured from
 * actual layout) since our headlines are short, controlled copy -- the
 * trade-off is that at very wide or very narrow viewports a declared
 * "line" may itself wrap again, which just makes that chunk animate
 * together rather than breaking the effect.
 */
export function TextReveal({
  lines,
  as: Tag = "span",
  trigger = "scroll",
  lineDelay = 90,
  startDelay = 0,
  duration,
  className,
}: {
  lines: string[];
  as?: "span" | "h1" | "h2";
  trigger?: RevealTrigger;
  /** Stagger between consecutive lines. */
  lineDelay?: number;
  /** Offset before the first line starts, for sequencing against an
   * eyebrow above or a subtext below. */
  startDelay?: number;
  /** Overrides the default rise duration (ms). The hero runs slower than
   * the section headings on purpose. */
  duration?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealTrigger<HTMLHeadingElement>(trigger);

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={line} className="text-reveal-line">
          <span
            className={cn(visible && "is-visible")}
            style={{
              transitionDelay: visible ? `${startDelay + i * lineDelay}ms` : "0ms",
              ...(duration ? { transitionDuration: `${duration}ms` } : null),
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
