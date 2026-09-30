"use client";

import {
  TestimonialBlock,
  FaqBlock,
  TeamSectionBlock,
  CareersBlock,
  BlogListingBlock,
} from "@sakaniui/react/blocks";
import { InstagramIcon, FacebookIcon, LinkedinIcon } from "@/components/docs/social-icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const TESTIMONIALS = `// One testimonial renders the large single-quote layout;
// two or more switch to the grid. There's no layout prop.
<TestimonialBlock
  testimonials={[
    {
      quote: 'Sakani cut our design-to-dev handoff time in half. Every component already matches what ships — no more guessing at spacing or states.',
      authorName: 'Amara Kalu',
      authorRole: 'Head of Product, Fintra',
      authorAvatar: '/testimonial-amara-kalu.jpg',
    },
  ]}
/>`;

const FAQ = `<FaqBlock
  eyebrow="FAQ"
  title="Frequently asked questions"
  columns={1}   // or 2
  items={[
    {
      question: 'Is Sakani free to use?',
      answer: 'Yes — Sakani is fully open source under the MIT license.',
      defaultOpen: true,
    },
    { question: 'Do I need Tailwind or Radix to use it?', answer: '…' },
  ]}
/>`;

const TEAM = `// TeamSectionMember is TeamCardProps plus an optional id.
<TeamSectionBlock
  eyebrow="Team"
  title="The people building Sakani"
  subtitle="A small, distributed team focused on making one design system genuinely excellent."
  members={[
    {
      image: '/marvin-mckinney.jpg',
      name: 'Marvin McKinney',
      role: 'Design Lead',
      location: 'NY, USA',
      socialLinks: [{ icon: <InstagramIcon />, label: 'Instagram', href: '#' }],
    },
  ]}
/>`;

const CAREERS = `// CareersJob is JobListingProps minus layout.
<CareersBlock
  eyebrow="Careers"
  title="Come build with us"
  subtitle="We're a small, remote-friendly team. Here's what's open right now."
  jobs={[
    {
      title: 'Senior Product Designer',
      description: 'Lead end-to-end product design from discovery through delivery.',
      department: 'Design',
      employmentType: 'Full-time',
      location: 'Lagos, Nigeria',
      locationStatus: 'active',
    },
  ]}
/>`;

const BLOG = `<BlogListingBlock
  eyebrow="Blog"
  title="From the blog"
  subtitle="Notes on building, maintaining, and scaling a real design system."
  featuredPost={featured}
  posts={posts}
