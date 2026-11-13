"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Fragment, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  BarChart, Button, Calendar, Card, ChainOfThought, ChainOfThoughtStep, LiquidBackdrop, LiquidGlass, MapGlobe, Menu, MenuItem, Progress, RadarChart, RadialChart, SegmentedControl,
  Slider, SourceStack, Stepper, Switch, Tabs, Toast, sourceLogo, syncLiquidBackdrop, type DateRange,
} from "@sakaniui/react";
import { AiChatBlock, KanbanBoardBlock } from "@sakaniui/react/blocks";
import { EmojiLightBulb, EmojiMagnifyingGlassTiltedLeft, EmojiPageFacingUp } from "@sakaniui/react/emoji";
import {
  IconArrowRight as ArrowRight, IconArrowUpRight as ArrowUpRight, IconMoon as Moon, IconPencil as Pencil, IconSun as Sun,
  IconCopy as Copy, IconDownload as Download, IconTrash as Trash,
} from "@sakaniui/react/icons";
import { TextReveal } from "@/components/text-reveal";
import { MaskReveal } from "@/components/mask-reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** True while the element is on screen: demos only run their loops (and mount heavy parts) while visible. */
function useInView<T extends HTMLElement>(margin = "120px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Very old browser with no IntersectionObserver: run the demos rather than leave them frozen.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, inView] as const;
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (on) => { const mq = window.matchMedia(REDUCED_QUERY); mq.addEventListener("change", on); return () => mq.removeEventListener("change", on); },
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/**
 * A looping index. It advances every `ms` while `active`, and a person touching the demo
 * (`take`) hands it control for a few seconds before the loop resumes.
 */
function useLoop(length: number, ms: number, active: boolean) {
  const [i, setI] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!active || reduced) return;
    const t = setInterval(() => { if (Date.now() > pausedUntil) setI((n) => (n + 1) % length); }, ms);
    return () => clearInterval(t);
  }, [active, reduced, length, ms, pausedUntil]);
  const take = (n: number) => { setI(n); setPausedUntil(Date.now() + 7000); };
  return [i, take] as const;
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */

type Kind = "Map" | "Search" | "Surface" | "AI" | "Chart" | "Block" | "Form" | "Navigation" | "Feedback" | "Data entry" | "Data display";

/**
 * One sample: a stage with the live component on it, then its name, kind and a line about it.
 * The stage stays interactive (so it is not inside the link); the name links to the docs.
 */
/** How much smaller than its box a padded demo is drawn. */
const DEMO_SCALE = 0.86;

