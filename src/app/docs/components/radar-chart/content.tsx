"use client";

import { RadarChart } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ChartFrame, ChartVariants } from "@/components/docs/chart-frame";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const DATA = [
  { label: "Speed", value: 82, value2: 65 },
  { label: "Reliability", value: 74, value2: 80 },
  { label: "Support", value: 68, value2: 55 },
  { label: "Pricing", value: 55, value2: 72 },
  { label: "Features", value: 91, value2: 60 },
];

const BASIC = `const data = [
  { label: "Speed", value: 82 },
  { label: "Reliability", value: 74 },
  { label: "Support", value: 68 },
  { label: "Pricing", value: 55 },
  { label: "Features", value: 91 },
];

<RadarChart data={data} />`;

const MULTIPLE = `<RadarChart
  data={data}
  variant="multiple"
  seriesLabels={["Us", "Competitor"]}
/>`;

const GRIDS = `// Polygon grid (straight edges between spokes)
<RadarChart data={data} variant="default" />
<RadarChart data={data} variant="grid-custom" />
<RadarChart data={data} variant="grid-filled" />

// Circular grid (concentric rings instead)
<RadarChart data={data} variant="circle-grid" />
<RadarChart data={data} variant="circle-grid-no-lines" />
<RadarChart data={data} variant="circle-grid-filled" />`;

const MARKERS = `<RadarChart data={data} variant="dots" />
<RadarChart data={data} variant="dots-grid-none" />
<RadarChart data={data} variant="lines-only" />
<RadarChart data={data} variant="custom-label" />`;

const PROPS = [
  { name: "data", type: "{ label: string; value: number; value2?: number }[]", description: "One spoke per entry. value2 draws a second shape for comparison." },
  { name: "variant", type: "'default' | 'dots' | 'dots-grid-none' | 'lines-only' | 'circle-grid' | 'circle-grid-no-lines' | 'grid-custom' | 'grid-filled' | 'circle-grid-filled' | 'multiple' | 'custom-label'", default: "'default'", description: "Grid and fill treatment." },
  { name: "seriesLabels", type: "[string, string?]", description: "Names for value and value2." },
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Preset diameter." },
];

export default function RadarChartPage() {
  return (
    <article>
      <PageHeader title="Radar Chart" description="Several measures for one subject on a shared scale, useful for comparing two profiles at a glance." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <ChartFrame kind="radar">
            <RadarChart data={DATA} />
          </ChartFrame>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Only when the axes share a scale</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The shape only means something if every spoke is measured the same
            way — all scores out of 100, all percentages. Mixing units makes the
            enclosed area meaningless even though it still looks like a chart.
            Spoke order matters too: rearranging them changes the shape without
            changing the data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Comparing two profiles</h2>
          <ComponentPreview code={MULTIPLE}>
            <ChartFrame kind="radar">
              <RadarChart data={DATA} variant="multiple" seriesLabels={["Us", "Competitor"]} />
            </ChartFrame>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Grid treatments</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The grid is either a polygon (straight edges joining the spokes) or
            a set of concentric circles. Everything else is whether the web
            lines show and whether the shape is filled.
          </p>
          <ComponentPreview code={GRIDS}>
            <ChartVariants
              kind="radar"
              items={[
                { label: "default", note: "polygon grid", chart: <RadarChart data={DATA} /> },
                { label: "grid-custom", note: "polygon, restyled grid", chart: <RadarChart data={DATA} variant="grid-custom" /> },
                { label: "grid-filled", note: "polygon, filled shape", chart: <RadarChart data={DATA} variant="grid-filled" /> },
                { label: "circle-grid", note: "concentric rings", chart: <RadarChart data={DATA} variant="circle-grid" /> },
                { label: "circle-grid-no-lines", note: "rings, no spokes", chart: <RadarChart data={DATA} variant="circle-grid-no-lines" /> },
                { label: "circle-grid-filled", note: "rings, filled shape", chart: <RadarChart data={DATA} variant="circle-grid-filled" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Markers and labels</h2>
          <ComponentPreview code={MARKERS}>
            <ChartVariants
              kind="radar"
              items={[
                { label: "dots", note: "point markers on the shape", chart: <RadarChart data={DATA} variant="dots" /> },
                { label: "dots-grid-none", note: "markers, grid removed", chart: <RadarChart data={DATA} variant="dots-grid-none" /> },
                { label: "lines-only", note: "outline, no fill", chart: <RadarChart data={DATA} variant="lines-only" /> },
                { label: "custom-label", note: "restyled spoke labels", chart: <RadarChart data={DATA} variant="custom-label" /> },
              ]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/radar-chart" />
    </article>
  );
}
