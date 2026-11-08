"use client";

import { useEffect, useState } from "react";
import {
  Button, ChainOfThought, ChainOfThoughtStep, CommandMenu, CommandMenuAnswer, CommandMenuTrigger,
  type CommandMenuFilter, type CommandMenuGroup, type CommandMenuItem,
} from "@sakaniui/react";
import {
  IconBell, IconClock, IconCreditCard, IconFilePlus, IconFileText, IconFolder, IconLayoutDashboard, IconLock, IconMail,
  IconMessageCircle, IconMoon, IconPlus, IconRefresh, IconSearch, IconSettings, IconTextSpellcheck, IconUsers, IconUsersGroup, IconX,
} from "@sakaniui/react/icons";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DocTable } from "@/components/docs/doc-table";
import { Pager } from "@/components/docs/pager";

/* ------------------------------------------------------------------ */
/* Demo data                                                           */
/* ------------------------------------------------------------------ */

const SCOPES = [
  { value: "all", label: "All" }, { value: "pages", label: "Pages" }, { value: "people", label: "People" },
  { value: "files", label: "Files" }, { value: "actions", label: "Actions" },
];

const GROUPS: CommandMenuGroup[] = [
  {
    id: "recent", label: "Recent",
    items: [
      { id: "q4", type: "file", label: "Q4 revenue report.pdf", description: "Finance / Reports", meta: "Edited 2h ago", tags: ["Files"] },
      { id: "amara", type: "person", label: "Amara Chen", description: "Product designer · Design", meta: "Online", avatar: { initials: "AC", status: "online" }, tags: ["People", "team: Design"] },
      { id: "billing", type: "page", label: "Billing settings", description: "Workspace / Settings", meta: "Page", icon: IconCreditCard },
    ],
  },
  {
    id: "pages", label: "Pages", action: { label: "See all", onClick: () => {} },
    items: [
      { id: "account", type: "page", label: "Settings → Account", description: "Workspace / Settings", meta: "Page", icon: IconSettings, keywords: ["profile"] },
      { id: "security", type: "page", label: "Settings → Security", description: "Workspace / Settings", meta: "Page", icon: IconLock, keywords: ["password", "2fa"] },
      { id: "notifications", type: "page", label: "Settings → Notifications", description: "Workspace / Settings", meta: "Page", icon: IconBell },
    ],
  },
  {
    id: "people", label: "People · Design",
    items: [
      { id: "kamal", type: "person", label: "Kamal Reyes", description: "Design lead", meta: "Away", avatar: { initials: "KR", status: "away" }, tags: ["People", "team: Design"] },
      { id: "sam", type: "person", label: "Sam Okoye", description: "Brand designer", meta: "Online", avatar: { initials: "SO", status: "online" }, tags: ["People", "team: Design"] },
    ],
  },
  {
    id: "actions", label: "Suggested",
    items: [
      { id: "create", type: "action", label: "Create project", icon: IconPlus, shortcut: ["⌘", "N"] },
      { id: "invite", type: "action", label: "Invite a teammate", icon: IconUsers, shortcut: ["⌘", "I"] },
      { id: "dark", type: "action", label: "Switch to dark mode", icon: IconMoon, shortcut: ["⌘", "J"] },
      { id: "reset", type: "action", label: "Reset settings to default", icon: IconRefresh, meta: "Action" },
    ],
  },
];

const SIMPLE: CommandMenuGroup[] = [
  {
    id: "suggestions", label: "Suggestions",
    items: [
      { id: "dash", type: "action", label: "Go to dashboard", icon: IconLayoutDashboard, shortcut: ["⌘", "D"] },
      { id: "settings", type: "action", label: "Open settings", icon: IconSettings, shortcut: ["⌘", ","] },
      { id: "newfile", type: "action", label: "New file", icon: IconFilePlus, shortcut: ["⌘", "N"] },
    ],
  },
];

const FALLBACK: CommandMenuGroup[] = [
  {
    id: "try", label: "Try instead",
    items: [
      { id: "everywhere", type: "action", label: "Search everywhere for “invoice”", description: "12 results in Pages, Files and Actions", icon: IconSearch },
      { id: "ai", type: "ai", label: "Ask AI “invoce”", description: "It can look through your docs, data and the web", meta: "Ask AI", shortcut: ["⌘", "↵"] },
      { id: "create-file", type: "action", label: "Create a file named “invoce”", description: "In Finance / Reports", icon: IconFilePlus },
    ],
  },
];

const AI_SCOPES = [{ value: "all", label: "All", count: null }, { value: "ai", label: "Ask AI", count: null }, { value: "docs", label: "Docs", count: 3 }];
const SUGGESTED = ["How do I add dark mode?", "How do I change the theme tokens?", "What changed in the latest release?"];
const ANSWER_TEXT = "Wrap your app in the theme provider and toggle the dark class on <html>. Every component reads the semantic tokens, so nothing else changes. For a smooth switch, wrap the toggle in document.startViewTransition().";
const GENERIC_ANSWER = "I did not find a page that answers that directly, but these are the closest: they cover the basics of how SakaniUI is set up. Open one to read on, or ask me a follow-up and I will narrow it down.";
const RELATED: CommandMenuGroup[] = [{
  id: "related", label: "Related",
  items: [
    { id: "theming", type: "page", label: "Theming", description: "Docs / Getting started", meta: "Docs", icon: IconFileText },
    { id: "tokens", type: "page", label: "Tokens", description: "Docs / Getting started", meta: "Docs", icon: IconFileText },
  ],
}];

