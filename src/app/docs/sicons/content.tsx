"use client";

import {
  SiconHouse, SiconSearch, SiconBell, SiconSettings, SiconUser, SiconMail, SiconCalendar, SiconFolder,
  SiconHeart, SiconStar, SiconBookmark, SiconCamera, SiconLock, SiconShieldCheck, SiconShoppingCart,
  SiconTrash2, SiconDownload, SiconChartColumn, SiconPlus, SiconCheck, SiconArrowRight, SiconX,
  type SiconFC,
} from "@sakaniui/react/sicons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";
import { SiconGallery } from "@/components/docs/sicon-gallery";

const SAMPLE: SiconFC[] = [
  SiconHouse, SiconSearch, SiconBell, SiconSettings, SiconUser, SiconMail, SiconCalendar, SiconFolder,
  SiconHeart, SiconStar, SiconBookmark, SiconCamera, SiconLock, SiconShieldCheck, SiconShoppingCart,
  SiconTrash2, SiconDownload, SiconChartColumn, SiconPlus, SiconCheck, SiconArrowRight, SiconX,
];

const BASIC = `import { SiconHeart, SiconBell } from '@sakaniui/react/sicons';

<SiconHeart />                    {/* 24px, 1.5 stroke, currentColor */}
<SiconBell size={20} />
<SiconBell size="1em" />          {/* follows the text size */}`;

const SWAP = `// before
import { Heart, Bell } from 'lucide-react';
// after
import { SiconHeart as Heart, SiconBell as Bell } from '@sakaniui/react/sicons';`;

const PROPS = [
  { name: "size", type: "number | string", default: "24", description: "Rendered size: px or any CSS length. '1em' follows the surrounding text." },
  { name: "color", type: "string", default: "'currentColor'", description: "Stroke colour. By default the icon takes the text colour around it." },
  { name: "strokeWidth", type: "number", default: "1.5", description: "Line weight in the icon's 24-unit grid." },
  { name: "absoluteStrokeWidth", type: "boolean", default: "false", description: "Keep the line weight constant in pixels as size changes." },
  { name: "title", type: "string", description: "Accessible name. Without it the icon is decorative (aria-hidden)." },
];

export default function SiconsPage() {
  return (
    <article>
      <PageHeader title="Sicons" description="Sakani's icon set: 1,626 icons with a 1.5 stroke and softened corners." />

      <div className="doc-prose mb-8">
        <p>
          Sicons are the icons from the Figma file, in code. They start from Lucide&apos;s shapes and add the Sakani
          treatment: a 1.5 stroke and softened corners, a 4px radius (3.7px on the few icons whose short corners
          can&apos;t take 4). The rounding is baked into each icon at build time with the same rule the Figma set
          uses, so a designer&apos;s icon and the component match.
        </p>
        <p>
          They live in their own entry, <code>@sakaniui/react/sicons</code>, one component per icon, so an app ships
          only what it imports (under 1 kB per icon). Props follow lucide-react, so moving existing icons over is a
          find-and-replace.
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
          <h2 className="mb-3 text-lg font-semibold text-ink">Softened corners</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Up close, the corners are what set Sicons apart: arrow tips, the check, roofs and star points are
            rounded rather than sharp, which reads as friendlier at every size.
          </p>
          <ComponentPreview code={`<SiconStar size={96} />`}>
            <div className="flex flex-wrap justify-center gap-10">
              {[SiconCheck, SiconStar, SiconHouse, SiconBookmark, SiconShieldCheck].map((Icon) => <Icon key={Icon.iconName} size={88} />)}
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Moving from lucide-react</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Same props, so an alias in the import is enough. Names follow Lucide with a <code>Sicon</code> prefix.
          </p>
          <ComponentPreview code={SWAP}>
            <div className="flex items-center gap-6">
              <SiconHeart size={32} />
              <SiconBell size={32} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">All icons</h2>
          <p className="mb-4 text-sm text-ink-muted">Click an icon to copy its JSX.</p>
          <SiconGallery />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>

        <p className="text-sm text-ink-muted">
          Sicons are based on <a className="underline" href="https://lucide.dev" target="_blank" rel="noreferrer">Lucide</a>{" "}
          (ISC licence). The package ships Lucide&apos;s licence notice in <code>THIRD_PARTY_NOTICES.md</code>.
        </p>
      </div>

      <Pager current="/docs/sicons" />
    </article>
  );
}
