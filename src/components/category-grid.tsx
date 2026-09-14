import Link from "next/link";
import { Component, SlidersHorizontal, LayoutGrid, LineChart as LineChartIcon, LayoutDashboard, ShoppingBag, Megaphone, CreditCard } from "lucide-react";

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
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Browse everything
        </h2>
        <p className="mt-3 text-ink-muted">
          114+ components and 41 blocks, organized by category. Jump straight to
          the one you need.
        </p>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
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
