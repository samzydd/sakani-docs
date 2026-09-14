"use client";

import { Inbox } from "lucide-react";
import { EmptyState } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<EmptyState type="no-data" />`;

const TYPES = `<EmptyState type="no-data" />
<EmptyState type="no-results" />
<EmptyState type="error" actionLabel="Try again" onAction={refetch} />`;

const CUSTOM = `<EmptyState
  type="no-data"
  title="No leads yet"
  description="Once you connect a source, new leads land here automatically."
  actionLabel="Connect a source"
  onAction={openConnect}
/>`;

const ICON = `<EmptyState
  type="no-data"
  icon={<Inbox size={24} />}
  title="Inbox zero"
  description="Nothing needs your attention right now."
/>`;

const PROPS = [
  { name: "type", type: "'no-data' | 'no-results' | 'error'", default: "'no-data'", description: "Picks the default icon and copy." },
  { name: "title", type: "string", description: "Overrides the type's default headline." },
  { name: "description", type: "string", description: "Overrides the type's default supporting line." },
  { name: "actionLabel", type: "string", description: "Button label. Omit to render no button." },
  { name: "onAction", type: "() => void", description: "Fires when the action button is clicked." },
  { name: "icon", type: "ReactNode", description: "Overrides the type's default icon." },
];

export default function EmptyStatePage() {
  return (
    <article>
      <PageHeader title="Empty State" description="What a list, table, or panel shows when it has nothing to show." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-md">
            <EmptyState type="no-data" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The three types are different situations</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>no-data</code> means nothing exists yet, so the useful action
            is to create something. <code>no-results</code> means things exist
            but the current filter hides them, so the action is to relax the
            filter. <code>error</code> means the request failed and the action is
            to retry. Sending all three to the same generic message wastes the
            one moment the screen has the reader&apos;s full attention.
          </p>
          <ComponentPreview code={TYPES}>
            <div className="flex w-full flex-col gap-6">
              <EmptyState type="no-data" />
              <EmptyState type="no-results" />
              <EmptyState type="error" actionLabel="Try again" onAction={() => {}} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Custom copy and action</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The defaults are deliberately generic. Replace them with something
            specific to what&apos;s missing wherever you can.
          </p>
          <ComponentPreview code={CUSTOM}>
            <div className="w-full max-w-md">
              <EmptyState
                type="no-data"
                title="No leads yet"
                description="Once you connect a source, new leads land here automatically."
                actionLabel="Connect a source"
                onAction={() => {}}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Custom icon</h2>
          <ComponentPreview code={ICON}>
            <div className="w-full max-w-md">
              <EmptyState
                type="no-data"
                icon={<Inbox size={24} />}
                title="Inbox zero"
                description="Nothing needs your attention right now."
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/empty-state" />
    </article>
  );
}
