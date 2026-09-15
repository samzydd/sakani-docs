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
      { title: "Icon Button", href: "/docs/components/icon-button", label: "New" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Accordion", href: "/docs/components/accordion", label: "New" },
      { title: "Divider", href: "/docs/components/divider", label: "New" },
      { title: "Link", href: "/docs/components/link", label: "New" },
      { title: "Kbd", href: "/docs/components/kbd", label: "New" },
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
    title: "Navigation",
    items: [
      { title: "Sidebar", href: "/docs/components/sidebar", label: "New" },
      { title: "Top Bar", href: "/docs/components/top-bar", label: "New" },
      { title: "Menu", href: "/docs/components/menu", label: "New" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb", label: "New" },
      { title: "Pagination", href: "/docs/components/pagination", label: "New" },
      { title: "Stepper", href: "/docs/components/stepper", label: "New" },
      { title: "Popover", href: "/docs/components/popover", label: "New" },
      { title: "Filter Chip", href: "/docs/components/filter-chip", label: "New" },
    ],
  },
  {
    title: "Application",
    items: [
      { title: "Modal", href: "/docs/components/modal", label: "New" },
      { title: "Notifications", href: "/docs/components/notifications", label: "New" },
      { title: "Activity Feed", href: "/docs/components/activity-feed", label: "New" },
      { title: "Progress Steps", href: "/docs/components/progress-steps", label: "New" },
      { title: "Finance", href: "/docs/components/finance", label: "New" },
      { title: "Code Snippet", href: "/docs/components/code-snippet", label: "New" },
      { title: "Avatar Upload", href: "/docs/components/avatar-upload", label: "New" },
      { title: "Tags", href: "/docs/components/tags", label: "New" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { title: "Section Heading", href: "/docs/components/section-heading", label: "New" },
      { title: "Rich Text", href: "/docs/components/rich-text", label: "New" },
      { title: "Blog Listing", href: "/docs/components/blog-listing", label: "New" },
      { title: "Team Cards", href: "/docs/components/team-cards", label: "New" },
      { title: "Marketing Elements", href: "/docs/components/marketing-elements", label: "New" },
      { title: "Mobile Navigation", href: "/docs/components/mobile-navigation", label: "New" },
    ],
  },
  {
    title: "E-commerce",
    items: [
      { title: "Product Card", href: "/docs/components/product-card", label: "New" },
      { title: "Product Options", href: "/docs/components/product-options", label: "New" },
      { title: "Product Gallery", href: "/docs/components/product-gallery", label: "New" },
      { title: "Cart", href: "/docs/components/cart", label: "New" },
      { title: "Star Rating", href: "/docs/components/star-rating" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Toast", href: "/docs/components/toast", label: "New" },
      { title: "Tooltip", href: "/docs/components/tooltip", label: "New" },
      { title: "Progress", href: "/docs/components/progress", label: "New" },
      { title: "Spinner", href: "/docs/components/spinner", label: "New" },
      { title: "Skeleton", href: "/docs/components/skeleton", label: "New" },
      { title: "Empty State", href: "/docs/components/empty-state", label: "New" },
    ],
  },
  {
    title: "Data display",
    items: [
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Stat Card", href: "/docs/components/stat-card" },
      { title: "List Item", href: "/docs/components/list-item", label: "New" },
      { title: "Board Card", href: "/docs/components/board-card", label: "New" },
      { title: "Chat", href: "/docs/components/chat", label: "New" },
      { title: "Calendar", href: "/docs/components/calendar", label: "New" },
    ],
  },
  {
    title: "Charts",
    items: [
      { title: "Line Chart", href: "/docs/components/line-chart" },
      { title: "Area Chart", href: "/docs/components/area-chart", label: "New" },
      { title: "Bar Chart", href: "/docs/components/bar-chart", label: "New" },
      { title: "Pie Chart", href: "/docs/components/pie-chart", label: "New" },
      { title: "Donut Chart", href: "/docs/components/donut-chart", label: "New" },
      { title: "Radial Chart", href: "/docs/components/radial-chart", label: "New" },
      { title: "Radar Chart", href: "/docs/components/radar-chart", label: "New" },
      { title: "Funnel Chart", href: "/docs/components/funnel-chart", label: "New" },
      { title: "Heatmap Chart", href: "/docs/components/heatmap-chart", label: "New" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "CRM Dashboard", href: "/docs/blocks/crm-dashboard" },
      { title: "Data Table", href: "/docs/blocks/data-table" },
      { title: "Kanban Board", href: "/docs/blocks/kanban-board" },
      { title: "App Shell", href: "/docs/blocks/app-shell", label: "New" },
      { title: "Panels & Flows", href: "/docs/blocks/panels", label: "New" },
      { title: "Authentication", href: "/docs/blocks/authentication", label: "New" },
      { title: "Marketing Sections", href: "/docs/blocks/marketing-sections", label: "New" },
      { title: "Content Sections", href: "/docs/blocks/content-sections", label: "New" },
      { title: "E-commerce", href: "/docs/blocks/ecommerce", label: "New" },
      { title: "Pricing Table", href: "/docs/blocks/pricing-table" },
      { title: "Billing", href: "/docs/blocks/billing", label: "New" },
      { title: "Billing Address", href: "/docs/blocks/billing-address" },
    ],
  },
];

/** Flat list, used by the command menu and prev/next pagers. */
export const flatNav: NavItem[] = docsNav.flatMap((g) => g.items);
