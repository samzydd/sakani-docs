import type { ReactNode } from "react";

/**
 * The width each chart family is demoed at in its own story file. Charts are
 * width-sensitive in ways that change how they read: a cartesian chart's
 * curve takes a different aspect ratio, and Recharts starts dropping x-axis
 * ticks once they stop fitting, while a radial chart just scales its circle
 * and gains nothing from the extra room. The docs previously forced every
 * chart into the same max-w-lg/max-w-md box (512px or 448px), which made the
 * circular ones (demoed at 320-360px) read noticeably differently here than
 * in Storybook.
 *
 * Keep these in sync with the `width:` decorator in each *.stories.tsx.
 */
export const CHART_WIDTH = {
  line: 560,
  bar: 560,
  funnel: 560,
  heatmap: 560,
  area: 480,
  radar: 420,
  pie: 360,
  donut: 360,
  radial: 320,
} as const;

export type ChartKind = keyof typeof CHART_WIDTH;

export function ChartFrame({ kind, children }: { kind: ChartKind; children: ReactNode }) {
  return (
    <div className="w-full" style={{ maxWidth: CHART_WIDTH[kind] }}>
      {children}
    </div>
  );
}

/**
 * A labelled stack of variants, each captioned with the prop value that
 * produced it. Variants stack rather than sitting side by side: two charts
 * at their real demo width would overflow the preview column, and shrinking
 * them to fit would defeat the point of matching the library's widths.
 */
export function ChartVariants({
  kind,
  items,
}: {
  kind: ChartKind;
  items: { label: string; note?: string; chart: ReactNode }[];
}) {
  return (
    <div className="flex w-full flex-col gap-8" style={{ maxWidth: CHART_WIDTH[kind] }}>
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
            <code className="rounded bg-subtle px-1.5 py-0.5 text-xs font-medium text-ink">
              {item.label}
            </code>
            {item.note && <span className="text-xs text-ink-muted">{item.note}</span>}
          </div>
          {item.chart}
        </div>
      ))}
    </div>
  );
}
