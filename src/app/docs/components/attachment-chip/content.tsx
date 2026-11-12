"use client";

import { AttachmentChip } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const CODE_0 = `<AttachmentChip type="file" name="Q4 pipeline.pdf" meta="PDF · 2.4 MB" onRemove={remove} />
<AttachmentChip type="image" name="chart.png" meta="PNG · 180 KB" preview={url} />
<AttachmentChip type="uploading" name="renewals.csv" progress={64} />
<AttachmentChip type="error" name="contacts.xlsx" />`;

const PROPS = [
  {"name": "type", "type": "'file' | 'image' | 'uploading' | 'error'", "default": "'file'", "description": "File: an icon tile. Image: a thumbnail. Uploading: an ember ring and progress line. Error: a danger tile, border and text."},
  {"name": "name", "type": "string", "description": "The file name."},
  {"name": "meta", "type": "string", "description": "The second line, \"PDF \u00b7 2.4 MB\". Uploading and error have their own text unless you pass one."},
  {"name": "preview", "type": "string", "description": "Image thumbnail URL (type=\"image\")."},
  {"name": "progress", "type": "number", "description": "0 to 100 (type=\"uploading\")."},
  {"name": "onRemove", "type": "() => void", "description": "Shows the x."},
  {"name": "className", "type": "string", "description": "Extra class on the root."},
];

export default function AttachmentChipPage() {
  return (
    <article>
      <PageHeader title={"Attachment Chip"} description={"A file or image attached to a prompt: a file, an image, an upload in progress, or an error."} />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">It arrives scaling from 0.96 and fading in. <code>progress</code> eases between values. Pass <code>onRemove</code> to show the x.</p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Types</h2>
          <ComponentPreview code={CODE_0}>
            <div className="flex w-full flex-wrap items-center justify-center gap-4">
              <AttachmentChip type="file" name="Q4 pipeline.pdf" meta="PDF · 2.4 MB" onRemove={() => {}} />
              <AttachmentChip type="image" name="chart.png" meta="PNG · 180 KB" />
              <AttachmentChip type="uploading" name="renewals.csv" progress={64} />
              <AttachmentChip type="error" name="contacts.xlsx" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/attachment-chip" />
    </article>
  );
}
