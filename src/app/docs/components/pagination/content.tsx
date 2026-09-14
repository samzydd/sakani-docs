"use client";

import { useState } from "react";
import { Pagination } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `const [page, setPage] = useState(1);

<Pagination total={10} page={page} onPageChange={setPage} />`;

const SIBLINGS = `// How many numbers flank the current page before it collapses to an ellipsis.
<Pagination total={24} page={12} siblings={1} onPageChange={setPage} />
<Pagination total={24} page={12} siblings={2} onPageChange={setPage} />`;

const FOOTER = `<div className="flex items-center justify-between">
  <p className="text-sm text-ink-subtle">Showing 1–20 of 482</p>
  <Pagination total={25} page={page} onPageChange={setPage} />
</div>`;

const PROPS = [
  { name: "total", type: "number", description: "Total number of pages, not total rows. Divide by your page size first." },
  { name: "page", type: "number", description: "Current page, 1-based." },
  { name: "onPageChange", type: "(page: number) => void", description: "Fires with the requested page." },
  { name: "siblings", type: "number", default: "1", description: "How many page numbers to show either side of the current one before collapsing to an ellipsis." },
];

function BasicDemo() {
  const [page, setPage] = useState(1);
  return <Pagination total={10} page={page} onPageChange={setPage} />;
}

function SiblingsDemo() {
  const [page, setPage] = useState(12);
  return (
    <div className="flex flex-col items-center gap-5">
      <Pagination total={24} page={page} siblings={1} onPageChange={setPage} />
      <Pagination total={24} page={page} siblings={2} onPageChange={setPage} />
    </div>
  );
}

function FooterDemo() {
  const [page, setPage] = useState(1);
  return (
    <div className="flex w-full max-w-lg items-center justify-between gap-4">
      <p className="text-sm text-ink-subtle">Showing 1–20 of 482</p>
      <Pagination total={25} page={page} onPageChange={setPage} />
    </div>
  );
}

export default function PaginationPage() {
  return (
    <article>
      <PageHeader title="Pagination" description="Page navigation for lists and tables. Fully controlled: it renders the state you pass it." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <BasicDemo />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">It doesn&apos;t hold state</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>page</code> and <code>onPageChange</code> are both required.
            The component never moves on its own, which is what lets the same
            page number live in a URL query param or a data-fetching hook rather
            than being trapped in here.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Siblings</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Higher values keep more context visible at the cost of width. Below,
            the same page in a 24-page set with one sibling and then two.
          </p>
          <ComponentPreview code={SIBLINGS}>
            <SiblingsDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">In a table footer</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Pair it with a count so people know the size of what they&apos;re
            paging through, not just where they are in it.
          </p>
          <ComponentPreview code={FOOTER}>
            <FooterDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/pagination" />
    </article>
  );
}
