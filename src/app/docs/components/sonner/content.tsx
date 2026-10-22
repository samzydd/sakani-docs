"use client";

import { useEffect, useState } from "react";
import { Button, Toaster, toast, type ToastPosition } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DocTable } from "@/components/docs/doc-table";
import { Pager } from "@/components/docs/pager";

const SETUP = `import { Toaster, toast } from '@sakaniui/react';

// 1. Mount one Toaster near the root of your app
export const App = () => (
  <>
    <Routes />
    <Toaster />
  </>
);

// 2. Call toast() from anywhere: handlers, hooks, plain modules
toast('Event has been created');`;

const BASIC = `<Button onClick={() => toast('Event has been created', {
  description: 'Monday, January 3rd at 6:00pm',
})}>
  Show toast
</Button>`;

const TYPES = `toast('Event has been created')
toast.success('Event has been created')
toast.info('Be at the area 10 minutes before the event time')
toast.warning('Event start time cannot be earlier than 8am')
toast.error('Event has not been created')
toast.loading('Uploading file…')`;

const BUTTONS = `// An action runs your handler, then the toast closes (call event.preventDefault() to keep it open)
toast('Event has been created', {
  action: { label: 'Undo', onClick: () => undo() },
})

// Cancel sits left of the action
toast.info('Delete 3 files?', {
  cancel: { label: 'Cancel' },
  action: { label: 'Confirm', onClick: () => remove() },
})

// A close button on one toast, or closeButton on the Toaster for all of them
toast('Event has been created', { closeButton: true })`;

const PROMISE = `toast.promise(saveInvoice(), {
  loading: 'Saving invoice…',
  success: (invoice) => \`Invoice \${invoice.number} saved\`,
  error: 'Could not save the invoice',
})`;

const UPDATE = `// Every toast() call returns an id. Reuse it to update that toast in place.
const id = toast.loading('Uploading…')

upload().then(
  () => toast.success('Uploaded', { id }),
  () => toast.error('Upload failed', { id }),
)

toast.dismiss(id)   // close one
toast.dismiss()     // close all`;

const POSITION = `<Toaster position="top-center" />
// 'top-left' | 'top-center' | 'top-right'
// 'bottom-left' | 'bottom-center' | 'bottom-right'`;

const RICH = `<Toaster richColors />

// or per toast
toast.success('Saved', { richColors: true })`;

const TOASTER_PROPS = [
  { name: "position", type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: "'bottom-right'", description: "Where the stack sits. Top positions stack downwards, bottom positions upwards." },
  { name: "richColors", type: "boolean", default: "false", description: "Tints success, info, warning and error toasts by type." },
  { name: "closeButton", type: "boolean", default: "false", description: "Shows the round close button on every toast." },
  { name: "expand", type: "boolean", default: "false", description: "Keeps the stack spread out instead of piled up." },
  { name: "visibleToasts", type: "number", default: "3", description: "How many toasts show at once. Older ones fade out." },
  { name: "duration", type: "number", default: "4000", description: "Milliseconds before a toast closes itself. Infinity keeps it open." },
  { name: "gap", type: "number", default: "14", description: "Space between toasts when spread out, in px." },
  { name: "offset", type: "number | string", default: "24", description: "Distance from the viewport edge. Numbers are px; strings are any CSS length." },
  { name: "mobileOffset", type: "number | string", default: "16", description: "Distance from the edge on screens 600px wide or less, where toasts fill the width." },
  { name: "hotkey", type: "string[]", default: "['altKey', 'KeyT']", description: "Keys that focus the stack (alt+T)." },
  { name: "containerAriaLabel", type: "string", default: "'Notifications'", description: "Accessible name of the notifications region." },
];

