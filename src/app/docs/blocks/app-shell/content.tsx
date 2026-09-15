"use client";

import { Bell, GitPullRequest, Plus } from "lucide-react";
import {
  AppHeaderBlock,
  AccountOverviewBlock,
  ActivityLogBlock,
  NotificationPanelBlock,
  ProfileSettingsBlock,
} from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const HEADER = `<AppHeaderBlock
  breadcrumbs={[{ label: 'Database', href: '/db' }, { label: 'Leads' }]}
  title="Leads"
  description="Every inbound lead across all connected sources."
  actions={[
    { label: 'Import', onClick: openImport },
    { label: 'New lead', icon: <Plus size={16} />, onClick: create },
  ]}
/>`;

const NOTIFICATIONS = `<NotificationPanelBlock
  items={[
    { id: '1', icon: <Bell size={16} />, title: 'New lead assigned to you', timestamp: '2m ago' },
    { id: '2', icon: <GitPullRequest size={16} />, title: 'Review requested', timestamp: '1h ago', read: true },
  ]}
/>`;

const PROFILE = `<ProfileSettingsBlock name="Jamie Doe" email="jamie@acme.com" />`;

const OVERVIEW = `<AccountOverviewBlock />

<ActivityLogBlock />`;

const ITEMS = [
  { id: "1", icon: <Bell size={16} />, title: "New lead assigned to you", timestamp: "2m ago" },
  { id: "2", icon: <GitPullRequest size={16} />, title: "Review requested", timestamp: "1h ago", read: true },
  { id: "3", icon: <Bell size={16} />, title: "Invoice paid", timestamp: "Yesterday", read: true },
];

export default function AppShellPage() {
  return (
    <article>
      <PageHeader
        title="App Shell"
        description="The furniture of a logged-in app: page headers, account overview, activity log, notifications, and profile settings."
      />

      <div className="doc-prose mb-8">
        <p>
          These sit inside an application layout rather than replacing it —
          pair them with{" "}
          <a href="/docs/components/sidebar">Sidebar</a> and{" "}
          <a href="/docs/components/top-bar">TopBar</a>, which handle the
          navigation around them.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={HEADER} fullBleed>
          <AppHeaderBlock
            breadcrumbs={[{ label: "Database", href: "#" }, { label: "Leads" }]}
            title="Leads"
            description="Every inbound lead across all connected sources."
            actions={[
              { label: "Import" },
              { label: "New lead", icon: <Plus size={16} /> },
            ]}
          />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Action variants are positional</h2>
          <p className="mb-3 text-sm text-ink-muted">
            In <code>AppHeaderBlock</code> the last action renders as primary
            and the rest as secondary, so the common case needs no{" "}
            <code>variant</code> at all. Set it explicitly only when you want
            to break that order.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Notifications</h2>
          <ComponentPreview code={NOTIFICATIONS} fullBleed>
            <NotificationPanelBlock items={ITEMS} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Account and activity</h2>
          <ComponentPreview code={OVERVIEW} fullBleed>
            <div className="flex w-full flex-col gap-6">
              <AccountOverviewBlock />
              <ActivityLogBlock />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Profile settings</h2>
          <ComponentPreview code={PROFILE} fullBleed>
            <ProfileSettingsBlock name="Jamie Doe" email="jamie@acme.com" />
          </ComponentPreview>
        </section>

        <BlockSource
          blocks={[
            "AppHeaderBlock",
            "AccountOverviewBlock",
            "ActivityLogBlock",
            "NotificationPanelBlock",
            "ProfileSettingsBlock",
          ]}
        />
      </div>

      <Pager current="/docs/blocks/app-shell" />
    </article>
  );
}
