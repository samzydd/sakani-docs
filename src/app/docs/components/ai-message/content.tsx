"use client";

import { AiMessage } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `<AiMessage role="user">Which deals need a follow-up this week?</AiMessage>
<AiMessage
  onCopy={copy}
  onRegenerate={regenerate}
  onFeedback={(value) => rate(value)}   // 'up' | 'down'
>
  Your pipeline looks healthy. Three deals moved forward this week, and two of them are worth a closer look before Friday.
</AiMessage>`;
const CODE_1 = `// no text yet: the orb looks up and sweeps
<AiMessage streaming />

// text arriving
<AiMessage streaming>Your pipeline looks healthy. Three deals moved forward this week, and two of</AiMessage>`;
const CODE_2 = `<AiMessage actions={false}>
  <p>1. Acme Corp, silent since the proposal went out on Monday.</p>
  <p>2. Globex, asked for a revised quote on the annual plan.</p>
</AiMessage>`;

const PROPS = [
  {"name": "role", "type": "'assistant' | 'user'", "default": "'assistant'", "description": "Assistant is full-width text beside the orb; user is a right-aligned bubble."},
  {"name": "streaming", "type": "boolean", "description": "Assistant only. The reply is still arriving: hides the actions, ends the text with a caret, and animates the orb."},
  {"name": "children", "type": "ReactNode", "description": "The text. A plain string is one paragraph; several children sit 12px apart."},
  {"name": "actions", "type": "boolean | ReactNode", "default": "true", "description": "Assistant only. false leaves the row out; a node replaces it."},
  {"name": "onCopy", "type": "() => void", "description": "The copy button."},
  {"name": "onRegenerate", "type": "() => void", "description": "The regenerate button."},
  {"name": "onFeedback", "type": "(value: 'up' | 'down') => void", "description": "The good and bad response buttons."},
  {"name": "className", "type": "string", "description": "Extra class on the root."},
];

export default function AiMessagePage() {
  return (
    <article>
      <PageHeader title={"AI Message"} description={"One turn of the conversation. The assistant's reply is full-width text beside the Chat Orb; the user's is a right-aligned bubble."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">It is presentational: you pass the text and say whether it is still arriving. Under a finished reply there are copy, regenerate and good/bad response buttons; they are callbacks, and it copies and sends nothing itself.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Assistant and user</h2>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full max-w-lg flex-col gap-5">
              <AiMessage role="user">Which deals need a follow-up this week?</AiMessage>
              <AiMessage>Your pipeline looks healthy. Three deals moved forward this week, and two of them are worth a closer look before Friday.</AiMessage>
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Streaming</h2>
          <p className="mb-3 text-sm text-ink-muted">While <code>streaming</code> the actions are hidden and the text ends with a caret. With no text yet, the orb&apos;s eyes sweep as if thinking; when the first words arrive it glances at them, then looks straight.</p>
          <ComponentPreview code={CODE_1}>
            <div className="flex w-full max-w-lg flex-col gap-5">
              <AiMessage streaming />
              <AiMessage streaming>Your pipeline looks healthy. Three deals moved forward this week, and two of</AiMessage>
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Paragraphs and actions</h2>
          <p className="mb-3 text-sm text-ink-muted">Pass several children and they sit 12px apart. <code>actions={false}</code> leaves the row out; pass a node to replace it.</p>
          <ComponentPreview code={CODE_2}>
            <div className="flex w-full max-w-lg flex-col gap-5">
              <AiMessage actions={false}>
                <p>1. Acme Corp, silent since the proposal went out on Monday.</p>
                <p>2. Globex, asked for a revised quote on the annual plan.</p>
              </AiMessage>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/ai-message" />
    </article>
  );
}
