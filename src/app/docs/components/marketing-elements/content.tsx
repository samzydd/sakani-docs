"use client";

import { Shield, Zap, Layers } from "lucide-react";
import {
  FeaturedIcon,
  Metric,
  SubFeature,
  PlaceholderLogo,
  LocationDot,
  Marquee,
  JobListing,
} from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const ICONS = `<FeaturedIcon icon={<Zap size={20} />} variant="light" />
<FeaturedIcon icon={<Zap size={20} />} variant="outline" />
<FeaturedIcon icon={<Zap size={20} />} variant="solid" />
<FeaturedIcon icon={<Zap size={20} />} variant="subtle" />`;

const METRICS = `<Metric value="99.98%" label="Uptime" />
<Metric value="21.3K" label="Teams shipping" trend={12.4} />
<Metric value="1.2s" label="Median build" trend={-0.2} />`;

const SUBFEATURES = `<SubFeature
  icon={<Shield size={18} />}
  title="Token-driven"
  description="Every colour and radius traces back to one variable."
/>

<SubFeature layout="vertical" leftBorder … />`;

const LOGOS = `<Marquee gap={32} items={logos} speed={40} />`;

const JOB = `<JobListing
  title="Senior Design Engineer"
  description="Own the component library end to end, from Figma to npm."
  department="Design"
  employmentType="Full-time"
  location="Remote"
  onApply={apply}
/>`;

const PROPS = [
  { name: "FeaturedIcon", type: "icon, size, variant", description: "An icon in a decorated container. variant is 'light' | 'outline' | 'solid' | 'subtle' — named that way because `style` would collide with the DOM prop." },
  { name: "Metric", type: "value, label, trend", description: "A headline stat. value is a pre-formatted string; a signed trend renders the up/down chip." },
  { name: "SubFeature", type: "icon, title, description, layout, leftBorder", description: "A small feature entry for a grid. layout is 'horizontal' | 'vertical'." },
  { name: "PlaceholderLogo", type: "size, logo, label", description: "A stand-in logo for mockups. Defaults to the Sakani mark." },
  { name: "LocationDot", type: "location, status", description: "A location with a status dot; status is 'active' | 'remote'." },
  { name: "Marquee", type: "items, gap, speed", description: "Scrolling strip of arbitrary nodes. gap is required — Figma uses 32 for logos and 12 for text, so there's no safe default." },
  { name: "JobListing", type: "title, description, department, employmentType, location, locationStatus, onApply, applyLabel, layout", description: "A careers-page row. layout is 'card' | 'row'." },
];

export default function MarketingElementsPage() {
  return (
    <article>
      <PageHeader title="Marketing Elements" description="The small pieces marketing pages are built from: featured icons, metrics, sub-features, logos, and job listings." />

      <div className="space-y-10">
        <ComponentPreview code={ICONS}>
          <div className="flex flex-wrap items-center gap-4">
            <FeaturedIcon icon={<Zap size={20} />} variant="light" />
            <FeaturedIcon icon={<Zap size={20} />} variant="outline" />
            <FeaturedIcon icon={<Zap size={20} />} variant="solid" />
            <FeaturedIcon icon={<Zap size={20} />} variant="subtle" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Metrics</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>value</code> is a string, so &quot;21.3K&quot; and
            &quot;99.98%&quot; render exactly as written. <code>trend</code> is
            a signed number and drives the chip&apos;s direction and colour.
          </p>
          <ComponentPreview code={METRICS}>
            <div className="flex flex-wrap items-start gap-8">
              <Metric value="99.98%" label="Uptime" />
              <Metric value="21.3K" label="Teams shipping" trend={12.4} />
              <Metric value="1.2s" label="Median build" trend={-0.2} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sub-features</h2>
          <ComponentPreview code={SUBFEATURES}>
            <div className="flex w-full max-w-lg flex-col gap-5">
              <SubFeature
                icon={<Shield size={18} />}
                title="Token-driven"
                description="Every colour and radius traces back to one variable."
              />
              <SubFeature
                layout="vertical"
                leftBorder
                icon={<Layers size={18} />}
                title="Composable blocks"
                description="Copy the source and edit it, rather than configuring around it."
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Logos and marquee</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>gap</code> on Marquee has no default on purpose: logo strips
            and text strips want very different spacing, so it&apos;s better to
            state it than inherit a wrong guess.
          </p>
          <ComponentPreview code={LOGOS}>
            <div className="flex w-full max-w-lg flex-col gap-6">
              <div className="flex items-center gap-4">
                <PlaceholderLogo size="sm" label="Acme Inc." />
                <PlaceholderLogo size="md" label="Globex" />
                <PlaceholderLogo size="lg" label="Initech" />
              </div>
              <Marquee
                gap={32}
                speed={40}
                items={[
                  <PlaceholderLogo key="1" size="sm" label="Acme" />,
                  <PlaceholderLogo key="2" size="sm" label="Globex" />,
                  <PlaceholderLogo key="3" size="sm" label="Initech" />,
                  <PlaceholderLogo key="4" size="sm" label="Umbrella" />,
                ]}
              />
              <div className="flex items-center gap-4">
                <LocationDot location="Lagos, NG" status="active" />
                <LocationDot location="Remote" status="remote" />
              </div>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Job listings</h2>
          <ComponentPreview code={JOB}>
            <div className="w-full max-w-lg">
              <JobListing
                title="Senior Design Engineer"
                description="Own the component library end to end, from Figma to npm."
                department="Design"
                employmentType="Full-time"
                location="Remote"
                onApply={() => {}}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/marketing-elements" />
    </article>
  );
}
