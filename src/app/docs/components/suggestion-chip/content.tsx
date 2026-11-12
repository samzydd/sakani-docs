"use client";

import { SuggestionChip } from "@sakaniui/react";
import { IconChartBar, IconMail } from "@sakaniui/react/icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `<SuggestionChip variant="starter" index={0} icon={IconChartBar} label="Summarise my pipeline" hint="Deals by stage, and what is at risk" onClick={() => ask('Summarise my pipeline')} />
<SuggestionChip variant="starter" index={1} icon={IconMail} label="Draft a renewal email" hint="For the Acme account" />`;
const CODE_1 = `<SuggestionChip label="Draft the messages" onClick={…} />
<SuggestionChip label="Show stalled deals" onClick={…} />`;

const PROPS = [
  {"name": "variant", "type": "'starter' | 'follow-up'", "default": "'follow-up'", "description": "A card with a hint, or a pill with an arrow."},
  {"name": "label", "type": "string", "description": "The prompt. For a starter it is the title."},
  {"name": "hint", "type": "string", "description": "Starter only: a one-line hint under the title."},
  {"name": "icon", "type": "IconComponent", "description": "Starter: the icon in the tile. Follow-up: defaults to an arrow."},
  {"name": "index", "type": "number", "description": "Starter: its place in the row, so each rises 50ms after the one before."},
  {"name": "onClick", "type": "MouseEventHandler", "description": "Every native button attribute is forwarded."},
];

export default function SuggestionChipPage() {
  return (
    <article>
      <PageHeader title={"Suggestion Chip"} description={"A suggested prompt: a starter card for the empty screen, or a follow-up pill under a reply."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">Choosing one is up to you: fill the prompt box with <code>label</code> and send it. Starters rise 8px and fade in 50ms apart when you give each an <code>index</code>; hover lifts a chip 1px and strengthens its border.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Starter</h2>
          <p className="mb-3 text-sm text-ink-muted">A card with an icon tile, a title and a one-line hint. Give each an <code>index</code> so they arrive one after another.</p>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <SuggestionChip variant="starter" index={0} icon={IconChartBar} label="Summarise my pipeline" hint="Deals by stage, and what is at risk" />
              <SuggestionChip variant="starter" index={1} icon={IconMail} label="Draft a renewal email" hint="For the Acme account" />
            </div>
          </ComponentPreview>
        </section>
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Follow-up</h2>
          <p className="mb-3 text-sm text-ink-muted">A pill with an arrow, for under a reply.</p>
          <ComponentPreview code={CODE_1}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <SuggestionChip label="Draft the messages" />
              <SuggestionChip label="Show stalled deals" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/suggestion-chip" />
    </article>
  );
}
