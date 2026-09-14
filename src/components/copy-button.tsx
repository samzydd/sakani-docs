"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text, compact = false }: { text: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy code"
      className={`absolute z-10 flex items-center justify-center rounded-md border border-line-subtle bg-canvas text-ink-subtle opacity-0 transition-opacity hover:text-ink group-hover:opacity-100 ${
        compact ? "right-1.5 top-1/2 h-6 w-6 -translate-y-1/2" : "right-2 top-2 h-7 w-7"
      }`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}
