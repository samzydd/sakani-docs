"use client";

import { useState } from "react";
import { Toast, Button } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Toast status="success" title="Changes saved" />`;

const STATUSES = `<Toast status="success" title="Deployed to production" description="v0.3.3 is live." />
<Toast status="error" title="Upload failed" description="The file exceeded the 5MB limit." />
<Toast status="info" title="Scheduled maintenance" description="Tonight, 01:00–02:00 UTC." />`;

const DISMISS = `// The x button only renders when you pass onDismiss.
<Toast
  status="info"
  title="Two seats left on your plan"
  onDismiss={() => remove(id)}
/>`;

const QUEUE = `// Toast is presentational: you own the queue and the timers.
const [toasts, setToasts] = useState<Item[]>([]);

const push = (item: Item) => {
  const id = crypto.randomUUID();
  setToasts((t) => [...t, { ...item, id }]);
  setTimeout(() => dismiss(id), 4000);
};

<div className="fixed bottom-4 right-4 flex flex-col gap-2">
  {toasts.map((t) => (
    <Toast key={t.id} {...t} onDismiss={() => dismiss(t.id)} />
  ))}
</div>`;

const PROPS = [
  { name: "status", type: "'success' | 'error' | 'info'", default: "'info'", description: "Sets the leading icon and its tint." },
  { name: "title", type: "string", description: "Headline text." },
  { name: "description", type: "string", description: "Supporting line under the title." },
  { name: "onDismiss", type: "() => void", description: "Fires when the x is clicked. The button only renders if this is set." },
];

type Item = { id: string; status: "success" | "error" | "info"; title: string };

function QueueDemo() {
  const [toasts, setToasts] = useState<Item[]>([]);
  const dismiss = (id: string) => setToasts((t) => t.filter((x) => x.id !== id));
  const push = () => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, status: "success", title: "Changes saved" }]);
    setTimeout(() => dismiss(id), 4000);
  };

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Button size="sm" variant="secondary" onClick={push}>
        Trigger a toast
      </Button>
      <div className="flex w-full flex-col gap-2">
        {toasts.map((t) => (
          <Toast key={t.id} status={t.status} title={t.title} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
      {toasts.length === 0 && (
        <p className="text-xs text-ink-muted">Each one clears itself after 4s.</p>
      )}
    </div>
  );
}

export default function ToastPage() {
  return (
    <article>
      <PageHeader title="Toast" description="A transient notification. Presentational only: queueing, timing, and positioning stay with your app." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <Toast status="success" title="Changes saved" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Statuses</h2>
          <ComponentPreview code={STATUSES}>
            <div className="flex w-full max-w-sm flex-col gap-3">
              <Toast status="success" title="Deployed to production" description="v0.3.3 is live." />
              <Toast status="error" title="Upload failed" description="The file exceeded the 5MB limit." />
              <Toast status="info" title="Scheduled maintenance" description="Tonight, 01:00–02:00 UTC." />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Dismissible</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The close button is tied to <code>onDismiss</code>: no handler, no
            button. A toast that auto-expires doesn&apos;t need one.
          </p>
          <ComponentPreview code={DISMISS}>
            <div className="w-full max-w-sm">
              <Toast status="info" title="Two seats left on your plan" onDismiss={() => {}} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Building a queue</h2>
          <p className="mb-3 text-sm text-ink-muted">
            There&apos;s no provider or <code>toast()</code> function here on
            purpose: stacking rules, timers, and where they appear differ enough
            per app that owning the list yourself is simpler than configuring
            someone else&apos;s.
          </p>
          <ComponentPreview code={QUEUE}>
            <QueueDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/toast" />
    </article>
  );
}
