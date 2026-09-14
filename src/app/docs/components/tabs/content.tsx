"use client";

import { Tabs } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const ITEMS = [
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
];

const BASIC = `const items = [
  { value: 'overview', label: 'Overview' },
  { value: 'activity', label: 'Activity' },
  { value: 'settings', label: 'Settings' },
];

<Tabs items={items} defaultValue="overview" />`;

const FILL = `<Tabs items={items} defaultValue="overview" fill />`;

const PROPS = [
  { name: "items", type: "{ value: string; label: string; icon?: LucideIcon; disabled?: boolean }[]", description: "The tabs to render." },
  { name: "value", type: "string", description: "Controlled active tab value." },
  { name: "defaultValue", type: "string", description: "Uncontrolled initial active value." },
  { name: "onChange", type: "(value: string) => void", description: "Fires when the active tab changes." },
  { name: "bordered", type: "boolean", default: "true", description: "Shows the bottom border under the whole track." },
  { name: "fill", type: "boolean", default: "false", description: "Stretches tabs to share the row's width equally." },
];

export default function TabsPage() {
  return (
    <article>
      <PageHeader title="Tabs" description="A tab list for switching between views within the same context." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-80">
            <Tabs items={ITEMS} defaultValue="overview" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Filled</h2>
          <ComponentPreview code={FILL}>
            <div className="w-80">
              <Tabs items={ITEMS} defaultValue="overview" fill />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/tabs" />
    </article>
  );
}
