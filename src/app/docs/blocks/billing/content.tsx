"use client";

import {
  CurrentPlanBlock,
  BillingHistoryBlock,
  PaymentMethodBlock,
  AddCardFormBlock,
} from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const PLAN = `<CurrentPlanBlock
  planName="Pro plan"
  price="$29"
  status="active"
  usageLabel="Seats used"
  usageValue="8 / 10"
  usagePercent={80}
/>`;

const STATUSES = `// status changes both the badge and which rows render --
// the usage row is active-only, matching Figma.
<CurrentPlanBlock planName="Pro trial" price="$0" priceSuffix="/month after trial" status="trial" />
<CurrentPlanBlock planName="Pro plan" price="$29" status="past-due" />
<CurrentPlanBlock planName="Pro plan" price="$29" status="canceling" />`;

const HISTORY = `<BillingHistoryBlock />`;

const PAYMENT = `<PaymentMethodBlock />

<AddCardFormBlock onSubmit={saveCard} />`;

export default function BillingPage() {
  return (
    <article>
      <PageHeader
        title="Billing"
        description="The billing settings screens: current plan, invoice history, saved cards, and the add-card form."
      />

      <div className="doc-prose mb-8">
        <p>
          Four blocks that usually sit on one settings page. Each is
          self-contained, so you can adopt the pieces you need rather than the
          whole screen. See also{" "}
          <a href="/docs/blocks/billing-address">Billing Address</a> for the
          address form these pair with.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={PLAN} fullBleed>
          <CurrentPlanBlock
            planName="Pro plan"
            price="$29"
            status="active"
            usageLabel="Seats used"
            usageValue="8 / 10"
            usagePercent={80}
          />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Plan statuses</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>status</code> changes more than the badge: the usage row only
            renders for <code>active</code>, because a past-due or cancelling
            plan wants attention on the problem rather than on seat counts.
          </p>
          <ComponentPreview code={STATUSES} fullBleed>
            <div className="flex w-full flex-col gap-4">
              <CurrentPlanBlock
                planName="Pro trial"
                price="$0"
                priceSuffix="/month after trial"
                status="trial"
              />
              <CurrentPlanBlock planName="Pro plan" price="$29" status="past-due" />
              <CurrentPlanBlock planName="Pro plan" price="$29" status="canceling" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Invoice history</h2>
          <ComponentPreview code={HISTORY} fullBleed>
            <BillingHistoryBlock />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Payment methods</h2>
          <p className="mb-3 text-sm text-ink-muted">
            These render card UI only. They never touch a card number in a way
            that would put you in scope for PCI — wire the form to your payment
            provider&apos;s tokenisation (Stripe Elements or equivalent) rather
            than posting raw fields to your own server.
          </p>
          <ComponentPreview code={PAYMENT} fullBleed>
            <div className="flex w-full flex-col gap-6">
              <PaymentMethodBlock />
              <AddCardFormBlock />
            </div>
          </ComponentPreview>
        </section>

        <BlockSource
          blocks={["CurrentPlanBlock", "BillingHistoryBlock", "PaymentMethodBlock", "AddCardFormBlock"]}
          path={(name) => `Billing/${name}`}
        />
      </div>

      <Pager current="/docs/blocks/billing" />
    </article>
  );
}
