"use client";

import { useState } from "react";
import { Radio } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Radio name="plan" label="Starter" defaultChecked />
<Radio name="plan" label="Growth" />
<Radio name="plan" label="Enterprise" />`;

const DESCRIPTION = `<Radio
  name="billing"
  label="Monthly"
  description="$29/month, cancel any time."
  defaultChecked
/>
<Radio
  name="billing"
  label="Annual"
  description="$290/year. Two months free."
/>`;

const STATES = `<Radio name="s" label="Unselected" />
<Radio name="s" label="Selected" defaultChecked />
<Radio name="d" label="Disabled" disabled />
<Radio name="d2" label="Disabled, selected" disabled defaultChecked />`;

const CONTROLLED = `const [plan, setPlan] = useState("growth");

<Radio
  name="plan"
  label="Growth"
  checked={plan === "growth"}
  onChange={() => setPlan("growth")}
/>`;

const PROPS = [
  { name: "label", type: "string", description: "Text rendered beside the dot." },
  { name: "description", type: "string", description: "Supporting line under the label." },
  { name: "name", type: "string", description: "Shared across a group; this is what makes the options mutually exclusive." },
  { name: "checked", type: "boolean", description: "Controlled selected state." },
  { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
  { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Fires on select." },
];

function ControlledDemo() {
  const [plan, setPlan] = useState("growth");
  return (
    <div className="flex flex-col gap-3">
      {[
        { value: "starter", label: "Starter" },
        { value: "growth", label: "Growth" },
        { value: "enterprise", label: "Enterprise" },
      ].map((o) => (
        <Radio
          key={o.value}
          name="plan-controlled"
          label={o.label}
          checked={plan === o.value}
          onChange={() => setPlan(o.value)}
        />
      ))}
      <p className="mt-1 text-xs text-ink-muted">Selected: {plan}</p>
    </div>
  );
}

export default function RadioPage() {
  return (
    <article>
      <PageHeader title="Radio" description="One choice out of a set. Group options by giving them a shared name." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="flex flex-col gap-3">
            <Radio name="plan-basic" label="Starter" defaultChecked />
            <Radio name="plan-basic" label="Growth" />
            <Radio name="plan-basic" label="Enterprise" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With descriptions</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Descriptions carry the trade-off between options, which is usually
            what the choice actually turns on.
          </p>
          <ComponentPreview code={DESCRIPTION}>
            <div className="flex flex-col gap-3">
              <Radio
                name="billing-desc"
                label="Monthly"
                description="$29/month, cancel any time."
                defaultChecked
              />
              <Radio
                name="billing-desc"
                label="Annual"
                description="$290/year. Two months free."
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">States</h2>
          <ComponentPreview code={STATES}>
            <div className="flex flex-col gap-3">
              <Radio name="st-1" label="Unselected" />
              <Radio name="st-1" label="Selected" defaultChecked />
              <Radio name="st-2" label="Disabled" disabled />
              <Radio name="st-3" label="Disabled, selected" disabled defaultChecked />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Controlled</h2>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native input attribute is forwarded to the underlying{" "}
            <code>&lt;input type=&quot;radio&quot;&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/radio" />
    </article>
  );
}
