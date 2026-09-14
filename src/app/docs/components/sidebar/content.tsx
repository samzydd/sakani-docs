"use client";

import { useState } from "react";
import { LayoutGrid, Mail, Users, Settings, Sparkles } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarSearch,
  SidebarGroupLabel,
  SidebarItem,
  SidebarSubItem,
  SidebarDivider,
  SidebarPromo,
  SidebarFooter,
} from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const FULL = `<Sidebar>
  <SidebarHeader type="workspace" title="Acme" subtitle="Pro plan" logo="A" />
  <SidebarSearch placeholder="Search…" />

  <SidebarGroupLabel>Overview</SidebarGroupLabel>
  <SidebarItem icon={LayoutGrid} label="Dashboard" active />
  <SidebarItem icon={Mail} label="Inbox" badge="12" />
  <SidebarItem icon={Users} label="Contacts" hasSubmenu />
  <SidebarSubItem label="All contacts" active />
  <SidebarSubItem label="Segments" />

  <SidebarDivider />
  <SidebarItem icon={Settings} label="Settings" />

  <SidebarPromo
    type="upgrade"
    title="Upgrade to Pro"
    description="Unlimited seats and advanced reporting."
    ctaLabel="Upgrade"
  />
  <SidebarFooter type="user-menu" title="Jamie Doe" subtitle="jamie@acme.com" avatarInitials="JD" />
</Sidebar>`;

const COLLAPSED = `// collapsed goes on the parts, not just the shell — each one
// has its own icon-only layout.
<Sidebar collapsed>
  <SidebarHeader type="brand" title="Acme" logo="A" collapsed />
  <SidebarItem icon={LayoutGrid} label="Dashboard" active collapsed />
  <SidebarItem icon={Mail} label="Inbox" collapsed />
</Sidebar>`;

const TOGGLE = `const [collapsed, setCollapsed] = useState(false);

<Sidebar collapsed={collapsed}>
  <SidebarHeader
    type="brand-toggle"
    title="Acme"
    logo="A"
    collapsed={collapsed}
    onToggle={() => setCollapsed((c) => !c)}
  />
  <SidebarItem icon={LayoutGrid} label="Dashboard" active collapsed={collapsed} />
</Sidebar>`;

const SIDEBAR_PROPS = [
  { name: "collapsed", type: "boolean", default: "false", description: "Narrows the rail. Pass the same value to each child that takes it." },
  { name: "children", type: "ReactNode", description: "The parts below, in whatever order your app needs." },
];

const ITEM_PROPS = [
  { name: "label", type: "string", description: "Item text. Still required when collapsed, since it becomes the tooltip and accessible name." },
  { name: "icon", type: "LucideIcon", description: "The icon component itself, not an element." },
  { name: "active", type: "boolean", default: "false", description: "Marks the current page." },
  { name: "activeIndicator", type: "boolean", default: "true", description: "Active styling: true is the raised card with a left accent bar, false is a flat tint. Ignored when collapsed." },
  { name: "badge", type: "string", description: "Trailing count or status pill." },
  { name: "hasSubmenu", type: "boolean", default: "false", description: "Shows the disclosure chevron. You render the SidebarSubItems yourself." },
  { name: "disabled", type: "boolean", default: "false", description: "Dims the item and drops its click handler." },
  { name: "collapsed", type: "boolean", default: "false", description: "Icon-only layout." },
  { name: "nativeTooltip", type: "boolean", default: "true", description: "Title-attribute tooltip when collapsed. Set false if you're wrapping the item in your own Tooltip, so the two don't compete on hover." },
  { name: "href", type: "string", description: "Renders an anchor instead of a button." },
  { name: "onClick", type: "() => void", description: "Click handler." },
];

const HEADER_PROPS = [
  { name: "type", type: "'brand' | 'workspace' | 'brand-toggle'", default: "'brand'", description: "Brand is a logo and name; workspace adds a subtitle; brand-toggle adds the collapse button." },
  { name: "title", type: "string", description: "Product or workspace name." },
  { name: "subtitle", type: "string", description: "Second line, e.g. the plan." },
  { name: "logo", type: "ReactNode", description: "Mark beside the title." },
  { name: "onToggle", type: "() => void", description: "Fires from the collapse button on brand-toggle." },
  { name: "toggleIcon", type: "LucideIcon", default: "PanelLeftClose", description: "Icon for that button." },
  { name: "collapsed", type: "boolean", default: "false", description: "Icon-only layout." },
];

