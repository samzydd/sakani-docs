"use client";

import { Layers, Palette, ShieldCheck, Zap } from "lucide-react";
import {
  HeroBlock,
  FeatureGridBlock,
  LogoCloudBlock,
  CtaBannerBlock,
  InlineCtaBlock,
  SectionFooterBlock,
} from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

/**
 * The same graphic HeroBlock's own story uses. Figma's hero mockup ships a
 * "Pattern Refraction" texture as its stand-in for real photography, and
 * the file is 1186x562 -- the exact slot the hero renders it into, so it
 * lands unscaled. It's served from /public rather than imported from the
 * package because the library deliberately keeps demo imagery out of its
 * build (Vite's lib mode base64-inlines imported assets, which took
 * blocks.cjs from ~350KB to over 1.2MB when this one file was bundled).
 */
const HERO_IMAGE = "/marketing/hero-pattern-refraction.jpg";
const HERO_REVEAL_IMAGE = "/marketing/blog-image-balloons.jpg";

const HERO_CENTERED = `<HeroBlock
  eyebrow="Now open source"
  title="Design faster. Ship sooner."
  description="An open-source, production-ready design system with full Figma-to-React parity."
  primaryAction={{ label: 'Get started', onClick: start }}
  secondaryAction={{ label: 'View on GitHub', onClick: openRepo }}
  secondaryActionIcon
  image={heroImage}
  caption="Free and open source · MIT licensed"
  layout="centered"
/>`;

const HERO_SPLIT = `// Same block, Figma's other layout: content column beside the
// image, left-aligned, 28px title. 'caption' is centered-only.
<HeroBlock
  eyebrow="v1.2 now available"
  title="Your product, styled to production standard."
  description="114+ components, full state coverage, real Figma-to-code parity."
  primaryAction={{ label: 'Get started' }}
  secondaryAction={{ label: 'View on GitHub' }}
  secondaryActionIcon
  image={heroImage}
  layout="split"
/>`;

const HERO_REVEAL = `// Add revealImage and the image area becomes a scratch-reveal:
// drag across it to erase 'image' and expose this underneath.
<HeroBlock {...heroProps} image={pattern} revealImage={photo} />`;

const FEATURES = `<FeatureGridBlock
  features={[
    { icon: <Zap />, title: 'Built for speed', description: '…' },
    { icon: <ShieldCheck />, title: 'Accessible by default', description: '…' },
  ]}
/>
// columns defaults to features.length. Pass it only to wrap
// more features onto fewer rows (6 features at columns={3}).`;

const LOGOS = `<LogoCloudBlock variant="monochrome" />
<LogoCloudBlock variant="color" />
// 'brands' picks which built-in marks to show, and in what order.`;

const CTA_BANNER = `<CtaBannerBlock
  title="Ship your next screen this afternoon"
  description="Install the package and import what you need."
  primaryAction={{ label: 'Get started' }}
  secondaryAction={{ label: 'View on GitHub' }}
  secondaryActionIcon
  variant="neutral"   // or "accent"
/>`;

const INLINE_CTA = `<InlineCtaBlock
  title="Unlock advanced analytics"
  description="Upgrade to Pro to see detailed usage trends and exports."
  actionLabel="Upgrade"
  variant="default"   // or "accent"
/>`;

const FOOTER = `<SectionFooterBlock />
<SectionFooterBlock
  variant="centered"
  text="Sakani v1.2 · © 2026 Sakani. Open source under the MIT license."
/>`;

/** FeaturedIcon clones each icon with its own size and stroke width, so
 *  these are deliberately left unsized -- passing size={20} here would be
 *  silently overridden, and copying that into a real project teaches the
 *  wrong idiom. */
