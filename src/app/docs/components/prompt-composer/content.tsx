"use client";

import { PromptComposer } from "@sakaniui/react";
import { PromptComposerDemo } from "@/components/docs/ai-chat-demos";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `const [status, setStatus] = useState<'idle' | 'streaming'>('idle');

<PromptComposer
  status={status}
  onSubmit={(text) => { send(text); setStatus('streaming'); }}
  onStop={() => setStatus('idle')}
  onAttach={openFilePicker}
  onVoice={startVoice}
  placeholder="Ask anything, or type / for skills"
  aria-label="Message"
/>`;
const CODE_1 = `<PromptComposer
  attachments={<>
    <AttachmentChip type="file" name="Q4 pipeline.pdf" meta="PDF · 2.4 MB" onRemove={…} />
    <AttachmentChip type="uploading" name="renewals.csv" progress={64} />
  </>}
  …
/>`;

const PROPS = [
  {"name": "value", "type": "string", "description": "Controlled value."},
  {"name": "defaultValue", "type": "string", "description": "Initial value when uncontrolled."},
  {"name": "onValueChange", "type": "(value: string) => void", "description": "Called as the text changes."},
  {"name": "placeholder", "type": "string", "description": "Placeholder text."},
  {"name": "status", "type": "'idle' | 'streaming'", "default": "'idle'", "description": "While streaming, the send button becomes Stop."},
  {"name": "onSubmit", "type": "(value: string) => void", "description": "Enter, or the send button. Receives the trimmed text."},
  {"name": "onStop", "type": "() => void", "description": "The Stop button."},
  {"name": "onAttach", "type": "() => void", "description": "The + button. Pass it to show the button."},
  {"name": "onVoice", "type": "() => void", "description": "The mic. Hidden when there is no handler."},
  {"name": "attachments", "type": "ReactNode", "description": "Chips above the field, usually AttachmentChip."},
  {"name": "actions", "type": "ReactNode", "description": "Extra controls on the left, after the +."},
  {"name": "maxRows", "type": "number", "default": "8", "description": "The most lines the field grows to before it scrolls."},
  {"name": "glow", "type": "'once' | 'pulse' | 'focus' | 'off'", "default": "'once'", "description": "The ember light round the border: one lap shortly after it appears, then still (once); every 2.5s while idle (pulse); one lap on each focus (focus); none (off)."},
  {"name": "disabled", "type": "boolean", "description": "Disables the field and the buttons."},
  {"name": "autoFocus", "type": "boolean", "description": "Focus the field on mount."},
  {"name": "aria-label", "type": "string", "description": "Accessible name of the field."},
  {"name": "className", "type": "string", "description": "Extra class on the root."},
];

export default function PromptComposerPage() {
  return (
    <article>
      <PageHeader title={"Prompt Composer"} description={"The prompt box of an AI product: it grows with the text, Enter sends, send becomes Stop while the reply streams, and files sit above it."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">It owns no model, files or voice. The + button calls <code>onAttach</code>, the mic <code>onVoice</code>, and the model picker and the like go beside it, in <code>actions</code> or in a row under the box. The ember light sweeps the border once, shortly after the box appears, then rests; focus draws a soft ember border in. Enter sends and Shift+Enter breaks the line.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Basic</h2>
          <p className="mb-3 text-sm text-ink-muted">Type something and press Enter: the send button turns into Stop for three seconds, as if the reply were streaming.</p>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <PromptComposerDemo />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With attachments</h2>
          <p className="mb-3 text-sm text-ink-muted">Pass <code>AttachmentChip</code>s as <code>attachments</code> and they sit above the field.</p>
          <ComponentPreview code={CODE_1}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <PromptComposerDemo withAttachments />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/prompt-composer" />
    </article>
  );
}
