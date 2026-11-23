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
        <h2>Move a card to another stage</h2>
        <p>
          Dragging is not the only way. Each card has a small, quiet <strong>Move to</strong> button (⇄) at its top right,
          beside the priority flag. It is always there (so nothing shifts on hover and the avatars stay put) and it opens a short list of the stages, each with its colour: the card&apos;s own stage has a check,
          and the next stage is highlighted to start with, so a click moves the card on; pick any other to send it
          there.
        </p>
        <p>
          The card slides across into that column at its own height, settles, then glides up to the top while the cards
          around it make room: no jump, and a move across several columns simply takes a little longer. The new
          column&apos;s colour rings the card as it lands and both counts tick.
        </p>
        <p>
          With a keyboard: <kbd>↑</kbd> <kbd>↓</kbd> or a number key choose a stage, <kbd>Enter</kbd> moves, <kbd>Esc</kbd> closes. On a focused card, <kbd>Alt</kbd> + <kbd>→</kbd> / <kbd>←</kbd> move it one stage
          without the menu, and focus stays on the card. Each move is announced to screen readers. With reduced motion the card moves without the slide. <code>onTaskMove</code> reports
          every move, by drag or by menu, so you can save it.
        </p>
        <h2>Move several cards at once</h2>
        <p>
          Tick the checkbox on a few cards (or Cmd / Ctrl-click them; once some are picked, a plain click adds or
          removes one). They take an accent border and a bar rises at the bottom of the board: how many are selected,{" "}
          <strong>Move to</strong>, and × to let go (or <kbd>Esc</kbd>).
        </p>
        <p>
          <strong>Move to</strong>, in the bar or on any selected card, sends them all in a wave: each card lifts, arcs
          across to the new column and settles at the top, a beat after the one before. <strong>Drag</strong> one of
          them instead and the rest fly in and gather under it as a fanned deck with a count, while the columns they
          left close up. Drop the deck on a column and it deals out into the list, card by card.
        </p>
        <p>
          The button and its menu belong to <a href="/docs/components/board-card" className="font-medium text-ink underline underline-offset-2">BoardCard</a>:
          give any card <code>stages</code>, <code>stage</code> and <code>onMoveTo</code>.
        </p>
      </div>

      <ComponentPreview code={CODE} fullBleed>
        <KanbanBoardBlock />
      </ComponentPreview>

      <Pager current="/docs/blocks/kanban-board" />
    </article>
  );
}
