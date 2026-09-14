"use client";

import {
  RichTextHeading,
  RichTextParagraph,
  BlogBlockquote,
  BlogImage,
  BlogFeatureText,
  List,
} from "@sakaniui/react";
import { productImage } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BODY = `<RichTextHeading level="h2">Why a single source of truth</RichTextHeading>

<RichTextParagraph>
  Most design systems drift because the Figma file and the code are maintained
  separately. Sakani exports one from the other.
</RichTextParagraph>

<List
  style="check"
  items={["Tokens match exactly", "States are real, not redrawn", "Dark mode ships from day one"]}
/>`;

const QUOTE = `// Passing author switches to the card treatment with quote glyphs.
<BlogBlockquote quote="We deleted three thousand lines of one-off CSS." />

<BlogBlockquote
  quote="We deleted three thousand lines of one-off CSS."
  author={{ name: "Amara Chen", role: "Founder at Loopline" }}
/>`;

const IMAGE = `<BlogImage src="/diagram.png" alt="Token pipeline" caption="Tokens flow one way: Figma to code." />`;

const FEATURE = `<BlogFeatureText text="The handoff problem isn't communication. It's that two artefacts drift." />`;

const HEADING_PROPS = [
  { name: "children", type: "ReactNode", description: "Heading text." },
  { name: "level", type: "'h2' | 'h3'", default: "'h2'", description: "Renders the matching tag, so document outline stays correct." },
];

const OTHER_PROPS = [
  { name: "RichTextParagraph", type: "children", description: "A body paragraph at the article's measure." },
  { name: "List", type: "items, style", description: "style is 'check' | 'bullet' | 'arrow'; items are plain strings." },
  { name: "BlogBlockquote", type: "quote, author", description: "author ({ name, role, avatarSrc? }) switches from a plain pull-quote to the attributed card." },
  { name: "BlogImage", type: "src, alt, size, caption", description: "size is 'large' | 'small'; a caption renders the centred row beneath." },
  { name: "BlogFeatureText", type: "text, align", description: "An oversized pull-out line. align is 'left' | 'top'." },
];

export default function RichTextPage() {
  return (
    <article>
      <PageHeader title="Rich Text" description="The building blocks of an article body: headings, paragraphs, lists, quotes, and images." />

      <div className="space-y-10">
        <ComponentPreview code={BODY}>
          <div className="flex w-full max-w-lg flex-col gap-4">
            <RichTextHeading level="h2">Why a single source of truth</RichTextHeading>
            <RichTextParagraph>
              Most design systems drift because the Figma file and the code are
              maintained separately. Sakani exports one from the other.
            </RichTextParagraph>
            <List
              style="check"
              items={[
                "Tokens match exactly",
                "States are real, not redrawn",
                "Dark mode ships from day one",
              ]}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">For rendered content, not your layout</h2>
          <p className="mb-3 text-sm text-ink-muted">
            These exist to render article bodies coming out of a CMS or MDX
            pipeline at a consistent measure and rhythm. For headings that are
            part of the page&apos;s own furniture, use{" "}
            <a href="/docs/components/section-heading" className="font-medium text-ink underline underline-offset-2">Section Heading</a>{" "}
            instead.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Quotes</h2>
          <ComponentPreview code={QUOTE}>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <BlogBlockquote quote="We deleted three thousand lines of one-off CSS." />
              <BlogBlockquote
                quote="We deleted three thousand lines of one-off CSS."
                author={{ name: "Amara Chen", role: "Founder at Loopline" }}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Images and pull-outs</h2>
          <ComponentPreview code={`${IMAGE}\n\n${FEATURE}`}>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <BlogImage
                src={productImage}
                alt="Token pipeline"
                size="small"
                caption="Tokens flow one way: Figma to code."
              />
              <BlogFeatureText text="The handoff problem isn't communication. It's that two artefacts drift." />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">List styles</h2>
          <ComponentPreview code={`<List style="check" items={items} />\n<List style="bullet" items={items} />\n<List style="arrow" items={items} />`}>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <List style="check" items={["Checked", "Second item"]} />
              <List style="bullet" items={["Bulleted", "Second item"]} />
              <List style="arrow" items={["Arrowed", "Second item"]} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">RichTextHeading props</h2>
          <PropsTable rows={HEADING_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The rest of the set</h2>
          <PropsTable rows={OTHER_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/rich-text" />
    </article>
  );
}
