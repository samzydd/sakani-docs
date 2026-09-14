"use client";

import { Popover, Button, Input } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Popover
  trigger={<Button variant="secondary" size="sm">Share</Button>}
  title="Share this board"
  description="Anyone with the link can view it."
/>`;

const ACTIONS = `<Popover
  trigger={<Button variant="destructive" size="sm">Delete</Button>}
  title="Delete this lead?"
  description="This can't be undone."
  actions={
    <>
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button variant="destructive" size="sm">Delete</Button>
    </>
  }
/>`;

const CHILDREN = `<Popover
  trigger={<Button variant="outline" size="sm">Invite</Button>}
  title="Invite a teammate"
  actions={<Button variant="primary" size="sm">Send invite</Button>}
>
  <Input size="sm" placeholder="name@company.com" />
</Popover>`;

const PLACEMENT = `<Popover placement="bottom-start" … />
<Popover placement="bottom-end" … />
<Popover placement="top" … />`;

const PROPS = [
  { name: "trigger", type: "ReactNode", description: "The element that toggles the panel. Rendered as-is, so pass a real button." },
  { name: "title", type: "string", description: "Panel heading." },
  { name: "description", type: "string", description: "Supporting line under the title." },
  { name: "children", type: "ReactNode", description: "Arbitrary panel body, rendered under the description." },
  { name: "actions", type: "ReactNode", description: "Footer actions, typically one to three buttons." },
  { name: "placement", type: "'bottom' | 'top' | 'bottom-start' | 'bottom-end'", default: "'bottom'", description: "Where the panel opens relative to the trigger." },
];

export default function PopoverPage() {
  return (
    <article>
      <PageHeader title="Popover" description="A small panel anchored to a trigger, for content that needs more room than a tooltip and less ceremony than a modal." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Popover
            trigger={
              <Button variant="secondary" size="sm">
                Share
              </Button>
            }
            title="Share this board"
            description="Anyone with the link can view it."
          />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Popover, tooltip, or modal?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A{" "}
            <a href="/docs/components/tooltip" className="font-medium text-ink underline underline-offset-2">Tooltip</a>{" "}
            names a control and vanishes; you can&apos;t click into it. A popover
            holds interactive content but leaves the page behind it usable. A
            modal blocks the page, which you want only when the task genuinely
            can&apos;t be abandoned halfway.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With actions</h2>
          <ComponentPreview code={ACTIONS}>
            <Popover
              trigger={
                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              }
              title="Delete this lead?"
              description="This can't be undone."
              actions={
                <>
                  <Button variant="ghost" size="sm">
                    Cancel
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </>
              }
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Custom body</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>children</code> render below the description, so you can put a
            field, a list, or anything else inside.
          </p>
          <ComponentPreview code={CHILDREN}>
            <Popover
              trigger={
                <Button variant="outline" size="sm">
                  Invite
                </Button>
              }
              title="Invite a teammate"
              actions={
                <Button variant="primary" size="sm">
                  Send invite
                </Button>
              }
            >
              <Input size="sm" placeholder="name@company.com" />
            </Popover>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Placement</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Use the <code>-start</code> and <code>-end</code> variants to keep a
            panel from running off the edge when its trigger sits near one.
          </p>
          <ComponentPreview code={PLACEMENT}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Popover
                placement="bottom-start"
                trigger={<Button variant="outline" size="sm">bottom-start</Button>}
                title="Aligned to the left edge"
              />
              <Popover
                placement="bottom-end"
                trigger={<Button variant="outline" size="sm">bottom-end</Button>}
                title="Aligned to the right edge"
              />
              <Popover
                placement="top"
                trigger={<Button variant="outline" size="sm">top</Button>}
                title="Opens upward"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/popover" />
    </article>
  );
}
