"use client";

import { useMemo, useState } from "react";
import * as Icons from "@sakaniui/react/icons";
import { iconNames, filledIconNames, IconCheck, type SakaniIcon } from "@sakaniui/react/icons";
import { cn } from "@/lib/utils";

const all = Icons as unknown as Record<string, SakaniIcon>;
const pascal = (n: string) => n.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
const PAGE = 240;

export function IconGallery() {
  const [query, setQuery] = useState("");
  const [style, setStyle] = useState<"outline" | "filled">("outline");
  const [limit, setLimit] = useState(PAGE);
  const [copied, setCopied] = useState<string | null>(null);

  const names = (style === "filled" ? filledIconNames : iconNames) as readonly string[];
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "-");
    return q ? names.filter((n) => n.includes(q)) : names;
  }, [query, names]);

  const compName = (n: string) => "Icon" + pascal(n) + (style === "filled" ? "Filled" : "");
  const copy = async (n: string) => {
    try { await navigator.clipboard.writeText(`<${compName(n)} />`); } catch { /* clipboard unavailable */ }
    setCopied(n);
    window.setTimeout(() => setCopied((c) => (c === n ? null : c)), 1400);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }}
          placeholder={`Search ${names.length.toLocaleString()} icons`}
          aria-label="Search icons"
          className="h-9 w-full max-w-xs rounded-md border border-line-subtle bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-line-strong"
        />
        <div className="flex rounded-md border border-line-subtle p-0.5 text-sm" role="group" aria-label="Style">
          {(["outline", "filled"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => { setStyle(v); setLimit(PAGE); }}
              aria-pressed={style === v}
              className={cn("rounded px-3 py-1 capitalize", style === v ? "bg-subtle font-medium text-ink" : "text-ink-muted hover:text-ink")}
            >
              {v}
            </button>
          ))}
        </div>
        <span className="text-sm text-ink-muted" aria-live="polite">{shown.length.toLocaleString()} found</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-1">
        {shown.slice(0, limit).map((n) => {
          const Icon = all[compName(n)];
          return (
            <button
              key={n}
              type="button"
              onClick={() => copy(n)}
              title={`Copy <${compName(n)} />`}
              className="group flex flex-col items-center gap-2 rounded-lg px-1 py-3 text-ink transition-colors hover:bg-subtle"
            >
              <span className="flex size-8 items-center justify-center">{Icon && <Icon size={24} />}</span>
              <span className="flex max-w-full items-center gap-1 truncate text-[11px] text-ink-muted group-hover:text-ink">
                {copied === n ? <><IconCheck size={11} /> Copied</> : n}
              </span>
            </button>
          );
        })}
      </div>
      {shown.length > limit && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE * 4)}
            className="rounded-md border border-line-subtle px-4 py-2 text-sm text-ink hover:bg-subtle"
          >
            Show more ({(shown.length - limit).toLocaleString()} left)
          </button>
        </div>
      )}
    </div>
  );
}
