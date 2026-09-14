/**
 * Neutral inline placeholders for the e-commerce doc previews, which need
 * an image src but have no product photography to point at. Inline SVG
 * rather than a file so the previews never depend on a network fetch or
 * a binary the repo would otherwise carry for no reason.
 */
const svg = (label: string, bg: string, fg: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="${bg}"/><text x="50%" y="50%" fill="${fg}" font-family="system-ui,sans-serif" font-size="22" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`
  )}`;

export const productImage = svg("Product", "#e7e5e4", "#78716c");

export const galleryImages = [
  { src: svg("View 1", "#e7e5e4", "#78716c"), alt: "Front view" },
  { src: svg("View 2", "#d6d3d1", "#57534e"), alt: "Side view" },
  { src: svg("View 3", "#e7e5e4", "#78716c"), alt: "Detail" },
  { src: svg("View 4", "#d6d3d1", "#57534e"), alt: "In use" },
];
