import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated rather than a checked-in PNG, so the card can never drift from
 * the copy it quotes.
 *
 * Deliberately plain: no webfont is loaded. next/og would have to fetch and
 * embed one at request time, which is the usual reason these endpoints get
 * slow or fail in production, and a card that fails to render is worse than
 * one set in the system sans. Colours are the brand values written literally
 * -- this runs in an isolated renderer with no access to the site's
 * stylesheet, so the tokens can't be referenced here.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF9",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* The real mark, not a letter in a rounded box. Literal hex:
              this renders in an isolated image pipeline with no access to
              the site's stylesheet, so the tokens can't be referenced. */}
          <svg width="64" height="64" viewBox="0 0 28 28" fill="none">
            <path
              d="M0 8C0 3.58172 3.58172 0 8 0H20C24.4183 0 28 3.58172 28 8V20C28 24.4183 24.4183 28 20 28H8C3.58172 28 0 24.4183 0 20V8Z"
              fill="#FF4700"
            />
            <path
              d="M6.63704 15.9944L20.6362 14.491"
              stroke="#FAFAF9"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M14.208 22.884C12.848 22.884 11.664 22.636 10.656 22.14C9.664 21.644 8.88 20.956 8.304 20.076C7.728 19.196 7.392 18.172 7.296 17.004L9.96 16.836C10.072 17.636 10.304 18.316 10.656 18.876C11.008 19.42 11.48 19.836 12.072 20.124C12.68 20.396 13.408 20.532 14.256 20.532C14.992 20.532 15.616 20.444 16.128 20.268C16.656 20.076 17.056 19.796 17.328 19.428C17.6 19.06 17.736 18.612 17.736 18.084C17.736 17.604 17.616 17.18 17.376 16.812C17.152 16.428 16.712 16.084 16.056 15.78C15.416 15.46 14.472 15.148 13.224 14.844C11.864 14.508 10.776 14.14 9.96 13.74C9.144 13.34 8.552 12.844 8.184 12.252C7.832 11.644 7.656 10.9 7.656 10.02C7.656 9.044 7.888 8.188 8.352 7.452C8.832 6.7 9.512 6.116 10.392 5.7C11.272 5.284 12.328 5.076 13.56 5.076C14.856 5.076 15.96 5.316 16.872 5.796C17.8 6.276 18.528 6.932 19.056 7.764C19.6 8.596 19.936 9.548 20.064 10.62L17.4 10.764C17.32 10.108 17.12 9.532 16.8 9.036C16.48 8.524 16.048 8.132 15.504 7.86C14.96 7.572 14.296 7.428 13.512 7.428C12.52 7.428 11.736 7.66 11.16 8.124C10.6 8.572 10.32 9.172 10.32 9.924C10.32 10.404 10.432 10.812 10.656 11.148C10.896 11.468 11.312 11.748 11.904 11.988C12.512 12.228 13.368 12.484 14.472 12.756C15.944 13.092 17.112 13.508 17.976 14.004C18.856 14.484 19.48 15.052 19.848 15.708C20.216 16.364 20.4 17.108 20.4 17.94C20.4 18.948 20.136 19.828 19.608 20.58C19.096 21.316 18.376 21.884 17.448 22.284C16.52 22.684 15.44 22.884 14.208 22.884Z"
              fill="#FAFAF9"
            />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, color: "#141414" }}>{SITE_NAME}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#141414", lineHeight: 1.1 }}>
            {SITE_TAGLINE}
          </div>
          <div style={{ fontSize: 32, color: "#57534E", lineHeight: 1.35, maxWidth: 900 }}>
            114+ components and 41 blocks, exported 1:1 from Figma.
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["React 19", "TypeScript", "Dark mode", "MIT licensed"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 24,
                color: "#57534E",
                border: "2px solid #E7E5E1",
                borderRadius: 999,
                padding: "10px 22px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
