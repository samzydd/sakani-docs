"use client";

import { useState } from "react";
import { ProductGallery } from "@sakaniui/react";
import { galleryImages } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `const images = [
  { src: "/mug-front.jpg", alt: "Front view" },
  { src: "/mug-side.jpg", alt: "Side view" },
  { src: "/mug-detail.jpg", alt: "Detail" },
];

<ProductGallery images={images} />`;

const LEFT = `<ProductGallery images={images} thumbsPosition="left" />`;

const CONTROLLED = `const [index, setIndex] = useState(0);

// Controlled, so a colour swatch elsewhere on the page can jump
// the gallery to that variant's photo.
<ProductGallery images={images} activeIndex={index} onActiveIndexChange={setIndex} />`;

const PROPS = [
  { name: "images", type: "{ src: string; alt?: string }[]", description: "The images, in display order." },
  { name: "thumbsPosition", type: "'bottom' | 'left'", default: "'bottom'", description: "Where the thumbnail strip sits." },
  { name: "activeIndex", type: "number", description: "Controlled selection. Omit to let the gallery manage its own." },
  { name: "defaultActiveIndex", type: "number", default: "0", description: "Initial selection when uncontrolled." },
  { name: "onActiveIndexChange", type: "(index: number) => void", description: "Fires when the selection changes, in both modes." },
];

function ControlledDemo() {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3">
      <ProductGallery images={galleryImages} activeIndex={index} onActiveIndexChange={setIndex} />
      <div className="flex gap-2">
        {galleryImages.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setIndex(i)}
            className="rounded-full border border-line-subtle px-2 py-0.5 text-xs text-ink-muted hover:text-ink"
          >
            {i + 1}
          </button>
        ))}
      </div>
      <p className="text-xs text-ink-muted">Showing image {index + 1}</p>
    </div>
  );
}

export default function ProductGalleryPage() {
  return (
    <article>
      <PageHeader title="Product Gallery" description="An image viewer with a thumbnail strip, usable controlled or uncontrolled." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <ProductGallery images={galleryImages} />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Control it when the page has other inputs</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Uncontrolled is fine for a plain gallery. Pass{" "}
            <code>activeIndex</code> when something else on the page should be
            able to move it — picking a colour swatch jumping to that
            variant&apos;s photo, for instance.
          </p>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Thumbnails on the left</h2>
          <ComponentPreview code={LEFT}>
            <div className="w-full max-w-sm">
              <ProductGallery images={galleryImages} thumbsPosition="left" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/product-gallery" />
    </article>
  );
}
