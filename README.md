# Sakani Docs

Documentation site for the [Sakani Design System](https://github.com/samzydd/Sakani-design-system) — Next.js 16 (App Router) + Tailwind v4, styled entirely from Sakani's own `tokens.css`, with live, interactive previews of real `@sakaniui/react` components and blocks.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS v4** — used only for layout utilities; every color/radius/shadow value is mapped in `src/app/globals.css` to Sakani's real CSS variables, not Tailwind's defaults
- **Shiki** — client-side syntax highlighting (see `src/lib/use-highlighted-code.ts`)
- **next-themes** — light/dark toggle, wired to Sakani's `.dark` class convention

## Known temporary workaround

`src/styles/sakani-tokens.css` is a **vendored copy** of Sakani's `tokens.css`, checked in temporarily because `@sakaniui/react@0.3.1`'s published `./tokens.css` export currently points at a path (`src/styles/tokens.css`) that was never actually included in the npm tarball — a real bug, already fixed in the source repo (bumped to `0.3.2`) but not yet published.

**Once `@sakaniui/react@0.3.2` (or later) is published:**

1. Delete `src/styles/sakani-tokens.css` and `src/styles/README-TEMP.txt`.
2. In `src/app/globals.css`, replace:
   ```css
   @import "../styles/sakani-tokens.css";
   ```
   with:
   ```css
   @import "@sakaniui/react/tokens.css";
   ```
3. `npm install @sakaniui/react@latest` to pick up the fix.

## Why every Sakani-importing page is `"use client"`

`@sakaniui/react` was built for client-rendered apps (Vite, CRA) and calls `React.createContext` at module scope without a `"use client"` boundary of its own. That makes its whole module graph unsafe to import into a Next.js **Server** Component — doing so throws at module-evaluation time, not render time. Every doc page that renders a live Sakani component or block is therefore a Client Component (split into a server `page.tsx` for `metadata` + a client `content.tsx` for the actual UI, since `metadata` exports aren't allowed in Client Components).

## Development

```bash
npm install
npm run dev
```

## Adding a new doc page

1. Add the route under `src/app/docs/components/<name>/` or `src/app/docs/blocks/<name>/`, following the existing `page.tsx` (server, metadata only) + `content.tsx` (`"use client"`, actual UI) split.
2. Register it in `src/lib/nav.ts` so it shows up in the sidebar, command menu, and prev/next pager.
3. Wrap each live example in `<ComponentPreview code={...}>...</ComponentPreview>` (see `src/components/docs/component-preview.tsx`) for the Preview/Code tabs.
