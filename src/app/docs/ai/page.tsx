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
          <li><code>search_components</code>: find a component or block by what you need, e.g. &ldquo;date picker&rdquo;.</li>
          <li><code>get_component</code>: the full contract for one component: every prop, the fields of object props (<code>shape</code>), a ready-to-paste <code>example</code> that is type-checked against the release, and <code>recipes</code> for patterns the types alone do not teach.</li>
          <li><code>search_icons</code>: finds real icon names by meaning (&ldquo;delete&rdquo; gives <code>IconTrash</code>), so an assistant never guesses one.</li>
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

      <Pager current="/docs/ai" />
    </article>
  );
}
