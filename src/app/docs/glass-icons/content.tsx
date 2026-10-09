"use client";

import { Heart } from "lucide-react";
import {
  GlassIcon,
  GlassHeart, GlassFolder, GlassCalendar, GlassCamera, GlassSettings, GlassBell,
  GlassMail, GlassHouse, GlassTrash2, GlassLightbulb, GlassShoppingBasket, GlassSearch,
  type GlassIconComponent,
} from "@sakaniui/react/glass-icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";
import { GlassIconGallery } from "@/components/docs/glass-icon-gallery";

const SAMPLE: GlassIconComponent[] = [
  GlassHeart, GlassFolder, GlassCalendar, GlassCamera, GlassSettings, GlassBell,
  GlassMail, GlassHouse, GlassTrash2, GlassLightbulb, GlassShoppingBasket, GlassSearch,
];

const BASIC = `import { GlassHeart, GlassCalendar } from '@sakaniui/react/glass-icons';

<GlassHeart />                      {/* 24px */}
<GlassCalendar size={48} title="Calendar" />
<GlassMail size="1em" />           {/* follows the text size */}`;

const ANY = `import { Heart } from 'lucide-react';
import { GlassIcon } from '@sakaniui/react/glass-icons';

// Any Lucide component, including icons added after this release.
<GlassIcon icon={Heart} />`;


const PROPS = [
  { name: "size", type: "number | string", default: "24", description: "Rendered size: px or any CSS length. '1em' follows the surrounding text. The icon is vector, so it stays sharp at any size." },
  { name: "surface", type: "'auto' | 'light' | 'dark'", default: "'auto'", description: "auto follows a .dark ancestor. Force one when the icon sits on a surface that doesn't match the page theme." },
  { name: "title", type: "string", description: "Accessible name. Without it the icon is decorative (aria-hidden)." },
];

export default function GlassIconsPage() {
  return (
    <article>
      <PageHeader
        title="Glass Icons"
        description="Every icon in the Sakani icon set, 1,626 of them, as monochrome frosted glass."
      />

      <div className="doc-prose mb-8">
        <p>
          Each icon is the icon&apos;s main shape as one frosted-glass solid, with a disc tucked behind its corner
          that shows through the glass blurred. Inner lines sit on the glass in white; lines off the glass stay
          solid. Icons that are only lines (arrows, a checkmark) become a single thick glass stroke.
        </p>
        <p>
          They are charcoal grey on purpose, so they sit in any product regardless of its brand colours, and they
          follow the theme: lighter glass on dark surfaces, with no prop. The colours are the{" "}
          <code>--glass-icon-*</code> tokens if you need to tune them.
        </p>
        <p>
          They live in their own entry, <code>@sakaniui/react/glass-icons</code>, one component per icon, so an app
          ships only the icons it imports. Everything is plain SVG drawn on a 24&times;24 grid, so they look the
          same in every browser and stay sharp at any size.
        </p>
        <p>
          The Figma file has the same set: the <em>Glass Icons</em> component set, one 24&times;24 variant per
          icon, coloured by the <em>glass-icon/*</em> variables in the Semantic collection.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="space-y-6">
            {[24, 32, 48].map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-5">
                {SAMPLE.slice(0, size === 48 ? 8 : SAMPLE.length).map((Icon) => (
                  <Icon key={Icon.iconName} size={size} title={size === 48 ? Icon.iconName : undefined} />
                ))}
              </div>
            ))}
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Light and dark</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Inside <code>.dark</code> the glass turns to a light frost, with no prop. Flip the preview with the moon
            button. Use <code>surface</code> when an icon sits on a surface that doesn&apos;t match the page theme.
          </p>
          <ComponentPreview code={`<GlassCamera size={48} />  {/* re-themes inside .dark */}`}>
            <div className="flex flex-wrap justify-center gap-6">
              {SAMPLE.slice(0, 8).map((Icon) => <Icon key={Icon.iconName} size={48} />)}
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Any Lucide icon</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>GlassIcon</code> wraps any Lucide component, including icons Lucide adds later. It draws the whole
            icon as one glass stroke, because a component can&apos;t say which of its parts are shapes and which are
            lines; the generated <code>Glass*</code> components can, so prefer them.
          </p>
          <ComponentPreview code={ANY}>
            <div className="flex items-center gap-8">
              <GlassIcon icon={Heart} size={64} />
              <GlassHeart size={64} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">All icons</h2>
          <p className="mb-4 text-sm text-ink-muted">Click an icon to copy its JSX.</p>
          <GlassIconGallery />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/glass-icons" />
    </article>
  );
}
