"use client";

import { useEffect, useState } from "react";
import {
  Button, ChainOfThought, ChainOfThoughtStep, SourceLogo, SourceStack, WorkingIndicator, sourceLogo, sourceLogoNames,
} from "@sakaniui/react";
import { EmojiLightBulb, EmojiMagnifyingGlassTiltedLeft, EmojiPageFacingUp } from "@sakaniui/react/emoji";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { DocTable } from "@/components/docs/doc-table";
import { Pager } from "@/components/docs/pager";

const X = sourceLogo("x");
const Reddit = sourceLogo("reddit");
const Google = sourceLogo("google");
const HackerNews = sourceLogo("hackernews");

const SOURCES = [
  { label: "Reddit", icon: Reddit },
  { label: "LinkedIn", icon: sourceLogo("linkedin") },
  { label: "GitHub", icon: sourceLogo("github") },
  { label: "Product Hunt", icon: sourceLogo("producthunt") },
];

/* ------------------------------------------------------------------ */
/* Code samples                                                        */
/* ------------------------------------------------------------------ */

const BASIC = `import { ChainOfThought, ChainOfThoughtStep, SourceStack, sourceLogo } from '@sakaniui/react';
import { EmojiLightBulb, EmojiPageFacingUp } from '@sakaniui/react/emoji';

<ChainOfThought title="Ran 3 searches" status="done" elapsed={11.2}>
  <ChainOfThoughtStep icon={EmojiLightBulb} label="Planning the search" count="3 angles" />
  <ChainOfThoughtStep
    icon={sourceLogo('x')}
    label="Searched X for"
    query="design system pricing"
    count="7 posts"
  />
  <ChainOfThoughtStep
    icon={sourceLogo('reddit')}
    label="Searched Reddit for"
    query="r/reactjs worth paying for"
    count="12 threads"
    sources={<SourceStack sources={[{ label: 'Reddit', icon: sourceLogo('reddit') }]} />}
  />
  <ChainOfThoughtStep icon={EmojiPageFacingUp} label="Reading the strongest three threads" />
</ChainOfThought>`;

const LIVE = `const [steps, setSteps] = useState<Step[]>([]);
const [done, setDone] = useState(false);
const [startedAt] = useState(() => Date.now());

// as your agent starts each tool call, append a step; when its results land, give it a count
// and mark the step before it done. Only the last step is 'active'.
<ChainOfThought
  title={done ? 'Ran 3 searches' : 'Researching'}
  status={done ? 'done' : 'working'}
  startedAt={startedAt}   // the working line counts up on its own
  elapsed={done ? finishedIn : undefined}
>
  {steps.map((s, i) => (
    <ChainOfThoughtStep
      key={s.id}
      status={!done && i === steps.length - 1 ? 'active' : 'done'}
      icon={s.icon}
      label={s.label}
      query={s.query}
      count={s.count}
    />
  ))}
</ChainOfThought>`;

const STATES = `<ChainOfThoughtStep status="done" icon={sourceLogo('x')} label="Searched X for" query="design system pricing" count="7 posts" />
<ChainOfThoughtStep status="active" icon={sourceLogo('reddit')} label="Searched Reddit for" query="r/reactjs worth paying for" count="12 threads" />
<ChainOfThoughtStep status="pending" icon={sourceLogo('hackernews')} label="Searching Hacker News for" query="design system" />`;

const ICONS = `import { sourceLogo } from '@sakaniui/react';
import { EmojiLightBulb, EmojiPageFacingUp } from '@sakaniui/react/emoji';
import { IconSearch } from '@sakaniui/react/icons';

<ChainOfThoughtStep icon={sourceLogo('google')} label="Searched Google for" query="design tokens" />  // a site's real logo
<ChainOfThoughtStep icon={EmojiLightBulb} label="Planning the search" />                          // an emoji, for steps with no site
<ChainOfThoughtStep icon={IconSearch} label="Searched the docs" />                                 // or any icon

// the logo on its own
<SourceLogo name="reddit" size={20} />`;

