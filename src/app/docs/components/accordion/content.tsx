"use client";

import { Accordion, AccordionItem } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Accordion>
  <AccordionItem title="What's included?">
    Every component and block in the library, plus the Figma file.
  </AccordionItem>
  <AccordionItem title="Can I use it commercially?">
    Yes — MIT licensed, no attribution required.
  </AccordionItem>
</Accordion>`;

const DEFAULT_OPEN = `<Accordion>
  <AccordionItem title="Opens by default" defaultOpen>
    Useful for the first item, so the panel doesn't start fully collapsed.
  </AccordionItem>
  <AccordionItem title="Starts closed">…</AccordionItem>
</Accordion>`;

const RICH = `<AccordionItem title="Shipping and returns">
  <p>Orders ship within two business days.</p>
  <ul>
    <li>Free returns for 30 days</li>
    <li>Exchanges processed within a week</li>
  </ul>
</AccordionItem>`;

const ACCORDION_PROPS = [
  { name: "children", type: "ReactNode", description: "AccordionItem elements. The wrapper supplies the shared top and bottom border." },
];

const ITEM_PROPS = [
  { name: "title", type: "string", description: "The row you click to expand." },
  { name: "children", type: "ReactNode", description: "Panel content. Any markup, not just text." },
  { name: "open", type: "boolean", description: "Controlled open state." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Uncontrolled initial state." },
];

export default function AccordionPage() {
  return (
    <article>
      <PageHeader title="Accordion" description="Collapsible sections for content that's worth offering but not worth showing all at once." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-md">
            <Accordion>
              <AccordionItem title="What's included?">
                Every component and block in the library, plus the Figma file.
              </AccordionItem>
              <AccordionItem title="Can I use it commercially?">
                Yes — MIT licensed, no attribution required.
              </AccordionItem>
              <AccordionItem title="Does it work with Tailwind?">
                Yes. Components use CSS Modules bound to custom properties, so
                they don&apos;t collide with utility classes around them.
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Items are independent</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Each <code>AccordionItem</code> owns its own open state, so several
            can be open at once. For the classic one-at-a-time behaviour, drive
            each item&apos;s <code>open</code> prop from a single piece of state
            in your own component.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Opening one by default</h2>
          <ComponentPreview code={DEFAULT_OPEN}>
            <div className="w-full max-w-md">
              <Accordion>
                <AccordionItem title="Opens by default" defaultOpen>
                  Useful for the first item, so the panel doesn&apos;t start
                  fully collapsed.
                </AccordionItem>
                <AccordionItem title="Starts closed">
                  Everything else stays tucked away until asked for.
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Rich panel content</h2>
          <ComponentPreview code={RICH}>
            <div className="w-full max-w-md">
              <Accordion>
                <AccordionItem title="Shipping and returns" defaultOpen>
                  <p className="text-sm text-ink-muted">Orders ship within two business days.</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-ink-muted">
                    <li>Free returns for 30 days</li>
                    <li>Exchanges processed within a week</li>
                  </ul>
                </AccordionItem>
              </Accordion>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accordion props</h2>
          <PropsTable rows={ACCORDION_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">AccordionItem props</h2>
          <PropsTable rows={ITEM_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/accordion" />
    </article>
  );
}
