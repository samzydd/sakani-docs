"use client";

import { useState } from "react";
import { CartItem, CheckoutSteps } from "@sakaniui/react";
import { productImage } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const ITEM = `<CartItem
  image="/mug.jpg"
  name="Ceramic Pour-Over Mug"
  variant="Color: Sand"
  price={38}
  quantity={qty}
  onQuantityChange={setQty}
  onRemove={remove}
/>`;

const SALE = `<CartItem
  image="/mug.jpg"
  name="Ceramic Pour-Over Mug"
  price={28}
  compareAtPrice={38}
  quantity={1}
/>`;

const STEPS = `<CheckoutSteps currentStep={1} />

<CheckoutSteps
  steps={["Bag", "Delivery", "Payment", "Done"]}
  currentStep={2}
/>`;

const ITEM_PROPS = [
  { name: "image / imageAlt", type: "string", description: "Thumbnail and alt text." },
  { name: "name", type: "string", description: "Product name." },
  { name: "variant", type: "string", description: "The chosen options as one line, e.g. \"Color: Sand\"." },
  { name: "price", type: "number", description: "Unit price as a raw number." },
  { name: "compareAtPrice", type: "number", description: "Was-price; switches to the sale treatment." },
  { name: "quantity", type: "number", description: "Controlled quantity." },
  { name: "onQuantityChange", type: "(quantity: number) => void", description: "Fires with the new quantity." },
  { name: "minQuantity / maxQuantity", type: "number", description: "Bounds for the stepper." },
  { name: "onRemove", type: "() => void", description: "Remove handler." },
  { name: "removeLabel", type: "string", description: "Label for that control." },
  { name: "formatPrice", type: "(amount: number) => string", description: "Override the default USD formatting." },
];

const STEPS_PROPS = [
  { name: "steps", type: "string[]", description: "Step labels. Has a sensible default set if omitted." },
  { name: "currentStep", type: "number", description: "0-indexed. Earlier steps render completed, later ones upcoming." },
];

function CartDemo() {
  const [items, setItems] = useState([
    { id: 1, name: "Ceramic Pour-Over Mug", variant: "Color: Sand", price: 38, qty: 1 },
    { id: 2, name: "Linen Apron", variant: "Size: M", price: 54, qty: 2 },
  ]);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {items.map((item) => (
        <CartItem
          key={item.id}
          image={productImage}
          name={item.name}
          variant={item.variant}
          price={item.price}
          quantity={item.qty}
          minQuantity={1}
          maxQuantity={10}
          onQuantityChange={(q) =>
            setItems((list) => list.map((i) => (i.id === item.id ? { ...i, qty: q } : i)))
          }
          onRemove={() => setItems((list) => list.filter((i) => i.id !== item.id))}
        />
      ))}
      <p className="text-right text-sm font-medium text-ink">
        Subtotal: ${total.toFixed(2)}
      </p>
      {items.length === 0 && (
        <p className="text-center text-xs text-ink-subtle">Your bag is empty.</p>
      )}
    </div>
  );
}

export default function CartPage() {
  return (
    <article>
      <PageHeader title="Cart" description="The cart row and the checkout progress track." />

      <div className="space-y-10">
        <ComponentPreview code={ITEM}>
          <CartDemo />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Totals are yours</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>CartItem</code> renders one line and reports quantity changes;
            it never sums anything. Subtotals, tax, shipping and discounts stay
            in your own state, which is the only place they can be computed
            consistently with the server.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sale pricing</h2>
          <ComponentPreview code={SALE}>
            <div className="w-full max-w-md">
              <CartItem
                image={productImage}
                name="Ceramic Pour-Over Mug"
                price={28}
                compareAtPrice={38}
                quantity={1}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Checkout steps</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Like{" "}
            <a href="/docs/components/stepper" className="font-medium text-ink underline underline-offset-2">Stepper</a>,
            a single index drives every step&apos;s state, so no combination of
            flags can contradict itself.
          </p>
          <ComponentPreview code={STEPS}>
            <div className="flex w-full max-w-lg flex-col gap-8">
              <CheckoutSteps currentStep={1} />
              <CheckoutSteps steps={["Bag", "Delivery", "Payment", "Done"]} currentStep={2} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">CartItem props</h2>
          <PropsTable rows={ITEM_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">CheckoutSteps props</h2>
          <PropsTable rows={STEPS_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/cart" />
    </article>
  );
}
