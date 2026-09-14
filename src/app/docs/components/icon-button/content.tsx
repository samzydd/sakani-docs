"use client";

import { Bell, Plus, Search, Settings, Trash } from "lucide-react";
import { IconButton } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `import { Settings } from "lucide-react";

<IconButton icon={Settings} aria-label="Settings" />`;

const VARIANTS = `<IconButton icon={Plus} variant="primary" aria-label="Add" />
<IconButton icon={Plus} variant="secondary" aria-label="Add" />
<IconButton icon={Plus} variant="outline" aria-label="Add" />
<IconButton icon={Plus} variant="ghost" aria-label="Add" />
<IconButton icon={Trash} variant="destructive" aria-label="Delete" />`;

const SIZES = `<IconButton icon={Search} size="sm" aria-label="Search" />
<IconButton icon={Search} size="md" aria-label="Search" />
<IconButton icon={Search} size="lg" aria-label="Search" />`;

const DISABLED = `<IconButton icon={Bell} variant="outline" aria-label="Notifications" disabled />`;

const PROPS = [
  { name: "icon", type: "LucideIcon", description: "The icon component itself, not an element: pass Settings, not <Settings />." },
  { name: "aria-label", type: "string", description: "Required. There's no visible text, so this is the only name the control has." },
  { name: "variant", type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'", default: "'secondary'", description: "Visual weight, matching Button's variants." },
  { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Square dimensions." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the button." },
  { name: "onClick", type: "(e: MouseEvent<HTMLButtonElement>) => void", description: "Click handler." },
];

export default function IconButtonPage() {
  return (
    <article>
      <PageHeader title="Icon Button" description="A square, icon-only button for actions a toolbar has no room to spell out." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <IconButton icon={Settings} aria-label="Settings" />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">aria-label isn&apos;t optional</h2>
          <p className="mb-3 text-sm text-ink-muted">
            It&apos;s typed as required because an icon-only button has no
            accessible name without it — to a screen reader it would just be
            &quot;button&quot;. Pair it with a{" "}
            <a href="/docs/components/tooltip" className="font-medium text-ink underline underline-offset-2">Tooltip</a>{" "}
            carrying the same words for sighted users.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Variants</h2>
          <ComponentPreview code={VARIANTS}>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton icon={Plus} variant="primary" aria-label="Add" />
              <IconButton icon={Plus} variant="secondary" aria-label="Add" />
              <IconButton icon={Plus} variant="outline" aria-label="Add" />
              <IconButton icon={Plus} variant="ghost" aria-label="Add" />
              <IconButton icon={Trash} variant="destructive" aria-label="Delete" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex flex-wrap items-center gap-3">
              <IconButton icon={Search} size="sm" aria-label="Search" />
              <IconButton icon={Search} size="md" aria-label="Search" />
              <IconButton icon={Search} size="lg" aria-label="Search" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Disabled</h2>
          <ComponentPreview code={DISABLED}>
            <IconButton icon={Bell} variant="outline" aria-label="Notifications" disabled />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native button attribute is forwarded to the underlying{" "}
            <code>&lt;button&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/icon-button" />
    </article>
  );
}
