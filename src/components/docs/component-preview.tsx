"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconSun as Sun, IconMoon as Moon, IconArrowsMaximize as Maximize, IconArrowsMinimize as Minimize } from "@sakaniui/react/icons";
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
  center = false,
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
  /** Centres the content on both axes while keeping fullBleed's scroll behaviour.
   * The content is wrapped in an `m-auto` box inside a flex canvas, which is
   * "safe" centring: if it is wider than the canvas the margins collapse to 0 and
   * it scrolls from its left edge, instead of being clipped on both sides the
   * way justify-center would. Use it for blocks narrower than the canvas. */
  center?: boolean;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  // Independent of the site's own light/dark toggle -- lets you check a
  // component in both themes without switching the whole page (and back).
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const html = useHighlightedCode(code, lang);
  const holder = useRef<HTMLDivElement>(null);
  const expand = useExpand(holder);
  const { phase, expanded } = expand;

  return (
    <>
      {/* Dims and blurs the page behind the expanded card; clicking it closes. */}
      {phase !== "closed" && (
        <div
          aria-hidden="true"
          onClick={expand.close}
          className={cn(
            "fixed inset-0 z-[99] bg-black/55 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none",
            expanded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      {/* The holder keeps the card's slot in the page while the card itself is lifted out to
          position:fixed, so the page does not jump when it opens or closes. */}
      <div ref={holder} style={phase !== "closed" ? { height: expand.held } : undefined}>
        <div
          role={phase !== "closed" ? "dialog" : undefined}
          aria-modal={phase !== "closed" ? true : undefined}
          aria-label={phase !== "closed" ? "Expanded component preview" : undefined}
          style={expand.cardStyle}
          className={cn(
            "rounded-xl border border-line-subtle",
            phase !== "closed" &&
              "fixed z-[100] flex flex-col overflow-hidden bg-canvas shadow-2xl transition-[top,left,width,height] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none"
          )}
        >
          <PreviewBody
            tab={tab} setTab={setTab} previewTheme={previewTheme} setPreviewTheme={setPreviewTheme}
            expand={expand} code={code} html={html} fullBleed={fullBleed} scaleToFit={scaleToFit} center={center}
          >
            {children}
          </PreviewBody>
        </div>
      </div>
    </>
  );
}

type Expand = ReturnType<typeof useExpand>;

/** How far in from each edge of the screen the expanded card sits. */
const INSET = 20;

/**
 * Lifts a preview card out of the page and animates it to (nearly) the whole screen, then back.
 *
 * One instance of the component stays mounted the whole time (the card is only restyled, never
 * re-parented), so a demo keeps its state, its scroll and a running animation while it grows.
 * The card is moved with position:fixed from its own on-page rectangle to the inset screen
 * rectangle, so it reads as the same card getting bigger rather than a modal appearing.
 */
function useExpand(holder: React.RefObject<HTMLDivElement | null>) {
  const [phase, setPhase] = useState<"closed" | "opening" | "open" | "closing">("closed");
  const [from, setFrom] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
  const [held, setHeld] = useState(0);
  const opener = useRef<HTMLElement | null>(null);

  const open = () => {
    const el = holder.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    opener.current = document.activeElement as HTMLElement | null;
    setHeld(r.height);
    setFrom({ top: r.top, left: r.left, width: r.width, height: r.height });
    setPhase("opening");
  };
  const close = () => {
    if (phase !== "open" && phase !== "opening") return;
    const r = holder.current?.getBoundingClientRect();
    if (r) setFrom({ top: r.top, left: r.left, width: r.width, height: r.height });
    setPhase("closing");
  };

  // opening -> open on the next frame, so the browser paints the card at its page rectangle first
  // and the move to the screen rectangle is a transition rather than a jump.
  useEffect(() => {
    if (phase !== "opening") return;
    let a = 0, b = 0;
    a = requestAnimationFrame(() => { b = requestAnimationFrame(() => setPhase("open")); });
    return () => { cancelAnimationFrame(a); cancelAnimationFrame(b); };
  }, [phase]);

  // closing -> closed once the card is back in its slot.
  useEffect(() => {
    if (phase !== "closing") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => {
      setPhase("closed");
      opener.current?.focus?.();
    }, reduce ? 0 : 320);
    return () => window.clearTimeout(t);
  }, [phase]);

  // While it is up: Escape closes it and the page behind does not scroll.
  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const expanded = phase === "open";
  const cardStyle: React.CSSProperties | undefined =
    phase === "closed" ? undefined
    : expanded ? { top: INSET, left: INSET, width: `calc(100vw - ${INSET * 2}px)`, height: `calc(100dvh - ${INSET * 2}px)` }
    : from ? { top: from.top, left: from.left, width: from.width, height: from.height }
    : undefined;

  return { phase, expanded, open, close, held, cardStyle };
}

function PreviewBody({
  children, code, html, tab, setTab, previewTheme, setPreviewTheme, expand, fullBleed, scaleToFit, center,
}: {
  children: ReactNode;
  code: string;
  html: { light: string; dark: string } | null | undefined;
  tab: "preview" | "code";
  setTab: (t: "preview" | "code") => void;
  previewTheme: "light" | "dark";
  setPreviewTheme: (f: (v: "light" | "dark") => "light" | "dark") => void;
  expand: Expand;
  fullBleed: boolean;
  scaleToFit: boolean;
  center: boolean;
}) {
  const lifted = expand.phase !== "closed";
  return (
    /* No overflow-hidden here, deliberately.
     *
     * Several components reveal a floating panel that is positioned inline
     * rather than portaled -- Popover and Tooltip put theirs in an absolutely
     * positioned element inside their own root -- so a clipping ancestor cuts
     * them off. Every preview pane is 208px tall with the example centred in
     * it, which left popovers overflowing by up to 53px and losing their
     * action buttons off the bottom edge. Growing the pane is a poor fix:
     * centred content means half of any height added lands above the trigger,
     * and the number would have to be re-guessed for every component that
     * opens something.
     *
     * Letting the panel escape the card is also just what a popover does in a
     * real layout. The rounded corners that overflow-hidden used to clip are
     * applied directly to the header and to each pane below instead. */
    <div className={cn(lifted && "flex min-h-0 flex-1 flex-col")}>
      <div className="flex shrink-0 items-center justify-between gap-1 rounded-t-xl border-b border-line-subtle bg-surface px-2 pt-2">
        <div className="flex items-center gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-t-md px-3 py-1.5 text-sm capitalize transition-colors",
                tab === t ? "bg-canvas text-ink" : "text-ink-muted hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>
          <div className="mb-1.5 flex items-center gap-0.5">
            {lifted && <span className="mr-1.5 hidden text-xs text-ink-muted sm:inline">Esc to close</span>}
            {tab === "preview" && (
              <button
                type="button"
                onClick={() => setPreviewTheme((v) => (v === "dark" ? "light" : "dark"))}
                aria-label={previewTheme === "dark" ? "Preview in light mode" : "Preview in dark mode"}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-subtle hover:text-ink"
              >
                {previewTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>
            )}
            <button
              type="button"
              onClick={lifted ? expand.close : expand.open}
              aria-label={lifted ? "Close expanded view" : "Expand preview"}
              title={lifted ? "Close (Esc)" : "Expand"}
              // Below sm the card is already the width of the screen, so a bigger view adds nothing.
              className={cn(
                "shrink-0 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-subtle hover:text-ink h-7 w-7",
                lifted ? "flex" : "hidden sm:flex"
              )}
            >
              {lifted ? <Minimize size={14} /> : <Maximize size={14} />}
            </button>
          </div>
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            // rounded-b-xl on each pane, since the card no longer clips to
            // its own corners.
            "rounded-b-xl bg-canvas",
            previewTheme === "dark" ? "dark" : "force-light",
            // The theme classes swap the color TOKENS, not the inherited
            // `color` itself -- so anything drawn in currentColor (Spinner,
            // bare icons) kept the page's text color: a near-white spinner
            // on the light canvas when the site is dark, and vice versa.
            // Resolving `color` here, where the preview's tokens live, fixes
            // every currentColor component at once.
            "text-[color:var(--color-fg-default)]",
            // Lifted: the pane fills what is left under the header and scrolls on its own, whatever its kind.
            lifted
              ? cn("min-h-0 flex-1 overflow-auto", !scaleToFit && !fullBleed && "flex items-center justify-center p-10", center && "flex")
              : scaleToFit
                ? "overflow-hidden"
                : fullBleed
                  ? cn("max-h-[980px] overflow-auto", center && "flex")
                  : "flex min-h-52 items-center justify-center p-10"
          )}
        >
          {scaleToFit ? (
            <ScaleToFit>{children}</ScaleToFit>
          ) : center ? (
            <div className="m-auto p-8">{children}</div>
          ) : (
            children
          )}
        </div>
      ) : (
        <div className={cn("group relative rounded-b-xl bg-surface", lifted ? "min-h-0 flex-1 overflow-auto" : "overflow-hidden")}>
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