const SOURCES_CODE = `<ChainOfThoughtStep
  icon={sourceLogo('google')}
  label="Searched Google for"
  query="design system pricing 2026"
  count="10 results"
  sources={<SourceStack sources={[
    { label: 'Google', icon: sourceLogo('google') },
    { label: 'Product Hunt', icon: sourceLogo('producthunt') },
    { label: 'Medium', icon: sourceLogo('medium') },
    { label: 'Wikipedia', icon: sourceLogo('wikipedia') },
  ]} />}
  onSourcesClick={() => openSources()}   // makes the row a button with a chevron
/>`;

const WORKING_CODE = `<WorkingIndicator status="working" startedAt={startedAt} />   // sparkle, shimmering label, time counts up
<WorkingIndicator status="done" elapsed={11.2} />            // check and "Worked for 11.2s"
<WorkingIndicator status="working" label="Reading" elapsed={4.2} />`;

const CONTROLLED = `const [open, setOpen] = useState(true);

<ChainOfThought title="Ran 3 searches" open={open} onOpenChange={setOpen} status="done" elapsed={11.2}>
  …
</ChainOfThought>`;

const MCP_CODE = `// the agent's own tool calls map straight onto steps
for await (const event of agent.stream(prompt)) {
  if (event.type === 'tool_start')
    setSteps((s) => [...s, { id: event.id, icon: iconFor(event.tool), label: labelFor(event), query: event.input }]);
  if (event.type === 'tool_result')
    setSteps((s) => s.map((x) => (x.id === event.id ? { ...x, count: \`\${event.results.length} results\` } : x)));
}
setDone(true);`;

/* ------------------------------------------------------------------ */
/* Demos                                                               */
/* ------------------------------------------------------------------ */

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-[560px]">{children}</div>;
}

const SCRIPT = [
  { icon: EmojiLightBulb, label: "Planning the search", count: "3 angles", ms: 1300 },
  { icon: Google, label: "Searched Google for", query: "design system pricing 2026", count: "10 results", ms: 1900,
    sources: [{ label: "Google", icon: Google }, { label: "Product Hunt", icon: sourceLogo("producthunt") }, { label: "Medium", icon: sourceLogo("medium") }, { label: "Wikipedia", icon: sourceLogo("wikipedia") }] },
  { icon: X, label: "Searched X for", query: "paid design systems", count: "7 posts", ms: 1800 },
  { icon: Reddit, label: "Searched Reddit for", query: "r/reactjs worth paying for", count: "12 threads", ms: 2200,
    sources: [{ label: "Reddit", icon: Reddit }, { label: "Hacker News", icon: HackerNews }, { label: "Stack Overflow", icon: sourceLogo("stackoverflow") }] },
  { icon: EmojiPageFacingUp, label: "Reading the strongest three threads", ms: 2400 },
];

/** A simulated agent run: each step arrives and works, its results land, the next step starts, then it finishes. */
function LiveRun() {
  const [run, setRun] = useState(0);
  const [shown, setShown] = useState(0);
  const [landed, setLanded] = useState(0);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [finishedIn, setFinishedIn] = useState<number | undefined>();
  useEffect(() => {
    const start = Date.now();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShown(0); setLanded(0); setFinishedIn(undefined); setStartedAt(start);
    const timers: ReturnType<typeof setTimeout>[] = [];
    let at = 700;
    SCRIPT.forEach((s, i) => {
      timers.push(setTimeout(() => setShown(i + 1), at));
      at += s.ms;
      timers.push(setTimeout(() => setLanded(i + 1), at));
      at += 450;
    });
    timers.push(setTimeout(() => setFinishedIn((Date.now() - start) / 1000), at - 200));
    return () => timers.forEach(clearTimeout);
  }, [run]);
  const done = finishedIn != null;
  return (
    <Frame>
      <ChainOfThought
        title={done ? `Ran ${SCRIPT.filter((s) => s.query).length} searches` : "Researching"}
        icon={EmojiMagnifyingGlassTiltedLeft}
        status={done ? "done" : "working"}
        startedAt={startedAt}
        elapsed={finishedIn}
      >
        {SCRIPT.slice(0, shown).map((s, i) => (
          <ChainOfThoughtStep
            key={`${run}-${s.label}`}
            status={!done && i === shown - 1 && landed < shown ? "active" : "done"}
            icon={s.icon}
            label={s.label}
            query={s.query}
            count={i < landed ? s.count : undefined}
            sources={i < landed && s.sources ? <SourceStack sources={s.sources} /> : undefined}
            onSourcesClick={s.sources ? () => {} : undefined}
          />
        ))}
      </ChainOfThought>
      <div className="mt-4"><Button variant="secondary" size="sm" onClick={() => setRun((n) => n + 1)}>Replay</Button></div>
    </Frame>
  );
}

