"use client";

import {
  ProductDetailBlock,
  ProductGridBlock,
  ShoppingCartBlock,
  CheckoutFlowBlock,
  OrderConfirmationBlock,
} from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const DETAIL = `<ProductDetailBlock
  name="Ceramic Pour-Over Mug"
  images={images}
  rating={4.9}
  reviewCount={2300}
  stockQuantity={24}
  price={28}
  description="A hand-thrown ceramic mug designed for slow mornings. Wide mouth for easy pouring, comfortable handle, dishwasher safe."
  colors={[
    { label: 'Navy', color: '#1B284D' },
    { label: 'Brown', color: '#6F4E37' },
    { label: 'Grey', color: '#9CA3AF' },
  ]}
  sizes={[{ size: 'S' }, { size: 'M' }, { size: 'L' }]}
  defaultColor="Navy"
  defaultSize="M"
  // The block owns the selection; you receive it on add.
  onAddToCart={({ color, size, quantity }) => addToCart({ color, size, quantity })}
/>`;

const GRID = `<ProductGridBlock
  eyebrow="Shop"
  title="New arrivals"
  subtitle="Thoughtfully made home goods, restocked every week."
  products={products}
  showFilterBar
/>`;

const CART = `<ShoppingCartBlock
  items={items}
  shippingCost={0}
  onCheckout={goToCheckout}
/>`;

const CHECKOUT = `// The block walks its own steps and collects the fields;
// you get the whole order back once at the end.
<CheckoutFlowBlock
  items={items}
  initialStep="shipping"
  onComplete={({ shipping, payment }) => placeOrder({ shipping, payment })}
/>`;

const CONFIRM = `// estimatedDelivery is what turns on the tracking style --
// there's no separate variant prop.
<OrderConfirmationBlock
  orderNumber="SK-40218"
  items={items}
  total={28}
  estimatedDelivery="Aug 28–30"
  onTrackOrder={track}
/>`;

// The same photography and copy as the Figma frames (and the Storybook
// stories), served from /public so the previews match the design exactly.
const MUG = "/blocks/products/card-mug.jpg";
const RUNNER = "/blocks/products/card-table-runner.jpg";
const BOARD = "/blocks/products/card-serving-board.jpg";

const GALLERY = [
  { src: MUG, alt: "Ceramic Pour-Over Mug" },
  { src: MUG, alt: "Ceramic Pour-Over Mug, angle 2" },
  { src: MUG, alt: "Ceramic Pour-Over Mug, angle 3" },
  { src: MUG, alt: "Ceramic Pour-Over Mug, angle 4" },
];

const MUG_COLORS = [
  { label: "Navy", color: "#1B284D" },
  { label: "Bone", color: "#F5F4F2", selected: true },
  { label: "Periwinkle", color: "#8E9FE8" },
  { label: "Magenta", color: "#C6197A" },
];

const BOARD_COLORS = [
  { label: "Natural", color: "#DDD0BC" },
  { label: "Amber", color: "#D2691E", selected: true },
  { label: "Lilac", color: "#D9CBE8" },
  { label: "Rose", color: "#E5A0B8" },
];

const MUG_COPY =
  "Handcrafted from natural stoneware clay, this minimal pour-over mug features a built-in ceramic dripper for slow, single-cup brewing. Dishwasher safe and made to last.";

const PRODUCTS = [
  { id: "mug", image: MUG, name: "Ceramic Pour-Over Mug", description: MUG_COPY, price: 28, rating: 5, colors: MUG_COLORS },
  {
    id: "runner",
    image: RUNNER,
    name: "Linen Table Runner",
    description:
      "Woven from 100% European flax linen, this table runner adds effortless texture to any setting. Pre-washed for a soft, lived-in drape. Machine washable and naturally durable.",
    price: 34,
    compareAtPrice: 48,
    rating: 5,
    colors: MUG_COLORS,
  },
  {
    id: "board",
    image: BOARD,
    name: "Oak Serving Board",
    description: "A brief description of an oak serving board for an e-commerce store",
    price: 56,
    rating: 5,
    inStock: false,
    colors: BOARD_COLORS,
  },
  { id: "mug-2", image: MUG, name: "Ceramic Pour-Over Mug", description: MUG_COPY, price: 28, rating: 5, colors: MUG_COLORS },
];

