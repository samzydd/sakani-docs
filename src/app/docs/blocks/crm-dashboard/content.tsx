"use client";

import { CRMDashboardBlock } from "@sakaniui/react/blocks";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Pager } from "@/components/docs/pager";

const CODE = `import { CRMDashboardBlock } from '@sakaniui/react/blocks';

<CRMDashboardBlock />`;

export default function CRMDashboardBlockPage() {
  return (
    <article>
      <PageHeader title="CRM Dashboard" description="A full CRM screen — sidebar, filters, and a real data table — assembled entirely from Sakani components." />

      <div className="doc-prose mb-8">
        <p>
          This is the flagship example of what Sakani is actually for: not just
          marketing pages, but real application shells. Scroll inside the frame
          below — everything (sidebar, filters, table, avatars, badges) is a live
          Sakani component, not a screenshot. Copy{" "}
          <a
            href="https://github.com/samzydd/Sakani-design-system/blob/main/src/blocks/CRMDashboardBlock/CRMDashboardBlock.tsx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-2"
          >
            the source <ExternalLink size={13} />
          </a>{" "}
          in to swap the sample leads for your own data.
        </p>
      </div>

      <ComponentPreview code={CODE} fullBleed>
        <CRMDashboardBlock />
      </ComponentPreview>

      <Pager current="/docs/blocks/crm-dashboard" />
    </article>
  );
}
