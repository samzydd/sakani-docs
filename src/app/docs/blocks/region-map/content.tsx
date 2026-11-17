"use client";

import { useMemo } from "react";
import { RegionMapBlock, type RegionMapMetric, type RegionMapRow } from "@sakaniui/react/blocks";
import { autoBreaks } from "@sakaniui/react";
import { UK_REGIONS, UK_REGIONS_VIEWBOX } from "@sakaniui/react/regions/uk";
import { DE_REGIONS, DE_REGIONS_VIEWBOX } from "@sakaniui/react/regions/de";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";


type Shape = { id: string; name: string; box: [number, number, number, number] };

/** A fixed, believable spread of figures for any set of regions, so the previews read the same on every visit. */
function sampleRows(regions: Shape[], seed: number): RegionMapRow[] {
  const rnd = (i: number, k: number) => (((Math.sin((i + 1) * 12.9898 + k * 78.233 + seed) * 43758.5453) % 1) + 1) % 1;
  return regions.map((s, i) => {
    const weight = 0.4 + (Math.sqrt(s.box[2] * s.box[3]) / 40) * (0.6 + rnd(i, 1) * 0.9);
    return {
      id: s.id,
      name: s.name,
      values: {
        revenue: Math.round((weight * 450_000 * (0.7 + rnd(i, 2) * 0.6)) / 1000) * 1000,
        growth: Math.round((-7 + rnd(i, 3) * 34) * 10) / 10,
        penetration: Math.round((3 + rnd(i, 4) * 16) * 10) / 10,
      },
    };
  });
}

function sampleMetrics(symbol: string, rows: RegionMapRow[]): RegionMapMetric[] {
  const money = (n: number) => (Math.abs(n) >= 1e6 ? `${symbol}${(n / 1e6).toFixed(1)}M` : `${symbol}${Math.round(n / 1e3)}K`);
  const col = (k: string) => rows.map((r) => r.values[k]);
  return [
    { id: "revenue", label: "Revenue", unit: "Annual recurring revenue", format: money, scale: { breaks: autoBreaks(col("revenue"), 5) }, aggregate: "sum" },
    { id: "growth", label: "Growth", unit: "Growth year over year", format: (n) => `${n > 0 ? "+" : n < 0 ? "\u2212" : ""}${Math.abs(n).toFixed(1)}%`, scale: { breaks: [-4.8, 0, 4.3, 8.9, 21], diverging: true }, aggregate: "mean" },
    { id: "penetration", label: "Penetration", unit: "Target accounts won", format: (n) => `${n.toFixed(1)}%`, scale: { breaks: autoBreaks(col("penetration"), 5) }, aggregate: "mean" },
  ];
}

const BASIC = `import { RegionMapBlock } from '@sakaniui/react/blocks';

<RegionMapBlock
  rows={rows}          // [{ id: 'OR', name: 'Oregon', values: { revenue: 1118000, growth: 26.5, penetration: 6.5 } }, ...]
  metrics={metrics}    // the tabs: id, label, unit, format, scale, aggregate
/>`;

const SELECTED = `<RegionMapBlock defaultSelectedId="OR" />

// or control it, e.g. to keep the zoomed state in the URL
<RegionMapBlock selectedId={id} onSelectedChange={setId} />`;

const COUNTRY = `import { RegionMapBlock } from '@sakaniui/react/blocks';
import { UK_REGIONS, UK_REGIONS_VIEWBOX } from '@sakaniui/react/regions/uk';

<RegionMapBlock
  regions={UK_REGIONS}
  viewBox={UK_REGIONS_VIEWBOX}
  rows={rows}                    // ids match the regions: 'SC', 'WA', 'LN', ...
  metrics={metrics}
  regionNoun="region"            // "Find a region", "All regions", "12 regions"
  allLabel="United Kingdom"
  title="Revenue by region"
/>`;

const STATES = `<RegionMapBlock state="loading" />   // skeletons keep the layout still until the data arrives
<RegionMapBlock state="empty" />     // no figures yet`;

const METRIC = `const metrics: RegionMapMetric[] = [
  {
    id: 'revenue',
    label: 'Revenue',                          // the tab
    unit: 'Annual recurring revenue',          // under the headline figure
    format: (n) => '$' + (n / 1e6).toFixed(1) + 'M',
    scale: { breaks: [120_000, 230_000, 760_000, 1_600_000] },
    aggregate: 'sum',                          // how the headline combines every region
  },
  {
    id: 'growth',
    label: 'Growth',
    unit: 'Growth year over year',
    format: (n) => (n > 0 ? '+' : '') + n.toFixed(1) + '%',
    scale: { breaks: [-4.8, 0, 4.3, 8.9, 21], diverging: true },
    aggregate: 'mean',
  },
];`;

const PROPS = [
  { name: "rows", type: "{ id, name, values }[]", description: "One row per region. values holds a number for each metric id. Defaults to sample US data." },
  { name: "metrics", type: "RegionMapMetric[]", description: "What the map can be shaded by, in tab order. The first two appear as cards when a region is zoomed; the rest become one line of help text." },
  { name: "regions / viewBox", type: "shapes / [x, y, w, h]", description: "The outlines and their box. Default: the 50 US states. Import another country from @sakaniui/react/regions/…" },
  { name: "regionNoun / regionNounPlural", type: "string", default: "'state' / 'states'", description: "What a region is called in \"Find a state\", the zoom button and \"Show all 51 states\"." },
  { name: "allLabel", type: "string", default: "'United States'", description: "The name above the headline figure when nothing is zoomed." },
  { name: "title / description", type: "string", description: "The heading and the line under it." },
  { name: "state", type: "'default' | 'loading' | 'empty'", default: "'default'", description: "Loading draws skeletons; empty says there are no figures yet." },
  { name: "defaultMetric", type: "string", description: "The id of the metric shown first." },
  { name: "selectedId / defaultSelectedId / onSelectedChange", type: "string | null", description: "The zoomed region, controlled or not." },
  { name: "animate", type: "boolean", default: "true", description: "Play the load animation: each bar grows from the left while its figure counts up from zero. Off under reduced motion." },
  { name: "renderDetail", type: "(row, ctx) => ReactNode", description: "Replaces the zoomed region's panel (the cards, the help text and the nearby list)." },
];

