"use client";

import {
  TestimonialBlock,
  FaqBlock,
  TeamSectionBlock,
  CareersBlock,
  BlogListingBlock,
} from "@sakaniui/react/blocks";
import { productImage } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const TESTIMONIALS = `<TestimonialBlock
  testimonials={[
    {
      quote: 'We deleted three thousand lines of one-off CSS.',
      authorName: 'Amara Chen',
      authorRole: 'Founder at Loopline',
    },
  ]}
/>`;

const FAQ = `<FaqBlock
  title="Frequently asked questions"
  items={[
    { question: 'Is Sakani free?', answer: 'Yes. MIT licensed.', defaultOpen: true },
    { question: 'Does it work with Next.js?', answer: 'Yes — React 19 is the only peer dependency.' },
  ]}
/>`;

const TEAM = `// TeamSectionMember is TeamCardProps plus an optional id.
<TeamSectionBlock
  eyebrow="Team"
  title="The people behind it"
  members={[
    { image: '/amara.jpg', name: 'Amara Chen', role: 'Head of Design', location: 'Lagos, NG' },
  ]}
/>`;

const CAREERS = `// CareersJob is JobListingProps minus layout.
<CareersBlock
  title="Open roles"
  jobs={[
    {
      title: 'Senior Design Engineer',
      description: 'Own the component library end to end.',
      department: 'Design',
      employmentType: 'Full-time',
      location: 'Remote',
    },
  ]}
/>`;

const BLOG = `<BlogListingBlock
  title="Writing"
  featuredPost={featured}
  posts={posts}
/>`;

const TESTIMONIAL_DATA = [
  { quote: "We deleted three thousand lines of one-off CSS.", authorName: "Amara Chen", authorRole: "Founder at Loopline" },
  { quote: "The Figma file and the code finally agree.", authorName: "Daniel Osei", authorRole: "Engineering lead at Northwind" },
];

const FAQ_DATA = [
  { question: "Is Sakani free?", answer: "Yes. MIT licensed and free in commercial projects.", defaultOpen: true },
  { question: "Does it work with Next.js?", answer: "Yes — React 19 is the only peer dependency." },
];

const MEMBERS = [
  { id: "1", image: productImage, name: "Amara Chen", role: "Head of Design", location: "Lagos, NG" },
  { id: "2", image: productImage, name: "Daniel Osei", role: "Engineering lead", location: "Remote", locationStatus: "remote" as const },
];

const JOBS = [
  { id: "1", title: "Senior Design Engineer", description: "Own the component library end to end, from Figma to npm.", department: "Design", employmentType: "Full-time", location: "Remote" },
  { id: "2", title: "Technical Writer", description: "Make 114 components genuinely learnable.", department: "Docs", employmentType: "Contract", location: "Lagos, NG" },
];

const FEATURED_POST = {
  image: productImage,
  title: "A year of shipping from one Figma file",
  excerpt: "What we learned exporting 114 components 1:1, and the three places the approach nearly broke.",
  author: { name: "Amara Chen", date: "Aug 12, 2026", initials: "AK" },
};

const POSTS = [
  { id: "1", image: productImage, category: "Engineering", readTime: "11 mins read", title: "Why your design system drifts", excerpt: "Two artefacts maintained by hand will always diverge.", author: { name: "Amara Chen", date: "Aug 12, 2026" } },
  { id: "2", image: productImage, category: "Design", readTime: "6 mins read", title: "Shipping dark mode from day one", excerpt: "Retrofitting a second theme is expensive.", author: { name: "Daniel Osei", date: "Sep 2, 2026" } },
];

export default function ContentSectionsPage() {
  return (
    <article>
      <PageHeader
        title="Content Sections"
        description="Testimonials, FAQ, team, careers, and a blog index — the sections a marketing site fills with real content."
      />

      <div className="doc-prose mb-8">
        <p>
          Where the{" "}
          <a href="/docs/blocks/marketing-sections">marketing sections</a> are
          mostly layout, these are data-driven: each takes an array and renders
          the matching component per entry, so they map cleanly onto whatever
          your CMS returns.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={TESTIMONIALS} fullBleed>
          <TestimonialBlock testimonials={TESTIMONIAL_DATA} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">FAQ</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>defaultOpen</code> on the first item saves the reader a click
            and shows the answers are short — worth doing unless the list is
            long enough that an open item hides the rest.
          </p>
          <ComponentPreview code={FAQ} fullBleed>
            <FaqBlock title="Frequently asked questions" items={FAQ_DATA} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Team and careers</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The item types extend the underlying component&apos;s own props —{" "}
            <code>TeamSectionMember</code> is{" "}
            <a href="/docs/components/team-cards" className="font-medium text-ink underline underline-offset-2">TeamCard</a>&apos;s
            props plus an id, and <code>CareersJob</code> is{" "}
            <a href="/docs/components/marketing-elements" className="font-medium text-ink underline underline-offset-2">JobListing</a>&apos;s
            minus <code>layout</code>. Anything you can pass the component, you
            can pass through the block.
          </p>
          <ComponentPreview code={`${TEAM}\n\n${CAREERS}`} fullBleed>
            <div className="flex w-full flex-col gap-8">
              <TeamSectionBlock eyebrow="Team" title="The people behind it" members={MEMBERS} />
              <CareersBlock title="Open roles" jobs={JOBS} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Blog index</h2>
          <ComponentPreview code={BLOG} fullBleed>
            <BlogListingBlock title="Writing" featuredPost={FEATURED_POST} posts={POSTS} />
          </ComponentPreview>
        </section>

        <BlockSource
          blocks={["TestimonialBlock", "FaqBlock", "TeamSectionBlock", "CareersBlock", "BlogListingBlock"]}
        />
      </div>

      <Pager current="/docs/blocks/content-sections" />
    </article>
  );
}
