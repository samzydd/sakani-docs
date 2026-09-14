"use client";

import { Alert } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const BASIC = `<Alert
  color="info"
  title="New version available"
  description="Sakani 0.3 adds the Billing block group and dark-mode fixes."
/>`;

const COLORS = `<Alert color="info" title="Info" description="Something worth knowing." />
<Alert color="success" title="Success" description="Your changes were saved." />
<Alert color="warning" title="Warning" description="Double-check before continuing." />
<Alert color="danger" title="Danger" description="This action can't be undone." />`;

const PROPS = [
  { name: "color", type: "'info' | 'success' | 'warning' | 'danger' | 'neutral'", default: "'info'", description: "Color scheme and default icon." },
  { name: "title", type: "string", description: "Alert heading." },
  { name: "description", type: "string", description: "Supporting text." },
  { name: "icon", type: "ReactNode", description: "Overrides the default status icon." },
];

export default function AlertPage() {
  return (
    <article>
      <PageHeader title="Alert" description="An inline status message — 5 colors, each with a matching default icon." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-96">
            <Alert
              color="info"
              title="New version available"
              description="Sakani 0.3 adds the Billing block group and dark-mode fixes."
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Colors</h2>
          <ComponentPreview code={COLORS}>
            <div className="flex w-96 flex-col gap-3">
              <Alert color="info" title="Info" description="Something worth knowing." />
              <Alert color="success" title="Success" description="Your changes were saved." />
              <Alert color="warning" title="Warning" description="Double-check before continuing." />
              <Alert color="danger" title="Danger" description="This action can't be undone." />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/alert" />
    </article>
  );
}
