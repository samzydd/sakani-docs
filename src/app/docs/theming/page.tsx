import { PageHeader } from "@/components/docs/page-header";
import { CodeBlock } from "@/components/code-block";
import { Pager } from "@/components/docs/pager";

export const metadata = { title: "Theming" };

const SEMANTIC_TOKENS = [
  { name: "--color-bg-canvas", role: "Page background" },
  { name: "--color-bg-surface", role: "Card / panel background" },
  { name: "--color-bg-subtle", role: "Hover states, subtle fills" },
  { name: "--color-fg-default", role: "Primary text" },
  { name: "--color-fg-muted", role: "Secondary text" },
  { name: "--color-border-default", role: "Default borders" },
  { name: "--color-accent-default", role: "Primary action fill" },
  { name: "--color-danger-solid", role: "Destructive actions, errors" },
];

const REBRAND_EXAMPLE = `/* Your app's own stylesheet, loaded after tokens.css */
:root {
  --color-accent-default: #6d28d9; /* swap the brand color... */
  --color-accent-hover: #5b21b6;
}
/* ...every Button, Switch, and focus ring using --color-accent-*
   updates immediately -- no component code changes. */`;

export default function ThemingPage() {
  return (
    <article>
      <PageHeader
        title="Theming"
        description="How tokens flow from raw values to components, and how to re-theme the system."
      />

      <div className="doc-prose">
        <p>
          Sakani&apos;s tokens are organized in two layers, and the direction of that
          flow matters: components only ever bind to the semantic layer, never to
          primitives directly.
        </p>

        <h2>1. Primitives</h2>
        <p>
          Raw scales with no semantic meaning attached — <code>color/neutral/500</code>
          , <code>space/16</code>, <code>radius/md</code>. These exist so the
          semantic layer has something consistent to alias, and are never referenced
          by component CSS directly.
        </p>

        <h2>2. Semantic tokens</h2>
        <p>
          Names like <code>bg/surface</code>, <code>fg/muted</code>, and{" "}
          <code>accent/default</code> alias primitives and carry both a light and a
          dark value. This is the only layer components bind to — so a rebrand or
          theme change means repointing a semantic token, and every component using
          it updates automatically.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-line-subtle">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line-subtle bg-surface text-xs uppercase tracking-wide text-ink-subtle">
              <th className="px-4 py-2.5 font-medium">Token</th>
              <th className="px-4 py-2.5 font-medium">Preview</th>
              <th className="px-4 py-2.5 font-medium">Used for</th>
            </tr>
          </thead>
          <tbody>
            {SEMANTIC_TOKENS.map((t, i) => (
              <tr key={t.name} className={i !== SEMANTIC_TOKENS.length - 1 ? "border-b border-line-subtle" : ""}>
                <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-ink">{t.name}</td>
                <td className="px-4 py-2.5">
                  <span
                    className="inline-block h-5 w-5 rounded-full border border-line-subtle align-middle"
                    style={{ background: `var(${t.name})` }}
                  />
                </td>
                <td className="px-4 py-2.5 text-ink-muted">{t.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="doc-prose mt-8">
        <h2>Dark mode</h2>
        <p>
          Every semantic token has a value under <code>:root</code> (light) and
          another under <code>.dark</code>. Never hardcode a color in your own
          code that sits alongside Sakani components — bind to the semantic
          variable instead, and dark mode comes for free.
        </p>

        <h2>Re-theming</h2>
        <p>
          Because every component reads from the semantic layer, overriding a
          handful of variables after <code>tokens.css</code> loads re-themes the
          entire library — no component source changes, no rebuild.
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={REBRAND_EXAMPLE} lang="css" />
      </div>

      <Pager current="/docs/theming" />
    </article>
  );
}
