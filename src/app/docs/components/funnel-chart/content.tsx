"use client";

import { FunnelChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  { label: "Visited pricing", value: 12400 },
  { label: "Started trial", value: 4800 },
  { label: "Invited a teammate", value: 2100 },
  { label: "Converted", value: 940 },
];

const BASIC = `const data = [
  { label: "Visited pricing", value: 12400 },
  { label: "Started trial", value: 4800 },
  { label: "Invited a teammate", value: 2100 },
  { label: "Converted", value: 940 },
];

<FunnelChart data={data} />`;

const SIZES = `<FunnelChart data={data} size="sm" />
<FunnelChart data={data} size="lg" />`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number }[]", description: "Stages in order, widest first. Each value is the count that reached that stage." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset height." },
];

export default function FunnelChartPage() {
  return (
    <article>
      <PageHeader title="Funnel Chart" description="Drop-off across sequential stages, where each stage is a subset of the one before it." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-lg">
            <FunnelChart data={DATA} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Stages have to nest</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A funnel claims everyone at each stage also passed the previous one.
            If your stages are merely sequential rather than nested — people can
            skip one, or enter halfway — the narrowing shape asserts something
            untrue, and a{" "}
            <a href="/docs/components/bar-chart" className="font-medium text-ink underline underline-offset-2">Bar Chart</a>{" "}
            is the honest version.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <FunnelChart data={DATA} size="sm" />
              <FunnelChart data={DATA} size="lg" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/funnel-chart" />
    </article>
  );
}
