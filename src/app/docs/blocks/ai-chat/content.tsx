"use client";

import { AiChatBlock, AiWelcomeBlock } from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const CHAT = `import { AiChatBlock } from '@sakaniui/react/blocks';

<div style={{ height: '100vh' }}>
  <AiChatBlock />
</div>`;

const WELCOME = `import { AiWelcomeBlock } from '@sakaniui/react/blocks';

<div style={{ height: '100vh' }}>
  <AiWelcomeBlock greeting="Good afternoon" name="Samuel" onSubmit={(text) => startChat(text)} />
</div>`;

export default function AiChatBlocksPage() {
  return (
    <article>
      <PageHeader
        title="AI Chat"
        description="The two screens of an AI product: the conversation, and the empty screen you start it from."
      />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        Both are built from the Sidebar parts and the AI components: <code>AiMessage</code> with the Chat Orb, <code>ReasoningTrace</code>,{" "}
        <code>ToolCall</code>, <code>ThinkingLoader</code>, <code>SuggestionChip</code> and <code>PromptComposer</code>. Nothing is wired to a model.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">AI Chat</h2>
          <p className="mb-3 text-sm text-ink-muted">
            It is live: send a message and it plays a reply in real time. The orb looks up while it thinks, the reasoning streams in word by
            word, a tool call runs, then the answer arrives and the orb glances at it. Replace the demo reply with your own stream.
          </p>
          <ComponentPreview code={CHAT} fullBleed>
            <div style={{ height: 640, minWidth: 900, width: "100%" }}>
              <AiChatBlock />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">AI Welcome</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The empty screen: a greeting beside the Chat Orb (it follows your pointer), the prompt box with its options row, and three
            recent-work cards.
          </p>
          <ComponentPreview code={WELCOME} fullBleed>
            <div style={{ height: 640, minWidth: 900, width: "100%" }}>
              <AiWelcomeBlock />
            </div>
          </ComponentPreview>
        </section>

        <BlockSource blocks={["AiChatBlock", "AiWelcomeBlock"]} />
      </div>

      <Pager current="/docs/blocks/ai-chat" />
    </article>
  );
}
