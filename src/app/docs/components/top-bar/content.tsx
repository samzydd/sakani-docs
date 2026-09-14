"use client";

import { Search } from "lucide-react";
import { TopBar, TopBarMobile, Breadcrumb, Input, Avatar } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BREADCRUMB = `<TopBar
  type="breadcrumb"
  left={<Breadcrumb items={[{ label: "Database", href: "#" }, { label: "Leads" }]} />}
  account={<Avatar size="sm" initials="JD" />}
  hasUnread
/>`;

const SEARCH = `<TopBar
  type="search"
  left={<Input size="sm" leadingIcon={<Search size={16} />} placeholder="Search…" />}
  account={<Avatar size="sm" initials="JD" />}
/>`;

const MINIMAL = `<TopBar type="minimal" showActions={false} left={<strong>Settings</strong>} />`;

const MOBILE = `<TopBarMobile type="title" title="Inbox" trailing={<Avatar size="sm" initials="JD" />} />
<TopBarMobile type="title-centered" title="Profile" />`;

const TOPBAR_PROPS = [
  { name: "type", type: "'search' | 'breadcrumb' | 'tabs' | 'minimal' | 'chat'", default: "'search'", description: "What the left region is for. It doesn't render that content — you pass it via left." },
  { name: "left", type: "ReactNode", description: "The left region's content: an Input, Breadcrumb, Tabs, or a plain title." },
  { name: "density", type: "'md' | 'sm'", default: "'md'", description: "Bar height." },
  { name: "showToggle", type: "boolean", default: "true", description: "Shows the sidebar toggle button." },
  { name: "onToggle", type: "() => void", description: "Fires from that toggle." },
  { name: "toggleIcon", type: "LucideIcon", default: "PanelLeft", description: "Icon for the toggle." },
  { name: "showActions", type: "boolean", default: "true", description: "Shows the built-in help and notification icons." },
  { name: "showHelp", type: "boolean", default: "true", description: "Shows the help icon within that group." },
  { name: "hasUnread", type: "boolean", default: "false", description: "Puts the unread dot on the notification icon." },
  { name: "rightSlot", type: "ReactNode", description: "Your own content, rendered before the built-in icons." },
  { name: "account", type: "ReactNode", description: "The account cluster at the far right, typically an Avatar." },
];

const MOBILE_PROPS = [
  { name: "type", type: "'title' | 'title-centered' | 'title-action' | 'search'", default: "'title'", description: "Layout. Centered is the iOS-style title; title-action adds a trailing action button." },
  { name: "title", type: "ReactNode", description: "Bar title." },
  { name: "trailing", type: "ReactNode", description: "Trailing slot for the title type, e.g. an Avatar." },
  { name: "search", type: "ReactNode", description: "The search field node, for the search type." },
  { name: "onMenu", type: "() => void", description: "Fires from the hamburger." },
  { name: "onAction", type: "() => void", description: "Fires from the trailing action button." },
  { name: "onClose", type: "() => void", description: "Fires from the close button where the type has one." },
];

export default function TopBarPage() {
  return (
    <article>
      <PageHeader title="Top Bar" description="The application header, in desktop and mobile variants." />

      <div className="space-y-10">
        <ComponentPreview code={BREADCRUMB}>
          <div className="w-full">
            <TopBar
              type="breadcrumb"
              left={<Breadcrumb items={[{ label: "Database", href: "#" }, { label: "Leads" }]} />}
              account={<Avatar size="sm" initials="JD" />}
              hasUnread
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">type picks the layout, left supplies the content</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>type</code> doesn&apos;t render a search field or a
            breadcrumb for you — it sets how the left region is laid out, and
            you pass the actual component through <code>left</code>. That&apos;s
            why the same bar can hold your router&apos;s breadcrumb or your own
            search input without either being hardcoded here.
          </p>
          <ComponentPreview code={SEARCH}>
            <div className="w-full">
              <TopBar
                type="search"
                left={<Input size="sm" leadingIcon={<Search size={16} />} placeholder="Search…" />}
                account={<Avatar size="sm" initials="JD" />}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Stripping it back</h2>
          <ComponentPreview code={MINIMAL}>
            <div className="w-full">
              <TopBar type="minimal" showActions={false} left={<strong className="text-sm text-ink">Settings</strong>} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Mobile</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>TopBarMobile</code> is a separate component rather than a
            breakpoint on this one, since the two have genuinely different
            slots. Swap between them at your layout&apos;s breakpoint.
          </p>
          <ComponentPreview code={MOBILE}>
            <div className="flex w-full max-w-sm flex-col gap-4">
              <TopBarMobile type="title" title="Inbox" trailing={<Avatar size="sm" initials="JD" />} />
              <TopBarMobile type="title-centered" title="Profile" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">TopBar props</h2>
          <PropsTable rows={TOPBAR_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">TopBarMobile props</h2>
          <PropsTable rows={MOBILE_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/top-bar" />
    </article>
  );
}
