"use client";

import { HeatmapChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  [12, 18, 24, 31, 28, 9, 4],
  [14, 22, 30, 38, 33, 11, 6],
  [9, 16, 21, 26, 24, 7, 3],
  [18, 27, 35, 44, 39, 14, 8],
];

const ROWS = ["Week 1", "Week 2", "Week 3", "Week 4"];
const COLS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const BASIC = `const data = [
  [12, 18, 24, 31, 28, 9, 4],
  [14, 22, 30, 38, 33, 11, 6],
  [9, 16, 21, 26, 24, 7, 3],
  [18, 27, 35, 44, 39, 14, 8],
];

<HeatmapChart
  data={data}
  rowLabels={["Week 1", "Week 2", "Week 3", "Week 4"]}
  colLabels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
  valueLabel="sessions"
/>`;

const PROPS = [
  { name: "data", type: "number[][]", description: "Rows of values. Every row should be the same length as colLabels." },
  { name: "rowLabels", type: "string[]", description: "Labels down the left, one per row." },
  { name: "colLabels", type: "string[]", description: "Labels across the top, one per column." },
  { name: "valueLabel", type: "string", description: "What a cell's number counts, used in the tooltip." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset cell size." },
  { name: "loading", type: "boolean", default: "false", description: "Draws the chart's own silhouette instead of the chart, breathing quietly, at the chart's height so nothing below it moves when the data arrives. Announced as a busy status." },
  { name: "appearance", type: "'default' | 'rich'", default: "'default'", description: "default is the Figma look. rich adds an entrance when the chart appears (played once, never on hover), a soft lift and glow on hover, and a frosted tooltip. Off for reduced motion." },
];

export default function HeatmapChartPage() {
  return (
    <article>
      <PageHeader title="Heatmap Chart" description="A grid where colour carries the value, for spotting patterns across two dimensions at once." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="heatmap">
            <HeatmapChart data={DATA} rowLabels={ROWS} colLabels={COLS} valueLabel="sessions" />
          </ChartFrame>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Reading it</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A heatmap is for finding where something concentrates — the quiet
            weekend column above, the busy Thursday. It&apos;s deliberately bad
            at exact values: nobody reads a precise number off a shade. If the
            specific figures matter more than the pattern, use a{" "}
            <a href="/docs/components/table" className="font-medium text-ink underline underline-offset-2">Table</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Shape of the data</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>data</code> is row-major: <code>data[row][col]</code>. Rows
            shorter than <code>colLabels</code> leave gaps, so pad sparse data
            with zeroes rather than leaving entries out.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading and the rich look</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pass <code>loading</code> while the data is on its way: the chart draws its own silhouette, breathing
            quietly, at the same height, so nothing below it moves when the data arrives. Pass{" "}
            <code>{'appearance="rich"'}</code> for the livelier look: an entrance when the chart appears (once, never on
            hover), a soft lift and glow on hover, and a frosted tooltip. The default stays the Figma look, and
            reduced motion turns the motion off.
          </p>
          <ComponentPreview code={`<HeatmapChart data={data} rowLabels={rows} colLabels={cols} valueLabel="sessions" appearance="rich" />`}>
            <ChartFrame kind="heatmap">
              <HeatmapChart data={DATA} rowLabels={ROWS} colLabels={COLS} valueLabel="sessions" appearance="rich" />
            </ChartFrame>
          </ComponentPreview>
          <div className="mt-4" />
          <ComponentPreview code={`<HeatmapChart data={data} rowLabels={rows} colLabels={cols} valueLabel="sessions" loading />`}>
            <ChartFrame kind="heatmap">
              <HeatmapChart data={DATA} rowLabels={ROWS} colLabels={COLS} valueLabel="sessions" loading />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/heatmap-chart" />
    </article>
  );
}
