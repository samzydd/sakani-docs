"use client";

import { useState } from "react";
import {
  ColorSwatch,
  SizeSelector,
  QuantitySelector,
  StockStatus,
  WishlistButton,
  PriceDisplay,
} from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const PRICE = `<PriceDisplay price={38} />
<PriceDisplay price={28} compareAtPrice={38} showBadge />`;

const SWATCHES = `const [color, setColor] = useState("Sand");

{colors.map((c) => (
  <ColorSwatch
    key={c.label}
    color={c.color}
    label={c.label}
    available={c.available}
    selected={color === c.label}
    onSelect={() => setColor(c.label)}
  />
))}`;

const SIZES = `{["XS", "S", "M", "L", "XL"].map((s) => (
  <SizeSelector
    key={s}
    size={s}
    available={s !== "XS"}
    selected={size === s}
    onSelect={() => setSize(s)}
  />
))}`;

const QTY = `<QuantitySelector
  quantity={qty}
  onQuantityChange={setQty}
  min={1}
  max={10}
  label="Quantity for Ceramic Pour-Over Mug"
/>`;

const STOCK = `<StockStatus quantity={42} />      // In stock
<StockStatus quantity={3} />       // Only 3 left (warning)
<StockStatus quantity={0} />       // Out of stock`;

const WISHLIST = `<WishlistButton saved={saved} onToggle={setSaved} label="Ceramic Pour-Over Mug" />`;

const COLORS = [
  { color: "#d6ccc2", label: "Sand" },
  { color: "#4b5563", label: "Slate" },
  { color: "#b45309", label: "Clay", available: false },
];

const PRICE_PROPS = [
  { name: "price", type: "number", description: "Current price, as a raw number." },
  { name: "compareAtPrice", type: "number", description: "The was-price; switches to the sale treatment." },
  { name: "showBadge", type: "boolean", default: "false", description: "Adds a \"Save X%\" badge computed from the two prices. No-op without compareAtPrice." },
  { name: "formatPrice", type: "(amount: number) => string", description: "Override the default USD formatting." },
];

const OPTION_PROPS = [
  { name: "ColorSwatch", type: "color, label, selected, available, onSelect", description: "label is the accessible name — colour alone isn't one. available={false} renders it disabled rather than hiding it, so people can see the option exists." },
  { name: "SizeSelector", type: "size, selected, available, onSelect", description: "Same pattern: unavailable sizes stay visible but unclickable." },
  { name: "QuantitySelector", type: "quantity, onQuantityChange, min, max, label", description: "Controlled. label names the group for screen readers, so include the product." },
  { name: "StockStatus", type: "quantity, lowStockThreshold, label", description: "Derives its own text and colour from the number; lowStockThreshold defaults to 5. label overrides the text but keeps the derived colour." },
  { name: "WishlistButton", type: "saved, onToggle, label", description: "onToggle receives the new saved state." },
];

function OptionsDemo() {
  const [color, setColor] = useState("Sand");
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <div className="flex items-center gap-2">
        {COLORS.map((c) => (
          <ColorSwatch
            key={c.label}
            color={c.color}
            label={c.label}
            available={c.available}
            selected={color === c.label}
            onSelect={() => setColor(c.label)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {["XS", "S", "M", "L", "XL"].map((s) => (
          <SizeSelector
            key={s}
            size={s}
            available={s !== "XS"}
            selected={size === s}
            onSelect={() => setSize(s)}
          />
        ))}
      </div>
      <div className="flex items-center gap-4">
        <QuantitySelector
          quantity={qty}
          onQuantityChange={setQty}
          min={1}
          max={10}
          label="Quantity for Ceramic Pour-Over Mug"
        />
        <WishlistButton saved={saved} onToggle={setSaved} label="Ceramic Pour-Over Mug" />
      </div>
      <p className="text-xs text-ink-subtle">
        {color} · {size} · ×{qty}
        {saved ? " · saved" : ""}
      </p>
    </div>
  );
}

export default function ProductOptionsPage() {
  return (
    <article>
      <PageHeader title="Product Options" description="The controls on a product detail page: price, swatches, sizes, quantity, stock, and wishlist." />

      <div className="space-y-10">
        <ComponentPreview code={SWATCHES}>
          <OptionsDemo />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Unavailable, not missing</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>ColorSwatch</code> and <code>SizeSelector</code> both take{" "}
            <code>available</code> rather than expecting you to filter the list.
            Showing a greyed-out XL tells someone the size exists and is sold
            out; omitting it leaves them wondering whether you stock it at all.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Price</h2>
          <ComponentPreview code={PRICE}>
            <div className="flex flex-col items-start gap-4">
              <PriceDisplay price={38} />
              <PriceDisplay price={28} compareAtPrice={38} showBadge />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Stock status</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The wording and colour come from the number, so three states
            can&apos;t drift out of sync with the inventory count driving them.
          </p>
          <ComponentPreview code={STOCK}>
            <div className="flex flex-col items-start gap-3">
              <StockStatus quantity={42} />
              <StockStatus quantity={3} />
              <StockStatus quantity={0} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sizes and quantity</h2>
          <ComponentPreview code={`${SIZES}\n\n${QTY}\n\n${WISHLIST}`}>
            <OptionsDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">PriceDisplay props</h2>
          <PropsTable rows={PRICE_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The option controls</h2>
          <PropsTable rows={OPTION_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/product-options" />
    </article>
  );
}
