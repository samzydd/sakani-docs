"use client";

import Link from "next/link";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DocTable } from "@/components/docs/doc-table";
import { Pager } from "@/components/docs/pager";
import { SurfaceTrio, RecipeStages } from "@/components/docs/glass-demos";

const MODES = `{/* Frosted glass: one attribute on any ancestor (light and dark both work) */}
<div data-surface="glass">
  <Sidebar />
  <Card>…</Card>        {/* reads --surface-bg, --surface-blur */}
</div>

{/* Opt a nested area back out: data stays solid and crisp */}
<section data-surface="solid">
  <Table … />
</section>

{/* Liquid glass: a lens that bends the photo behind it */}
import { LiquidGlass } from '@sakaniui/react';

<LiquidGlass variant="regular" radius={16}>
  <Card … />
</LiquidGlass>`;

const RECIPE = `import { LiquidBackdrop, LiquidGlass } from '@sakaniui/react';

{/* 1 · background  2 · overlay  3 · components */}
<LiquidBackdrop src="photo.jpg" style={{ position: 'relative' }}>        {/* every lens refracts this photo */}
  <LiquidGlass variant="regular" tint="subtle" radius={0}
               style={{ position: 'absolute', inset: 0 }} />          {/* the one glass sheet */}

  <div data-surface="liquid" style={{ position: 'relative' }}>         {/* chrome goes transparent */}
    <Sidebar … />
    <div data-surface="solid"><Card>…</Card></div>                   {/* data stays solid */}
  </div>
</LiquidBackdrop>`;

const CUSTOM = `/* A custom element: read the tokens, never glass values */
.panel {
  background: var(--surface-bg);
  border: 1px solid var(--surface-border);
  box-shadow: var(--surface-highlight);
  backdrop-filter: var(--surface-blur);
}

/* Own the element yourself (how Modal does it) */
const ref = useRef(null);
const glass = useLiquidGlass(ref);
<div ref={ref} {...glass.props} className={liquidGlassClass('regular')}>
  {glass.filter}
  …
</div>`;

const PROPS = [
  { name: "variant", type: "'regular' | 'clear'", default: "'regular'", description: "Tint strength. regular carries copy; clear is for icons, large labels and imagery." },
  { name: "tint", type: "'regular' | 'clear' | 'subtle' | 'none'", default: "the variant's", description: "The fill. subtle is Figma's glass/bg-subtle (5%), for a full-bleed overlay; none draws no tint." },
  { name: "radius", type: "number", default: "20", description: "Corner radius in px. Use 0 for a full-bleed overlay. The lens follows it exactly." },
  { name: "effect", type: "{ refraction, depth, dispersion, frost, lightIntensity, lightAngle }", default: "the variant's", description: "Any of Figma's Glass properties for this element, in Figma's units." },
  { name: "source", type: "boolean", default: "true", description: "Inside a LiquidBackdrop: refract its photo (true) or the UI painted below (false: slider knobs, selection droplets)." },
  { name: "refraction", type: "'auto' | 'off'", default: "'auto'", description: "'off' forces the frosted fallback, e.g. to preview Safari or Firefox in Chrome." },
  { name: "interactive", type: "boolean", default: "false", description: "Squishes slightly when pressed (buttons, toolbar pills). No squish with reduced motion." },
  { name: "…rest", type: "HTMLAttributes<HTMLDivElement>", description: "Anything a <div> accepts is forwarded." },
];

