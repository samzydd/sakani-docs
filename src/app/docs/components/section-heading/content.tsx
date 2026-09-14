"use client";

import { SectionHeading, FirstPageHeading } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const SECTION = `<SectionHeading
  eyebrow="Features"
  title="Everything a real product needs"
  subtitle="Not a component playground: a system built to ship actual screens."
/>`;

const LEFT = `<SectionHeading align="left" title="Browse everything" subtitle="Organized by category." />`;

const HERO = `<FirstPageHeading
  badgeLabel="v0.3.3 is out"
  title="Design and engineering, finally on the same page."
  description="114+ components and 41 blocks, matching your Figma file exactly."
  primaryCta={{ label: "Get started", onClick: start }}
  secondaryCta={{ label: "View on GitHub", onClick: openRepo }}
  avatars={[{ initials: "AK" }, { initials: "DO" }, { initials: "PR" }]}
  avatarsCaption="21.3K happy users"
/>`;

const SECTION_PROPS = [
  { name: "title", type: "string", description: "The heading itself." },
  { name: "eyebrow", type: "string", description: "Small pill above the title. Omit to hide it." },
  { name: "subtitle", type: "string", description: "Supporting line below." },
  { name: "align", type: "'center' | 'left'", default: "'center'", description: "Left reads better when the content under it is also left-aligned." },
  { name: "titleAs", type: "'h1' | 'h2' | 'h3' | 'h4'", default: "'h2'", description: "Tag for the title. Change it to keep the document outline correct, not to change the size." },
];

const HERO_PROPS = [
  { name: "title", type: "string", description: "Hero headline." },
  { name: "description", type: "string", description: "Supporting paragraph." },
  { name: "badgeLabel", type: "string", description: "Pill above the title. Its presence is what renders the badge." },
  { name: "primaryCta / secondaryCta", type: "{ label: string; onClick?: () => void }", description: "The two buttons." },
  { name: "avatars", type: "AvatarGroupProps['avatars']", description: "A non-empty array renders the overlapping social-proof stack." },
  { name: "avatarsCaption", type: "string", description: "Caption under that stack, e.g. \"21.3K happy users\"." },
  { name: "align", type: "'center' | 'left'", default: "'center'", description: "Hero alignment." },
];

export default function SectionHeadingPage() {
  return (
    <article>
      <PageHeader title="Section Heading" description="The eyebrow/title/subtitle block that opens a section, and the larger first-page hero version." />

      <div className="space-y-10">
        <ComponentPreview code={SECTION}>
          <div className="w-full max-w-lg">
            <SectionHeading
              eyebrow="Features"
              title="Everything a real product needs"
              subtitle="Not a component playground: a system built to ship actual screens."
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">titleAs is about outline, not size</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The title always looks like a section heading; <code>titleAs</code>{" "}
            only changes which tag it renders. Set it so the page&apos;s heading
            levels nest properly — a section inside an <code>h2</code> should
            use <code>h3</code>, regardless of how big it looks.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Left-aligned</h2>
          <ComponentPreview code={LEFT}>
            <div className="w-full max-w-lg">
              <SectionHeading
                align="left"
                title="Browse everything"
                subtitle="114+ components and 41 blocks, organized by category."
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">First-page hero</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>FirstPageHeading</code> is the bigger, once-per-page version,
            with slots for CTAs and an avatar stack for social proof. Each of
            those is opt-in by presence rather than a toggle.
          </p>
          <ComponentPreview code={HERO}>
            <div className="w-full max-w-lg">
              <FirstPageHeading
                badgeLabel="v0.3.3 is out"
                title="Design and engineering, finally on the same page."
                description="114+ components and 41 blocks, matching your Figma file exactly."
                primaryCta={{ label: "Get started" }}
                secondaryCta={{ label: "View on GitHub" }}
                avatars={[{ initials: "AK" }, { initials: "DO" }, { initials: "PR" }]}
                avatarsCaption="21.3K happy users"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">SectionHeading props</h2>
          <PropsTable rows={SECTION_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">FirstPageHeading props</h2>
          <PropsTable rows={HERO_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/section-heading" />
    </article>
  );
}
