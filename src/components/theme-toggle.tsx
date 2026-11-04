"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { IconMoon as Moon, IconSun as Sun } from "@sakaniui/react/icons";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Standard next-themes hydration guard: resolvedTheme is unknown on the
    // server, so the icon can't render correctly until after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  /**
   * Switches the theme with a quick cross-fade of the whole page (a blink) instead of a hard snap. The browser
   * photographs the page, we change the theme underneath, and it blends the old picture into the new one. The
   * theme change has to land inside the callback, so it is flushed synchronously. Browsers without View
   * Transitions, and people who asked for reduced motion, get the plain instant switch.
   */
  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduced) {
      setTheme(next);
      return;
    }
    doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
  };

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-line-subtle text-ink-muted transition-colors hover:bg-subtle hover:text-ink"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun size={16} strokeWidth={1.75} />
      ) : (
        <Moon size={16} strokeWidth={1.75} />
      )}
    </button>
  );
}
