"use client";

import { ThinkingLoader } from "@sakaniui/react";
import { ThinkingLoaderCycleDemo } from "@/components/docs/ai-chat-demos";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `<ThinkingLoader />
<ThinkingLoader label="Searching the web" />`;
const CODE_1 = `const label = phase === 'tool' ? 'Searching the CRM' : phase === 'write' ? 'Writing response' : 'Thinking';

<ThinkingLoader label={label} />`;

const PROPS = [
  {"name": "label", "type": "string", "default": "'Thinking'", "description": "What it is doing. Changing it crossfades the text and resizes the pill."},
  {"name": "className", "type": "string", "description": "Extra class on the pill."},
];

export default function ThinkingLoaderPage() {
  return (
    <article>
      <PageHeader title={"Thinking Loader"} description={"The status pill of an AI that is working: a ray spinner and a shimmering label (\"Thinking\", \"Searching the web\", \"Writing response\")."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">The spinner is drawn in the ember gradient and beats once per shimmer lap, just as the pale band is about to enter the label again, as if it pushed the band out. Change <code>label</code> as the work moves on: the old text fades out, the new one fades in with a soft blur, and the pill grows or shrinks to fit. It is a <code>role="status"</code>, so each new label is announced politely.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Basic</h2>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <ThinkingLoader />
              <ThinkingLoader label="Searching the web" />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Changing label</h2>
          <p className="mb-3 text-sm text-ink-muted">Pick the label from what your model is doing. This one cycles.</p>
          <ComponentPreview code={CODE_1}>
            <div className="flex min-h-16 w-full items-center justify-center">
              <ThinkingLoaderCycleDemo />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/thinking-loader" />
    </article>
  );
}
