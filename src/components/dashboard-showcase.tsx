"use client";

import { useState } from "react";
import { CRMDashboardBlock, KanbanBoardBlock, DataTableBlock } from "@sakaniui/react/blocks";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "crm", label: "CRM Dashboard", path: "app.yourcompany.com/crm", Block: CRMDashboardBlock },
  { key: "kanban", label: "Kanban Board", path: "app.yourcompany.com/projects", Block: KanbanBoardBlock },
  { key: "table", label: "Data Table", path: "app.yourcompany.com/customers", Block: DataTableBlock },
] as const;

export function DashboardShowcase() {
  const [active, setActive] = useState<(typeof TABS)[number]["key"]>("crm");
  const tab = TABS.find((t) => t.key === active)!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Real dashboards, not mockups
        </h2>
        <p className="mt-3 text-ink-muted">
          These are live, fully interactive Sakani blocks rendering below — the same
          components you&apos;d ship, not screenshots.
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-2">
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

      <div className="mx-auto mt-8 max-w-6xl overflow-hidden rounded-2xl border border-line-subtle bg-surface shadow-xl">
        <div className="flex items-center gap-3 border-b border-line-subtle px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-danger/60" />
            <span className="h-3 w-3 rounded-full bg-warning/60" />
            <span className="h-3 w-3 rounded-full bg-success/60" />
          </div>
          <div className="mx-auto flex w-full max-w-xs items-center justify-center rounded-md bg-canvas px-3 py-1 text-xs text-ink-subtle">
            {tab.path}
          </div>
        </div>
        <div className="pointer-events-none relative h-[520px] overflow-hidden bg-canvas">
          <div className="absolute inset-0 origin-top-left scale-[0.72] sm:scale-[0.85] lg:scale-100">
            <tab.Block />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
        </div>
      </div>
    </section>
  );
}
