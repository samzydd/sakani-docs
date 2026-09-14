"use client";

import { Badge } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const BASIC = `<Badge variant="accent">New</Badge>`;

const VARIANTS = `<Badge variant="neutral">Neutral</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>`;

const EMPHASIS = `<Badge variant="success" emphasis="subtle">Subtle</Badge>
<Badge variant="success" emphasis="solid">Solid</Badge>`;

const PROPS = [
  { name: "variant", type: "'neutral' | 'accent' | 'success' | 'warning' | 'danger'", default: "'neutral'", description: "Color scheme." },
  { name: "emphasis", type: "'subtle' | 'solid'", default: "'subtle'", description: "Fill strength." },
  { name: "leftIcon", type: "ReactNode", description: "Icon before the label." },
  { name: "rightIcon", type: "ReactNode", description: "Icon after the label." },
  { name: "children", type: "ReactNode", description: "Badge label." },
];

export default function BadgePage() {
  return (
    <article>
      <PageHeader title="Badge" description="A small status or category label: 5 colors × 2 emphasis levels." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Badge variant="accent">New</Badge>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Variants</h2>
          <ComponentPreview code={VARIANTS}>
            <div className="flex flex-wrap gap-3">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Emphasis</h2>
          <ComponentPreview code={EMPHASIS}>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success" emphasis="subtle">
                Subtle
              </Badge>
              <Badge variant="success" emphasis="solid">
                Solid
              </Badge>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/badge" />
    </article>
  );
}
