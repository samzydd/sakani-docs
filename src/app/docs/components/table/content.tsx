"use client";

import { Table, Badge, Avatar, IconButton } from "@sakaniui/react";
import { IconTrash } from "@sakaniui/react/icons";
import { avatarImages } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

interface Customer {
  name: string;
  email: string;
  plan: string;
  status: "active" | "trial" | "churned";
  avatar: string;
}

const ROWS: Customer[] = [
  { name: "Amara Kalu", email: "amara@fintra.co", plan: "Pro", status: "active", avatar: avatarImages.AK },
  { name: "Ravi Menon", email: "ravi@loopline.io", plan: "Team", status: "trial", avatar: avatarImages.PR },
  { name: "Chidi Duru", email: "chidi@bexa.dev", plan: "Pro", status: "churned", avatar: avatarImages.DO },
];

const statusVariant = { active: "success", trial: "warning", churned: "danger" } as const;

interface ActionRow {
  id: number;
  name: string;
  /** A column that is not data still needs a key that exists on the row type. */
  actions?: never;
}

const ACTION_ROWS: ActionRow[] = [
  { id: 1, name: "Olivia Carter" },
  { id: 2, name: "Noah Kim" },
];

const ACTIONS = `import { Table, IconButton, type TableColumn } from '@sakaniui/react';
import { IconTrash } from '@sakaniui/react/icons';

type Row = { id: number; name: string; actions?: never };

const rows: Row[] = [{ id: 1, name: 'Olivia Carter' }];

const columns: TableColumn<Row>[] = [
  { key: 'name', header: 'Customer' },
  {
    key: 'actions',
    header: '',
    align: 'right',
    render: (row) => <IconButton icon={IconTrash} variant="destructive" size="sm" aria-label={\`Delete \${row.name}\`} />,
  },
];

export const Example = () => <Table columns={columns} rows={rows} />;`;

const BASIC = `import { Table, Badge, Avatar } from '@sakaniui/react';

const columns = [
  { key: 'name', header: 'Customer', render: (row) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Avatar size="sm" src={row.avatar} />
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
                      <Avatar size="sm" src={row.avatar} alt="" />
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
          <h2 className="mb-1 text-lg font-semibold text-ink">A column that is not data</h2>
          <p className="mb-3 max-w-2xl text-sm text-ink-muted">
            <code>Table&lt;T&gt;</code> is generic: every column&apos;s <code>key</code> must be a field of your row
            type (<code>keyof T &amp; string</code>). A delete button or a menu is not data, so give the row type an
            optional <code>never</code> field for it and render the control. A key that is not on the row type does
            not compile.
          </p>
          <ComponentPreview code={ACTIONS}>
            <div className="w-full max-w-xl">
              <Table<ActionRow>
                columns={[
                  { key: "name", header: "Customer" },
                  {
                    key: "actions",
                    header: "",
                    align: "right",
                    render: (row) => (
                      <IconButton icon={IconTrash} variant="destructive" size="sm" aria-label={`Delete ${row.name}`} />
                    ),
                  },
                ]}
                rows={ACTION_ROWS}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/table" />
    </article>
  );
}