function WallCard({
  title, kind, description, href, children, className, stageClassName, reveal = 0, padded = true,
}: {
  title: string;
  kind: Kind;
  description: string;
  href: string;
  children: (inView: boolean, dark: boolean) => ReactNode;
  className?: string;
  stageClassName?: string;
  reveal?: number;
  padded?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  // Each card can be flipped to light or dark on its own, whatever the site is set to: the stage carries `dark` or
  // `force-light` (the same pair the dashboard frame uses), so everything on it re-themes through the tokens.
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true); }, []);
  const [mode, setMode] = useState<"light" | "dark" | null>(null);
  const isDark = mode ? mode === "dark" : mounted && resolvedTheme === "dark";
  return (
    <div className={cn("wall-card group flex min-w-0 flex-col", className)} style={{ ["--wall-delay" as string]: `${reveal}ms` }}>
      <div
        ref={ref}
        className={cn(
          "wall-stage relative flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-line-subtle bg-surface",
          "transition-[border-color,box-shadow] duration-300 group-hover:border-line-default group-hover:shadow-lg",
          padded && "p-6",
          mode === "dark" && "dark",
          mode === "light" && "force-light",
          stageClassName,
        )}
      >
        {padded ? (
          // The demo sits a little smaller than its box, so it has air around it: CSS zoom shrinks what has a fixed size
          // (a calendar, a menu) and the wrapper's width shrinks what fills its box (a slider, a tab bar).
          <div className="flex items-center justify-center" style={{ width: `${DEMO_SCALE * 100}%`, zoom: DEMO_SCALE }}>
            {children(inView, isDark)}
          </div>
        ) : children(inView, isDark)}
        <button
          type="button"
          onClick={() => setMode(isDark ? "light" : "dark")}
          aria-label={isDark ? `Show ${title} in light mode` : `Show ${title} in dark mode`}
          className={cn(
            "absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-lg border border-line-subtle bg-surface/80 text-ink-muted backdrop-blur-sm",
            "opacity-0 transition-[opacity,color] duration-200 hover:text-ink focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100",
          )}
        >
          {isDark ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
        </button>
      </div>
      <Link href={href} className="mt-3.5 block rounded-md outline-offset-4">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold text-ink">{title}</span>
          <span className="rounded-full border border-line-subtle px-2 py-0.5 text-[11px] font-medium leading-none text-ink-muted">{kind}</span>
          <ArrowUpRight size={14} className="ml-auto -translate-x-1 text-ink-muted opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
        </span>
        <span className="mt-1 block text-sm leading-snug text-ink-muted">{description}</span>
      </Link>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Featured demos                                                      */
/* ------------------------------------------------------------------ */

const HQ: [number, number] = [6.5, 3.4];
const CITIES: Record<string, [number, number]> = {
  London: [51.5, -0.1], Nairobi: [-1.3, 36.8], Singapore: [1.35, 103.8], Dubai: [25.2, 55.3],
  "New York": [40.7, -74], "Sao Paulo": [-23.5, -46.6], Sydney: [-33.9, 151.2], Mumbai: [19.1, 72.9],
};

function GlobeDemo({ inView, dark }: { inView: boolean; dark: boolean }) {
  const markers = useMemo(() => [
    { position: HQ, active: true, label: "Lagos HQ" },
    ...Object.entries(CITIES).map(([label, position]) => ({ position, label })),
  ], []);
  const arcs = useMemo(() => Object.values(CITIES).map((to) => ({ from: HQ, to })), []);
  return (
    <div className="aspect-square w-full max-w-[420px]">
      {/* keyed by the card's theme: the globe reads its dot colour into JS when the page's root theme class changes, and
          this card flips a class on a nested element instead, so a globe flipped in place would keep its old colour
          (light dots on a light card: invisible). A fresh one reads it again. */}
      {inView ? <MapGlobe key={String(dark)} markers={markers} arcs={arcs} center={[14, 20]} rotationSpeed={8} aria-label="Offices around the world" /> : null}
    </div>
  );
}

const LENS = 170;

/**
 * Liquid glass over a photograph: a lens drifts across the picture bending it at the edge (refraction,
 * dispersion, rim light), a glass card and a glass control sit on top. Pick the lens up and it follows
 * the pointer; let go and it carries on. The library keeps the photo inside each lens aligned, as long as
 * a lens moved from JavaScript calls syncLiquidBackdrop() in the same frame.
 */
function GlassDemo({ inView }: { inView: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0.62, y: 0.36 });
  const grab = useRef<{ dx: number; dy: number } | null>(null);
  const resumeAt = useRef(0);
  const reduced = usePrefersReducedMotion();
  const [seg, takeSeg] = useLoop(3, 1700, inView);

  useEffect(() => {
    const place = () => {
      const st = stage.current, ln = lens.current;
      if (!st || !ln) return;
      const w = st.clientWidth, h = st.clientHeight;
      const x = Math.min(Math.max(pos.current.x * w - LENS / 2, 0), w - LENS);
      const y = Math.min(Math.max(pos.current.y * h - LENS / 2, 0), h - LENS);
      ln.style.transform = `translate(${x}px, ${y}px)`;
      syncLiquidBackdrop();
    };
    place();
    if (!inView || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      if (!grab.current && Date.now() > resumeAt.current) {
        const t = (now - t0) / 1000;
        pos.current = { x: 0.5 + 0.36 * Math.sin(t * 0.8), y: 0.5 + 0.3 * Math.sin(t * 1.15 + 1.2) };
      }
      place();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced]);

  const move = (e: React.PointerEvent) => {
    const st = stage.current;
    if (!grab.current || !st) return;
    const r = st.getBoundingClientRect();
    pos.current = { x: (e.clientX - r.left - grab.current.dx) / r.width, y: (e.clientY - r.top - grab.current.dy) / r.height };
  };

  return (
    <LiquidBackdrop ref={stage} src="/glass/backdrop.jpg" className="absolute inset-0 overflow-hidden">
      <LiquidGlass
        variant="clear"
        tint="none"
        radius={999}
        reducedTransparency="ignore"
        effect={{ refraction: 0.85, depth: 20, dispersion: 0.4, frost: 0.4 }}
        className="p-0.5"
        style={{ position: "absolute", left: 20, top: 20 }}
      >
        <SegmentedControl
          className="wall-glass-seg"
          options={[{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }]}
          value={["day", "week", "month"][seg]}
          onChange={(v) => takeSeg(["day", "week", "month"].indexOf(v))}
        />
      </LiquidGlass>
      <LiquidGlass variant="regular" radius={16} reducedTransparency="ignore" style={{ position: "absolute", left: 20, bottom: 20, width: "min(250px, calc(100% - 40px))" }}>
        <Card title="Revenue" description="Last 30 days" actions={<Button size="sm">View report</Button>} />
      </LiquidGlass>
      <LiquidGlass
        ref={lens}
        variant="clear"
        tint="none"
        radius={LENS / 2}
        source={false}
        bake={false}
        reducedTransparency="ignore"
        effect={{ refraction: 1, depth: 34, dispersion: 0.6, frost: 0 }}
        aria-label="A glass lens: drag it over the card"
        className="cursor-grab touch-none active:cursor-grabbing"
        style={{ position: "absolute", left: 0, top: 0, width: LENS, height: LENS }}
        onPointerDown={(e) => {
          const ln = lens.current;
          if (!ln) return;
          const r = ln.getBoundingClientRect();
          // the grab point, relative to the lens centre, so the lens does not jump under the pointer
          grab.current = { dx: e.clientX - (r.left + r.width / 2), dy: e.clientY - (r.top + r.height / 2) };
          try { ln.setPointerCapture(e.pointerId); } catch { /* the pointer ended before capture: dragging still follows the stage's own moves */ }
        }}
        onPointerMove={move}
        onPointerUp={() => { grab.current = null; resumeAt.current = Date.now() + 4000; }}
        onPointerCancel={() => { grab.current = null; resumeAt.current = Date.now() + 4000; }}
      />
    </LiquidBackdrop>
  );
}

/* Three frames of data per chart; the demo walks through them and each chart tweens between them. */
const RINGS = [
  [78, 64, 52, 36],
  [58, 82, 40, 60],
  [90, 48, 70, 28],
];
const RING_LABELS = ["Revenue", "Growth", "Retention", "Referrals"];
const AXES = ["Speed", "Quality", "Support", "Price", "Docs", "Design"];
const RADAR_NOW = [[82, 70, 90, 55, 76, 88], [60, 92, 68, 80, 58, 72], [88, 64, 74, 90, 84, 60]];
const RADAR_PREV = [[58, 52, 64, 70, 48, 60], [48, 66, 50, 58, 62, 44], [64, 50, 58, 62, 54, 68]];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const BARS = [[42, 68, 54, 88, 72, 36, 48], [66, 50, 82, 60, 94, 52, 40], [38, 76, 62, 70, 58, 84, 66]];

function Panel({ label, children, className, style }: { label: string; children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-xl border border-line-subtle p-4", className)} style={style}>
      <p className="mb-2 text-xs font-medium text-ink-muted">{label}</p>
      <div className="flex min-h-0 flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

/** A radial, a radar and a bar chart: the real library charts, holding still. They fade up in turn the first time they
 *  come on screen, and stay put after that. */
function ChartsDemo({ inView }: { inView: boolean }) {
  const [seen, setSeen] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  const enter = (k: number) => ({
    className: cn(
      "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
      seen ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
    ),
    style: { transitionDelay: `${k * 120}ms` },
  });
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Panel label="Quarter goals" {...enter(0)}>
        <RadialChart
          size="lg" variant="multi" appearance="rich" centerValue={`${Math.round(RINGS[0].reduce((a, b) => a + b, 0) / 4)}%`} centerCaption="On track"
          data={RING_LABELS.map((label, k) => ({ label, value: RINGS[0][k], max: 100 }))}
        />
      </Panel>
      <Panel label="Product scorecard" {...enter(1)}>
        <RadarChart
          size="lg" variant="multiple" appearance="rich" seriesLabels={["This year", "Last year"]}
          data={AXES.map((label, k) => ({ label, value: RADAR_NOW[0][k], value2: RADAR_PREV[0][k] }))}
        />
      </Panel>
      <Panel label="Signups this week" {...enter(2)}>
        <BarChart size="lg" appearance="rich" data={DAYS.map((label, k) => ({ label, value: BARS[0][k] }))} />
      </Panel>
    </div>
  );
}

const G = sourceLogo("google"), XL = sourceLogo("x"), RD = sourceLogo("reddit"), HN = sourceLogo("hackernews");
const RUN = [
  { icon: EmojiLightBulb, label: "Planning the search", count: "3 angles", ms: 900 },
  { icon: G, label: "Searched Google for", query: "design system pricing", count: "10 results", ms: 1300,
    sources: [{ label: "Google", icon: G }, { label: "Product Hunt", icon: sourceLogo("producthunt") }, { label: "Medium", icon: sourceLogo("medium") }, { label: "Wikipedia", icon: sourceLogo("wikipedia") }] },
  { icon: XL, label: "Searched X for", query: "paid design systems", count: "7 posts", ms: 1200 },
  { icon: RD, label: "Searched Reddit for", query: "r/reactjs worth paying for", count: "12 threads", ms: 1500,
    sources: [{ label: "Reddit", icon: RD }, { label: "Hacker News", icon: HN }, { label: "Stack Overflow", icon: sourceLogo("stackoverflow") }] },
  { icon: EmojiPageFacingUp, label: "Reading the strongest three threads", ms: 1600 },
];

/** An agent run that plays on a loop while it is on screen: each step arrives, works, lands its results, then it finishes. */
function ChainDemo({ inView }: { inView: boolean }) {
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [landed, setLanded] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [finishedIn, setFinishedIn] = useState<number | undefined>();
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(0); setLanded(0); setFinishedIn(undefined); setStartedAt(start);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 500;
    RUN.forEach((r, i) => {
      timers.push(setTimeout(() => setShown(i + 1), at));
      at += r.ms;
      timers.push(setTimeout(() => setLanded(i + 1), at));
      at += 300;
    });
    timers.push(setTimeout(() => setFinishedIn((Date.now() - start) / 1000), at - 100));
    // hold the finished run for a moment, then play it again (not under reduced motion: it stays finished)
    if (!reduced) timers.push(setTimeout(() => setRun((n) => n + 1), at + 3800));
    return () => timers.forEach(clearTimeout);
  }, [run, inView, reduced]);
  const done = finishedIn != null;
  return (
    <div className="w-full max-w-[520px]">
      <ChainOfThought
        title={done ? `Ran ${RUN.filter((r) => r.query).length} searches` : "Researching"}
        icon={EmojiMagnifyingGlassTiltedLeft}
        status={done ? "done" : "working"}
        startedAt={startedAt}
        elapsed={finishedIn}
      >
        {RUN.slice(0, shown).map((r, i) => (
          <ChainOfThoughtStep
            key={`${run}-${r.label}`}
            status={!done && i === shown - 1 && landed < shown ? "active" : "done"}
            icon={r.icon}
            label={r.label}
            query={r.query}
            count={i < landed ? r.count : undefined}
            sources={i < landed && r.sources ? <SourceStack sources={r.sources} /> : undefined}
            onSourcesClick={r.sources ? () => {} : undefined}
          />
        ))}
      </ChainOfThought>
    </div>
  );
}

/**
 * The real CommandMenu, running in a frame. The menu is drawn in a layer over the whole page, so the card frames a small
 * page of its own (/embed/command-menu) where it is open and typing for itself until someone touches it. The frame is
 * created when the card first scrolls into view and kept after that, and it follows the card's own light/dark switch.
 */
function CommandMenuDemo({ inView, dark }: { inView: boolean; dark: boolean }) {
  const [seen, setSeen] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (inView) setSeen(true); }, [inView]);
  if (!seen) return null;
  return (
    <iframe
      key={dark ? "dark" : "light"}
      src={`/embed/command-menu?theme=${dark ? "dark" : "light"}`}
      title="Command menu: a live search that types a few queries, then lets you try it"
      className="absolute left-5 top-5 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] border-0"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Self-playing block demos                                            */
/* ------------------------------------------------------------------ */

type Pt = { x: number; y: number };

/** What a demo script can do. Points are in the stage's own coordinates, so a page scroll mid-gesture changes nothing. */
interface Hand {
  stage: HTMLElement;
  wait: (ms: number) => Promise<void>;
  /** Glide the cursor to a point (a function, so it can follow a target that moves). */
  move: (to: () => Pt, ms?: number) => Promise<void>;
  /** A point on an element: fx and fy are fractions of its width and height. */
  at: (el: Element, fx?: number, fy?: number) => Pt;
  /** Press on an element: the cursor dips, and from here the cursor's moves also reach the page as a held-down drag. */
  press: (el: Element) => void;
  release: () => void;
  /** A click: the ripple, then the element's own click. */
  click: (el: HTMLElement) => void;
}

type Play = (hand: Hand, root: HTMLElement, round: number) => Promise<"reset" | void>;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * A real block, played by a cursor: it moves, presses, drags, types and clicks the block's own controls, which answer
 * as they do for anyone (the card lifts, the reply arrives), on a loop. Not interactive itself: pointer events are off,
 * the page's own focus and scroll are never touched, and the docs page has the block to use. It plays only while on
 * screen, mounts the first time it is, and stands still for prefers-reduced-motion.
 *
 * Both shrink a block that is drawn at a fixed size to the stage. "scale" is a transform, fine for a script that only
 * clicks and types. A drag can't use one: the block puts the lifted card where the pointer is with a transform of
 * its own, which a scaled parent would skew. "zoom" (CSS zoom) shrinks the layout instead, and `.kanban-zoom` in
 * globals.css puts the lifted card and its slot back at the true size.
 */
function AutoDemo({ inView, mode, width = 1040, height = 640, play, children }: {
  inView: boolean; mode: "scale" | "zoom"; width?: number; height?: number; play: Play; children: ReactNode;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [stageH, setStageH] = useState(0);
  const [epoch, setEpoch] = useState(0);
  const [faded, setFaded] = useState(false);
  const round = useRef(0);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (inView) setShown(true); }, [inView]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    // the board never shrinks past half size: on a phone the card crops it, as a window would, rather than make it unreadable
    const fit = () => { setScale(Math.max(el.clientWidth / width, mode === "zoom" ? 0.5 : 0)); setStageH(el.clientHeight); };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [mode, width]);

  useEffect(() => {
    const stage = stageRef.current, root = rootRef.current, cursor = cursorRef.current, ripple = rippleRef.current;
    if (!inView || !shown || !stage || !root || !cursor || !ripple) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ac = new AbortController();
    const stop = () => new Error("stop"); // how a cancelled wait or glide ends the script
    let raf = 0, dragging = false, bow = 1;
    let pos: Pt = { x: stage.clientWidth * 0.82, y: stage.clientHeight * 0.88 };

    const client = (p: Pt) => { const r = stage.getBoundingClientRect(); return { x: r.left + p.x, y: r.top + p.y }; };
    const draw = () => {
      cursor.style.transform = `translate(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px)`;
      if (dragging) { const c = client(pos); window.dispatchEvent(new PointerEvent("pointermove", { clientX: c.x, clientY: c.y, pointerType: "mouse", bubbles: true })); }
    };
    const wait = (ms: number) => new Promise<void>((res, rej) => {
      const t = setTimeout(res, ms);
      ac.signal.addEventListener("abort", () => { clearTimeout(t); rej(stop()); }, { once: true });
    });
    const move = (to: () => Pt, ms?: number) => new Promise<void>((res, rej) => {
      const from = { ...pos }, t0 = performance.now(), first = to();
      const dist = Math.hypot(first.x - from.x, first.y - from.y);
      const dur = ms ?? Math.min(1100, 380 + dist * 0.8);
      const arc = Math.min(36, dist * 0.07) * (bow = -bow);   // each glide bows the other way, as a hand does
      const tick = (now: number) => {
        if (ac.signal.aborted) { rej(stop()); return; }
        const k = Math.min(1, (now - t0) / dur), e = easeInOut(k), end = to();
        const dx = end.x - from.x, dy = end.y - from.y, len = Math.hypot(dx, dy) || 1, bend = Math.sin(Math.PI * e) * arc;
        pos = { x: from.x + dx * e - (dy / len) * bend, y: from.y + dy * e + (dx / len) * bend };
        draw();
        if (k < 1) raf = requestAnimationFrame(tick); else res();
      };
      raf = requestAnimationFrame(tick);
    });
    const hand: Hand = {
      stage, wait, move,
      at: (el, fx = 0.5, fy = 0.5) => { const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect(); return { x: r.left - s.left + r.width * fx, y: r.top - s.top + r.height * fy }; },
      press: (el) => {
        const c = client(pos);
        cursor.dataset.down = "1";
        el.dispatchEvent(new PointerEvent("pointerdown", { clientX: c.x, clientY: c.y, button: 0, pointerType: "mouse", bubbles: true }));
        dragging = true;
      },
      release: () => {
        const c = client(pos);
        dragging = false;
        delete cursor.dataset.down;
        window.dispatchEvent(new PointerEvent("pointerup", { clientX: c.x, clientY: c.y, pointerType: "mouse", bubbles: true }));
      },
      click: (el) => {
        ripple.animate([{ transform: "scale(0.2)", opacity: 0.55 }, { transform: "scale(1.7)", opacity: 0 }], { duration: 480, easing: "ease-out" });
        el.click();
      },
    };

    draw();
    cursor.style.opacity = "1";
    (async () => {
      await wait(900);
      for (;;) {
        const out = await play(hand, root, round.current++);
        if (out === "reset") {
          setFaded(true); await wait(380);
          setEpoch((n) => n + 1); await wait(160);
          setFaded(false); await wait(700);
        }
      }
    })().catch((e: unknown) => { if (!(e instanceof Error && e.message === "stop")) console.error("demo script stopped:", e); });

    return () => {
      ac.abort();
      cancelAnimationFrame(raf);
      if (dragging) window.dispatchEvent(new PointerEvent("pointerup", { pointerType: "mouse", bubbles: true }));
      delete cursor.dataset.down;
      cursor.style.opacity = "0";
    };
  }, [inView, shown, play]);

  return (
    <div ref={stageRef} className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
      <div
        ref={rootRef}
        className={cn("origin-top-left transition-opacity duration-300", mode === "zoom" && "kanban-zoom", faded && "opacity-0")}
        style={
          mode === "scale" ? { width, height, transform: `scale(${scale})` }
            : { width, height: stageH / scale, zoom: scale, ["--kz" as string]: scale }
        }
      >
        {shown ? <Fragment key={epoch}>{children}</Fragment> : null}
      </div>
      <div ref={cursorRef} className="absolute left-0 top-0 z-30 opacity-0 transition-opacity duration-300 [&[data-down]_svg]:scale-[0.86]" style={{ willChange: "transform" }}>
        <span ref={rippleRef} className="absolute -left-3 -top-3 h-6 w-6 rounded-full bg-ink/40 opacity-0" />
        <svg width="20" height="22" viewBox="0 0 20 22" className="relative origin-top-left transition-transform duration-100 drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
          <path d="M2 1.5 2 16.2 5.6 12.9 8.2 18.8 10.9 17.6 8.3 11.8 13.4 11.6Z" fill="#fff" stroke="#0b0b0b" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/** Kanban: one card travels the board. To the second column and back; on a narrow stage, where only one column shows,
 *  down the column and back up. */
const playKanban: Play = async (h, root, round) => {
  const cards = [...root.querySelectorAll<HTMLElement>("[data-kanban-card]")];
  const bodies: HTMLElement[] = [], cols: HTMLElement[][] = [];
  for (const c of cards) {
    const b = c.parentElement as HTMLElement;
    let i = bodies.indexOf(b);
    if (i < 0) { bodies.push(b); cols.push([]); i = bodies.length - 1; }
    cols[i].push(c);
  }
  if (!cols[0]?.length) return;
  const back = round % 2 === 1;
  const twoColumns = bodies[1] && h.at(bodies[1], 0, 0).x < h.stage.clientWidth - 90;
  let card: HTMLElement, drop: Pt;
  if (twoColumns) {
    const [from, to] = back ? [1, 0] : [0, 1];
    card = cols[from][0];
    drop = cols[to][0] ? { x: h.at(cols[to][0]).x, y: h.at(cols[to][0], 0.5, 0).y + 8 } : { x: h.at(bodies[to]).x, y: h.at(bodies[to], 0.5, 0).y + 40 };
  } else if (back) {
    card = cols[0][Math.min(2, cols[0].length - 1)];
    drop = { x: h.at(cols[0][0]).x, y: h.at(cols[0][0], 0.5, 0).y + 8 };
  } else {
    const third = cols[0][Math.min(2, cols[0].length - 1)];
    card = cols[0][0];
    drop = { x: h.at(third).x, y: h.at(third, 0.5, 1).y - 6 };
  }
  await h.move(() => h.at(card, 0.5, 0.2));
  await h.wait(280);
  h.press(card);
  await h.wait(140);
  await h.move(() => drop, 1250);
  await h.wait(240);
  h.release();
  await h.wait(1100);
  await h.move(() => ({ x: h.stage.clientWidth * (0.62 + 0.1 * (round % 2)), y: h.stage.clientHeight * 0.78 }), 800);
  await h.wait(1400);
};

const AI_PROMPT = "Which deals need attention this week?";

/** AI chat: type a question, send it, and let the block play its reply (reasoning streams in, a tool runs, the answer is
 *  written, follow-ups appear). Then a breath, and start over from the empty thread. */
const playAiChat: Play = async (h, root) => {
  const box = root.querySelector<HTMLTextAreaElement>("textarea");
  if (!box) return;
  await h.move(() => h.at(box, 0.3, 0.5));
  await h.wait(260);
  h.click(box);
  const setValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")!.set!;
  for (let i = 1; i <= AI_PROMPT.length; i++) {
    setValue.call(box, AI_PROMPT.slice(0, i));
    box.dispatchEvent(new Event("input", { bubbles: true }));
    await h.wait(34 + ((i * 29) % 40));
  }
  await h.wait(420);
  const send = root.querySelector<HTMLButtonElement>('button[aria-label="Send message"]');
  if (!send) return;
  await h.move(() => h.at(send));
  await h.wait(180);
  h.click(send);
  await h.move(() => ({ x: h.stage.clientWidth * 0.78, y: h.stage.clientHeight * 0.6 }), 900);
  // the block streams the whole reply on its own; the button turns back into Send when it is done
  for (let i = 0; i < 80; i++) {
    await h.wait(500);
    if (!root.querySelector('button[aria-label="Stop generating"]')) break;
  }
  await h.wait(3200);
  return "reset";
};

/* ------------------------------------------------------------------ */
/* Everyday demos                                                      */
/* ------------------------------------------------------------------ */

function TabsDemo({ inView }: { inView: boolean }) {
  const items = [{ value: "overview", label: "Overview" }, { value: "activity", label: "Activity" }, { value: "settings", label: "Settings" }];
  const [i, take] = useLoop(items.length, 1500, inView);
  return <div className="w-full max-w-[340px]"><Tabs items={items} value={items[i].value} onChange={(v) => take(items.findIndex((x) => x.value === v))} /></div>;
}

function SwitchDemo({ inView }: { inView: boolean }) {
  const [i, take] = useLoop(4, 1000, inView);
  const states = [i % 2 === 1, i >= 2 ? i % 2 === 0 : false, i === 1 || i === 2];
  return (
    <div className="flex w-full max-w-[280px] flex-col gap-4">
      <Switch label="Weekly digest" checked={states[0]} onChange={() => take(i + 1)} />
      <Switch label="Product updates" checked={states[1]} onChange={() => take(i + 1)} />
      <Switch label="Mentions" checked={states[2]} onChange={() => take(i + 1)} />
    </div>
  );
}

function SliderDemo({ inView }: { inView: boolean }) {
  const [v, setV] = useState(30);
  const [paused, setPaused] = useState(0);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const frame = (now: number) => {
      if (Date.now() > paused) setV(Math.round(50 + 42 * Math.sin((now - t0) / 700)));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, paused]);
  return (
    <div className="w-full max-w-[300px]">
      <Slider label="Payment limit" showValue min={0} max={100} value={v} onChange={(e) => { setPaused(Date.now() + 6000); setV(Number(e.target.value)); }} />
    </div>
  );
}

function SegmentedDemo({ inView }: { inView: boolean }) {
  const options = [{ value: "day", label: "Day" }, { value: "week", label: "Week" }, { value: "month", label: "Month" }, { value: "year", label: "Year" }];
  const [i, take] = useLoop(options.length, 1200, inView);
  return <SegmentedControl options={options} value={options[i].value} onChange={(v) => take(options.findIndex((o) => o.value === v))} />;
}

function StepperDemo({ inView }: { inView: boolean }) {
  const [i, take] = useLoop(5, 1150, inView);
  const steps = [{ label: "Account" }, { label: "Workspace" }, { label: "Invite team" }, { label: "Launch" }];
  return (
    <button type="button" className="w-full max-w-[420px] cursor-pointer text-left" onClick={() => take((i + 1) % 5)} aria-label="Advance the stepper">
      <Stepper steps={steps} current={Math.min(i, steps.length)} orientation="horizontal" />
    </button>
  );
}

const TOASTS = [
  { status: "success", title: "Payment received", description: "$1,240 from Acme Ltd." },
  { status: "info", title: "New comment", description: "Ada mentioned you in Q4 plan." },
  { status: "error", title: "Upload failed", description: "invoice.pdf is over 10 MB." },
  { status: "success", title: "Invoice sent", description: "INV-2481 is on its way." },
] as const;

function ToastDemo({ inView }: { inView: boolean }) {
  const [i, take] = useLoop(TOASTS.length, 1500, inView);
  // the newest sits in front; the two before it peek out behind, smaller and fainter
  const stack = [0, 1, 2].map((age) => ({ age, toast: TOASTS[(i - age + TOASTS.length * 3) % TOASTS.length], key: i - age }));
  return (
    <div className="relative h-[150px] w-full max-w-[340px]" onClick={() => take((i + 1) % TOASTS.length)}>
      {stack.reverse().map(({ age, toast, key }) => (
        <div
          key={key}
          className="absolute inset-x-0 top-0 origin-bottom transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateY(${42 - age * 14}px) scale(${1 - age * 0.06})`, opacity: 1 - age * 0.35, zIndex: 3 - age }}
        >
          <Toast status={toast.status} title={toast.title} description={toast.description} />
        </div>
      ))}
    </div>
  );
}

function CalendarDemo({ inView }: { inView: boolean }) {
  const [i, take] = useLoop(4, 950, inView);
  const [range, setRange] = useState<DateRange>({});
  const month = useMemo(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); }, []);
  const day = (n: number) => new Date(month.getFullYear(), month.getMonth(), n);
  const looped: DateRange[] = [{ from: day(8) }, { from: day(8), to: day(11) }, { from: day(8), to: day(16) }, { from: day(8), to: day(22) }];
  const picked = Object.keys(range).length ? range : looped[i];
  return (
    <div className="origin-center scale-[0.9]">
      <Calendar mode="range" defaultMonth={month} range={picked} onRangeChange={(r) => { setRange(r); take(0); }} />
    </div>
  );
}

