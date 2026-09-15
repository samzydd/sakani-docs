"use client";

import {
  ProductDetailBlock,
  ProductGridBlock,
  ShoppingCartBlock,
  CheckoutFlowBlock,
  OrderConfirmationBlock,
} from "@sakaniui/react/blocks";
import { productImage, galleryImages } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const DETAIL = `<ProductDetailBlock
  name="Ceramic Pour-Over Mug"
  images={images}
  rating={4.5}
  reviewCount={126}
  stockQuantity={3}
  price={38}
  compareAtPrice={48}
  description="Stoneware, 340ml. Fired twice for a matte finish."
  colors={[{ label: 'Sand', color: '#d6ccc2' }, { label: 'Slate', color: '#4b5563' }]}
  sizes={[{ size: 'S' }, { size: 'M' }, { size: 'L', available: false }]}
  minQuantity={1}
  maxQuantity={10}
  // The block owns the selection; you receive it on add.
  onAddToCart={({ color, size, quantity }) => addToCart({ color, size, quantity })}
/>`;

const GRID = `<ProductGridBlock
  title="New in"
  products={products}
  showFilterBar
  columns={4}
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
  orderNumber="ORD-2481"
  items={items}
  total={92}
  estimatedDelivery="Thursday, 18 Sep"
  onTrackOrder={track}
/>`;

const PRODUCTS = [
  { id: "1", image: productImage, name: "Ceramic Pour-Over Mug", price: 38, rating: 4.5, reviewCount: 126 },
  { id: "2", image: productImage, name: "Linen Apron", price: 54, compareAtPrice: 68, rating: 4.2, reviewCount: 41 },
  { id: "3", image: productImage, name: "Walnut Tray", price: 72, rating: 4.8, reviewCount: 88 },
  { id: "4", image: productImage, name: "Cotton Tea Towel", price: 18, rating: 4.0, reviewCount: 12 },
];

const CART_ITEMS = [
  { id: "1", image: productImage, name: "Ceramic Pour-Over Mug", variant: "Color: Sand", price: 38, quantity: 1 },
  { id: "2", image: productImage, name: "Linen Apron", variant: "Size: M", price: 54, compareAtPrice: 68, quantity: 2 },
];

const ORDER_ITEMS = [
  { id: "1", image: productImage, name: "Ceramic Pour-Over Mug", variant: "Color: Sand", price: 38 },
  { id: "2", image: productImage, name: "Linen Apron", variant: "Size: M", price: 54 },
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
        <ComponentPreview code={DETAIL} fullBleed>
          <ProductDetailBlock
            name="Ceramic Pour-Over Mug"
            images={galleryImages}
            rating={4.5}
            reviewCount={126}
            stockQuantity={3}
            price={38}
            compareAtPrice={48}
            description="Stoneware, 340ml. Fired twice for a matte finish that hides the inevitable coffee rings."
            colors={[
              { label: "Sand", color: "#d6ccc2" },
              { label: "Slate", color: "#4b5563" },
              { label: "Clay", color: "#b45309", available: false },
            ]}
            sizes={[{ size: "S" }, { size: "M" }, { size: "L", available: false }]}
            minQuantity={1}
            maxQuantity={10}
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
          <ComponentPreview code={GRID} fullBleed>
            <ProductGridBlock title="New in" products={PRODUCTS} showFilterBar columns={4} />
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
          <ComponentPreview code={`${CHECKOUT}\n\n${CONFIRM}`} fullBleed>
            <div className="flex w-full flex-col gap-8">
              <CheckoutFlowBlock items={CART_ITEMS} />
              <OrderConfirmationBlock
                orderNumber="ORD-2481"
                items={ORDER_ITEMS}
                total={92}
                estimatedDelivery="Thursday, 18 Sep"
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
