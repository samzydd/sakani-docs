"use client";

import { useMemo, useState } from "react";
import { RegionMap, RegionMapLegend, type RegionScale } from "@sakaniui/react";
import { UK_REGIONS, UK_REGIONS_VIEWBOX } from "@sakaniui/react/regions/uk";
import { US_STATES, US_STATES_VIEWBOX } from "@sakaniui/react/regions/us";
import { DE_REGIONS, DE_REGIONS_VIEWBOX } from "@sakaniui/react/regions/de";
import { ES_REGIONS, ES_REGIONS_VIEWBOX } from "@sakaniui/react/regions/es";
import { CA_REGIONS, CA_REGIONS_VIEWBOX } from "@sakaniui/react/regions/ca";
import { AU_REGIONS, AU_REGIONS_VIEWBOX } from "@sakaniui/react/regions/au";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

type Box = [number, number, number, number];
type Shapes = { id: string; name: string; d: string; box: Box }[];

/** A fixed spread of numbers for the demos, so the page reads the same on every visit. */
const spread = (regions: Shapes, max: number, offset = 0): Record<string, number> =>
  Object.fromEntries(regions.map((r, i) => [r.id, Math.round((((Math.sin((i + offset) * 12.9898) * 43758.5453) % 1) + 1) % 1 * max)]));

const BASIC = `import { RegionMap, RegionMapLegend } from '@sakaniui/react';
import { UK_REGIONS, UK_REGIONS_VIEWBOX } from '@sakaniui/react/regions/uk';

const scale = { breaks: [20, 40, 60, 80] };       // 4 breaks make 5 bins

<RegionMap
  regions={UK_REGIONS}
  viewBox={UK_REGIONS_VIEWBOX}
  values={{ SC: 82, WA: 41, LN: 95, NW: 58 /* ... by region id */ }}
  scale={scale}
  formatValue={(n) => n + ' accounts'}
/>
<RegionMapLegend scale={scale} formatValue={(n) => String(n)} />`;

const ZOOM = `// uncontrolled: click a region to zoom to it, click again or press Escape to go back out
<RegionMap regions={US_STATES} viewBox={US_STATES_VIEWBOX} values={values} scale={scale} />

// start zoomed
<RegionMap defaultSelected="OR" ... />

// controlled: keep the selection in your own state (a list, a URL, a form)
<RegionMap selected={id} onSelectedChange={setId} ... />`;

const DIVERGING = `// growth, change, variance: bins below zero are orange, the rest blue
<RegionMap
  scale={{ breaks: [-4.8, 0, 4.3, 8.9, 21], diverging: true }}
  values={growthByState}
  formatValue={(n) => (n > 0 ? '+' : '') + n + '%'}
/>`;

const CARD = `// your own hover card
<RegionMap
  renderTooltip={(region, value) => (
    <>
      <strong>{region.name}</strong>
      <span>{value === null ? 'No data' : value + ' accounts'}</span>
    </>
  )}
/>`;

const LINK = `// pointing at a region in your own list, or at a legend band, lights the map up
const [hoverId, setHoverId] = useState<string | null>(null);
const [band, setBand] = useState<number | null>(null);

<RegionMap
  hovered={hoverId}                 // outline a region from outside, with no card
  onHoverChange={setHoverId}        // the region under the pointer or keyboard focus
  dimExcept={band === null ? null : idsInBand(band)}
/>
<RegionMapLegend scale={scale} activeBin={band} onBinHover={setBand} onBinClick={toggleBand} />`;

const OWN = `// the shapes are data: any SVG paths, in any coordinate space
const regions = [
  { id: 'north', name: 'North', d: 'M10 10 L200 10 L200 90 L10 90 Z', box: [10, 10, 190, 80] },
  // box is [x, y, width, height] of the path, used to zoom to it
];
<RegionMap regions={regions} viewBox={[0, 0, 400, 300]} values={{ north: 12 }} />

// Natural Earth, US Census and the like can be converted with scripts/regions in the repository`;

const LOADING = `<RegionMap loading regions={US_STATES} viewBox={US_STATES_VIEWBOX} />`;

