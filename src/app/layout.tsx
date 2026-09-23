import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  GITHUB_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  // Everything relative below (canonicals, og:image) resolves against this.
  // Without it Next emits relative og:image URLs, which crawlers and social
  // scrapers refuse to fetch, so the cards silently never render.
  metadataBase: new URL(SITE_URL),
  title: {
    // "React Design System" is in both, because the title is the single
    // strongest on-page signal and every page inherits the template.
    default: `${SITE_NAME} — ${SITE_TAGLINE} with 114 Components & 41 Blocks`,
    template: `%s · ${SITE_NAME} ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Samuel Okpere", url: GITHUB_URL }],
  creator: "Samuel Okpere",
  applicationName: SITE_NAME,
  // "./", not "/". Metadata is inherited, and an absolute "/" is inherited
  // *literally* -- every one of the 90 pages would have declared the homepage
  // as its canonical, telling search engines the entire documentation is
  // duplicate content and asking for all of it to be dropped. A relative
  // "./" is resolved per-route against metadataBase, so each page is
  // canonical to itself, which is what protects against the ?query variants
  // docs sites accumulate.
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    // Relative for the same reason as the canonical above: inherited
    // literally, "/" would make every shared docs link resolve to the
    // homepage in the preview card.
    url: "./",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

/**
 * Structured data. Search engines read this to understand what the site *is*
 * rather than inferring it from prose, which is what earns the richer result
 * (name, licence, category) instead of a plain blue link.
 *
 * SoftwareApplication rather than Product: this is a library people install,
 * it has no price, and Product without an offer is a common cause of Search
 * Console warnings. Site-level, so it sits in the layout and applies to every
 * page, which is the normal placement for WebSite/Application schema.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: `${SITE_NAME} ${SITE_TAGLINE}`,
      description: SITE_DESCRIPTION,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      url: SITE_URL,
      codeRepository: GITHUB_URL,
      programmingLanguage: "TypeScript",
      license: "https://opensource.org/licenses/MIT",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          // JSON.stringify of a literal defined in this file -- no user or
          // remote input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
        />
        {/* Dark by default, and deliberately not following the OS.
            enableSystem is off rather than just overridden: the toggle only
            ever sets "light" or "dark", never "system", so leaving it on
            would keep a third state alive that nothing can return the visitor
            to once they've switched. A first visit now lands on dark
            whatever the OS prefers; an explicit choice is still remembered. */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <div aria-hidden className="noise-overlay" />
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
