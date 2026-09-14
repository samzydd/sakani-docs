"use client";

import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";

type Highlighted = { light: string; dark: string };

const cache = new Map<string, Highlighted>();

export function useHighlightedCode(code: string, lang = "tsx") {
  const key = `${lang}:${code}`;
  const cached = cache.get(key) ?? null;
  const [fetched, setFetched] = useState<Highlighted | null>(null);

  useEffect(() => {
    if (cache.has(key)) return;
    let cancelled = false;
    Promise.all([
      codeToHtml(code, { lang, theme: "github-light" }),
      codeToHtml(code, { lang, theme: "github-dark" }),
    ]).then(([light, dark]) => {
      if (cancelled) return;
      const result = { light, dark };
      cache.set(key, result);
      setFetched(result);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return cached ?? fetched;
}
