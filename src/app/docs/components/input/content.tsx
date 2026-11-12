"use client";

import { Input } from "@sakaniui/react";
import { IconMail as Mail } from "@sakaniui/react/icons";
import { PageHeader } from "@/components/docs/page-header";
import { PromptInputDemo } from "@/components/docs/ai-prompt-demos";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const BASIC = `<Input label="Email" placeholder="you@example.com" />`;

const SIZES = `<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />
<Input size="lg" placeholder="Large" />`;

const STATES = `<Input label="Email" description="We'll never share it." />
<Input label="Email" error="Enter a valid email address." defaultValue="not-an-email" />
<Input label="Email" disabled defaultValue="you@example.com" />`;

const ICON = `<Input leadingIcon={<Mail size={16} />} placeholder="you@example.com" />`;

const AI = `import { Input, IconButton } from '@sakaniui/react';
import { IconArrowUp, IconMicrophone, IconPlus } from '@sakaniui/react/icons';

const round = { borderRadius: 999 };

<Input
  variant="ai"
  aria-label="Ask anything"
  placeholder="Ask anything"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  leading={<IconButton icon={IconPlus} variant="secondary" aria-label="Add" style={{ ...round, background: 'var(--color-bg-muted)' }} />}
  trailing={value.trim()
    ? <IconButton icon={IconArrowUp} aria-label="Send" style={round} />
    : <IconButton icon={IconMicrophone} variant="ghost" aria-label="Use the microphone" style={round} />}
/>`;

const AI_GLOW = `<Input variant="ai" glow="once" … />    // one lap shortly after it appears, then still (default)
<Input variant="ai" glow="pulse" … />   // sweeps every 2.5s while idle, and once on focus
<Input variant="ai" glow="focus" … />   // only on focus
<Input variant="ai" glow="off" … />     // none`;

const PROPS = [
  { name: "label", type: "string", description: "Field label." },
  { name: "description", type: "string", description: "Help text under the field." },
  { name: "error", type: "string", description: "Sets the error state and shows this message." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Field height." },
  { name: "leadingIcon", type: "ReactNode", description: "Icon inside the field, before the text." },
  { name: "trailingIcon", type: "ReactNode", description: "Icon inside the field, after the text." },
  { name: "variant", type: "'default' | 'ai'", default: "'default'", description: '"ai" is the prompt box of an AI product: a pill with a 16px field, action slots and a light round the border.' },
  { name: "glow", type: "'once' | 'pulse' | 'focus' | 'off'", default: "'once'", description: 'variant="ai" only. The light that sweeps round the border: "once" sweeps one lap shortly after the box appears, then rests for good (focus does not set it off again); "pulse" sweeps every 2.5s while idle and once on focus; "focus" only on focus; "off" none. Reduced motion draws none.' },
  { name: "leading", type: "ReactNode", description: 'variant="ai" only. Actions before the field, such as an attach button. Unlike leadingIcon, interactive content is fine here.' },
  { name: "trailing", type: "ReactNode", description: 'variant="ai" only. Actions after the field, such as a mic and a send button.' },
  { name: "...rest", type: "InputHTMLAttributes<HTMLInputElement>", description: "Every native <input> attribute." },
];

export default function InputPage() {
  return (
    <article>
      <PageHeader title="Input" description="Text input with optional label, help text, and icon slots, plus an AI prompt box variant." />

      <div className="space-y-10">
        <a
          href="#ai-prompt-box"
          className="flex w-fit items-center gap-2 rounded-full border border-line-subtle bg-surface px-3.5 py-1.5 text-sm text-ink transition-colors hover:border-line-default"
        >
          <span className="rounded-full bg-ink px-2 py-0.5 text-[11px] font-medium leading-none text-surface">New</span>
          Input AI: the prompt box with a light round the border
          <span aria-hidden="true">↓</span>
        </a>

        <ComponentPreview code={BASIC}>
          <div className="w-72">
            <Input label="Email" placeholder="you@example.com" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex w-72 flex-col gap-3">
              <Input size="sm" placeholder="Small" />
              <Input size="md" placeholder="Medium" />
              <Input size="lg" placeholder="Large" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">States</h2>
          <ComponentPreview code={STATES}>
            <div className="flex w-72 flex-col gap-4">
              <Input label="Email" description="We'll never share it." />
              <Input label="Email" error="Enter a valid email address." defaultValue="not-an-email" />
              <Input label="Email" disabled defaultValue="you@example.com" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With an icon</h2>
          <ComponentPreview code={ICON}>
            <div className="w-72">
              <Input leadingIcon={<Mail size={16} />} placeholder="you@example.com" />
            </div>
          </ComponentPreview>
        </section>

        <section id="ai-prompt-box" className="scroll-mt-24">
          <h2 className="mb-3 text-lg font-semibold text-ink">AI prompt box</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>variant=&quot;ai&quot;</code> turns the input into the &quot;Ask anything&quot; box of an AI product: a pill with a larger 16px
            field and room for buttons on either side. Put them in <code>leading</code> and <code>trailing</code> (an attach button, a mic, and a send
            button that replaces the mic once there is text). A thin light, in an ember gradient from a cool indigo tail to a hot gold head, sweeps
            once round the border shortly after the box appears, then rests; it never keeps moving, and focus only draws a static ember border. It follows the border&apos;s own path, so
            it works at every size. It reads the theme tokens, so light, dark and glass need nothing extra. Give it an <code>aria-label</code> when
            there is no visible label.
          </p>
          <ComponentPreview code={AI}>
            <PromptInputDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">AI glow</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>glow</code> picks when the light runs. By default it sweeps one lap and rests, so it never competes with the rest of the page.
            <code>&quot;pulse&quot;</code> repeats every 2.5s while idle, which is usually too much motion, so reach for it only on a screen
            with nothing else going on. Under <code>prefers-reduced-motion</code> it draws none, and nothing else changes.
          </p>
          <ComponentPreview code={AI_GLOW}>
            <div className="flex w-full max-w-xl flex-col gap-4">
              <PromptInputDemo glow="once" placeholder="glow=once (default)" />
              <PromptInputDemo glow="pulse" placeholder="glow=pulse" />
              <PromptInputDemo glow="focus" placeholder="glow=focus" />
              <PromptInputDemo glow="off" placeholder="glow=off" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/input" />
    </article>
  );
}
