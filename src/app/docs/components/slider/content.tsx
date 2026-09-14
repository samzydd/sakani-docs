"use client";

import { useState } from "react";
import { Slider } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Slider label="Volume" defaultValue={60} />`;

const SHOW_VALUE = `<Slider label="Opacity" showValue defaultValue={35} />`;

const RANGE = `<Slider label="Deal value" min={0} max={100000} step={1000} defaultValue={70000} />`;

const CONTROLLED = `const [budget, setBudget] = useState(2500);

<Slider
  label="Monthly budget"
  showValue
  min={500}
  max={10000}
  step={100}
  value={budget}
  onChange={(e) => setBudget(Number(e.target.value))}
/>`;

const PROPS = [
  { name: "label", type: "string", description: "Text above the track." },
  { name: "showValue", type: "boolean", default: "false", description: "Shows the current value to the right of the label." },
  { name: "min", type: "number", default: "0", description: "Lower bound." },
  { name: "max", type: "number", default: "100", description: "Upper bound." },
  { name: "step", type: "number", default: "1", description: "Increment between stops." },
  { name: "value", type: "number", description: "Controlled value." },
  { name: "defaultValue", type: "number", description: "Uncontrolled initial value." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
  { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Fires as the thumb moves. The value arrives as a string; cast it." },
];

function ControlledDemo() {
  const [budget, setBudget] = useState(2500);
  return (
    <div className="w-full max-w-sm">
      <Slider
        label="Monthly budget"
        showValue
        min={500}
        max={10000}
        step={100}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
      />
      <p className="mt-2 text-xs text-ink-subtle">
        ${budget.toLocaleString("en-US")} per month
      </p>
    </div>
  );
}

export default function SliderPage() {
  return (
    <article>
      <PageHeader title="Slider" description="A range input for values where the rough magnitude matters more than the exact number." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <Slider label="Volume" defaultValue={60} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Showing the value</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Without <code>showValue</code> there&apos;s no numeric readout at
            all, which is the right call when the setting is felt rather than
            measured.
          </p>
          <ComponentPreview code={SHOW_VALUE}>
            <div className="w-full max-w-sm">
              <Slider label="Opacity" showValue defaultValue={35} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Custom range and step</h2>
          <ComponentPreview code={RANGE}>
            <div className="w-full max-w-sm">
              <Slider label="Deal value" min={0} max={100000} step={1000} defaultValue={70000} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Controlled</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The event carries a string, as all native range inputs do, so wrap
            it in <code>Number()</code> before storing it.
          </p>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native input attribute is forwarded to the underlying{" "}
            <code>&lt;input type=&quot;range&quot;&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/slider" />
    </article>
  );
}
