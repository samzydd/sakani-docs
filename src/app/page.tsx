"use client";

import Link from "next/link";
import { ArrowRight, Moon, Blocks, Palette, Component } from "lucide-react";
import { Button, Badge, Avatar, AvatarGroup, Switch, Alert } from "@sakaniui/react";
import { CodeBlock } from "@/components/code-block";
import { DashboardShowcase } from "@/components/dashboard-showcase";
import { CategoryGrid } from "@/components/category-grid";
import { FaqSection } from "@/components/faq-section";
import { ShowcaseMarquee } from "@/components/showcase-marquee";
import { Reveal } from "@/components/reveal";

const FEATURES = [
  {
    icon: Component,
    title: "114+ components",
    body: "Every atom, molecule, and pattern in the Sakani Figma file, exported 1:1 — not reinterpreted.",
  },
  {
    icon: Blocks,
    title: "41 ready-made blocks",
    body: "Full page sections — pricing tables, checkout flows, auth screens — meant to be copied and edited, not configured.",
  },
  {
    icon: Palette,
    title: "Token-driven theming",
    body: "Every color, radius, and shadow traces back to a CSS variable. Rebrand by repointing the semantic layer.",
  },
  {
    icon: Moon,
    title: "Dark mode included",
    body: "Not bolted on after the fact — every component ships with a verified dark-mode pass from day one.",
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
      {/* Hero — animates in on mount (not scroll-triggered, it's already
          in view on load), each element staggered slightly after the last. */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="/docs"
            className="animate-fade-in mx-auto mb-6 inline-flex items-center gap-1.5 rounded-full border border-line-subtle bg-surface px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-line-default"
          >
            v0.3 is out now <ArrowRight size={12} />
          </Link>
          <h1
            className="animate-fade-in text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            A design system built from Figma, not around it.
          </h1>
          <p
            className="animate-fade-in mx-auto mt-5 max-w-xl text-balance text-lg text-ink-muted"
            style={{ animationDelay: "160ms" }}
          >
            114+ components and 41 blocks for React, matching a single Figma source
            of truth exactly — install it, import it, ship it.
          </p>
          <div
            className="animate-fade-in mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ animationDelay: "240ms" }}
          >
            <Link href="/docs">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight size={16} />}>
                Get started
              </Button>
            </Link>
            <a href="https://github.com/samzydd/Sakani-design-system" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </a>
          </div>
        </div>

        <div className="animate-fade-in mx-auto mt-12 max-w-md" style={{ animationDelay: "320ms" }}>
          <CodeBlock code={INSTALL_CODE} lang="bash" />
        </div>
      </section>

      <ShowcaseMarquee />

      {/* Live component strip */}
      <Reveal>
        <section className="border-b border-line-subtle bg-surface/40 py-14">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 rounded-xl border border-line-subtle bg-surface p-4 shadow-xs">
              <Avatar initials="SO" size="md" />
              <AvatarGroup
                size="sm"
                max={3}
                avatars={[
                  { initials: "AK" },
                  { initials: "CD" },
                  { initials: "FM" },
                  { initials: "DR" },
                ]}
              />
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-line-subtle bg-surface p-4 shadow-xs">
              <Badge variant="accent">New</Badge>
              <Badge variant="success" emphasis="solid">
                Shipped
              </Badge>
              <Badge variant="neutral">v0.3.2</Badge>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-line-subtle bg-surface p-4 shadow-xs">
              <Button size="sm" variant="primary">
                Primary
              </Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
              <Switch defaultChecked aria-label="Toggle" />
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <DashboardShowcase />
      </Reveal>

      {/* Features */}
      <Reveal>
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Everything a real product needs
            </h2>
            <p className="mt-3 text-ink-muted">
              Not a component playground — a system built to ship actual screens.
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
          <div className="grid grid-cols-1 gap-8 rounded-2xl border border-line-subtle bg-surface p-8 lg:grid-cols-2 lg:p-10">
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
                description="Component styles reference CSS variables — tokens.css supplies the values."
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
