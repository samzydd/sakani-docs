import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

/**
 * The machine-readable contract of the installed @sakaniui/react (components, blocks,
 * props, required props, tokens). Served as-is from the package, so the site and the
 * published version cannot disagree.
 */
export function GET() {
  const file = path.join(process.cwd(), "node_modules/@sakaniui/react/dist/manifest.json");
  return new Response(fs.readFileSync(file, "utf8"), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