function Finished() {
  return (
    <Frame>
      <ChainOfThought title="Ran 3 searches" icon={EmojiMagnifyingGlassTiltedLeft} status="done" elapsed={11.2}>
        <ChainOfThoughtStep icon={EmojiLightBulb} label="Planning the search" count="3 angles" />
        <ChainOfThoughtStep icon={X} label="Searched X for" query="design system pricing" count="7 posts" />
        <ChainOfThoughtStep icon={Reddit} label="Searched Reddit for" query="r/reactjs worth paying for" count="12 threads" sources={<SourceStack sources={SOURCES.slice(0, 3)} />} onSourcesClick={() => {}} />
        <ChainOfThoughtStep icon={EmojiPageFacingUp} label="Reading the strongest three threads" />
      </ChainOfThought>
    </Frame>
  );
}

function States() {
  return (
    <Frame>
      <ChainOfThought title="Step states">
        <ChainOfThoughtStep status="done" icon={X} label="Searched X for" query="design system pricing" count="7 posts" />
        <ChainOfThoughtStep status="active" icon={Reddit} label="Searched Reddit for" query="r/reactjs worth paying for" count="12 threads" />
        <ChainOfThoughtStep status="pending" icon={HackerNews} label="Searching Hacker News for" query="design system" />
      </ChainOfThought>
    </Frame>
  );
}

function Icons() {
  return (
    <Frame>
      <ChainOfThought title="Icons, emoji and logos">
        <ChainOfThoughtStep icon={Google} label="Searched Google for" query="design tokens" />
        <ChainOfThoughtStep icon={EmojiLightBulb} label="Planning the search" />
        <ChainOfThoughtStep icon={EmojiPageFacingUp} label="Reading the docs" />
      </ChainOfThought>
      <div className="mt-5 flex items-center gap-3 text-sm text-ink-muted">
        <SourceLogo name="reddit" size={20} /> <SourceLogo name="github" size={20} /> <SourceLogo name="youtube" size={20} />
        <span>on their own: <code>{'<SourceLogo name="reddit" />'}</code></span>
      </div>
    </Frame>
  );
}

function SourcesDemo() {
  return (
    <Frame>
      <ChainOfThought title="Sources">
        <ChainOfThoughtStep
          icon={Google} label="Searched Google for" query="design system pricing 2026" count="10 results"
          sources={<SourceStack sources={SCRIPT[1].sources!} />} onSourcesClick={() => {}}
        />
      </ChainOfThought>
    </Frame>
  );
}

function WorkingDemo() {
  return (
    <div className="flex flex-col gap-4">
      <WorkingIndicator status="working" elapsed={6.5} />
      <WorkingIndicator status="done" elapsed={11.2} />
    </div>
  );
}

function ControlledDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Frame>
      <ChainOfThought title="Ran 3 searches" open={open} onOpenChange={setOpen} status="done" elapsed={11.2}>
        <ChainOfThoughtStep icon={X} label="Searched X for" query="design system pricing" count="7 posts" />
        <ChainOfThoughtStep icon={Reddit} label="Searched Reddit for" query="r/reactjs worth paying for" count="12 threads" />
      </ChainOfThought>
      <p className="mt-3 text-xs text-ink-muted">Open: {String(open)}</p>
    </Frame>
  );
}