/* ------------------------------------------------------------------ */
/* Code samples                                                        */
/* ------------------------------------------------------------------ */

const BASIC = `import { CommandMenu, CommandMenuTrigger } from '@sakaniui/react';

const [open, setOpen] = useState(false);

<CommandMenuTrigger onClick={() => setOpen(true)} />

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  scopes={[{ value: 'all', label: 'All' }, { value: 'pages', label: 'Pages' }, { value: 'people', label: 'People' }]}
  groups={[
    {
      id: 'recent', label: 'Recent',
      items: [
        { id: 'q4', type: 'file', label: 'Q4 revenue report.pdf', description: 'Finance / Reports', meta: 'Edited 2h ago' },
        { id: 'amara', type: 'person', label: 'Amara Chen', description: 'Product designer', avatar: { initials: 'AC', status: 'online' } },
        { id: 'billing', type: 'page', label: 'Billing settings', icon: IconCreditCard },
      ],
    },
    {
      id: 'actions', label: 'Suggested',
      items: [{ id: 'create', type: 'action', label: 'Create project', icon: IconPlus, shortcut: ['⌘', 'N'] }],
    },
  ]}
  onSelect={(item) => router.push(item.id)}
  workspace="Acme workspace"
/>`;

const HOTKEY = `// ⌘K (Ctrl K) opens it by default, wherever the menu is mounted.
<CommandMenu defaultOpen={false} groups={groups} />

// Own the key, or turn it off:
<CommandMenu hotkey="j" groups={groups} />       // ⌘J
<CommandMenu hotkey={false} open={open} onOpenChange={setOpen} groups={groups} />`;

const SIMPLE_CODE = `<CommandMenu
  variant="simple"
  open={open}
  onOpenChange={setOpen}
  placeholder="Type a command or search…"
  groups={[{
    id: 'suggestions', label: 'Suggestions',
    items: [
      { id: 'dash', type: 'action', label: 'Go to dashboard', icon: IconLayoutDashboard, shortcut: ['⌘', 'D'] },
      { id: 'settings', type: 'action', label: 'Open settings', icon: IconSettings, shortcut: ['⌘', ','] },
    ],
  }]}
/>`;

const FILTERS_CODE = `const [filters, setFilters] = useState<CommandMenuFilter[]>([
  { id: 'people', label: 'People', icon: IconUsers },
  { id: 'team', label: 'team: Design', value: 'team: Design' },
]);

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  groups={groups}                 // items carry tags: ['People', 'team: Design']
  filters={filters}
  onFiltersChange={setFilters}    // ⌫ in an empty field removes the last token
  filterKeys={['team', 'status']} // typing "team:Design" and a space makes a token
/>`;

const PREVIEW_CODE = `<CommandMenu
  open={open}
  onOpenChange={setOpen}
  groups={groups}
  renderPreview={(item) => (item.type === 'person' ? <PersonCard item={item} /> : null)}
  previewEmpty="Nothing to preview"
  // pinned to the bottom of the pane; only renderPreview's content cross-fades between rows
  previewActions={() => (
    <>
      <Button size="sm">Message</Button>
      <Button size="sm" variant="secondary">View profile</Button>
    </>
  )}
/>`;

const ASK_CODE = `const [query, setQuery] = useState('');
const [scope, setScope] = useState('all');
const [asked, setAsked] = useState<string | null>(null);   // the question that was actually asked
const run = useAgentRun(asked);                            // your agent: { steps, finishedIn, answer, streamed }

const ask = (q: string) => {
  if (!q.trim()) { setScope('ai'); return; }               // an empty field asks nothing
  setQuery(q); setAsked(q); setScope('ai');
};

// the answer belongs to the question in the box: change the question and it goes
const onQueryChange = (v: string) => { setQuery(v); if (asked !== null && v.trim() !== asked) setAsked(null); };

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  scopes={[{ value: 'all', label: 'All' }, { value: 'ai', label: 'Ask AI' }]}
  scope={scope}
  onScopeChange={setScope}
  query={query}
  onQueryChange={onQueryChange}
  filter={scope !== 'ai'}
  closeOnSelect={false}
  onAskAI={ask}                                            // ⌘↵ from any scope
  onSelect={(item) => item.type === 'ai' && ask(item.id.startsWith('sq:') ? item.label : query)}
  groups={asked ? (run.streamed ? related : []) : suggestedQuestions}
  placeholder="Ask anything about SakaniUI…"
  answer={asked && (
    <div style={{ display: 'grid', gap: 10 }}>
      <ChainOfThought title={run.done ? 'Read 3 docs pages' : 'Thinking'} open={!run.answered} status={run.done ? 'done' : 'working'} startedAt={run.startedAt} elapsed={run.finishedIn}>
        {run.steps.map((s, i) => <ChainOfThoughtStep key={s.id} status={!run.done && i === run.steps.length - 1 ? 'active' : 'done'} {...s} />)}
      </ChainOfThought>
      {run.answered && (
        <CommandMenuAnswer stream onStreamEnd={run.markStreamed} status={\`Thought for \${run.finishedIn}s\`} sources={[{ label: 'Theming' }, { label: 'Tokens' }]} onFollowUp={…} onCopy={…}>
          {run.answer}
        </CommandMenuAnswer>
      )}
    </div>
  )}
/>`;