const MAP_PROPS = [
  { name: "regions", type: "{ id, name, d, box }[]", description: "The shapes to draw. d is an SVG path, box is [x, y, width, height] of that path (used to zoom to it). Import a country's from @sakaniui/react/regions/…" },
  { name: "viewBox", type: "[x, y, w, h]", description: "The coordinate box the shapes live in. Each country module exports its own, e.g. UK_REGIONS_VIEWBOX." },
  { name: "values", type: "Record<string, number | null>", description: "The value for each region, by id. Missing or null draws the neutral tone (and the legend can say \"No data\")." },
  { name: "scale", type: "{ breaks: number[]; diverging?: boolean }", description: "How values become colours. breaks are the edges between bins; diverging paints the bins below zero orange. Left out: no shading." },
  { name: "selected / defaultSelected / onSelectedChange", type: "string | null", description: "The zoomed region, controlled or not. A click, Enter or Space selects; a second click or Escape clears." },
  { name: "renderTooltip", type: "(region, value) => ReactNode", description: "The hover card. Default: the name and the value through formatValue." },
  { name: "formatValue", type: "(n) => string", default: "String", description: "Formats a value for the default card and the screen-reader label." },
  { name: "hovered", type: "string | null", description: "Outlines a region from outside (a list row, a legend) without a card." },
  { name: "onHoverChange", type: "(id | null) => void", description: "The region under the pointer or keyboard focus." },
  { name: "dimExcept", type: "string[] | null", description: "Fades every region whose id is not listed: the band a legend segment names." },
  { name: "loading", type: "boolean", description: "Shimmers the map while data loads." },
  { name: "aria-label", type: "string", default: "'Map'", description: "The accessible name of the map." },
];

const LEGEND_PROPS = [
  { name: "scale", type: "{ breaks, diverging? }", description: "The same scale the map uses." },
  { name: "formatValue", type: "(n) => string", default: "String", description: "Formats the break labels." },
  { name: "caption", type: "ReactNode", description: "An optional line under the key." },
  { name: "activeBin", type: "number | null", description: "The lit bin: every other segment steps back." },
  { name: "lockedBin", type: "number | null", description: "The bin that is held on (shown pressed)." },
  { name: "markBin", type: "number | null", description: "A bin to outline without dimming the others, e.g. the bin of the hovered region." },
  { name: "onBinHover / onBinClick", type: "(i) => void", description: "Pointer or keyboard focus on a segment, and a click. Giving either makes the segments buttons." },
  { name: "noData", type: "boolean", description: "Shows a \"No data\" swatch." },
];

const COUNTRIES = [
  { id: "us", label: "United States", regions: US_STATES as Shapes, box: US_STATES_VIEWBOX as Box, imp: "@sakaniui/react/regions/us", note: "51: 50 states and DC" },
  { id: "uk", label: "United Kingdom", regions: UK_REGIONS as Shapes, box: UK_REGIONS_VIEWBOX as Box, imp: "@sakaniui/react/regions/uk", note: "12 statistical regions" },
  { id: "es", label: "Spain", regions: ES_REGIONS as Shapes, box: ES_REGIONS_VIEWBOX as Box, imp: "@sakaniui/react/regions/es", note: "19: 17 communities, Ceuta, Melilla" },
  { id: "de", label: "Germany", regions: DE_REGIONS as Shapes, box: DE_REGIONS_VIEWBOX as Box, imp: "@sakaniui/react/regions/de", note: "16 Länder" },
  { id: "ca", label: "Canada", regions: CA_REGIONS as Shapes, box: CA_REGIONS_VIEWBOX as Box, imp: "@sakaniui/react/regions/ca", note: "13 provinces and territories" },
  { id: "au", label: "Australia", regions: AU_REGIONS as Shapes, box: AU_REGIONS_VIEWBOX as Box, imp: "@sakaniui/react/regions/au", note: "8 states and territories" },
];