const OTHER_PROPS = [
  { name: "SidebarSearch", type: "type, placeholder, value, onChange, onClick, collapsed", description: "'field' is an inline input; 'command' is a button that opens your own command menu." },
  { name: "SidebarGroupLabel", type: "children", description: "Small caps heading above a group of items." },
  { name: "SidebarSubItem", type: "label, active, disabled, href, onClick", description: "Nested child row, indented under an item with hasSubmenu." },
  { name: "SidebarDivider", type: "—", description: "A rule between groups." },
  { name: "SidebarPromo", type: "type, title, description, ctaLabel, onCta, onDismiss, icon", description: "Upsell or announcement card, usually pinned above the footer." },
  { name: "SidebarFooter", type: "type, title, subtitle, avatarSrc, avatarInitials, onMenu, onSignOut, collapsed", description: "Account row at the bottom, as plain user, user-with-menu, or an actions set." },
];

function ToggleDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sidebar collapsed={collapsed}>
      <SidebarHeader
        type="brand-toggle"
        title="Acme"
        logo="A"
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
      />
      <SidebarItem icon={LayoutGrid} label="Dashboard" active collapsed={collapsed} />
      <SidebarItem icon={Mail} label="Inbox" badge="12" collapsed={collapsed} />
      <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
    </Sidebar>
  );
}

export default function SidebarPage() {
  return (
    <article>
      <PageHeader title="Sidebar" description="The app navigation rail and the nine parts it's assembled from." />

      <div className="space-y-10">
        <ComponentPreview code={FULL}>
          <Sidebar>
            <SidebarHeader type="workspace" title="Acme" subtitle="Pro plan" logo="A" />
            <SidebarSearch placeholder="Search…" />
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
            <SidebarItem icon={LayoutGrid} label="Dashboard" active />
            <SidebarItem icon={Mail} label="Inbox" badge="12" />
            <SidebarItem icon={Users} label="Contacts" hasSubmenu />
            <SidebarSubItem label="All contacts" active />
            <SidebarSubItem label="Segments" />
            <SidebarDivider />
            <SidebarItem icon={Settings} label="Settings" />
            <SidebarPromo
              type="upgrade"
              title="Upgrade to Pro"
              description="Unlimited seats and advanced reporting."
              ctaLabel="Upgrade"
              icon={Sparkles}
            />
            <SidebarFooter
              type="user-menu"
              title="Jamie Doe"
              subtitle="jamie@acme.com"
              avatarInitials="JD"
            />
          </Sidebar>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">It&apos;s a composition, not a config</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>Sidebar</code> takes no items array. You place the parts
            yourself, in whatever order and grouping your app needs, which is
            what lets a promo sit mid-rail in one product and above the footer
            in another without the component growing options for each case.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Collapsing</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>collapsed</code> isn&apos;t inherited — each part takes its
            own, because each has a different icon-only layout. Pass the same
            state down to all of them.
          </p>
          <ComponentPreview code={TOGGLE}>
            <ToggleDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Icon rail</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Collapsed items fall back to a native title tooltip. If you wrap
            them in the{" "}
            <a href="/docs/components/tooltip" className="font-medium text-ink underline underline-offset-2">Tooltip</a>{" "}
            component instead, set <code>nativeTooltip={"{false}"}</code> so both
            don&apos;t fire at once — that&apos;s exactly what the CRM Dashboard
            block does.
          </p>
          <ComponentPreview code={COLLAPSED}>
            <Sidebar collapsed>
              <SidebarHeader type="brand" title="Acme" logo="A" collapsed />
              <SidebarItem icon={LayoutGrid} label="Dashboard" active collapsed />
              <SidebarItem icon={Mail} label="Inbox" collapsed />
              <SidebarItem icon={Settings} label="Settings" collapsed />
            </Sidebar>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sidebar props</h2>
          <PropsTable rows={SIDEBAR_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">SidebarItem props</h2>
          <PropsTable rows={ITEM_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">SidebarHeader props</h2>
          <PropsTable rows={HEADER_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The remaining parts</h2>
          <PropsTable rows={OTHER_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/sidebar" />
    </article>
  );
}
