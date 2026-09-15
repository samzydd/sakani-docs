"use client";

import { Layers, Shield, Zap } from "lucide-react";
import {
  HeroBlock,
  FeatureGridBlock,
  LogoCloudBlock,
  CtaBannerBlock,
  InlineCtaBlock,
  SectionFooterBlock,
} from "@sakaniui/react/blocks";
import { productImage } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const HERO = `<HeroBlock
  eyebrow="v0.3.3 is out"
  title="Design and engineering, finally on the same page."
  description="114+ components and 41 blocks, matching your Figma file exactly."
  primaryAction={{ label: 'Get started', onClick: start }}
  secondaryAction={{ label: 'View on GitHub', onClick: openRepo }}
  secondaryActionIcon
  image="/hero.png"
/>`;

const FEATURES = `<FeatureGridBlock
  features={[
    { icon: <Zap size={20} />, title: 'Token-driven', description: 'Every colour traces back to one variable.' },
    { icon: <Shield size={20} />, title: 'Dark mode included', description: 'Verified on every component, from day one.' },
  ]}
/>`;

const CTAS = `<CtaBannerBlock
  title="Ship your next screen this afternoon"
  description="Install the package and import what you need."
  primaryAction={{ label: 'Get started' }}
/>

<InlineCtaBlock
  title="Still comparing options?"
  description="See how Sakani differs from copy-paste libraries."
  actionLabel="Read the comparison"
/>`;

const CHROME = `<LogoCloudBlock />

<SectionFooterBlock />`;

const FEATURE_ITEMS = [
  { id: "a", icon: <Zap size={20} />, title: "Token-driven", description: "Every colour traces back to one variable." },
  { id: "b", icon: <Shield size={20} />, title: "Dark mode included", description: "Verified on every component, from day one." },
  { id: "c", icon: <Layers size={20} />, title: "Composable blocks", description: "Copy the source and edit it, rather than configuring around it." },
];

export default function MarketingSectionsPage() {
  return (
    <article>
      <PageHeader
        title="Marketing Sections"
        description="Full-width landing page sections: hero, feature grid, logo cloud, CTA banners, and the footer."
      />

      <div className="doc-prose mb-8">
        <p>
          Each of these is a whole page section, meant to be stacked to build a
          landing page. They&apos;re the blocks most worth copying rather than
          configuring — marketing layouts diverge fast, and a prop for every
          variation would be worse than editing the file.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={HERO} fullBleed>
          <HeroBlock
            eyebrow="v0.3.3 is out"
            title="Design and engineering, finally on the same page."
            description="114+ components and 41 blocks, matching your Figma file exactly."
            primaryAction={{ label: "Get started" }}
            secondaryAction={{ label: "View on GitHub" }}
            secondaryActionIcon
            image={productImage}
          />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Feature grid</h2>
          <ComponentPreview code={FEATURES} fullBleed>
            <FeatureGridBlock features={FEATURE_ITEMS} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Calls to action</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>CtaBannerBlock</code> is the full-width band you put between
            sections or at the end of a page. <code>InlineCtaBlock</code> is the
            smaller one that sits inside flowing content without interrupting
            it.
          </p>
          <ComponentPreview code={CTAS} fullBleed>
            <div className="flex w-full flex-col gap-6">
              <CtaBannerBlock
                title="Ship your next screen this afternoon"
                description="Install the package and import what you need."
                primaryAction={{ label: "Get started" }}
              />
              <InlineCtaBlock
                title="Still comparing options?"
                description="See how Sakani differs from copy-paste libraries."
                actionLabel="Read the comparison"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Logo cloud and footer</h2>
          <ComponentPreview code={CHROME} fullBleed>
            <div className="flex w-full flex-col gap-6">
              <LogoCloudBlock />
              <SectionFooterBlock />
            </div>
          </ComponentPreview>
        </section>

        <BlockSource
          blocks={[
            "HeroBlock",
            "FeatureGridBlock",
            "LogoCloudBlock",
            "CtaBannerBlock",
            "InlineCtaBlock",
            "SectionFooterBlock",
          ]}
        />
      </div>

      <Pager current="/docs/blocks/marketing-sections" />
    </article>
  );
}
