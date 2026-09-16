"use client";

import Link from "next/link";
import { ArrowRight, Moon, Blocks, Palette, Component } from "lucide-react";
import { Button, Alert } from "@sakaniui/react";
import { CodeBlock } from "@/components/code-block";
import { DashboardShowcase } from "@/components/dashboard-showcase";
import { CategoryGrid } from "@/components/category-grid";
import { FaqSection } from "@/components/faq-section";
import { DashboardGallery } from "@/components/dashboard-gallery";
import { GithubIcon } from "@/components/icons/github-icon";
import { Reveal } from "@/components/reveal";
import { HeroPreview } from "@/components/hero-preview";
import { TextReveal } from "@/components/text-reveal";
import { MaskReveal } from "@/components/mask-reveal";

/** The hero's rise is slower than the section reveals further down (see
 *  --reveal-rise-hero in globals.css); it's the page's first impression
 *  and the only one that plays on load rather than on scroll. */
const HERO_RISE = 1500;

const FEATURES = [
  {
    icon: Component,
    title: "114+ components",
    body: "Every atom, molecule, and pattern in the Sakani Figma file, exported 1:1, not reinterpreted.",
  },
  {
    icon: Blocks,
    title: "41 ready-made blocks",
    body: "Full page sections (pricing tables, checkout flows, auth screens) meant to be copied and edited, not configured.",
  },
  {
    icon: Palette,
    title: "Token-driven theming",
    body: "Every color, radius, and shadow traces back to a CSS variable. Rebrand by repointing the semantic layer.",
  },
  {
    icon: Moon,
    title: "Dark mode included",
    body: "Not bolted on after the fact: every component ships with a verified dark-mode pass from day one.",
  },
];

const INSTALL_CODE = `npm install @sakaniui/react`;

const USAGE_CODE = `import '@sakaniui/react/tokens.css';
import { Button } from '@sakaniui/react';

export function Example() {
  return <Button variant="primary">Get started</Button>;
}`;

export default function HomePage() {
  return (
    <main>
      {/* Hero — fills the viewport on load; text animates in on mount (not
          scroll-triggered, it's already in view), each element staggered
          slightly after the last. No background decoration: a plain
          canvas, left-aligned copy, and a dimmed product preview doing
          the work instead. */}
      <section className="relative flex min-h-dvh flex-col overflow-hidden bg-canvas pt-32 sm:pt-40">
        {/* One sequenced cascade rather than four independent fades:
            eyebrow, then each headline line, then subtext, then the CTA
            row -- each waiting on roughly the previous one's midpoint so
            the whole hero resolves as a single movement. */}
        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <MaskReveal trigger="mount" delay={0} duration={HERO_RISE} className="w-fit">
            <Link
              href="/docs"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-subtle px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-line-default hover:text-ink"
            >
              Last updated: September 3rd <ArrowRight size={12} />
            </Link>
          </MaskReveal>
          <TextReveal
            as="h1"
            trigger="mount"
            startDelay={140}
            lineDelay={140}
            duration={HERO_RISE}
            lines={["Design and engineering,", "finally on the same page."]}
            className="mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
          />
          {/* 680px, up from the max-w-md (448px) this used to be, where the
              copy stacked into a narrow, dense brick under a 48px headline.

              Line count here is a property of copy length against the
              measure, not something the class list can pin, and text-balance
              then shrinks the block to its longest line -- so the width you
              actually see is (characters x ~8.02px at 18px Geist) / 3. The
              sentence is sized to that: ~234 characters fills this 680px
              measure across three even lines. Editing it much shorter
              visibly narrows the block, and past ~250 it spills to a
              fourth line. */}
          <MaskReveal
            as="p"
            trigger="mount"
            delay={460}
            duration={HERO_RISE}
            className="mt-5 max-w-[680px] text-balance text-lg leading-[1.4] text-ink-muted"
          >
            114+ components and 41 blocks, matching your Figma file exactly, so
            designers hand off what engineers already have, and your whole team
            ships from one source of truth, not a reinterpretation of it. No
            redlines, no rebuilding it twice.
          </MaskReveal>
          <MaskReveal trigger="mount" delay={620} duration={HERO_RISE} className="mt-8">
            <span className="flex flex-wrap items-center gap-3">
              <Link href="/docs">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight size={16} />}>
                  Get started
                </Button>
              </Link>
              <a href="https://github.com/samzydd/Sakani-design-system" target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg" leftIcon={<GithubIcon size={16} />}>
                  View on GitHub
                </Button>
              </a>
              <CodeBlock code={INSTALL_CODE} lang="bash" compact className="h-[42px] w-fit" />
            </span>
          </MaskReveal>
        </div>

        <HeroPreview />
      </section>

      {/* Deliberately not wrapped in <Reveal>: it animates with a
          transform, and a transformed ancestor becomes the containing
          block for its descendants, which stops the gallery's sticky
          stage from sticking. It reveals its own heading instead. */}
      <DashboardGallery />

      <Reveal>
        <DashboardShowcase />
      </Reveal>

      {/* Features */}
      <Reveal>
        <section className="py-20">
          {/* Matches the hero's own container exactly (mx-auto max-w-5xl
              px-4 sm:px-6 lg:px-8) so this heading's left edge lines up
              with the hero headline's, rather than the wider max-w-7xl
              the feature grid below uses. */}
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <TextReveal
              as="h2"
              lines={["Everything a real product needs"]}
              className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            />
            <MaskReveal as="p" delay={180} className="mt-3 text-ink-muted">
              Not a component playground: a system built to ship actual screens.
            </MaskReveal>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-line-subtle bg-surface p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-subtle text-ink">
                  <f.icon size={18} strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-ink">{f.title}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <CategoryGrid />
      </Reveal>

      {/* Usage */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div>
              <TextReveal
                as="h2"
                lines={["Up and running in a minute"]}
                className="text-2xl font-semibold tracking-tight text-ink"
              />
              <MaskReveal as="p" delay={180} className="mt-3 text-ink-muted">
                Install the package, import the tokens once at your app root, then
                import any component like you would from any other library.
              </MaskReveal>
              <Alert
                className="mt-5"
                color="info"
                title="Don't forget the tokens"
                description="Component styles reference CSS variables; tokens.css supplies the values."
              />
              <Link href="/docs/installation" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:underline">
                Full installation guide <ArrowRight size={14} />
              </Link>
            </div>
            <CodeBlock code={USAGE_CODE} lang="tsx" />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <FaqSection />
      </Reveal>
    </main>
  );
}