export default function GlassPage() {
  return (
    <article>
      <PageHeader
        title="Glass & Liquid Glass"
        description="Frosted glass and Apple-style liquid glass, built into Sakani as a theme layer, not added component by component."
      />

      <div className="doc-prose mb-8">
        <p>
          Next to light and dark, Sakani has a second theme axis: <strong>Surface</strong>.
          It has three modes: <strong>Solid</strong> (the default), <strong>Glass</strong>{" "}
          (frosted translucency, the look usually called glassmorphism) and{" "}
          <strong>Liquid</strong> (Apple-style liquid glass: the backdrop <em>bends</em> at
          the edges like a lens, with a faint color fringe, rim light and depth). Components read a small set
          of <code>--surface-*</code> tokens, so switching an area from Solid to Glass or Liquid
          re-themes everything inside it at once. There are no per-component glass variants to keep in
          sync, and Solid stays pixel-identical to before.
        </p>
        <p>
          The same system exists in the Figma file (a <em>Surface</em> variable collection plus effect styles),
          so a design and its code use the same modes. For a complete screen, see the{" "}
          <Link href="/docs/blocks/liquid-glass-dashboard">Liquid Glass Dashboard</Link> block.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Three surfaces, one component</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The same <code>Card</code> over the same photo. Glass only reads over something colorful and
            detailed, which is why every demo here sits on a photograph.
          </p>
          <ComponentPreview code={MODES}>
            <SurfaceTrio />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The recipe: photo → overlay → components</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Build every glass screen in the same order. <strong>One</strong> glass overlay bends the photo
            for the whole canvas, so each component doesn&apos;t blur it again (stacked blurs go muddy and cost
            performance). Navigation and floating layers sit on it with no fills of their own; anything
            people have to read closely, like tables and data cards, stays solid.
          </p>
          <ComponentPreview code={RECIPE}>
            <RecipeStages />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Choosing a strength</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Strength is two independent choices: the <strong>lens</strong> (how much the backdrop bends and
            frosts) and the <strong>tint</strong> (how much of the backdrop you can see through). Contrast figures
            are measured from the render of our Figma samples, as typical / worst 5% of the area behind the text.
          </p>
          <DocTable
            headers={["Tier", "Use for", "Measured contrast"]}
            mono={[0]}
            rows={[
              ["Frosted · data-surface=\"glass\"", "Everyday translucency across an app: cards, menus, sidebars. Cheap, works in every browser.", "Muted text uses a stronger token on glass (neutral-600 light / neutral-300 dark)."],
              ["Liquid · clear", "Icons, large labels, floating controls, full-bleed overlays over dark or busy imagery.", "No guarantee: it depends entirely on the photo. White text over bright sky measured 1.3:1."],
              ["Liquid · regular (66%)", "Sidebars and panels with copy.", "Body text 9.9 / 8.3 (light) and 12.5 / 8.6 (dark)."],
              ["Liquid · tinted 52–64%", "Cards, modals and popovers that carry copy.", "Titles 7–13 typical; the worst 5% dips to about 3 on very bright spots."],
            ]}
          />
          <p className="mt-3 text-sm text-ink-muted">
            Rule of thumb: Glass for everyday translucency across an app; Liquid for a few large hero surfaces,
            such as a floating sidebar, a toolbar or a full-screen overlay, where the effect is worth its cost.
            If the row says &quot;depends on the photo&quot;, measure before you ship.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">LiquidGlass</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The material as a component. Put regular Sakani components inside it; they drop their own fills
            and sit on the glass. Wrap the screen in <code>{'<LiquidBackdrop src={photo}>'}</code> and every lens
            inside refracts the photo itself, sharp, the way Figma&apos;s glass does: glass stacked on glass still
            bends real detail (its <code>veil</code> lays a color over the photo for every lens, such as a dark-mode
            scrim). Also exported: <code>useLiquidGlass(ref, {"{ enabled, refraction, source }"})</code> and{" "}
            <code>liquidGlassClass(variant, tint)</code> for elements you own (the <code>Modal</code> card uses
            the hook when it is opened from inside a liquid area).
          </p>
          <PropsTable rows={PROPS} />
          <div className="mt-4">
            <ComponentPreview code={CUSTOM}>
              <p className="text-sm text-ink-muted">
                Custom elements read the <code>--surface-*</code> tokens; they never hard-code glass values.
              </p>
            </ComponentPreview>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Tokens</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Components read <code>--surface-*</code>; the Surface mode decides what those point to. Solid aliases
            the semantic tokens, so nothing changes unless an area opts in.
          </p>
          <DocTable
            headers={["Token", "Solid", "Glass"]}
            mono={[0, 1, 2]}
            rows={[
              ["--surface-bg", "var(--color-bg-surface)", "var(--glass-bg)  (72% white · 72% near-black)"],
              ["--surface-bg-overlay", "var(--color-bg-surface)", "var(--glass-bg-overlay)  (82%)"],
              ["--surface-bg-chrome", "transparent", "var(--glass-bg-chrome)  (60%)"],
              ["--surface-bg-subtle", "var(--color-bg-subtle)", "var(--glass-bg-subtle)"],
              ["--surface-border", "var(--color-border-subtle)", "var(--glass-border)"],
              ["--surface-highlight", "none", "var(--glass-highlight)  (1px top light edge)"],
              ["--surface-blur", "none", "blur(16px) saturate(160%)"],
              ["--surface-blur-overlay", "none", "blur(24px) saturate(180%)"],
            ]}
          />
          <p className="mb-3 mt-6 text-sm text-ink-muted">
            The liquid material is Figma&apos;s Glass effect, property for property: the tokens below are the
            liquid/regular and liquid/clear effect styles in Figma&apos;s own units (refraction, depth, dispersion,
            frost, light), and LiquidGlass turns them into pixels by rules measured from Figma&apos;s renders. To change
            one element, pass <code>{'effect={{ refraction: 0.8, depth: 20 }}'}</code> or set the unprefixed name
            (<code>--liquid-depth</code>, …) on it. Pick a tint with <code>{'<LiquidGlass tint="subtle">'}</code> (<code>regular</code>,{" "}
            <code>clear</code>, <code>subtle</code> or <code>none</code>), and put <code>data-on-photo</code> on any subtree that
            sits straight on a photo to switch it to light text.
          </p>
          <DocTable
            headers={["Token", "Default", "Controls"]}
            mono={[0, 1]}
            rows={[
              ["--liquid-tint-regular", "white 66%", "The regular tint"],
              ["--liquid-tint-clear", "white 28%", "The clear tint"],
              ["--liquid-tint-subtle", "5% ink", "The subtle tint: Figma's glass/bg-subtle, for a full-bleed overlay (white 8% in dark)"],
              ["--liquid-refraction-regular | -clear", "0.55 | 0.8", "Figma Glass · Refraction (0–1): how hard the rim bends"],
              ["--liquid-depth-regular | -clear", "16 | 20", "Figma Glass · Depth: how far in the bend reaches"],
              ["--liquid-dispersion-regular | -clear", "0.3 | 0.4", "Figma Glass · Dispersion (0–1): red bends more, blue less"],
              ["--liquid-frost-regular | -clear", "4 | 1", "Figma Glass · Frost: blur before the bend"],
              ["--liquid-light-intensity-regular | -clear", "0.7 | 0.8", "Figma Glass · Light intensity (0–1): rim, shade and glow, added"],
              ["--liquid-fallback-blur", "blur(14px) saturate(180%)", "The look in browsers without refraction"],
              ["--liquid-light-angle", "-45", "Figma Glass · Light angle: degrees clockwise from the top"],
              ["--liquid-overlay-tint", "var(--liquid-tint-subtle)", "The dashboard overlay (a 72% scrim in dark)"],
              ["--liquid-panel-tint", "white 76%", "A panel of glass that holds solid cards"],
            ]}
          />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility and browsers</h2>
          <div className="doc-prose">
            <ul>
              <li>
                <strong>Contrast.</strong> Text color follows the photo behind it, not the theme. Dark text on
                the tinted tiers held well; white text on a clear tier over a bright photo did not. Check each
                label against the real image, in light and dark. For secondary text on glass, use the stronger
                muted token (<code>--surface-fg-muted</code> in Figma; <code>--color-fg-muted</code> is already
                switched on glass in code).
              </li>
              <li>
                <strong>Reduced transparency.</strong> With <code>prefers-reduced-transparency</code>, glass
                and liquid surfaces render as plain opaque surfaces, with no tint, blur or refraction.
              </li>
              <li>
                <strong>Reduced motion.</strong> The pointer-following glare and the press squish are turned off.
              </li>
              <li>
                <strong>Browsers.</strong> Refraction renders in Chromium (Chrome, Edge, Arc, Opera). Safari
                and Firefox get a frosted fallback with the same tint, rim and depth, but no bending. Detection is
                by engine rather than feature query, because Safari reports{" "}
                <code>backdrop-filter</code> support yet ignores <code>url()</code> filters.
              </li>
              <li>
                <strong>Performance.</strong> Each <code>LiquidGlass</code> runs its own SVG filter. Use one
                full-size overlay and a few floating surfaces per screen, not one per card or row.
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">In Figma</h2>
          <div className="doc-prose">
            <ol>
              <li>Set the frame&apos;s <em>Surface</em> variable mode to Glass (or place a Liquid overlay), with Semantic on Light or Dark.</li>
              <li>Add the photo as the frame&apos;s image fill.</li>
              <li>Add a full-size rectangle named <code>Overlay</code> above it: fill <code>glass/bg-subtle</code>, effect style <code>liquid/regular</code>.</li>
              <li>Place the sidebar and top bar on it at a 5% fill; keep data cards on the solid surface.</li>
              <li>Float menus, modals and popovers with a tint and a lens from the strength table above.</li>
            </ol>
            <p>
              The <Link href="/docs/theming">theming</Link> and <Link href="/docs/tokens">tokens</Link> pages cover
              the rest of the token system.
            </p>
          </div>
        </section>
      </div>

      <Pager current="/docs/glass" />
    </article>
  );
}
