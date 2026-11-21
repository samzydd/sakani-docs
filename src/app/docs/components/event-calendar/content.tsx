"use client";

import { useState } from "react";
import { MonthCalendar, WeekCalendar, DayPanel, CalendarEvent, type CalendarEventData } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const NOW = new Date(2026, 10, 12, 10, 24);
const at = (d: number, h: number, m = 0) => new Date(2026, 10, d, h, m);
const EVENTS: CalendarEventData[] = [
  { id: "1", title: "Quarterly planning", start: at(11, 0), end: at(13, 23, 59), allDay: true, color: "green" },
  { id: "2", title: "Launch week", start: at(16, 0), end: at(20, 23, 59), allDay: true, color: "teal" },
  { id: "3", title: "Standup", start: at(12, 9, 15), end: at(12, 9, 30), color: "blue", location: "Google Meet" },
  { id: "4", title: "Design crit", start: at(12, 10), end: at(12, 10, 45), color: "purple", location: "Zoom" },
  { id: "5", title: "Investor update", start: at(12, 11, 30), end: at(12, 12, 30), color: "gold" },
  { id: "6", title: "Lunch with Sofia", start: at(12, 12, 30), end: at(12, 13, 30), color: "green", location: "Cafe Henri's" },
  { id: "7", title: "Customer interviews", start: at(12, 14), end: at(12, 15), color: "blue", location: "Zoom" },
  { id: "8", title: "Launch go or no-go", start: at(12, 16, 30), end: at(12, 17), color: "orange" },
  { id: "9", title: "Sprint planning", start: at(9, 9, 30), end: at(9, 10, 30), color: "blue", location: "Room 4B" },
  { id: "10", title: "1:1 with Marcus", start: at(9, 15), end: at(9, 15, 30), color: "purple" },
  { id: "11", title: "Launch checklist", start: at(11, 10), end: at(11, 11), color: "teal" },
  { id: "12", title: "Board prep", start: at(11, 15), end: at(11, 16, 30), color: "blue", location: "Room 2A" },
  { id: "13", title: "Farmers market", start: at(14, 10), end: at(14, 11, 30), color: "green" },
  { id: "14", title: "Brunch with Jasmine", start: at(15, 11), end: at(15, 12, 30), color: "green", location: "8 Bond St" },
  { id: "15", title: "Hiring sync", start: at(17, 10), end: at(17, 10, 45), color: "blue" },
  { id: "16", title: "Team offsite", start: at(20, 9), end: at(20, 17), color: "green", location: "Brooklyn Navy Yard" },
];

const EVENT = `type CalendarEventData = {
  id: string;
  title: string;
  start: Date;
  end: Date;                 // for an all-day event, its last day
  allDay?: boolean;          // all-day lane (week) or a bar (month)
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'teal' | 'gold' | 'red' | 'neutral';
  location?: string;
  meta?: unknown;            // your own row, a calendar id
};`;

const MONTH = `import { MonthCalendar } from '@sakaniui/react';

const [events, setEvents] = useState(initialEvents);
const [day, setDay] = useState(new Date());

<MonthCalendar
  events={events}
  selectedDate={day}
  onSelectedDateChange={setDay}
  onEventClick={(event, el) => openMyCard(event, el)}
  // a drag to another day, or Alt + arrows on a focused event
  onEventMove={(event, { start, end }) =>
    setEvents((all) => all.map((e) => (e.id === event.id ? { ...e, start, end } : e)))}
/>`;

const WEEK = `import { WeekCalendar } from '@sakaniui/react';

<WeekCalendar
  events={events}
  days={7}                 // 5 for a work week
  snapMinutes={15}         // a drag snaps to quarter hours
  height={640}             // the scrolling grid; it opens near 8 AM
  onEventClick={(event, el) => openMyCard(event, el)}
  onEventMove={(event, { start, end }) => save(event.id, start, end)}
  onSlotClick={(start) => newEventAt(start)}     // an empty slot was pressed
/>`;

