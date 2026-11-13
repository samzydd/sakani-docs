"use client";

import { AreaChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, CHART_WIDTH } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  { label: "Jan", value: 4200, value2: 2400 },
  { label: "Feb", value: 5100, value2: 2900 },
  { label: "Mar", value: 4700, value2: 3100 },
  { label: "Apr", value: 6300, value2: 3600 },
  { label: "May", value: 7100, value2: 3900 },
  { label: "Jun", value: 8400, value2: 4300 },
];

const BASIC = `const data = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 5100 },
  { label: "Mar", value: 4700 },
];

<AreaChart data={data} height={240} appearance="rich" />`;

const STACKED = `// value2 is the second series; "stacked" puts it on top of value.
<AreaChart
  data={data}
  variant="stacked"
  seriesLabels={["Revenue", "Costs"]}
  height={240}
/>`;

const VARIANTS = `<AreaChart data={data} variant="default" />
<AreaChart data={data} variant="linear" />
<AreaChart data={data} variant="step" />`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number; value2?: number }[]", description: "One entry per point along the x-axis. value2 adds a second series." },
  { name: "variant", type: "'default' | 'stacked' | 'step' | 'linear'", default: "'default'", description: "Curve style. Stacked lays value2 on top of value rather than overlapping them." },
  { name: "seriesLabels", type: "[string, string?]", description: "Names for value and value2, used in the tooltip and legend." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset height." },
  { name: "height", type: "number", description: "Pixel height override; takes precedence over size." },
  { name: "loading", type: "boolean", default: "false", description: "Draws the chart's own silhouette instead of the chart, breathing quietly, at the chart's height so nothing below it moves when the data arrives. Announced as a busy status." },
  { name: "appearance", type: "'default' | 'rich'", default: "'default'", description: "default is the Figma look. rich adds an entrance when the chart appears (played once, never on hover), a soft lift and glow on hover, and a frosted tooltip. Off for reduced motion." },
];

export default function AreaChartPage() {
  return (
    <article>
      <PageHeader title="Area Chart" description="A filled line chart, for volume over time where the magnitude matters as much as the trend." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="area">
            <AreaChart data={DATA} height={240} appearance="rich" />
          </ChartFrame>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Area or line?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The fill implies the area under the curve means something — a total
            accumulating. For comparing the shape of several series against each
            other, an unfilled{" "}
            <a href="/docs/components/line-chart" className="font-medium text-ink underline underline-offset-2">Line Chart</a>{" "}
            stays readable where overlapping fills turn to mud.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Two series, stacked</h2>
          <ComponentPreview code={STACKED}>
            <ChartFrame kind="area">
              <AreaChart data={DATA} variant="stacked" seriesLabels={["Revenue", "Costs"]} height={240} />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Curve styles</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>step</code> is the honest choice for values that hold and jump
            — a plan tier, a headcount — where a smooth curve would imply
            readings that never happened.
          </p>
          <ComponentPreview code={VARIANTS}>
            <div className="flex w-full flex-col gap-6" style={{ maxWidth: CHART_WIDTH.area }}>
              <AreaChart data={DATA} variant="default" height={160} />
              <AreaChart data={DATA} variant="linear" height={160} />
              <AreaChart data={DATA} variant="step" height={160} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading and the rich look</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pass <code>loading</code> while the data is on its way: the chart draws its own silhouette, breathing
            quietly, at the same height, so nothing below it moves when the data arrives. Pass{" "}
            <code>{'appearance="rich"'}</code> for the livelier look: an entrance when the chart appears (once, never on
            hover), a soft lift and glow on hover, and a frosted tooltip. The default stays the Figma look, and
            reduced motion turns the motion off.
            The first preview at the top of this page uses it; leave it off for the Figma look.
          </p>
          <ComponentPreview code={`<AreaChart data={data} height={240} appearance="rich" />`}>
            <ChartFrame kind="area">
              <AreaChart data={DATA} height={240} appearance="rich" />
            </ChartFrame>
          </ComponentPreview>
          <div className="mt-4" />
          <ComponentPreview code={`<AreaChart data={data} height={240} loading />`}>
            <ChartFrame kind="area">
              <AreaChart data={DATA} height={240} loading />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/area-chart" />
    </article>
  );
}
