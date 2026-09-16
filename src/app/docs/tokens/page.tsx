import { PageHeader } from "@/components/docs/page-header";
import { Pager } from "@/components/docs/pager";
import { getTokenGroups, type Token } from "@/lib/tokens";

export const metadata = {
  title: "Tokens",
  description:
    "Every design token in Sakani, with its resolved value in light and dark mode, generated from the stylesheet itself.",
};

/**
 * One chip, or two only when the token actually resolves differently per
 * theme.
 *
 * Every colour row used to render two chips, but most of these are
 * primitives with a single fixed value -- 87 of the 121 colour rows were
 * drawing the identical swatch twice, which implied a light/dark distinction
 * that isn't there. Two chips now mean something.
 */
function Swatch({ token }: { token: Token }) {
  const themed = token.light !== token.dark;

  if (!themed) {
    return (
      <span
        className="h-9 w-9 shrink-0 rounded-md border border-line-subtle"
        style={{ background: token.light }}
        title={token.light}
      />
    );
  }

  return (
    <span
      className="flex h-9 w-9 shrink-0 overflow-hidden rounded-md border border-line-subtle"
      title={`light ${token.light} · dark ${token.dark}`}
    >
      <span className="w-1/2" style={{ background: token.light }} />
      <span className="w-1/2" style={{ background: token.dark }} />
    </span>
  );
}

function Preview({ token }: { token: Token }) {
  if (token.kind === "color") return <Swatch token={token} />;

  if (token.kind === "shadow") {
    return (
      <span
        className="h-9 w-16 shrink-0 rounded-md border border-line-subtle bg-surface"
        style={{ boxShadow: token.light }}
      />
    );
  }

  // Spacing / radius / border width read far better as a drawn quantity than
  // as "12px" repeated down a column.
  if (token.kind === "size") {
    const px = parseFloat(token.light);
    if (token.name.includes("radius")) {
      return (
        <span
          className="h-9 w-16 shrink-0 border border-line-strong bg-subtle"
          style={{ borderRadius: token.light }}
        />
      );
    }
    if (!Number.isNaN(px) && /px|rem/.test(token.light)) {
      const width = token.light.endsWith("rem") ? px * 16 : px;
      // Only draw the quantity when it fits. Clamping instead would render
      // every breakpoint (640/768/1024) as the same 64px bar, which says
      // something false; those are better left to their numeric value.
      if (width <= 64) {
        return (
          <span className="flex h-9 w-16 shrink-0 items-center">
            <span className="block h-2 rounded-sm bg-accent" style={{ width: `${Math.max(width, 1)}px` }} />
          </span>
        );
      }
    }
  }

  if (token.kind === "font") {
    return (
      <span className="w-16 shrink-0 text-lg text-ink" style={{ fontFamily: token.light }}>
        Ag
      </span>
    );
  }

  return <span className="w-16 shrink-0" />;
}

function TokenRow({ token }: { token: Token }) {
  const alias = token.raw.startsWith("var(");
  return (
    <div className="flex items-start gap-4 border-b border-line-subtle py-3 last:border-b-0">
      <Preview token={token} />
      <div className="min-w-0 flex-1">
        <code className="break-all font-mono text-[13px] font-medium text-ink">{token.name}</code>
        {token.note && <p className="mt-0.5 text-xs text-ink-muted">{token.note}</p>}
        {alias && (
          <p className="mt-0.5 font-mono text-xs text-ink-muted">
            → {token.raw.replace(/^var\(|\)$/g, "")}
          </p>
        )}
      </div>
      <div className="shrink-0 text-right font-mono text-xs text-ink-muted">
        <div>{token.light}</div>
        {token.themed && token.dark !== token.light && (
          <div className="mt-0.5">
            <span className="text-ink-muted">dark </span>
            {token.dark}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TokensPage() {
  const groups = getTokenGroups();
  const all = groups.flatMap((g) => g.tokens);
  const total = all.length;
  // Counted by resolved value, not by whether `.dark` mentions the token:
  // five are restated there and land on the same colour anyway (the brand
  // orange and the four status solids, which hold across both themes), so
  // counting declarations would disagree with the swatches on the page.
  const themed = all.filter((t) => t.light !== t.dark).length;

  return (
    <article>
      <PageHeader
        title="Tokens"
        description="Every token in the system, with the value it resolves to in each theme. Generated from the stylesheet, so it cannot drift from what the components actually use."
      />

      <div className="doc-prose mb-8">
        <p>
          {total} tokens across {groups.length} groups. {themed} of them
          resolve to a different value in dark mode; the rest hold across both,
          either because they are primitives or because they are meant to stay
          fixed, which is why the brand orange and the chart colours look the
          same either way.
        </p>
        <p>
          A split swatch means the token resolves differently per theme: left
          half is light, right half is dark. A solid swatch is a single fixed
          value. A <code>→</code> line means the token is an alias, and points
          at what it resolves through. Everything here is a plain CSS custom
          property, so you can read or override any of it without a build step.
        </p>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="mb-1 text-lg font-semibold capitalize text-ink">{group.title}</h2>
            <p className="mb-3 text-sm text-ink-muted">
              {group.tokens.length} {group.tokens.length === 1 ? "token" : "tokens"}
            </p>
            <div className="rounded-xl border border-line-subtle bg-surface px-4">
              {group.tokens.map((token) => (
                <TokenRow key={token.name} token={token} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <Pager current="/docs/tokens" />
    </article>
  );
}