const ANSWER_CODE = `// stream writes a plain-string answer in word by word, then brings in the sources and the follow-up
<CommandMenuAnswer stream onStreamEnd={() => showRelated()} status="Thought for 2.4s" sources={[{ label: 'Theming' }, { label: 'Tokens' }]} onFollowUp={askAgain} onCopy={copy}>
  Wrap your app in the theme provider and toggle the dark class on &lt;html&gt;.
</CommandMenuAnswer>

// without stream it is the finished card
<CommandMenuAnswer status="Answered in 2.4s" onOpenInChat={openChat}>…</CommandMenuAnswer>`;

const STATES_CODE = `<CommandMenu state="loading" … />                       // skeleton rows

<CommandMenu state="error" onRetry={retry} onReport={report}   // a message, "Try again", a quieter "Report"
  fallbackGroups={recent} … />                                  // and something to open instead

<CommandMenu
  emptyTitle="No files match “invoce”"
  emptyDescription="Check the spelling, or search everywhere instead."
  suggestions={[
    { label: 'Did you mean invoice?', emphasis: 'invoice', icon: IconTextSpellcheck, onSelect: fixTypo },
    { label: 'Remove the Files filter', emphasis: 'Files', icon: IconX, iconPosition: 'end', onSelect: clearFilter },
  ]}
  fallbackGroups={tryInstead}                                   // navigable like any group
  … />`;

const SERVER_CODE = `// results come from your server: show exactly what you pass
const [query, setQuery] = useState('');
const { data, isLoading, error, refetch } = useSearch(query);

<CommandMenu
  open={open}
  onOpenChange={setOpen}
  query={query}
  onQueryChange={setQuery}
  filter={false}
  groups={data ?? []}
  state={error ? 'error' : isLoading ? 'loading' : 'ready'}
  onRetry={refetch}
/>

// or match your own way
<CommandMenu filter={(item, q) => item.label.toLowerCase().startsWith(q.toLowerCase())} groups={groups} />`;

const TRIGGER_CODE = `<CommandMenuTrigger onClick={() => setOpen(true)} />
<CommandMenuTrigger placeholder="Search docs…" shortcut={['Ctrl', 'K']} onClick={() => setOpen(true)} />`;

/* ------------------------------------------------------------------ */
/* Demos                                                               */
/* ------------------------------------------------------------------ */

function useOpen(initial = false) {
  const [open, setOpen] = useState(initial);
  return { open, setOpen, show: () => setOpen(true) };
}

function BasicDemo() {
  const { open, setOpen, show } = useOpen();
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-3">
      <CommandMenuTrigger onClick={show} />
      <p className="text-xs text-ink-muted">{picked ? `You chose: ${picked}` : "Open it, type to filter, use ↑ ↓ and ↵."}</p>
      <CommandMenu
        hotkey={false} open={open} onOpenChange={setOpen} scopes={SCOPES} groups={GROUPS} workspace="Acme workspace"
        onSelect={(item) => setPicked(item.label)} onAskAI={() => {}}
      />
    </div>
  );
}

function SimpleDemo() {
  const { open, setOpen, show } = useOpen();
  return (
    <>
      <Button variant="secondary" onClick={show}>Open the simple menu</Button>
      <CommandMenu hotkey={false} variant="simple" open={open} onOpenChange={setOpen} groups={SIMPLE} placeholder="Type a command or search…" />
    </>
  );
}

function FiltersDemo() {
  const { open, setOpen, show } = useOpen();
  const [filters, setFilters] = useState<CommandMenuFilter[]>([
    { id: "people", label: "People", icon: IconUsers },
    { id: "team", label: "team: Design", value: "team: Design" },
  ]);
  return (
    <>
      <Button variant="secondary" onClick={show}>Open with two filters</Button>
      <CommandMenu
        hotkey={false} open={open} onOpenChange={setOpen} scopes={SCOPES} defaultScope="people" defaultQuery="am" groups={GROUPS}
        filters={filters} onFiltersChange={setFilters} filterKeys={["team"]} workspace="Acme workspace"
      />
    </>
  );
}

const previewText = { font: "500 12px/16px var(--font-sans)", color: "var(--color-fg-muted)" } as const;

function PersonPreview({ item }: { item: CommandMenuItem }) {
  const first = item.label.split(" ")[0].toLowerCase();
  const row = (Icon: typeof IconMail, text: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Icon size={14} style={{ flexShrink: 0, color: "var(--color-fg-subtle)" }} aria-hidden="true" />
      <span style={previewText}>{text}</span>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ font: "500 16px/22px var(--font-sans)", color: "var(--color-fg-default)" }}>{item.label}</span>
        <span style={previewText}>{item.description}</span>
      </div>
      <div style={{ height: 1, background: "var(--color-border-subtle)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {row(IconMail, `${first}@acme.com`)}
        {row(IconUsersGroup, "Design team · 6 people")}
        {row(IconClock, "Usually replies in 1 hour")}
      </div>
    </div>
  );
}

