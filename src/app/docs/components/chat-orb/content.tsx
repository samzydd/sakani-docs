"use client";

import { ChatOrb } from "@sakaniui/react";
import { ChatOrbPlayground } from "@/components/docs/ai-chat-demos";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `<ChatOrb size={56} />`;
const CODE_1 = `const [thinking, setThinking] = useState(false);
const [glance, setGlance] = useState(false);

<ChatOrb size={88} thinking={thinking} glance={glance} />`;
const CODE_2 = `<ChatOrb size={20} />
<ChatOrb size={28} />
<ChatOrb size={44} />
<ChatOrb size={72} />`;
const CODE_3 = `<ChatOrb size={72} look={false} blink={false} />`;

const PROPS = [
  {"name": "size", "type": "number", "default": "28", "description": "Diameter in px. Everything inside scales with it."},
  {"name": "look", "type": "boolean", "default": "true", "description": "The eyes follow the pointer anywhere on the page."},
  {"name": "blink", "type": "boolean", "default": "true", "description": "The eyes blink every 3 to 6 seconds, now and then twice."},
  {"name": "thinking", "type": "boolean", "default": "false", "description": "The AI is working: the eyes look up and sweep side to side instead of following the pointer."},
  {"name": "glance", "type": "boolean", "default": "false", "description": "Each time it turns true, the eyes turn toward the response (to the right) for 1.4s, then look straight."},
  {"name": "squintOnHover", "type": "boolean", "default": "true", "description": "The eyes narrow while the pointer is over the orb (mouse and pen only)."},
  {"name": "label", "type": "string", "description": "Accessible name. Omit for a decorative orb (aria-hidden); pass it to expose the orb as an image."},
  {"name": "className", "type": "string", "description": "Extra class on the root."},
  {"name": "style", "type": "CSSProperties", "description": "Inline style on the root."},
];

export default function ChatOrbPage() {
  return (
    <article>
      <PageHeader title={"Chat Orb"} description={"The AI's face: a soft white sphere with two black eyes. It is the assistant avatar in AiMessage, and works alone as a chat launcher or greeter."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">The eyes turn toward your pointer anywhere on the page, a little further the further away it is, and ease rather than snap. Every few seconds they blink. The ball is white in both colour modes, so it reads on light and dark surfaces alike. It is decorative by default (<code>aria-hidden</code>); the message beside it carries the meaning.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Basic</h2>
          <p className="mb-3 text-sm text-ink-muted">Move your pointer around it, and over it: the eyes squint a little under the pointer.</p>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <ChatOrb size={56} />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Thinking and glance</h2>
          <p className="mb-3 text-sm text-ink-muted">While the AI works, set <code>thinking</code> and the eyes look up and sweep slowly from side to side instead of following the pointer. When the reply starts, set <code>glance</code> to true: the eyes turn toward the text for 1.4 seconds, then look straight and go back to the pointer. <code>AiMessage</code> sets both for you.</p>
          <ComponentPreview code={CODE_1}>
            <div className="flex w-full justify-center">
              <ChatOrbPlayground />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <p className="mb-3 text-sm text-ink-muted">Everything inside scales with <code>size</code> (px). 28 is the AiMessage avatar, 44 the welcome greeting.</p>
          <ComponentPreview code={CODE_2}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <ChatOrb size={20} />
              <ChatOrb size={28} />
              <ChatOrb size={44} />
              <ChatOrb size={72} />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Still</h2>
          <p className="mb-3 text-sm text-ink-muted">Turn off the pointer and the blink for a static mark, for example in a screenshot or a print. Reduced motion does the same automatically.</p>
          <ComponentPreview code={CODE_3}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <ChatOrb size={72} look={false} blink={false} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/chat-orb" />
    </article>
  );
}
