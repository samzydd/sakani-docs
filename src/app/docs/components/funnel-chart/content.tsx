"use client";

import { FunnelChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, CHART_WIDTH } from "@/components/docs/chart-frame";
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
  { name: "loading", type: "boolean", default: "false", description: "Draws the chart's own silhouette instead of the chart, breathing quietly, at the chart's height so nothing below it moves when the data arrives. Announced as a busy status." },
  { name: "appearance", type: "'default' | 'rich'", default: "'default'", description: "default is the Figma look. rich adds an entrance when the chart appears (played once, never on hover), a soft lift and glow on hover, and a frosted tooltip. Off for reduced motion." },
  { name: "flow", type: "boolean", default: "true", description: "appearance=\"rich\" only: dots stream through the band and thin out where the funnel does, in proportion to the data. Runs only while the chart is on screen." },
  { name: "formatValue", type: "(value: number) => string", description: "appearance=\"rich\" only: how a stage's value is written in the header and the card. Compact by default (61.2K)." },
];

export default function FunnelChartPage() {
  return (
    <article>
      <PageHeader title="Funnel Chart" description="Drop-off across sequential stages, where each stage is a subset of the one before it." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="funnel">
            <FunnelChart data={DATA} />
          </ChartFrame>
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
            <div className="flex w-full flex-col gap-6" style={{ maxWidth: CHART_WIDTH.funnel }}>
              <FunnelChart data={DATA} size="sm" />
              <FunnelChart data={DATA} size="lg" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading and the rich look</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pass <code>loading</code> while the data is on its way: the chart draws its own silhouette, breathing
            quietly, at the same height, so nothing below it moves when the data arrives. Pass{" "}
            <code>{'appearance="rich"'}</code> for the livelier look: an entrance when the chart appears (once, never on
            hover), a soft lift and glow on hover, and a frosted tooltip. The default stays the Figma look, and
            reduced motion turns the motion off.
          </p>
          <ComponentPreview code={`<FunnelChart data={data} appearance="rich" />`}>
            <ChartFrame kind="funnel">
              <FunnelChart data={DATA} appearance="rich" />
            </ChartFrame>
          </ComponentPreview>
          <div className="mt-4" />
          <ComponentPreview code={`<FunnelChart data={data} loading />`}>
            <ChartFrame kind="funnel">
              <FunnelChart data={DATA} loading />
            </ChartFrame>
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
