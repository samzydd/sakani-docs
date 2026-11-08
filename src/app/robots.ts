import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Everything is public documentation, so the only thing disallowed is /embed/ (the small live demos the homepage cards frame). The point of
 * this file is the sitemap pointer: without it a crawler discovers pages only
 * by following links, which for 90 pages hanging off a sidebar is slow and
 * incomplete.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/embed/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
