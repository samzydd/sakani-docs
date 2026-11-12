"use client";

import { ToolCall } from "@sakaniui/react";
import { ToolCallLiveDemo } from "@/components/docs/ai-chat-demos";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `<ToolCall
  status={running ? 'running' : 'done'}
  name="search_crm"
  args={'(query="Acme Corp")'}
  duration={running ? undefined : '1.2s'}
  input={{ query: 'Acme Corp', limit: 5 }}
  output={running ? undefined : { results: 3, top: 'Acme Corp' }}
/>`;
const CODE_1 = `<ToolCall status="running" name="search_crm" args={'(query="Acme")'} defaultOpen input={…} />
<ToolCall status="done" name="search_crm" duration="1.2s" defaultOpen input={…} output={…} />
<ToolCall status="error" name="send_email" duration="0.4s" defaultOpen input={…} output="403: not allowed to send from this address" />`;

const PROPS = [
  {"name": "status", "type": "'running' | 'done' | 'error'", "default": "'done'", "description": "A turning ray spinner, a green check, or a red cross."},
  {"name": "name", "type": "string", "description": "The tool's name, shown in code: \"search_crm\"."},
  {"name": "args", "type": "string", "description": "The arguments, in code, muted: (query=\"Acme Corp\")."},
  {"name": "duration", "type": "string", "description": "\"1.2s\"."},
  {"name": "input", "type": "unknown", "description": "The call's input: a string, or any value (shown as JSON)."},
  {"name": "output", "type": "unknown", "description": "The call's output: a string, or any value (shown as JSON)."},
  {"name": "open", "type": "boolean", "description": "Controlled open state."},
  {"name": "defaultOpen", "type": "boolean", "default": "false", "description": "Initial open state."},
  {"name": "onOpenChange", "type": "(open: boolean) => void", "description": "Called when the row is toggled."},
  {"name": "className", "type": "string", "description": "Extra class on the root."},
];

export default function ToolCallPage() {
  return (
    <article>
      <PageHeader title={"Tool Call"} description={"The row an agent leaves when it calls a tool: a status mark, the call in code, its duration, and the input and output when open."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">It is presentational: set <code>status</code> and <code>duration</code> as the call progresses. <code>input</code> and <code>output</code> take a string, or any value (it is shown as formatted JSON). While running the output reads "Waiting for the result…"; on error it is tinted.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Running, then done</h2>
          <p className="mb-3 text-sm text-ink-muted">Update <code>status</code>, <code>duration</code> and <code>output</code> as the call finishes. This loops.</p>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <ToolCallLiveDemo />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Statuses</h2>
          <p className="mb-3 text-sm text-ink-muted">Running, done and error, each opened to its panels.</p>
          <ComponentPreview code={CODE_1}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <div className="w-full max-w-lg space-y-3">
                <ToolCall status="running" name="search_crm" args={'(query="Acme")'} defaultOpen input={{ query: "Acme Corp", limit: 5 }} />
                <ToolCall status="done" name="search_crm" args={'(query="Acme")'} duration="1.2s" defaultOpen input={{ query: "Acme Corp", limit: 5 }} output={{ results: 3, top: "Acme Corp (Enterprise, $48,000)" }} />
                <ToolCall status="error" name="send_email" duration="0.4s" defaultOpen input={{ to: "jo@acme.com" }} output="403: not allowed to send from this address" />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/tool-call" />
    </article>
  );
}
