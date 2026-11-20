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
  { name: "calendars", type: "{ id, name, color, group? }[]", description: "The calendars in the sidebar, with their on/off boxes. Unticking one hides its events." },
  { name: "workspace / user", type: "string / { name, email }", description: "The name at the top of the sidebar and the person at its foot." },
  { name: "defaultDate / now / today", type: "Date", description: "The first day shown, and a fixed \"now\" (week) or \"today\" (month) for documentation and tests." },
  { name: "defaultView (week)", type: "'week' | 'work-week'", default: "'week'", description: "Week or Work week in the header switch." },
  { name: "onEventsChange", type: "(events) => void", description: "Called with the whole list after a move, a calendar change in the card, a delete, or Block focus time (month)." },
  { name: "onCreate", type: "(start?) => void", description: "New event, or an empty slot (week), or New event on a day (month)." },
  { name: "height", type: "number | string", default: "760", description: "The height of the whole block." },
];

export default function CalendarBlocksPage() {
  return (
    <article>
      <PageHeader title="Calendar" description="Two full calendar screens: Week as a time grid, and Month with the selected day docked at the right." />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        Built from <code>WeekCalendar</code>, <code>MonthCalendar</code>, <code>DayPanel</code> and <code>CalendarEvent</code>, plus <code>Calendar</code>,{" "}
        <code>SegmentedControl</code>, <code>Button</code> and <code>Avatar</code>. Both have a sidebar (a mini month, your calendars with on/off boxes, the
        person) and a card that opens on an event: when, where, which calendar, Delete and Done. The data is plain props, so you feed it from your own query
        and save what <code>onEventsChange</code> hands back.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Week</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Click an event for its card, drag it to another day or time, untick a calendar in the sidebar, pick a day in the mini month, or switch to Work week.
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
            Click a day or &ldquo;N more&rdquo; and the panel at the right shows that day: how busy it is, its schedule and its free gaps. <strong>Block focus time</strong>{" "}
            turns a gap into an event. Drag an event to another day.
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
            <li>The calendar boxes are checkboxes with their names; the card&apos;s calendar choices are a radio group.</li>
            <li>The day panel lists the day as text, so a screen reader gets the schedule without the grid.</li>
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
