"use client";

import { Kbd } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Kbd>⌘K</Kbd>`;

const COMBO = `<span className="flex items-center gap-1">
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>P</Kbd>
</span>`;

const IN_CONTEXT = `<p>
  Press <Kbd>⌘K</Kbd> to open the command menu, or <Kbd>Esc</Kbd> to close it.
</p>`;

const PROPS = [
  { name: "children", type: "ReactNode", description: "The key or chord to render." },
];

export default function KbdPage() {
  return (
    <article>
      <PageHeader title="Kbd" description="Renders a keyboard key, for documenting shortcuts inline." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Kbd>⌘K</Kbd>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Chords</h2>
          <p className="mb-3 text-sm text-ink-muted">
            One <code>Kbd</code> per physical key reads more clearly than
            cramming a whole chord into a single cap.
          </p>
          <ComponentPreview code={COMBO}>
            <span className="flex items-center gap-1">
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>P</Kbd>
            </span>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Inline in prose</h2>
          <ComponentPreview code={IN_CONTEXT}>
            <p className="text-sm text-ink-muted">
              Press <Kbd>⌘K</Kbd> to open the command menu, or <Kbd>Esc</Kbd> to
              close it.
            </p>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/kbd" />
    </article>
  );
}
