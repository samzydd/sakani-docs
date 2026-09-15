import { ExternalLink } from "lucide-react";

const REPO = "https://github.com/samzydd/Sakani-design-system/blob/main/src/blocks";

/**
 * The "copy this, don't configure it" footer every block page ends with.
 * Blocks are composition examples rather than configurable components, so
 * the source link is the actual call to action -- more useful than a props
 * table for something you're meant to fork and edit.
 */
export function BlockSource({ blocks, path }: { blocks: string[]; path?: (name: string) => string }) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-ink">Copy the source</h2>
      <p className="mb-4 text-sm text-ink-muted">
        Blocks are composition examples, not configurable components. Rather
        than adding props for a layout they don&apos;t support, copy the file
        into your own project and edit it: change the columns, swap the sample
        data, delete the parts you don&apos;t need. Nothing here introduces a
        primitive you can&apos;t already import on its own.
      </p>
      <ul className="flex flex-col gap-2">
        {blocks.map((name) => (
          <li key={name}>
            <a
              href={`${REPO}/${path ? path(name) : name}/${name}.tsx`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[13px] text-ink underline underline-offset-2"
            >
              {name}.tsx <ExternalLink size={13} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