const PANEL = `import { DayPanel } from '@sakaniui/react';

<DayPanel
  date={day}
  events={events}
  workHours={[9, 18]}      // free time is counted inside the working day
  onEventClick={openMyCard}
  onBlockFocus={(start, end) => addFocusTime(start, end)}   // a free gap of 30 minutes or more
  onCreate={(date) => newEventOn(date)}
/>`;

const SHAPES = `import { CalendarEvent } from '@sakaniui/react';

<CalendarEvent event={event} shape="chip" />     // a single-day timed event in a month cell
<CalendarEvent event={event} shape="bar" />      // all-day or multi-day
<CalendarEvent event={event} shape="block" />    // a timed event in the week grid`;

const MONTH_PROPS = [
  { name: "events", type: "CalendarEventData[]", description: "The events. You own them; the view reports changes." },
  { name: "date / defaultDate / onDateChange", type: "Date", description: "The month shown (any date in it). The header has previous, next and Today." },
  { name: "selectedDate / onSelectedDateChange", type: "Date | null", description: "The lit day, for a day panel beside the grid." },
  { name: "weekStartsOn", type: "0 | 1 | … | 6", default: "1", description: "0 = Sunday, 1 = Monday." },
  { name: "maxRows", type: "number", default: "4", description: "Rows of events a cell holds before it says \"N more\"." },
  { name: "onEventClick", type: "(event, el) => void", description: "An event was pressed. el is its element, to place a card beside it." },
  { name: "onEventMove", type: "(event, { start, end }) => void", description: "An event was dragged to another day, or moved with Alt + arrows (a day left and right, a week up and down)." },
  { name: "onMoreClick", type: "(date, el) => void", description: "\"N more\" was pressed (and its button, to place a card beside it)." },
  { name: "activeEventId", type: "string | null", description: "The event whose card is open: it stays lit." },
  { name: "today / hideHeader", type: "Date / boolean", description: "Today for the highlight (default: now). Hide the header to draw your own." },
];
const WEEK_PROPS = [
  { name: "events", type: "CalendarEventData[]", description: "The events. All-day and multi-day events go in the lane under the day heads." },
  { name: "date / defaultDate / onDateChange", type: "Date", description: "Any date in the week shown." },
  { name: "days", type: "5 | 7", default: "7", description: "A work week shows the first five days." },
  { name: "weekStartsOn", type: "0 | 1 | … | 6", default: "1", description: "0 = Sunday, 1 = Monday." },
  { name: "hourHeight / scrollToHour / height", type: "number", default: "48 / 8 / 640", description: "Pixels per hour, the hour the grid opens at, and the height of the scrolling grid." },
  { name: "snapMinutes", type: "number", default: "15", description: "A drag, and Alt + up or down, move by this many minutes." },
  { name: "onEventClick / onEventMove", type: "callbacks", description: "As in the month view. A drag moves across days and times; touch drags work too." },
  { name: "onSlotClick", type: "(start) => void", description: "An empty slot was pressed: the time under the pointer, snapped." },
  { name: "now / activeEventId", type: "Date / string | null", description: "The current time, for the line and Today (default: the real time, and it moves). The event whose card is open." },
];
const PANEL_PROPS = [
  { name: "date / events", type: "Date / CalendarEventData[]", description: "The day and the events (it picks those on that day)." },
  { name: "workHours", type: "[start, end]", default: "[9, 18]", description: "The working day, in hours: booked and free time are counted inside it." },
  { name: "minGap", type: "number", default: "30", description: "The smallest free gap offered, in minutes." },
  { name: "onEventClick / onBlockFocus / onCreate", type: "callbacks", description: "An event was pressed; Block focus time was pressed on a gap (start, end); New event was pressed." },
];

function Live({ children }: { children: (events: CalendarEventData[], move: (e: CalendarEventData, n: { start: Date; end: Date }) => void) => React.ReactNode }) {
  const [events, setEvents] = useState(EVENTS);
  return <>{children(events, (e, n) => setEvents((all) => all.map((x) => (x.id === e.id ? { ...x, ...n } : x))))}</>;
}

