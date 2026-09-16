import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { flatNav } from "@/lib/nav";

export function Pager({ current }: { current: string }) {
  const idx = flatNav.findIndex((i) => i.href === current);
  const prev = idx > 0 ? flatNav[idx - 1] : null;
  const next = idx >= 0 && idx < flatNav.length - 1 ? flatNav[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-12 flex items-center justify-between border-t border-line-subtle pt-6">
      {prev ? (
        <Link href={prev.href} className="group flex items-center gap-2 text-sm text-ink-muted hover:text-ink">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <span>
            <span className="block text-xs text-ink-muted">Previous</span>
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={next.href} className="group flex items-center gap-2 text-right text-sm text-ink-muted hover:text-ink">
          <span>
            <span className="block text-xs text-ink-muted">Next</span>
            {next.title}
          </span>
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
