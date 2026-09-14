"use client";

import { Link } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Link href="/pricing">See pricing</Link>`;

const EXTERNAL = `<Link href="https://github.com/samzydd/Sakani-design-system" external>
  View the source
</Link>`;

const INLINE = `<p>
  Tokens are defined in <Link href="/docs/theming">Theming</Link>, and the
  full set ships in <Link href="https://npmjs.com/package/@sakaniui/react" external>the package</Link>.
</p>`;

const ROUTER = `// Next.js, React Router, etc: render their link and style it yourself,
// or wrap it — this component renders a plain <a>.
import NextLink from "next/link";

<NextLink href="/docs" passHref legacyBehavior>
  <Link>Documentation</Link>
</NextLink>`;

const PROPS = [
  { name: "href", type: "string", description: "Destination." },
  { name: "external", type: "boolean", default: "false", description: "Appends an external-link icon and sets target=\"_blank\" with rel=\"noopener noreferrer\"." },
  { name: "children", type: "ReactNode", description: "Link text." },
];

export default function LinkPage() {
  return (
    <article>
      <PageHeader title="Link" description="A styled anchor, with a one-prop treatment for links that leave the app." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Link href="#">See pricing</Link>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">External links</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>external</code> does three things at once: the icon warns
            you&apos;re leaving, <code>target=&quot;_blank&quot;</code> opens a
            new tab, and <code>rel=&quot;noopener noreferrer&quot;</code> stops
            the opened page from reaching back into yours.
          </p>
          <ComponentPreview code={EXTERNAL}>
            <Link href="https://github.com/samzydd/Sakani-design-system" external>
              View the source
            </Link>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Inline in prose</h2>
          <ComponentPreview code={INLINE}>
            <p className="text-sm text-ink-muted">
              Tokens are defined in <Link href="/docs/theming">Theming</Link>, and
              the full set ships in{" "}
              <Link href="https://www.npmjs.com/package/@sakaniui/react" external>
                the package
              </Link>
              .
            </p>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">With a router</h2>
          <p className="mb-3 text-sm text-ink-muted">
            This renders a plain <code>&lt;a&gt;</code>, so client-side
            navigation is your router&apos;s job — compose the two rather than
            expecting this to intercept routes.
          </p>
          <ComponentPreview code={ROUTER}>
            <Link href="/docs">Documentation</Link>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native anchor attribute is forwarded to the underlying{" "}
            <code>&lt;a&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/link" />
    </article>
  );
}