function ProgressDemo({ inView }: { inView: boolean }) {
  const [i] = useLoop(5, 750, inView);
  const v = [18, 42, 67, 86, 100][i];
  const rows = [["Uploading assets", v], ["Building tokens", Math.max(8, v - 30)], ["Publishing", Math.min(100, v + 12)]] as const;
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-4">
      {rows.map(([label, value]) => (
        <div key={label}>
          <div className="mb-1.5 flex justify-between text-xs"><span className="font-medium text-ink">{label}</span><span className="tabular-nums text-ink-muted">{value}%</span></div>
          <Progress value={value} size="sm" />
        </div>
      ))}
    </div>
  );
}

const MENU = [
  { label: "Edit", icon: Pencil, shortcut: "⌘E" },
  { label: "Duplicate", icon: Copy, shortcut: "⌘D" },
  { label: "Export", icon: Download },
  { label: "Delete", icon: Trash, destructive: true },
] as const;

/**
 * A dropdown menu whose hover highlight walks down the list, as if someone were arrowing through it.
 * It is the Menu's own flowing highlight (the one that glides between rows on a real hover): the loop
 * sends the same mouseover a pointer would, so the demo and a real hover look identical.
 */
function MenuDemo({ inView, dark }: { inView: boolean; dark: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [i] = useLoop(MENU.length, 900, inView);
  useEffect(() => {
    if (!inView) return;
    const items = root.current?.querySelectorAll<HTMLElement>("[data-hover-item]");
    items?.[i]?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  }, [i, inView, dark]);
  return (
    <div ref={root}>
      {/* keyed by the theme: the gliding highlight reads its colour when it lands on a row, so a menu flipped
          in place would keep the old tone until it moved; a fresh one measures it again */}
      <Menu key={String(dark)} aria-label="Row actions" minWidth={220}>
        {MENU.map((m) => {
          const Icon = m.icon;
          return (
            <MenuItem key={m.label} icon={<Icon size={16} />} state={"destructive" in m ? "destructive" : "default"} shortcut={"shortcut" in m ? m.shortcut : undefined}>
              {m.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

function WallHeading({ title, body, href, cta }: { title: string[]; body: string; href: string; cta: string }) {
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-x-8 gap-y-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[680px]">
        <TextReveal as="h2" lines={title} className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl" />
        <MaskReveal as="p" delay={180} className="mt-3 text-ink-muted">{body}</MaskReveal>
      </div>
      <Link href={href} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:underline">
        {cta} <ArrowRight size={14} />
      </Link>
    </div>
  );
}

export function ComponentWall() {
  return (
    <section id="components" className="py-16 sm:py-24">
      <WallHeading
        title={["Maps, glass, charts and", "full product screens"]}
        body="Live, not screenshots. Real SakaniUI components wired to real data, each one a single import."
        href="/docs/components/map"
        cta="Explore the components"
      />
      <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-x-5 gap-y-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <WallCard title="Globe" kind="Map" href="/docs/components/map#globe" description="A dotted globe where live payments arc home to headquarters." stageClassName="min-h-[420px]">
          {(v, d) => <GlobeDemo inView={v} dark={d} />}
        </WallCard>
        <WallCard title="Liquid glass" kind="Surface" href="/docs/glass" description="Apple-style glass that bends the photo behind it. Pick the lens up and drag it." stageClassName="min-h-[420px]" padded={false} reveal={90}>
          {(v) => <GlassDemo inView={v} />}
        </WallCard>
        <WallCard title="Charts" kind="Chart" href="/docs/components/radial-chart" description="Radial, radar and bar charts, drawn from the same tokens, that re-theme with the page." className="md:col-span-2" stageClassName="min-h-[380px]">
          {(v) => <ChartsDemo inView={v} />}
        </WallCard>
        <WallCard title="Kanban board" kind="Block" href="/docs/blocks/kanban-board" description="A complete board with columns, cards, labels and a drag state." stageClassName="aspect-[1040/640] flex-none max-md:aspect-auto max-md:h-[360px]" padded={false}>
          {(v) => <AutoDemo inView={v} mode="zoom" play={playKanban}><KanbanBoardBlock /></AutoDemo>}
        </WallCard>
        <WallCard title="AI chat" kind="Block" href="/docs/blocks/ai-chat" description="A full AI conversation: the reasoning streams in, a tool runs, the answer is written, with the prompt box and follow-ups." stageClassName="aspect-[1040/640] flex-none" padded={false} reveal={90}>
          {(v) => <AutoDemo inView={v} mode="scale" play={playAiChat}><AiChatBlock className="!h-full !w-full" /></AutoDemo>}
        </WallCard>
        <WallCard title="Chain of Thought" kind="AI" href="/docs/components/chain-of-thought" description="Show an agent's work: steps on a rail with real site logos and emoji, counts, sources and a live Working line." stageClassName="min-h-[420px]">
          {(v) => <ChainDemo inView={v} />}
        </WallCard>
        <WallCard title="Command Menu" kind="Search" href="/docs/components/command-menu" description="A ⌘K search and command palette with scopes, filter tokens, a preview pane and an Ask AI mode. It is the one this site uses. Click in and try it." stageClassName="min-h-[420px]" padded={false} reveal={90}>
          {(v, d) => <CommandMenuDemo inView={v} dark={d} />}
        </WallCard>
      </div>

      <div className="mt-24 sm:mt-32">
        <WallHeading
          title={["The everyday pieces,", "finished"]}
          body="Forms, menus, steppers and feedback with keyboard support and quiet motion. Try them."
          href="/docs"
          cta="Browse all components"
        />
        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-x-5 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          <WallCard title="Tabs" kind="Navigation" href="/docs/components/tabs" description="Switch between related views with a sliding indicator.">{(v) => <TabsDemo inView={v} />}</WallCard>
          <WallCard title="Toast" kind="Feedback" href="/docs/components/toast" description="Short results that stack at the edge and settle in order." reveal={70}>{(v) => <ToastDemo inView={v} />}</WallCard>
          <WallCard title="Calendar" kind="Data entry" href="/docs/components/calendar" description="Pick a date or a range without leaving the page." reveal={140}>{(v) => <CalendarDemo inView={v} />}</WallCard>
          <WallCard title="Switch" kind="Form" href="/docs/components/switch" description="A tactile toggle for settings that apply right away.">{(v) => <SwitchDemo inView={v} />}</WallCard>
          <WallCard title="Slider" kind="Form" href="/docs/components/slider" description="Drag, or use the arrow keys, to set a value." reveal={70}>{(v) => <SliderDemo inView={v} />}</WallCard>
          <WallCard title="Segmented control" kind="Form" href="/docs/components/segmented-control" description="Choose one of a few options, with a thumb that glides." reveal={140}>{(v) => <SegmentedDemo inView={v} />}</WallCard>
          <WallCard title="Stepper" kind="Navigation" href="/docs/components/stepper" description="Show where someone is in a flow, and what is left.">{(v) => <StepperDemo inView={v} />}</WallCard>
          <WallCard title="Progress" kind="Feedback" href="/docs/components/progress" description="Linear progress for uploads, builds and publishing." reveal={70}>{(v) => <ProgressDemo inView={v} />}</WallCard>
          <WallCard title="Menu" kind="Navigation" href="/docs/components/menu" description="A focused list of actions with icons, shortcuts and a destructive state." reveal={140}>{(v, d) => <MenuDemo inView={v} dark={d} />}</WallCard>
        </div>
        <p className="mx-auto mt-12 max-w-7xl px-4 text-center text-sm text-ink-muted sm:px-6 lg:px-8">
          130+ components and 42 blocks, MIT licensed and free, no account needed.
        </p>
      </div>
    </section>
  );
}
