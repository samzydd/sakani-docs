export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line-subtle">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line-subtle bg-surface text-xs uppercase tracking-wide text-ink-subtle">
            <th className="px-4 py-2.5 font-medium">Prop</th>
            <th className="px-4 py-2.5 font-medium">Type</th>
            <th className="px-4 py-2.5 font-medium">Default</th>
            <th className="px-4 py-2.5 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.name} className={i !== rows.length - 1 ? "border-b border-line-subtle" : ""}>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-ink">{row.name}</td>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-ink-muted">{row.type}</td>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[13px] text-ink-subtle">
                {row.default ?? ""}
              </td>
              <td className="px-4 py-2.5 text-ink-muted">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
