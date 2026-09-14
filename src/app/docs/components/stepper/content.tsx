"use client";

import { useState } from "react";
import { Stepper, Button } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const STEPS = [
  { label: "Account", description: "Your details" },
  { label: "Workspace", description: "Name and members" },
  { label: "Billing", description: "Plan and payment" },
];

const BASIC = `const steps = [
  { label: "Account", description: "Your details" },
  { label: "Workspace", description: "Name and members" },
  { label: "Billing", description: "Plan and payment" },
];

<Stepper steps={steps} current={1} />`;

const VERTICAL = `<Stepper steps={steps} current={1} orientation="vertical" />`;

const DRIVEN = `const [current, setCurrent] = useState(0);

<Stepper steps={steps} current={current} />
<Button onClick={() => setCurrent((c) => Math.min(c + 1, steps.length - 1))}>
  Continue
</Button>`;

const PROPS = [
  { name: "steps", type: "{ label: string; description?: string }[]", description: "The steps, in order." },
  { name: "current", type: "number", description: "Index of the active step, 0-based. Everything before it renders as completed, everything after as upcoming." },
  { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Vertical suits sidebars and narrow columns." },
];

function DrivenDemo() {
  const [current, setCurrent] = useState(0);
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Stepper steps={STEPS} current={current} />
      <div className="flex justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setCurrent((c) => Math.max(c - 1, 0))}
        >
          Back
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setCurrent((c) => Math.min(c + 1, STEPS.length - 1))}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export default function StepperPage() {
  return (
    <article>
      <PageHeader title="Stepper" description="Progress through a multi-step flow, showing what's done, where you are, and what's left." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-lg">
            <Stepper steps={STEPS} current={1} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">One number drives every state</h2>
          <p className="mb-3 text-sm text-ink-muted">
            There&apos;s no per-step status to keep in sync:{" "}
            <code>current</code> decides it. Steps before it are completed,
            after it upcoming. That makes the wrong combination — say, step
            three complete while step two isn&apos;t — unrepresentable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Vertical</h2>
          <ComponentPreview code={VERTICAL}>
            <div className="w-full max-w-xs">
              <Stepper steps={STEPS} current={1} orientation="vertical" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Driving it</h2>
          <ComponentPreview code={DRIVEN}>
            <DrivenDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>StepperStep</code> is exported separately if you need to place
            a single step outside the track.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/stepper" />
    </article>
  );
}