function PreviewDemo() {
  const { open, setOpen, show } = useOpen();
  return (
    <>
      <Button variant="secondary" onClick={show}>Open with a preview pane</Button>
      <CommandMenu
        hotkey={false} open={open} onOpenChange={setOpen} scopes={SCOPES} defaultScope="people" defaultQuery="am" groups={GROUPS} workspace="Acme workspace"
        renderPreview={(item) => (item.type === "person" ? <PersonPreview item={item} /> : null)}
        previewEmpty="Nothing to preview"
        previewActions={() => (
          <>
            <Button size="sm" style={{ flex: 1 }}>Message</Button>
            <Button size="sm" variant="secondary" style={{ flex: 1 }}>View profile</Button>
          </>
        )}
      />
    </>
  );
}

/* The Ask AI run: the Chain of Thought works, folds shut, then the answer writes itself in. */
const askSteps = (question = "") => [
  { icon: IconSearch, label: "Searched the docs for", query: question.replace(/[?.!]+$/, "").slice(0, 28) || "your question", count: "3 pages", ms: 800 },
  { icon: IconFileText, label: "Read Theming", ms: 650 },
  { icon: IconFileText, label: "Read Tokens", ms: 650 },
  { icon: IconMessageCircle, label: "Writing the answer", ms: 550 },
];

function useAskRun(runKey: number | null) {
  const [shown, setShown] = useState(0);
  const [landed, setLanded] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [finishedIn, setFinishedIn] = useState<number | undefined>();
  const [answered, setAnswered] = useState(false);
  const [streamed, setStreamed] = useState(false);
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setShown(0); setLanded(0); setFinishedIn(undefined); setAnswered(false); setStreamed(false);
    /* eslint-enable react-hooks/set-state-in-effect */
    if (runKey == null) return;
    const start = Date.now();
    setStartedAt(start);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 250;
    askSteps().forEach((st, i) => {
      timers.push(setTimeout(() => setShown(i + 1), at));
      at += st.ms;
      timers.push(setTimeout(() => setLanded(i + 1), at));
      at += 200;
    });
    timers.push(setTimeout(() => setFinishedIn((Date.now() - start) / 1000), at));
    timers.push(setTimeout(() => setAnswered(true), at + 900));   // the finish sweep runs first, then it folds shut
    return () => timers.forEach(clearTimeout);
  }, [runKey]);
  return { shown, landed, startedAt, finishedIn, answered, streamed, markStreamed: () => setStreamed(true) };
}

function AskAnswer({ run, question }: { run: ReturnType<typeof useAskRun>; question: string }) {
  const done = run.finishedIn != null;
  // open while it thinks, folded once the answer arrives; the header still toggles it
  const [toggled, setToggled] = useState<boolean | null>(null);
  const open = toggled ?? !run.answered;
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <ChainOfThought title={done ? "Read 3 docs pages" : "Thinking"} open={open} onOpenChange={setToggled} status={done ? "done" : "working"} startedAt={run.startedAt} elapsed={run.finishedIn}>
        {askSteps(question).slice(0, run.shown).map((st, i) => (
          <ChainOfThoughtStep
            key={st.label}
            status={!done && i === run.shown - 1 && run.landed < run.shown ? "active" : "done"}
            icon={st.icon} label={st.label} query={st.query} count={i < run.landed ? st.count : undefined}
          />
        ))}
      </ChainOfThought>
      {run.answered && (
        <CommandMenuAnswer
          stream onStreamEnd={run.markStreamed} status={`Thought for ${(run.finishedIn ?? 0).toFixed(1)}s`}
          onCopy={() => {}} onFollowUp={() => {}} onOpenInChat={() => {}}
          sources={[{ label: "Theming" }, { label: "Tokens" }, { label: "Installation" }]}
        >
          {/dark|theme|token/i.test(question) ? ANSWER_TEXT : GENERIC_ANSWER}
        </CommandMenuAnswer>
      )}
    </div>
  );
}

function AskAIDemo() {
  const { open, setOpen, show } = useOpen();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("ai");
  const [asked, setAsked] = useState<string | null>(null);
  const [runKey, setRunKey] = useState<number | null>(null);
  const run = useAskRun(runKey);
  const ask = (q: string) => {
    const text = q.trim();
    if (!text) { setScope("ai"); return; }
    setQuery(text); setAsked(text); setScope("ai"); setRunKey((n) => (n ?? 0) + 1);
  };
  const reset = () => { setRunKey(null); setAsked(null); setScope("ai"); setQuery(""); };
  const onOpenChange = (o: boolean) => { setOpen(o); if (!o) reset(); };
  // the answer belongs to the question in the box: edit the question and the answer goes
  const onQueryChange = (v: string) => { setQuery(v); if (asked !== null && v.trim() !== asked) { setAsked(null); setRunKey(null); } };
  const inAI = scope === "ai";
  const answering = inAI && asked !== null;
  const q = query.trim();
  const askRow: CommandMenuGroup = {
    id: "ask", label: "Ask",
    items: [{ id: "askai", type: "ai", label: q ? `Ask AI “${q}”` : "Ask AI a question", description: "It can look through your docs, data and the web", meta: "Ask AI", shortcut: ["⌘", "↵"] }],
  };
  const list: CommandMenuGroup[] = answering
    ? (run.streamed ? RELATED : [])
    : inAI
      ? (q ? [askRow] : [{ id: "suggested", label: "Suggested questions", items: SUGGESTED.map((s) => ({ id: `sq:${s}`, type: "ai" as const, label: s, meta: "Ask AI" })) }])
      : [...GROUPS, askRow];
  return (
    <>
      <Button onClick={show}>Ask AI</Button>
      <CommandMenu
        hotkey={false} open={open} onOpenChange={onOpenChange} groups={list} scopes={AI_SCOPES} scope={scope} onScopeChange={setScope}
        query={query} onQueryChange={onQueryChange} filter={!inAI} workspace="Acme workspace"
        placeholder={inAI ? "Ask anything about SakaniUI…" : undefined}
        onSelect={(i) => { if (i.type === "ai") ask(i.id.startsWith("sq:") ? i.label : query); }}
        closeOnSelect={false} onAskAI={ask}
        answer={answering ? <AskAnswer key={runKey} run={run} question={asked ?? ""} /> : undefined}
      />
    </>
  );
}

function AnswerDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="flex w-full max-w-[560px] flex-col gap-4">
      <CommandMenuAnswer
        key={key} stream status="Thought for 2.4s" onCopy={() => {}} onFollowUp={() => {}} onOpenInChat={() => {}}
        sources={[{ label: "Theming" }, { label: "Tokens" }, { label: "Installation" }]}
      >
        {ANSWER_TEXT}
      </CommandMenuAnswer>
      <div><Button variant="secondary" size="sm" onClick={() => setKey((n) => n + 1)}>Replay</Button></div>
    </div>
  );
}

function StatesDemo() {
  const [which, setWhich] = useState<"loading" | "error" | "empty" | null>(null);
  const close = (o: boolean) => { if (!o) setWhich(null); };
  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => setWhich("loading")}>Loading</Button>
        <Button variant="secondary" onClick={() => setWhich("error")}>Error</Button>
        <Button variant="secondary" onClick={() => setWhich("empty")}>No results</Button>
      </div>
      <CommandMenu
        hotkey={false} open={which === "loading"} onOpenChange={close} scopes={SCOPES} defaultQuery="q4 rev" state="loading" groups={GROUPS} workspace="Acme workspace"
      />
      <CommandMenu
        hotkey={false} open={which === "error"} onOpenChange={close} scopes={SCOPES} defaultQuery="q4 rev" state="error" groups={GROUPS} workspace="Acme workspace"
        onRetry={() => {}} onReport={() => {}}
        fallbackGroups={[{ ...GROUPS[0], items: GROUPS[0].items.filter((i) => i.id === "q4" || i.id === "billing") }]}
      />
      <CommandMenu
        hotkey={false} open={which === "empty"} onOpenChange={close} workspace="Acme workspace"
        scopes={[{ value: "all", label: "All", count: 12 }, { value: "pages", label: "Pages", count: 4 }, { value: "people", label: "People", count: 0 }, { value: "files", label: "Files", count: 0 }, { value: "actions", label: "Actions", count: 1 }]}
        defaultScope="files" defaultQuery="invoce" groups={GROUPS} onAskAI={() => {}}
        filters={[{ id: "files", label: "Files", icon: IconFolder }]}
        emptyTitle="No files match “invoce”" emptyDescription="Check the spelling, or search everywhere instead."
        suggestions={[
          { label: "Did you mean invoice?", emphasis: "invoice", icon: IconTextSpellcheck, onSelect: () => {} },
          { label: "Remove the Files filter", emphasis: "Files", icon: IconX, iconPosition: "end", onSelect: () => {} },
        ]}
        fallbackGroups={FALLBACK}
      />
    </>
  );
}

function ServerDemo() {
  const { open, setOpen, show } = useOpen();
  const [query, setQuery] = useState("");
  const [state, setState] = useState<"ready" | "loading">("ready");
  const [groups, setGroups] = useState<CommandMenuGroup[]>([]);
  // a stand-in for a request: the results are whatever the "server" sends back, so the menu does not filter them again
  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState("loading");
    const t = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const items = GROUPS.flatMap((g) => g.items).filter((i) => !q || i.label.toLowerCase().includes(q)).slice(0, 5);
      setGroups(items.length ? [{ id: "results", label: q ? `Results for “${query.trim()}”` : "Suggested", items }] : []);
      setState("ready");
    }, 450);
    return () => clearTimeout(t);
  }, [query, open]);
  return (
    <>
      <Button variant="secondary" onClick={show}>Open with server results</Button>
      <CommandMenu
        hotkey={false} open={open} onOpenChange={setOpen} variant="simple" query={query} onQueryChange={setQuery}
        filter={false} groups={groups} state={state} placeholder="Search the workspace…"
      />
    </>
  );
}

