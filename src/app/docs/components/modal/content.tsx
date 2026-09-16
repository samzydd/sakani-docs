"use client";

import { useState } from "react";
import { Modal, Button, Input } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Rename workspace</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Rename workspace"
  description="Everyone on the team will see the new name."
  confirmLabel="Save"
  onConfirm={save}
/>`;

const DESTRUCTIVE = `<Modal
  variant="destructive"
  open={open}
  onClose={close}
  title="Delete this workspace?"
  description="All 482 records will be permanently removed. This can't be undone."
  confirmLabel="Delete workspace"
  onConfirm={destroy}
/>`;

const FORM = `// children render between the description and the footer,
// so a form reuses the portal, focus trap and dark-mode plumbing.
<Modal open={open} onClose={close} title="Invite a teammate" confirmLabel="Send invite">
  <Input label="Email" placeholder="name@company.com" />
</Modal>`;

const LOADING = `<Modal
  open={open}
  onClose={close}
  title="Publishing…"
  confirmLabel="Publish"
  confirmLoading={saving}
  closeOnEscape={!saving}
  closeOnBackdropClick={!saving}
/>`;

const PROPS = [
  { name: "open", type: "boolean", description: "Whether the dialog is shown. Fully controlled." },
  { name: "onClose", type: "() => void", description: "Fires from the ×, Escape, and backdrop click." },
  { name: "title", type: "string", description: "Dialog heading." },
  { name: "description", type: "string", description: "Supporting copy under the title." },
  { name: "variant", type: "'default' | 'destructive'", default: "'default'", description: "Destructive adds a warning icon and tints the confirm button." },
  { name: "icon", type: "ReactNode", description: "Overrides the destructive variant's TriangleAlert." },
  { name: "children", type: "ReactNode", description: "Custom body between the description and the footer." },
  { name: "confirmLabel / cancelLabel", type: "string", description: "Footer button labels." },
  { name: "onConfirm", type: "() => void", description: "Confirm handler." },
  { name: "onCancel", type: "() => void", default: "onClose", description: "Cancel handler; falls back to onClose." },
  { name: "confirmLoading", type: "boolean", default: "false", description: "Puts the confirm button in its loading state." },
  { name: "closeOnEscape", type: "boolean", default: "true", description: "Set false to force a decision." },
  { name: "closeOnBackdropClick", type: "boolean", default: "true", description: "Set false to force a decision." },
];

function BasicDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
        Rename workspace
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Rename workspace"
        description="Everyone on the team will see the new name."
        confirmLabel="Save"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}

function DestructiveDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        Delete workspace
      </Button>
      <Modal
        variant="destructive"
        open={open}
        onClose={() => setOpen(false)}
        title="Delete this workspace?"
        description="All 482 records will be permanently removed. This can't be undone."
        confirmLabel="Delete workspace"
        onConfirm={() => setOpen(false)}
      />
    </>
  );
}

function FormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Invite a teammate
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Invite a teammate"
        confirmLabel="Send invite"
        onConfirm={() => setOpen(false)}
      >
        <Input label="Email" placeholder="name@company.com" />
      </Modal>
    </>
  );
}

export default function ModalPage() {
  return (
    <article>
      <PageHeader title="Modal" description="A blocking dialog with a focus trap, for decisions that can't be deferred." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <BasicDemo />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Use it sparingly</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A modal takes the whole page hostage. That&apos;s the right trade
            for a destructive confirmation or a short required form, and the
            wrong one for anything browsable — a{" "}
            <a href="/docs/components/popover" className="font-medium text-ink underline underline-offset-2">Popover</a>{" "}
            leaves the page behind it usable.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Destructive</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Name the consequence in the title and quantify it in the
            description. &quot;Delete this workspace?&quot; with &quot;all 482
            records&quot; is answerable; &quot;Are you sure?&quot; isn&apos;t.
          </p>
          <ComponentPreview code={DESTRUCTIVE}>
            <DestructiveDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Custom body</h2>
          <ComponentPreview code={FORM}>
            <FormDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">While an action is in flight</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Turn off <code>closeOnEscape</code> and{" "}
            <code>closeOnBackdropClick</code> while confirming, so a stray
            click can&apos;t dismiss the dialog mid-request and leave people
            unsure whether it went through.
          </p>
          <ComponentPreview code={LOADING}>
            <p className="text-sm text-ink-muted">See the code tab.</p>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/modal" />
    </article>
  );
}
