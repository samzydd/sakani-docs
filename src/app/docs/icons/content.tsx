"use client";

import {
  IconHome, IconSearch, IconBell, IconSettings, IconUser, IconMail, IconCalendar, IconFolder,
  IconHeart, IconStar, IconBookmark, IconCamera, IconLock, IconShieldCheck, IconShoppingCart,
  IconTrash, IconDownload, IconChartBar, IconPlus, IconCheck, IconArrowRight, IconX,
  IconHomeFilled, IconHeartFilled, IconStarFilled, IconBellFilled, IconBookmarkFilled, IconFolderFilled,
  type SakaniIcon,
} from "@sakaniui/react/icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";
import { IconGallery } from "@/components/docs/icon-gallery";

const SAMPLE: SakaniIcon[] = [
  IconHome, IconSearch, IconBell, IconSettings, IconUser, IconMail, IconCalendar, IconFolder,
  IconHeart, IconStar, IconBookmark, IconCamera, IconLock, IconShieldCheck, IconShoppingCart,
  IconTrash, IconDownload, IconChartBar, IconPlus, IconCheck, IconArrowRight, IconX,
];
const FILLED: SakaniIcon[] = [IconHomeFilled, IconHeartFilled, IconStarFilled, IconBellFilled, IconBookmarkFilled, IconFolderFilled];

const BASIC = `import { IconHome, IconBell } from '@sakaniui/react/icons';

<IconHome />                       {/* 24px, 1.5 stroke, currentColor */}
<IconBell size={20} />
<IconBell size="1em" />            {/* follows the text size */}`;

const FILL = `import { IconHeart, IconHeartFilled } from '@sakaniui/react/icons';

<IconHeart />                      {/* outline: normal UI */}
<IconHeartFilled color="#e11d48" /> {/* filled: the "on" state */}`;

const SWAP = `// before
import { House, Bell } from 'lucide-react';
// after
import { IconHome as House, IconBell as Bell } from '@sakaniui/react/icons';`;

const PROPS = [
  { name: "size", type: "number | string", default: "24", description: "Rendered size: px or any CSS length. '1em' follows the surrounding text." },
  { name: "color", type: "string", default: "'currentColor'", description: "Icon colour. By default the icon takes the text colour around it." },
  { name: "strokeWidth", type: "number | string", default: "1.5", description: "Line weight in the 24-unit grid, the Figma icon stroke. Ignored by filled icons." },
  { name: "absoluteStrokeWidth", type: "boolean", default: "false", description: "Keep the line weight constant in pixels as size changes." },
  { name: "title", type: "string", description: "Accessible name. Without it the icon is decorative (aria-hidden)." },
];

export default function IconsPage() {
  return (
    <article>
      <PageHeader title="Icons" description="The icon set is Tabler Icons: 5,184 outline icons and 1,054 filled ones." />

      <div className="doc-prose mb-8">
        <p>
          Sakani uses <a href="https://tabler.io/icons" target="_blank" rel="noreferrer">Tabler Icons</a>, the same set
          as the Figma <em>Icons (Tabler)</em> page, where the outline icons are grouped by category and the filled
          ones live in their own set. Every component in the library renders these icons too.
        </p>
        <p>
          They live in <code>@sakaniui/react/icons</code>, one component per icon, so an app ships only what it
          imports (about 1 kB per icon). Names follow Tabler (<code>IconHome</code>, <code>IconHomeFilled</code>), so
          tabler.io/icons is the search. Props follow lucide-react, and any prop that takes an icon still accepts
          Lucide or Tabler React icons.
        </p>
      </div>

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="space-y-6">
            {[20, 24, 32].map((size) => (
              <div key={size} className="flex flex-wrap items-center gap-5">
                {SAMPLE.slice(0, size === 32 ? 14 : SAMPLE.length).map((Icon) => <Icon key={Icon.iconName} size={size} />)}
              </div>
            ))}
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Outline and filled</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Use outline icons for normal UI. Filled versions exist for 1,054 icons; use them for the &quot;on&quot; state, such
            as a selected nav item, a liked heart or an active filter.
          </p>
          <ComponentPreview code={FILL}>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {FILLED.map((Icon) => <Icon key={Icon.displayName} size={32} />)}
              <IconHeartFilled size={32} color="#e11d48" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Moving from lucide-react</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Same props, so an alias in the import is enough. Some names differ from Lucide (House is
            <code> IconHome</code>, TriangleAlert is <code>IconAlertTriangle</code>); search tabler.io/icons when unsure.
          </p>
          <ComponentPreview code={SWAP}>
            <div className="flex items-center gap-6">
              <IconHome size={32} />
              <IconBell size={32} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">All icons</h2>
          <p className="mb-4 text-sm text-ink-muted">Click an icon to copy its JSX.</p>
          <IconGallery />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>

        <p className="text-sm text-ink-muted">
          Icons by <a className="underline" href="https://tabler.io/icons" target="_blank" rel="noreferrer">Tabler</a> (MIT
          licence). The package ships the licence notice in <code>THIRD_PARTY_NOTICES.md</code>.
        </p>
      </div>

      <Pager current="/docs/icons" />
    </article>
  );
}
