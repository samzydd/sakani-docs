export interface NavItem {
  title: string;
  href: string;
  label?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const docsNav: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Theming", href: "/docs/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Alert", href: "/docs/components/alert", label: "New" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Tabs", href: "/docs/components/tabs" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "Pricing Table", href: "/docs/blocks/pricing-table" },
      { title: "Billing Address", href: "/docs/blocks/billing-address" },
    ],
  },
];

/** Flat list, used by the command menu and prev/next pagers. */
export const flatNav: NavItem[] = docsNav.flatMap((g) => g.items);
