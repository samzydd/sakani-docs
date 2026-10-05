import fs from "node:fs";
import path from "node:path";
import { docsNav } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";
import { reasoning } from "@/lib/reasoning";

/**
 * Builds the agent-facing text for /llms.txt and /llms-full.txt.
 *
 * Nothing here is hand-copied: page titles and descriptions are read from each
 * route's own `metadata` export, and the reasoning layer is the AGENTS.md that
 * ships inside @sakaniui/react, so the website, the package and the agent
 * index cannot drift apart.
 */

const APP_DIR = path.join(process.cwd(), "src/app");

function pageMeta(href: string): { title: string; description: string } {
  const file = path.join(APP_DIR, href, "page.tsx");
  try {
    const src = fs.readFileSync(file, "utf8");
    const title = /title:\s*"([^"]+)"/.exec(src)?.[1] ?? "";
    const description = /description:\s*\n?\s*"((?:[^"\\]|\\.)*)"/.exec(src)?.[1] ?? "";
    return { title, description };
  } catch {
    return { title: "", description: "" };
  }
}

export function agentsGuide(): string {
  try {
    return fs.readFileSync(
      path.join(process.cwd(), "node_modules/@sakaniui/react/AGENTS.md"),
      "utf8",
    );
  } catch {
    return "(AGENTS.md ships with @sakaniui/react 0.4.8 and later.)";
  }
}

const HEAD = `# Sakani UI

> Sakani UI (\`@sakaniui/react\`) is an open-source, token-driven React design system with Figma parity and a Liquid Glass surface layer. Components are accessible, themed with CSS variables, and re-theme for dark mode and glass surfaces without per-component code.

Install: \`npm install @sakaniui/react\`, then import \`@sakaniui/react/tokens.css\` and \`@sakaniui/react/style.css\` once. Read the agent guide first: it explains why components behave as they do and what to do when nothing fits.`;

export function llmsIndex(): string {
  const lines = [HEAD, "", `- [Agent guide — the why behind the system](${SITE_URL}/llms-full.txt): principles, per-component use/don't, glass rules, recipes for AI-product moments`];
  for (const group of docsNav) {
    lines.push("", `## ${group.title}`);
    for (const item of group.items) {
      const { description } = pageMeta(item.href);
      lines.push(`- [${item.title}](${SITE_URL}${item.href})${description ? `: ${description}` : ""}`);
    }
  }
  return lines.join("\n") + "\n";
}

export function llmsFull(): string {
  const parts = [HEAD, "", "---", "", agentsGuide(), "", "---", "", "# Page index", ""];
  for (const group of docsNav) {
    parts.push(`## ${group.title}`);
    for (const item of group.items) {
      const { description } = pageMeta(item.href);
      parts.push(`- ${item.title} — ${SITE_URL}${item.href}${description ? `\n  ${description}` : ""}`);
    }
    parts.push("");
  }
  parts.push("---", "", "# Per-component reasoning (why it works this way, and when not to use it)", "");
  for (const group of docsNav) {
    for (const item of group.items) {
      const r = reasoning[item.href.split("/").pop() ?? ""];
      if (!r) continue;
      parts.push(`## ${item.title}`, ...r.why.map((t) => `- Why: ${t}`), ...r.dont.map((t) => `- Don't: ${t}`), "");
    }
  }
  return parts.join("\n");
}
