"use client";

import { Bell, GitPullRequest } from "lucide-react";
import { Announcement, NotificationItem, InlineHint } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const ANNOUNCEMENT = `<Announcement
  message="Scheduled maintenance tonight, 01:00–02:00 UTC."
  linkLabel="Read more"
  linkHref="/status"
  onDismiss={dismiss}
/>

<Announcement variant="urgent" message="Your card was declined. Update it to avoid interruption." />`;

const NOTIFICATION = `// Simple row: title + timestamp, unread until read is true.
<NotificationItem icon={<Bell size={16} />} title="New lead assigned to you" timestamp="2m ago" />

// Adding a description switches it to the actionable card.
<NotificationItem
  icon={<GitPullRequest size={16} />}
  title="Review requested"
  description="Amara asked you to review “Q3 forecast”."
  actionLabel="Review"
  onAction={open}
  onDismiss={dismiss}
/>`;

const HINT = `<InlineHint message="Changes apply to every member of this workspace." />
<InlineHint variant="warning" message="Lowering the seat count removes the newest members first." />`;

const ANNOUNCEMENT_PROPS = [
  { name: "message", type: "string", description: "The announcement text." },
  { name: "variant", type: "'neutral' | 'urgent'", default: "'neutral'", description: "Urgent drops the link — an urgent banner should carry one action, not a reading detour." },
  { name: "linkLabel / linkHref", type: "string", description: "Trailing link. Neutral variant only." },
  { name: "onLinkClick", type: "() => void", description: "Handler if you're routing client-side instead of navigating." },
  { name: "onDismiss", type: "() => void", description: "The dismiss button only renders when this is set." },
];

const NOTIFICATION_PROPS = [
  { name: "title", type: "string", description: "What happened." },
  { name: "icon", type: "ReactNode", description: "Leading icon element." },
  { name: "timestamp", type: "string", description: "Pre-formatted time. Simple row only." },
  { name: "read", type: "boolean", default: "false", description: "Unread rows get a tinted background and a dot. Simple row only." },
  { name: "description", type: "string", description: "Its presence is what switches the row into the actionable card layout." },
  { name: "actionLabel / onAction", type: "string / () => void", description: "Primary action on the card." },
  { name: "onDismiss", type: "() => void", description: "Fires from both the header × and the footer Dismiss." },
  { name: "dismissLabel", type: "string", description: "Label for that footer button." },
];

const HINT_PROPS = [
  { name: "message", type: "string", description: "The hint text." },
  { name: "variant", type: "'neutral' | 'warning'", default: "'neutral'", description: "Warning is for a consequence worth pausing over, not decoration." },
];

export default function NotificationsPage() {
  return (
    <article>
      <PageHeader title="Notifications" description="Three surfaces for telling someone something: a page-level banner, a feed row, and an inline hint." />

      <div className="space-y-10">
        <ComponentPreview code={ANNOUNCEMENT}>
          <div className="flex w-full max-w-lg flex-col gap-3">
            <Announcement
              message="Scheduled maintenance tonight, 01:00–02:00 UTC."
              linkLabel="Read more"
              linkHref="#"
              onDismiss={() => {}}
            />
            <Announcement
              variant="urgent"
              message="Your card was declined. Update it to avoid interruption."
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Which one</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <strong className="text-ink">Announcement</strong> spans the page
            and interrupts — reserve it for things true of the whole app.{" "}
            <strong className="text-ink">NotificationItem</strong> is a row in a
            feed people choose to open.{" "}
            <strong className="text-ink">InlineHint</strong> sits next to the
            control it qualifies and never leaves. For transient confirmation of
            something the user just did, use a{" "}
            <a href="/docs/components/toast" className="font-medium text-ink underline underline-offset-2">Toast</a>{" "}
            instead; for a persistent state of the page itself, an{" "}
            <a href="/docs/components/alert" className="font-medium text-ink underline underline-offset-2">Alert</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Notification rows</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Passing <code>description</code> is what switches a simple row into
            the actionable card — there&apos;s no separate variant prop to keep
            in sync with it.
          </p>
          <ComponentPreview code={NOTIFICATION}>
            <div className="flex w-full max-w-md flex-col gap-3">
              <NotificationItem icon={<Bell size={16} />} title="New lead assigned to you" timestamp="2m ago" />
              <NotificationItem
                icon={<Bell size={16} />}
                title="Invoice paid"
                timestamp="Yesterday"
                read
              />
              <NotificationItem
                icon={<GitPullRequest size={16} />}
                title="Review requested"
                description="Amara asked you to review “Q3 forecast”."
                actionLabel="Review"
                onAction={() => {}}
                onDismiss={() => {}}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Inline hints</h2>
          <ComponentPreview code={HINT}>
            <div className="flex w-full max-w-md flex-col gap-3">
              <InlineHint message="Changes apply to every member of this workspace." />
              <InlineHint
                variant="warning"
                message="Lowering the seat count removes the newest members first."
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Announcement props</h2>
          <PropsTable rows={ANNOUNCEMENT_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">NotificationItem props</h2>
          <PropsTable rows={NOTIFICATION_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">InlineHint props</h2>
          <PropsTable rows={HINT_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/notifications" />
    </article>
  );
}
