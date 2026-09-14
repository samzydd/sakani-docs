"use client";

import { Spinner, Button } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Spinner label="Loading" />`;

const SIZES = `<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />`;

const IN_BUTTON = `<Button variant="primary" disabled>
  <Spinner size="sm" label="Saving" />
  Saving…
</Button>`;

const PANEL = `<div className="flex h-40 items-center justify-center">
  <Spinner size="lg" label="Loading report" />
</div>`;

const PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Diameter." },
  { name: "label", type: "string", description: "Accessible label announced to screen readers. Not rendered visually." },
];

export default function SpinnerPage() {
  return (
    <article>
      <PageHeader title="Spinner" description="An indeterminate loading indicator for waits too short or too unpredictable to measure." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Spinner label="Loading" />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Spinner or Skeleton?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Use a{" "}
            <a href="/docs/components/skeleton" className="font-medium text-ink underline underline-offset-2">Skeleton</a>{" "}
            when you know the shape of what&apos;s coming and want to hold its
            space. Use a spinner for in-place waits where there&apos;s no layout
            to reserve — a button mid-submit, a panel refreshing. For a wait you
            can actually measure, use{" "}
            <a href="/docs/components/progress" className="font-medium text-ink underline underline-offset-2">Progress</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex items-center gap-6">
              <Spinner size="sm" label="Small" />
              <Spinner size="md" label="Medium" />
              <Spinner size="lg" label="Large" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Inside a button</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Disable the button while it spins, so the same action can&apos;t be
            fired twice.
          </p>
          <ComponentPreview code={IN_BUTTON}>
            <Button variant="primary" disabled>
              <Spinner size="sm" label="Saving" />
              Saving…
            </Button>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Filling a panel</h2>
          <ComponentPreview code={PANEL}>
            <div className="flex h-40 w-full max-w-sm items-center justify-center rounded-lg border border-line-subtle bg-surface">
              <Spinner size="lg" label="Loading report" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/spinner" />
    </article>
  );
}
