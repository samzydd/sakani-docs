/**
 * One place for the things metadata, the sitemap, robots and the OG image all
 * need to agree on.
 *
 * The URL has to be real and absolute: canonical tags, og:url and og:image all
 * resolve against it, and pointing them at the wrong host is worse than
 * omitting them -- it tells search engines the canonical copy of every page
 * lives somewhere it doesn't. It reads from NEXT_PUBLIC_SITE_URL so preview
 * and production deployments each describe themselves correctly. Set that in
 * the deployment environment; the fallback below is only so local builds work.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Sakani";

/**
 * Leads with what the thing *is*, because that is what gets typed into a
 * search box: "react design system", "react component library". The Figma
 * parity is the differentiator and goes second, where it persuades rather
 * than competes for the first few words that search results truncate to.
 */
export const SITE_TAGLINE = "React Design System";

export const SITE_DESCRIPTION =
  "An open-source React design system: 114+ accessible components and 41 copy-paste blocks exported 1:1 from Figma. Token-driven theming, dark mode and TypeScript types included. MIT licensed.";

/**
 * Emitted as <meta name="keywords">, which Google has ignored since 2009 and
 * Bing treats as a spam signal when stuffed. Kept short and truthful for the
 * smaller engines that still read it; the terms that actually do the work are
 * in the titles, descriptions and headings, not here.
 */
export const SITE_KEYWORDS = [
  "react design system",
  "react component library",
  "figma to react",
  "react ui kit",
  "tailwind react components",
  "accessible react components",
  "react dashboard blocks",
  "open source design system",
];

export const GITHUB_URL = "https://github.com/samzydd/Sakani-design-system";
