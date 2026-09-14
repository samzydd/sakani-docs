"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { docsNav } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-subtle hover:text-ink"
      >
        <Menu size={18} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-canvas">
          <div className="flex h-16 items-center justify-between border-b border-line-subtle px-4">
            <span className="text-[15px] font-semibold text-ink">Sakani</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-subtle hover:text-ink"
            >
              <X size={18} />
            </button>
          </div>
          <nav className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6">
            {docsNav.map((group) => (
              <div key={group.title} className="mb-6">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-subtle">
                  {group.title}
                </p>
                <div className="flex flex-col gap-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm",
                        pathname === item.href
                          ? "bg-subtle font-medium text-ink"
                          : "text-ink-muted"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