/>`;

// The same copy and photography as the Figma frames (and the Storybook
// stories), served from /public so every preview matches the design.
const IMG = "/blocks";

const TESTIMONIAL_SINGLE = [
  {
    quote: "Sakani cut our design-to-dev handoff time in half. Every component already matches what ships — no more guessing at spacing or states.",
    authorName: "Amara Kalu",
    authorRole: "Head of Product, Fintra",
    authorAvatar: `${IMG}/marketing/testimonial-amara-kalu.jpg`,
  },
];

const TESTIMONIAL_GRID = [
  {
    quote: "The state coverage alone saved us weeks — every error and loading case was already thought through.",
    authorName: "Ravi Menon",
    authorRole: "Founder, Loopline",
    authorAvatar: `${IMG}/marketing/testimonial-ravi-menon.jpg`,
  },
  {
    quote: "Figma and code finally stay in sync. No more components drifting apart after a sprint.",
    authorName: "Chidi Duru",
    authorRole: "Design Lead, Bexa",
    authorAvatar: `${IMG}/marketing/testimonial-chidi-duru.jpg`,
  },
  {
    quote: "We shipped our MVP in three weeks using Sakani blocks instead of building from scratch.",
    authorName: "Jade Silva",
    authorRole: "Engineer, Northstack",
    authorAvatar: `${IMG}/marketing/testimonial-jade-silva.jpg`,
  },
];

const FAQ_DATA = [
  { question: "Is Sakani free to use?", answer: "Yes — Sakani is fully open source under the MIT license. Use it in personal or commercial projects at no cost.", defaultOpen: true },
  { question: "Do I need Tailwind or Radix to use it?", answer: "No. Sakani ships with its own CSS Modules and token layer, so it works independently of any other styling framework." },
  { question: "How closely does Figma match the code?", answer: "Every component, variant, and state in Figma has a 1:1 counterpart in the React library, down to spacing and color tokens." },
  { question: "Can I customize the design tokens?", answer: "Yes — every color, spacing, and radius value is a CSS variable. Override them once and the whole system updates." },
  { question: "Is it accessible?", answer: "Accessibility is an active focus area — see our roadmap for the current state of keyboard and screen-reader support." },
  { question: "How do I contribute?", answer: "Sakani is open source on GitHub — issues and pull requests are welcome." },
];

const SOCIALS = [
  { icon: <InstagramIcon />, label: "Instagram", href: "#" },
  { icon: <FacebookIcon />, label: "Facebook", href: "#" },
  { icon: <LinkedinIcon />, label: "LinkedIn", href: "#" },
];

const MEMBERS = [
  { id: "1", image: `${IMG}/marketing/team-section-marvin-mckinney.jpg`, name: "Marvin McKinney", role: "Design Lead", location: "NY, USA", socialLinks: SOCIALS },
  { id: "2", image: `${IMG}/marketing/team-card-chidi-duru.jpg`, name: "Chidi Duru", role: "Design Lead", location: "Lagos, Nigeria", socialLinks: SOCIALS },
  { id: "3", image: `${IMG}/marketing/team-section-floyd-miles.jpg`, name: "Floyd Miles", role: "Pool Hygiene Specialist", location: "London, England", socialLinks: SOCIALS },
  { id: "4", image: `${IMG}/marketing/team-section-darlene-robertson.jpg`, name: "Darlene Robertson", role: "Sonographer", location: "Lagos, Nigeria", socialLinks: SOCIALS },
];

const JOBS = [
  {
    id: "1",
    title: "Senior Product Designer",
    description: "Lead end-to-end product design from discovery through delivery, shaping intuitive experiences that drive business impact.",
    department: "Design",
    employmentType: "Full-time",
    location: "Lagos, Nigeria",
    locationStatus: "active" as const,
  },
  {
    id: "2",
    title: "Staff Engineer, Design Systems",
    description: "Own the architecture of our component library and drive Figma-to-code parity across the product.",
    department: "Engineering",
    employmentType: "Full-time",
    location: "Remote — Worldwide",
    locationStatus: "remote" as const,
  },
  {
    id: "3",
    title: "Content Marketing Lead",
    description: "Shape the voice and editorial strategy behind our blog, docs, and product launches.",
    department: "Marketing",
    employmentType: "Full-time",
    location: "Lagos, Nigeria",
    locationStatus: "active" as const,
  },
];

const FEATURED_POST = {
  image: "/marketing/blog-image-balloons.jpg",
  title: "The complete guide to building a design system that survives year two",
  excerpt: "A practical breakdown of tokens, governance, and the maintenance work most teams underestimate.",
  author: { name: "Amara Kalu", date: "Aug 12, 2026", avatarSrc: `${IMG}/avatars/activity-amara-kalu.jpg` },
};

const POSTS = [
  {
    id: "1",
    image: `${IMG}/products/card-mug.jpg`,
    category: "Design",
    readTime: "11 mins read",
    title: "Token-driven theming, explained",
    excerpt: "Why every color should be a variable, not a hex code.",
    author: { name: "Chidi Duru", date: "Aug 5, 2026", avatarSrc: `${IMG}/avatars/activity-chidi-duru.jpg` },
  },
  {
    id: "2",
    image: `${IMG}/products/card-table-runner.jpg`,
    category: "Process",
    readTime: "11 mins read",
    title: "How we review component PRs",
    excerpt: "The checklist we run before anything ships to the library.",
    author: { name: "Ravi Menon", date: "Jul 28, 2026", avatarSrc: `${IMG}/avatars/activity-ravi-menon.jpg` },
  },
  {
    id: "3",
    image: `${IMG}/products/card-serving-board.jpg`,
    category: "Engineering",
    readTime: "11 mins read",
    title: "Figma-to-code parity, in practice",
    excerpt: "What it actually takes to keep design and code from drifting apart.",
    author: { name: "Jade Silva", date: "Jul 20, 2026", avatarSrc: `${IMG}/avatars/activity-jade-silva.jpg` },
  },
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
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Testimonials</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The layout follows the data: one testimonial renders Figma&apos;s
            large single-quote style, two or more switch to the grid.
          </p>
          <ComponentPreview code={TESTIMONIALS} scaleToFit>
            <div className="flex w-full flex-col gap-8">
              <TestimonialBlock testimonials={TESTIMONIAL_SINGLE} />
              <TestimonialBlock testimonials={TESTIMONIAL_GRID} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">FAQ</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>defaultOpen</code> on the first item saves the reader a click
            and shows the answers are short — worth doing unless the list is
            long enough that an open item hides the rest.
          </p>
          <ComponentPreview code={FAQ} scaleToFit>
            <FaqBlock eyebrow="FAQ" title="Frequently asked questions" items={FAQ_DATA} />
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
          <div className="space-y-6">
            <ComponentPreview code={TEAM} scaleToFit>
              <TeamSectionBlock
                eyebrow="Team"
                title="The people building Sakani"
                subtitle="A small, distributed team focused on making one design system genuinely excellent."
                members={MEMBERS}
              />
            </ComponentPreview>
            <ComponentPreview code={CAREERS} scaleToFit>
              <CareersBlock
                eyebrow="Careers"
                title="Come build with us"
                subtitle="We're a small, remote-friendly team. Here's what's open right now."
                jobs={JOBS}
              />
            </ComponentPreview>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Blog index</h2>
          <ComponentPreview code={BLOG} scaleToFit>
            <BlogListingBlock
              eyebrow="Blog"
              title="From the blog"
              subtitle="Notes on building, maintaining, and scaling a real design system."
              featuredPost={FEATURED_POST}
              posts={POSTS}
            />
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
