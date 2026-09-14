"use client";

import { GitCommit, MessageSquare, UserPlus } from "lucide-react";
import { ActivityFeed, ActivityFeedHighlight } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `const items = [
  {
    actor: "Amara Chen",
    description: <>commented on <ActivityFeedHighlight>Q3 forecast</ActivityFeedHighlight></>,
    timestamp: "2m ago",
    icon: <MessageSquare size={16} />,
  },
  {
    actor: "Daniel Osei",
    description: <>invited <ActivityFeedHighlight>Priya Raman</ActivityFeedHighlight></>,
    timestamp: "1h ago",
    icon: <UserPlus size={16} />,
  },
];

<ActivityFeed items={items} />`;

const COMPACT = `// Compact swaps the icon rail for avatars.
<ActivityFeed variant="compact" items={itemsWithAvatars} />`;

const ITEMS = [
  {
    id: 1,
    actor: "Amara Chen",
    description: (
      <>
        commented on <ActivityFeedHighlight>Q3 forecast</ActivityFeedHighlight>
      </>
    ),
    timestamp: "2m ago",
    icon: <MessageSquare size={16} />,
  },
  {
    id: 2,
    actor: "Daniel Osei",
    description: (
      <>
        invited <ActivityFeedHighlight>Priya Raman</ActivityFeedHighlight> to the workspace
      </>
    ),
    timestamp: "1h ago",
    icon: <UserPlus size={16} />,
  },
  {
    id: 3,
    actor: "Marcus Reid",
    description: (
      <>
        merged <ActivityFeedHighlight>feat/theme-toggle</ActivityFeedHighlight>
      </>
    ),
    timestamp: "Yesterday",
    icon: <GitCommit size={16} />,
  },
];

const PROPS = [
  { name: "items", type: "ActivityFeedItem[]", description: "The entries, newest first." },
  { name: "variant", type: "'default' | 'compact'", default: "'default'", description: "Default draws an icon rail; compact uses avatars instead." },
];

const ITEM_PROPS = [
  { name: "actor", type: "string", description: "Who acted. Rendered in full-strength text; the rest of the sentence is muted." },
  { name: "description", type: "ReactNode", description: "The rest of the sentence. Wrap the object in ActivityFeedHighlight to pull it back to full strength." },
  { name: "timestamp", type: "string", description: "Pre-formatted time." },
  { name: "icon", type: "ReactNode", description: "Rail dot icon, 16px. Default variant." },
  { name: "avatarSrc", type: "string", description: "Avatar image. Compact variant." },
  { name: "id", type: "string | number", description: "React key. Falls back to the index if omitted." },
];

export default function ActivityFeedPage() {
  return (
    <article>
      <PageHeader title="Activity Feed" description="A chronological log of who did what, with the actor and object emphasised inside the sentence." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-md">
            <ActivityFeed items={ITEMS} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Highlighting the object</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The actor is emphasised automatically, but the thing acted on
            isn&apos;t — it&apos;s buried in free-form text. Wrap it in{" "}
            <code>ActivityFeedHighlight</code> so a row scans as
            &quot;<strong className="text-ink">who</strong> did something to{" "}
            <strong className="text-ink">what</strong>&quot; rather than a wall
            of grey.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Compact</h2>
          <ComponentPreview code={COMPACT}>
            <div className="w-full max-w-md">
              <ActivityFeed variant="compact" items={ITEMS} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">ActivityFeedItem</h2>
          <PropsTable rows={ITEM_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/activity-feed" />
    </article>
  );
}
