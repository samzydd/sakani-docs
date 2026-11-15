"use client";

import { LiveMapBlock } from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const BASIC = `import { LiveMapBlock } from '@sakaniui/react/blocks';

<LiveMapBlock
  cities={cities}
  hourly={hourlyVolume}      // 24 numbers: today's volume for each UTC hour
  totals={totals}
  onViewCity={(city) => router.push(\`/payments?city=\${city.id}\`)}
/>`;

const STATES = `<LiveMapBlock state="loading" />   // skeletons keep the layout still until the data arrives
<LiveMapBlock state="empty" />     // no payments yet today`;

const SELECTED = `<LiveMapBlock defaultSelectedId="tokyo" />

// or control it
<LiveMapBlock selectedId={id} onSelectedChange={setId} />`;

const SHAPE = `const cities: LiveMapCity[] = [
  {
    id: 'tokyo', name: 'Tokyo', country: 'JP', countryName: 'Japan', region: 'apac',
    position: [35.7, 139.7], timeZone: 'Asia/Tokyo',
    revenue: 197804, payments: 8912, approvalRate: 97.1, avgPayment: 22.19,
    vsForecast: 18,                       // +18% vs forecast
    status: 'healthy',                    // 'watch' = a dashed amber ring and a Watch badge
    methods: [{ label: 'Cards', share: 71 }, { label: 'Wallets', share: 19 }, { label: 'Bank transfer', share: 10 }],
  },
  // ...
];`;

const PROPS = [
  { name: "cities", type: "LiveMapCity[]", description: "The cities: dots on the globe and rows in the list. Defaults to the sample data from the Figma block." },
  { name: "regions", type: "{ id, label, center }[]", description: "The filter chips after \"All regions\". Choosing one turns the globe to its center." },
  { name: "hourly", type: "number[]", description: "Payment volume for each hour of today (24 numbers, UTC). Hours after the current one are not drawn." },
  { name: "totals", type: "{ revenue, payments, approvalRate, vsForecast, cities }", description: "Figures across every city, for the headline and \"Top 5 of 40 cities\"." },
  { name: "insight", type: "{ title, body, short }", description: "The \"Right now\" card (and the phone's one-line pill)." },
  { name: "hubId", type: "string", description: "The id of the city the arcs settle to. Defaults to Singapore, else the first city." },
  { name: "state", type: "'default' | 'loading' | 'empty'", default: "'default'", description: "Loading draws skeletons; empty is \"No payments yet today\"." },
  { name: "selectedId / defaultSelectedId / onSelectedChange", type: "string | null", description: "The selected city, controlled or not. Picking a city in the list or on the globe turns the globe to it." },
  { name: "hoveredId", type: "string", description: "Pins the hover look and card on one city without a pointer: documentation and visual tests." },
  { name: "defaultMetric", type: "'revenue' | 'payments' | 'approval'", default: "'revenue'", description: "What the dots, the ranking and the figures show first." },
  { name: "now", type: "Date", description: "The moment to show. Left out, the clock runs on real time and ticks; given, it is frozen there." },
  { name: "autoRotate", type: "boolean", default: "true", description: "Turn the globe slowly and offer a rotate button that stops and restarts it. It holds still under the pointer, while a city is selected, and under reduced motion." },
  { name: "atmosphere", type: "boolean", default: "true", description: "The glow around the globe." },
  { name: "title / mobileTitle / description / mobileDescription", type: "string", description: "The heading and its line, on a desktop and on a phone." },
  { name: "onViewCity", type: "(city) => void", description: "The primary button in a city's detail (\"View Tokyo payments\")." },
  { name: "onViewAll", type: "() => void", description: "\"View all cities\" under the list." },
];

