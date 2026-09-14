"use client";

import { useState } from "react";
import { ChevronRight, FileText, Folder } from "lucide-react";
import { ListItem, Avatar, Badge } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<ListItem title="Q3 forecast" description="Updated 2 hours ago" />`;

const SLOTS = `<ListItem
  leading={<Avatar size="sm" initials="AK" />}
  title="Amara Chen"
  description="amara@sakani.com"
  trailing={<Badge variant="success" emphasis="subtle">Active</Badge>}
/>`;

const SELECTABLE = `const [selected, setSelected] = useState("inbox");

<ListItem
  leading={<Folder size={16} />}
  title="Inbox"
  selected={selected === "inbox"}
  onClick={() => setSelected("inbox")}
/>`;

const PROPS = [
  { name: "title", type: "string", description: "Primary line." },
  { name: "description", type: "string", description: "Secondary line under the title." },
  { name: "leading", type: "ReactNode", description: "Left slot: an avatar, icon, or checkbox." },
  { name: "trailing", type: "ReactNode", description: "Right slot: a badge, chevron, or action." },
  { name: "selected", type: "boolean", default: "false", description: "Marks the row as the current selection." },
  { name: "disabled", type: "boolean", default: "false", description: "Dims the row and drops its click handler." },
  { name: "onClick", type: "() => void", description: "Click handler." },
];

function SelectableDemo() {
  const [selected, setSelected] = useState("inbox");
  return (
    <div className="w-full max-w-sm">
      {[
        { id: "inbox", title: "Inbox", description: "12 unread" },
        { id: "drafts", title: "Drafts", description: "3 items" },
        { id: "archive", title: "Archive", description: "218 items" },
      ].map((row) => (
        <ListItem
          key={row.id}
          leading={<Folder size={16} />}
          title={row.title}
          description={row.description}
          selected={selected === row.id}
          onClick={() => setSelected(row.id)}
        />
      ))}
    </div>
  );
}

export default function ListItemPage() {
  return (
    <article>
      <PageHeader title="List Item" description="A row with leading and trailing slots, for lists that aren't tabular enough to be a table." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <ListItem title="Q3 forecast" description="Updated 2 hours ago" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">List or table?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A{" "}
            <a href="/docs/components/table" className="font-medium text-ink underline underline-offset-2">Table</a>{" "}
            is for comparing the same fields down a column. Use list items when
            each row is a thing rather than a record — files, conversations,
            settings — and nobody needs to scan one attribute vertically.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Slots</h2>
          <ComponentPreview code={SLOTS}>
            <div className="flex w-full max-w-sm flex-col">
              <ListItem
                leading={<Avatar size="sm" initials="AK" />}
                title="Amara Chen"
                description="amara@sakani.com"
                trailing={
                  <Badge variant="success" emphasis="subtle">
                    Active
                  </Badge>
                }
              />
              <ListItem
                leading={<FileText size={16} />}
                title="Contract.pdf"
                description="2.4 MB"
                trailing={<ChevronRight size={16} />}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Selection</h2>
          <ComponentPreview code={SELECTABLE}>
            <SelectableDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/list-item" />
    </article>
  );
}
