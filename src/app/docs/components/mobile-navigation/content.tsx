"use client";

import { useState } from "react";
import { MobileNavigationMenu } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const LINKS = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Docs", href: "#" },
  { label: "Blog", href: "#" },
];

const BASIC = `<MobileNavigationMenu
  label="Sakani"
  links={[
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" },
  ]}
  ctaLabel="Get started"
  onCtaClick={signUp}
/>`;

const CONTROLLED = `const [open, setOpen] = useState(false);

// Controlled, so you can close it on route change.
<MobileNavigationMenu label="Sakani" links={links} open={open} onOpenChange={setOpen} />`;

const PROPS = [
  { name: "label", type: "string", description: "Brand or product name shown in the bar." },
  { name: "links", type: "{ label: string; href?: string; onClick?: () => void }[]", description: "Nav entries. Give each either an href or an onClick." },
  { name: "ctaLabel / onCtaClick", type: "string / () => void", description: "Optional call to action at the end of the menu." },
  { name: "open", type: "boolean", description: "Controlled open state. Omit to let the menu manage its own toggle." },
  { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
  { name: "onOpenChange", type: "(open: boolean) => void", description: "Fires whenever the menu opens or closes, in both modes." },
];

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <MobileNavigationMenu
        label="Sakani"
        links={LINKS}
        ctaLabel="Get started"
        open={open}
        onOpenChange={setOpen}
      />
      <p className="text-xs text-ink-muted">Menu is {open ? "open" : "closed"}</p>
    </div>
  );
}

export default function MobileNavigationPage() {
  return (
    <article>
      <PageHeader title="Mobile Navigation" description="The collapsing nav bar for marketing pages on small screens." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-sm">
            <MobileNavigationMenu
              label="Sakani"
              links={LINKS}
              ctaLabel="Get started"
              onCtaClick={() => {}}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Control it to close on navigation</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Uncontrolled works for a static page. In a client-routed app the
            menu won&apos;t know a link changed the route, so pass{" "}
            <code>open</code> and close it yourself on route change — otherwise
            it stays open over the page it just navigated to.
          </p>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Not the app sidebar</h2>
          <p className="mb-3 text-sm text-ink-muted">
            This is marketing-site navigation. For an application shell, use{" "}
            <a href="/docs/components/sidebar" className="font-medium text-ink underline underline-offset-2">Sidebar</a>{" "}
            and{" "}
            <a href="/docs/components/top-bar" className="font-medium text-ink underline underline-offset-2">TopBarMobile</a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/mobile-navigation" />
    </article>
  );
}
