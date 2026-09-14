"use client";

import { Button } from "@sakaniui/react";
import { ArrowRight, Download } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const BASIC = `import { Button } from '@sakaniui/react';

<Button variant="primary">Get started</Button>`;

const VARIANTS = `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`;

const SIZES = `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

const ICONS = `<Button leftIcon={<Download size={16} />}>Download</Button>
<Button variant="outline" rightIcon={<ArrowRight size={16} />}>
  Continue
</Button>`;

const LOADING = `<Button loading>Saving…</Button>`;

const PROPS = [
  { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'primary'", description: "Visual style of the button." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Height and padding scale." },
  { name: "leftIcon", type: "ReactNode", description: "Icon rendered before the label." },
  { name: "rightIcon", type: "ReactNode", description: "Icon rendered after the label." },
  { name: "loading", type: "boolean", default: "false", description: "Shows a spinner and disables interaction." },
  { name: "disabled", type: "boolean", default: "false", description: "Native disabled state." },
  { name: "...rest", type: "ButtonHTMLAttributes<HTMLButtonElement>", description: "Every native <button> attribute (type, onClick, form…)." },
];

export default function ButtonPage() {
  return (
    <article>
      <PageHeader title="Button" description="The primary action primitive: 5 variants × 3 sizes, all token-bound." />

      <div className="doc-prose mb-8">
        <p>
          Maps 1:1 to the Figma Button component set. States (hover, focus, disabled)
          are handled entirely with CSS pseudo-classes, not extra props: what looks
          like a variant in Figma is a real interactive state in code.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Button variant="primary">Get started</Button>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Variants</h2>
          <ComponentPreview code={VARIANTS}>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With icons</h2>
          <ComponentPreview code={ICONS}>
            <div className="flex flex-wrap items-center gap-3">
              <Button leftIcon={<Download size={16} />}>Download</Button>
              <Button variant="outline" rightIcon={<ArrowRight size={16} />}>
                Continue
              </Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading</h2>
          <ComponentPreview code={LOADING}>
            <Button loading>Saving…</Button>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/button" />
    </article>
  );
}
