"use client";

import { useEffect, useState } from "react";
import { AttachmentChip, Button, ChatOrb, PromptComposer, ReasoningTrace, ThinkingLoader, ToolCall } from "@sakaniui/react";

const THOUGHTS = [
  "They want the Q4 pipeline in a few lines, with the deals at risk called out. I should start from the opportunities closing this quarter, not the whole pipeline.",
  "Acme has a $48,000 renewal and no reply since the proposal went out nine days ago. That silence is the biggest risk. Globex asked for a revised quote, so it is moving, just slowly.",
  "Before I answer I will check the latest activity in the CRM, so the dates are right.",
];

/** ReasoningTrace streaming word by word, then closing; it starts over after a pause. */
export function ReasoningLiveDemo() {
  const [run, setRun] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    const timers: number[] = [];
    const start = performance.now();
    setLines([]); setDone(false); setElapsed(0);
    const tick = window.setInterval(() => setElapsed((performance.now() - start) / 1000), 200);
    let t = 900;
    THOUGHTS.forEach((para, p) => {
      const words = para.split(" ");
      words.forEach((_, w) => {
        const next = [...THOUGHTS.slice(0, p), words.slice(0, w + 1).join(" ")];
        timers.push(window.setTimeout(() => setLines(next), t));
        t += 60;
      });
      t += 700;
    });
    timers.push(window.setTimeout(() => { window.clearInterval(tick); setDone(true); }, t));
    timers.push(window.setTimeout(() => setRun((r) => r + 1), t + 5000));
    return () => { timers.forEach(window.clearTimeout); window.clearInterval(tick); };
  }, [run]);
  return (
    <div className="w-full max-w-lg">
      <ReasoningTrace key={run} status={done ? "done" : "streaming"} elapsed={done ? Math.round(elapsed) : elapsed} summary="Found two deals to chase before Friday">
        {lines}
      </ReasoningTrace>
    </div>
  );
}

const LABELS = ["Thinking", "Searching the CRM", "Reading 3 emails", "Writing response"];

/** ThinkingLoader whose label moves on every few seconds. */
export function ThinkingLoaderCycleDemo() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setI((n) => (n + 1) % LABELS.length), 2600); return () => window.clearInterval(id); }, []);
  return <ThinkingLoader label={LABELS[i]} />;
}

/** The orb with its two states on buttons, so you can see them without waiting for the AI. */
export function ChatOrbPlayground() {
  const [thinking, setThinking] = useState(false);
  const [glance, setGlance] = useState(false);
  return (
    <div className="flex flex-col items-center gap-5">
      <ChatOrb size={88} thinking={thinking} glance={glance} />
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant={thinking ? "primary" : "secondary"} size="sm" onClick={() => setThinking((v) => !v)}>
          {thinking ? "Stop thinking" : "Thinking"}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => { setGlance(false); window.setTimeout(() => setGlance(true), 30); window.setTimeout(() => setGlance(false), 1800); }}>
          Glance at the response
        </Button>
      </div>
      <p className="text-center text-xs text-ink-muted">Move your pointer around it, and over it.</p>
    </div>
  );
}

/** PromptComposer that "streams" for three seconds after you send. */
export function PromptComposerDemo({ withAttachments = false }: { withAttachments?: boolean }) {
  const [status, setStatus] = useState<"idle" | "streaming">("idle");
  const [value, setValue] = useState("");
  useEffect(() => {
    if (status !== "streaming") return;
    const id = window.setTimeout(() => setStatus("idle"), 3000);
    return () => window.clearTimeout(id);
  }, [status]);
  return (
    <div className="w-full max-w-xl">
      <PromptComposer
        value={value}
        onValueChange={setValue}
        status={status}
        onSubmit={() => { setValue(""); setStatus("streaming"); }}
        onStop={() => setStatus("idle")}
        onAttach={() => {}}
        onVoice={() => {}}
        placeholder="Ask anything, or type / for skills"
        aria-label="Message"
        attachments={withAttachments ? <ComposerChips /> : undefined}
      />
    </div>
  );
}

function ComposerChips() {
  return (
    <>
      <AttachmentChip type="file" name="Q4 pipeline.pdf" meta="PDF · 2.4 MB" onRemove={() => {}} />
      <AttachmentChip type="uploading" name="renewals.csv" progress={64} />
    </>
  );
}

/** A tool call that runs for a couple of seconds, then finishes. */
export function ToolCallLiveDemo() {
  const [run, setRun] = useState(0);
  const [running, setRunning] = useState(true);
  useEffect(() => {
    setRunning(true);
    const a = window.setTimeout(() => setRunning(false), 2600);
    const b = window.setTimeout(() => setRun((r) => r + 1), 7000);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [run]);
  return (
    <div className="w-full max-w-lg">
      <ToolCall
        status={running ? "running" : "done"}
        name="search_crm"
        args={'(query="Acme Corp")'}
        duration={running ? undefined : "1.2s"}
        input={{ query: "Acme Corp", limit: 5 }}
        output={running ? undefined : { results: 3, top: "Acme Corp (Enterprise, $48,000)", lastContact: "9 days ago" }}
      />
    </div>
  );
}
