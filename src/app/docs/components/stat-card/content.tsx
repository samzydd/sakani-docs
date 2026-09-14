"use client";

import { StatCard } from "@sakaniui/react";
import { Users, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<StatCard
  title="Monthly revenue"
  value="$48,900"
  delta="+12.5%"
  trend="up"
  description="vs. last month"
  sparkline={[4, 6, 5, 8, 7, 10, 9, 12]}
/>`;

const VARIANTS = `<StatCard variant="minimal" title="Active users" value="2,340" delta="+4.2%" trend="up" />
<StatCard variant="icon" icon={Users} title="New signups" value="128" delta="-2.1%" trend="down" />
<StatCard variant="featured" icon={DollarSign} title="MRR" value="$48,900" delta="+12.5%" trend="up" />`;

const PROPS = [
  { name: "title", type: "string", description: "Stat label." },
  { name: "value", type: "string", description: "The headline number." },
  { name: "description", type: "string", description: "Supporting line under the delta." },
  { name: "delta", type: "string", description: "e.g. \"+12.5%\", colored by trend." },
  { name: "trend", type: "'up' | 'down' | 'flat'", description: "Drives the delta's color and arrow." },
  { name: "sparkline", type: "number[]", description: "Data points for an inline sparkline." },
  { name: "variant", type: "'minimal' | 'icon' | 'featured'", default: "'minimal'", description: "Visual density." },
  { name: "icon", type: "LucideIcon", description: "Leading icon, shown for icon/featured variants." },
];

export default function StatCardPage() {
  return (
    <article>
      <PageHeader title="Stat Card" description="A KPI card with an optional sparkline: the building block behind every Sakani dashboard." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-72">
            <StatCard
              title="Monthly revenue"
              value="$48,900"
              delta="+12.5%"
              trend="up"
              description="vs. last month"
              sparkline={[4, 6, 5, 8, 7, 10, 9, 12]}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Variants</h2>
          <ComponentPreview code={VARIANTS}>
            <div className="flex flex-wrap gap-4">
              <div className="w-56">
                <StatCard variant="minimal" title="Active users" value="2,340" delta="+4.2%" trend="up" />
              </div>
              <div className="w-56">
                <StatCard variant="icon" icon={Users} title="New signups" value="128" delta="-2.1%" trend="down" />
              </div>
              <div className="w-56">
                <StatCard variant="featured" icon={DollarSign} title="MRR" value="$48,900" delta="+12.5%" trend="up" />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/stat-card" />
    </article>
  );
}
