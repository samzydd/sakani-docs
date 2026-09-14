"use client";

import { useState } from "react";
import { CodeSnippet } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const SAMPLE = `npm install @sakaniui/react`;

const MULTILINE = `import { Button } from '@sakaniui/react';

export function Example() {
  return <Button variant="primary">Get started</Button>;
}`;

const BASIC = `<CodeSnippet code="npm install @sakaniui/react" />`;

const FILENAME = `// A filename turns on the header — and with it, the copy button.
<CodeSnippet filename="example.tsx" code={source} onCopy={track} />`;

const EDITABLE = `const [code, setCode] = useState(source);

<CodeSnippet
  editable
  code={code}
  onChange={setCode}
  filename="playground.tsx"
  placeholder="Write some code…"
/>`;

const PROPS = [
  { name: "code", type: "string", description: "The snippet body." },
  { name: "filename", type: "string", description: "Setting it shows the header row, which is also where the copy button lives." },
  { name: "onCopy", type: "(code: string) => void", description: "Fires after a successful copy, for analytics or a toast." },
  { name: "editable", type: "boolean", default: "false", description: "Lets people type into the block. Read-only otherwise." },
  { name: "onChange", type: "(code: string) => void", description: "Fires per keystroke. Only meaningful when editable." },
  { name: "placeholder", type: "string", description: "Shown when editable and empty." },
];

function EditableDemo() {
  const [code, setCode] = useState(MULTILINE);
  return (
    <div className="w-full max-w-lg">
      <CodeSnippet editable code={code} onChange={setCode} filename="playground.tsx" />
      <p className="mt-2 text-xs text-ink-subtle">{code.length} characters</p>
    </div>
  );
}

export default function CodeSnippetPage() {
  return (
    <article>
      <PageHeader title="Code Snippet" description="A code block with an optional filename header, copy button, and an editable mode." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-lg">
            <CodeSnippet code={SAMPLE} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">No syntax highlighting</h2>
          <p className="mb-3 text-sm text-ink-muted">
            This renders plain monospaced text — it doesn&apos;t tokenise or
            colour code, and takes no language prop. That keeps a highlighter
            out of the bundle for the common case of showing an install command.
            For highlighted blocks, run the code through Shiki or Prism yourself
            (this docs site does exactly that in its own CodeBlock).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Filename and copy</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The copy button lives in the header, so it only appears once{" "}
            <code>filename</code> is set.
          </p>
          <ComponentPreview code={FILENAME}>
            <div className="w-full max-w-lg">
              <CodeSnippet filename="example.tsx" code={MULTILINE} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Editable</h2>
          <ComponentPreview code={EDITABLE}>
            <EditableDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/code-snippet" />
    </article>
  );
}
