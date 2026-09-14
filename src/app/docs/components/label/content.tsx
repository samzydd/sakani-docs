"use client";

import { Label, Input, Switch } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Label htmlFor="workspace">Workspace name</Label>`;

const REQUIRED = `<Label htmlFor="email" required>Work email</Label>`;

const PAIRED = `<Label htmlFor="api-key" required>API key</Label>
<Input id="api-key" placeholder="sk_live_…" />`;

const STANDALONE = `// Input and Textarea render their own label via the label prop.
// Reach for this component when you're labelling something that doesn't:
<Label htmlFor="beta">Join the beta</Label>
<Switch id="beta" />`;

const PROPS = [
  { name: "children", type: "ReactNode", description: "Label text." },
  { name: "required", type: "boolean", default: "false", description: "Appends a red asterisk." },
  { name: "htmlFor", type: "string", description: "Id of the control this labels. Always set it, so clicking the label focuses the field." },
];

export default function LabelPage() {
  return (
    <article>
      <PageHeader title="Label" description="A form label with optional required marker, for controls that don't render their own." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Label htmlFor="workspace">Workspace name</Label>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">When you need it</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <a href="/docs/components/input" className="font-medium text-ink underline underline-offset-2">Input</a>,{" "}
            <a href="/docs/components/textarea" className="font-medium text-ink underline underline-offset-2">Textarea</a>,
            and <a href="/docs/components/select" className="font-medium text-ink underline underline-offset-2">Select</a>{" "}
            all take a <code>label</code> prop and render this for you. Use it
            directly for controls that don&apos;t, like a bare Switch or a custom
            field of your own.
          </p>
          <ComponentPreview code={STANDALONE}>
            <div className="flex items-center gap-3">
              <Label htmlFor="beta">Join the beta</Label>
              <Switch id="beta" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Required</h2>
          <ComponentPreview code={REQUIRED}>
            <Label htmlFor="email" required>
              Work email
            </Label>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Paired with a field</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>htmlFor</code> has to match the control&apos;s <code>id</code>.
            That&apos;s what makes clicking the label focus the field and what
            screen readers use to announce it.
          </p>
          <ComponentPreview code={PAIRED}>
            <div className="flex w-full max-w-sm flex-col gap-1.5">
              <Label htmlFor="api-key" required>
                API key
              </Label>
              <Input id="api-key" placeholder="sk_live_…" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native attribute is forwarded to the underlying{" "}
            <code>&lt;label&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/label" />
    </article>
  );
}
