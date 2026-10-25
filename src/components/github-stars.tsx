"use client";

import { IconStarFilled as Star } from "@sakaniui/react/icons";
import { formatStars, useGithubStars } from "@/lib/use-github-stars";
import { cn } from "@/lib/utils";

/** Star icon and the repository's live star count. Renders nothing until GitHub has answered. */
export function GithubStars({ className }: { className?: string }) {
  const stars = useGithubStars();
  if (stars === null) return null;
  return (
    <span
      className={cn("inline-flex items-center gap-1 tabular-nums", className)}
      title={`${stars.toLocaleString("en-US")} stars on GitHub`}
    >
      <Star size={12} aria-hidden="true" />
      {formatStars(stars)}
    </span>
  );
}
