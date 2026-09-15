"use client";

import { useState } from "react";
import {
  OnboardingProgressBlock,
  FileUploadPanelBlock,
  ChatInterfaceBlock,
  FormModalBlock,
  MultistepModalBlock,
} from "@sakaniui/react/blocks";
import { Button } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const ONBOARDING = `<OnboardingProgressBlock
  items={[
    { label: 'Profile', progress: 100 },
    { label: 'Team', progress: 60 },
    { label: 'Integrations', progress: 0 },
  ]}
/>`;

const UPLOAD = `<FileUploadPanelBlock onFilesChange={setFiles} />`;

const CHAT = `<ChatInterfaceBlock />`;

const MODALS = `const [open, setOpen] = useState(false);

// Both modal blocks are controlled: they render nothing until open is true.
<FormModalBlock open={open} onClose={() => setOpen(false)} />
<MultistepModalBlock open={open} onClose={() => setOpen(false)} />`;

const STEPS = [
  { label: "Profile", progress: 100 },
  { label: "Team", progress: 60 },
  { label: "Integrations", progress: 0 },
];

function ModalDemo() {
  const [form, setForm] = useState(false);
  const [multi, setMulti] = useState(false);
  return (
    <div className="flex w-full items-center justify-center gap-3 py-6">
      <Button variant="secondary" size="sm" onClick={() => setForm(true)}>
        Open form modal
      </Button>
      <Button variant="secondary" size="sm" onClick={() => setMulti(true)}>
        Open multistep modal
      </Button>
      <FormModalBlock open={form} onClose={() => setForm(false)} />
      <MultistepModalBlock open={multi} onClose={() => setMulti(false)} />
    </div>
  );
}

export default function PanelsPage() {
  return (
    <article>
      <PageHeader
        title="Panels & Flows"
        description="Onboarding progress, a file-upload panel, a chat interface, and two modal flows."
      />

      <div className="doc-prose mb-8">
        <p>
          Self-contained panels that drop into an existing screen. The two modal
          blocks are the exception to blocks usually managing their own state:
          they&apos;re controlled, so nothing renders until you pass{" "}
          <code>open</code>.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={ONBOARDING} fullBleed>
          <OnboardingProgressBlock items={STEPS} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">File upload panel</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Like the{" "}
            <a href="/docs/components/file-upload" className="font-medium text-ink underline underline-offset-2">FileUpload</a>{" "}
            component it wraps, this selects files and reports them back —
            sending them is still your app&apos;s job.
          </p>
          <ComponentPreview code={UPLOAD} fullBleed>
            <FileUploadPanelBlock />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Chat interface</h2>
          <ComponentPreview code={CHAT} fullBleed>
            <ChatInterfaceBlock />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Modal flows</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Both reuse{" "}
            <a href="/docs/components/modal" className="font-medium text-ink underline underline-offset-2">Modal</a>&apos;s
            portal and focus trap rather than reimplementing them, which is why
            they take the same <code>open</code>/<code>onClose</code> pair.
          </p>
          <ComponentPreview code={MODALS} fullBleed>
            <ModalDemo />
          </ComponentPreview>
        </section>

        <BlockSource
          blocks={[
            "OnboardingProgressBlock",
            "FileUploadPanelBlock",
            "ChatInterfaceBlock",
            "FormModalBlock",
            "MultistepModalBlock",
          ]}
        />
      </div>

      <Pager current="/docs/blocks/panels" />
    </article>
  );
}
