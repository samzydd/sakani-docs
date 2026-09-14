"use client";

import { ProgressItem, ProgressStat } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const ITEMS = `<ProgressItem step={1} title="Create your account" completed />
<ProgressItem step={2} title="Invite your team" description="At least one teammate" />
<ProgressItem step={3} title="Connect a data source" isLast />`;

const HORIZONTAL = `<ProgressItem step={1} title="Cart" completed orientation="horizontal" />
<ProgressItem step={2} title="Shipping" orientation="horizontal" />
<ProgressItem step={3} title="Payment" orientation="horizontal" isLast />`;

const STATS = `<ProgressStat label="Storage" value="24 GB / 30 GB" progress={80} />
<ProgressStat label="Seats used" value="8 / 10" progress={80} />`;

const ITEM_PROPS = [
  { name: "step", type: "number", description: "The number in the circle. Replaced by a checkmark when completed." },
  { name: "title", type: "string", description: "Step name." },
  { name: "description", type: "string", description: "Supporting line under the title." },
  { name: "completed", type: "boolean", default: "false", description: "Swaps the number for a checkmark." },
  { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Vertical stacks steps with a connector down the left." },
  { name: "isLast", type: "boolean", default: "false", description: "Hides the trailing connector. Set it on the final row or the track runs off into nothing." },
];

const STAT_PROPS = [
  { name: "label", type: "string", description: "What's being measured." },
  { name: "value", type: "string", description: "Pre-formatted readout, e.g. \"24 GB / 30 GB\" or \"80%\"." },
  { name: "progress", type: "number", description: "0–100, drives the bar fill. Independent of value, so keep them consistent." },
];

export default function ProgressStepsPage() {
  return (
    <article>
      <PageHeader title="Progress Steps" description="Checklist rows for onboarding flows, and labelled bars for quota readouts." />

      <div className="space-y-10">
        <ComponentPreview code={ITEMS}>
          <div className="w-full max-w-sm">
            <ProgressItem step={1} title="Create your account" completed orientation="vertical" />
            <ProgressItem
              step={2}
              title="Invite your team"
              description="At least one teammate"
              orientation="vertical"
            />
            <ProgressItem step={3} title="Connect a data source" orientation="vertical" isLast />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Set isLast on the final row</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Each row draws its own trailing connector, so without{" "}
            <code>isLast</code> the last one trails a line into empty space.
            Unlike{" "}
            <a href="/docs/components/stepper" className="font-medium text-ink underline underline-offset-2">Stepper</a>,
            which owns the whole track and derives every state from one index,
            these rows are independent — which is what lets a checklist have
            several completed items in any order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Horizontal</h2>
          <ComponentPreview code={HORIZONTAL}>
            <div className="flex w-full max-w-lg">
              <ProgressItem step={1} title="Cart" completed />
              <ProgressItem step={2} title="Shipping" />
              <ProgressItem step={3} title="Payment" isLast />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Quota bars</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>value</code> and <code>progress</code> are separate inputs, so
            it&apos;s on you to keep them in agreement — compute both from the
            same numbers rather than hardcoding either.
          </p>
          <ComponentPreview code={STATS}>
            <div className="flex w-full max-w-sm flex-col gap-4">
              <ProgressStat label="Storage" value="24 GB / 30 GB" progress={80} />
              <ProgressStat label="Seats used" value="8 / 10" progress={80} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">ProgressItem props</h2>
          <PropsTable rows={ITEM_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">ProgressStat props</h2>
          <PropsTable rows={STAT_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/progress-steps" />
    </article>
  );
}
