"use client";

import { useState } from "react";
import { FileUpload } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<FileUpload hint="PNG or JPG, up to 5MB" />`;

const ACCEPT = `<FileUpload
  accept="image/png,image/jpeg"
  hint="PNG or JPG only"
/>`;

const MULTIPLE = `<FileUpload
  multiple
  accept=".csv,.tsv"
  hint="Drop as many exports as you like"
/>`;

const HANDLER = `const [files, setFiles] = useState<File[]>([]);

<FileUpload multiple onFilesChange={setFiles} hint="Attachments" />

{files.length > 0 && <p>{files.length} file(s) ready to upload</p>}`;

const PROPS = [
  { name: "accept", type: "string", description: "Accepted types, passed straight to the input's accept attribute." },
  { name: "multiple", type: "boolean", default: "false", description: "Allows selecting more than one file." },
  { name: "hint", type: "string", description: "Hint line under the main label, for size or format limits." },
  { name: "onFilesChange", type: "(files: File[]) => void", description: "Fires whenever the selected list changes, with the full list rather than a diff." },
];

function HandlerDemo() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div className="w-full max-w-md">
      <FileUpload multiple onFilesChange={setFiles} hint="Attachments" />
      <p className="mt-3 text-xs text-ink-muted">
        {files.length === 0
          ? "No files selected yet."
          : `${files.length} file${files.length === 1 ? "" : "s"} ready to upload`}
      </p>
    </div>
  );
}

export default function FileUploadPage() {
  return (
    <article>
      <PageHeader title="File Upload" description="A drop zone with a file picker fallback, reporting the selected files back to you." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <div className="w-full max-w-md">
            <FileUpload hint="PNG or JPG, up to 5MB" />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">It selects, it doesn&apos;t upload</h2>
          <p className="mb-3 text-sm text-ink-muted">
            This component hands you <code>File</code> objects and stops there.
            Sending them, tracking progress, and retrying failures are your
            app&apos;s job. Size and type limits in <code>hint</code> are text,
            not enforcement: validate in <code>onFilesChange</code> too.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Restricting types</h2>
          <ComponentPreview code={ACCEPT}>
            <div className="w-full max-w-md">
              <FileUpload accept="image/png,image/jpeg" hint="PNG or JPG only" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Multiple files</h2>
          <ComponentPreview code={MULTIPLE}>
            <div className="w-full max-w-md">
              <FileUpload multiple accept=".csv,.tsv" hint="Drop as many exports as you like" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Reading the selection</h2>
          <ComponentPreview code={HANDLER}>
            <HandlerDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/file-upload" />
    </article>
  );
}