function LogoGallery() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
      {sourceLogoNames.map((name) => (
        <div key={name} className="flex items-center gap-2.5 rounded-lg border border-line-subtle px-3 py-2 text-sm text-ink">
          <SourceLogo name={name} size={20} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tables                                                              */
/* ------------------------------------------------------------------ */

const COT_PROPS = [
  { name: "title", type: "ReactNode", description: 'The header text, e.g. "Ran 3 searches" or "Thinking".' },
  { name: "icon", type: "IconComponent", default: "search icon", description: "The header icon, drawn at 16px. An icon, an emoji or a logo." },
  { name: "open / defaultOpen", type: "boolean", default: "true", description: "Controlled or initial open state. The header toggles it." },
  { name: "onOpenChange", type: "(open) => void", description: "Called with the new state when the header is clicked." },
  { name: "status", type: '"working" | "done"', description: 'Adds the working line under the steps: "working" (sparkle, shimmer) or "done" ("Worked for 11.2s"). Omit it for no line.' },
  { name: "elapsed", type: "number", description: "Elapsed seconds for the working line." },
  { name: "startedAt", type: "number", description: "Epoch ms when the work started; the working line then counts up on its own." },
  { name: "children", type: "ReactNode", description: "ChainOfThoughtStep elements." },
];

const STEP_PROPS = [
  { name: "status", type: '"pending" | "active" | "done"', default: "done", description: "pending (not started, grey), active (in progress, read in full) or done (muted)." },
  { name: "icon", type: "IconComponent", default: "search icon", description: "The step's icon, drawn at 16px: a Sakani icon, an emoji or sourceLogo('reddit')." },
  { name: "label", type: "ReactNode", description: 'What happened, e.g. "Searched X for".' },
  { name: "query", type: "string", description: "The query or argument, shown in monospace after the label." },
  { name: "count", type: "ReactNode", description: 'A result count on the right, e.g. "7 posts". A leading number ticks up when it arrives.' },
  { name: "accent", type: "string", description: "Colour of the spark that runs into the step while it is active. Defaults to the icon's brand colour when it is a sourceLogo." },
  { name: "sources", type: "ReactNode", description: "A row under the step, usually a <SourceStack>." },
  { name: "sourcesLabel", type: "string", default: "Sources", description: "Text before the sources." },
  { name: "onSourcesClick", type: "() => void", description: "Makes the sources row a button with a chevron." },
];

const STACK_PROPS = [
  { name: "sources", type: "{ label, icon? }[]", description: "The sources, in order. Three to five read best. `label` is read out and shown as a tooltip; `icon` defaults to a globe." },
];

const WORKING_PROPS = [
  { name: "status", type: '"working" | "done"', default: "working", description: '"working" shows the sparkle and a shimmering label; "done" shows a check.' },
  { name: "label", type: "string", description: 'Replaces the default label ("Working" / "Worked for").' },
  { name: "elapsed", type: "number", description: "Elapsed seconds. Takes precedence over startedAt." },
  { name: "startedAt", type: "number", description: 'Epoch ms when the work started; while "working" the time ticks on its own.' },
];

const LOGO_PROPS = [
  { name: "name", type: "SourceLogoName", description: "Which site (see the list above)." },
  { name: "size", type: "number | string", default: "16", description: "Rendered size: px, or any CSS length." },
  { name: "title", type: "string", description: "Accessible name. Without it the logo is decorative, which is right next to a text label." },
];

const MOTION = [
  ["A step arrives", "Its row opens while the previous rail flows down into it and turns the corner; the icon lands, the label is written in, the query types itself, the count ticks up and the source chips fan out."],
  ["The active step", "A spark runs down the rail into it (in the logo's brand colour) and its icon beats as it lands."],
  ["Pending to active", "A pending step's icon is grey; it fades into colour when the step starts."],
  ["Working", "The label shimmers while the sparkle beside it, in the brand colour, turns and twinkles on the same beat."],
  ["Finished", "One sweep runs down the rail lighting each icon, then the check is drawn."],
  ["Open and close", "The chevron turns with a spring and the steps rise in turn."],
  ["Reduced motion", "Everything is instant: no spark, shimmer, sweep or tick-up."],
];

export default function ChainOfThoughtPage() {
  return (
    <article>
      <PageHeader
        title="Chain of Thought"
        description="A visible record of an AI agent's work: steps joined by a rail, each with an icon, a label, an optional query, a result count and its sources, plus a live Working line."
      />

      <div className="space-y-10">
        <section>
          <p className="mb-3 text-sm text-ink-muted">
            Press Replay to watch a run. A step you append fades in and its rail draws itself; its results land (the count ticks
            up and the sources fan out); the next step starts; and finishing sweeps the rail down to a check. It only displays:
            you stream the steps in as your agent works.
          </p>
          <ComponentPreview code={LIVE}>
            <LiveRun />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Basic</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A <code>ChainOfThought</code> holds <code>ChainOfThoughtStep</code>s. With <code>status=&quot;done&quot;</code> and the final{" "}
            <code>elapsed</code> it ends with &quot;Worked for 11.2s&quot;.
          </p>
          <ComponentPreview code={BASIC}>
            <Finished />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Step states</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Done steps read muted and the active one reads in full, so the eye lands on what is happening now. A pending step&apos;s
            icon is grey until it starts. Screen readers get each step&apos;s status.
          </p>
          <ComponentPreview code={STATES}>
            <States />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Logos, emoji and icons</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Make each step recognisable. Use the real logo of a site the agent searched, in its brand colour
            (<code>sourceLogo(&apos;reddit&apos;)</code>); an emoji for steps with no site (💡 planning, 📄 reading); or any icon. A
            logo whose brand colour is black (X, GitHub, Notion, Medium, Wikipedia) is drawn in the text colour, so it stays visible
            in dark mode.
          </p>
          <ComponentPreview code={ICONS}>
            <Icons />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Sources</h2>
          <p className="mb-3 text-sm text-ink-muted">
            A <code>SourceStack</code> of overlapping site chips shows where a step&apos;s results came from. Add{" "}
            <code>onSourcesClick</code> to make the row a button with a chevron.
          </p>
          <ComponentPreview code={SOURCES_CODE}>
            <SourcesDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Working indicator</h2>
          <p className="mb-3 text-sm text-ink-muted">
            The line under the steps: a sparkle and a shimmering &quot;Working&quot; with the elapsed time, or a check and &quot;Worked for&quot;. It
            is also exported on its own. Pass <code>startedAt</code> and the time counts up by itself.
          </p>
          <ComponentPreview code={WORKING_CODE}>
            <WorkingDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Controlled</h2>
          <p className="mb-3 text-sm text-ink-muted">Closed by default here. Pass <code>open</code> and <code>onOpenChange</code> to own the state.</p>
          <ComponentPreview code={CONTROLLED}>
            <ControlledDemo />
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Streaming from an agent</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Append a step when a tool call starts, give it its <code>count</code> when the results land, mark only the last step
            active, and give the container <code>status=&quot;working&quot;</code> with <code>startedAt</code>. When the run ends, switch to{" "}
            <code>status=&quot;done&quot;</code> and the final <code>elapsed</code>.
          </p>
          <pre className="overflow-x-auto rounded-xl border border-line-subtle bg-surface p-4 text-[13px] leading-relaxed text-ink-muted">{MCP_CODE}</pre>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Source logos</h2>
          <p className="mb-3 text-sm text-ink-muted">
            {sourceLogoNames.length} sites. Logos are trademarks of their owners and appear only to name where a result came from.
          </p>
          <LogoGallery />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Motion</h2>
          <DocTable headers={["Moment", "What happens"]} rows={MOTION} mono={[]} />
          <p className="mt-3 text-sm text-ink-muted">Only what arrives after the first render animates, so a finished run you reload does not replay.</p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Accessibility</h2>
          <ul className="list-disc space-y-1.5 pl-5 text-sm text-ink-muted">
            <li>The header is a button with <code>aria-expanded</code> and <code>aria-controls</code>; steps are a list, and each one announces its status (&quot;Done:&quot;, &quot;In progress:&quot;, &quot;Pending:&quot;).</li>
            <li>The active step has <code>aria-current=&quot;step&quot;</code>. The Working line is a live region; its ticking time is kept out of it.</li>
            <li>Text uses the muted foreground, which meets 4.5:1 on the surface in light and dark; only decorative icons are lighter.</li>
            <li>Logos and emoji are decorative next to a text label; give a <code>SourceStack</code> source a <code>label</code> so it is read out.</li>
            <li>Reduced motion makes every animation instant.</li>
          </ul>
        </section>

        <section><h2 className="mb-3 text-lg font-semibold text-ink">ChainOfThought props</h2><PropsTable rows={COT_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">ChainOfThoughtStep props</h2><PropsTable rows={STEP_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">SourceStack props</h2><PropsTable rows={STACK_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">WorkingIndicator props</h2><PropsTable rows={WORKING_PROPS} /></section>
        <section><h2 className="mb-3 text-lg font-semibold text-ink">SourceLogo props</h2><PropsTable rows={LOGO_PROPS} /></section>
      </div>

      <Pager current="/docs/components/chain-of-thought" />
    </article>
  );
}
