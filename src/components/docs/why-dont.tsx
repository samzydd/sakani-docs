import { IconCheck as Check, IconX as X } from "@sakaniui/react/icons";
import { reasoning } from "@/lib/reasoning";

/**
 * "Why" and "Don't" for a page, from src/lib/reasoning.ts. Renders nothing for
 * pages with no entry, so adding a component never needs this touched.
 */
export function WhyDont({ href }: { href: string }) {
  const slug = href.split("/").filter(Boolean).pop() ?? "";
  const entry = reasoning[slug];
  if (!entry) return null;

  return (
    <section aria-labelledby="why-dont" className="mt-12">
      <h2 id="why-dont" className="mb-3 text-lg font-semibold text-ink">
        Why it works this way
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-line-subtle p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
            <Check size={14} aria-hidden="true" /> Why
          </h3>
          <ul className="space-y-2 text-sm text-ink-muted">
            {entry.why.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-line-subtle p-4">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
            <X size={14} aria-hidden="true" /> Don&apos;t
          </h3>
          <ul className="space-y-2 text-sm text-ink-muted">
            {entry.dont.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
