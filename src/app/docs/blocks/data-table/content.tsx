"use client";

import { DataTableBlock } from "@sakaniui/react/blocks";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Pager } from "@/components/docs/pager";

const CODE = `import { DataTableBlock } from '@sakaniui/react/blocks';

<DataTableBlock />`;

export default function DataTableBlockPage() {
  return (
    <article>
      <PageHeader title="Data Table" description="A full data table with a toolbar: search, filters, bulk actions, and pagination." />

      <div className="doc-prose mb-8">
        <p>
          Ships with a <code>state</code> prop demonstrating{" "}
          <code>default | filtered | bulk | loading | empty | error</code>. Copy{" "}
          <a
            href="https://github.com/samzydd/Sakani-design-system/blob/main/src/blocks/DataTableBlock/DataTableBlock.tsx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-2"
          >
            the source <ExternalLink size={13} />
          </a>{" "}
          in to swap the columns and sample rows for your own.
        </p>
      </div>

      <ComponentPreview code={CODE} fullBleed>
        <DataTableBlock />
      </ComponentPreview>

      <Pager current="/docs/blocks/data-table" />
    </article>
  );
}
