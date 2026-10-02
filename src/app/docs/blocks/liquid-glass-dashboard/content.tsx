"use client";

import Link from "next/link";
import { LiquidDashboardBlock } from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";

const CODE = `import { LiquidDashboardBlock } from '@sakaniui/react/blocks';

<LiquidDashboardBlock
  backgroundImage="/photo.jpg"
  accountAvatar="/me.png"
  people={{ emily: '/emily.png', michael: '/michael.png', sarah: '/sarah.png' }}
/>`;

const PROPS = [
  { name: "backgroundImage", type: "string", description: "The photograph behind everything. Not bundled: glass needs something colorful and detailed to bend, and which photo is your call." },
  { name: "accountAvatar", type: "string", description: "Avatar for the account menu in the top bar." },
  { name: "people", type: "{ emily?, michael?, sarah? }", description: "Photos for the people in the activity feed. Avatars fall back to a neutral placeholder." },
  { name: "className", type: "string", description: "Extra class on the root. The block fills its container, so give the container a size." },
];

export default function LiquidGlassDashboardPage() {
  return (
    <article>
      <PageHeader
        title="Liquid Glass Dashboard"
        description="A full dashboard on a photograph, built with Sakani's Apple-style liquid glass. Move the pointer over the sidebar."
      />

      <div className="doc-prose mb-8">
        <p>
          This is what <Link href="/docs/glass">Glass &amp; Liquid Glass</Link> looks like in a real
          application. Everything in the frame is a live Sakani component: the sidebar, top bar, stat
          cards, charts, table and activity feed.
        </p>
        <p>It is built in three layers, in this order:</p>
        <ol>
          <li>
            <strong>Background:</strong> the photo, as a <code>{'<LiquidBackdrop>'}</code>. Every lens in the
            frame refracts the photo itself, so the promo card and the sidebar lenses bend sharp detail, as in
            the Figma frame.
          </li>
          <li>
            <strong>Overlay:</strong> one full-size <code>{'<LiquidGlass variant="regular" radius={0}>'}</code>: the
            frosted sheet the chrome sits on.
          </li>
          <li>
            <strong>Product UI:</strong> the sidebar and top bar sit on the overlay with no fills of their
            own (<code>data-surface=&quot;liquid&quot;</code>); the main panel is a second sheet of glass; the
            cards on it stay solid so the data stays crisp.
          </li>
        </ol>
        <p>
          The <strong>active</strong> sidebar item has its own clear-glass lens and only moves when you click
          another item; it springs to the new item and stretches on the way, like a droplet. A second, softer lens follows hover and keyboard focus and never changes what is
          active. Open one of the chart dropdowns to see the frosted menu, and flip the preview to dark: the
          overlay gains a scrim so the light labels stay readable over the bright parts of the photo.
        </p>
        <p>
          Refraction renders in Chromium (Chrome, Edge). Safari and Firefox get the frosted fallback with the
          same rim and depth.
        </p>
      </div>

      <ComponentPreview code={CODE} scaleToFit>
        <div style={{ width: 1440, height: 998 }}>
          <LiquidDashboardBlock
            backgroundImage="/glass/backdrop.jpg"
            accountAvatar="/glass/account.png"
            people={{
              emily: "/glass/emily-johnson.png",
              michael: "/glass/michael-evans.png",
              sarah: "/glass/sarah-williams.png",
            }}
          />
        </div>
      </ComponentPreview>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
        <p className="mb-3 text-sm text-ink-muted">
          Like every block, this is a composition example. These few props cover the images; for anything
          else, copy the source and edit it.
        </p>
        <PropsTable rows={PROPS} />
      </section>

      <div className="mt-10">
        <BlockSource blocks={["LiquidDashboardBlock"]} />
      </div>

      <Pager current="/docs/blocks/liquid-glass-dashboard" />
    </article>
  );
}
