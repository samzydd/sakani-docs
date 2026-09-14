"use client";

import { RadialChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const SINGLE = [{ label: "Storage used", value: 68, max: 100 }];

const MULTI = [
  { label: "Compute", value: 72, max: 100 },
  { label: "Storage", value: 45, max: 100 },
  { label: "Bandwidth", value: 88, max: 100 },
];

const BASIC = `const data = [{ label: "Storage used", value: 68, max: 100 }];

<RadialChart data={data} centerValue="68%" centerCaption="of 2TB" />`;

const STACKED = `<RadialChart
  data={[
    { label: "Compute", value: 72, max: 100 },
    { label: "Storage", value: 45, max: 100 },
    { label: "Bandwidth", value: 88, max: 100 },
  ]}
  variant="stacked-3-layers"
/>`;

const GAUGE = `<RadialChart data={data} variant="gauge-tick" centerValue="68%" />`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number; max?: number }[]", description: "One ring per entry. max sets what a full ring means; without it the values are read against each other." },
  { name: "variant", type: "'multi' | 'grid' | 'text' | 'shape' | 'gauge-tick' | 'stacked' | 'stacked-3-layers' | 'stacked-label'", default: "'multi'", description: "Ring layout, including the gauge treatment." },
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
          <div className="w-full max-w-md">
            <RadialChart data={SINGLE} centerValue="68%" centerCaption="of 2TB" />
          </div>
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
          <h2 className="mb-3 text-lg font-semibold text-ink">Several quotas at once</h2>
          <ComponentPreview code={STACKED}>
            <div className="w-full max-w-md">
              <RadialChart data={MULTI} variant="stacked-3-layers" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Gauge</h2>
          <ComponentPreview code={GAUGE}>
            <div className="w-full max-w-md">
              <RadialChart data={SINGLE} variant="gauge-tick" centerValue="68%" />
            </div>
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
