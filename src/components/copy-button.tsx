"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
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
      className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-line-subtle bg-canvas text-ink-subtle opacity-0 transition-opacity hover:text-ink group-hover:opacity-100"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}
