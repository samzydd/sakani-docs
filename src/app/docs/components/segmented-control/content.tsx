"use client";

import { useState } from "react";
import { SegmentedControl } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<SegmentedControl
  defaultValue="week"
  options={[
    { value: "day", label: "Day" },
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
  ]}
/>`;

const FULL_WIDTH = `<SegmentedControl
  fullWidth
  defaultValue="active"
  options={[
    { value: "active", label: "Active" },
    { value: "archived", label: "Archived" },
    { value: "all", label: "All" },
  ]}
/>`;

const CONTROLLED = `const [range, setRange] = useState("week");

<SegmentedControl
  value={range}
  onChange={setRange}
  options={[
    { value: "week", label: "Week" },
    { value: "month", label: "Month" },
    { value: "quarter", label: "Quarter" },
  ]}
/>`;

const PROPS = [
  { name: "options", type: "{ value: string; label: string }[]", description: "The segments, in order." },
  { name: "value", type: "string", description: "Controlled selected value." },
  { name: "defaultValue", type: "string", description: "Uncontrolled initial value." },
  { name: "onChange", type: "(value: string) => void", description: "Fires with the newly selected value." },
  { name: "fullWidth", type: "boolean", default: "false", description: "Stretches the track to fill its container; segments then share the width equally." },
];

function ControlledDemo() {
  const [range, setRange] = useState("week");
  return (
    <div className="flex flex-col items-center gap-3">
      <SegmentedControl
        value={range}
        onChange={setRange}
        options={[
          { value: "week", label: "Week" },
          { value: "month", label: "Month" },
          { value: "quarter", label: "Quarter" },
        ]}
      />
      <p className="text-xs text-ink-muted">Showing the last {range}</p>
    </div>
  );
}

export default function SegmentedControlPage() {
  return (
    <article>
      <PageHeader title="Segmented Control" description="A compact single choice among a few peers, where all the options are worth showing at once." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <SegmentedControl
            defaultValue="week"
            options={[
              { value: "day", label: "Day" },
              { value: "week", label: "Week" },
              { value: "month", label: "Month" },
            ]}
          />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Against Tabs and Radio</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Use this to filter or re-scope the view you&apos;re already looking
            at. Use{" "}
            <a href="/docs/components/tabs" className="font-medium text-ink underline underline-offset-2">Tabs</a>{" "}
            to switch between genuinely different panels, and{" "}
            <a href="/docs/components/radio" className="font-medium text-ink underline underline-offset-2">Radio</a>{" "}
            when the choice is part of a form being submitted. Past four or five
            options it gets cramped — reach for{" "}
            <a href="/docs/components/select" className="font-medium text-ink underline underline-offset-2">Select</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Full width</h2>
          <ComponentPreview code={FULL_WIDTH}>
            <div className="w-full max-w-md">
              <SegmentedControl
                fullWidth
                defaultValue="active"
                options={[
                  { value: "active", label: "Active" },
                  { value: "archived", label: "Archived" },
                  { value: "all", label: "All" },
                ]}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Controlled</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>onChange</code> hands you the value directly, not an event.
          </p>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/segmented-control" />
    </article>
  );
}
