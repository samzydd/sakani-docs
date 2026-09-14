"use client";

import { Car, Coffee, Home, ShoppingBag, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import {
  Balance,
  Expenses,
  SpendingBalance,
  Transactions,
  StockMarket,
  Ticker,
} from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BALANCE = `<Balance
  label="Total balance"
  value="$24,980.50"
  change={{ value: "+$1,240.50", direction: "up", label: "this month" }}
  progress={68}
/>`;

const SPENDING = `<SpendingBalance label="Monthly spending" spent={1240} limit={2000} />`;

const TRANSACTIONS = `<Expenses
  categories={[
    { icon: <Home size={16} />, label: "Rent", amount: 1450 },
    { icon: <Coffee size={16} />, label: "Food", amount: 380.4 },
  ]}
/>

<Transactions
  transactions={[
    { name: "Figma", category: "Software", amount: -45, icon: <ShoppingBag size={16} /> },
    { name: "Client payment", category: "Income", amount: 2400, icon: <ArrowDownLeft size={16} /> },
  ]}
/>`;

const STOCK = `<StockMarket
  logo={<span>◆</span>}
  symbol="ACME"
  name="Acme Corp"
  price={184.22}
  change={{ amount: 3.14, percent: 1.73 }}
/>`;

const TICKER = `<Ticker
  speed={40}
  items={[
    { symbol: "ACME", changePercent: 1.73 },
    { symbol: "GLOB", changePercent: -0.42 },
  ]}
/>`;

const FORMAT = `// Every money component formats USD with 2 decimals by default.
// Override once per component for another currency or locale.
const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n);

<Expenses categories={categories} formatAmount={naira} />`;

const CATEGORIES = [
  { icon: <Home size={16} />, label: "Rent", amount: 1450 },
  { icon: <Coffee size={16} />, label: "Food", amount: 380.4 },
  { icon: <Car size={16} />, label: "Transport", amount: 122.8 },
];

const TXNS = [
  { name: "Figma", category: "Software", amount: -45, icon: <ShoppingBag size={16} /> },
  { name: "Client payment", category: "Income", amount: 2400, icon: <ArrowDownLeft size={16} /> },
  { name: "Coffee", category: "Food", amount: -6.4, icon: <Coffee size={16} /> },
];

const BALANCE_PROPS = [
  { name: "value", type: "string", description: "Pre-formatted balance. Formatting and currency are yours." },
  { name: "label", type: "string", description: "Caption above the figure." },
  { name: "change", type: "{ value: string; label?: string; direction?: 'up' | 'down' }", description: "Delta row. The sign in value is yours to include; direction only sets the colour and arrow." },
  { name: "progress", type: "number", description: "0–100. Adds the small progress ring beside the figure." },
  { name: "hidden", type: "boolean", description: "Controlled masked state. Omit to let the component manage the eye toggle itself." },
  { name: "onToggleHidden", type: "(hidden: boolean) => void", description: "Fires when the mask is toggled." },
];

const OTHER_PROPS = [
  { name: "SpendingBalance", type: "label, spent, limit, formatAmount", description: "Spend against a cap, with the bar derived from the two numbers." },
  { name: "Expenses", type: "categories, variant, formatAmount", description: "Category breakdown. Takes raw numbers, not strings — formatting goes through formatAmount." },
  { name: "Transactions", type: "transactions, formatAmount, emptyTitle, emptyDescription", description: "Positive amounts render as income, negative as expense. Has its own empty state." },
  { name: "StockMarket", type: "logo, symbol, name, price, change, chart, periodLabel, formatAmount", description: "Quote card. Passing chart data expands it into the full card with a bar chart." },
  { name: "Ticker", type: "items, speed, formatChange", description: "Scrolling symbol strip. speed is px/second, default 40." },
];

export default function FinancePage() {
  return (
    <article>
      <PageHeader title="Finance" description="The money components: balances, spending, transactions, and market quotes." />

      <div className="space-y-10">
        <ComponentPreview code={BALANCE}>
          <div className="w-full max-w-sm">
            <Balance
              label="Total balance"
              value="$24,980.50"
              change={{ value: "+$1,240.50", direction: "up", label: "this month" }}
              progress={68}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Strings vs numbers is deliberate</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>Balance</code> takes a pre-formatted <code>string</code>,
            because a headline figure is often abbreviated (&quot;$2.44M&quot;)
            in ways no formatter should guess. The list components take raw{" "}
            <code>number</code>s and a <code>formatAmount</code> callback
            instead, so every row in a list is formatted identically. Both
            default to USD with two decimals.
          </p>
          <ComponentPreview code={FORMAT}>
            <div className="w-full max-w-sm">
              <Expenses
                categories={CATEGORIES}
                formatAmount={(n) =>
                  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n)
                }
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Spending against a limit</h2>
          <ComponentPreview code={SPENDING}>
            <div className="w-full max-w-sm">
              <SpendingBalance label="Monthly spending" spent={1240} limit={2000} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Categories and transactions</h2>
          <p className="mb-3 text-sm text-ink-muted">
            In <code>Transactions</code>, the sign of <code>amount</code> is
            what picks income or expense styling — don&apos;t pass absolute
            values with a separate type flag.
          </p>
          <ComponentPreview code={TRANSACTIONS}>
            <div className="flex w-full max-w-md flex-col gap-4">
              <Expenses categories={CATEGORIES} />
              <Transactions transactions={TXNS} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Markets</h2>
          <ComponentPreview code={STOCK}>
            <div className="flex w-full max-w-sm flex-col gap-4">
              <StockMarket
                logo={<ArrowUpRight size={16} />}
                symbol="ACME"
                name="Acme Corp"
                price={184.22}
                change={{ amount: 3.14, percent: 1.73 }}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Ticker</h2>
          <ComponentPreview code={TICKER}>
            <div className="w-full max-w-md">
              <Ticker
                speed={40}
                items={[
                  { symbol: "ACME", changePercent: 1.73 },
                  { symbol: "GLOB", changePercent: -0.42 },
                  { symbol: "NDEX", changePercent: 0.88 },
                ]}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Balance props</h2>
          <PropsTable rows={BALANCE_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The rest of the set</h2>
          <PropsTable rows={OTHER_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/finance" />
    </article>
  );
}
