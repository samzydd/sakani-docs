import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Reads the token definitions out of the stylesheet at build time rather than
 * restating them in a hand-written list.
 *
 * A tokens reference that is maintained separately from the tokens is a
 * reference that is wrong within a month, and this is the page designers
 * would be trusting in place of the Figma file they can no longer open. So
 * it parses the real `:root` and `.dark` blocks: rename a token or change a
 * hex and this page changes with it, or stops building.
 *
 * Server-only. It touches the filesystem, so it must not be pulled into a
 * client component.
 */

export type TokenKind = "color" | "shadow" | "size" | "font" | "motion" | "other";

export interface Token {
  name: string;
  /** Exactly as authored, so aliases stay visible: `var(--color-neutral-50)`. */
  raw: string;
  /** Alias chain followed to a literal, per theme. */
  light: string;
  dark: string;
  /** Whether `.dark` restates this token at all. */
  themed: boolean;
  /** Trailing `/* … *\/` on the same line, where the file explains itself. */
  note?: string;
  kind: TokenKind;
}

export interface TokenGroup {
  title: string;
  tokens: Token[];
}

const TOKENS_FILE = path.join(process.cwd(), "src/styles/sakani-tokens.css");

/** Body of the first `selector { … }` block, by brace matching. */
function blockBody(css: string, selector: string): string {
  const start = css.indexOf(selector);
  if (start === -1) return "";
  const open = css.indexOf("{", start);
  if (open === -1) return "";
  let depth = 0;
  for (let i = open; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}") {
      depth--;
      if (depth === 0) return css.slice(open + 1, i);
    }
  }
  return "";
}

const DECLARATION = /^\s*(--[\w-]+)\s*:\s*([^;]+);\s*(?:\/\*\s*(.*?)\s*\*\/)?/;
/** `/* ---- spacing ---- *\/` and `/* Typography — … *\/` both open a group. */
const HEADING = /^\s*\/\*\s*-*\s*(.+?)\s*-*\s*(?:\*\/)?$/;

function declarations(body: string): Map<string, string> {
  const out = new Map<string, string>();
  for (const line of body.split("\n")) {
    const m = line.match(DECLARATION);
    if (m) out.set(m[1], m[2].trim());
  }
  return out;
}

/**
 * Follow `var(--x)` to literals. Substitutes every reference in the value
 * rather than only a value that is entirely one var(), because some tokens
 * are composed of several: `--transition-base` is
 * `var(--motion-base) var(--ease-in-out)`, which would otherwise be reported
 * to the reader still containing var().
 *
 * Depth-capped so a cycle in the token graph can't hang the build.
 */
function resolve(value: string, map: Map<string, string>, depth = 0): string {
  if (depth > 12) return value;
  if (!value.includes("var(")) return value;
  const next = value.replace(
    /var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/g,
    (whole, name: string, fallback?: string) => {
      const target = map.get(name);
      if (target !== undefined) return target.trim();
      return fallback?.trim() ?? whole;
    }
  );
  return next === value ? value : resolve(next, map, depth + 1);
}

