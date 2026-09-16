"use client";

import { RadialChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, ChartVariants } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const SINGLE = [{ label: "Storage used", value: 68, max: 100 }];

const MULTI = [
  { label: "Direct", value: 80 },
  { label: "Referral", value: 65 },
  { label: "Social", value: 50 },
  { label: "Email", value: 35 },
  { label: "Other", value: 20 },
];

const THREE = [
  { label: "Compute", value: 72, max: 100 },
  { label: "Storage", value: 45, max: 100 },
  { label: "Bandwidth", value: 88, max: 100 },
];

const BASIC = `const data = [{ label: 'Storage used', value: 68, max: 100 }];

<RadialChart data={data} variant="text" centerValue="68%" centerCaption="of 2TB" />`;

const RINGS = `// One concentric ring per row.
<RadialChart data={data} variant="multi" />
<RadialChart data={data} variant="grid" />
<RadialChart data={data} variant="stacked-label" centerValue="248" centerCaption="total" />`;

const GAUGES = `// A 240° arc; rows stack angularly in one band, not as rings.
<RadialChart data={data} variant="shape" />
<RadialChart data={data} variant="stacked" />
<RadialChart data={threeRows} variant="stacked-3-layers" />`;

const TICK = `<RadialChart data={data} variant="gauge-tick" centerValue="68%" />`;

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
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="radial">
            <RadialChart data={SINGLE} variant="text" centerValue="68%" centerCaption="of 2TB" />
          </ChartFrame>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Set max for a quota</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>max</code> is what makes a ring mean &quot;68 out of
            100&quot; rather than just &quot;68, bigger than the other
            one&quot;. Leave it off only when the rings are meant to be compared
            against each other rather than against a ceiling.
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
          <ComponentPreview code={RINGS}>
            <ChartVariants
              kind="radial"
              items={[
                { label: "multi", note: "one ring per row", chart: <RadialChart data={MULTI} variant="multi" /> },
                { label: "grid", note: "+ polar grid behind", chart: <RadialChart data={MULTI} variant="grid" /> },
                { label: "stacked-label", note: "+ center overlay", chart: <RadialChart data={MULTI} variant="stacked-label" centerValue="248" centerCaption="total" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Gauge arcs</h2>
          <p className="mb-3 text-sm text-ink-muted">
            These stack the rows <em>angularly</em> along a single 240° band
            rather than as concentric rings. <code>shape</code> shows the
            remainder as a track; <code>stacked</code> drops the track so the
            rows fill the arc exactly.
          </p>
          <ComponentPreview code={GAUGES}>
            <ChartVariants
              kind="radial"
              items={[
                { label: "shape", note: "240° arc with a remainder track", chart: <RadialChart data={MULTI} variant="shape" /> },
                { label: "stacked", note: "no track, rows fill the arc", chart: <RadialChart data={MULTI} variant="stacked" /> },
                { label: "stacked-3-layers", note: "sized for a 3-row breakdown", chart: <RadialChart data={THREE} variant="stacked-3-layers" /> },
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
          <ComponentPreview code={TICK}>
            <ChartFrame kind="radial">
              <RadialChart data={SINGLE} variant="gauge-tick" centerValue="68%" />
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
