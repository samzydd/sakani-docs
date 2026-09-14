import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { CommandMenu } from "./command-menu";
import { MobileNav } from "./mobile-nav";
import { GithubIcon } from "./icons/github-icon";

const NAV_LINKS = [
  { title: "Docs", href: "/docs" },
  { title: "Components", href: "/docs/components/button" },
  { title: "Blocks", href: "/docs/blocks/pricing-table" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-subtle bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <MobileNav />

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-sm font-bold text-white">
            S
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-ink">Sakani</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-1.5 text-sm text-ink-muted transition-colors hover:bg-subtle hover:text-ink"
            >
              {l.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:block">
            <CommandMenu />
          </div>
          <a
            href="https://github.com/samzydd/Sakani-design-system"
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line-subtle text-ink-muted transition-colors hover:bg-subtle hover:text-ink"
            aria-label="GitHub repository"
          >
            <GithubIcon size={16} />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
