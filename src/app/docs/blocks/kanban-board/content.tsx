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
            href="https://github.com/samzydd/Sakaniui/blob/main/src/blocks/KanbanBoardBlock/KanbanBoardBlock.tsx"
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
        <h2>Move to the next stage</h2>
        <p>
          Dragging is not the only way. Hover or focus a card and a round button appears on its right edge: click it
          and the card slides to the top of the next column. The column it left closes up, a slot opens, and the card
          lands with a short highlight in the new column&apos;s colour while both counts tick. Hover the button and
          it opens into a pill that names the stage (&ldquo;In progress&rdquo;). A button on the left edge moves it
          back, and the last column has no &ldquo;next&rdquo;.
        </p>
        <p>
          From the keyboard, focus a card (<kbd>Tab</kbd>) and press <kbd>Alt</kbd> + <kbd>→</kbd> or{" "}
          <kbd>Alt</kbd> + <kbd>←</kbd>; focus stays on the card so you can press again. Each move is announced to
          screen readers (&ldquo;Retention rate by 23% moved to In progress, position 1 of 6&rdquo;). On touch the
          &ldquo;next&rdquo; button stays on every card, since there is no hover. With reduced motion the card
          moves without the slide. <code>onTaskMove</code> reports every move, by drag or by button, so you can save it.
        </p>
        <p>
          The button belongs to <a href="/docs/components/board-card" className="font-medium text-ink underline underline-offset-2">BoardCard</a>:
          give any card <code>onMoveNext</code> and <code>nextLabel</code> and it appears.
        </p>
      </div>

      <ComponentPreview code={CODE} fullBleed>
        <KanbanBoardBlock />
      </ComponentPreview>

      <Pager current="/docs/blocks/kanban-board" />
    </article>
  );
}
