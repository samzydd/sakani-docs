"use client";

import { KanbanBoardBlock } from "@sakaniui/react/blocks";
import { IconExternalLink as ExternalLink } from "@sakaniui/react/icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Pager } from "@/components/docs/pager";

const CODE = `import { KanbanBoardBlock } from '@sakaniui/react/blocks';

<KanbanBoardBlock />`;

export default function KanbanBoardBlockPage() {
  return (
    <article>
      <PageHeader title="Kanban Board" description="A project-management board with columns, cards and smooth drag and drop: the Data & Content category's block." />

      <div className="doc-prose mb-8">
        <p>
          Ships with a <code>state</code> prop demonstrating{" "}
          <code>default | loading | empty-column | dragging</code>. Copy{" "}
          <a
            href="https://github.com/samzydd/Sakani-design-system/blob/main/src/blocks/KanbanBoardBlock/KanbanBoardBlock.tsx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-2"
          >
            the source <ExternalLink size={13} />
          </a>{" "}
          in to use your own columns and data.
        </p>
        <p>
          Drag a card in the preview: it lifts and swings with your movement, a dashed ghost of the card opens
          exactly where it will land while the other cards slide out of the way, and on release it glides into
          place. Mouse, pen and touch (press and hold) all work; the board scrolls at its edges, a card dropped
          outside a column springs back, and reduced motion turns the swing off.
        </p>
      </div>

      <ComponentPreview code={CODE} fullBleed>
        <KanbanBoardBlock />
      </ComponentPreview>

      <Pager current="/docs/blocks/kanban-board" />
    </article>
  );
}