const CART_ITEMS = [
  { id: "1", image: MUG, name: "Ceramic Pour-Over Mug", variant: "Color: Sand", price: 28, quantity: 1 },
  { id: "2", image: RUNNER, name: "Linen Table Runner", variant: "Color: Natural", price: 34, compareAtPrice: 48, quantity: 1 },
];

const CHECKOUT_ITEMS = [CART_ITEMS[0]];

const ORDER_ITEMS = [
  { id: "1", image: MUG, name: "Ceramic Pour-Over Mug", variant: "Color: Sand", price: 28 },
];

export default function EcommercePage() {
  return (
    <article>
      <PageHeader
        title="E-commerce"
        description="The storefront path end to end: product detail, grid, cart, checkout, and order confirmation."
      />

      <div className="doc-prose mb-8">
        <p>
          These compose the{" "}
          <a href="/docs/components/product-card">product components</a> into
          whole screens. As with those, money arrives as raw numbers and is
          formatted through <code>formatPrice</code>, so one override changes
          every figure on the screen at once.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={DETAIL} scaleToFit>
          <ProductDetailBlock
            name="Ceramic Pour-Over Mug"
            images={GALLERY}
            rating={4.9}
            reviewCount={2300}
            stockQuantity={24}
            price={28}
            description="A hand-thrown ceramic mug designed for slow mornings. Wide mouth for easy pouring, comfortable handle, dishwasher safe."
            colors={[
              { label: "Navy", color: "#1B284D" },
              { label: "Brown", color: "#6F4E37" },
              { label: "Grey", color: "#9CA3AF" },
            ]}
            sizes={[{ size: "S" }, { size: "M" }, { size: "L" }]}
            defaultColor="Navy"
            defaultSize="M"
          />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Product grid</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>showFilterBar</code> is a real prop rather than being inferred
            from the product count — a three-item curated collection usually
            shouldn&apos;t offer sorting, and only you know which lists are
            curated.
          </p>
          <ComponentPreview code={GRID} scaleToFit>
            <ProductGridBlock
              eyebrow="Shop"
              title="New arrivals"
              subtitle="Thoughtfully made home goods, restocked every week."
              products={PRODUCTS}
              showFilterBar
            />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Cart</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Unlike the bare{" "}
            <a href="/docs/components/cart" className="font-medium text-ink underline underline-offset-2">CartItem</a>{" "}
            component, this block does total the line items and render the
            summary. <code>shippingCost</code> defaults to 0, which shows as
            &quot;Free&quot;.
          </p>
          <ComponentPreview code={CART} fullBleed>
            <ShoppingCartBlock items={CART_ITEMS} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Checkout and confirmation</h2>
          <p className="mb-3 text-sm text-ink-muted">
            On <code>OrderConfirmationBlock</code>, passing{" "}
            <code>estimatedDelivery</code> is what adds the delivery row and
            Track order button — the same derive-don&apos;t-flag pattern the
            product components use.
          </p>
          <ComponentPreview code={`${CHECKOUT}\n\n${CONFIRM}`} scaleToFit>
            <div className="flex w-full flex-col gap-8">
              <CheckoutFlowBlock items={CHECKOUT_ITEMS} />
              <OrderConfirmationBlock
                orderNumber="SK-40218"
                items={ORDER_ITEMS}
                total={28}
                estimatedDelivery="Aug 28–30"
              />
            </div>
          </ComponentPreview>
        </section>

        <BlockSource
          blocks={[
            "ProductDetailBlock",
            "ProductGridBlock",
            "ShoppingCartBlock",
            "CheckoutFlowBlock",
            "OrderConfirmationBlock",
          ]}
        />
      </div>

      <Pager current="/docs/blocks/ecommerce" />
    </article>
  );
}
