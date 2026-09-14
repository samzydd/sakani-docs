"use client";

import { useState } from "react";
import { MessageBubble, ConversationItem, ChatComposer, Avatar } from "@sakaniui/react";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const THREAD = `<MessageBubble
  type="received"
  avatar={<Avatar size="sm" initials="AK" />}
  authorName="Amara Chen"
  timestamp="09:14"
>
  Can you take a look at the Q3 forecast before standup?
</MessageBubble>

<MessageBubble type="sent" timestamp="09:16" read>
  Looking now — the marketplace line seems off.
</MessageBubble>

<MessageBubble type="system">Amara added Daniel to this conversation</MessageBubble>`;

const CONTENT = `<MessageBubble type="sent" content="file" fileName="forecast-q3.xlsx" fileSize="248 KB" />`;

const LIST = `<ConversationItem
  avatar={<Avatar size="md" initials="AK" />}
  name="Amara Chen"
  timestamp="09:14"
  preview="Can you take a look at the Q3 forecast?"
  state="unread"
  unreadCount={3}
/>
<ConversationItem
  avatar={<Avatar size="md" initials="DO" />}
  name="Daniel Osei"
  state="typing"
/>`;

const COMPOSER = `const [value, setValue] = useState("");

<ChatComposer
  value={value}
  onChange={setValue}
  onSend={() => send(value)}
  placeholder="Write a message…"
/>`;

const BUBBLE_PROPS = [
  { name: "type", type: "'received' | 'sent' | 'system'", default: "'received'", description: "Sent aligns right; system is the centred, unattributed notice." },
  { name: "content", type: "'text' | 'image' | 'file'", default: "'text'", description: "What the body holds. Image and file change the layout inside the bubble." },
  { name: "children", type: "ReactNode", description: "Text body, for content=\"text\"." },
  { name: "image", type: "ReactNode", description: "The image node, for content=\"image\"." },
  { name: "fileName / fileSize", type: "string", description: "File meta, for content=\"file\"." },
  { name: "avatar", type: "ReactNode", description: "Author avatar. Received messages only." },
  { name: "authorName", type: "ReactNode", description: "Author name. Received messages only." },
  { name: "timestamp", type: "ReactNode", description: "Pre-formatted time — the component does no date formatting." },
  { name: "reactions", type: "ReactNode", description: "Reaction row. Received messages only." },
  { name: "read", type: "boolean", default: "false", description: "Read receipt. Sent messages only." },
];

const ITEM_PROPS = [
  { name: "state", type: "'default' | 'hover' | 'active' | 'unread' | 'typing' | 'muted'", default: "'default'", description: "Typing replaces the preview with an indicator; unread shows the count." },
  { name: "avatar", type: "ReactNode", description: "Required. The conversation's avatar." },
  { name: "name", type: "ReactNode", description: "Conversation or person name." },
  { name: "preview", type: "ReactNode", description: "Last-message preview. Ignored while typing." },
  { name: "timestamp", type: "ReactNode", description: "Pre-formatted time of the last message." },
  { name: "unreadCount", type: "number", description: "Badge count, shown when state is unread." },
  { name: "onClick", type: "() => void", description: "Opens the conversation." },
];

const COMPOSER_PROPS = [
  { name: "state", type: "'default' | 'typing' | 'uploading' | 'disabled'", default: "'default'", description: "Uploading reveals the progress row." },
  { name: "value", type: "string", description: "Controlled draft text." },
  { name: "onChange", type: "(value: string) => void", description: "Fires with the text itself, not an event." },
  { name: "onSend", type: "() => void", description: "Fires on submit. Clearing the draft afterwards is your job." },
  { name: "onAttachmentsChange", type: "(files: { name; type; dataUrl }[]) => void", description: "Fires with attachments already read as data URLs." },
  { name: "uploadName / uploadProgress", type: "string / number", description: "Upload meta shown while state is uploading." },
  { name: "onCancelUpload", type: "() => void", description: "Cancels the in-flight upload." },
];

function ComposerDemo() {
  const [value, setValue] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      {sent.map((m, i) => (
        <MessageBubble key={i} type="sent" timestamp="now" read>
          {m}
        </MessageBubble>
      ))}
      <ChatComposer
        value={value}
        onChange={setValue}
        onSend={() => {
          if (!value.trim()) return;
          setSent((s) => [...s, value]);
          setValue("");
        }}
        placeholder="Write a message…"
      />
    </div>
  );
}

export default function ChatPage() {
  return (
    <article>
      <PageHeader title="Chat" description="The three pieces of a messaging UI: the thread, the conversation list, and the composer." />

      <div className="space-y-10">
        <ComponentPreview code={THREAD}>
          <div className="flex w-full max-w-md flex-col gap-3">
            <MessageBubble
              type="received"
              avatar={<Avatar size="sm" initials="AK" />}
              authorName="Amara Chen"
              timestamp="09:14"
            >
              Can you take a look at the Q3 forecast before standup?
            </MessageBubble>
            <MessageBubble type="sent" timestamp="09:16" read>
              Looking now — the marketplace line seems off.
            </MessageBubble>
            <MessageBubble type="system">Amara added Daniel to this conversation</MessageBubble>
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">No formatting, no state</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Timestamps are <code>ReactNode</code>, not <code>Date</code>: these
            components never format a time, so &quot;09:14&quot; vs &quot;2
            minutes ago&quot; stays your decision, along with the locale and the
            relative-time refresh. Likewise the composer won&apos;t clear itself
            after <code>onSend</code> — you own the draft.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Attachments and files</h2>
          <ComponentPreview code={CONTENT}>
            <div className="flex w-full max-w-md flex-col gap-3">
              <MessageBubble type="sent" content="file" fileName="forecast-q3.xlsx" fileSize="248 KB" />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Conversation list</h2>
          <ComponentPreview code={LIST}>
            <div className="flex w-full max-w-sm flex-col">
              <ConversationItem
                avatar={<Avatar size="md" initials="AK" />}
                name="Amara Chen"
                timestamp="09:14"
                preview="Can you take a look at the Q3 forecast?"
                state="unread"
                unreadCount={3}
              />
              <ConversationItem
                avatar={<Avatar size="md" initials="DO" />}
                name="Daniel Osei"
                state="typing"
              />
              <ConversationItem
                avatar={<Avatar size="md" initials="PR" />}
                name="Priya Raman"
                timestamp="Yesterday"
                preview="Thanks!"
                state="muted"
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Composer</h2>
          <ComponentPreview code={COMPOSER}>
            <ComposerDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">MessageBubble props</h2>
          <PropsTable rows={BUBBLE_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">ConversationItem props</h2>
          <PropsTable rows={ITEM_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">ChatComposer props</h2>
          <PropsTable rows={COMPOSER_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/chat" />
    </article>
  );
}
