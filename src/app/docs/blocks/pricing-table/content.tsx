"use client";

import { PricingTableBlock } from "@sakaniui/react/blocks";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { Pager } from "@/components/docs/pager";


const CODE = `import { PricingTableBlock } from '@sakaniui/react/blocks';

<PricingTableBlock
  eyebrow="Pricing"
  title="Simple, transparent pricing"
  subtitle="Choose the plan that fits how your team builds."
  plans={[
    {
      name: 'Starter',
      price: '$0',
      period: '/month',
      description: 'For solo builders exploring the system.',
      ctaLabel: 'Get started',
      features: ['Up to 3 projects', 'Core components', 'Community support'],
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For teams shipping product.',
      ctaLabel: 'Start free trial',
      highlighted: true,
      features: ['Unlimited projects', 'All components & blocks', 'Priority support'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations with advanced needs.',
      ctaLabel: 'Contact sales',
      features: ['Everything in Pro', 'Dedicated support', 'SLA & security review'],
    },
  ]}
/>`;

export default function PricingTableBlockPage() {
  return (
    <article>
      <PageHeader title="Pricing Table" description="A full pricing section — 2 or 3 plans, one highlighted as the recommended tier." />

      <div className="doc-prose mb-8">
        <p>
          Blocks are <strong>composition examples</strong>, not configurable
          components — this page shows it running with realistic props, but the
          intent is to copy{" "}
          <a
            href="https://github.com/samzydd/Sakani-design-system/blob/main/src/blocks/PricingTableBlock/PricingTableBlock.tsx"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-ink underline underline-offset-2"
          >
            the source file <ExternalLink size={13} />
          </a>{" "}
          into your own project and edit it directly — restyle a card, change the
          layout, add a 4th plan.
        </p>
      </div>

      <ComponentPreview code={CODE}>
        <div className="w-full overflow-x-auto">
          <PricingTableBlock
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            subtitle="Choose the plan that fits how your team builds."
            plans={[
              {
                name: "Starter",
                price: "$0",
                period: "/month",
                description: "For solo builders exploring the system.",
                ctaLabel: "Get started",
                features: ["Up to 3 projects", "Core components", "Community support"],
              },
              {
                name: "Pro",
                price: "$29",
                period: "/month",
                description: "For teams shipping product.",
                ctaLabel: "Start free trial",
                highlighted: true,
                features: ["Unlimited projects", "All components & blocks", "Priority support"],
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For organizations with advanced needs.",
                ctaLabel: "Contact sales",
                features: ["Everything in Pro", "Dedicated support", "SLA & security review"],
              },
            ]}
          />
        </div>
      </ComponentPreview>

      <Pager current="/docs/blocks/pricing-table" />
    </article>
  );
}