export default function EventCalendarPage() {
  const [day, setDay] = useState<Date | null>(NOW);
  return (
    <article>
      <PageHeader title="Event Calendar" description="Month and week calendars that show events, with drag to move and a day panel for busy time and free gaps." />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        <a className="underline underline-offset-2" href="/docs/components/calendar">Calendar</a> is a date picker; these show a schedule. They own no data:
        you pass <code>events</code> and the view reports what the person did (a click, a drag) through callbacks, so it works with any backend. Events
        are coloured from the chart tokens, which follow light and dark. For finished screens see the <a className="underline underline-offset-2" href="/docs/blocks/calendar">Calendar blocks</a>.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">An event</h2>
          <ComponentPreview code={EVENT}>
            <p className="text-sm text-ink-muted">Plain data. <code>meta</code> carries anything of yours (a calendar id, your row).</p>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Month</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Chips for timed events, bars across the days for all-day and multi-day ones, &ldquo;N more&rdquo; when a day is full, a lit day. Drag a chip or a
            bar to another day; with a keyboard, focus it and press <kbd>Alt</kbd> + an arrow.
          </p>
          <ComponentPreview code={MONTH}>
            <Live>
              {(events, move) => (
                <div style={{ width: 980, height: 640 }}>
                  <MonthCalendar events={events} defaultDate={NOW} today={NOW} selectedDate={day} onSelectedDateChange={setDay} onEventMove={move} />
                </div>
              )}
            </Live>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Week</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A time grid: events as tall as they are long, overlapping ones side by side, all-day events in a lane under the day heads, and a line for the current
            time. Drag an event to another day or time (it snaps to 15 minutes), or move it with <kbd>Alt</kbd> + arrows.
          </p>
          <ComponentPreview code={WEEK}>
            <Live>
              {(events, move) => (
                <div style={{ width: 980 }}>
                  <WeekCalendar events={events} defaultDate={NOW} now={NOW} onEventMove={move} height={560} />
                </div>
              )}
            </Live>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Day panel</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Put it beside either view. It says how many events there are and how much of the working day is booked and free, draws the day as a strip, lists the
            schedule, and offers each free gap as a <strong>Block focus time</strong> button.
          </p>
          <ComponentPreview code={PANEL}>
            <div style={{ width: 340 }}>
              <DayPanel date={NOW} today={NOW} events={EVENTS} onBlockFocus={() => {}} onCreate={() => {}} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Calendar Event</h2>
          <p className="mb-3 text-sm text-ink-muted">The event as the views draw it, in three shapes. Use it to build your own agenda or list.</p>
          <ComponentPreview code={SHAPES}>
            <div className="flex w-[320px] flex-col gap-3">
              <CalendarEvent event={EVENTS[3]} shape="chip" />
              <CalendarEvent event={EVENTS[0]} shape="bar" />
              <div style={{ height: 70 }}><CalendarEvent event={EVENTS[6]} shape="block" /></div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>Every event is a button whose label carries its title, time and place. The week and month grids have their own labels; today is marked.</li>
            <li>Moving an event never needs a pointer: focus it and press <kbd>Alt</kbd> + an arrow. The same callback fires as for a drag.</li>
            <li>Colour is never the only signal: an event always has its title, and the day panel lists the time and place as text.</li>
            <li>A week grid you drag on takes over touch on the events themselves (<code>touch-action: none</code>), so give people the keyboard or your own card as another way to move them.</li>
          </ul>
        </section>

        <section><h2 className="mb-3 text-lg font-semibold text-ink">MonthCalendar props</h2><PropsTable rows={MONTH_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">WeekCalendar props</h2><PropsTable rows={WEEK_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">DayPanel props</h2><PropsTable rows={PANEL_PROPS} /></section>
      </div>

      <Pager current="/docs/components/event-calendar" />
    </article>
  );
}