const OPTIONS = [
  { name: "id", type: "string | number", description: "Reuse an id to update a toast in place instead of adding a new one." },
  { name: "description", type: "ReactNode", description: "Secondary line under the title." },
  { name: "icon", type: "ReactNode | null", description: "Replaces the type icon. null shows no icon." },
  { name: "action", type: "{ label, onClick }", description: "Primary button, right-most. Closes the toast after onClick unless you call event.preventDefault()." },
  { name: "cancel", type: "{ label, onClick? }", description: "Secondary button, left of the action. Closes the toast." },
  { name: "closeButton", type: "boolean", description: "Shows the round close button on this toast." },
  { name: "duration", type: "number", default: "4000", description: "Overrides the Toaster's duration. Loading toasts have no timer." },
  { name: "dismissible", type: "boolean", default: "true", description: "When false the toast cannot be swiped away or closed by the user." },
  { name: "important", type: "boolean", default: "false", description: "Announces the toast assertively. Errors always are." },
  { name: "richColors", type: "boolean", description: "Tints this toast by its type." },
  { name: "onDismiss", type: "(toast) => void", description: "Called when the user closes it (close button, cancel, swipe) or toast.dismiss() is called." },
  { name: "onAutoClose", type: "(toast) => void", description: "Called when the toast closes itself after its duration." },
  { name: "className", type: "string", description: "Extra class on the toast element." },
];

const API = [
  ["toast(title, options?)", "Default toast, no icon. Returns the toast id."],
  ["toast.success / info / warning / error", "Same signature, with the type's icon (tinted when richColors is on)."],
  ["toast.loading(title, options?)", "A toast with a spinner and no timer. Update or dismiss it by id."],
  ["toast.promise(promise, messages)", "Shows messages.loading, then success or error from the same toast. success and error can be functions of the result."],
  ["toast.dismiss(id?)", "Closes one toast, or all of them without an id."],
];

const MOTION = [
  ["A toast arrives", "Rises in from below its own height while fading in. 400ms."],
  ["More toasts arrive", "Older toasts lift 14px and shrink 5% per level, with their content hidden so only an edge shows. Three are visible."],
  ["Hover or focus", "The pile spreads into a list, 14px between toasts, each at its own height. Timers pause."],
  ["Pointer leaves", "The list folds back into the pile and the timers resume."],
  ["Swipe", "The toast follows the pointer. Release under 45px and it springs back; past 45px, or a quick flick, it flies out in 200ms. The direction follows the position."],
  ["Lifetime", "4 seconds by default. Loading toasts stay until you update them."],
];

const POSITIONS: ToastPosition[] = ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"];

const longer = { description: "Monday, January 3rd at 6:00pm" };

