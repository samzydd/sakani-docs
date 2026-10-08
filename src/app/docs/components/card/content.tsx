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
>
  Get unlimited components, private support, and early access to new blocks.
</Card>`;

const INTERACTIVE = `<Card interactive title="Hover me" description="Elevates on hover.">
  Try moving your cursor over this card to see the elevation.
</Card>`;

const TWO_BUTTONS = `<Card
  title="Delete project"
  description="This can't be undone."
  actions={
    <>
      <Button variant="secondary">Cancel</Button>
      <Button variant="primary">Delete</Button>
    </>
  }
>
  All associated data, files, and members will be permanently removed.
</Card>`;

const THREE_BUTTONS = `<Card
  title="Onboarding"
  description="Set up your workspace."
  leadingAction={<Button variant="ghost">Skip</Button>}
  actions={
    <>
      <Button variant="secondary">Back</Button>
      <Button variant="primary">Next</Button>
    </>
  }
>
  Connect your team's tools to get the most out of your workspace.
</Card>`;

const PROPS = [
  { name: "title", type: "string", description: "Card heading." },
  { name: "description", type: "string", description: "Supporting text under the title." },
  { name: "actions", type: "ReactNode", description: "Footer action buttons. Hugs the card's left edge." },
  { name: "leadingAction", type: "ReactNode", description: "A standalone action opposite `actions`, e.g. a Skip/Cancel button -- switches the footer to space-between." },
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
            >
              Get unlimited components, private support, and early access to new blocks.
            </Card>
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Interactive</h2>
          <ComponentPreview code={INTERACTIVE}>
            <div className="w-80">
              <Card interactive title="Hover me" description="Elevates on hover.">
                Try moving your cursor over this card to see the elevation.
              </Card>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Two buttons</h2>
          <ComponentPreview code={TWO_BUTTONS}>
            <div className="w-80">
              <Card
                title="Delete project"
                description="This can't be undone."
                actions={
                  <>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="primary">Delete</Button>
                  </>
                }
              >
                All associated data, files, and members will be permanently removed.
              </Card>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Three buttons</h2>
          <ComponentPreview code={THREE_BUTTONS}>
            <div className="w-80">
              <Card
                title="Onboarding"
                description="Set up your workspace."
                leadingAction={<Button variant="ghost">Skip</Button>}
                actions={
                  <>
                    <Button variant="secondary">Back</Button>
                    <Button variant="primary">Next</Button>
                  </>
                }
              >
                Connect your team&apos;s tools to get the most out of your workspace.
              </Card>
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
