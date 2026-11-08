"use client";

import { useEffect, useRef, useState } from "react";
import { CommandMenu } from "@sakaniui/react";
import { docsSearchGroups } from "@/lib/search-groups";

const QUERIES = ["button", "modal", "chart", "sidebar", "toast"];

/**
 * The real CommandMenu, open and typing for itself, framed in a homepage card.
 *
 * The menu is drawn in a layer over its page, so the card shows it inside an iframe: the frame's own
 * viewport is the stage. It types a few searches on a loop until someone touches it, then it is theirs:
 * type, move with the arrow keys, press Enter to go to that page (the whole page, not just the frame).
 * `theme` is the card's own light/dark switch, so the menu follows the card, not the site.
 */
export function EmbedCommandMenu({ theme }: { theme: "light" | "dark" }) {
  const [query, setQuery] = useState("");
  const [auto, setAuto] = useState(true);
  const touched = useRef(false);

  // The menu focuses its field when it opens. In a frame that would steal the page's keyboard focus (⌘K on the
  // homepage would land here), so hand focus back until the person actually clicks or types in the demo.
  useEffect(() => {
    const t = setTimeout(() => {
      if (touched.current) return;
      (document.activeElement as HTMLElement | null)?.blur();
      (window.frameElement as HTMLElement | null)?.blur();
      window.parent.focus();
    }, 450);
    return () => clearTimeout(t);
  }, []);

  // The page's ⌘K opens the site search. If the keys land in this frame (someone clicked into the demo, then pressed ⌘K),
  // pass them on rather than swallow them.
  useEffect(() => {
    if (window.parent === window) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        (window.frameElement as HTMLElement | null)?.blur();
        window.parent.document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: e.metaKey, ctrlKey: e.ctrlKey, bubbles: true }));
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let n = 0;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const q = QUERIES[n % QUERIES.length];
      if (i < q.length) {
        i += 1;
        setQuery(q.slice(0, i));
        timer = setTimeout(step, 120);
      } else {
        // hold the result, clear, and go on to the next search
        timer = setTimeout(() => { setQuery(""); i = 0; n += 1; timer = setTimeout(step, 1100); }, 2400);
      }
    };
    timer = setTimeout(step, 900);
    return () => clearTimeout(timer);
  }, [auto]);

  const take = () => { touched.current = true; setAuto(false); };

  return (
    <div
      className={`min-h-screen bg-surface ${theme === "dark" ? "dark" : "force-light"}`}
      // a faint dot grid under the menu's scrim, so it reads as a menu over a page rather than over a flat colour
      style={{ backgroundImage: "radial-gradient(var(--color-border-default) 1px, transparent 1.2px)", backgroundSize: "22px 22px" }}
      onPointerDownCapture={take}
      onKeyDownCapture={take}
    >
      <CommandMenu
        hotkey={false}
        open
        onOpenChange={() => {}}
        variant="simple"
        groups={docsSearchGroups}
        query={query}
        onQueryChange={(q) => { take(); setQuery(q); }}
        placeholder="Search components, blocks, guides…"
        emptyTitle="No results"
        emptyDescription="Try a component name, like Button or Table."
        onSelect={(item) => window.parent.location.assign(item.id)}
        aria-label="Command menu demo"
      />
    </div>
  );
}
