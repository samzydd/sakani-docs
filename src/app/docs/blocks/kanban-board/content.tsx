"use client";

import { KanbanBoardBlock } from "@sakaniui/react/blocks";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Pager } from "@/components/docs/pager";

const CODE = `import { KanbanBoardBlock } from '@sakaniui/react/blocks';

<KanbanBoardBlock />`;

export default function KanbanBoardBlockPage() {
  return (
    <article>
      <PageHeader title="Kanban Board" description="A project-management board with columns, cards, and drag states — the Data & Content category's block." />

      <div className="doc-prose mb-8">
        <p>
          Ships with a <code>state</code> prop demonstrating{" "}
          <code>default | loading | empty-column | dragging</code> — copy{" "}
          <a
            href="https://github.com/samzydd/Sakani-design-system/blob/main/src/blocks/KanbanBoardBlock/KanbanBoardBlock.tsx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-2"
          >
            the source <ExternalLink size={13} />
          </a>{" "}
          in to wire real drag-and-drop and your own columns.
        </p>
      </div>

      <ComponentPreview code={CODE} fullBleed>
        <KanbanBoardBlock />
      </ComponentPreview>

      <Pager current="/docs/blocks/kanban-board" />
    </article>
  );
}