function classify(name: string, resolved: string): TokenKind {
  if (name.includes("shadow")) return "shadow";
  if (name.includes("font")) return "font";
  if (name.includes("ease") || name.includes("duration") || name.includes("transition")) return "motion";
  if (/^(#|rgb|hsl|oklch)/i.test(resolved)) return "color";
  if (/^-?[\d.]+(px|rem|em|%|ms|s)$/.test(resolved)) return "size";
  return "other";
}

/** Comment text reads as source annotation; these are headings for readers. */
const TITLE_OVERRIDES: Record<string, string> = {
  "core color primitives": "Color primitives",
  "Chart primitives (Figma \"chart/1\"..\"chart/6\")": "Chart primitives",
  "Code syntax-highlight primitives (Figma \"Code Snippet\")": "Code syntax",
  "semantic (light)": "Semantic colors",
  "chart tokens": "Semantic colors",
  "border width": "Border width",
  spacing: "Spacing",
  radius: "Radius",
  opacity: "Opacity",
  shadows: "Shadows",
  motion: "Motion",
};

/**
 * The semantic colour layer is one long run in the stylesheet with a chart
 * aside in the middle of it, so comments alone group it badly: everything
 * after that aside (accent, brand, every status colour) was landing under a
 * heading called "chart tokens". Roles are what a reader is actually looking
 * for here, and the names already encode them.
 */
const ROLES: [RegExp, string][] = [
  [/^--color-bg-/, "Semantic · Background"],
  [/^--color-fg-/, "Semantic · Text"],
  [/^--color-border-/, "Semantic · Border"],
  [/^--color-accent-/, "Semantic · Accent"],
  [/^--color-brand-/, "Semantic · Brand"],
  [/^--color-(success|warning|danger|info)-/, "Semantic · Status"],
  [/^--color-chart-/, "Semantic · Chart"],
];

function regroupSemantic(groups: TokenGroup[]): TokenGroup[] {
  const out: TokenGroup[] = [];
  const roleBuckets = new Map<string, Token[]>();

  for (const group of groups) {
    if (group.title !== "Semantic colors") {
      out.push(group);
      continue;
    }
    for (const token of group.tokens) {
      const role = ROLES.find(([re]) => re.test(token.name))?.[1] ?? "Semantic · Other";
      const bucket = roleBuckets.get(role) ?? [];
      bucket.push(token);
      roleBuckets.set(role, bucket);
    }
  }

  // Slot the role groups where the semantic block first appeared, so the page
  // still reads primitives -> semantics -> spacing/radius/motion.
  const at = groups.findIndex((g) => g.title === "Semantic colors");
  const roleGroups = [...roleBuckets.entries()].map(([title, tokens]) => ({ title, tokens }));
  const insertAt = at === -1 ? out.length : out.findIndex((g) => g.title === groups[at + 1]?.title);
  out.splice(insertAt === -1 ? out.length : insertAt, 0, ...roleGroups);
  return out;
}

let cached: TokenGroup[] | null = null;

export function getTokenGroups(): TokenGroup[] {
  if (cached) return cached;

  const css = readFileSync(TOKENS_FILE, "utf8");
  const rootBody = blockBody(css, ":root");
  const darkBody = blockBody(css, ".dark");

  const lightMap = declarations(rootBody);
  // Dark restates only the semantic layer, so it has to fall back to :root
  // for every primitive an alias eventually lands on.
  const darkMap = new Map(lightMap);
  for (const [k, v] of declarations(darkBody)) darkMap.set(k, v);
  const darkOverrides = declarations(darkBody);

  const groups: TokenGroup[] = [];
  let current: TokenGroup | null = null;

  for (const line of rootBody.split("\n")) {
    const decl = line.match(DECLARATION);
    if (decl) {
      const [, name, raw, note] = decl;
      const light = resolve(raw.trim(), lightMap);
      if (!current) {
        current = { title: "Base", tokens: [] };
        groups.push(current);
      }
      // Start from the .dark declaration when there is one. Resolving the
      // :root value against the dark map gives the wrong answer, because
      // .dark redefines the semantic token itself rather than the primitive
      // underneath it -- every themed token came out identical to its light
      // value that way.
      const darkRaw = darkOverrides.get(name)?.trim() ?? raw.trim();
      current.tokens.push({
        name,
        raw: raw.trim(),
        light,
        dark: resolve(darkRaw, darkMap),
        themed: darkOverrides.has(name),
        note: note || undefined,
        kind: classify(name, light),
      });
      continue;
    }
    // Only a comment that opens a line starts a group; trailing notes on a
    // declaration are handled above and must not split the list.
    const heading = line.match(HEADING);
    if (heading && line.trim().startsWith("/*")) {
      const raw = heading[1].split("—")[0].split("--")[0].trim();
      const title = TITLE_OVERRIDES[raw] ?? TITLE_OVERRIDES[heading[1].trim()] ?? raw;
      if (title && title.length < 60) {
        // Consecutive headings that map to the same group (the chart aside
        // inside the semantic run) continue it rather than starting a second.
        if (current?.title !== title) {
          current = { title, tokens: [] };
          groups.push(current);
        }
      }
    }
  }

  cached = regroupSemantic(groups.filter((g) => g.tokens.length > 0));
  return cached;
}