const METRIC_FIELDS = [
  { name: "id, label", type: "string", description: "The key into each row's values, and the tab text." },
  { name: "unit", type: "string", description: "What the headline figure means, shown beside it." },
  { name: "format", type: "(n) => string", description: "Formats a value for the headline, the cards, the hover card and the legend." },
  { name: "scale", type: "{ breaks, diverging? }", description: "The legend bins. Set diverging for growth-style data." },
  { name: "aggregate", type: "'sum' | 'mean'", default: "'sum'", description: "How the headline combines every region when none is selected." },
  { name: "compare", type: "(value, average) => string", description: "Words for how a figure compares with the average region. Default: points for a mean metric, a percentage above or below for a sum." },
];

export default function RegionMapBlockPage() {
  const ukRows = useMemo(() => sampleRows(UK_REGIONS, 7), []);
  const ukMetrics = useMemo(() => sampleMetrics("£", ukRows), [ukRows]);
  const deRows = useMemo(() => sampleRows(DE_REGIONS, 7), []);
  const deMetrics = useMemo(() => sampleMetrics("€", deRows), [deRows]);

  return (
    <article>
      <PageHeader
        title="Region Map"
        description="Where it comes from: a choropleth shaded by the metric you pick, linked to a legend and a ranked list."
      />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        Built from <code>RegionMap</code> and <code>RegionMapLegend</code>, <code>SegmentedControl</code>, <code>Combobox</code>, <code>IconButton</code>,{" "}
        <code>Tooltip</code> and <code>Button</code>. The map, the legend and the list are linked: pointing at a state outlines it everywhere and marks its band
        on the legend; pointing at a legend band fades every state outside it. The data is plain props, so you feed it from your own query.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Revenue by state</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Switch the metric, hover a state for its figures and rank, hover a legend band (or click it to hold it), or click a state, or pick one in{" "}
            <strong>Find a state</strong>. The list is Highest or Lowest, and expands to every state.
          </p>
          <ComponentPreview code={BASIC}>
            <div className="mx-auto" style={{ width: 560, maxWidth: "100%" }}>
              <RegionMapBlock />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Zoomed in</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A selected state fills the map. The panel shows its first two metrics as cards, with the rank and how far it is from the average, the others as a line
            of help text, and the states next to it in the ranking. The ghost zoom-out button (top right) goes back to the whole map.
          </p>
          <ComponentPreview code={SELECTED}>
            <div className="mx-auto" style={{ width: 560, maxWidth: "100%" }}>
              <RegionMapBlock defaultSelectedId="OR" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Another country</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pass another country&apos;s outlines and the wording follows: &ldquo;Find a region&rdquo;, &ldquo;Show all 12 regions&rdquo;. The currency and the
            legend breaks come from your metrics.
          </p>
          <ComponentPreview code={COUNTRY}>
            <div className="mx-auto" style={{ width: 560, maxWidth: "100%" }}>
              <RegionMapBlock regions={UK_REGIONS} viewBox={UK_REGIONS_VIEWBOX} rows={ukRows} metrics={ukMetrics} regionNoun="region" allLabel="United Kingdom" title="Revenue by region" />
            </div>
          </ComponentPreview>
          <div className="mt-6">
            <ComponentPreview code={`<RegionMapBlock regions={DE_REGIONS} viewBox={DE_REGIONS_VIEWBOX} regionNoun="state" allLabel="Germany" ... />`}>
              <div className="mx-auto" style={{ width: 560, maxWidth: "100%" }}>
                <RegionMapBlock regions={DE_REGIONS} viewBox={DE_REGIONS_VIEWBOX} rows={deRows} metrics={deMetrics} regionNoun="state" allLabel="Germany" title="Revenue by state" />
              </div>
            </ComponentPreview>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading and empty</h2>
          <ComponentPreview code={STATES}>
            <div className="mx-auto flex flex-col gap-6" style={{ width: 560, maxWidth: "100%" }}>
              <RegionMapBlock state="loading" />
              <RegionMapBlock state="empty" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Your data</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A COMPOSITION EXAMPLE: copy the folder and replace <code>sample.ts</code>, or pass your own rows and metrics. Each metric names its tab, its unit and
            how to format and bin it.
          </p>
          <ComponentPreview code={METRIC}>
            <p className="text-sm text-ink-muted">The shape of a metric. Row values are keyed by the metric ids.</p>
          </ComponentPreview>
          <div className="mt-6">
            <PropsTable rows={METRIC_FIELDS} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>The ranked list is the accessible version of the map: every state is a button there with its figure as text.</li>
            <li>Colour is never the only signal: the legend bands are buttons with text labels, comparisons carry an arrow and words, and a state without data has its own &ldquo;No data&rdquo; swatch.</li>
            <li>The load animation and the zoom easing are skipped under reduced motion, and the counting figures announce their final value.</li>
            <li>The zoom button has a visible tooltip and an accessible name; Escape also zooms out.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">RegionMapBlock props</h2>
          <PropsTable rows={PROPS} />
        </section>

        <BlockSource blocks={["RegionMapBlock"]} />
      </div>

      <Pager current="/docs/blocks/region-map" />
    </article>
  );
}
