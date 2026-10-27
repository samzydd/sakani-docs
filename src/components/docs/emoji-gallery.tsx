"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/**
 * The emoji gallery. The whole emoji module is large (about 9 MB), so it loads only when this section
 * scrolls into view, and never for people who read the page without getting here.
 */
const Inner = dynamic(() => import("./emoji-gallery-inner"), {
  ssr: false,
  loading: () => <GalleryPlaceholder label="Loading 1,594 emoji" />,
});

function GalleryPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-line-subtle text-sm text-ink-muted" aria-live="polite">
      {label}
    </div>
  );
}

export function EmojiGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setVisible(true); io.disconnect(); }
    }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{visible ? <Inner /> : <GalleryPlaceholder label="Emoji load as you scroll here" />}</div>;
}
