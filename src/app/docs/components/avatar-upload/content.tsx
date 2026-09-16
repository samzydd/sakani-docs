"use client";

import { useState } from "react";
import { AvatarUpload } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<AvatarUpload title="Profile photo" hint="PNG or JPG, at least 200×200" />`;

const HORIZONTAL = `<AvatarUpload
  orientation="horizontal"
  src={user.avatarUrl}
  title="Profile photo"
  hint="PNG or JPG"
  onRemove={removeAvatar}
/>`;

const HANDLER = `const [file, setFile] = useState<File>();

// It shows a local preview immediately; uploading is still your job.
<AvatarUpload onFileSelect={setFile} accept="image/png,image/jpeg" />

{file && <p>{file.name} ready to upload</p>}`;

const PROPS = [
  { name: "src", type: "string", description: "Current photo URL. Whether the control reads as filled or empty is derived from this." },
  { name: "alt", type: "string", description: "Alt text for that image." },
  { name: "orientation", type: "'vertical' | 'horizontal'", default: "'vertical'", description: "Horizontal puts the avatar beside the copy and adds a Remove button." },
  { name: "accept", type: "string", description: "Passed to the hidden file input." },
  { name: "title", type: "string", description: "Label above the drop target." },
  { name: "hint", type: "string", description: "Size or format guidance underneath." },
  { name: "onFileSelect", type: "(file: File) => void", description: "Fires with the chosen file. The component never uploads it." },
  { name: "onRemove", type: "() => void", description: "Horizontal Remove handler, for the real deletion. The local preview clears either way." },
];

function HandlerDemo() {
  const [file, setFile] = useState<File>();
  return (
    <div className="flex flex-col items-center gap-3">
      <AvatarUpload onFileSelect={setFile} accept="image/png,image/jpeg" title="Profile photo" />
      <p className="text-xs text-ink-muted">
        {file ? `${file.name} ready to upload` : "No file chosen yet."}
      </p>
    </div>
  );
}

export default function AvatarUploadPage() {
  return (
    <article>
      <PageHeader title="Avatar Upload" description="A profile-photo picker with a local preview. It selects and previews; uploading stays yours." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <AvatarUpload title="Profile photo" hint="PNG or JPG, at least 200×200" />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Preview now, upload later</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Picking a file swaps in a local preview immediately, so the UI feels
            instant — but nothing has been sent anywhere. Do the upload in{" "}
            <code>onFileSelect</code>, and treat the preview as optimistic until
            it succeeds.
          </p>
          <ComponentPreview code={HANDLER}>
            <HandlerDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Horizontal</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The horizontal layout suits a settings row and adds a Remove button.
            Note that the local preview clears whether or not you pass{" "}
            <code>onRemove</code> — use the handler for the server-side
            deletion.
          </p>
          <ComponentPreview code={HORIZONTAL}>
            <div className="w-full max-w-md">
              <AvatarUpload
                orientation="horizontal"
                title="Profile photo"
                hint="PNG or JPG"
                onRemove={() => {}}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/avatar-upload" />
    </article>
  );
}
