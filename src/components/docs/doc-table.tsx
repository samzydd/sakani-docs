/** A plain reference table in the same skin as PropsTable, for content that isn't props. */
export function DocTable({
  headers,
  rows,
  mono = [0],
}: {
  headers: string[];
  rows: string[][];
  /** Column indexes rendered in monospace. */
  mono?: number[];
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line-subtle">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line-subtle bg-surface text-xs uppercase tracking-wide text-ink-muted">
            {headers.map((h) => (
              <th key={h} className="px-4 py-2.5 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[0] + i} className={i !== rows.length - 1 ? "border-b border-line-subtle" : ""}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    mono.includes(j)
                      ? "whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-ink"
                      : "px-4 py-2.5 text-ink-muted"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
