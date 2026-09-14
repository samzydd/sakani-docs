"use client";

import { Avatar, AvatarGroup } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";


const BASIC = `<Avatar initials="SO" />`;

const SIZES = `<Avatar size="sm" initials="SO" />
<Avatar size="md" initials="SO" />
<Avatar size="lg" initials="SO" />
<Avatar size="xl" initials="SO" />`;

const GROUP = `<AvatarGroup
  max={3}
  avatars={[
    { initials: 'AK' },
    { initials: 'CD' },
    { initials: 'FM' },
    { initials: 'DR' },
  ]}
/>`;

const PROPS = [
  { name: "size", type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Avatar diameter." },
  { name: "src", type: "string", description: "Image URL — renders an image avatar." },
  { name: "initials", type: "string", description: "1–2 letters — renders when no src is given." },
  { name: "icon", type: "ReactNode", description: "Custom icon, used when neither src nor initials are given." },
];

export default function AvatarPage() {
  return (
    <article>
      <PageHeader title="Avatar" description="User or entity avatar — image, initials, or icon, in 4 sizes." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Avatar initials="SO" />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes</h2>
          <ComponentPreview code={SIZES}>
            <div className="flex items-center gap-3">
              <Avatar size="sm" initials="SO" />
              <Avatar size="md" initials="SO" />
              <Avatar size="lg" initials="SO" />
              <Avatar size="xl" initials="SO" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Group</h2>
          <ComponentPreview code={GROUP}>
            <AvatarGroup
              max={3}
              avatars={[{ initials: "AK" }, { initials: "CD" }, { initials: "FM" }, { initials: "DR" }]}
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/avatar" />
    </article>
  );
}
