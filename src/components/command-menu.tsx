"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { docsNav } from "@/lib/nav";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (o) setQuery("");
          return !o;
        });
      }
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return docsNav
      .map((group) => ({
        title: group.title,
        items: group.items.filter((i) => !q || i.title.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-full max-w-64 items-center gap-2 rounded-md border border-line-subtle bg-surface px-3 text-sm text-ink-subtle transition-colors hover:border-line-default"
      >
        <Search size={14} strokeWidth={1.75} />
        <span className="flex-1 text-left">Search docs…</span>
        <kbd className="rounded border border-line-subtle bg-subtle px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[15vh]" onClick={close}>
          <div
            className="w-full max-w-lg animate-fade-in overflow-hidden rounded-xl border border-line-subtle bg-surface shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-line-subtle px-4 py-3">
              <Search size={16} className="text-ink-subtle" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components, blocks, guides…"
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-subtle"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-ink-subtle">No results.</p>
              )}
              {results.map((group) => (
                <div key={group.title} className="mb-2 last:mb-0">
                  <p className="px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-ink-subtle">
                    {group.title}
                  </p>
                  {group.items.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => go(item.href)}
                      className="flex w-full items-center rounded-md px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-subtle"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
