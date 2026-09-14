"use client";

import { useState, type ReactNode } from "react";
import { Sun, Moon } from "lucide-react";
import { CopyButton } from "@/components/copy-button";
import { useHighlightedCode } from "@/lib/use-highlighted-code";
import { cn } from "@/lib/utils";

export function ComponentPreview({
  children,
  code,
  lang = "tsx",
  fullBleed = false,
}: {
  children: ReactNode;
  code: string;
  lang?: string;
  /** For wide, self-contained blocks (dashboards, tables) — drops the
   * centered padding so the block renders at its own natural width with
   * horizontal scroll instead of being squeezed into a padded box. */
  fullBleed?: boolean;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  // Independent of the site's own light/dark toggle -- lets you check a
  // component in both themes without switching the whole page (and back).
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark">("light");
  const html = useHighlightedCode(code, lang);

  return (
    <div className="overflow-hidden rounded-xl border border-line-subtle">
      <div className="flex items-center justify-between gap-1 border-b border-line-subtle bg-surface px-2 pt-2">
        <div className="flex items-center gap-1">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-t-md px-3 py-1.5 text-sm capitalize transition-colors",
                tab === t ? "bg-canvas text-ink" : "text-ink-subtle hover:text-ink"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "preview" && (
          <button
            type="button"
            onClick={() => setPreviewTheme((v) => (v === "dark" ? "light" : "dark"))}
            aria-label={previewTheme === "dark" ? "Preview in light mode" : "Preview in dark mode"}
            className="mb-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-ink-subtle transition-colors hover:bg-subtle hover:text-ink"
          >
            {previewTheme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        )}
      </div>

      {tab === "preview" ? (
        <div
          className={cn(
            "bg-canvas",
            previewTheme === "dark" ? "dark" : "force-light",
            fullBleed
              ? "max-h-[980px] overflow-auto"
              : "flex min-h-52 items-center justify-center p-10"
          )}
        >
          {children}
        </div>
      ) : (
        <div className="group relative bg-surface">
          <CopyButton text={code} />
          {html ? (
            <>
              <div
                className="overflow-x-auto p-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent dark:hidden"
                dangerouslySetInnerHTML={{ __html: html.light }}
              />
              <div
                className="hidden overflow-x-auto p-4 text-[13px] leading-relaxed [&_pre]:!bg-transparent dark:block"
                dangerouslySetInnerHTML={{ __html: html.dark }}
              />
            </>
          ) : (
            <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-ink-muted">{code}</pre>
          )}
        </div>
      )}
    </div>
  );
}
