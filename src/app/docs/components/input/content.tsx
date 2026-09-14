"use client";

import { Input } from "@sakaniui/react";
import { Mail } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const BASIC = `<Input label="Email" placeholder="you@example.com" />`;

const SIZES = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;

const STATES = `<Input label="Email" description="We'll never share it." />
<Input label="Email" error="Enter a valid email address." defaultValue="not-an-email" />
<Input label="Email" disabled defaultValue="you@example.com" />`;

const ICON = `<Input leadingIcon={<Mail size={16} />} placeholder="you@example.com" />`;

const PROPS = [
  { name: "label", type: "string", description: "Field label." },
  { name: "description", type: "string", description: "Help text under the field." },
  { name: "error", type: "string", description: "Sets the error state and shows this message." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Field height." },
  { name: "leadingIcon", type: "ReactNode", description: "Icon inside the field, before the text." },
  { name: "trailingIcon", type: "ReactNode", description: "Icon inside the field, after the text." },
  { name: "...rest", type: "InputHTMLAttributes<HTMLInputElement>", description: "Every native <input> attribute." },
];

export default function InputPage() {
  return (
    <article>
      <PageHeader title="Input" description="Text input with optional label, help text, and icon slots." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-72">
            <Input label="Email" placeholder="you@example.com" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex w-72 flex-col gap-3">
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium" />
              <Input size="lg" placeholder="Large" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">States</h2>
          <ComponentPreview code={STATES}>
            <div className="flex w-72 flex-col gap-4">
              <Input label="Email" description="We'll never share it." />
              <Input label="Email" error="Enter a valid email address." defaultValue="not-an-email" />
              <Input label="Email" disabled defaultValue="you@example.com" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With an icon</h2>
          <ComponentPreview code={ICON}>
            <div className="w-72">
              <Input leadingIcon={<Mail size={16} />} placeholder="you@example.com" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/input" />
    </article>
  );
}
