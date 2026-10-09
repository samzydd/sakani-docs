"use client";

import { Heart } from "lucide-react";
import {
  GlassIcon,
  GlassHeart, GlassFolder, GlassBookmark, GlassHouse, GlassStar, GlassMessageCircle,
  GlassBell, GlassCalendar, GlassCamera, GlassRocket, GlassMail, GlassSettings,
  type GlassIconComponent, type GlassIconTone,
} from "@sakaniui/react/glass-icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";
import { GlassIconGallery } from "@/components/docs/glass-icon-gallery";

const SAMPLE: [GlassIconComponent, GlassIconTone][] = [
  [GlassHeart, "pink"], [GlassFolder, "blue"], [GlassBookmark, "violet"], [GlassHouse, "orange"],
  [GlassStar, "amber"], [GlassMessageCircle, "green"], [GlassBell, "red"], [GlassCalendar, "sky"],
  [GlassCamera, "teal"], [GlassRocket, "indigo"], [GlassMail, "slate"], [GlassSettings, "iridescent"],
];

const BASIC = `import { GlassHeart, GlassCalendar } from '@sakaniui/react/glass-icons';

<GlassHeart tone="pink" />
<GlassCalendar tone="sky" size={64} title="Calendar" />`;

const TILE = `<GlassHeart variant="tile" tone="pink" />`;

const ANY = `import { Heart } from 'lucide-react';
import { GlassIcon } from '@sakaniui/react/glass-icons';

// Any Lucide component, including icons added after this release.
<GlassIcon icon={Heart} tone="pink" />`;

const CUSTOM = `<GlassRocket colors={['#ffd36e', '#ff5f6d']} />`;

const PROPS = [
  { name: "size", type: "number | string", default: "48", description: "Rendered size: px or any CSS length." },
  { name: "tone", type: "'violet' | 'indigo' | 'blue' | 'sky' | 'teal' | 'green' | 'lime' | 'amber' | 'orange' | 'red' | 'pink' | 'slate' | 'brand' | 'iridescent'", default: "'violet'", description: "Colour family. 'brand' follows your --color-brand tokens." },
  { name: "colors", type: "string[]", description: "Custom gradient, light to deep (two or more CSS colours). Overrides tone." },
  { name: "variant", type: "'frosted' | 'tile'", default: "'frosted'", description: "frosted: solid shape behind frosted glass. tile: the icon on a rounded glass plate." },
  { name: "detail", type: "boolean", default: "true", description: "The crisp line drawing on the glass. Turn off for a pure silhouette." },
  { name: "surface", type: "'auto' | 'light' | 'dark'", default: "'auto'", description: "auto follows a .dark ancestor. Force one when the icon sits on a surface that doesn't match the page theme." },
  { name: "title", type: "string", description: "Accessible name. Without it the icon is decorative (aria-hidden)." },
];

export default function GlassIconsPage() {
  return (
    <article>
      <PageHeader
        title="Glass Icons"
        description="Every icon in the Sakani icon set, 1,626 of them, in a frosted-glass style."
      />

      <div className="doc-prose mb-8">
        <p>
          Each icon is three layers: a solid gradient shape behind, a frosted copy in front and slightly offset (the
          colour behind shows through it as a soft haze), and a crisp line drawing on the glass so details stay
          readable. Only closed shapes are filled; open strokes like a checkmark stay lines. That is decided per shape
          when the package is built.
        </p>
        <p>
          They live in their own entry, <code>@sakaniui/react/glass-icons</code>, one component per icon, so an app
          ships only the icons it imports (one icon is about 5 kB). Everything is plain SVG, so they look the same in
          every browser.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="grid grid-cols-6 gap-6">
            {SAMPLE.map(([Icon, tone]) => <Icon key={Icon.iconName} size={56} tone={tone} title={Icon.iconName} />)}
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Tile</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The icon on a rounded glass plate, its own colour glowing through. Works well in app grids and as a
            feature-list marker.
          </p>
          <ComponentPreview code={TILE}>
            <div className="flex flex-wrap justify-center gap-5">
              {SAMPLE.slice(0, 6).map(([Icon, tone]) => <Icon key={Icon.iconName} size={64} tone={tone} variant="tile" />)}
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Light and dark</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Inside <code>.dark</code> the glass lightens and the line drawing turns white, with no prop. Flip the
            preview with the moon button. Use <code>surface</code> when an icon sits on a surface that doesn&apos;t
            match the page theme.
          </p>
          <ComponentPreview code={`<GlassCamera tone="teal" />  {/* re-themes inside .dark */}`}>
            <div className="flex flex-wrap justify-center gap-6">
              {SAMPLE.slice(6).map(([Icon, tone]) => <Icon key={Icon.iconName} size={64} tone={tone} />)}
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Your own colours</h2>
          <ComponentPreview code={CUSTOM}>
            <GlassRocket size={72} colors={["#ffd36e", "#ff5f6d"]} />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Any Lucide icon</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>GlassIcon</code> wraps any Lucide component, including icons Lucide adds later. It draws outlines
            only, because a component can&apos;t say which of its parts are closed shapes; the generated{" "}
            <code>Glass*</code> components can, so prefer them.
          </p>
          <ComponentPreview code={ANY}>
            <div className="flex items-center gap-8">
              <GlassIcon icon={Heart} size={64} tone="pink" />
              <GlassHeart size={64} tone="pink" />
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
