"use client";

import { useMemo, useState } from "react";
import * as Emoji from "@sakaniui/react/emoji";
import { emojiCatalog, emojiCategories, type EmojiInfo, type EmojiTone, type SakaniEmoji } from "@sakaniui/react/emoji";
import { IconCheck } from "@sakaniui/react/icons";
import { cn } from "@/lib/utils";

const all = Emoji as unknown as Record<string, SakaniEmoji>;
const pascal = (n: string) => n.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");
const PAGE = 240;

const TONES: { id: EmojiTone | "default"; label: string; swatch: string }[] = [
  { id: "default", label: "Default", swatch: "#ffc83d" },
  { id: "light", label: "Light", swatch: "#f7d7c4" },
  { id: "medium-light", label: "Medium light", swatch: "#d8b094" },
  { id: "medium", label: "Medium", swatch: "#b47d56" },
  { id: "medium-dark", label: "Medium dark", swatch: "#8d5524" },
  { id: "dark", label: "Dark", swatch: "#5c3d2e" },
];

function CopyButton({ text, label, done }: { text: string; label: string; done: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {done ? <IconCheck size={14} /> : null}
      {done ? "Copied" : label}
      <span className="sr-only">{text}</span>
    </span>
  );
}

export default function EmojiGalleryInner() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [tone, setTone] = useState<EmojiTone | "default">("default");
  const [limit, setLimit] = useState(PAGE);
  const [selected, setSelected] = useState<string>("rocket");
  const [copied, setCopied] = useState<string | null>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/\s+/g, "-");
    return emojiCatalog.filter((e) => (category === "All" || e.category === category) && (!q || e.name.includes(q)));
  }, [query, category]);

  const info: EmojiInfo = emojiCatalog.find((e) => e.name === selected) ?? emojiCatalog[0];
  const compName = (n: string) => "Emoji" + pascal(n);
  const jsx = (e: EmojiInfo) => `<${compName(e.name)}${e.tones && tone !== "default" ? ` tone="${tone}"` : ""} />`;

  const copy = async (key: string, text: string) => {
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard unavailable */ }
    setCopied(key);
    window.setTimeout(() => setCopied((c) => (c === key ? null : c)), 1400);
  };

  const Selected = all[compName(info.name)];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => { setQuery(e.target.value); setLimit(PAGE); }}
          placeholder={`Search ${emojiCatalog.length.toLocaleString()} emoji`}
          aria-label="Search emoji"
          className="h-9 w-full max-w-xs rounded-md border border-line-subtle bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus:border-line-strong"
        />
        <div className="flex items-center gap-1.5" role="group" aria-label="Skin tone">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTone(t.id)}
              aria-pressed={tone === t.id}
              aria-label={t.label}
              title={t.label}
              className={cn("size-6 rounded-full border-2 transition-transform", tone === t.id ? "scale-110 border-ink" : "border-transparent hover:scale-110")}
              style={{ background: t.swatch }}
            />
          ))}
        </div>
        <span className="text-sm text-ink-muted" aria-live="polite">{shown.length.toLocaleString()} found</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5" role="group" aria-label="Category">
        {["All", ...emojiCategories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => { setCategory(c); setLimit(PAGE); }}
            aria-pressed={category === c}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              category === c ? "border-ink bg-ink text-surface" : "border-line-subtle text-ink-muted hover:border-line-strong hover:text-ink",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4 rounded-xl border border-line-subtle bg-subtle p-4">
        <span className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-surface">
          {Selected && <Selected size={56} tone={info.tones && tone !== "default" ? tone : undefined} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-ink">{info.label}</p>
          <p className="mt-0.5 text-sm text-ink-muted">
            {info.category}{info.tones ? " · takes a skin tone" : ""} · <span className="text-base leading-none">{info.char}</span>
          </p>
          <code className="mt-2 block truncate rounded bg-surface px-2 py-1 text-xs text-ink">{jsx(info)}</code>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => copy("jsx", jsx(info))} className="rounded-md border border-line-subtle bg-surface px-3 py-1.5 text-sm text-ink hover:bg-subtle">
            <CopyButton text={jsx(info)} label="Copy JSX" done={copied === "jsx"} />
          </button>
          <button type="button" onClick={() => copy("char", info.char)} className="rounded-md border border-line-subtle bg-surface px-3 py-1.5 text-sm text-ink hover:bg-subtle">
            <CopyButton text={info.char} label="Copy character" done={copied === "char"} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-1">
        {shown.slice(0, limit).map((e) => {
          const Component = all[compName(e.name)];
          const active = e.name === selected;
          return (
            <button
              key={e.name}
              type="button"
              onClick={() => setSelected(e.name)}
              title={e.label}
              aria-pressed={active}
              className={cn("group flex flex-col items-center gap-2 rounded-lg px-1 py-3 transition-colors hover:bg-subtle", active && "bg-subtle ring-1 ring-line-strong")}
            >
              <span className="flex size-9 items-center justify-center">
                {Component && <Component size={32} tone={e.tones && tone !== "default" ? tone : undefined} />}
              </span>
              <span className="max-w-full truncate text-[11px] text-ink-muted group-hover:text-ink">{e.name}</span>
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
