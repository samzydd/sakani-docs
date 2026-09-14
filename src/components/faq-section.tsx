"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "Is Sakani free?",
    a: "Yes — MIT licensed and free to use in personal or commercial projects, no attribution required.",
  },
  {
    q: "Does it work with Next.js, Vite, or Create React App?",
    a: "Sakani only depends on React 19 as a peer dependency — there's no framework lock-in. This docs site is itself a Next.js app; the same package works identically in Vite or CRA.",
  },
  {
    q: "Can I use it alongside Tailwind CSS?",
    a: "Yes. Components ship their own CSS Modules bound to CSS custom properties, so they don't conflict with Tailwind classes on surrounding elements — this docs site does exactly that, using Tailwind for its own layout while every color comes from Sakani's tokens.",
  },
  {
    q: "How is this different from shadcn/ui?",
    a: "shadcn/ui gives you copy-pasted source built on Radix primitives that you own and edit from day one. Sakani's components are an installable, compiled npm package — you import them like any other library. Blocks are the exception: those are meant to be copied and edited directly, closer to how shadcn/ui blocks work.",
  },
  {
    q: "Can I customize a block's behavior, not just its style?",
    a: "Not through props — blocks intentionally ship a small, fixed set of states (loading, empty, error, etc.) rather than a large configuration API. To go further, copy the block's source file from GitHub into your project and edit it directly.",
  },
  {
    q: "Is there a CLI, like shadcn add?",
    a: "Not yet — today it's a standard npm install. A shadcn-style registry for copying block source directly into a project is on the roadmap.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          Frequently asked questions
        </h2>
      </div>
      <div className="mt-10 divide-y divide-line-subtle border-t border-b border-line-subtle">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="text-sm font-medium text-ink">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={cn("shrink-0 text-ink-subtle transition-transform", isOpen && "rotate-180")}
                />
              </button>
              <div className={cn("faq-panel-wrap", isOpen && "is-open")}>
                <div className="faq-panel">
                  <p className="pb-4 text-sm text-ink-muted">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
