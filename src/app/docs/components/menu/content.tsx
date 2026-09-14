"use client";

import { Copy, Download, Pencil, Trash, Check } from "lucide-react";
import { Menu, MenuItem, Popover, Button } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Menu aria-label="Row actions">
  <MenuItem icon={<Pencil size={16} />} shortcut="⌘E">Edit</MenuItem>
  <MenuItem icon={<Copy size={16} />} shortcut="⌘D">Duplicate</MenuItem>
  <MenuItem icon={<Download size={16} />}>Export</MenuItem>
  <MenuItem icon={<Trash size={16} />} state="destructive">Delete</MenuItem>
</Menu>`;

const STATES = `<MenuItem>Default</MenuItem>
<MenuItem state="checked" icon={<Check size={16} />}>Checked</MenuItem>
<MenuItem state="disabled">Disabled</MenuItem>
<MenuItem state="destructive" icon={<Trash size={16} />}>Delete</MenuItem>`;

const IN_POPOVER = `// Menu renders the list, not the trigger or the positioning.
// Pair it with Popover to get an actual dropdown.
<Popover
  trigger={<Button variant="secondary" size="sm">Actions</Button>}
  placement="bottom-start"
>
  <Menu aria-label="Actions">
    <MenuItem icon={<Pencil size={16} />}>Edit</MenuItem>
    <MenuItem icon={<Trash size={16} />} state="destructive">Delete</MenuItem>
  </Menu>
</Popover>`;

const MENU_PROPS = [
  { name: "children", type: "ReactNode", description: "MenuItem elements." },
  { name: "aria-label", type: "string", description: "Names the menu for screen readers. Worth setting, since the trigger's label isn't attached to the list." },
  { name: "minWidth", type: "number", default: "208", description: "Minimum width in px, so short labels don't produce a cramped panel." },
];

const ITEM_PROPS = [
  { name: "children", type: "ReactNode", description: "Item label." },
  { name: "icon", type: "ReactNode", description: "Leading icon as an element, e.g. <Pencil size={16} />." },
  { name: "shortcut", type: "string", description: "Right-aligned keyboard hint. Display only: you still bind the key yourself." },
  { name: "state", type: "'default' | 'checked' | 'disabled' | 'destructive'", default: "'default'", description: "Checked marks a toggled option; destructive tints the row for irreversible actions." },
  { name: "onSelect", type: "() => void", description: "Fires when the item is chosen." },
];

export default function MenuPage() {
  return (
    <article>
      <PageHeader title="Menu" description="A list of actions, plus the items it's built from. Pair it with Popover for a real dropdown." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Menu aria-label="Row actions">
            <MenuItem icon={<Pencil size={16} />} shortcut="⌘E">
              Edit
            </MenuItem>
            <MenuItem icon={<Copy size={16} />} shortcut="⌘D">
              Duplicate
            </MenuItem>
            <MenuItem icon={<Download size={16} />}>Export</MenuItem>
            <MenuItem icon={<Trash size={16} />} state="destructive">
              Delete
            </MenuItem>
          </Menu>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">It&apos;s the list, not the dropdown</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>Menu</code> renders a panel of items and nothing else — no
            trigger, no open state, no positioning. Wrap it in{" "}
            <a href="/docs/components/popover" className="font-medium text-ink underline underline-offset-2">Popover</a>{" "}
            to get the dropdown behaviour, which keeps the two concerns
            separable when you need a menu inline or in a sheet instead.
          </p>
          <ComponentPreview code={IN_POPOVER}>
            <Popover
              trigger={
                <Button variant="secondary" size="sm">
                  Actions
                </Button>
              }
              placement="bottom-start"
            >
              <Menu aria-label="Actions">
                <MenuItem icon={<Pencil size={16} />}>Edit</MenuItem>
                <MenuItem icon={<Trash size={16} />} state="destructive">
                  Delete
                </MenuItem>
              </Menu>
            </Popover>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Item states</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Keep <code>destructive</code> for things that can&apos;t be undone,
            and put it last — it&apos;s the item people least want to hit by
            accident.
          </p>
          <ComponentPreview code={STATES}>
            <Menu aria-label="States">
              <MenuItem>Default</MenuItem>
              <MenuItem state="checked" icon={<Check size={16} />}>
                Checked
              </MenuItem>
              <MenuItem state="disabled">Disabled</MenuItem>
              <MenuItem state="destructive" icon={<Trash size={16} />}>
                Delete
              </MenuItem>
            </Menu>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Menu props</h2>
          <PropsTable rows={MENU_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">MenuItem props</h2>
          <PropsTable rows={ITEM_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/menu" />
    </article>
  );
}
