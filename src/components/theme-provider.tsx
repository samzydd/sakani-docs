"use client";

import { useState, type ComponentProps } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const STORAGE_KEY = "theme";
/** The only themes this site offers. "system" was retired with enableSystem. */
const VALID_THEMES = new Set(["light", "dark"]);

export function ThemeProvider(props: ComponentProps<typeof NextThemeProvider>) {
  /**
   * Clears a stored theme this site no longer has.
   *
   * Anyone who visited while the default was "system" still has that word in
   * localStorage, and next-themes writes whatever it finds there straight
   * onto <html> -- producing class="system", which matches neither .light nor
   * .dark. It renders light today only because :root happens to hold the
   * light tokens, so the page looks right by accident while the element is
   * in a state no stylesheet describes.
   *
   * Dropping the value lets the provider fall through to defaultTheme.
   * useState's initialiser rather than an effect, so it runs during this
   * component's render -- before the child provider reads storage, rather
   * than a paint later.
   */
  useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null && !VALID_THEMES.has(stored)) {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Private mode or blocked storage: nothing to migrate, and the
      // provider's own fallback handles it.
    }
    return null;
  });

  return <NextThemeProvider {...props} />;
}
