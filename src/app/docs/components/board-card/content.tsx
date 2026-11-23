"use client";

import { IconCalendar as Calendar, IconFlag as Flag, IconMessage as MessageSquare } from "@sakaniui/react/icons";
import {
  BoardCard,
  BoardColumn,
  CardMetaItem,
  Badge,
  Checkbox,
  AvatarGroup,
  Skeleton,
} from "@sakaniui/react";
import { avatarImages } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CARD = `<BoardCard
  leading={<Checkbox />}
  title="Design system update"
  description="Enhance component consistency and usability"
  trailing={<Flag size={14} />}
  tags={<Badge variant="accent" emphasis="subtle">Design</Badge>}
  meta={
    <>
      <CardMetaItem icon={<Calendar size={13} />}>Jan 25</CardMetaItem>
      <CardMetaItem icon={<MessageSquare size={13} />}>4</CardMetaItem>
    </>
  }
  assignees={<AvatarGroup size="sm" max={3} avatars={[{ src: "/amara.jpg" }, { src: "/chidi.jpg" }]} />}
/>`;

const TYPES = `<BoardCard type="compact" title="KYC flow review" leading={<Checkbox />} />
<BoardCard type="default" title="Icon library audit" description="Normalize stroke widths" />`;

const MOVE = `const stages = [
  { id: 'todo', label: 'To-do', color: 'var(--color-chart-1)' },
  { id: 'progress', label: 'In progress', color: 'var(--color-chart-2)' },
  { id: 'review', label: 'In review', color: 'var(--color-chart-4)' },
  { id: 'done', label: 'Done', color: 'var(--color-success-solid)' },
];

<BoardCard
  type="compact"
  title="KYC flow review"
  stages={stages}
  stage="progress"
  onMoveTo={(id) => moveCard(card.id, id)}
/>`;

const COLUMN = `<BoardColumn title="In progress" count={2} dotColor="var(--color-chart-2)">
  <BoardCard type="compact" title="Icon library audit" leading={<Checkbox />} />
  <BoardCard type="compact" title="Search performance" leading={<Checkbox />} />
</BoardColumn>`;

const STATES = `<BoardColumn title="Done" count={0} state="empty" />
<BoardColumn title="Backlog" state="loading">
  <BoardCard type="compact" title={<Skeleton width={140} />} />
  <BoardCard type="default" title={<Skeleton width={180} />} description={<Skeleton width="100%" />} />
</BoardColumn>`;

const CARD_PROPS = [
  { name: "title", type: "ReactNode", description: "Card title. Required." },
  { name: "type", type: "'compact' | 'default' | 'cover'", default: "'default'", description: "Compact drops description and tags; cover adds media on top." },
  { name: "state", type: "'default' | 'hover' | 'selected' | 'dragging' | 'done'", default: "'default'", description: "Presentational only — dragging styles the card but implements no drag behaviour." },
  { name: "leading", type: "ReactNode", description: "Identity slot: checkbox, avatar, status dot." },
  { name: "trailing", type: "ReactNode", description: "Priority icon, menu trigger, or status." },
  { name: "description", type: "ReactNode", description: "Body copy. Default and cover types." },
  { name: "tags", type: "ReactNode", description: "Badge elements. Default and cover types." },
  { name: "meta", type: "ReactNode", description: "CardMetaItem elements, e.g. due date and comment count." },
  { name: "assignees", type: "ReactNode", description: "Avatar or AvatarGroup, right-aligned in the footer." },
  { name: "cover", type: "ReactNode", description: "Cover media, for type=\"cover\"." },
  { name: "stages", type: "{ id, label, color? }[]", description: "Every stage the card can be in, in order. With stage and onMoveTo, adds a quiet Move to button (⇄) at the top right of the card that opens a short list of the stages." },
  { name: "stage", type: "string", description: "The id of the stage the card is in: marked with a check in the menu." },
  { name: "onMoveTo", type: "(stageId: string) => void", description: "A stage was chosen, from the menu or with Alt + → / Alt + ← on the focused card. The card only reports it: you move it." },
  { name: "moveDisabled", type: "boolean", description: "Hides the button and ignores the shortcuts while a move or a drag is under way." },
];

const COLUMN_PROPS = [
  { name: "title", type: "ReactNode", description: "Column heading." },
  { name: "count", type: "ReactNode", description: "Count beside the title — a number or a Badge." },
  { name: "dotColor", type: "string", default: "var(--color-chart-1)", description: "Status dot colour. Any CSS colour, so prefer a chart token over a literal hex." },
  { name: "state", type: "'default' | 'empty' | 'loading'", default: "'default'", description: "Empty shows a drop zone; loading styles the column for placeholder cards — pass Skeleton-filled BoardCards as children." },
  { name: "children", type: "ReactNode", description: "BoardCard elements." },
  { name: "onAdd / onMenu", type: "() => void", description: "The + and ⋯ buttons in the header." },
];

