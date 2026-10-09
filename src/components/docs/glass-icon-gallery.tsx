"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check } from "lucide-react";
import * as GlassIcons from "@sakaniui/react/glass-icons";
import {
  GLASS_ICON_TONES,
  glassIconNames,
  type GlassIconComponent,
  type GlassIconTone,
  type GlassIconVariant,
} from "@sakaniui/react/glass-icons";
import { cn } from "@/lib/utils";

const all = GlassIcons as unknown as Record<string, GlassIconComponent>;
const toComponentName = (name: string) =>
  "Glass" + name.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
const TONES = Object.keys(GLASS_ICON_TONES) as GlassIconTone[];

/**
 * Mounts its icon only once it nears the viewport. Each glass icon carries its
 * own blur filter, so painting all 1,626 up front stalls the page for seconds;
 * mounting on approach keeps the first paint to the few dozen on screen. Once
 * mounted an icon stays mounted, so scrolling back is free.
 */
function LazyCell({ children, size }: { children: React.ReactNode; size: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  return <div ref={ref} style={{ width: size, height: size }}>{seen ? children : null}</div>;
}

export function GlassIconGallery() {
  const [query, setQuery] = useState("");
  const [tone, setTone] = useState<GlassIconTone>("violet");
  const [variant, setVariant] = useState<GlassIconVariant>("frosted");
  const [copied, setCopied] = useState<string | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "-");
    return q ? glassIconNames.filter((n) => n.includes(q)) : glassIconNames;
  }, [query]);

  const copy = async (name: string) => {
    const snippet = `<${toComponentName(name)} tone="${tone}"${variant === "tile" ? ' variant="tile"' : ""} />`;
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
          placeholder={`Search ${glassIconNames.length.toLocaleString()} icons`}
          aria-label="Search glass icons"
          className="h-9 w-full max-w-xs rounded-md border border-line-subtle bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-line-strong"
        />
        <select
          value={tone}
          onChange={(e) => setTone(e.target.value as GlassIconTone)}
          aria-label="Tone"
          className="h-9 rounded-md border border-line-subtle bg-surface px-2 text-sm text-ink"
        >
          {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <div className="flex rounded-md border border-line-subtle p-0.5 text-sm" role="group" aria-label="Variant">
          {(["frosted", "tile"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              aria-pressed={variant === v}
              className={cn("rounded px-3 py-1 capitalize", variant === v ? "bg-subtle font-medium text-ink" : "text-ink-muted hover:text-ink")}
            >
              {v}
            </button>
          ))}
        </div>
        <span className="text-sm text-ink-muted" aria-live="polite">{shown.length.toLocaleString()} shown</span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,1fr))] gap-1">
        {shown.map((name) => {
          const Icon = all[toComponentName(name)];
          return (
            <button
              key={name}
              type="button"
              onClick={() => copy(name)}
              title={`Copy <${toComponentName(name)} />`}
              className="group flex flex-col items-center gap-2 rounded-lg px-1 py-3 transition-colors hover:bg-subtle"
            >
              <LazyCell size={48}>{Icon && <Icon size={48} tone={tone} variant={variant} />}</LazyCell>
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
