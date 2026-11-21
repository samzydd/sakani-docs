"use client";

import { WeekCalendarBlock, MonthCalendarBlock } from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const WEEK = `import { WeekCalendarBlock } from '@sakaniui/react/blocks';

<WeekCalendarBlock
  events={events}              // each event's meta.calendar names one of your calendars
  calendars={calendars}        // [{ id: 'work', name: 'Work', color: 'blue', group: 'Northwind' }, ...]
  onEventsChange={save}        // the whole list, after a move, a calendar change or a delete
  onCreate={(start) => openComposer(start)}
/>`;
const MONTH = `import { MonthCalendarBlock } from '@sakaniui/react/blocks';

<MonthCalendarBlock events={events} calendars={calendars} onEventsChange={save} onCreate={(date) => openComposer(date)} />`;

const PROPS = [
  { name: "events", type: "CalendarEventData[]", description: "The events. Each one's meta.calendar is the id of one of the calendars. Defaults to a sample month." },
  { name: "calendars", type: "{ id, name, color, group? }[]", description: "The calendars an event can belong to: the choices on its card." },
  { name: "defaultDate / now / today", type: "Date", description: "The first day shown, and a fixed \"now\" (week) or \"today\" (month) for documentation and tests." },
  { name: "defaultView (week)", type: "'week' | 'work-week'", default: "'week'", description: "Week or Work week in the header switch." },
  { name: "onEventsChange", type: "(events) => void", description: "Called with the whole list after a move, a calendar change in the card, or a delete." },
  { name: "onCreate", type: "(start?) => void", description: "New event, or an empty slot (week)." },
  { name: "height", type: "number | string", default: "720 (week) / auto (month)", description: "The height of the whole block." },
];

export default function CalendarBlocksPage() {
  return (
    <article>
      <PageHeader title="Calendar" description="The week as a time grid, or the month as a grid of events, each in a finished card with a header." />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        Built from <code>WeekCalendar</code>, <code>MonthCalendar</code> and <code>CalendarEvent</code>, plus <code>SegmentedControl</code> and <code>Button</code>.
        Each has a header (the month, a line about what is in view, previous / Today / next and New event) and a card that opens on an event: when, where,
        which calendar, Delete and Done. The data is plain props, so you feed it from your own query and save what <code>onEventsChange</code> hands back.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Week</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Click an event for its card, drag it to another day or time, or switch to Work week.
          </p>
          <ComponentPreview code={WEEK} scaleToFit>
            <div style={{ width: 1280 }}>
              <WeekCalendarBlock />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Month</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Click an event for its card, drag it to another day, or click &ldquo;N more&rdquo; to see that day&apos;s events as a short list.
          </p>
          <ComponentPreview code={MONTH} scaleToFit>
            <div style={{ width: 1280 }}>
              <MonthCalendarBlock />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>Every event is a button; a focused event moves with <kbd>Alt</kbd> + arrows, and its card closes with Escape.</li>
            <li>The card&apos;s calendar choices are a radio group; the &ldquo;N more&rdquo; list is a dialog of buttons, one per event.</li>
            <li>The header says what is in view as text (&ldquo;14 events this week&rdquo;), so a screen reader gets the summary without the grid.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props (both blocks)</h2>
          <PropsTable rows={PROPS} />
        </section>

        <BlockSource blocks={["CalendarBlocks/WeekCalendarBlock", "CalendarBlocks/MonthCalendarBlock"]} path={(name) => name.split("/")[0]} />
      </div>

      <Pager current="/docs/blocks/calendar" />
    </article>
  );
}
