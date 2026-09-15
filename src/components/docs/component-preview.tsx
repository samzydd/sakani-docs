"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Sun, Moon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useHighlightedCode } from "@/lib/use-highlighted-code";
import { cn } from "@/lib/utils";

/**
 * Shrinks a block that's wider than the preview column until the whole
 * thing fits, instead of clipping it.
 *
 * The page-section blocks transcribe their Figma frame as a hard `width`
 * (HeroBlock 1280px, CtaBanner 1263px, TeamSection 1784px) rather than a
 * max-width, so they can't reflow into this column at all -- at 950px you
 * were seeing the left ~75% of a composition whose layout is the entire
 * point. Storybook hides this by rendering them at `layout: 'fullscreen'`.
 *
 * Scaling keeps the block at its true width and zooms the result out, so
 * proportions stay exactly as designed (the alternative, forcing a narrower
 * width, would show a layout the component can't actually produce). The
 * wrapper takes the scaled height so the transform doesn't leave dead space
 * under it, and scale is capped at 1 so blocks narrower than the column are
 * left alone rather than being blown up.
 */
function ScaleToFit({ children }: { children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [{ scale, height }, setFit] = useState({ scale: 1, height: 0 });

  useEffect(() => {
    const o = outer.current, i = inner.current;
    if (!o || !i) return;
    const measure = () => {
      const natural = i.offsetWidth;   // layout width, unaffected by the transform
      const available = o.clientWidth;
      if (!natural || !available) return;
      const next = Math.min(1, available / natural);
      setFit({ scale: next, height: i.offsetHeight * next });
    };
    measure();
    // Both: the column resizes with the viewport, and the block's own height
    // changes as late assets (the hero image) land.
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={outer} style={{ height: height || undefined }} className="overflow-hidden">
      <div
        ref={inner}
        style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: "max-content" }}
      >
        {children}
      </div>
    </div>
  );
}

export function ComponentPreview({
  children,
  code,
  lang = "tsx",
  fullBleed = false,
  scaleToFit = false,
}: {
  children: ReactNode;
  code: string;
  lang?: string;
  /** For wide, self-contained blocks (dashboards, tables) — drops the
   * centered padding so the block renders at its own natural width with
   * horizontal scroll instead of being squeezed into a padded box. */
  fullBleed?: boolean;
  /** For full-page sections with a hard Figma frame width — zooms the whole
   * composition down to fit the column rather than clipping it. See
   * ScaleToFit. Implies fullBleed's edge-to-edge treatment. */
  scaleToFit?: boolean;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  // Independent of the site's own light/dark toggle -- lets you check a
  // component in both themes without switching the whole page (and back).
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const html = useHighlightedCode(code, lang);

  return (
    <div className="overflow-hidden rounded-xl border border-line-subtle">
      <div className="flex items-center justify-between gap-1 border-b border-line-subtle bg-surface px-2 pt-2">
        <div className="flex items-center gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-t-md px-3 py-1.5 text-sm capitalize transition-colors",
                tab === t ? "bg-canvas text-ink" : "text-ink-subtle hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "preview" && (
          <button
            type="button"
            onClick={() => setPreviewTheme((v) => (v === "dark" ? "light" : "dark"))}
            aria-label={previewTheme === "dark" ? "Preview in light mode" : "Preview in dark mode"}
            className="mb-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-subtle transition-colors hover:bg-subtle hover:text-ink"
          >
            {previewTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        )}
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            "bg-canvas",
            previewTheme === "dark" ? "dark" : "force-light",
            scaleToFit
              ? ""
              : fullBleed
                ? "max-h-[980px] overflow-auto"
                : "flex min-h-52 items-center justify-center p-10"
          )}
        >
          {scaleToFit ? <ScaleToFit>{children}</ScaleToFit> : children}
        </div>
      ) : (
        <div className="group relative bg-surface">
          <CopyButton text={code} />
          {html ? (
            <>
              <div
                className="overflow-x-auto p-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent dark:hidden"
                dangerouslySetInnerHTML={{ __html: html.light }}
              />
              <div
                className="hidden overflow-x-auto p-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent dark:block"
                dangerouslySetInnerHTML={{ __html: html.dark }}
              />
            </>
          ) : (
            <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-ink-muted">{code}</pre>
          )}
        </div>
      )}
    </div>
  );
}
