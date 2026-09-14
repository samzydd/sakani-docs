"use client";

import { BarChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
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

const NEGATIVE = [
  { label: "Q1", value: 2400 },
  { label: "Q2", value: -1200 },
  { label: "Q3", value: 3100 },
  { label: "Q4", value: -600 },
];

const BASIC = `const data = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 5100 },
  { label: "Mar", value: 4700 },
];

<BarChart data={data} />`;

const MULTIPLE = `<BarChart
  data={data}
  variant="multiple"
  seriesLabels={["Revenue", "Costs"]}
/>`;

const HORIZONTAL = `// Long category names read better along the y-axis.
<BarChart data={data} variant="horizontal" />`;

const NEGATIVE_CODE = `// Bars below the axis need the negative variant to get a zero line.
<BarChart data={quarterlyNet} variant="negative" />`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number; value2?: number }[]", description: "One entry per bar. value2 adds a second series." },
  { name: "variant", type: "'default' | 'active' | 'multiple' | 'stacked' | 'negative' | 'horizontal'", default: "'default'", description: "Multiple puts series side by side, stacked puts them on top of each other, negative draws a zero line, horizontal flips the axes." },
  { name: "seriesLabels", type: "[string, string?]", description: "Names for value and value2, shown for multiple and stacked." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset height." },
];

export default function BarChartPage() {
  return (
    <article>
      <PageHeader title="Bar Chart" description="Comparison across categories, in six layouts covering grouped, stacked, negative, and horizontal." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-lg">
            <BarChart data={DATA} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Grouped vs stacked</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Grouped (<code>multiple</code>) compares series against each other;
            stacked compares each series against the total. Stacking makes the
            first series easy to read and every one above it hard, so put the
            series people care about most at the bottom.
          </p>
          <ComponentPreview code={MULTIPLE}>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <BarChart data={DATA} variant="multiple" seriesLabels={["Revenue", "Costs"]} />
              <BarChart data={DATA} variant="stacked" seriesLabels={["Revenue", "Costs"]} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Horizontal</h2>
          <ComponentPreview code={HORIZONTAL}>
            <div className="w-full max-w-lg">
              <BarChart data={DATA} variant="horizontal" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Negative values</h2>
          <ComponentPreview code={NEGATIVE_CODE}>
            <div className="w-full max-w-lg">
              <BarChart data={NEGATIVE} variant="negative" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/bar-chart" />
    </article>
  );
}
