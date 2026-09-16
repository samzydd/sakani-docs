"use client";

import { LineChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, ChartVariants } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  { label: "Jan", revenue: 4200, cost: 2400, item: "Item 1" },
  { label: "Feb", revenue: 3800, cost: 2210, item: "Item 2" },
  { label: "Mar", revenue: 5100, cost: 2800, item: "Item 3" },
  { label: "Apr", revenue: 4700, cost: 2600, item: "Item 4" },
  { label: "May", revenue: 5900, cost: 3100, item: "Item 5" },
  { label: "Jun", revenue: 6200, cost: 3300, item: "Item 6" },
];

const BASIC = `const data = [
  { label: 'Jan', revenue: 4200 },
  { label: 'Feb', revenue: 3800 },
  { label: 'Mar', revenue: 5100 },
];

<LineChart data={data} series={['revenue']} />`;

const VARIANTS = `<LineChart data={data} series={['revenue']} variant="default" />
<LineChart data={data} series={['revenue']} variant="linear" />
<LineChart data={data} series={['revenue']} variant="step" />`;

const DOTS = `<LineChart data={data} series={['revenue']} variant="dots" />
<LineChart data={data} series={['revenue']} variant="custom-dots" />
<LineChart data={data} series={['revenue']} variant="dots-colors" />`;

const LABELS = `<LineChart data={data} series={['revenue']} variant="label" />

// custom-label reads its text from labelKey instead of the plotted value.
<LineChart
  data={data}
  series={['revenue']}
  variant="custom-label"
  labelKey="item"
/>`;

const MULTI = `// Two entries in 'series' plots two lines.
<LineChart
  data={data}
  series={['revenue', 'cost']}
  variant="multiple"
  showLegend
/>`;

const PROPS = [
  { name: "data", type: "Record<string, string | number>[]", description: "Rows keyed by label plus one field per series." },
  { name: "series", type: "string[]", description: "Which fields in data to plot as lines." },
  { name: "xKey", type: "string", default: "'label'", description: "Field used for the x-axis." },
  { name: "variant", type: "'default' | 'linear' | 'step' | 'multiple' | 'dots' | 'custom-dots' | 'dots-colors' | 'label' | 'custom-label'", default: "'default'", description: "Line style. Every variant is a Recharts type/dot/label combination, not hand-rolled SVG." },
  { name: "labelKey", type: "string", description: "Field read for the text shown per point when variant is 'custom-label'." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset height: 180, 240, 320, 420." },
  { name: "height", type: "number", description: "Pixel height override, takes precedence over size." },
  { name: "showLegend", type: "boolean", default: "false", description: "Shows a legend below the chart." },
];

export default function LineChartPage() {
  return (
    <article>
      <PageHeader title="Line Chart" description="One of 9 Recharts wrappers, styled entirely with Sakani's chart tokens." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="line">
            <LineChart data={DATA} series={["revenue"]} />
          </ChartFrame>
        </ComponentPreview>

        <div className="doc-prose">
          <p>
            A single series is drawn in <code>chart/2</code>, not{" "}
            <code>chart/1</code>. That looks like an off-by-one but it&apos;s
            deliberate: Figma&apos;s own default line is chart/2, and the second
            line added by <code>multiple</code> is chart/1, so the two-series
            case matches the design file. Three or more series continue in plain
            chart/3 order.
          </p>
        </div>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Curve styles</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>step</code> is the honest choice for values that hold and jump
            (a plan tier, a headcount) where a smooth curve would imply readings
            that never happened. <code>linear</code> joins the real points
            without smoothing between them.
          </p>
          <ComponentPreview code={VARIANTS}>
            <ChartVariants
              kind="line"
              items={[
                { label: "default", note: "smooth monotone curve", chart: <LineChart data={DATA} series={["revenue"]} size="sm" /> },
                { label: "linear", note: "straight segments", chart: <LineChart data={DATA} series={["revenue"]} variant="linear" size="sm" /> },
                { label: "step", note: "staircase", chart: <LineChart data={DATA} series={["revenue"]} variant="step" size="sm" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Point markers</h2>
          <p className="mb-3 text-sm text-ink-muted">
            All three keep dots visible at rest rather than only on hover. Use
            them when the individual readings matter as much as the trend, which
            is usually the case with six points and rarely the case with sixty.
          </p>
          <ComponentPreview code={DOTS}>
            <ChartVariants
              kind="line"
              items={[
                { label: "dots", note: "filled markers in the series color", chart: <LineChart data={DATA} series={["revenue"]} variant="dots" size="sm" /> },
                { label: "custom-dots", note: "ringed / halo markers", chart: <LineChart data={DATA} series={["revenue"]} variant="custom-dots" size="sm" /> },
                { label: "dots-colors", note: "each dot cycles the full palette", chart: <LineChart data={DATA} series={["revenue"]} variant="dots-colors" size="sm" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Value labels</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>label</code> prints the plotted number above each point.{" "}
            <code>custom-label</code> prints whatever field{" "}
            <code>labelKey</code> names instead, for when the useful caption
            isn&apos;t the value itself.
          </p>
          <ComponentPreview code={LABELS}>
            <ChartVariants
              kind="line"
              items={[
                { label: "label", note: "the plotted value", chart: <LineChart data={DATA} series={["revenue"]} variant="label" size="sm" /> },
                { label: "custom-label", note: 'labelKey="item"', chart: <LineChart data={DATA} series={["revenue"]} variant="custom-label" labelKey="item" size="sm" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Multiple series</h2>
          <ComponentPreview code={MULTI}>
            <ChartFrame kind="line">
              <LineChart data={DATA} series={["revenue", "cost"]} variant="multiple" showLegend />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/line-chart" />
    </article>
  );
}
