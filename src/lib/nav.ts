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
    title: "Core",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Alert", href: "/docs/components/alert" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea", label: "New" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Combobox", href: "/docs/components/combobox", label: "New" },
      { title: "Checkbox", href: "/docs/components/checkbox", label: "New" },
      { title: "Radio", href: "/docs/components/radio", label: "New" },
      { title: "Switch", href: "/docs/components/switch", label: "New" },
      { title: "Slider", href: "/docs/components/slider", label: "New" },
      { title: "Segmented Control", href: "/docs/components/segmented-control", label: "New" },
      { title: "File Upload", href: "/docs/components/file-upload", label: "New" },
      { title: "Label", href: "/docs/components/label", label: "New" },
    ],
  },
  {
    title: "Data display",
    items: [
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Stat Card", href: "/docs/components/stat-card" },
      { title: "Line Chart", href: "/docs/components/line-chart" },
      { title: "Star Rating", href: "/docs/components/star-rating" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "Pricing Table", href: "/docs/blocks/pricing-table" },
      { title: "Billing Address", href: "/docs/blocks/billing-address" },
      { title: "Data Table", href: "/docs/blocks/data-table" },
      { title: "Kanban Board", href: "/docs/blocks/kanban-board" },
      { title: "CRM Dashboard", href: "/docs/blocks/crm-dashboard", label: "New" },
    ],
  },
];

/** Flat list, used by the command menu and prev/next pagers. */
export const flatNav: NavItem[] = docsNav.flatMap((g) => g.items);
