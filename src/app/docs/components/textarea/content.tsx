"use client";

import { useState } from "react";
import { Textarea } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Textarea label="Release notes" placeholder="What changed in this version?" />`;

const DESCRIPTION = `<Textarea
  label="Bio"
  description="Shown on your public profile. Markdown is supported."
  placeholder="Tell people what you work on…"
/>`;

const ERROR = `<Textarea
  label="Reason for refund"
  error="Give us at least a sentence so support can act on it."
  defaultValue="nope"
/>`;

const ROWS = `<Textarea label="Short note" rows={2} />
<Textarea label="Long answer" rows={6} />`;

const COUNTER = `const [value, setValue] = useState("");
const max = 140;

<Textarea
  label="Summary"
  maxLength={max}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  description={\`\${value.length}/\${max}\`}
/>`;

const PROPS = [
  { name: "label", type: "string", description: "Field label above the textarea." },
  { name: "description", type: "string", description: "Helper line under the field." },
  { name: "error", type: "string", description: "Error message. Replaces the description and switches the field to its error styling." },
  { name: "rows", type: "number", description: "Visible rows, same as the native attribute." },
  { name: "placeholder", type: "string", description: "Placeholder text." },
  { name: "value", type: "string", description: "Controlled value." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
  { name: "onChange", type: "(e: ChangeEvent<HTMLTextAreaElement>) => void", description: "Fires on input." },
];

function CounterDemo() {
  const [value, setValue] = useState("");
  const max = 140;
  return (
    <div className="w-full max-w-md">
      <Textarea
        label="Summary"
        maxLength={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        description={`${value.length}/${max}`}
        placeholder="One or two lines on what this does…"
      />
    </div>
  );
}

export default function TextareaPage() {
  return (
    <article>
      <PageHeader title="Textarea" description="Multi-line text input, with the same label, description, and error treatment as Input." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-md">
            <Textarea label="Release notes" placeholder="What changed in this version?" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With a description</h2>
          <ComponentPreview code={DESCRIPTION}>
            <div className="w-full max-w-md">
              <Textarea
                label="Bio"
                description="Shown on your public profile. Markdown is supported."
                placeholder="Tell people what you work on…"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Error</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>error</code> takes the place of <code>description</code> when
            both are set, so validation never pushes the layout around.
          </p>
          <ComponentPreview code={ERROR}>
            <div className="w-full max-w-md">
              <Textarea
                label="Reason for refund"
                error="Give us at least a sentence so support can act on it."
                defaultValue="nope"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Height</h2>
          <ComponentPreview code={ROWS}>
            <div className="flex w-full max-w-md flex-col gap-4">
              <Textarea label="Short note" rows={2} />
              <Textarea label="Long answer" rows={6} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Character count</h2>
          <p className="mb-3 text-sm text-ink-muted">
            There&apos;s no built-in counter; drive the description from the
            value&apos;s own length.
          </p>
          <ComponentPreview code={COUNTER}>
            <CounterDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native attribute is forwarded to the underlying{" "}
            <code>&lt;textarea&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/textarea" />
    </article>
  );
}
