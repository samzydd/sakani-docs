"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-20 hidden h-[calc(100vh-6rem)] w-56 shrink-0 overflow-y-auto pb-10 lg:block">
      {docsNav.map((group) => (
        <div key={group.title} className="mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-subtle">
            {group.title}
          </p>
          <div className="flex flex-col gap-0.5 border-l border-line-subtle">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "-ml-px flex items-center justify-between border-l px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "border-ink font-medium text-ink"
                      : "border-transparent text-ink-muted hover:border-line-strong hover:text-ink"
                  )}
                >
                  {item.title}
                  {item.label && (
                    <span className="rounded-full bg-accent-subtle px-1.5 py-0.5 text-[10px] font-medium text-ink">
                      {item.label}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
