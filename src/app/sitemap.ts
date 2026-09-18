import type { MetadataRoute } from "next";
import { readdirSync, statSync } from "node:fs";
import path from "node:path";
import { SITE_URL } from "@/lib/site";

/**
 * Enumerated from the route folders rather than from the nav, deliberately.
 *
 * The nav is a curated reading order and doesn't list everything -- a page
 * that exists but hasn't been added to a nav group would simply never be
 * submitted, which is exactly the page most in need of being found. Walking
 * app/ means a new route is in the sitemap the moment it exists, with no
 * second place to remember to update.
 */
function routes(dir: string, base = ""): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    // Route groups, private folders and dynamic segments: none are real URLs.
    if (entry.startsWith("_") || entry.startsWith("(") || entry.startsWith("[")) continue;
    const full = path.join(dir, entry);
    if (!statSync(full).isDirectory()) continue;
    const route = `${base}/${entry}`;
    try {
      statSync(path.join(full, "page.tsx"));
      found.push(route);
    } catch {
      // No page here, but there may be one deeper.
    }
    found.push(...routes(full, route));
  }
  return found;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const appDir = path.join(process.cwd(), "src/app");
  const all = ["", ...routes(appDir)];

  return all.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    // The landing page earns the crawl budget; the docs index outranks the
    // individual component pages, which are numerous and near-identical in
    // importance to each other.
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/docs" ? 0.8 : 0.6,
  }));
}
