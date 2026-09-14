"use client";

import { CopyButton } from "./copy-button";
import { useHighlightedCode } from "@/lib/use-highlighted-code";

export function CodeBlock({
  code,
  lang = "tsx",
  className,
  compact = false,
}: {
  code: string;
  lang?: string;
  className?: string;
  /** Tighter padding + a smaller copy button, for fitting inline next to
   * other controls (e.g. the hero's CTA row) rather than as a full block. */
  compact?: boolean;
}) {
  const html = useHighlightedCode(code, lang);
  const padding = compact ? "px-3 py-2 pr-9" : "p-4";

  return (
    <div className={`group relative overflow-hidden rounded-lg border border-line-subtle bg-surface ${className ?? ""}`}>
      <CopyButton text={code} compact={compact} />
      {html ? (
        <>
          <div
            className={`overflow-x-auto text-[13px] leading-relaxed [&_pre]:!bg-transparent dark:hidden ${padding}`}
            dangerouslySetInnerHTML={{ __html: html.light }}
          />
          <div
            className={`hidden overflow-x-auto text-[13px] leading-relaxed [&_pre]:!bg-transparent dark:block ${padding}`}
            dangerouslySetInnerHTML={{ __html: html.dark }}
          />
        </>
      ) : (
        <pre className={`overflow-x-auto text-[13px] leading-relaxed text-ink-muted ${padding}`}>{code}</pre>
      )}
    </div>
  );
}
