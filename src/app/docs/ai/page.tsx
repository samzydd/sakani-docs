import { PageHeader } from "@/components/docs/page-header";
import { CodeBlock } from "@/components/code-block";
import { Pager } from "@/components/docs/pager";

export const metadata = {
  title: "AI & MCP",
  description:
    "Use Sakani UI with AI assistants: a generated machine-readable manifest of every component, prop and token, an AGENTS.md guide, and a local MCP server for Claude Code, Cursor and other editors.",
};

const MCP_CONFIG = `{
  "mcpServers": {
    "sakaniui": {
      "command": "npx",
      "args": ["-y", "@sakaniui/mcp"]
    }
  }
}`;

const DOCTOR = `npx -y @sakaniui/mcp --doctor`;

const WINDOWS_CONFIG = `{
  "mcpServers": {
    "sakaniui": {
      "command": "cmd",
      "args": ["/c", "npx", "-y", "@sakaniui/mcp"]
    }
  }
}`;

const SKILL_INSTALL = `mkdir -p .claude/skills/sakaniui
curl -fsSL https://raw.githubusercontent.com/samzydd/Sakaniui/main/skills/sakaniui/SKILL.md \\
  -o .claude/skills/sakaniui/SKILL.md`;

const SKILL_FROM_PACKAGE = `mkdir -p .claude/skills
cp -r node_modules/@sakaniui/react/skills/sakaniui .claude/skills/`;

const CLAUDE_CODE = `claude mcp add sakaniui -- npx -y @sakaniui/mcp`;

const MANIFEST_USE = `import manifest from '@sakaniui/react/manifest.json';

const button = manifest.components.find((c) => c.name === 'Button');
button.props;                    // name, type, values, default, required, description
button.contract.requiredProps;   // ['children']`;

const MANIFEST_SHAPE = `{
  "name": "IconButton",
  "kind": "component",
  "category": "Core",
  "import": "@sakaniui/react",
  "summary": "...",
  "props": [
    { "name": "icon", "type": "IconComponent", "required": true },
    { "name": "variant", "type": "\\"destructive\\" | \\"primary\\" | ...", "values": ["destructive", "primary"], "default": "primary", "required": false },
    { "name": "aria-label", "type": "string", "required": true }
  ],
  "since": "0.1.0",
  "contract": { "requiredProps": ["icon", "aria-label"], "requiresAccessibleName": true }
}`;