const META_PROPS = [
  { name: "icon", type: "ReactNode", description: "A 13px icon element." },
  { name: "children", type: "ReactNode", description: "The value beside it." },
];

export default function BoardCardPage() {
  return (
    <article>
      <PageHeader title="Board Card" description="The card, column, and meta row that a kanban board is assembled from." />

      <div className="space-y-10">
        <ComponentPreview code={CARD}>
          <div className="w-full max-w-sm">
            <BoardCard
              leading={<Checkbox />}
              title="Design system update"
              description="Enhance component consistency and usability"
              trailing={<Flag size={14} />}
              tags={
                <Badge variant="accent" emphasis="subtle">
                  Design
                </Badge>
              }
              meta={
                <>
                  <CardMetaItem icon={<Calendar size={13} />}>Jan 25</CardMetaItem>
                  <CardMetaItem icon={<MessageSquare size={13} />}>4</CardMetaItem>
                </>
              }
              assignees={
                <AvatarGroup size="sm" max={3} avatars={[{ src: avatarImages.AK }, { src: avatarImages.DO }]} />
              }
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Dragging is a look, not a behaviour</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>state=&quot;dragging&quot;</code> styles a lifted card and
            nothing more — no drag handling, no drop targets. Wire that up
            yourself (the{" "}
            <a href="/docs/blocks/kanban-board" className="font-medium text-ink underline underline-offset-2">Kanban Board</a>{" "}
            block shows one way with native HTML5 drag events), which is what
            keeps dnd-kit or react-dnd a drop-in choice rather than a fight.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Moving to the next stage</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pass <code>stages</code>, <code>stage</code> and <code>onMoveTo</code> and the card&apos;s header gets a
            small, quiet <strong>Move to</strong> button (⇄) at the top right, beside the flag. It is always there, so
            nothing shifts on hover and the footer keeps its layout, and it works the same on touch. It opens a short list of the stages, each with its colour: the card&apos;s own stage has a check
            and the next one is highlighted to start with. <kbd>↑</kbd> <kbd>↓</kbd> or a number pick, <kbd>Enter</kbd>
            moves, and <kbd>Alt</kbd> + <kbd>→</kbd> / <kbd>←</kbd> on the focused card
            skip the menu. The card only reports the choice: moving it (and sliding it across) is up to you; the{" "}
            <a href="/docs/blocks/kanban-board" className="font-medium text-ink underline underline-offset-2">Kanban Board</a>{" "}
            block shows it.
          </p>
          <ComponentPreview code={MOVE}>
            <div className="px-10 pb-40 pt-6">
              <BoardCard
                type="compact"
                leading={<Checkbox />}
                title="KYC flow review"
                trailing={<Flag size={14} color="var(--color-warning-fg)" />}
                assignees={<AvatarGroup size="sm" max={2} avatars={[{ src: avatarImages.AK }]} />}
                stages={[
                  { id: "todo", label: "To-do", color: "var(--color-chart-1)" },
                  { id: "progress", label: "In progress", color: "var(--color-chart-2)" },
                  { id: "review", label: "In review", color: "var(--color-chart-4)" },
                  { id: "done", label: "Done", color: "var(--color-success-solid)" },
                ]}
                stage="progress"
                onMoveTo={() => {}}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Card types</h2>
          <ComponentPreview code={TYPES}>
            <div className="flex w-full max-w-sm flex-col gap-3">
              <BoardCard type="compact" title="KYC flow review" leading={<Checkbox />} />
              <BoardCard
                type="default"
                title="Icon library audit"
                description="Normalize stroke widths across 1,600 glyphs"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Columns</h2>
          <ComponentPreview code={COLUMN}>
            <div className="w-80 max-w-full">
              <BoardColumn title="In progress" count={2} dotColor="var(--color-chart-2)">
                <BoardCard type="compact" title="Icon library audit" leading={<Checkbox />} />
                <BoardCard type="compact" title="Search performance" leading={<Checkbox />} />
              </BoardColumn>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Empty and loading columns</h2>
          <ComponentPreview code={STATES}>
            <div className="flex w-full flex-wrap items-start justify-center gap-6">
              <div className="w-80 max-w-full shrink-0">
                <BoardColumn title="Done" count={0} state="empty" />
              </div>
              <div className="w-80 max-w-full shrink-0">
                <BoardColumn title="Backlog" state="loading">
                  <BoardCard type="compact" title={<Skeleton width={140} />} />
                  <BoardCard type="default" title={<Skeleton width={180} />} description={<Skeleton width="100%" />} />
                </BoardColumn>
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">BoardCard props</h2>
          <PropsTable rows={CARD_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">BoardColumn props</h2>
          <PropsTable rows={COLUMN_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">CardMetaItem props</h2>
          <PropsTable rows={META_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/board-card" />
    </article>
  );
}
