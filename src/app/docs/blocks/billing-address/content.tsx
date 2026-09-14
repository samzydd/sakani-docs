"use client";

import { BillingAddressBlock } from "@sakaniui/react/blocks";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Pager } from "@/components/docs/pager";


const CODE = `import { BillingAddressBlock } from '@sakaniui/react/blocks';

<BillingAddressBlock
  onSave={(value) => {
    // wire this up to your real API call
    console.log(value);
  }}
/>`;

export default function BillingAddressBlockPage() {
  return (
    <article>
      <PageHeader title="Billing Address" description="A real, interactive billing-address form with built-in validation and save states." />

      <div className="doc-prose mb-8">
        <p>
          Unlike most blocks, this one carries a small real state machine (
          <code>idle | invalid | server-error | loading</code>) so the form actually
          works in this preview: try submitting with an incomplete postal code.
          Copy{" "}
          <a
            href="https://github.com/samzydd/Sakani-design-system/blob/main/src/blocks/Billing/BillingAddressBlock/BillingAddressBlock.tsx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-2"
          >
            the source <ExternalLink size={13} />
          </a>{" "}
          in to wire <code>onSave</code> to your real endpoint.
        </p>
      </div>

      <ComponentPreview code={CODE}>
        <BillingAddressBlock onSave={(value) => console.log(value)} />
      </ComponentPreview>

      <Pager current="/docs/blocks/billing-address" />
    </article>
  );
}
