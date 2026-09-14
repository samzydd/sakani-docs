import Link from "next/link";
import { Component, SlidersHorizontal, LayoutGrid, LineChart as LineChartIcon, LayoutDashboard, ShoppingBag, Megaphone, CreditCard } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { MaskReveal } from "@/components/mask-reveal";

const CATEGORIES = [
  { title: "Core", count: "13 components", icon: Component, href: "/docs/components/button" },
  { title: "Forms", count: "9 components", icon: SlidersHorizontal, href: "/docs/components/input" },
  { title: "Composite", count: "14 components", icon: LayoutGrid, href: "/docs/components/card" },
  { title: "Charts", count: "9 components", icon: LineChartIcon, href: "/docs/components/line-chart" },
  { title: "Application", count: "13 blocks", icon: LayoutDashboard, href: "/docs/blocks/crm-dashboard" },
  { title: "E-commerce", count: "11 components", icon: ShoppingBag, href: "/docs/components/star-rating" },
  { title: "Marketing", count: "10 blocks", icon: Megaphone, href: "/docs/blocks/pricing-table" },
  { title: "Billing", count: "5 blocks", icon: CreditCard, href: "/docs/blocks/billing-address" },
];

export function CategoryGrid() {
  return (
    <section className="py-20">
      {/* Matches the hero's own container exactly (mx-auto max-w-5xl px-4
          sm:px-6 lg:px-8) so this heading's left edge lines up with the
          hero headline's, rather than the wider max-w-7xl the grid below
          uses. */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <TextReveal
          as="h2"
          lines={["Browse everything"]}
          className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        />
        <MaskReveal as="p" delay={180} className="mt-3 text-ink-muted">
          114+ components and 41 blocks, organized by category. Jump straight to
          the one you need.
        </MaskReveal>
      </div>
      <div className="mx-auto mt-10 max-w-7xl grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:grid-cols-4 lg:px-8">
        {CATEGORIES.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group rounded-xl border border-line-subtle bg-surface p-5 transition-colors hover:border-line-default"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-subtle text-ink transition-transform group-hover:scale-105">
              <c.icon size={18} strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-ink">{c.title}</h3>
            <p className="mt-1 text-xs text-ink-subtle">{c.count}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
