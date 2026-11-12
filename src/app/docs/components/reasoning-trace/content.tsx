"use client";

import { ReasoningTrace } from "@sakaniui/react";
import { ReasoningLiveDemo } from "@/components/docs/ai-chat-demos";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `const [lines, setLines] = useState<string[]>([]);

// as your model streams, replace the last line or add a new one
<ReasoningTrace
  status={done ? 'done' : 'streaming'}
  elapsed={seconds}
  summary="Found two deals to chase before Friday"
>
  {lines}
</ReasoningTrace>`;
const CODE_1 = `<ReasoningTrace status="done" elapsed={6} summary="Compared deal stages and found two to chase">
  <p>Looking at which deals changed stage in the last seven days.</p>
  <p>Three moved forward. Acme went quiet after the proposal and Globex asked for a quote.</p>
</ReasoningTrace>

<ReasoningTrace status="done" elapsed={6} defaultOpen>…</ReasoningTrace>`;

const PROPS = [
  {"name": "status", "type": "'streaming' | 'done'", "default": "'done'", "description": "Streaming is always open: the ray spinner turns and the label shimmers. Done reads \"Thought for Ns\"."},
  {"name": "elapsed", "type": "number", "description": "Seconds. Streaming: the running time (whole seconds). Done: the final time."},
  {"name": "summary", "type": "string", "description": "One line about what it concluded, shown on the closed row."},
  {"name": "children", "type": "ReactNode", "description": "The reasoning, one paragraph per child."},
  {"name": "open", "type": "boolean", "description": "Controlled open state (once done)."},
  {"name": "defaultOpen", "type": "boolean", "default": "false", "description": "Initial open state (once done)."},
  {"name": "onOpenChange", "type": "(open: boolean) => void", "description": "Called when the header is clicked."},
  {"name": "className", "type": "string", "description": "Extra class on the root."},
];

export default function ReasoningTracePage() {
  return (
    <article>
      <PageHeader title={"Reasoning Trace"} description={"The thinking panel above a reply: quiet text that streams in word by word, then folds to \"Thought for 6s\"."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">While <code>streaming</code> the reasoning arrives in a short, five-line window that glides up as text comes in, the oldest line fading out at the top. Each new word fades up out of a soft blur, a touch brighter, then settles into the muted ink. When it is done the panel folds away to one row, and opens again to the full text.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Streaming, then done</h2>
          <p className="mb-3 text-sm text-ink-muted">Append text as it arrives (whole paragraphs, or a paragraph growing word by word: only the new words animate), then set <code>status="done"</code> with the final <code>elapsed</code>. This loops.</p>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <ReasoningLiveDemo />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Done: closed and open</h2>
          <p className="mb-3 text-sm text-ink-muted">Closed, it shows <code>summary</code> on the same row. Click to open the full reasoning.</p>
          <ComponentPreview code={CODE_1}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <div className="w-full max-w-lg space-y-6">
                <ReasoningTrace status="done" elapsed={6} summary="Compared deal stages and found two to chase">
                  <p>Looking at which deals changed stage in the last seven days.</p>
                  <p>Three moved forward. Acme went quiet after the proposal and Globex asked for a quote.</p>
                </ReasoningTrace>
                <ReasoningTrace status="done" elapsed={6} defaultOpen>
                  <p>Looking at which deals changed stage in the last seven days.</p>
                  <p>Three moved forward. Acme went quiet after the proposal and Globex asked for a quote.</p>
                </ReasoningTrace>
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/reasoning-trace" />
    </article>
  );
}
