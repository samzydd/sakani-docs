/**
 * One place for the things metadata, the sitemap, robots and the OG image all
 * need to agree on.
 *
 * The URL has to be real and absolute: canonical tags, og:url and og:image all
 * resolve against it, and pointing them at the wrong host is worse than
 * omitting them -- it tells search engines the canonical copy of every page
 * lives somewhere it doesn't. NEXT_PUBLIC_SITE_URL wins when set; otherwise
 * Vercel's own build env decides. Production used to fall through to
 * localhost because that variable was never set there, which put
 * http://localhost:3000 in the live canonical tags, og:url/og:image, the
 * sitemap and robots.txt -- so production now defaults to the real domain
 * (www: the apex 308-redirects to it), previews describe their own URL, and
 * only a local build uses localhost.
 */
const PRODUCTION_URL = "https://www.sakaniui.com";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "production"
    ? PRODUCTION_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Sakani";

/**
 * Leads with what the thing *is*, because that is what gets typed into a
 * search box: "react design system", "react component library". The two
 * differentiators come next: built-in glass and liquid glass (the thing few
 * design systems ship as a theme layer), then the Figma parity.
 */
export const SITE_TAGLINE = "React Design System";

export const SITE_DESCRIPTION =
  "Open-source React design system with built-in glass and Apple-style liquid glass. 114+ accessible components, 42 blocks, dark mode and TypeScript, exported 1:1 from Figma.";

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
  "glassmorphism react",
  "liquid glass react",
  "apple liquid glass css",
  "react glass components",
  "frosted glass ui",
  "glass effect design system",
];

export const GITHUB_URL = "https://github.com/samzydd/Sakani-design-system";
