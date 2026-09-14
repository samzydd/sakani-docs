"use client";

import { Breadcrumb } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Breadcrumb
  items={[
    { label: "Database", href: "#" },
    { label: "CRM", href: "#" },
    { label: "Leads" },
  ]}
/>`;

const VARIANTS = `<Breadcrumb variant="text" items={items} />
<Breadcrumb variant="button" items={items} />`;

const ITEMS = [
  { label: "Database", href: "#" },
  { label: "CRM", href: "#" },
  { label: "Leads" },
];

const PROPS = [
  { name: "items", type: "{ label: string; href?: string }[]", description: "The trail, root first. Leave href off the last item so the current page isn't a link to itself." },
  { name: "variant", type: "'text' | 'button'", default: "'text'", description: "Plain links, or each crumb in its own pill." },
];

export default function BreadcrumbPage() {
  return (
    <article>
      <PageHeader title="Breadcrumb" description="Shows where the current page sits, and gives one-click access back up the tree." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Breadcrumb items={ITEMS} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The last crumb isn&apos;t a link</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Omit <code>href</code> on the final item. It&apos;s the page
            you&apos;re already on, so linking it just gives people a control
            that appears to do nothing.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Variants</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>text</code> disappears into a page header;{" "}
            <code>button</code> gives each crumb a hit area worth aiming at,
            which reads better in a dense app toolbar.
          </p>
          <ComponentPreview code={VARIANTS}>
            <div className="flex flex-col gap-5">
              <Breadcrumb variant="text" items={ITEMS} />
              <Breadcrumb variant="button" items={ITEMS} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/breadcrumb" />
    </article>
  );
}
