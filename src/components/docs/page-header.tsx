export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-8 border-b border-line-subtle pb-6">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <p className="mt-2 max-w-2xl text-ink-muted">{description}</p>
    </div>
  );
}
