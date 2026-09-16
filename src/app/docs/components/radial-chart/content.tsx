"use client";

import { RadialChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, ChartVariants } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

/* Each variant gets the data its own story uses, so these read as the same
   components you see in Storybook. The sets deliberately differ per variant:
   the gauge arcs are designed around 2-3 rows rather than the 5-row
   concentric set, and `shape` needs an explicit `max` or there's no
   remainder left to draw as track. */
const RING_ROWS = [
  { label: "Direct", value: 80 },
  { label: "Referral", value: 65 },
  { label: "Social", value: 50 },
  { label: "Email", value: 35 },
  { label: "Other", value: 20 },
];

const ONE_RING = [{ label: "Users", value: 800, max: 1000 }];
const TICK_ROW = [{ label: "Users", value: 780, max: 1000 }];

const ARC_WITH_TRACK = [
  { label: "Direct", value: 40, max: 200 },
  { label: "Referral", value: 50, max: 200 },
];

const ARC_TWO = [
  { label: "Costs", value: 65 },
  { label: "Revenue", value: 40 },
];

const ARC_THREE = [
  { label: "Costs", value: 65 },
  { label: "Revenue", value: 45 },
  { label: "Profit", value: 25 },
];

const BASIC_CODE = `const data = [{ label: 'Users', value: 800, max: 1000 }];

<RadialChart
  data={data}
  variant="text"
  centerValue="800"
  centerCaption="Users"
/>`;

const RINGS_CODE = `// One concentric ring per row, five rows.
<RadialChart data={rows} variant="multi" />
<RadialChart data={rows} variant="grid" />
<RadialChart
  data={rows}
  variant="stacked-label"
  centerValue="3,130"
  centerCaption="Users"
/>`;

const GAUGES_CODE = `// A 240° arc. Rows stack angularly in one band, not as rings,
// so these take two or three rows rather than five.

// 'max' leaves 110 of 200 unfilled, drawn as track.
<RadialChart
  data={[
    { label: 'Direct', value: 40, max: 200 },
    { label: 'Referral', value: 50, max: 200 },
  ]}
  variant="shape"
  centerValue="2,230"
  centerCaption="Users"
/>

// No 'max', so the rows fill the arc exactly and no track shows.
<RadialChart
  data={[{ label: 'Costs', value: 65 }, { label: 'Revenue', value: 40 }]}
  variant="stacked"
  centerValue="3,130"
  centerCaption="Users"
/>`;

const TICK_CODE = `<RadialChart
  data={[{ label: 'Users', value: 780, max: 1000 }]}
  variant="gauge-tick"
  centerValue="3,130"
  centerCaption="Users"
/>`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number; max?: number }[]", description: "One ring per entry. max sets what a full ring means; without it the values are read against each other." },
  { name: "variant", type: "'multi' | 'grid' | 'text' | 'shape' | 'gauge-tick' | 'stacked' | 'stacked-3-layers' | 'stacked-label'", default: "'multi'", description: "Ring layout, including the gauge treatments." },
  { name: "centerValue", type: "string", description: "Large figure in the middle." },
  { name: "centerCaption", type: "string", description: "Caption under the center value." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset diameter." },
];

export default function RadialChartPage() {
  return (
    <article>
      <PageHeader title="Radial Chart" description="Progress toward a limit, drawn as rings. Good for quotas, capacity, and gauges." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC_CODE}>
          <ChartFrame kind="radial">
            <RadialChart data={ONE_RING} variant="text" centerValue="800" centerCaption="Users" />
          </ChartFrame>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Set max for a quota</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>max</code> is what makes a ring mean &quot;800 out of
            1,000&quot; rather than just &quot;800, bigger than the other
            one&quot;. Leave it off only when the rings are meant to be compared
            against each other rather than against a ceiling. On the gauge
            arcs it does something you can see directly: whatever is left over
            is drawn as track.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Concentric rings</h2>
          <p className="mb-3 text-sm text-ink-muted">
            These three are thin <code>RadialBarChart</code> wrappers: one full
            ring per row, stacked inward. <code>grid</code> adds a faint polar
            grid behind them, and <code>stacked-label</code> overlays a center
            value on the same layout.
          </p>
          <ComponentPreview code={RINGS_CODE}>
            <ChartVariants
              kind="radial"
              items={[
                { label: "multi", note: "one ring per row", chart: <RadialChart data={RING_ROWS} variant="multi" /> },
                { label: "grid", note: "+ polar grid behind", chart: <RadialChart data={RING_ROWS} variant="grid" /> },
                { label: "stacked-label", note: "+ center overlay", chart: <RadialChart data={RING_ROWS} variant="stacked-label" centerValue="3,130" centerCaption="Users" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Gauge arcs</h2>
          <p className="mb-3 text-sm text-ink-muted">
            These stack the rows <em>angularly</em> along a single 240° band
            rather than as concentric rings, so they take two or three rows,
            not five. <code>shape</code> keeps the unfilled remainder as track;{" "}
            <code>stacked</code> has no <code>max</code>, so its rows fill the
            arc exactly and no track shows.
          </p>
          <ComponentPreview code={GAUGES_CODE}>
            <ChartVariants
              kind="radial"
              items={[
                { label: "shape", note: "two rows of 200, remainder as track", chart: <RadialChart data={ARC_WITH_TRACK} variant="shape" centerValue="2,230" centerCaption="Users" /> },
                { label: "stacked", note: "no max, rows fill the arc", chart: <RadialChart data={ARC_TWO} variant="stacked" centerValue="3,130" centerCaption="Users" /> },
                { label: "stacked-3-layers", note: "sized for a 3-row breakdown", chart: <RadialChart data={ARC_THREE} variant="stacked-3-layers" centerValue="3,130" centerCaption="Users" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Tick gauge</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A dial built from individual radial tick marks.{" "}
            <code>RadialBarChart</code> can&apos;t express this (or the arcs
            above), so it&apos;s hand-rolled from the exported{" "}
            <code>Sector</code> primitive.
          </p>
          <ComponentPreview code={TICK_CODE}>
            <ChartFrame kind="radial">
              <RadialChart data={TICK_ROW} variant="gauge-tick" centerValue="3,130" centerCaption="Users" />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/radial-chart" />
    </article>
  );
}
