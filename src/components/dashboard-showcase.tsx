"use client";

import { useEffect, useRef, useState } from "react";
import { MousePointerClick, Sun, Moon } from "lucide-react";
import { CRMDashboardBlock, KanbanBoardBlock, DataTableBlock } from "@sakaniui/react/blocks";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/use-scroll-reveal";

type Tab =
  | { key: string; label: string; path: string; kind: "block"; Block: React.FC<{ fillPlaceholders?: boolean }> }
  | { key: string; label: string; path: string; kind: "iframe"; url: string };

const TABS: Tab[] = [
  {
    key: "crm-demo-1",
    label: "CRM demo 1",
    path: "saas-crm-sakani-ds.vercel.app",
    kind: "iframe",
    url: "https://saas-crm-sakani-ds.vercel.app/",
  },
  { key: "crm-demo-2", label: "CRM demo 2", path: "app.yourcompany.com/crm", kind: "block", Block: CRMDashboardBlock },
  { key: "kanban", label: "Kanban Board", path: "app.yourcompany.com/projects", kind: "block", Block: KanbanBoardBlock },
  { key: "table", label: "Data Table", path: "app.yourcompany.com/customers", kind: "block", Block: DataTableBlock },
];

// Matches the message contract useEmbeddedThemeControl listens for in the
// CRM demo 1 app's own source (samzydd/saas-crm-sakani-ds) -- cross-origin
// means postMessage is the only channel available to flip its theme from
// out here, there's no reaching into that document's classList directly.
const IFRAME_THEME_MESSAGE = "sakani-crm:set-theme";

export function DashboardShowcase() {
  const [active, setActive] = useState(TABS[0].key);
  const [dashboardTheme, setDashboardTheme] = useState<"light" | "dark">("light");
  const tab = TABS.find((t) => t.key === active)!;
  const { ref, style } = useScrollReveal<HTMLDivElement>();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (tab.kind !== "iframe") return;
    const send = () => {
      iframeRef.current?.contentWindow?.postMessage({ type: IFRAME_THEME_MESSAGE, theme: dashboardTheme }, "*");
    };
    // The iframe announces "<type>:ready" with its current theme on mount
    // (see useEmbeddedThemeControl) -- listen for it so a tab switch or a
    // slow load doesn't race sending the theme before it's listening.
    const onMessage = (event: MessageEvent) => {
      if (event.data?.type === `${IFRAME_THEME_MESSAGE}:ready`) send();
    };
    window.addEventListener("message", onMessage);
    send();
    return () => window.removeEventListener("message", onMessage);
  }, [tab, dashboardTheme]);

  return (
    <section id="showcase" className="py-20">
      {/* Matches the hero's own container exactly (mx-auto max-w-5xl px-4
          sm:px-6 lg:px-8) so this heading's left edge lines up with the
          hero headline's, rather than the wider max-w-7xl the tabs row
          and demo frame use. */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Real dashboards, not mockups
        </h2>
        <p className="mt-3 text-ink-muted">
          Real Sakani blocks and a real production app, not screenshots: hover the
          sidebar, switch tabs, scroll the table. It all works.
        </p>

        {/* Same max-w-5xl column as the title above, not the wider
            max-w-7xl the demo frame uses, so the tabs start at the
            title's own left edge instead of a wider column's. */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                  active === t.key
                    ? "border-ink bg-ink text-ink-on-inverse"
                    : "border-line-subtle text-ink-muted hover:border-line-default hover:text-ink"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-accent-subtle px-3 py-1.5 text-xs font-medium text-ink">
            <MousePointerClick size={13} /> Fully interactive, try it
          </span>
        </div>
      </div>

      {/* Wider than the max-w-7xl column above it (title/tabs stay aligned
          with the rest of the page) so the dashboard itself gets more room
          to actually show its own design instead of being squeezed to
          match a text column's width. */}
      <div className="mx-auto mt-8 max-w-[1760px] px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          style={style}
          className={cn(
            "mx-auto w-full overflow-hidden rounded-2xl border border-line-subtle shadow-xl",
            dashboardTheme === "dark" ? "dark" : "force-light"
          )}
        >
          {/* Chrome bar reads --color-bg-surface/--color-border-subtle from
              whichever scope this dashboard's OWN toggle picked (above),
              not the site's ambient theme -- so it stays white when the
              dashboard itself is light and dark when it's dark, regardless
              of what the rest of the page is doing. */}
          <div className="flex items-center gap-3 border-b border-line-subtle bg-surface px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-danger/60" />
              <span className="h-3 w-3 rounded-full bg-warning/60" />
              <span className="h-3 w-3 rounded-full bg-success/60" />
            </div>
            <div className="mx-auto flex w-full max-w-xs items-center justify-center rounded-md bg-canvas px-3 py-1 text-xs text-ink-subtle">
              {tab.path}
            </div>
            <button
              type="button"
              onClick={() => setDashboardTheme((v) => (v === "dark" ? "light" : "dark"))}
              aria-label={dashboardTheme === "dark" ? "Switch this dashboard to light mode" : "Switch this dashboard to dark mode"}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-subtle transition-colors hover:bg-subtle hover:text-ink"
            >
              {dashboardTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
          {/* Real width, real scroll, real hover states -- no scale trick and
              no pointer-events-none.

              CRMDashboardBlock's own root hardcodes `width: 100vw;
              height: 100vh` (confirmed directly from its compiled CSS Module
              rule) -- built to sit straight in <body>, not to be embedded in
              a sized container, so it always renders at the full *browser*
              viewport size regardless of how wide this frame is. The
              .dashboard-embed override in globals.css forces its direct
              child to 100%/100% instead. Kanban/DataTable don't have this
              problem (each already reports its own width as exactly this
              frame's width), so the override is a no-op for them. */}
          <div className="dashboard-embed h-[840px] overflow-auto bg-canvas">
            {tab.kind === "iframe" ? (
              <iframe
                ref={iframeRef}
                key={tab.key}
                src={tab.url}
                title={tab.label}
                className="h-full w-full border-0"
                loading="lazy"
              />
            ) : (
              <tab.Block fillPlaceholders />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