const CITY_FIELDS = [
  { name: "id, name, country, countryName", type: "string", description: "country is the two-letter code: it becomes the city's flag in the list, the hover card, the detail and the phone rows." },
  { name: "region", type: "string", description: "The id of one of `regions`." },
  { name: "position", type: "[lat, lng]", description: "Where the dot sits." },
  { name: "timeZone", type: "string", description: "An IANA zone, for \"22:42 local\" in the hover card." },
  { name: "revenue, payments, approvalRate, avgPayment", type: "number", description: "Today's figures. They drive the dot sizes, the ranking and the detail." },
  { name: "vsForecast", type: "number", description: "Revenue against forecast, in percent: 6 shows \"+6% vs forecast\", -2 shows \"-2% vs forecast\" in amber." },
  { name: "status", type: "'healthy' | 'watch'", default: "'healthy'", description: "watch gives the dot a dashed amber ring and the detail a Watch badge." },
  { name: "methods", type: "{ label, share }[]", description: "Share of revenue by payment method, in percent." },
];

export default function LiveMapBlockPage() {
  return (
    <article>
      <PageHeader
        title="Live Map"
        description="Where the money is coming from: a slowly turning globe, a ranked list of cities, and the day replayed."
      />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        Built from <code>MapGlobe</code> (with its sized, ranked, watch-ringed markers and your own card on the hovered city), <code>Flag</code>,{" "}
        <code>SegmentedControl</code>, <code>FilterChip</code>, <code>Tabs</code>, <code>Badge</code>, <code>Button</code>, <code>IconButton</code> and{" "}
        <code>LocationDot</code>. The data is plain props, so you feed it from your own stream. Below 720px of its own width it becomes the phone layout,
        with the list as a bottom sheet.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Live Map</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pick a city in the list or on the globe: the panel becomes that city&apos;s detail and the globe turns to face it. Switch the metric, filter by
            region, press <strong>Replay today</strong> to play the day back, or use the rotate button to stop the spin. The clock ticks in real time.
          </p>
          <ComponentPreview code={BASIC} scaleToFit>
            <div style={{ width: 1120 }}>
              <LiveMapBlock />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Selecting a city</h2>
          <ComponentPreview code={SELECTED} scaleToFit>
            <div style={{ width: 1120 }}>
              <LiveMapBlock defaultSelectedId="tokyo" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading and empty</h2>
          <p className="mb-3 text-sm text-ink-muted">Loading keeps the layout still with skeletons; empty says no payments have settled yet.</p>
          <ComponentPreview code={STATES} scaleToFit>
            <div className="flex flex-col gap-6" style={{ width: 1120 }}>
              <LiveMapBlock state="loading" />
              <LiveMapBlock state="empty" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">On a phone</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The block reads its own width, not the window&apos;s: at 390px it shows the metric switch full width, the filters in a scrolling row, a one-line
            insight, the legend behind the info button, and the top cities in a bottom sheet.
          </p>
          <ComponentPreview code={`<div style={{ width: 390 }}>\n  <LiveMapBlock />\n</div>`}>
            <div style={{ width: 390, maxWidth: "100%" }}>
              <LiveMapBlock />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Your data</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A COMPOSITION EXAMPLE: copy the folder and replace <code>sample.ts</code>, or pass your own props. Each city carries its figures; the block does
            the ranking, the dot sizes, the shares and the forecast colours.
          </p>
          <ComponentPreview code={SHAPE}>
            <p className="text-sm text-ink-muted">The shape of a city, with the Figma block&apos;s Tokyo.</p>
          </ComponentPreview>
          <div className="mt-6">
            <PropsTable rows={CITY_FIELDS} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>The ranked list is the accessible version of the globe: every city is a button there, with its figures as text.</li>
            <li>Status is never only a colour: a city to watch has a dashed ring on the globe, a Watch badge and amber text.</li>
            <li>The globe turns slowly and holds still under the pointer, while a city is selected and under reduced motion. The rotate button is a toggle (<code>aria-pressed</code>); it is not shown under reduced motion.</li>
            <li>Loading is announced as a busy status; the hover card is decorative and repeats what the list says.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">LiveMapBlock props</h2>
          <PropsTable rows={PROPS} />
        </section>

        <BlockSource blocks={["LiveMapBlock"]} />
      </div>

      <Pager current="/docs/blocks/live-map" />
    </article>
  );
}
