"use client";

import Link from "next/link";
import { ArrowRight, Moon, Blocks, Palette, Component } from "lucide-react";
import { Button, Alert } from "@sakaniui/react";
import { CodeBlock } from "@/components/code-block";
import { DashboardShowcase } from "@/components/dashboard-showcase";
import { CategoryGrid } from "@/components/category-grid";
import { FaqSection } from "@/components/faq-section";
import { DashboardTicker } from "@/components/dashboard-ticker";
import { GithubIcon } from "@/components/icons/github-icon";
import { Reveal } from "@/components/reveal";
import { HeroPreview } from "@/components/hero-preview";

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
        <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/docs"
            className="animate-fade-in inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line-subtle px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-line-default hover:text-ink"
          >
            Last updated: September 3rd <ArrowRight size={12} />
          </Link>
          <h1
            className="animate-fade-in mt-4 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
            style={{ animationDelay: "80ms" }}
          >
            Design and engineering, finally on the same page.
          </h1>
          <p
            className="animate-fade-in mt-4 max-w-md text-balance text-ink-muted"
            style={{ animationDelay: "160ms" }}
          >
            114+ components and 41 blocks, matching your Figma file exactly, so
            your whole team ships from one source of truth, not a reinterpretation of it.
          </p>
          <div
            className="animate-fade-in mt-8 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "240ms" }}
          >
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
          </div>
        </div>

        <HeroPreview />
      </section>

      <Reveal>
        <DashboardTicker />
      </Reveal>

      <Reveal>
        <DashboardShowcase />
      </Reveal>

      {/* Features */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-xl px-8">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Everything a real product needs
            </h2>
            <p className="mt-3 text-ink-muted">
              Not a component playground: a system built to ship actual screens.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <h2 className="text-2xl font-semibold tracking-tight text-ink">
                Up and running in a minute
              </h2>
              <p className="mt-3 text-ink-muted">
                Install the package, import the tokens once at your app root, then
                import any component like you would from any other library.
              </p>
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
