"use client";

import { DonutChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, CHART_WIDTH } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  { label: "Website", value: 48 },
  { label: "Mobile app", value: 27 },
  { label: "Marketplace", value: 18 },
  { label: "Retail", value: 7 },
];

const BASIC = `const data = [
  { label: "Website", value: 48 },
  { label: "Mobile app", value: 27 },
  { label: "Marketplace", value: 18 },
  { label: "Retail", value: 7 },
];

<DonutChart data={data} />`;

const CENTER = `<DonutChart
  data={data}
  centerValue="$2.44M"
  centerCaption="of revenue"
/>`;

const SIZES = `<DonutChart data={data} size="sm" />
<DonutChart data={data} size="lg" />`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number }[]", description: "One slice per entry. Values are summed, so they don't need to total 100." },
  { name: "centerValue", type: "string", description: "Large figure in the hole. Pre-formatted, so you control currency and rounding." },
  { name: "centerCaption", type: "string", description: "Small caption under the center value." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset diameter." },
  { name: "height", type: "number", description: "Pixel height override; takes precedence over size." },
];

export default function DonutChartPage() {
  return (
    <article>
      <PageHeader title="Donut Chart" description="Composition of a whole, with room in the middle for the total it adds up to." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="donut">
            <DonutChart data={DATA} />
          </ChartFrame>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Use the hole</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The center is the donut&apos;s advantage over a pie: it can state
            the total the slices divide up. Without it you&apos;ve got a pie
            with a hole in it.
          </p>
          <ComponentPreview code={CENTER}>
            <ChartFrame kind="donut">
              <DonutChart data={DATA} centerValue="$2.44M" centerCaption="of revenue" />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Keep the slice count low</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Past five or six slices the small ones stop being distinguishable.
            Group the tail into an &quot;Other&quot; entry, or use a{" "}
            <a href="/docs/components/bar-chart" className="font-medium text-ink underline underline-offset-2">Bar Chart</a>,
            which stays readable at any number of categories.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex w-full flex-col gap-6" style={{ maxWidth: CHART_WIDTH.donut }}>
              <DonutChart data={DATA} size="sm" />
              <DonutChart data={DATA} size="lg" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/donut-chart" />
    </article>
  );
}
