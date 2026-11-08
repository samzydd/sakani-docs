"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CommandMenu as SakaniCommandMenu, CommandMenuTrigger, type CommandMenuGroup } from "@sakaniui/react";
import { docsNav } from "@/lib/nav";

/**
 * The site's ⌘K search. It is SakaniUI's own CommandMenu, fed from the docs navigation:
 * each nav group becomes a group of page results, and a result's description is its group
 * ("Forms", "Navigation"), so searching a group name finds its pages too.
 *
 * The library menu opens with ⌘K / Ctrl K, filters as you type, moves with the arrow keys
 * over one gliding highlight, and closes with esc, so none of that is wired up here.
 */
export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const groups = useMemo<CommandMenuGroup[]>(
    () =>
      docsNav.map((group) => ({
        id: group.title,
        label: group.title,
        items: group.items.map((item) => ({
          id: item.href,
          type: "page" as const,
          label: item.title,
          description: group.title,
        })),
      })),
    [],
  );

  return (
    <>
      <CommandMenuTrigger placeholder="Search docs…" onClick={() => setOpen(true)} />
      <SakaniCommandMenu
        open={open}
        onOpenChange={setOpen}
        variant="simple"
        groups={groups}
        placeholder="Search components, blocks, guides…"
        emptyTitle="No results"
        emptyDescription="Try a component name, like Button or Table."
        onSelect={(item) => router.push(item.id)}
        aria-label="Search the docs"
      />
    </>
  );
}
