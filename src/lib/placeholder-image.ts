/**
 * Demo imagery for the doc previews -- the same photography the Figma file
 * and the library's Storybook stories use, served from /public/blocks so
 * the previews match the design instead of showing grey boxes. The library
 * deliberately doesn't bundle these (Vite's lib mode would base64-inline
 * them into the package), so the docs host their own copies.
 */
export const productImage = "/blocks/products/card-mug.jpg";
export const tableRunnerImage = "/blocks/products/card-table-runner.jpg";
export const servingBoardImage = "/blocks/products/card-serving-board.jpg";

/** Figma's Product Gallery repeats the mug photo across all four views. */
export const galleryImages = [
  { src: productImage, alt: "Ceramic Pour-Over Mug" },
  { src: productImage, alt: "Ceramic Pour-Over Mug, angle 2" },
  { src: productImage, alt: "Ceramic Pour-Over Mug, angle 3" },
  { src: productImage, alt: "Ceramic Pour-Over Mug, angle 4" },
];

export const teamImage = "/blocks/marketing/team-card-chidi-duru.jpg";
export const blogImage = "/marketing/blog-image-balloons.jpg";
