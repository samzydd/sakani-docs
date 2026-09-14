import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-subtle">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="text-sm text-ink-subtle">
          Built by{" "}
          <a href="https://github.com/samzydd" target="_blank" rel="noreferrer" className="text-ink-muted underline underline-offset-2 hover:text-ink">
            Samuel Okpere
          </a>
          . MIT licensed.
        </p>
        <div className="flex items-center gap-5 text-sm text-ink-muted">
          <a href="https://www.npmjs.com/package/@sakaniui/react" target="_blank" rel="noreferrer" className="hover:text-ink">
            npm
          </a>
          <a href="https://github.com/samzydd/Sakani-design-system" target="_blank" rel="noreferrer" className="hover:text-ink">
            GitHub
          </a>
          <Link href="/docs" className="hover:text-ink">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
