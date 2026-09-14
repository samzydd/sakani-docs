"use client";

import { useState } from "react";
import { FilterChip } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<FilterChip type="default">Status</FilterChip>
<FilterChip type="active" onRemove={clear}>Status: Active</FilterChip>
<FilterChip type="add">Add filter</FilterChip>`;

const BAR = `const [filters, setFilters] = useState(["Status: Active", "Role: Admin"]);

<div className="flex flex-wrap items-center gap-2">
  {filters.map((f) => (
    <FilterChip
      key={f}
      type="active"
      onRemove={() => setFilters(filters.filter((x) => x !== f))}
    >
      {f}
    </FilterChip>
  ))}
  <FilterChip type="add" onClick={openPicker}>Add filter</FilterChip>
</div>`;

const PROPS = [
  { name: "type", type: "'default' | 'active' | 'add'", default: "'default'", description: "Default is an unset filter, active is one with a value (and an ×), add is the dashed affordance for adding another." },
  { name: "children", type: "ReactNode", description: "Chip label. For an active chip, include the value: \"Status: Active\", not just \"Status\"." },
  { name: "onClick", type: "() => void", description: "Fires when the chip body is clicked, for opening its menu or the filter picker." },
  { name: "onRemove", type: "() => void", description: "Fires when the × on an active chip is clicked." },
];

function BarDemo() {
  const [filters, setFilters] = useState(["Status: Active", "Role: Admin"]);
  return (
    <div className="flex w-full max-w-md flex-wrap items-center gap-2">
      {filters.map((f) => (
        <FilterChip key={f} type="active" onRemove={() => setFilters(filters.filter((x) => x !== f))}>
          {f}
        </FilterChip>
      ))}
      <FilterChip
        type="add"
        onClick={() => setFilters((f) => [...f, `Owner: Me`].slice(0, 3))}
      >
        Add filter
      </FilterChip>
      {filters.length === 0 && (
        <span className="text-xs text-ink-subtle">No filters applied.</span>
      )}
    </div>
  );
}

export default function FilterChipPage() {
  return (
    <article>
      <PageHeader title="Filter Chip" description="The chips in a filter bar: unset, applied, and the affordance for adding another." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="flex flex-wrap items-center gap-2">
            <FilterChip type="default">Status</FilterChip>
            <FilterChip type="active" onRemove={() => {}}>
              Status: Active
            </FilterChip>
            <FilterChip type="add">Add filter</FilterChip>
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Put the value in the label</h2>
          <p className="mb-3 text-sm text-ink-muted">
            An active chip reading just &quot;Status&quot; tells you a filter is
            on but not what it&apos;s filtering to. &quot;Status: Active&quot;
            means the bar can be read at a glance without opening anything.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">A whole filter bar</h2>
          <ComponentPreview code={BAR}>
            <BarDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/filter-chip" />
    </article>
  );
}