export default function RegionMapPage() {
  const scale: RegionScale = { breaks: [20, 40, 60, 80] };
  const growth: RegionScale = { breaks: [-4.8, 0, 4.3, 8.9, 21], diverging: true };
  const uk = useMemo(() => spread(UK_REGIONS as Shapes, 100), []);
  const us = useMemo(() => spread(US_STATES as Shapes, 100), []);
  const usGrowth = useMemo(() => Object.fromEntries(Object.entries(spread(US_STATES as Shapes, 340, 5)).map(([k, v]) => [k, Math.round((v / 10 - 9) * 10) / 10])), []);
  const [picked, setPicked] = useState<string | null>("OR");
  const [country, setCountry] = useState("uk");
  const c = COUNTRIES.find((x) => x.id === country) ?? COUNTRIES[1];
  const cValues = useMemo(() => spread(c.regions, 100, 3), [c]);

  return (
    <article>
      <PageHeader
        title="Region Map"
        description="Regions shaded by a value: how it varies by state, province or country. Hover for the figures, click to zoom."
      />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        A choropleth made of plain SVG: no map library, no tiles. The shapes are data, so it is not tied to one place. Outlines for the United States, the
        United Kingdom, Spain, Germany, Canada and Australia ship with the library, each as its own import so an app only carries the one it uses. Pair it with{" "}
        <code>RegionMapLegend</code>, or use the finished card, the <a className="underline underline-offset-2" href="/docs/blocks/region-map">Region Map block</a>.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Basic</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Give it the shapes, a value for each region id and a scale. Four breaks make five bins, in the chart blue (the colours are the{" "}
            <code>--color-map-bin-*</code> tokens, so they follow light and dark mode).
          </p>
          <ComponentPreview code={BASIC}>
            <div className="mx-auto w-full max-w-[520px]">
              <RegionMap regions={UK_REGIONS as Shapes} viewBox={UK_REGIONS_VIEWBOX as Box} values={uk} scale={scale} formatValue={(n) => `${n} accounts`} aria-label="Accounts by UK region" />
              <div className="mt-2">
                <RegionMapLegend scale={scale} />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Click to zoom</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Click a region and the view eases to it with its neighbours still in frame. Click it again, or press Escape, to go back out. Reduced motion jumps
            instead of easing. Tab to the map, then use the arrow keys, Enter and Escape.
          </p>
          <ComponentPreview code={ZOOM}>
            <div className="mx-auto w-full max-w-[560px]">
              <RegionMap regions={US_STATES as Shapes} viewBox={US_STATES_VIEWBOX as Box} values={us} scale={scale} selected={picked} onSelectedChange={setPicked} formatValue={(n) => `${n} accounts`} aria-label="Accounts by US state" />
              <p className="mt-2 text-xs text-ink-muted">Selected: {picked ?? "none"}</p>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Above and below zero</h2>
          <p className="mb-3 text-sm text-ink-muted">
            For growth, change or variance, set <code>diverging</code>: the bins that sit below zero turn orange, the rest stay blue, so the sign is never only a
            matter of how dark a blue is.
          </p>
          <ComponentPreview code={DIVERGING}>
            <div className="mx-auto w-full max-w-[560px]">
              <RegionMap regions={US_STATES as Shapes} viewBox={US_STATES_VIEWBOX as Box} values={usGrowth} scale={growth} formatValue={(n) => `${n > 0 ? "+" : ""}${n}%`} aria-label="Growth by US state" />
              <div className="mt-2">
                <RegionMapLegend scale={growth} formatValue={(n) => `${n > 0 ? "+" : ""}${n}%`} />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Countries</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Each country is its own module, so a UK app never downloads the US outlines. Every one is centred in the same 975 × 610 box.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {COUNTRIES.map((x) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setCountry(x.id)}
                aria-pressed={country === x.id}
                className={`rounded-full border px-3 py-1 text-sm ${country === x.id ? "border-ink bg-ink text-canvas" : "border-line-subtle text-ink-muted hover:text-ink"}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <ComponentPreview code={`import { ${c.id.toUpperCase()}_${c.id === "us" ? "STATES" : "REGIONS"}, ${c.id.toUpperCase()}_${c.id === "us" ? "STATES" : "REGIONS"}_VIEWBOX } from '${c.imp}';   // ${c.note}`}>
            <div className="mx-auto w-full max-w-[520px]">
              <RegionMap key={c.id} regions={c.regions} viewBox={c.box} values={cValues} scale={scale} aria-label={`${c.label} regions`} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Hover card</h2>
          <p className="mb-3 text-sm text-ink-muted">The default card shows the name and the value. Pass <code>renderTooltip</code> for anything richer: a rank, several metrics, a hint.</p>
          <ComponentPreview code={CARD}>
            <p className="text-sm text-ink-muted">The Region Map block fills it with the rank, all three metrics and a &ldquo;Select to zoom in&rdquo; hint.</p>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Linking it to a list or a legend</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The map reports the region under the pointer and accepts one from outside, and the legend reports the band under the pointer. Wire the three together
            and pointing at any of them lights up the others: that is how the block works.
          </p>
          <ComponentPreview code={LINK}>
            <p className="text-sm text-ink-muted">Try it in the <a className="underline underline-offset-2" href="/docs/blocks/region-map">Region Map block</a>: hover a legend band, or a row of the list.</p>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Your own regions</h2>
          <p className="mb-3 text-sm text-ink-muted">The shapes are an array of SVG paths, so counties, sales territories or a floor plan all work.</p>
          <ComponentPreview code={OWN}>
            <p className="text-sm text-ink-muted">The country modules are generated by <code>scripts/regions</code> in the repository from Natural Earth and US Census boundaries, which are public domain.</p>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading</h2>
          <ComponentPreview code={LOADING}>
            <div className="mx-auto w-full max-w-[420px]">
              <RegionMap loading regions={US_STATES as Shapes} viewBox={US_STATES_VIEWBOX as Box} aria-label="Loading" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>The map is a group with one tab stop. Arrow keys move between regions, Enter or Space selects, Escape clears the selection.</li>
            <li>Every region is a button with a label that carries its name and value, so the colour is never the only way to read it.</li>
            <li>Put the same figures in a list or table beside the map: it is the accessible version, and the block does this.</li>
            <li>Reduced motion turns the zoom easing and the loading shimmer off.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">RegionMap props</h2>
          <PropsTable rows={MAP_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">RegionMapLegend props</h2>
          <PropsTable rows={LEGEND_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/region-map" />
    </article>
  );
}
