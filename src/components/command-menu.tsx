"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommandMenu as SakaniCommandMenu, CommandMenuTrigger } from "@sakaniui/react";
import { docsSearchGroups } from "@/lib/search-groups";

/**
 * The site's ⌘K search. It is SakaniUI's own CommandMenu, fed from the docs navigation
 * (see search-groups.ts).
 *
 * The library menu opens with ⌘K / Ctrl K, filters as you type, moves with the arrow keys
 * over one gliding highlight, and closes with esc, so none of that is wired up here.
 */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <CommandMenuTrigger placeholder="Search docs…" onClick={() => setOpen(true)} />
      <SakaniCommandMenu
        open={open}
        onOpenChange={setOpen}
        variant="simple"
        groups={docsSearchGroups}
        placeholder="Search components, blocks, guides…"
        emptyTitle="No results"
        emptyDescription="Try a component name, like Button or Table."
        onSelect={(item) => router.push(item.id)}
        aria-label="Search the docs"
      />
    </>
  );
}