export default function SonnerPage() {
  const [position, setPosition] = useState<ToastPosition>("bottom-right");
  const [rich, setRich] = useState(false);
  // the toast store outlives this page, so don't leave demo toasts waiting for the next visit
  useEffect(() => () => { toast.dismiss(); }, []);

  return (
    <article>
      <PageHeader
        title="Sonner"
        description="A managed toast stack. Mount one Toaster, call toast() from anywhere. Toasts pile up, spread on hover and swipe away."
      />

      {/* One Toaster serves every demo on this page. */}
      <Toaster position={position} richColors={rich} />

      <div className="space-y-10">
        <section>
          <p className="mb-3 text-sm text-ink-muted">
            Use <code>Toaster</code> and <code>toast()</code> when you want toasts triggered from code and managed for you:
            the queue, position, timer, stacking and swipe-to-dismiss. For a single static card you place yourself, use{" "}
            <a href="/docs/components/toast" className="font-medium text-ink underline underline-offset-2">Toast</a>.
          </p>
          <ComponentPreview code={SETUP}>
            <Button size="sm" variant="secondary" onClick={() => toast("Event has been created", longer)}>
              Show toast
            </Button>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Stacking</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Add a few. They pile up with the newest in front; hover the pile to spread it out, then drag the front toast
            down and let go.
          </p>
          <ComponentPreview code={BASIC}>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => toast("Event has been created", longer)}>Add a toast</Button>
              <Button size="sm" variant="ghost" onClick={() => toast.dismiss()}>Clear</Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Types</h2>
          <ComponentPreview code={TYPES}>
            <div className="flex flex-wrap justify-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => toast("Event has been created")}>Default</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.success("Event has been created")}>Success</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.info("Be at the area 10 minutes before the event time")}>Info</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.warning("Event start time cannot be earlier than 8am")}>Warning</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.error("Event has not been created")}>Error</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.loading("Uploading file…", { description: "report-q3.pdf" })}>Loading</Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Rich colors</h2>
          <p className="mb-3 text-sm text-ink-muted">
            By default types differ only by icon. <code>richColors</code> tints the whole toast with the success, info,
            warning or danger tokens. Default and loading toasts are never tinted.
          </p>
          <ComponentPreview code={RICH}>
            <div className="flex items-center gap-2">
              <Button size="sm" variant={rich ? "primary" : "secondary"} onClick={() => setRich((v) => !v)}>
                richColors: {String(rich)}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => toast.success("Changes saved", longer)}>Success</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.error("Upload failed", { description: "The file is larger than 10 MB" })}>Error</Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Actions and close button</h2>
          <ComponentPreview code={BUTTONS}>
            <div className="flex flex-wrap justify-center gap-2">
              <Button size="sm" variant="secondary" onClick={() => toast("Event has been created", { action: { label: "Undo", onClick: () => toast("Undone") } })}>Action</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.info("Delete 3 files?", { description: "Today at 6:00pm", cancel: { label: "Cancel" }, action: { label: "Confirm", onClick: () => toast.success("Deleted") } })}>Action and cancel</Button>
              <Button size="sm" variant="secondary" onClick={() => toast("Event has been created", { ...longer, closeButton: true })}>Close button</Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Promise</h2>
          <p className="mb-3 text-sm text-ink-muted">
            One toast follows an async task: loading first, then success or error, in the same place.
          </p>
          <ComponentPreview code={PROMISE}>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => toast.promise(new Promise<{ number: string }>((r) => setTimeout(() => r({ number: "INV-204" }), 2000)), { loading: "Saving invoice…", success: (i) => `Invoice ${i.number} saved`, error: "Could not save the invoice" })}>Resolves</Button>
              <Button size="sm" variant="secondary" onClick={() => toast.promise(new Promise((_, reject) => setTimeout(() => reject(new Error("offline")), 2000)), { loading: "Saving invoice…", success: "Saved", error: "Could not save the invoice" })}>Rejects</Button>
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Updating and dismissing</h2>
          <ComponentPreview code={UPDATE}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                const id = toast.loading("Uploading…");
                setTimeout(() => toast.success("Uploaded", { id }), 1800);
              }}
            >
              Upload
            </Button>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Position</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Six positions, 24px from the viewport edge (16px on phones, where toasts fill the width). Pick one, then add a toast.
          </p>
          <ComponentPreview code={POSITION}>
            <div className="flex flex-wrap justify-center gap-2">
              {POSITIONS.map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant={position === p ? "primary" : "secondary"}
                  onClick={() => { setPosition(p); toast("Event has been created", { id: "position-demo", ...longer }); }}
                >
                  {p}
                </Button>
              ))}
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Motion</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Movement runs 400ms on a gentle ease. With reduced motion on, toasts keep the fades and drop the movement.
          </p>
          <DocTable headers={["Moment", "What happens"]} rows={MOTION} mono={[]} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>Toasts live in a labelled notifications region. Each one is announced politely; errors and <code>important</code> toasts are announced assertively.</li>
            <li>Press <kbd>alt</kbd> + <kbd>T</kbd> to focus the stack, <kbd>Esc</kbd> to fold it. Focus spreads the pile and pauses the timers, like hover.</li>
            <li>Every toast can be dismissed with <kbd>Delete</kbd> while focused, and the close button and actions are real buttons with focus rings.</li>
            <li>Don&apos;t put anything people must act on in a toast. It disappears after 4 seconds; use <a href="/docs/components/alert" className="font-medium text-ink underline underline-offset-2">Alert</a> or <a href="/docs/components/modal" className="font-medium text-ink underline underline-offset-2">Modal</a> instead.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">toast()</h2>
          <DocTable headers={["Call", "What it does"]} rows={API} mono={[0]} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Toast options</h2>
          <PropsTable rows={OPTIONS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Toaster props</h2>
          <PropsTable rows={TOASTER_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/sonner" />
    </article>
  );
}
