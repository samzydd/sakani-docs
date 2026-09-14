"use client";

import { Calendar, Flag, MessageSquare } from "lucide-react";
import {
  BoardCard,
  BoardColumn,
  CardMetaItem,
  Badge,
  Checkbox,
  AvatarGroup,
} from "@sakaniui/react";
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
  assignees={<AvatarGroup size="sm" max={3} avatars={[{ initials: "AK" }, { initials: "DO" }]} />}
/>`;

const TYPES = `<BoardCard type="compact" title="KYC flow review" leading={<Checkbox />} />
<BoardCard type="default" title="Icon library audit" description="Normalize stroke widths" />`;

const COLUMN = `<BoardColumn title="In progress" count={2} dotColor="var(--color-chart-2)">
  <BoardCard type="compact" title="Icon library audit" leading={<Checkbox />} />
  <BoardCard type="compact" title="Search performance" leading={<Checkbox />} />
</BoardColumn>`;

const STATES = `<BoardColumn title="Done" count={0} state="empty" />
<BoardColumn title="Backlog" state="loading" />`;

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
];

const COLUMN_PROPS = [
  { name: "title", type: "ReactNode", description: "Column heading." },
  { name: "count", type: "ReactNode", description: "Count beside the title — a number or a Badge." },
  { name: "dotColor", type: "string", default: "var(--color-chart-1)", description: "Status dot colour. Any CSS colour, so prefer a chart token over a literal hex." },
  { name: "state", type: "'default' | 'empty' | 'loading'", default: "'default'", description: "Empty shows a drop zone; loading shows card skeletons." },
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
                <AvatarGroup size="sm" max={3} avatars={[{ initials: "AK" }, { initials: "DO" }]} />
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
            <div className="w-full max-w-xs">
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
            <div className="flex w-full flex-wrap gap-4">
              <div className="w-full max-w-[16rem]">
                <BoardColumn title="Done" count={0} state="empty" />
              </div>
              <div className="w-full max-w-[16rem]">
                <BoardColumn title="Backlog" state="loading" />
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
