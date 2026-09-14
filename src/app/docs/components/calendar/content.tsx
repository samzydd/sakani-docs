"use client";

import { useState } from "react";
import { Calendar } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

/** The package defines this shape for range mode but doesn't re-export the
 *  type yet, so it's declared here rather than imported. */
type DateRange = { from?: Date; to?: Date };

/** Hoisted out of render: new Date() during render is impure, and these
 *  only need to be computed once for the bounded example below. */
const TODAY = new Date();
const IN_90_DAYS = new Date(TODAY.getTime() + 90 * 864e5);

const BASIC = `const [date, setDate] = useState<Date>();

<Calendar value={date} onChange={setDate} />`;

const RANGE = `const [range, setRange] = useState<DateRange>({});

<Calendar mode="range" range={range} onRangeChange={setRange} />`;

const DROPDOWNS = `// Faster than clicking through months for distant dates.
<Calendar headerType="dropdowns" />`;

const BOUNDS = `<Calendar
  minDate={new Date()}
  maxDate={new Date(Date.now() + 90 * 864e5)}
/>`;

const PROPS = [
  { name: "mode", type: "'single' | 'range'", default: "'single'", description: "Range mode uses range/onRangeChange instead of value/onChange." },
  { name: "value", type: "Date", description: "Selected date, single mode." },
  { name: "onChange", type: "(date: Date) => void", description: "Fires on select, single mode." },
  { name: "range", type: "{ from?: Date; to?: Date }", description: "Selected range, range mode. Both ends are optional while the user is mid-selection." },
  { name: "onRangeChange", type: "(range: DateRange) => void", description: "Fires as the range is built, so expect a from-only value partway through." },
  { name: "headerType", type: "'arrows' | 'dropdowns'", default: "'arrows'", description: "Month navigation style." },
  { name: "defaultMonth", type: "Date", description: "Month shown on first render. Useful when the selection is far from today." },
  { name: "minDate", type: "Date", description: "Earliest selectable date." },
  { name: "maxDate", type: "Date", description: "Latest selectable date." },
];

function SingleDemo() {
  const [date, setDate] = useState<Date>();
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar value={date} onChange={setDate} />
      <p className="text-xs text-ink-subtle">
        {date ? date.toDateString() : "No date selected"}
      </p>
    </div>
  );
}

function RangeDemo() {
  const [range, setRange] = useState<DateRange>({});
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar mode="range" range={range} onRangeChange={setRange} />
      <p className="text-xs text-ink-subtle">
        {range.from ? range.from.toDateString() : "Pick a start"} →{" "}
        {range.to ? range.to.toDateString() : "pick an end"}
      </p>
    </div>
  );
}

export default function CalendarPage() {
  return (
    <article>
      <PageHeader title="Calendar" description="Date and date-range selection, with arrow or dropdown month navigation." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <SingleDemo />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Range mode</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>onRangeChange</code> fires while the range is still being
            built, so you&apos;ll receive <code>{"{ from }"}</code> with no{" "}
            <code>to</code> after the first click. Don&apos;t treat that as a
            complete selection — wait for both ends before acting on it.
          </p>
          <ComponentPreview code={RANGE}>
            <RangeDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Dropdown navigation</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Arrows are fine for dates near today. For a birth date or a
            far-future renewal, dropdowns save a lot of clicking.
          </p>
          <ComponentPreview code={DROPDOWNS}>
            <Calendar headerType="dropdowns" />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Limiting the range</h2>
          <ComponentPreview code={BOUNDS}>
            <Calendar minDate={TODAY} maxDate={IN_90_DAYS} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/calendar" />
    </article>
  );
}
