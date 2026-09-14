"use client";

import { Skeleton } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Skeleton variant="text" width={220} />`;

const VARIANTS = `<Skeleton variant="text" width={220} />
<Skeleton variant="rect" width={220} height={80} />
<Skeleton variant="circle" width={40} height={40} />`;

const CARD = `// Mirror the real card's shape so nothing jumps when data lands.
<div className="flex items-center gap-3">
  <Skeleton variant="circle" width={40} height={40} />
  <div className="flex flex-1 flex-col gap-2">
    <Skeleton variant="text" width="45%" height={12} />
    <Skeleton variant="text" width="70%" height={10} />
  </div>
</div>`;

const ROWS = `{Array.from({ length: 4 }).map((_, i) => (
  <div key={i} className="flex items-center gap-4 py-3">
    <Skeleton variant="rect" width={16} height={16} />
    <Skeleton variant="text" width="30%" height={12} />
    <Skeleton variant="text" width="20%" height={12} />
  </div>
))}`;

const PROPS = [
  { name: "variant", type: "'text' | 'rect' | 'circle'", default: "'text'", description: "Shape. Text gets a line-height-sized bar, circle a fully rounded one." },
  { name: "width", type: "string | number", description: "Defaults to 100% for text/rect, and to the size for circle. Percentages work." },
  { name: "height", type: "string | number", description: "Defaults to 1em for text, 100% for rect, and the size for circle." },
];

export default function SkeletonPage() {
  return (
    <article>
      <PageHeader title="Skeleton" description="Placeholder shapes that hold a layout's geometry while its data is still loading." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Skeleton variant="text" width={220} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Variants</h2>
          <ComponentPreview code={VARIANTS}>
            <div className="flex w-full max-w-sm flex-col items-start gap-4">
              <Skeleton variant="text" width={220} />
              <Skeleton variant="rect" width={220} height={80} />
              <Skeleton variant="circle" width={40} height={40} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Match the real shape</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A skeleton earns its keep by reserving the exact space the loaded
            content will take. If the placeholder and the real thing are
            different heights, you&apos;ve just moved the layout shift rather
            than removed it.
          </p>
          <ComponentPreview code={CARD}>
            <div className="flex w-full max-w-sm items-center gap-3">
              <Skeleton variant="circle" width={40} height={40} />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton variant="text" width="45%" height={12} />
                <Skeleton variant="text" width="70%" height={10} />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Table rows</h2>
          <ComponentPreview code={ROWS}>
            <div className="w-full max-w-md divide-y divide-line-subtle">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 py-3">
                  <Skeleton variant="rect" width={16} height={16} />
                  <Skeleton variant="text" width="30%" height={12} />
                  <Skeleton variant="text" width="20%" height={12} />
                </div>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/skeleton" />
    </article>
  );
}
