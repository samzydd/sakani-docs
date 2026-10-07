"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Hosts a full-screen dashboard demo so it is usable at every width.
 *
 * - Wide canvas: the block renders at its designed size (the Figma frame) and
 *   the whole thing is scaled down to fit, so desktop visitors see the real
 *   composition.
 * - Narrow canvas (phones, tablet portrait): scaling a 1440px dashboard into
 *   ~350px produces an unreadable thumbnail, so instead the block renders at the
 *   canvas's own width and its container-based responsive layout takes over
 *   (drawer navigation, stacked toolbar, single-column cards...).
 *
 * The block must size itself to its container for the narrow branch to work.
 */
export function ResponsiveDemo({
  designWidth,
  designHeight,
  nativeHeight = 760,
  switchAt = 760,
  children,
}: {
  designWidth: number;
  designHeight: number;
  /** Height of the frame while it renders at native (narrow) size. */
  nativeHeight?: number;
  /** Canvas width at or above which the designed size is scaled to fit. */
  switchAt?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scaled = width >= switchAt;
  const scale = scaled ? Math.min(1, width / designWidth) : 1;

  const frame: CSSProperties = scaled
    ? { width: designWidth, height: designHeight, transform: `scale(${scale})`, transformOrigin: "top left" }
    : { width: "100%", height: nativeHeight };

  return (
    <div
      ref={ref}
      style={{ height: width ? (scaled ? designHeight * scale : nativeHeight) : undefined }}
      className="overflow-hidden"
    >
      {width > 0 && <div style={frame}>{children}</div>}
    </div>
  );
}
