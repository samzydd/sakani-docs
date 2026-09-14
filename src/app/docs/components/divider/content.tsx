"use client";

import { Divider } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Divider />`;

const LABEL = `<Divider label="or" />`;

const VERTICAL = `<div className="flex h-10 items-center gap-4">
  <span>Draft</span>
  <Divider orientation="vertical" />
  <span>Edited 2h ago</span>
</div>`;

const PROPS = [
  { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Vertical needs a parent with a definite height, since it stretches to fill it." },
  { name: "label", type: "string", description: "Optional text centred on the line. Horizontal only." },
];

export default function DividerPage() {
  return (
    <article>
      <PageHeader title="Divider" description="A rule between groups of content, optionally with a label centred on it." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <Divider />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With a label</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The usual case is separating two alternatives, like a login form
            above and social sign-in below.
          </p>
          <ComponentPreview code={LABEL}>
            <div className="w-full max-w-sm">
              <Divider label="or" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Vertical</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A vertical divider fills its parent&apos;s height, so that parent
            needs one — a flex row with a set height, or items that give it
            height themselves.
          </p>
          <ComponentPreview code={VERTICAL}>
            <div className="flex h-10 items-center gap-4 text-sm text-ink-muted">
              <span>Draft</span>
              <Divider orientation="vertical" />
              <span>Edited 2h ago</span>
              <Divider orientation="vertical" />
              <span>3 collaborators</span>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/divider" />
    </article>
  );
}