function TriggerDemo() {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-3">
      <CommandMenuTrigger />
      <CommandMenuTrigger placeholder="Search docs…" shortcut={["Ctrl", "K"]} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tables                                                              */
/* ------------------------------------------------------------------ */

const MENU_PROPS = [
  { name: "groups", type: "CommandMenuGroup[]", description: "The results, in groups. The only required prop." },
  { name: "open / defaultOpen", type: "boolean", default: "false", description: "Controlled or initial open state." },
  { name: "onOpenChange", type: "(open) => void", description: "Called when it opens (⌘K) or closes (esc, backdrop, choosing an item)." },
  { name: "hotkey", type: "string | false", default: '"k"', description: "The key that opens it with ⌘ / Ctrl. false turns the shortcut off, e.g. when you open it from your own button." },
  { name: "variant", type: '"default" | "simple"', default: "default", description: "default has scopes and a workspace footer; simple is the field, the rows and the key hints." },
  { name: "query / defaultQuery / onQueryChange", type: "string", description: "The field's text, controlled or initial." },
  { name: "placeholder", type: "string", description: "The field's placeholder." },
  { name: "filter", type: "boolean | (item, query) => boolean", default: "true", description: "Filter the groups by the query, scope and tokens. Pass a function to match your own way, or false to show groups exactly as given (server results)." },
  { name: "highlightMatches", type: "boolean", default: "true", description: "Sets the matched letters of each label in the strong weight." },
  { name: "state", type: '"ready" | "loading" | "error"', default: "ready", description: '"loading" shows skeleton rows; "error" the error message.' },
  { name: "onSelect", type: "(item) => void", description: "Called when an item is chosen (click or ↵), after the item's own onSelect." },
  { name: "closeOnSelect", type: "boolean", default: "true", description: "Close the menu when an item is chosen. Turn it off for items that start something in the menu, like Ask AI." },
  { name: "scopes / scope / defaultScope / onScopeChange", type: "CommandMenuScope[] / string", description: "The tabs under the field (not in the simple variant). Tab and Shift Tab move between them." },
  { name: "filters / onFiltersChange", type: "CommandMenuFilter[]", description: "Filter tokens shown in the field. ⌫ in an empty field removes the last one." },
  { name: "filterKeys", type: "string[]", description: 'Typing key:value and a space turns it into a token for these keys, e.g. ["team", "status"].' },
  { name: "onAskAI", type: "(query) => void", description: "Adds ⌘↵ and the Ask AI hint; called with the current query." },
  { name: "answer", type: "ReactNode", description: "Shown above the results: a CommandMenuAnswer, a Chain of Thought, or both." },
  { name: "renderPreview", type: "(item) => ReactNode", description: "Shows a detail pane beside the list for the active item. Return null for no pane." },
  { name: "previewActions", type: "ReactNode | (item) => ReactNode", description: "Buttons pinned to the bottom of the pane. They stay put while the content above cross-fades from row to row." },
  { name: "previewEmpty", type: "ReactNode", description: "Shown in the pane when the active row has nothing to preview." },
  { name: "emptyTitle / emptyDescription", type: "ReactNode", description: 'The "No results" message.' },
  { name: "suggestions", type: "CommandMenuSuggestion[]", description: 'Quick fixes under the empty message, e.g. "Did you mean invoice?".' },
  { name: "fallbackGroups", type: "CommandMenuGroup[]", description: 'Shown under the empty or error message, and navigable like any group (e.g. "Try instead").' },
  { name: "errorTitle / errorDescription", type: "ReactNode", description: "The error message." },
  { name: "onRetry / onReport", type: "() => void", description: 'The "Try again" button, and a quieter "Report" beside it.' },
  { name: "retryLabel / reportLabel", type: "ReactNode", description: "Replace the button labels." },
  { name: "workspace", type: "ReactNode", description: "The workspace switcher in the footer (default variant)." },
  { name: "hideFooter", type: "boolean", description: "Hide the footer of key hints." },
  { name: "aria-label", type: "string", default: '"Command menu"', description: "The dialog's accessible name." },
];

const ITEM_PROPS = [
  { name: "id", type: "string", description: "Unique within the menu." },
  { name: "label", type: "string", description: "The row's title. The matched letters are set in the strong weight." },
  { name: "description", type: "string", description: "A second line: a path, a role, a hint." },
  { name: "type", type: '"page" | "action" | "file" | "person" | "ai"', description: 'What kind of result it is. Sets the default icon and the scope it belongs to ("pages", "people", "files", "actions"). "ai" draws the SakaniUI mark.' },
  { name: "scope", type: "string", description: "Overrides the scope the item belongs to (the value of a scope)." },
  { name: "icon", type: "IconComponent", description: "The icon in the leading tile. Defaults by type." },
  { name: "avatar", type: "{ src?, initials?, alt?, status? }", description: 'For a person: an Avatar, with a status dot ("online" | "away").' },
  { name: "meta", type: "string", description: 'Small text on the right: "Page", "Edited 2h ago".' },
  { name: "shortcut", type: "string[]", description: "Key caps on the right, e.g. ['⌘', 'N']." },
  { name: "keywords", type: "string[]", description: "Extra words the built-in filter matches." },
  { name: "tags", type: "string[]", description: "Matched by filter tokens: a token whose value (or label) is in tags keeps the item." },
  { name: "onSelect", type: "() => void", description: "Called when the item is chosen, in addition to the menu's onSelect." },
  { name: "disabled", type: "boolean", description: "Not selectable." },
];

const GROUP_PROPS = [
  { name: "id", type: "string", description: "Unique within the menu." },
  { name: "label", type: "string", description: "The small heading above the items." },
  { name: "action", type: "{ label, onClick }", description: 'A link on the right of the heading, e.g. "See all".' },
  { name: "items", type: "CommandMenuItem[]", description: "The rows." },
];

const SCOPE_PROPS = [
  { name: "value", type: "string", description: '"all" is the unfiltered scope.' },
  { name: "label", type: "string", description: "The tab's text." },
  { name: "count", type: "number | null", description: "The count on the tab. Computed from the items when left out (and filter is on); null shows no count." },
];

const FILTER_PROPS = [
  { name: "id", type: "string", description: "Unique among the tokens." },
  { name: "label", type: "string", description: 'Shown in the token, e.g. "People" or "team: Design".' },
  { name: "value", type: "string", description: "What tags are matched against. Defaults to the label." },
  { name: "icon", type: "IconComponent", description: "Drawn before the label." },
];

const SUGGESTION_PROPS = [
  { name: "label", type: "string", description: "The row's text." },
  { name: "onSelect", type: "() => void", description: "Called when it is chosen." },
  { name: "icon", type: "IconComponent", description: "An icon beside the label." },
  { name: "iconPosition", type: '"start" | "end"', default: "start", description: 'Before the label, or after it (the × on "Remove the Files filter").' },
  { name: "emphasis", type: "string", description: 'A word inside label to set in the strong weight ("invoice" in "Did you mean invoice?").' },
];

const TRIGGER_PROPS = [
  { name: "placeholder", type: "string", default: '"Search or jump to…"', description: "The text in the pill." },
  { name: "shortcut", type: "string[]", default: '["⌘", "K"]', description: "The key caps on the right." },
  { name: "onClick", type: "() => void", description: "Open your CommandMenu. It also takes every button prop and a ref." },
];

const ANSWER_PROPS = [
  { name: "children", type: "ReactNode", description: "The answer text. A plain string when stream is on." },
  { name: "title", type: "string", default: '"SakaniUI AI"', description: "The header text, beside the SakaniUI mark." },
  { name: "status", type: "string", description: 'e.g. "Thought for 2.4s". With stream it appears once the text has been written.' },
  { name: "stream", type: "boolean", description: "Writes the answer in word by word, the way a chat reply arrives, and brings in the sources and the follow-up once it is written. Reduced motion shows it at once." },
  { name: "onStreamEnd", type: "() => void", description: "Called once when the text has been written (or at once when it is not streamed). Use it to show related results." },
  { name: "sources", type: "{ label, icon? }[]", description: "Chips under the answer." },
  { name: "onFollowUp", type: "() => void", description: 'Adds an "Ask a follow-up" button.' },
  { name: "onOpenInChat", type: "() => void", description: 'Adds an "Open in chat" hint with ⌘↵.' },
  { name: "onCopy", type: "() => void", description: "Adds a copy button to the header." },
];

const KEYS = [
  ["⌘K  /  Ctrl K", "Open the menu (the hotkey prop changes the key)."],
  ["↑  ↓", "Move the highlight over the results."],
  ["Home  End", "Jump to the first or last result while the field is empty."],
  ["↵", "Choose the highlighted row."],
  ["⌘↵", "Ask AI with the text in the field (with onAskAI), from any scope."],
  ["Tab  /  Shift Tab", "Switch scope."],
  ["⌫ in an empty field", "Remove the last filter token."],
  ["key:value then space", "Turn the text into a filter token (for the keys in filterKeys)."],
  ["esc", "Clear the query; press again to close."],
];

const MOTION = [
  ["Open and close", "The panel rises and fades in over the backdrop; closing is quicker (160ms)."],
  ["Highlight", "One highlight glides between rows as you move, instead of each row lighting up on its own."],
  ["Results", "Groups settle in as you type; the matched letters take the strong weight."],
  ["Ask AI", "Nothing is answered until you ask. Then a Chain of Thought works, folds shut, and the answer card lands."],
  ["The answer", "It is written in word by word, with a breath at each comma and a longer one at each full stop; then the sources fan out and the follow-up arrives."],
  ["The light", "A soft light travels around the answer card's border and stays until the whole response has arrived, then fades."],
  ["No results", "A magnifier sweeps over a feed of placeholder rows."],
  ["Reduced motion", "Everything is instant: no glide, no streaming, no light."],
];

export default function CommandMenuPage() {
  return (
    <article>
      <PageHeader
        title="Command Menu"
        description="A ⌘K search and command palette: a field, scope tabs, grouped results, filter tokens and a preview pane, the states a real search needs, and an Ask AI mode that thinks before it answers."
      />

      <div className="space-y-10">
        <section>
          <p className="mb-3 text-sm text-ink-muted">
            Open it, type to filter, and move with ↑ ↓ over one gliding highlight. You own the data and the actions: pass{" "}
            <code>groups</code> of <code>items</code> and handle <code>onSelect</code>. The menu opens in a layer above the page and
            follows the theme of the area it is in.
          </p>
          <ComponentPreview code={BASIC}>
            <BasicDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Opening it</h2>
          <p className="mb-3 text-sm text-ink-muted">
            It listens for <kbd>⌘K</kbd> (<kbd>Ctrl K</kbd>) wherever it is mounted. The <code>CommandMenuTrigger</code> pill is the
            button that opens it from a top bar or sidebar. Mount one menu per page: two with the same hotkey would open together.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-line-subtle bg-surface p-4 text-[13px] leading-relaxed text-ink-muted">{HOTKEY}</pre>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Simple</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>variant=&quot;simple&quot;</code> drops the scopes and the workspace footer: the field, one group and the key hints.
          </p>
          <ComponentPreview code={SIMPLE_CODE}>
            <SimpleDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Scopes and filter tokens</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>scopes</code> are the tabs under the field; an item belongs to the scope of its <code>type</code> unless it names its own.
            Filters are tokens in the field. They keep the items whose <code>tags</code> contain the token&apos;s value, and typing{" "}
            <code>team:Design</code> and a space makes one for any key in <code>filterKeys</code>.
          </p>
          <ComponentPreview code={FILTERS_CODE}>
            <FiltersDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Preview pane</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>renderPreview</code> adds a detail pane for the active row; return <code>null</code> for rows with nothing to show and{" "}
            <code>previewEmpty</code> fills the gap. <code>previewActions</code> stay pinned at the bottom while the content above
            cross-fades from row to row.
          </p>
          <ComponentPreview code={PREVIEW_CODE}>
            <PreviewDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Ask AI</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The <code>answer</code> slot takes a Chain of Thought and a <code>CommandMenuAnswer</code>. It behaves the way a chat reply
            does: with an empty field there is no answer, only suggested questions. Pick one, or type your own and press <kbd>↵</kbd>
            (<kbd>⌘↵</kbd> works from any scope), and it thinks, folds the thinking shut, and writes the answer in. Change the question
            and the answer goes, because it belongs to the question in the box. The menu displays; your agent supplies the steps and the
            text (this demo is scripted, and answers questions about dark mode and themes).
          </p>
          <ComponentPreview code={ASK_CODE}>
            <AskAIDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Answer card</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>CommandMenuAnswer</code> can be used on its own. With <code>stream</code> it writes a plain-string answer in word by word
            and calls <code>onStreamEnd</code> when it is done; the sources and the follow-up arrive after the text. A soft light travels
            around the card&apos;s border until the whole response is there.
          </p>
          <ComponentPreview code={ANSWER_CODE}>
            <AnswerDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Loading, error and no results</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A search never ends in a dead end. An empty result can offer a fix (<code>suggestions</code>) and a way on (
            <code>fallbackGroups</code>, navigable like any group); an error has a retry and a quieter report, and can still show what to
            open instead.
          </p>
          <ComponentPreview code={STATES_CODE}>
            <StatesDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Results from a server</h2>
          <p className="mb-3 text-sm text-ink-muted">
            By default the menu filters the groups you pass. When your server does the searching, set <code>filter=&#123;false&#125;</code> so
            it shows exactly what you give it, and drive <code>state</code> from the request. This demo waits 450ms before it answers.
          </p>
          <ComponentPreview code={SERVER_CODE}>
            <ServerDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Trigger</h2>
          <p className="mb-3 text-sm text-ink-muted">The pill for a top bar or sidebar. It only opens the menu: give it <code>onClick</code>.</p>
          <ComponentPreview code={TRIGGER_CODE}>
            <TriggerDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Keyboard</h2>
          <DocTable headers={["Keys", "What happens"]} rows={KEYS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Dark mode and glass</h2>
          <p className="text-sm text-ink-muted">
            The menu reads the semantic and Surface tokens, so it follows light and dark by itself. It is drawn in a layer above the page,
            and takes the theme of the nearest <code>.dark</code> area it is mounted in. Inside a <code>data-surface=&quot;glass&quot;</code> area the
            panel, rows and footer take the glass tokens. The Ask AI mark is the SakaniUI arc in the text colour, so it is white in dark
            mode.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Motion</h2>
          <DocTable headers={["Moment", "What happens"]} rows={MOTION} mono={[]} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>It is a modal dialog with an accessible name (<code>aria-label</code>); focus moves to the field when it opens and goes back to what opened it when it closes.</li>
            <li>The field is a combobox over a listbox; the highlighted row is announced through <code>aria-activedescendant</code>, so focus never leaves the field.</li>
            <li>Scopes are a tab list. Loading, no-results and error messages are announced, and the answer card is marked busy while it is being written.</li>
            <li>Every action has a key: ↑ ↓, ↵, ⌘↵, Tab, esc. Nothing needs a pointer.</li>
            <li>Reduced motion makes the panel, the highlight, the thinking and the streamed answer instant, and the light does not run.</li>
          </ul>
        </section>

        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenu props</h2><PropsTable rows={MENU_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenuItem</h2><PropsTable rows={ITEM_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenuGroup</h2><PropsTable rows={GROUP_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenuScope</h2><PropsTable rows={SCOPE_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenuFilter</h2><PropsTable rows={FILTER_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenuSuggestion</h2><PropsTable rows={SUGGESTION_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenuTrigger props</h2><PropsTable rows={TRIGGER_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">CommandMenuAnswer props</h2><PropsTable rows={ANSWER_PROPS} /></section>
      </div>

      <Pager current="/docs/components/command-menu" />
    </article>
  );
}
