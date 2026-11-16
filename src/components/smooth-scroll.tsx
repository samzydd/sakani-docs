"use client";

import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { usePathname } from "next/navigation";

/**
 * Smooth (eased) scrolling for the whole site, with Lenis.
 *
 * Mounted once in the root layout. It drives the window scroll only; a scrollable box inside the page keeps its own
 * native scrolling (`allowNestedScroll`): the sidebar list, a preview pane, a code block, a table, a modal.
 *
 * - Reduced motion: Lenis honours `prefers-reduced-motion` itself (smoothing off, jumps instant).
 * - Touch: Lenis leaves touch scrolling native (no `syncTouch`), so phones keep their own momentum.
 * - Anchors: a `#hash` link eases to its target instead of jumping.
 * - `/embed/*`: those pages are small live demos shown inside an iframe on the homepage; they scroll natively.
 * - `autoToggle`: Lenis steps aside while something locks the page scroll with `overflow: hidden` (a modal, the expanded
 *   preview), so the wheel does not move the page behind it.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  if (pathname?.startsWith("/embed")) return null;
  return (
    <ReactLenis
      root
      options={{ autoRaf: true, anchors: true, allowNestedScroll: true, autoToggle: true, stopInertiaOnNavigate: true }}
    />
  );
}
