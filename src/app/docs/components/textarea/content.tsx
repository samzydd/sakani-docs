"use client";

import { useState } from "react";
import { Textarea } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { PromptTextareaDemo } from "@/components/docs/ai-prompt-demos";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Textarea label="Release notes" placeholder="What changed in this version?" />`;

const FOCUS = `<Textarea label="Message" autoFocus />`;

const DESCRIPTION = `<Textarea
  label="Bio"
  description="Shown on your public profile. Markdown is supported."
  placeholder="Tell people what you work on…"
/>`;

const ERROR = `<Textarea
  label="Reason for refund"
  error="Give us at least a sentence so support can act on it."
  defaultValue="nope"
/>`;

const ROWS = `<Textarea label="Short note" rows={2} />
<Textarea label="Long answer" rows={6} />`;

const COUNTER = `const [value, setValue] = useState("");
const max = 140;

<Textarea
  label="Summary"
  maxLength={max}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  description={\`\${value.length}/\${max}\`}
/>`;

const AI = `import { Textarea, IconButton } from '@sakaniui/react';
import { IconArrowUp, IconMicrophone, IconPlus } from '@sakaniui/react/icons';

const round = { borderRadius: 999 };

<Textarea
  variant="ai"
  aria-label="Ask anything"
  placeholder="Ask anything"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  maxRows={8}
  leading={<IconButton icon={IconPlus} variant="secondary" aria-label="Add" style={{ ...round, background: 'var(--color-bg-muted)' }} />}
  trailing={value.trim()
    ? <IconButton icon={IconArrowUp} aria-label="Send" style={round} />
    : <IconButton icon={IconMicrophone} variant="ghost" aria-label="Use the microphone" style={round} />}
/>`;

const AI_GROW = `<Textarea variant="ai" maxRows={5} … />   // grows to five lines, then scrolls`;

const PROPS = [
  { name: "label", type: "string", description: "Field label above the textarea." },
  { name: "description", type: "string", description: "Helper line under the field." },
  { name: "error", type: "string", description: "Error message. Replaces the description and switches the field to its error styling." },
  { name: "rows", type: "number", description: "Visible rows, same as the native attribute." },
  { name: "placeholder", type: "string", description: "Placeholder text." },
  { name: "value", type: "string", description: "Controlled value." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
  { name: "variant", type: "'default' | 'ai'", default: "'default'", description: '"ai" is the prompt box of an AI product: a 16px-radius box, a 16px field that grows with the text, an actions row and a light round the border.' },
  { name: "glow", type: "'pulse' | 'focus' | 'off'", default: "'pulse'", description: 'variant="ai" only. The light that sweeps round the border: "pulse" every 2.5s while idle and once on focus, "focus" only on focus, "off" none. Reduced motion draws none.' },
  { name: "leading", type: "ReactNode", description: 'variant="ai" only. Actions on the left of the row under the field, such as an attach button.' },
  { name: "trailing", type: "ReactNode", description: 'variant="ai" only. Actions on the right of that row, such as a mic and a send button.' },
  { name: "maxRows", type: "number", default: "8", description: 'variant="ai" only. The most lines the field grows to before it scrolls.' },
  { name: "onChange", type: "(e: ChangeEvent<HTMLTextAreaElement>) => void", description: "Fires on input." },
];

function CounterDemo() {
  const [value, setValue] = useState("");
  const max = 140;
  return (
    <div className="w-full max-w-md">
      <Textarea
        label="Summary"
        maxLength={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        description={`${value.length}/${max}`}
        placeholder="One or two lines on what this does…"
      />
    </div>
  );
}

export default function TextareaPage() {
  return (
    <article>
      <PageHeader title="Textarea" description="Multi-line text input, with the same label, description, and error treatment as Input, plus an AI prompt box variant." />

      <div className="space-y-10">
        <a
          href="#ai-prompt-box"
          className="flex w-fit items-center gap-2 rounded-full border border-line-subtle bg-surface px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-line-default"
        >
          <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-medium leading-none text-surface">New</span>
          Textarea AI: the prompt box with a light round the border
          <span aria-hidden="true">↓</span>
        </a>

        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-md">
            <Textarea label="Release notes" placeholder="What changed in this version?" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Focus</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Same treatment as Input: a thicker neutral border, not an
            accent-colored ring. An invalid field keeps its red border
            while focused, so the error doesn&apos;t disappear as you fix it.
          </p>
          <ComponentPreview code={FOCUS}>
            <div className="w-full max-w-md">
              <Textarea label="Message" autoFocus />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With a description</h2>
          <ComponentPreview code={DESCRIPTION}>
            <div className="w-full max-w-md">
              <Textarea
                label="Bio"
                description="Shown on your public profile. Markdown is supported."
                placeholder="Tell people what you work on…"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Error</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>error</code> takes the place of <code>description</code> when
            both are set, so validation never pushes the layout around.
          </p>
          <ComponentPreview code={ERROR}>
            <div className="w-full max-w-md">
              <Textarea
                label="Reason for refund"
                error="Give us at least a sentence so support can act on it."
                defaultValue="nope"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Height</h2>
          <ComponentPreview code={ROWS}>
            <div className="flex w-full max-w-md flex-col gap-4">
              <Textarea label="Short note" rows={2} />
              <Textarea label="Long answer" rows={6} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Character count</h2>
          <p className="mb-3 text-sm text-ink-muted">
            There&apos;s no built-in counter; drive the description from the
            value&apos;s own length.
          </p>
          <ComponentPreview code={COUNTER}>
            <CounterDemo />
          </ComponentPreview>
        </section>

        <section id="ai-prompt-box" className="scroll-mt-24">
          <h2 className="mb-3 text-lg font-semibold text-ink">AI prompt box</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>variant=&quot;ai&quot;</code> is the &quot;Ask anything&quot; box of an AI product: a rounded box with the field on top and a row of buttons
            underneath, <code>leading</code> on the left (an attach button) and <code>trailing</code> on the right (a mic, then a send button once there is text).
            A thin light, in an ember gradient from a cool indigo tail to a hot gold head, sweeps once round the border every 2.5 seconds while the box
            is idle. Focus swaps the plain border for a static ember gradient. The error and disabled states keep their own borders. It reads the theme
            tokens, so light, dark and glass need nothing extra. Give it an <code>aria-label</code> when there is no visible label.
          </p>
          <ComponentPreview code={AI}>
            <PromptTextareaDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">AI box that grows</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The field starts at one line and grows with what you type, up to <code>maxRows</code> lines (8 by default), then scrolls. The buttons stay
            pinned underneath.
          </p>
          <ComponentPreview code={AI_GROW}>
            <PromptTextareaDemo maxRows={5} glow="focus" initial={"Plan a three day trip to Lisbon.\nI like food markets and old trams.\nKeep the budget modest, and tell me what to book ahead."} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native attribute is forwarded to the underlying{" "}
            <code>&lt;textarea&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/textarea" />
    </article>
  );
}
