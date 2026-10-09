"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import * as Sicons from "@sakaniui/react/sicons";
import { siconNames, type SiconFC } from "@sakaniui/react/sicons";
import { cn } from "@/lib/utils";

const all = Sicons as unknown as Record<string, SiconFC>;
const toComponentName = (name: string) =>
  "Sicon" + name.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
const SIZES = [20, 24, 32] as const;

export function SiconGallery() {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState<(typeof SIZES)[number]>(24);
  const [copied, setCopied] = useState<string | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "-");
    return q ? siconNames.filter((n) => n.includes(q)) : siconNames;
  }, [query]);

  const copy = async (name: string) => {
    const snippet = `<${toComponentName(name)}${size === 24 ? "" : ` size={${size}}`} />`;
    try { await navigator.clipboard.writeText(snippet); } catch { /* clipboard unavailable */ }
    setCopied(name);
    window.setTimeout(() => setCopied((c) => (c === name ? null : c)), 1400);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${siconNames.length.toLocaleString()} icons`}
          aria-label="Search Sicons"
          className="h-9 w-full max-w-xs rounded-md border border-line-subtle bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-line-strong"
        />
        <div className="flex rounded-md border border-line-subtle p-0.5 text-sm" role="group" aria-label="Size">
          {SIZES.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setSize(v)}
              aria-pressed={size === v}
              className={cn("rounded px-3 py-1 tabular-nums", size === v ? "bg-subtle font-medium text-ink" : "text-ink-muted hover:text-ink")}
            >
              {v}px
            </button>
          ))}
        </div>
        <span className="text-sm text-ink-muted" aria-live="polite">{shown.length.toLocaleString()} shown</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-1">
        {shown.map((name) => {
          const Icon = all[toComponentName(name)];
          return (
            <button
              key={name}
              type="button"
              onClick={() => copy(name)}
              title={`Copy <${toComponentName(name)} />`}
              className="group flex flex-col items-center gap-2 rounded-lg px-1 py-3 text-ink transition-colors hover:bg-subtle [content-visibility:auto] [contain-intrinsic-size:auto_80px]"
            >
              <span className="flex size-8 items-center justify-center">{Icon && <Icon size={size} />}</span>
              <span className="flex max-w-full items-center gap-1 truncate text-[11px] text-ink-muted group-hover:text-ink">
                {copied === name ? <><Check size={11} /> Copied</> : name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
