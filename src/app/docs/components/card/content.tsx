"use client";

import { Card, Button } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const BASIC = `<Card
  title="Upgrade to Pro"
  description="Unlock every block and priority support."
  actions={<Button variant="primary">Upgrade</Button>}
/>`;

const INTERACTIVE = `<Card interactive title="Hover me" description="Elevates on hover." />`;

const PROPS = [
  { name: "title", type: "string", description: "Card heading." },
  { name: "description", type: "string", description: "Supporting text under the title." },
  { name: "actions", type: "ReactNode", description: "Footer action buttons." },
  { name: "interactive", type: "boolean", default: "false", description: "Enables a hover elevation, for clickable cards." },
  { name: "children", type: "ReactNode", description: "Arbitrary content, rendered below the description." },
];

export default function CardPage() {
  return (
    <article>
      <PageHeader title="Card" description="A general-purpose content container with an optional title, description, and actions." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-80">
            <Card
              title="Upgrade to Pro"
              description="Unlock every block and priority support."
              actions={<Button variant="primary">Upgrade</Button>}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Interactive</h2>
          <ComponentPreview code={INTERACTIVE}>
            <div className="w-80">
              <Card interactive title="Hover me" description="Elevates on hover." />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/card" />
    </article>
  );
}
