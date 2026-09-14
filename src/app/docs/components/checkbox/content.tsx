"use client";

import { useState } from "react";
import { Checkbox } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Checkbox label="Email me about product updates" />`;

const DESCRIPTION = `<Checkbox
  label="Weekly digest"
  description="A single summary email every Monday, instead of one per event."
/>`;

const STATES = `<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />
<Checkbox label="Disabled, checked" disabled defaultChecked />`;

const INDETERMINATE = `// A parent row whose children are only partly selected.
const [rows, setRows] = useState([true, false, false]);
const all = rows.every(Boolean);
const some = rows.some(Boolean) && !all;

<Checkbox
  label="Select all"
  checked={all}
  indeterminate={some}
  onChange={() => setRows(rows.map(() => !all))}
/>`;

const PROPS = [
  { name: "label", type: "string", description: "Text rendered beside the box." },
  { name: "description", type: "string", description: "Supporting line under the label." },
  { name: "indeterminate", type: "boolean", default: "false", description: "Renders the dash state, for a parent whose children are partly selected." },
  { name: "checked", type: "boolean", description: "Controlled checked state." },
  { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
  { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Fires on toggle." },
];

function IndeterminateDemo() {
  const [rows, setRows] = useState([true, false, false]);
  const all = rows.every(Boolean);
  const some = rows.some(Boolean) && !all;

  return (
    <div className="flex flex-col gap-3">
      <Checkbox
        label="Select all"
        checked={all}
        indeterminate={some}
        onChange={() => setRows(rows.map(() => !all))}
      />
      <div className="flex flex-col gap-3 pl-6">
        {["Invoices", "Receipts", "Statements"].map((name, i) => (
          <Checkbox
            key={name}
            label={name}
            checked={rows[i]}
            onChange={() => setRows(rows.map((v, j) => (i === j ? !v : v)))}
          />
        ))}
      </div>
    </div>
  );
}

export default function CheckboxPage() {
  return (
    <article>
      <PageHeader title="Checkbox" description="A single binary choice, with an optional description and a third indeterminate state." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Checkbox label="Email me about product updates" />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With a description</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Use the description for the consequence of ticking the box, not a
            restatement of the label.
          </p>
          <ComponentPreview code={DESCRIPTION}>
            <Checkbox
              label="Weekly digest"
              description="A single summary email every Monday, instead of one per event."
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">States</h2>
          <ComponentPreview code={STATES}>
            <div className="flex flex-col gap-3">
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" defaultChecked />
              <Checkbox label="Indeterminate" indeterminate />
              <Checkbox label="Disabled" disabled />
              <Checkbox label="Disabled, checked" disabled defaultChecked />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Indeterminate parent</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>indeterminate</code> is presentational only: the underlying
            input is still either checked or not, so drive it from whether the
            children are partly selected.
          </p>
          <ComponentPreview code={INDETERMINATE}>
            <IndeterminateDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native input attribute is forwarded to the underlying{" "}
            <code>&lt;input type=&quot;checkbox&quot;&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/checkbox" />
    </article>
  );
}