export default function AiPage() {
  return (
    <article>
      <PageHeader
        title="AI & MCP"
        description="Sakani UI is built to be used by AI assistants as well as people: a contract they can read, and a server they can ask."
      />

      <div className="doc-prose">
        <h2>The manifest</h2>
        <p>
          <a href="/manifest.json">sakaniui.com/manifest.json</a> (also shipped as{" "}
          <code>@sakaniui/react/manifest.json</code>) lists every exported component and block with its
          import path, props, types, allowed values, defaults and required props, plus every design token.
          It is generated from the TypeScript source on each build, so it always matches the installed
          version. If a prop, value or token is not in it, it does not exist.
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={MANIFEST_USE} lang="ts" />
      </div>
      <div className="doc-prose">
        <p>
          <code>requiresAccessibleName</code> is true when a required prop (an <code>aria-label</code> or
          alt text) is the only thing that names the control. An assistant must not drop it.
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={MANIFEST_SHAPE} lang="json" />
      </div>

      <div className="doc-prose">
        <h2>The MCP server</h2>
        <p>
          <code>@sakaniui/mcp</code> is a small Model Context Protocol server. It is its own package (about
          200 kB, no dependencies), so it starts in a couple of seconds and does not install the component
          library. It runs locally and answers for the version installed in your project. Add it to your
          editor&apos;s MCP config (Cursor, Windsurf, Claude Desktop, ...):
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={MCP_CONFIG} lang="json" />
      </div>
      <div className="doc-prose">
        <p>In Claude Code:</p>
      </div>
      <div className="mt-4">
        <CodeBlock code={CLAUDE_CODE} lang="bash" />
      </div>
      <div className="doc-prose">
        <p>
          On Windows, <code>npx</code> is a <code>.cmd</code> script, so launch it through{" "}
          <code>cmd /c</code>: use <code>&quot;command&quot;: &quot;cmd&quot;, &quot;args&quot;: [&quot;/c&quot;, &quot;npx&quot;, &quot;-y&quot;, &quot;@sakaniui/mcp&quot;]</code>, or in
          Claude Code <code>claude mcp add sakaniui -- cmd /c npx -y @sakaniui/mcp</code>. It needs Node.js 18
          or later. To check it is connected, open your editor&apos;s MCP list (<code>/mcp</code> in Claude Code):{" "}
          <code>sakaniui</code> should show 10 tools.
        </p>
      </div>
      <div className="doc-prose">
        <h3>Tools</h3>
        <ul>
          <li><code>search_components</code>: find a component or block by what you need, in the words you would normally use: &ldquo;dialog&rdquo; finds <code>Modal</code>, &ldquo;snackbar&rdquo; finds <code>Toast</code>, &ldquo;date picker&rdquo; finds <code>Calendar</code>. A name that does not exist gets the real one back, not a guess.</li>
          <li><code>get_component</code>: the full contract for one component: every prop, the fields of object props (<code>shape</code>), a ready-to-paste <code>example</code> that is type-checked against the release, and <code>recipes</code> for patterns the types alone do not teach.</li>
          <li><code>search_icons</code>: finds real icon names by meaning (&ldquo;delete&rdquo; gives <code>IconTrash</code>), so an assistant never guesses one.</li>
          <li><code>search_emoji</code>: finds real emoji names by meaning (&ldquo;party&rdquo; gives <code>EmojiPartyPopper</code>), rendered as elements from <code>@sakaniui/react/emoji</code>.</li>
          <li><code>check_code</code>: checks a whole snippet before it is shown to you: imports, required props, allowed values, icon props passed as <code>icon=&#123;IconTrash&#125;</code>, and the field names inside inline object props such as table columns. The code is read as text, never run.</li>
          <li><code>list_components</code>: browse everything, filtered by kind or category.</li>
          <li><code>get_tokens</code>: the design tokens that exist, filtered by group.</li>
          <li><code>check_usage</code>: validates the props you are about to use: missing required props, values outside an enum, props that do not exist.</li>
          <li><code>get_guide</code>: sections of the AGENTS.md guide, such as &ldquo;When nothing fits&rdquo;.</li>
          <li><code>check_compatibility</code>: compares the version the reference describes with the one installed in your project, and lists the components your version does not have yet.</li>
          <li><code>get_changelog</code>: the release notes for a version, or for every release since the one you have.</li>
        </ul>
      </div>

      <div className="doc-prose">
        <h2>It matches your version</h2>
        <p>
          <code>npx</code> may fetch a newer release than the one your project uses, so the server finds the
          <code> @sakaniui/react</code> installed in your project (from the folder it runs in, or{" "}
          <code>--project &lt;dir&gt;</code>) and answers for that version. Every component carries{" "}
          <code>since</code>, the first release that contained it, so a component your version does not have
          is flagged <code>availableInInstalled: false</code> and <code>check_usage</code> rejects it, instead
          of an assistant suggesting something that is not there yet.
        </p>
        <h2>It is read-only</h2>
        <p>
          The server reads five fixed files from an install (<code>package.json</code>, the manifest, the icon
          index, <code>AGENTS.md</code> and <code>CHANGELOG.md</code>). It writes nothing, runs nothing, opens no
          network connection and takes no file paths, and every tool is marked read-only. Every tool argument is
          type- and length-checked.
        </p>
        <h2>It is checked against the build</h2>
        <p>
          The build fails, and so does <code>npm publish</code>, if the manifest disagrees with the library: an
          export that is not described, a prop that is not in the type definitions, an example that does not
          type-check, an icon name that does not exist, a token that is not defined in <code>tokens.css</code>, or
          anything that looks like a private reference.
        </p>
      </div>

      <div className="doc-prose">
        <h2>The guide</h2>
        <p>
          The manifest says what exists; <code>AGENTS.md</code> says why and when not to use it. Read it at{" "}
          <a href="/llms-full.txt">/llms-full.txt</a>, or index everything from <a href="/llms.txt">/llms.txt</a>.
        </p>
      </div>

      <div className="doc-prose" id="skill">
        <h2>The skill</h2>
        <video
          className="my-6 w-full rounded-xl border border-line-subtle"
          src="/marketing/sakaniui-skill-terminal.mp4"
          poster="/marketing/sakaniui-skill-terminal-poster.png"
          autoPlay
          muted
          loop
          playsInline
          aria-label="A terminal adds the SakaniUI MCP server, copies the skill into .claude/skills, and ends with: Claude now builds with SakaniUI."
        />
        <p>
          The MCP server answers questions; a skill is what makes an assistant ask them. It is one short file,{" "}
          <code>SKILL.md</code>, that your assistant loads when you ask for an interface in a project that uses
          SakaniUI. The format is the open <a href="https://agentskills.io" target="_blank" rel="noreferrer">Agent Skills</a>{" "}
          standard, so it is not tied to one product: Claude Code, Cursor and other skills-compatible agents
          read the same file. It does not repeat any component facts, so it cannot go stale. It tells the assistant to
          check your installed version, import both stylesheets, look components, icons and emoji up
          instead of guessing, style with tokens, and run <code>check_code</code> before answering, and it points at the
          server, the manifest and <code>AGENTS.md</code> as the sources of truth.
        </p>
        <p>
          Install it for one project (Claude Code and the Claude app read <code>.claude/skills/</code>, and Cursor
          documents that it reads that folder too; use <code>~/.claude/skills/</code> to have it in every project). Other
          tools keep skills in their own folder, so copy the same <code>sakaniui</code> folder to wherever your tool
          looks:
        </p>
        <CodeBlock code={SKILL_INSTALL} lang="bash" />
        <p>
          From 0.10.1 it also ships inside the package, so it versions with the library:
        </p>
        <CodeBlock code={SKILL_FROM_PACKAGE} lang="bash" />
        <p>
          It is optional. The server and <code>AGENTS.md</code> work without it; the skill only saves you from
          having to say &ldquo;use SakaniUI&rsquo;s tools&rdquo; in every prompt.
        </p>
      </div>

      <div className="doc-prose" id="troubleshooting">
        <h2>Troubleshooting</h2>
        <p>
          Run this in a terminal first. It checks Node, the data, the tools and your project, and prints a report
          you can paste when asking for help:
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={DOCTOR} lang="bash" />
      </div>
      <div className="doc-prose">
        <ul>
          <li>
            <strong><code>spawn npx ENOENT</code>, or the editor cannot start it.</strong> Desktop editors often start
            with a smaller <code>PATH</code> than your terminal (common with nvm and Homebrew). Use the full path: run{" "}
            <code>which npx</code> (macOS and Linux) or <code>where npx</code> (Windows) and put that in{" "}
            <code>&quot;command&quot;</code>, for example <code>/opt/homebrew/bin/npx</code>.
          </li>
          <li>
            <strong>Windows.</strong> <code>npx</code> is a <code>.cmd</code> script, so launch it through <code>cmd /c</code>:
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <CodeBlock code={WINDOWS_CONFIG} lang="json" />
      </div>
      <div className="doc-prose">
        <ul>
          <li>
            <strong>It connects, but tool calls fail.</strong> Node older than 16.9 (fixed in 0.8.13). Node 18 or later is
            supported; check with <code>node --version</code> and update from nodejs.org.
          </li>
          <li>
            <strong>Times out on the first start.</strong> The first run downloads about 200 kB. Run{" "}
            <code>npx -y @sakaniui/mcp --version</code> once in a terminal to warm the cache, then restart the editor.
          </li>
          <li>
            <strong>Behind a company proxy or private npm registry.</strong> The machine must reach{" "}
            <code>registry.npmjs.org</code> (see <code>npm config get registry</code>), and <code>@sakaniui/*</code> packages
            must be allowed.
          </li>
          <li>
            <strong>Odd <code>npx</code> errors, or an old version keeps running.</strong> Delete the <code>_npx</code> folder
            inside your npm cache (find it with <code>npm config get cache</code>) and restart the editor.
          </li>
          <li>
            <strong>Added it but no tools appear.</strong> Restart the editor. In Claude Code run <code>/mcp</code> and look
            for <code>sakaniui</code> with 10 tools.
          </li>
          <li>
            <strong><code>Failed to connect</code> after typing the command by hand.</strong> Check the package name for a
            full-width <code>＠</code> or other stray characters; copy the command from this page instead.
          </li>
        </ul>
        <p>
          Still stuck? Open an issue at{" "}
          <a href="https://github.com/samzydd/Sakaniui/issues">github.com/samzydd/Sakaniui/issues</a> and paste the output
          of <code>--doctor</code>, your editor, and your operating system.
        </p>
      </div>

      <Pager current="/docs/ai" />
    </article>
  );
}
