"use client";

import Link from "next/link";
import {
  IconArrowRight as ArrowRight,
  IconFileCode as FileCode,
  IconPlugConnected as Plug,
  IconBook2 as Book,
} from "@sakaniui/react/icons";
import { CodeBlock } from "@/components/code-block";
import { TextReveal } from "@/components/text-reveal";
import { MaskReveal } from "@/components/mask-reveal";

const POINTS = [
  {
    icon: FileCode,
    title: "A contract, not a guess",
    body: "manifest.json lists all 123 components and 42 blocks with props, allowed values, defaults and required props, plus every token. Generated from the source on each build.",
  },
  {
    icon: Plug,
    title: "An MCP server that checks the work",
    body: "Search components and icons, start from a type-checked example, and check every snippet with check_code before it ships. It runs locally with no dependencies.",
  },
  {
    icon: Book,
    title: "The reasoning behind it",
    body: "AGENTS.md says why each piece behaves as it does, when not to use it, and what to do when nothing fits. Served at /llms-full.txt.",
  },
];

const MCP_CONFIG = `{
  "mcpServers": {
    "sakaniui": {
      "command": "npx",
      "args": [
        "-y", "-p", "@sakaniui/react",
        "sakaniui-mcp"
      ]
    }
  }
}`;

const CHECK_USAGE = `// the assistant calls check_usage before it ships
check_usage("IconButton", { variant: "danger" })

// result (abridged)
ok: false
  Missing required prop "icon".
  Missing required prop "aria-label".
  "variant" = "danger" is not allowed.
  Use one of: destructive, primary, secondary,
  outline, ghost.`;

/**
 * The home page's AI section. It says what a design system for AI actually has to provide
 * (a contract, a way to query it, and the reasoning) and shows the real config and a real
 * check_usage result rather than a diagram.
 */
export function AiShowcase() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <TextReveal
          as="h2"
          lines={["Built for AI to use correctly,", "not just quickly"]}
          className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        />
        <MaskReveal as="p" delay={180} className="mt-3 max-w-[680px] text-ink-muted">
          Sakani ships a machine-readable contract and an MCP server, so Claude Code, Cursor and other assistants
          look components up instead of inventing props, and get told when something is wrong.
        </MaskReveal>
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-[5fr_6fr] lg:px-8">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">Add it to your editor</p>
          <CodeBlock code={MCP_CONFIG} lang="json" />
          <p className="mt-2 text-xs text-ink-muted">
            Claude Code: <code>claude mcp add sakaniui -- npx -y -p @sakaniui/react sakaniui-mcp</code>
          </p>
        </div>
        <div className="min-w-0">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-muted">What it catches</p>
          <CodeBlock code={CHECK_USAGE} lang="ts" />
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        {POINTS.map((p) => (
          <div key={p.title} className="rounded-xl border border-line-subtle bg-surface p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-subtle text-ink">
              <p.icon size={18} strokeWidth={1.75} />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-ink">{p.title}</h3>
            <p className="mt-1.5 text-sm text-ink-muted">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 text-sm font-medium sm:px-6 lg:px-8">
        <Link href="/docs/ai" className="inline-flex items-center gap-1.5 text-ink hover:underline">
          Set up the MCP server <ArrowRight size={14} />
        </Link>
        <a href="/manifest.json" className="inline-flex items-center gap-1.5 text-ink hover:underline">
          View manifest.json <ArrowRight size={14} />
        </a>
        <a href="/llms.txt" className="inline-flex items-center gap-1.5 text-ink hover:underline">
          llms.txt <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
}