const FEATURE_ITEMS = [
  { id: "a", icon: <Zap />, title: "Built for speed", description: "Every component is optimized out of the box, so your interface stays fast without extra work." },
  { id: "b", icon: <ShieldCheck />, title: "Accessible by default", description: "Keyboard navigation, focus states, and semantic markup are built in, not bolted on." },
  { id: "c", icon: <Layers />, title: "Composable by design", description: "Every block is assembled from the same primitives your app already uses." },
  { id: "d", icon: <Palette />, title: "Token-driven theming", description: "Swap a variable, not a stylesheet. Light and dark modes ship for free." },
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
          configuring: marketing layouts diverge fast, and a prop for every
          variation would be worse than editing the file.
        </p>
        <p>
          Each one carries its Figma frame width as a fixed width (the hero is
          1280px, the CTA banner 1263px), so they don&apos;t reflow into a
          narrower container. The previews below zoom the whole section down to
          fit this column rather than cropping it: what you see is the real
          composition at real proportions, just smaller than it renders at full
          size.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Hero</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>layout</code> is Figma&apos;s own axis and a real choice, not
            something derivable from the copy. <strong>Centered</strong> stacks
            everything with a 40px display title, a full-width image below the
            CTAs, and an optional <code>caption</code> line.
          </p>
          <ComponentPreview code={HERO_CENTERED} scaleToFit>
            <HeroBlock
              eyebrow="Now open source"
              title="Design faster. Ship sooner."
              description="Sakani is an open-source, production-ready design system with full Figma-to-React parity, built to take you from idea to shipped interface."
              primaryAction={{ label: "Get started" }}
              secondaryAction={{ label: "View on GitHub" }}
              secondaryActionIcon
              image={HERO_IMAGE}
              imageAlt="Iridescent refracted-light pattern"
              caption="Free and open source · MIT licensed"
              layout="centered"
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Hero, split layout</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <strong>Split</strong> puts the content column beside a fixed-size
            image, left-aligned, at the smaller 28px title size. It takes no{" "}
            <code>caption</code>: Figma&apos;s own split export has none.
          </p>
          <ComponentPreview code={HERO_SPLIT} scaleToFit>
            <HeroBlock
              eyebrow="v1.2 now available"
              title="Your product, styled to production standard."
              description="114+ components, full state coverage, real Figma-to-code parity. Everything you need to build without starting from a blank canvas."
              primaryAction={{ label: "Get started" }}
              secondaryAction={{ label: "View on GitHub" }}
              secondaryActionIcon
              image={HERO_IMAGE}
              imageAlt="Iridescent refracted-light pattern"
              layout="split"
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Hero, scratch reveal</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pass <code>revealImage</code> alongside <code>image</code> and the
            image area becomes a canvas scratch-reveal. Drag across it to erase
            the pattern and expose the photo underneath. Omit it and the image
            stays a plain <code>&lt;img&gt;</code>, matching Figma exactly.
          </p>
          <ComponentPreview code={HERO_REVEAL} scaleToFit>
            <HeroBlock
              eyebrow="Now open source"
              title="Design faster. Ship sooner."
              description="Drag across the image below to scratch the pattern away."
              primaryAction={{ label: "Get started" }}
              secondaryAction={{ label: "View on GitHub" }}
              secondaryActionIcon
              image={HERO_IMAGE}
              revealImage={HERO_REVEAL_IMAGE}
              imageAlt="Iridescent refracted-light pattern"
              caption="Free and open source · MIT licensed"
              layout="centered"
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Feature grid</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>columns</code> defaults to <code>features.length</code>, since
            that&apos;s what every one of Figma&apos;s examples does (2 features
            to 2 columns, 3 to 3, 4 to 4). It stays an override for the case
            that genuinely can&apos;t be derived: wrapping more features onto
            fewer columns.
          </p>
          <ComponentPreview code={FEATURES} scaleToFit>
            <FeatureGridBlock features={FEATURE_ITEMS} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Logo cloud</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>variant</code> is Figma&apos;s Style axis, renamed to avoid
            colliding with React&apos;s own <code>style</code> prop.{" "}
            <strong>Monochrome</strong> flattens every mark to one gray;{" "}
            <strong>color</strong> renders each in its own brand color.
          </p>
          <ComponentPreview code={LOGOS} scaleToFit>
            <div className="flex w-full flex-col">
              <LogoCloudBlock variant="monochrome" />
              <LogoCloudBlock variant="color" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">CTA banner</h2>
          <p className="mb-3 text-sm text-ink-muted">
            On <strong>accent</strong>, both buttons switch to the light
            bg/subtle treatment: the banner&apos;s own background is the dark
            accent color, so a normal dark primary button would vanish into it.
            That&apos;s derived from <code>variant</code> rather than set per
            button.
          </p>
          <ComponentPreview code={CTA_BANNER} scaleToFit>
            <div className="flex w-full flex-col">
              <CtaBannerBlock
                title="Ship your next screen this afternoon"
                description="Install the package and import what you need."
                primaryAction={{ label: "Get started" }}
                secondaryAction={{ label: "View on GitHub" }}
                secondaryActionIcon
                variant="neutral"
              />
              <CtaBannerBlock
                title="Ship your next screen this afternoon"
                description="Install the package and import what you need."
                primaryAction={{ label: "Get started" }}
                secondaryAction={{ label: "View on GitHub" }}
                secondaryActionIcon
                variant="accent"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Inline CTA</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The smaller sibling that sits inside flowing content without
            interrupting it. Unlike the sections above it has no fixed frame
            width, so it fills whatever column you give it.
          </p>
          <ComponentPreview code={INLINE_CTA}>
            <div className="flex w-full max-w-[650px] flex-col gap-6">
              <InlineCtaBlock
                title="Unlock advanced analytics"
                description="Upgrade to Pro to see detailed usage trends and exports."
                actionLabel="Upgrade"
              />
              <InlineCtaBlock
                variant="accent"
                title="Still comparing options?"
                description="See how Sakani differs from copy-paste libraries."
                actionLabel="Read the comparison"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Section footer</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <strong>Default</strong> is a copyright line beside a link row;{" "}
            <strong>centered</strong> is a single centered line. That stays an
            explicit <code>variant</code> rather than being inferred from an
            empty <code>links</code> array, since a default footer with no links
            should still keep its two-column layout.
          </p>
          <ComponentPreview code={FOOTER}>
            <div className="flex w-full max-w-[713px] flex-col gap-8">
              <SectionFooterBlock />
              <SectionFooterBlock
                variant="centered"
                text="Sakani v1.2 · © 2026 Sakani. Open source under the MIT license."
              />
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
