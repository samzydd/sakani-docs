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
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "#FF4700",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            S
          </div>
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
