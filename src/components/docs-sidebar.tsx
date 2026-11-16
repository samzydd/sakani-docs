"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconSearch as Search, IconX as X } from "@sakaniui/react/icons";
import { docsNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const arrived = useRef(false);

  /**
   * Keeps the list scrolled to the page that is open.
   *
   * The list is long (the Blocks group alone is 40+ items), so arriving from the header's "Blocks" link, or from the
   * homepage, a search or a pasted URL, mounts it at the top with the open page far below the fold and the sidebar
   * no longer matching the page on the right. This scrolls the list, and only the list (scrollIntoView would also
   * move the page), so the active item sits about a third of the way down with the items around it visible.
   *
   * On arrival it is placed before the first paint so there is no visible jump from the top; when the page changes
   * inside the docs (the layout and this list stay mounted) it eases there. An item that is already comfortably in
   * view is left alone, so clicking around in the list does not make it move under the pointer.
   */
  useLayoutEffect(() => {
    const box = listRef.current;
    const el = box?.querySelector<HTMLElement>('[aria-current="page"]');
    const first = !arrived.current;
    arrived.current = true;
    if (!box || !el) return;
    const b = box.getBoundingClientRect();
    const e = el.getBoundingClientRect();
    const edge = 56;
    if (!first && e.top >= b.top + edge && e.bottom <= b.bottom - edge) return;
    const top = Math.max(0, box.scrollTop + (e.top - b.top) - box.clientHeight / 3);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    box.scrollTo({ top, behavior: first || reduce ? "auto" : "smooth" });
    // Only the page changing moves the list; typing in the filter must not.
  }, [pathname]);

  /**
   * Matches on the group name too, so "charts" surfaces that whole section
   * rather than only the items with "chart" in their own title. Groups that
   * match keep all their items; otherwise the group is filtered down to the
   * items that match, and disappears when none do.
   */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return docsNav;
    return docsNav
      .map((group) => {
        if (group.title.toLowerCase().includes(q)) return group;
        const items = group.items.filter((i) => i.title.toLowerCase().includes(q));
        return items.length ? { ...group, items } : null;
      })
      .filter((g): g is (typeof docsNav)[number] => g !== null);
  }, [query]);

  const count = results.reduce((n, g) => n + g.items.length, 0);

  return (
    <nav className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 flex-col pb-10 lg:flex">
      {/* Outside the scroll container below, so it stays put while the list
          scrolls rather than sliding away as soon as you use it. */}
      <div className="relative mb-4 shrink-0">
        <Search
          size={14}
          className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-ink-muted"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQuery("");
              inputRef.current?.blur();
            }
          }}
          placeholder="Filter components…"
          aria-label="Filter components"
          className="h-8 w-full rounded-md border border-line-subtle bg-surface pl-8 pr-7 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted hover:border-line-default focus:border-line-strong"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear filter"
            className="absolute right-1.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded text-ink-muted transition-colors hover:bg-subtle hover:text-ink"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Live region so the result count is announced while typing, since the
          list itself changes silently. */}
      <p className="sr-only" role="status" aria-live="polite">
        {query ? `${count} ${count === 1 ? "result" : "results"}` : ""}
      </p>

      {/* data-lenis-prevent: the list scrolls natively, not through the page's smooth scroll. */}
      <div ref={listRef} data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto">
        {count === 0 ? (
          <p className="px-1 py-6 text-sm text-ink-muted">
            No components match &ldquo;{query}&rdquo;.
          </p>
        ) : (
          results.map((group) => (
            <div key={group.title} className="mb-6">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">
                {group.title}
              </p>
              <div className="flex flex-col gap-0.5 border-l border-line-subtle">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "sidebar-link -ml-px flex items-center justify-between rounded-r-md border-l px-3 py-1.5 text-sm",
                        active
                          ? "border-ink bg-subtle font-medium text-ink"
                          : "border-transparent text-ink-muted hover:border-line-strong hover:bg-subtle/60 hover:text-ink"
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </nav>
  );
}
