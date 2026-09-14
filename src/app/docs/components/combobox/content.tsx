"use client";

import { useState } from "react";
import { Combobox } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const OPTIONS = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ng", label: "Nigeria" },
  { value: "hu", label: "Hungary" },
  { value: "jp", label: "Japan" },
  { value: "br", label: "Brazil" },
];

const BASIC = `const options = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ng", label: "Nigeria" },
];

<Combobox label="Country" placeholder="Search countries…" options={options} />`;

const MULTI = `<Combobox
  mode="multi"
  label="Markets"
  placeholder="Add markets…"
  options={options}
/>`;

const SIZES = `<Combobox size="sm" options={options} placeholder="Small" />
<Combobox size="md" options={options} placeholder="Medium" />
<Combobox size="lg" options={options} placeholder="Large" />`;

const STATES = `<Combobox options={options} loading placeholder="Loading…" />
<Combobox options={options} disabled placeholder="Disabled" />
<Combobox options={options} error="Pick at least one market." placeholder="With an error" />`;

const CONTROLLED = `const [value, setValue] = useState<string | string[]>([]);

<Combobox
  mode="multi"
  label="Markets"
  options={options}
  value={value}
  onChange={setValue}
/>`;

const PROPS = [
  { name: "options", type: "ComboboxOption[]", description: "{ value, label, icon?, disabled? } for each entry." },
  { name: "mode", type: "'single' | 'multi'", default: "'single'", description: "Multi keeps the panel open and accumulates chips." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Control height." },
  { name: "label", type: "string", description: "Field label." },
  { name: "description", type: "string", description: "Helper line under the field." },
  { name: "error", type: "string", description: "Error message; switches the field to its error styling." },
  { name: "placeholder", type: "string", description: "Placeholder for the search input." },
  { name: "loading", type: "boolean", default: "false", description: "Shows the panel's loading state while options are being fetched." },
  { name: "value", type: "string | string[]", description: "Controlled selection. An array in multi mode." },
  { name: "onChange", type: "(value: string | string[]) => void", description: "Fires with the new selection." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the control." },
];

function ControlledDemo() {
  const [value, setValue] = useState<string | string[]>(["us", "ng"]);
  const count = Array.isArray(value) ? value.length : value ? 1 : 0;
  return (
    <div className="w-full max-w-sm">
      <Combobox mode="multi" label="Markets" options={OPTIONS} value={value} onChange={setValue} />
      <p className="mt-2 text-xs text-ink-subtle">{count} selected</p>
    </div>
  );
}

export default function ComboboxPage() {
  return (
    <article>
      <PageHeader title="Combobox" description="A searchable select, in single or multi mode, for option lists too long to scan." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <Combobox label="Country" placeholder="Search countries…" options={OPTIONS} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Combobox or Select?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <a href="/docs/components/select" className="font-medium text-ink underline underline-offset-2">Select</a>{" "}
            is right when the whole list fits on screen and is worth reading.
            Once someone would rather type three letters than scan, or once they
            need more than one answer, use this.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Multi-select</h2>
          <ComponentPreview code={MULTI}>
            <div className="w-full max-w-sm">
              <Combobox mode="multi" label="Markets" placeholder="Add markets…" options={OPTIONS} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex w-full max-w-sm flex-col gap-4">
              <Combobox size="sm" options={OPTIONS} placeholder="Small" />
              <Combobox size="md" options={OPTIONS} placeholder="Medium" />
              <Combobox size="lg" options={OPTIONS} placeholder="Large" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading, disabled, error</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>loading</code> is for options still in flight: the panel keeps
            its shape instead of flashing an empty list.
          </p>
          <ComponentPreview code={STATES}>
            <div className="flex w-full max-w-sm flex-col gap-4">
              <Combobox options={OPTIONS} loading placeholder="Loading…" />
              <Combobox options={OPTIONS} disabled placeholder="Disabled" />
              <Combobox options={OPTIONS} error="Pick at least one market." placeholder="With an error" />
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
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/combobox" />
    </article>
  );
}
