import type { CommandMenuGroup } from "@sakaniui/react";
import { docsNav } from "@/lib/nav";

/**
 * The docs navigation as CommandMenu results: each nav group becomes a group of page results, and a result's
 * description is its group ("Forms", "Navigation"), so searching a group name finds its pages too.
 * Shared by the site's ⌘K search and the homepage's live Command Menu card.
 */
export const docsSearchGroups: CommandMenuGroup[] = docsNav.map((group) => ({
  id: group.title,
  label: group.title,
  items: group.items.map((item) => ({
    id: item.href,
    type: "page" as const,
    label: item.title,
    description: group.title,
  })),
}));
