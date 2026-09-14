import Link from "next/link";
import { PageHeader } from "@/components/docs/page-header";
import { Pager } from "@/components/docs/pager";

export const metadata = { title: "Introduction" };

export default function IntroductionPage() {
  return (
    <article>
      <PageHeader
        title="Introduction"
        description="What Sakani is, how it&apos;s built, and how it&apos;s meant to be used."
      />
      <div className="doc-prose">
        <p>
          Sakani is a React component library generated directly from a single Figma
          file — every component, variant, and state you see in the design file has a
          matching implementation here. Nothing is guessed or approximated: colors,
          spacing, radii, and typography all trace back to the same token definitions
          the designers use.
        </p>

        <h2>Two layers</h2>
        <p>
          The library ships two kinds of things, and it&apos;s worth knowing which one
          you&apos;re reaching for:
        </p>
        <ul>
          <li>
            <strong>Components</strong> — real, importable, configurable React
            components (<code>Button</code>, <code>Select</code>,{" "}
            <code>Card</code>…). You install these and use them as-is, the same way
            you&apos;d use any other component library.
          </li>
          <li>
            <strong>Blocks</strong> — full page sections (a pricing table, a
            checkout flow, a billing form). These are{" "}
            <strong>composition examples</strong>, not configurable components — the
            intent is to copy the source file into your own project and edit it
            directly, the same way shadcn/ui&apos;s blocks work.
          </li>
        </ul>

        <h2>Token-driven, not hardcoded</h2>
        <p>
          Every visual property in every component is a CSS custom property, not a
          literal value. That&apos;s what makes the built-in dark mode possible, and it&apos;s
          what lets you re-theme the whole system by repointing a handful of semantic
          tokens instead of touching component code. See{" "}
          <Link href="/docs/theming">Theming</Link> for the full token reference.
        </p>

        <h2>Not a fork, not a wrapper</h2>
        <p>
          Sakani doesn&apos;t sit on top of Radix, Headless UI, or any other primitive
          library — every interactive behavior (keyboard navigation, focus
          management, portal positioning) is implemented directly against the DOM.
          That keeps the bundle small and the behavior fully within this project&apos;s
          control.
        </p>
      </div>
      <Pager current="/docs" />
    </article>
  );
}
