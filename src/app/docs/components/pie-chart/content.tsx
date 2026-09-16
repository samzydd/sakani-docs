"use client";

import { PieChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, ChartVariants } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  { label: "Direct", value: 42 },
  { label: "Organic", value: 31 },
  { label: "Referral", value: 18 },
  { label: "Paid", value: 9 },
];

const BASIC = `const data = [
  { label: "Direct", value: 42 },
  { label: "Organic", value: 31 },
  { label: "Referral", value: 18 },
  { label: "Paid", value: 9 },
];

<PieChart data={data} />`;

const SOLID = `<PieChart data={data} variant="pie" />
<PieChart data={data} variant="pie-no-separator" />`;

const LABELLED = `<PieChart data={data} variant="label" />
<PieChart data={data} variant="custom-label" />
<PieChart data={data} variant="label-list" />`;

const DONUTS = `<PieChart data={data} variant="donut" />
<PieChart data={data} variant="donut-active" />
<PieChart data={data} variant="stacked" />
<PieChart data={data} variant="interactive" />`;

const DONUT = `<PieChart
  data={data}
  variant="donut-with-text"
  centerValue="12.4k"
  centerCaption="sessions"
/>`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number }[]", description: "One slice per entry." },
  { name: "variant", type: "'pie' | 'pie-no-separator' | 'label' | 'custom-label' | 'label-list' | 'donut' | 'donut-active' | 'donut-with-text' | 'stacked' | 'interactive'", default: "'pie'", description: "Covers every layout in the Figma set, including the donut treatments." },
  { name: "centerValue", type: "string", description: "Center figure, for the donut variants." },
  { name: "centerCaption", type: "string", description: "Caption under the center value." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset diameter." },
];

export default function PieChartPage() {
  return (
    <article>
      <PageHeader title="Pie Chart" description="Parts of a whole, in ten layouts including labelled, interactive, and donut treatments." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="pie">
            <PieChart data={DATA} />
          </ChartFrame>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Pie or donut?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            This component covers both: the <code>donut*</code> variants are the
            same data with a hole. Reach for the dedicated{" "}
            <a href="/docs/components/donut-chart" className="font-medium text-ink underline underline-offset-2">Donut Chart</a>{" "}
            when the center figure is the point; use this one when you want a
            plain pie or one of the labelled layouts.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Solid pies</h2>
          <p className="mb-3 text-sm text-ink-muted">
            No variant puts an angular gap between slices: Figma&apos;s always
            touch. <code>pie</code>&apos;s separator is a thin stroke drawn on
            top of the shared edge, not a padding angle, which is why{" "}
            <code>pie-no-separator</code> is a separate variant rather than a
            spacing prop.
          </p>
          <ComponentPreview code={SOLID}>
            <ChartVariants
              kind="pie"
              items={[
                { label: "pie", note: "stroke between slices", chart: <PieChart data={DATA} variant="pie" /> },
                { label: "pie-no-separator", note: "slices touch directly", chart: <PieChart data={DATA} variant="pie-no-separator" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Labels</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>label</code> and <code>custom-label</code> put the{" "}
            <em>value</em> outside the pie on a leader line, the second in a
            filled pill. <code>label-list</code> is the one that writes the{" "}
            <em>category name</em> inside each slice, so it needs slices big
            enough to hold the text.
          </p>
          <ComponentPreview code={LABELLED}>
            <ChartVariants
              kind="pie"
              items={[
                { label: "label", note: "outside leader-line values", chart: <PieChart data={DATA} variant="label" /> },
                { label: "custom-label", note: "leader-line values in a pill", chart: <PieChart data={DATA} variant="custom-label" /> },
                { label: "label-list", note: "category names inside slices", chart: <PieChart data={DATA} variant="label-list" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Donut treatments</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>donut-active</code> pushes one slice outward and{" "}
            <code>interactive</code> brackets one with a halo ring. Neither is
            something Recharts&apos; own <code>activeShape</code> can do by
            itself (Recharts 3 dropped <code>activeIndex</code> from Pie), so
            both are custom <code>shape</code> renderers driven by the
            component&apos;s own default-active state.
          </p>
          <ComponentPreview code={DONUTS}>
            <ChartVariants
              kind="pie"
              items={[
                { label: "donut", note: "plain ring", chart: <PieChart data={DATA} variant="donut" /> },
                { label: "donut-active", note: "one slice exploded", chart: <PieChart data={DATA} variant="donut-active" /> },
                { label: "stacked", note: "two concentric rings", chart: <PieChart data={DATA} variant="stacked" /> },
                { label: "interactive", note: "halo ring bracketing a slice", chart: <PieChart data={DATA} variant="interactive" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Donut with a total</h2>
          <ComponentPreview code={DONUT}>
            <ChartFrame kind="pie">
              <PieChart data={DATA} variant="donut-with-text" centerValue="12.4k" centerCaption="sessions" />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/pie-chart" />
    </article>
  );
}
