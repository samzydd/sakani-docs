"use client";

import { Info, Settings, Trash } from "lucide-react";
import { Tooltip, IconButton, Button } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Tooltip title="Delete this lead">
  <IconButton icon={Trash} variant="ghost" aria-label="Delete" />
</Tooltip>`;

const SUBTITLE = `<Tooltip title="Sync now" subtitle="Last synced 4 minutes ago">
  <Button variant="secondary" size="sm">Sync</Button>
</Tooltip>`;

const POINTERS = `<Tooltip title="Top" pointer="top-center">…</Tooltip>
<Tooltip title="Right" pointer="center-right">…</Tooltip>
<Tooltip title="Bottom" pointer="bottom-center">…</Tooltip>
<Tooltip title="Left" pointer="center-left">…</Tooltip>`;

const COLLAPSED = `// The pattern the CRM block uses for its icon-rail sidebar:
// the icon alone carries no label, so the tooltip supplies it.
<Tooltip title="Settings" pointer="center-right">
  <IconButton icon={Settings} variant="ghost" aria-label="Settings" />
</Tooltip>`;

const PROPS = [
  { name: "title", type: "string", description: "Tooltip headline. Required." },
  { name: "subtitle", type: "string", description: "Optional supporting line." },
  { name: "pointer", type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'center-left' | 'center-right'", default: "'top-center'", description: "Which edge the bubble points from, and so which side of the trigger it sits on." },
  { name: "children", type: "ReactNode", description: "The element the tooltip attaches to." },
];

export default function TooltipPage() {
  return (
    <article>
      <PageHeader title="Tooltip" description="A hover/focus label for controls whose purpose isn't already written on them." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Tooltip title="Delete this lead">
            <IconButton icon={Trash} variant="ghost" aria-label="Delete" />
          </Tooltip>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Not a replacement for a label</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A tooltip is supplementary: it never appears on touch, and it
            can&apos;t be the only way to know what a control does. Icon-only
            buttons still need their own <code>aria-label</code> — the tooltip
            is for sighted mouse users on top of that, not instead of it.
          </p>
          <ComponentPreview code={COLLAPSED}>
            <Tooltip title="Settings" pointer="center-right">
              <IconButton icon={Settings} variant="ghost" aria-label="Settings" />
            </Tooltip>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With a subtitle</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Use the subtitle for state the trigger can&apos;t show — when
            something last ran, why it&apos;s disabled.
          </p>
          <ComponentPreview code={SUBTITLE}>
            <Tooltip title="Sync now" subtitle="Last synced 4 minutes ago">
              <Button variant="secondary" size="sm">
                Sync
              </Button>
            </Tooltip>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Pointer position</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pick the side with room. In a left sidebar that means{" "}
            <code>center-right</code>; along the top of a page,{" "}
            <code>bottom-center</code>.
          </p>
          <ComponentPreview code={POINTERS}>
            <div className="flex flex-wrap items-center justify-center gap-10 py-6">
              <Tooltip title="Top" pointer="top-center">
                <IconButton icon={Info} variant="outline" aria-label="Top" />
              </Tooltip>
              <Tooltip title="Right" pointer="center-right">
                <IconButton icon={Info} variant="outline" aria-label="Right" />
              </Tooltip>
              <Tooltip title="Bottom" pointer="bottom-center">
                <IconButton icon={Info} variant="outline" aria-label="Bottom" />
              </Tooltip>
              <Tooltip title="Left" pointer="center-left">
                <IconButton icon={Info} variant="outline" aria-label="Left" />
              </Tooltip>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/tooltip" />
    </article>
  );
}
