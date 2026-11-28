"use client";

import { useState } from "react";
import { ShareBlock, type ShareAccess, type SharePerson } from "@sakaniui/react/blocks";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { BlockSource } from "@/components/docs/block-source";
import { Pager } from "@/components/docs/pager";
import { SHARE_DEMO, SHARE_DIRECTORY } from "@/lib/share-demo";

const BASIC = `import { ShareBlock } from '@sakaniui/react/blocks';

const people = [
  { email: 'chloe.wu@acme.com', name: 'Chloe Wu', avatarSrc: '/people/chloe.jpg' },
  { email: 'marco.diaz@acme.com', name: 'Marco Diaz', avatarSrc: '/people/marco.jpg' },
];

<ShareBlock
  subtitle="Enterprise roadmap · Note 453"
  owner={{ name: 'Amara Okafor', avatarSrc: '/people/amara.jpg' }}
  link="https://acme.com/enterprise/note/453"
  directory={people}          // an address you know becomes a name and a photo
  defaultAccess="invited"
/>`;

const INVITE = `<ShareBlock
  link={url}
  directory={people}
  onInvite={async (invitees) => {
    // return the promise: the button says "Sending" until it settles.
    // If it rejects, the people stay in the field and the block says so.
    await fetch('/api/share/invite', { method: 'POST', body: JSON.stringify(invitees) });
  }}
  onRemove={(person) => fetch('/api/share/remove', { method: 'POST', body: JSON.stringify(person) })}
  onCopyLink={(link) => track('share_link_copied', { link })}
/>`;

const CONTROLLED = `const [access, setAccess] = useState<ShareAccess>('invited');
const [people, setPeople] = useState<SharePerson[]>(fromServer);

<ShareBlock
  link={url}
  access={access}
  onAccessChange={setAccess}      // 'anyone' | 'invited'
  people={people}
  onPeopleChange={setPeople}      // after an invite or a Remove
/>`;

const PROPS = [
  { name: "link", type: "string", description: "The link to share. The scheme is hidden in the row (https://acme.com/x reads acme.com/x); Copy link copies it as given." },
  { name: "title", type: "string", default: "'Share'", description: "The panel's heading." },
  { name: "subtitle", type: "string", description: "What is being shared, under the heading." },
  { name: "icon", type: "ReactNode", default: "document icon", description: "The tile beside the heading." },
  { name: "owner", type: "{ name?, avatarSrc? }", description: "The document's owner: their photo leads the avatars in the header." },
  { name: "defaultAccess / access", type: "'anyone' | 'invited'", default: "'anyone'", description: "Who can open it. Leave it to the block with defaultAccess, or control it with access and onAccessChange." },
  { name: "onAccessChange", type: "(access) => void", description: "Called when the switch flips." },
  { name: "defaultPeople / people", type: "SharePerson[]", default: "[]", description: "The people with access, as { email, name?, avatarSrc? }. Leave it to the block or control it with people and onPeopleChange." },
  { name: "onPeopleChange", type: "(people) => void", description: "Called with the whole list after an invite or a Remove." },
  { name: "directory", type: "SharePerson[]", default: "[]", description: "People you already know: an address that matches one becomes its name and photo. Any other address stays an address with an initial." },
  { name: "onInvite", type: "(people) => void | Promise<void>", description: "Called with the people to invite. Return a promise to show \"Sending\" until it settles; if it rejects they stay in the field and the error is shown. Without it the block sends for about a second as a demo." },
  { name: "onRemove", type: "(person) => void", description: "Called when someone is removed from the list." },
  { name: "onCopyLink", type: "(link) => void", description: "Called when Copy link is pressed." },
];

/** The panel with its state kept here, and a readout of what the page would save. */
function ControlledDemo() {
  const [access, setAccess] = useState<ShareAccess>("invited");
  const [people, setPeople] = useState<SharePerson[]>([SHARE_DIRECTORY[0]]);
  return (
    <div className="flex w-full max-w-[420px] flex-col gap-3">
      <ShareBlock {...SHARE_DEMO} access={access} onAccessChange={setAccess} people={people} onPeopleChange={setPeople} />
      <p className="text-center font-mono text-xs text-ink-muted" aria-live="polite">
        access: {access} &middot; {people.length} {people.length === 1 ? "person" : "people"}
      </p>
    </div>
  );
}

