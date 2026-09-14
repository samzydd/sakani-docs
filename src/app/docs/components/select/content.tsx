"use client";

import { Select } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const OPTIONS = [
  { label: "Nigeria", value: "NG" },
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
];

const BASIC = `const options = [
  { label: 'Nigeria', value: 'NG' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'GB' },
];

<Select label="Country" placeholder="Select a country" options={options} />`;

const ERROR = `<Select label="Country" options={options} error="Select a country to continue." />`;

const PROPS = [
  { name: "options", type: "{ label: string; value: string; disabled?: boolean }[]", description: "The list of selectable options." },
  { name: "label", type: "string", description: "Field label." },
  { name: "description", type: "string", description: "Help text under the field." },
  { name: "error", type: "string", description: "Sets the error state and shows this message." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Field height." },
  { name: "value", type: "string", description: "Controlled selected value." },
  { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
  { name: "onChange", type: "(value: string) => void", description: "Fires with the new value on selection." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
];

export default function SelectPage() {
  return (
    <article>
      <PageHeader title="Select" description="A custom, fully-styled single-select dropdown — not a native <select>." />

      <div className="doc-prose mb-8">
        <p>
          Built as a real listbox rather than wrapping the native element, since a
          native dropdown renders an OS-level popup that can&apos;t be styled to match
          the design.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-72">
            <Select label="Country" placeholder="Select a country" options={OPTIONS} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Error state</h2>
          <ComponentPreview code={ERROR}>
            <div className="w-72">
              <Select label="Country" options={OPTIONS} error="Select a country to continue." />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/select" />
    </article>
  );
}
