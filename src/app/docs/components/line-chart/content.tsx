"use client";

import { LineChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  { label: "Jan", revenue: 4200 },
  { label: "Feb", revenue: 5100 },
  { label: "Mar", revenue: 4800 },
  { label: "Apr", revenue: 6400 },
  { label: "May", revenue: 7200 },
  { label: "Jun", revenue: 8900 },
];

const BASIC = `const data = [
  { label: 'Jan', revenue: 4200 },
  { label: 'Feb', revenue: 5100 },
  { label: 'Mar', revenue: 4800 },
  { label: 'Apr', revenue: 6400 },
  { label: 'May', revenue: 7200 },
  { label: 'Jun', revenue: 8900 },
];

<LineChart data={data} series={['revenue']} height={240} />`;

const PROPS = [
  { name: "data", type: "Record<string, string | number>[]", description: "Rows keyed by label plus one field per series." },
  { name: "series", type: "string[]", description: "Which fields in data to plot as lines." },
  { name: "xKey", type: "string", default: "'label'", description: "Field used for the x-axis." },
  { name: "variant", type: "'default' | 'linear' | 'step' | 'multiple' | 'dots' | ...", default: "'default'", description: "Line style." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset height." },
  { name: "height", type: "number", description: "Pixel height override, takes precedence over size." },
  { name: "showLegend", type: "boolean", default: "false", description: "Shows a legend below the chart." },
];

export default function LineChartPage() {
  return (
    <article>
      <PageHeader title="Line Chart" description="One of 9 Recharts wrappers, styled entirely with Sakani's chart tokens." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-lg">
            <LineChart data={DATA} series={["revenue"]} height={240} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/line-chart" />
    </article>
  );
}
