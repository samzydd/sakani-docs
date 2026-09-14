"use client";

import { useEffect, useState } from "react";
import { Progress } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Progress value={64} label="Upload progress" />`;

const SIZES = `<Progress value={45} size="sm" />
<Progress value={45} size="md" />
<Progress value={45} size="lg" />`;

const INDETERMINATE = `// Omit value entirely when you can't know the percentage.
<Progress label="Loading workspace" />`;

const LIVE = `const [pct, setPct] = useState(0);

useEffect(() => {
  const id = setInterval(() => setPct((p) => (p >= 100 ? 0 : p + 4)), 120);
  return () => clearInterval(id);
}, []);

<Progress value={pct} label="Importing records" />`;

const PROPS = [
  { name: "value", type: "number", description: "0–100. Omit for indeterminate mode." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Track height." },
  { name: "label", type: "string", default: "'Progress'", description: "Accessible label. Not rendered visually, so pair it with your own heading if the bar needs a visible name." },
];

function LiveDemo() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPct((p) => (p >= 100 ? 0 : p + 4)), 120);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="w-full max-w-sm">
      <div className="mb-2 flex items-center justify-between text-xs text-ink-muted">
        <span>Importing records</span>
        <span>{pct}%</span>
      </div>
      <Progress value={pct} label="Importing records" />
    </div>
  );
}

export default function ProgressPage() {
  return (
    <article>
      <PageHeader title="Progress" description="A linear progress bar, determinate when you know the percentage and indeterminate when you don't." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <Progress value={64} label="Upload progress" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Indeterminate</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Leaving <code>value</code> off switches the bar to a scanning
            animation. Prefer that over faking a percentage you can&apos;t
            actually measure.
          </p>
          <ComponentPreview code={INDETERMINATE}>
            <div className="w-full max-w-sm">
              <Progress label="Loading workspace" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex w-full max-w-sm flex-col gap-4">
              <Progress value={45} size="sm" label="Small" />
              <Progress value={45} size="md" label="Medium" />
              <Progress value={45} size="lg" label="Large" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Showing the number</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>label</code> is for screen readers only — the bar renders no
            text of its own, so put any visible percentage in your own markup
            above it.
          </p>
          <ComponentPreview code={LIVE}>
            <LiveDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/progress" />
    </article>
  );
}