export default function ShareBlockPage() {
  return (
    <article>
      <PageHeader title="Share" description="Who can open a document, who you have invited, and the link: one panel, every part opening and closing by height." />
      <p className="mb-8 max-w-3xl text-sm text-ink-muted">
        Built from <code>Switch</code>, <code>Avatar</code>, <code>AvatarGroup</code>, <code>Button</code> and <code>Badge</code>. It is a 420px card for where a
        dialog or popover would go. The access row switches between <em>Anyone with the link</em> and <em>Invited people only</em>; only the second shows the
        invite field and the people who have access. Nothing jumps: the card grows and shrinks as sections open.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Invite people</h2>
          <p className="mb-3 max-w-3xl text-sm text-ink-muted">
            Type <code>chloe.wu@acme.com</code> or <code>marco.diaz@acme.com</code> and press a comma or Enter: the address becomes a person with a name and a photo.
            Then press Invite. Try a bad address (<code>marco.diaz@acme</code>) to see it refused in words, or paste a list of addresses.
          </p>
          <ComponentPreview code={BASIC}>
            <div className="w-full max-w-[420px]">
              <ShareBlock {...SHARE_DEMO} defaultAccess="invited" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">The invite field</h2>
          <ul className="max-w-3xl list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>A <kbd>,</kbd>, <kbd>;</kbd> or <kbd>Enter</kbd> turns what you typed into a person; pasting several addresses makes several. <kbd>Backspace</kbd> on an empty field takes the last one back.</li>
            <li>An address in your <code>directory</code> becomes its name and photo; any other stays an address with an initial.</li>
            <li>A bad address, or one that already has access, is refused in words and left in the field to fix.</li>
            <li><kbd>Enter</kbd> in an empty field, with people in it, sends the invitations.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Send for real</h2>
          <p className="mb-3 max-w-3xl text-sm text-ink-muted">
            <code>onInvite</code> gets the people to invite. Return its promise: the button says <em>Sending</em> until it settles, then a banner confirms and the
            people join <em>People with access</em>. If it rejects, they stay in the field and the block says it could not send. This one always fails, to show that.
          </p>
          <ComponentPreview code={INVITE}>
            <div className="w-full max-w-[420px]">
              <ShareBlock
                {...SHARE_DEMO}
                defaultAccess="invited"
                onInvite={() => new Promise<void>((_, reject) => setTimeout(reject, 900))}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Already shared</h2>
          <p className="mb-3 max-w-3xl text-sm text-ink-muted">
            Start with people who already have access. <em>Remove</em> takes one off the list and the avatars in the header follow. Flip the switch to
            <em> Anyone with the link</em> and the invite field and the list close.
          </p>
          <ComponentPreview code={`<ShareBlock link={url} directory={people} defaultAccess="invited" defaultPeople={people} />`}>
            <div className="w-full max-w-[420px]">
              <ShareBlock {...SHARE_DEMO} defaultAccess="invited" defaultPeople={[...SHARE_DIRECTORY].reverse()} />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Control it</h2>
          <p className="mb-3 max-w-3xl text-sm text-ink-muted">
            By default the block keeps the access setting and the list itself. To keep them in your own state (or on the server), pass them in and listen for changes.
          </p>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="max-w-3xl list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>The access row is one label around the switch, so the whole row toggles it and a screen reader hears what it does.</li>
            <li>A refused address is announced (it is an alert tied to the field), and the field is marked invalid until it is fixed.</li>
            <li>Invitations sent, link copied and person removed are announced in a polite live region, not only shown.</li>
            <li>Every chip has a labelled remove button, and Remove in the list names the person it removes.</li>
            <li>Sections that are closed are inert, so they are out of the tab order; reduced motion turns the opening and closing animation off.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Props</h2>
          <PropsTable rows={PROPS} />
        </section>

        <BlockSource blocks={["ShareBlock"]} />
      </div>

      <Pager current="/docs/blocks/share" />
    </article>
  );
}
