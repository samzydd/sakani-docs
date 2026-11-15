"use client";

import { Flag } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `import { Flag } from '@sakaniui/react';

<Flag country="JP" />`;

const SIZES = `<Flag country="GB" />              {/* 16px, beside text */}
<Flag country="GB" size={32} />      {/* 32px, beside a heading */}`;

const BESIDE = `<span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  <Flag country="IN" />
  Mumbai
</span>`;

const LABEL = `{/* the flag alone says the country: give it a name */}
<Flag country="SG" label="Singapore" />`;

const PROPS = [
  { name: "country", type: "string", description: "ISO 3166-1 alpha-2 code, such as \"GB\", \"JP\" or \"IN\". Case does not matter. Required." },
  { name: "size", type: "number", default: "16", description: "The box size in px. Figma uses 16 beside text and 32 beside a heading. The flag fills the middle of the box." },
  { name: "label", type: "string", description: "The country's name, when the flag is the only thing that says it. Without it the flag is hidden from assistive tech." },
  { name: "className", type: "string", description: "Extra class on the svg." },
];

const CITIES = [["GB", "London"], ["SG", "Singapore"], ["JP", "Tokyo"], ["IN", "Mumbai"], ["AU", "Sydney"]] as const;

export default function FlagPage() {
  return (
    <article>
      <PageHeader title="Flag" description="A country flag from the Figma flag set: pick it by country code." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Flag country="JP" size={32} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <p className="mb-3 text-sm text-ink-muted">A 16 x 16 box with the flag drawn in a rounded rectangle across its middle. 16px sits beside text, 32px beside a heading.</p>
          <ComponentPreview code={SIZES}>
            <div className="flex items-center gap-4">
              <Flag country="GB" />
              <Flag country="GB" size={32} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Beside text</h2>
          <ComponentPreview code={BESIDE}>
            <div className="flex flex-col gap-3 text-sm font-medium text-ink">
              {CITIES.map(([c, n]) => (
                <span key={c} className="inline-flex items-center gap-2"><Flag country={c} />{n}</span>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A flag is decorative by default (<code>aria-hidden</code>): put the country&apos;s name in text beside it. If the flag is the only thing that says the
            country, pass a <code>label</code> and it becomes an image with that name.
          </p>
          <ComponentPreview code={LABEL}>
            <Flag country="SG" label="Singapore" size={32} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Which flags</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The Figma set has 254 flags. The ones the library uses are imported (<code>GB</code>, <code>SG</code>, <code>JP</code>, <code>IN</code>, <code>AU</code>);
            any other code draws a neutral placeholder of the same shape, so a row of flags never shifts. Each further flag is added by dropping its exported SVG
            markup into <code>src/components/Flag/flags.ts</code>.
          </p>
          <div className="flex items-center gap-4 text-sm text-ink-muted">
            <Flag country="ZZ" size={32} /> a country not imported yet
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/flag" />
    </article>
  );
}
