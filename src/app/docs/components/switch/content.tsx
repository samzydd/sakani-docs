"use client";

import { useState } from "react";
import { Switch } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const BASIC = `<Switch label="Dark mode" defaultChecked />`;

const STATES = `<Switch label="Off" />
<Switch label="On" defaultChecked />
<Switch label="Disabled" disabled />
<Switch label="Disabled, on" disabled defaultChecked />`;

const BARE = `// No label: pair with your own text and pass an aria-label.
<Switch aria-label="Enable notifications" defaultChecked />`;

const CONTROLLED = `const [on, setOn] = useState(true);

<Switch
  label="Automatic backups"
  checked={on}
  onChange={(e) => setOn(e.target.checked)}
/>`;

const PROPS = [
  { name: "label", type: "string", description: "Optional text rendered to the right of the switch." },
  { name: "checked", type: "boolean", description: "Controlled on/off state." },
  { name: "defaultChecked", type: "boolean", description: "Uncontrolled initial state." },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input." },
  { name: "onChange", type: "(e: ChangeEvent<HTMLInputElement>) => void", description: "Fires on toggle." },
];

function ControlledDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex flex-col items-start gap-2">
      <Switch
        label="Automatic backups"
        checked={on}
        onChange={(e) => setOn(e.target.checked)}
      />
      <p className="text-xs text-ink-subtle">{on ? "Backing up nightly" : "Backups paused"}</p>
    </div>
  );
}

export default function SwitchPage() {
  return (
    <article>
      <PageHeader title="Switch" description="An immediate on/off toggle. Use it for settings that apply the moment they change." />

      <div className="space-y-10">
        <ComponentPreview code={BASIC}>
          <Switch label="Dark mode" defaultChecked />
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Switch or checkbox?</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A switch takes effect immediately; a{" "}
            <a href="/docs/components/checkbox" className="font-medium text-ink underline underline-offset-2">Checkbox</a>{" "}
            stages a change that a submit button commits. If your switch needs a
            Save button next to it, it should have been a checkbox.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">States</h2>
          <ComponentPreview code={STATES}>
            <div className="flex flex-col gap-3">
              <Switch label="Off" />
              <Switch label="On" defaultChecked />
              <Switch label="Disabled" disabled />
              <Switch label="Disabled, on" disabled defaultChecked />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Without a label</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Inside a settings row that already has its own text, drop the label
            and pass an <code>aria-label</code> so the control is still named
            for screen readers.
          </p>
          <ComponentPreview code={BARE}>
            <div className="flex w-full max-w-sm items-center justify-between rounded-lg border border-line-subtle bg-surface px-4 py-3">
              <span className="text-sm font-medium text-ink">Notifications</span>
              <Switch aria-label="Enable notifications" defaultChecked />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Controlled</h2>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Every other native input attribute is forwarded to the underlying{" "}
            <code>&lt;input type=&quot;checkbox&quot;&gt;</code>.
          </p>
          <PropsTable rows={PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/switch" />
    </article>
  );
}
