"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  AreaChart, Button, Calendar, Card, DonutChart, LiquidBackdrop, LiquidGlass, MapGlobe, Menu, MenuItem, Progress, SegmentedControl,
  Slider, StatCard, Stepper, Switch, Tabs, Toast, syncLiquidBackdrop, type DateRange,
} from "@sakaniui/react";
import { KanbanBoardBlock, ChatInterfaceBlock } from "@sakaniui/react/blocks";
import {
  IconArrowRight as ArrowRight, IconArrowUpRight as ArrowUpRight, IconCurrencyDollar as Dollar, IconPencil as Pencil,
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

type Kind = "Map" | "Surface" | "Chart" | "Block" | "Form" | "Navigation" | "Feedback" | "Data entry" | "Data display";

/**
 * One sample: a stage with the live component on it, then its name, kind and a line about it.
 * The stage stays interactive (so it is not inside the link); the name links to the docs.
 */
function WallCard({
  title, kind, description, href, children, className, stageClassName, reveal = 0, padded = true,
}: {
  title: string;
  kind: Kind;
  description: string;
  href: string;
  children: (inView: boolean) => ReactNode;
  className?: string;
  stageClassName?: string;
  reveal?: number;
  padded?: boolean;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div className={cn("wall-card group flex min-w-0 flex-col", className)} style={{ ["--wall-delay" as string]: `${reveal}ms` }}>
      <div
        ref={ref}
        className={cn(
          "wall-stage relative flex min-h-[240px] flex-1 items-center justify-center overflow-hidden rounded-2xl border border-line-subtle bg-surface",
          "transition-[border-color,box-shadow] duration-300 group-hover:border-line-default group-hover:shadow-lg",
          padded && "p-6",
          stageClassName,
        )}
      >
        {children(inView)}
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

function GlobeDemo({ inView }: { inView: boolean }) {
  const markers = useMemo(() => [
    { position: HQ, active: true, label: "Lagos HQ" },
    ...Object.entries(CITIES).map(([label, position]) => ({ position, label })),
  ], []);
  const arcs = useMemo(() => Object.values(CITIES).map((to) => ({ from: HQ, to })), []);
  return (
    <div className="aspect-square w-full max-w-[420px]">
      {inView ? <MapGlobe markers={markers} arcs={arcs} center={[14, 20]} rotationSpeed={8} aria-label="Offices around the world" /> : null}
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
      <LiquidGlass variant="regular" radius={16} style={{ position: "absolute", left: 20, bottom: 20, width: "min(250px, calc(100% - 40px))" }}>
        <Card title="Revenue" description="Last 30 days" actions={<Button size="sm">View report</Button>} />
      </LiquidGlass>
      <LiquidGlass
        ref={lens}
        variant="clear"
        tint="none"
        radius={LENS / 2}
        bake={false}
        effect={{ refraction: 1, depth: 34, dispersion: 0.6, frost: 0 }}
        aria-label="A glass lens: drag it over the photo"
        className="cursor-grab touch-none active:cursor-grabbing"
        style={{ position: "absolute", left: 0, top: 0, width: LENS, height: LENS }}
        onPointerDown={(e) => {
          const ln = lens.current;
          if (!ln) return;
          const r = ln.getBoundingClientRect();
          // the grab point, relative to the lens centre, so the lens does not jump under the pointer
          grab.current = { dx: e.clientX - (r.left + r.width / 2), dy: e.clientY - (r.top + r.height / 2) };
          ln.setPointerCapture(e.pointerId);
        }}
        onPointerMove={move}
        onPointerUp={() => { grab.current = null; resumeAt.current = Date.now() + 4000; }}
        onPointerCancel={() => { grab.current = null; resumeAt.current = Date.now() + 4000; }}
      />
    </LiquidBackdrop>
  );
}

const REVENUE = [
  [32, 38, 35, 46, 52, 49, 61, 68, 64, 76, 83, 91],
  [48, 44, 52, 50, 58, 66, 62, 70, 79, 74, 88, 97],
  [28, 36, 44, 41, 55, 60, 72, 69, 81, 86, 90, 104],
];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function ChartsDemo({ inView }: { inView: boolean }) {
  const [i] = useLoop(REVENUE.length, 2300, inView);
  const data = MONTHS.map((label, k) => ({ label, value: REVENUE[i][k] }));
  const total = REVENUE[i].reduce((a, b) => a + b, 0);
  return (
    <div className="grid w-full gap-4 sm:grid-cols-[1fr_1.7fr]">
      <div className="flex flex-col gap-4">
        <StatCard
          title="Revenue" value={`$${(total * 1.84 / 100).toFixed(2)}M`} delta={`+${(6 + i * 3.4).toFixed(1)}%`} trend="up"
          badgeVariant="success" variant="icon" icon={Dollar} sparkline={REVENUE[i]}
        />
        <div className="rounded-xl border border-line-subtle p-3">
          <DonutChart
            size="sm" height={120} centerValue={`${62 + i * 7}%`} centerCaption="Repeat"
            data={[{ label: "Repeat", value: 62 + i * 7 }, { label: "New", value: 38 - i * 7 }]}
          />
        </div>
      </div>
      <div className="min-w-0 rounded-xl border border-line-subtle p-3">
        <AreaChart data={data} height={250} />
      </div>
    </div>
  );
}

/** A real block, scaled down to sit in a card: a visual sample, not a control (the docs page has the live one). */
function ScaledBlock({ width, height, scale, children }: { width: number; height: number; scale: number; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(scale);
  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const fit = () => setS(el.clientWidth / width);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={outer} className="wall-fade absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none origin-top-left" style={{ width, height, transform: `scale(${s})` }}>{children}</div>
    </div>
  );
}

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
function MenuDemo({ inView }: { inView: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [i] = useLoop(MENU.length, 900, inView);
  useEffect(() => {
    if (!inView) return;
    const items = root.current?.querySelectorAll<HTMLElement>("[data-hover-item]");
    items?.[i]?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
  }, [i, inView]);
  return (
    <div ref={root}>
      <Menu aria-label="Row actions" minWidth={220}>
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
          {(v) => <GlobeDemo inView={v} />}
        </WallCard>
        <WallCard title="Liquid glass" kind="Surface" href="/docs/glass" description="Apple-style glass that bends the photo behind it. Pick the lens up and drag it." stageClassName="min-h-[420px]" padded={false} reveal={90}>
          {(v) => <GlassDemo inView={v} />}
        </WallCard>
        <WallCard title="Revenue charts" kind="Chart" href="/docs/components/area-chart" description="Stat cards, sparklines, area and donut charts that tween as the data changes." className="md:col-span-2" stageClassName="min-h-[380px]">
          {(v) => <ChartsDemo inView={v} />}
        </WallCard>
        <WallCard title="Kanban board" kind="Block" href="/docs/blocks/kanban-board" description="A complete board with columns, cards, labels and a drag state." stageClassName="min-h-[360px]" padded={false}>
          {() => <ScaledBlock width={1040} height={640} scale={0.5}><KanbanBoardBlock /></ScaledBlock>}
        </WallCard>
        <WallCard title="AI chat" kind="Block" href="/docs/blocks/panels" description="A full chat screen with a conversation list, messages and a composer." stageClassName="min-h-[360px]" padded={false} reveal={90}>
          {() => <ScaledBlock width={1040} height={640} scale={0.5}><ChatInterfaceBlock /></ScaledBlock>}
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
          <WallCard title="Menu" kind="Navigation" href="/docs/components/menu" description="A focused list of actions with icons, shortcuts and a destructive state." reveal={140}>{(v) => <MenuDemo inView={v} />}</WallCard>
        </div>
        <p className="mx-auto mt-12 max-w-7xl px-4 text-center text-sm text-ink-muted sm:px-6 lg:px-8">
          130+ components and 42 blocks, MIT licensed and free, no account needed.
        </p>
      </div>
    </section>
  );
}
