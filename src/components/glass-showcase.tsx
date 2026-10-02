"use client";

import Link from "next/link";
import { ArrowRight, Layers, Aperture, EyeOff } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { MaskReveal } from "@/components/mask-reveal";
import { SurfaceTrio } from "@/components/docs/glass-demos";

const POINTS = [
  {
    icon: Layers,
    title: "A theme layer, not a variant",
    body: "Surface (Solid · Glass · Liquid) sits next to light and dark. One attribute re-themes a whole area; Solid stays pixel-identical.",
  },
  {
    icon: Aperture,
    title: "Real liquid glass",
    body: "The backdrop bends at the edge like a lens, with a faint color fringe, rim light and depth. A frosted fallback covers Safari and Firefox.",
  },
  {
    icon: EyeOff,
    title: "Accessible by design",
    body: "Reduced transparency becomes opaque, reduced motion stops the glide, and the docs list measured contrast for every tint.",
  },
];

/**
 * The home page's glass section. Live, not a screenshot: the same Card over
 * the same photo in each Surface mode. The heading carries the words people
 * actually search for ("glass", "liquid glass", React).
 */
export function GlassShowcase() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <TextReveal
          as="h2"
          lines={["Glass and liquid glass for React,", "built into the design system"]}
          className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        />
        <MaskReveal as="p" delay={180} className="mt-3 max-w-[680px] text-ink-muted">
          Frosted glass (glassmorphism) and Apple-style liquid glass ship as part of Sakani, in the Figma file
          and in code, instead of being bolted on component by component. Swap a surface with one attribute.
        </MaskReveal>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
        <SurfaceTrio />
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
        <Link href="/docs/glass" className="inline-flex items-center gap-1.5 text-ink hover:underline">
          Read the glass guide <ArrowRight size={14} />
        </Link>
        <Link href="/docs/blocks/liquid-glass-dashboard" className="inline-flex items-center gap-1.5 text-ink hover:underline">
          See the liquid glass dashboard <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
