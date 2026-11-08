"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides the site header and footer on /embed/* pages: those are small live demos shown inside a card on the homepage. */
export function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return pathname?.startsWith("/embed") ? null : <>{children}</>;
}
