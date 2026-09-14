"use client";

import { StarRating } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<StarRating rating={4.5} reviewCount={128} />`;

const ORIENTATION = `<StarRating rating={4.5} reviewCount={128} orientation="horizontal" />
<StarRating rating={4.5} reviewCount={128} orientation="vertical" />`;

const PROPS = [
  { name: "rating", type: "number", description: "0–5. Drives the filled/half/empty star count." },
  { name: "reviewCount", type: "number", description: "Shown next to the stars when showLabel is true." },
  { name: "showLabel", type: "boolean", default: "true", description: "Shows the numeric rating + review count text." },
  { name: "orientation", type: "'horizontal' | 'horizontal-reverse' | 'vertical'", default: "'horizontal'", description: "Only meaningful while showLabel is true." },
  { name: "formatReviewCount", type: "(count: number) => string", description: "Custom formatter for the review count text." },
];

export default function StarRatingPage() {
  return (
    <article>
      <PageHeader title="Star Rating" description="An e-commerce product rating display, shared by ProductCard and ProductDetailBlock." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <StarRating rating={4.5} reviewCount={128} />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Orientation</h2>
          <ComponentPreview code={ORIENTATION}>
            <div className="flex items-center gap-8">
              <StarRating rating={4.5} reviewCount={128} orientation="horizontal" />
              <StarRating rating={4.5} reviewCount={128} orientation="vertical" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/star-rating" />
    </article>
  );
}
