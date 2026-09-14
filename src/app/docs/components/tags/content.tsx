"use client";

import { useState } from "react";
import { Tags } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Tags tags={["Design", "Engineering", "Q3"]} />`;

const REMOVABLE = `const [tags, setTags] = useState(["Design", "Engineering", "Q3"]);

// Passing onRemove is what makes every tag removable.
<Tags tags={tags} onRemove={(tag) => setTags(tags.filter((t) => t !== tag))} />`;

const PROPS = [
  { name: "tags", type: "string[]", description: "The labels. Strings only — for richer content use Badge directly." },
  { name: "onRemove", type: "(tag: string, index: number) => void", description: "Its presence makes every tag removable. You get both the value and its index, so duplicates are still addressable." },
];

function RemovableDemo() {
  const [tags, setTags] = useState(["Design", "Engineering", "Q3"]);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <Tags tags={tags} onRemove={(_, index) => setTags(tags.filter((_, i) => i !== index))} />
      {tags.length === 0 && (
        <button
          className="text-xs text-ink-subtle underline"
          onClick={() => setTags(["Design", "Engineering", "Q3"])}
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default function TagsPage() {
  return (
    <article>
      <PageHeader title="Tags" description="A row of labels, optionally removable, for the tags attached to a record." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Tags tags={["Design", "Engineering", "Q3"]} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Removable is all-or-nothing</h2>
          <p className="mb-3 text-sm text-ink-muted">
            There&apos;s no per-tag flag: passing <code>onRemove</code> makes
            every tag removable. If some are locked, filter them into a separate{" "}
            <code>Tags</code> row without the handler.
          </p>
          <p className="mb-3 text-sm text-ink-muted">
            Remove by <code>index</code> rather than value when tags might
            repeat — filtering on the string would drop both copies.
          </p>
          <ComponentPreview code={REMOVABLE}>
            <RemovableDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Tags or badges?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <a href="/docs/components/badge" className="font-medium text-ink underline underline-offset-2">Badge</a>{" "}
            is one label with a colour and meaning — a status. Tags is a
            collection of user-supplied, equal-weight labels. And if the point
            is choosing tags rather than displaying them, that&apos;s a{" "}
            <a href="/docs/components/combobox" className="font-medium text-ink underline underline-offset-2">Combobox</a>{" "}
            in multi mode.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/tags" />
    </article>
  );
}
