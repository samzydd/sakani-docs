"use client";

import { PieChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
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

const LABELLED = `<PieChart data={data} variant="label" />
<PieChart data={data} variant="label-list" />`;

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
          <div className="w-full max-w-md">
            <PieChart data={DATA} />
          </div>
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
          <h2 className="mb-3 text-lg font-semibold text-ink">Labels</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>label</code> writes on the slices, <code>label-list</code>{" "}
            puts a legend beside them. The legend survives small slices and long
            names; on-slice labels don&apos;t.
          </p>
          <ComponentPreview code={LABELLED}>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <PieChart data={DATA} variant="label" />
              <PieChart data={DATA} variant="label-list" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Donut with a total</h2>
          <ComponentPreview code={DONUT}>
            <div className="w-full max-w-md">
              <PieChart data={DATA} variant="donut-with-text" centerValue="12.4k" centerCaption="sessions" />
            </div>
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
