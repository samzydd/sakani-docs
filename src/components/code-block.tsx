"use client";

import { CopyButton } from "./copy-button";
import { useHighlightedCode } from "@/lib/use-highlighted-code";

export function CodeBlock({
  code,
  lang = "tsx",
  className,
}: {
  code: string;
  lang?: string;
  className?: string;
}) {
  const html = useHighlightedCode(code, lang);

  return (
    <div className={`group relative overflow-hidden rounded-lg border border-line-subtle bg-surface ${className ?? ""}`}>
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
  );
}
