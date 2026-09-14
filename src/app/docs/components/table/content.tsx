"use client";

import { Table, Badge, Avatar } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

interface Customer {
  name: string;
  email: string;
  plan: string;
  status: "active" | "trial" | "churned";
}

const ROWS: Customer[] = [
  { name: "Amara Kalu", email: "amara@fintra.co", plan: "Pro", status: "active" },
  { name: "Ravi Menon", email: "ravi@loopline.io", plan: "Team", status: "trial" },
  { name: "Chidi Duru", email: "chidi@bexa.dev", plan: "Pro", status: "churned" },
];

const statusVariant = { active: "success", trial: "warning", churned: "danger" } as const;

const BASIC = `import { Table, Badge, Avatar } from '@sakaniui/react';

const columns = [
  { key: 'name', header: 'Customer', render: (row) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Avatar size="sm" initials={row.name.split(' ').map((n) => n[0]).join('')} />
      {row.name}
    </div>
  ) },
  { key: 'plan', header: 'Plan' },
  { key: 'status', header: 'Status', render: (row) => (
    <Badge variant={statusVariant[row.status]} emphasis="subtle">{row.status}</Badge>
  ) },
];

<Table columns={columns} rows={rows} />`;

const PROPS = [
  { name: "columns", type: "TableColumn<T>[]", description: "Column definitions: key, header, optional render()." },
  { name: "rows", type: "T[]", description: "The row data." },
  { name: "selectable", type: "boolean", default: "false", description: "Adds a checkbox column for row selection." },
  { name: "reorderable", type: "boolean", default: "false", description: "Enables drag-to-reorder on rows." },
  { name: "bordered", type: "boolean", default: "true", description: "Draws the table's own container border/radius." },
  { name: "responsive", type: "'auto' | 'default' | 'stacked'", default: "'auto'", description: "'auto' switches to a stacked card layout below 640px." },
];

export default function TablePage() {
  return (
    <article>
      <PageHeader title="Table" description="A generic, selectable data table: column definitions drive fully custom cell rendering." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-xl">
            <Table<Customer>
              columns={[
                {
                  key: "name",
                  header: "Customer",
                  render: (row) => (
                    <div className="flex items-center gap-2">
                      <Avatar size="sm" initials={row.name.split(" ").map((n) => n[0]).join("")} />
                      {row.name}
                    </div>
                  ),
                },
                { key: "plan", header: "Plan" },
                {
                  key: "status",
                  header: "Status",
                  render: (row) => (
                    <Badge variant={statusVariant[row.status]} emphasis="subtle">
                      {row.status}
                    </Badge>
                  ),
                },
              ]}
              rows={ROWS}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/table" />
    </article>
  );
}
