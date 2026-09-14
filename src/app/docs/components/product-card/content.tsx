"use client";

import { ProductCard } from "@sakaniui/react";
import { productImage } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<ProductCard
  image="/mug.jpg"
  name="Ceramic Pour-Over Mug"
  description="Stoneware, 340ml"
  price={38}
  rating={4.5}
  reviewCount={126}
/>`;

const SALE = `// compareAtPrice is what turns on the sale treatment:
// a badge, the original struck through, the current price in danger.
<ProductCard image="/mug.jpg" name="Ceramic Pour-Over Mug" price={28} compareAtPrice={38} />`;

const COLORS = `<ProductCard
  image="/mug.jpg"
  name="Ceramic Pour-Over Mug"
  price={38}
  colors={[
    { id: "sand", color: "#d6ccc2", label: "Sand" },
    { id: "slate", color: "#4b5563", label: "Slate" },
    { id: "clay", color: "#b45309", label: "Clay", available: false },
  ]}
  onColorSelect={setColor}
/>`;

const OUT_OF_STOCK = `<ProductCard image="/mug.jpg" name="Ceramic Pour-Over Mug" price={38} inStock={false} />`;

const COLORS_DATA = [
  { id: "sand", color: "#d6ccc2", label: "Sand" },
  { id: "slate", color: "#4b5563", label: "Slate" },
  { id: "clay", color: "#b45309", label: "Clay", available: false },
];

const PROPS = [
  { name: "image / imageAlt", type: "string", description: "Product photo and its alt text." },
  { name: "name", type: "string", description: "Product name." },
  { name: "description", type: "string", description: "Short supporting line." },
  { name: "price", type: "number", description: "Raw number, formatted by the component." },
  { name: "compareAtPrice", type: "number", description: "The was-price. Its presence switches the card to the sale treatment." },
  { name: "rating / reviewCount", type: "number", description: "Star rating out of 5 and the number of reviews behind it." },
  { name: "colors", type: "ProductCardColor[]", description: "Swatches: { id?, color, label, available? }. id falls back to label." },
  { name: "onColorSelect", type: "(id: string) => void", description: "Fires with the selected swatch's id." },
  { name: "inStock", type: "boolean", description: "False dims the card and blocks the add action." },
  { name: "wishlisted", type: "boolean", description: "Fills the wishlist heart." },
];

export default function ProductCardPage() {
  return (
    <article>
      <PageHeader title="Product Card" description="A product tile for grids and carousels, with pricing, rating, swatches, and stock state built in." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-[16rem]">
            <ProductCard
              image={productImage}
              imageAlt="Ceramic pour-over mug"
              name="Ceramic Pour-Over Mug"
              description="Stoneware, 340ml"
              price={38}
              rating={4.5}
              reviewCount={126}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sale pricing is derived</h2>
          <p className="mb-3 text-sm text-ink-muted">
            There&apos;s no <code>onSale</code> flag: passing{" "}
            <code>compareAtPrice</code> is what produces the badge, the struck
            original, and the discounted price — and the saving is computed from
            the two numbers, so it can&apos;t contradict them.
          </p>
          <ComponentPreview code={SALE}>
            <div className="w-full max-w-[16rem]">
              <ProductCard
                image={productImage}
                name="Ceramic Pour-Over Mug"
                price={28}
                compareAtPrice={38}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Colour options</h2>
          <ComponentPreview code={COLORS}>
            <div className="w-full max-w-[16rem]">
              <ProductCard
                image={productImage}
                name="Ceramic Pour-Over Mug"
                price={38}
                colors={COLORS_DATA}
                onColorSelect={() => {}}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Out of stock</h2>
          <ComponentPreview code={OUT_OF_STOCK}>
            <div className="w-full max-w-[16rem]">
              <ProductCard
                image={productImage}
                name="Ceramic Pour-Over Mug"
                price={38}
                inStock={false}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/product-card" />
    </article>
  );
}
