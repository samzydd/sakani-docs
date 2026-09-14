"use client";

import { BlogListingCard, BlogListingFeaturedCard } from "@sakaniui/react";
import { productImage } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CARD = `<BlogListingCard
  image="/post.jpg"
  category="Engineering"
  readTime="11 mins read"
  title="Why your design system drifts"
  excerpt="Two artefacts maintained by hand will always diverge. Generating one from the other is the only fix that holds."
  author={{ name: "Amara Chen", date: "Aug 12, 2026" }}
/>`;

const HORIZONTAL = `<BlogListingCard layout="horizontal" … />`;

const FEATURED = `<BlogListingFeaturedCard
  image="/post.jpg"
  badgeLabel="Featured"
  title="A year of shipping from one Figma file"
  author={{ name: "Amara Chen", date: "Aug 12, 2026", initials: "AK" }}
/>`;

const CARD_PROPS = [
  { name: "image / imageAlt", type: "string", description: "Cover image and alt text." },
  { name: "category", type: "string", description: "Category label above the title." },
  { name: "readTime", type: "string", description: "Pre-formatted, e.g. \"11 mins read\" — nothing is computed from word count." },
  { name: "title", type: "string", description: "Post title." },
  { name: "excerpt", type: "string", description: "Required. The standfirst under the title." },
  { name: "author", type: "{ name: string; date: string; avatarSrc?: string; avatarAlt?: string }", description: "Byline. date is pre-formatted and rendered after the name." },
  { name: "layout", type: "'default' | 'horizontal'", default: "'default'", description: "Horizontal puts the image beside the text, for list views." },
];

const FEATURED_PROPS = [
  { name: "image / imageAlt", type: "string", description: "Cover image and alt text." },
  { name: "badgeLabel", type: "string", default: "'Featured'", description: "The pill on the image." },
  { name: "title", type: "string", description: "Post title." },
  { name: "excerpt", type: "string", description: "Required. The standfirst under the title." },
  { name: "author", type: "{ name; date; avatarSrc?; avatarAlt?; initials? }", description: "Byline. initials render when there's no avatar image." },
  { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Layout of image against text." },
];

export default function BlogListingPage() {
  return (
    <article>
      <PageHeader title="Blog Listing" description="Cards for an article index: the standard tile and the larger featured variant." />

      <div className="space-y-10">
        <ComponentPreview code={CARD}>
          <div className="w-full max-w-[20rem]">
            <BlogListingCard
              image={productImage}
              imageAlt="Cover"
              category="Engineering"
              readTime="11 mins read"
              title="Why your design system drifts"
              excerpt="Two artefacts maintained by hand will always diverge. Generating one from the other is the only fix that holds."
              author={{ name: "Amara Chen", date: "Aug 12, 2026" }}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Dates and read times are strings</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Neither card parses a <code>Date</code> or counts words. Format both
            upstream, where you know the reader&apos;s locale and how you want
            to round — &quot;11 mins read&quot; vs &quot;~10 min&quot; is an
            editorial choice, not something a card should decide.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Horizontal layout</h2>
          <ComponentPreview code={HORIZONTAL}>
            <div className="w-full max-w-lg">
              <BlogListingCard
                layout="horizontal"
                image={productImage}
                category="Engineering"
                readTime="6 mins read"
                title="Shipping dark mode from day one"
                excerpt="Retrofitting a second theme is expensive. Building both from the same semantic layer costs almost nothing."
                author={{ name: "Daniel Osei", date: "Sep 2, 2026" }}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Featured card</h2>
          <ComponentPreview code={FEATURED}>
            <div className="w-full max-w-lg">
              <BlogListingFeaturedCard
                image={productImage}
                title="A year of shipping from one Figma file"
                excerpt="What we learned exporting 114 components 1:1, and the three places the approach nearly broke."
                author={{ name: "Amara Chen", date: "Aug 12, 2026", initials: "AK" }}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">BlogListingCard props</h2>
          <PropsTable rows={CARD_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">BlogListingFeaturedCard props</h2>
          <PropsTable rows={FEATURED_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/blog-listing" />
    </article>
  );
}
