export interface NavItem {
  title: string;
  href: string;
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
      { title: "Tokens", href: "/docs/tokens" },
    ],
  },
  {
    title: "Core",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Icon Button", href: "/docs/components/icon-button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Alert", href: "/docs/components/alert" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Divider", href: "/docs/components/divider" },
      { title: "Link", href: "/docs/components/link" },
      { title: "Kbd", href: "/docs/components/kbd" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Input", href: "/docs/components/input" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Combobox", href: "/docs/components/combobox" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Radio", href: "/docs/components/radio" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Slider", href: "/docs/components/slider" },
      { title: "Segmented Control", href: "/docs/components/segmented-control" },
      { title: "File Upload", href: "/docs/components/file-upload" },
      { title: "Label", href: "/docs/components/label" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Sidebar", href: "/docs/components/sidebar" },
      { title: "Top Bar", href: "/docs/components/top-bar" },
      { title: "Menu", href: "/docs/components/menu" },
      { title: "Breadcrumb", href: "/docs/components/breadcrumb" },
      { title: "Pagination", href: "/docs/components/pagination" },
      { title: "Stepper", href: "/docs/components/stepper" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Filter Chip", href: "/docs/components/filter-chip" },
    ],
  },
  {
    title: "Application",
    items: [
      { title: "Modal", href: "/docs/components/modal" },
      { title: "Notifications", href: "/docs/components/notifications" },
      { title: "Activity Feed", href: "/docs/components/activity-feed" },
      { title: "Progress Steps", href: "/docs/components/progress-steps" },
      { title: "Finance", href: "/docs/components/finance" },
      { title: "Code Snippet", href: "/docs/components/code-snippet" },
      { title: "Avatar Upload", href: "/docs/components/avatar-upload" },
      { title: "Tags", href: "/docs/components/tags" },
    ],
  },
  {
    title: "Marketing",
    items: [
      { title: "Section Heading", href: "/docs/components/section-heading" },
      { title: "Rich Text", href: "/docs/components/rich-text" },
      { title: "Blog Listing", href: "/docs/components/blog-listing" },
      { title: "Team Cards", href: "/docs/components/team-cards" },
      { title: "Marketing Elements", href: "/docs/components/marketing-elements" },
      { title: "Mobile Navigation", href: "/docs/components/mobile-navigation" },
    ],
  },
  {
    title: "E-commerce",
    items: [
      { title: "Product Card", href: "/docs/components/product-card" },
      { title: "Product Options", href: "/docs/components/product-options" },
      { title: "Product Gallery", href: "/docs/components/product-gallery" },
      { title: "Cart", href: "/docs/components/cart" },
      { title: "Star Rating", href: "/docs/components/star-rating" },
    ],
  },
  {
    title: "Feedback",
    items: [
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Progress", href: "/docs/components/progress" },
      { title: "Spinner", href: "/docs/components/spinner" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Empty State", href: "/docs/components/empty-state" },
    ],
  },
  {
    title: "Data display",
    items: [
      { title: "Table", href: "/docs/components/table" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Stat Card", href: "/docs/components/stat-card" },
      { title: "List Item", href: "/docs/components/list-item" },
      { title: "Board Card", href: "/docs/components/board-card" },
      { title: "Chat", href: "/docs/components/chat" },
      { title: "Calendar", href: "/docs/components/calendar" },
    ],
  },
  {
    title: "Charts",
    items: [
      { title: "Line Chart", href: "/docs/components/line-chart" },
      { title: "Area Chart", href: "/docs/components/area-chart" },
      { title: "Bar Chart", href: "/docs/components/bar-chart" },
      { title: "Pie Chart", href: "/docs/components/pie-chart" },
      { title: "Donut Chart", href: "/docs/components/donut-chart" },
      { title: "Radial Chart", href: "/docs/components/radial-chart" },
      { title: "Radar Chart", href: "/docs/components/radar-chart" },
      { title: "Funnel Chart", href: "/docs/components/funnel-chart" },
      { title: "Heatmap Chart", href: "/docs/components/heatmap-chart" },
    ],
  },
  {
    title: "Blocks",
    items: [
      { title: "CRM Dashboard", href: "/docs/blocks/crm-dashboard" },
      { title: "Data Table", href: "/docs/blocks/data-table" },
      { title: "Kanban Board", href: "/docs/blocks/kanban-board" },
      { title: "App Shell", href: "/docs/blocks/app-shell" },
      { title: "Panels & Flows", href: "/docs/blocks/panels" },
      { title: "Authentication", href: "/docs/blocks/authentication" },
      { title: "Marketing Sections", href: "/docs/blocks/marketing-sections" },
      { title: "Content Sections", href: "/docs/blocks/content-sections" },
      { title: "E-commerce", href: "/docs/blocks/ecommerce" },
      { title: "Pricing Table", href: "/docs/blocks/pricing-table" },
      { title: "Billing", href: "/docs/blocks/billing" },
      { title: "Billing Address", href: "/docs/blocks/billing-address" },
    ],
  },
];

/** Flat list, used by the command menu and prev/next pagers. */
export const flatNav: NavItem[] = docsNav.flatMap((g) => g.items);
