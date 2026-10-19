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
      "args": ["-y", "-p", "@sakaniui/react", "sakaniui-mcp"]
    }
  }
}`;

const CLAUDE_CODE = `claude mcp add sakaniui -- npx -y -p @sakaniui/react sakaniui-mcp`;

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
          The package includes a small Model Context Protocol server. It runs locally, has no
          dependencies and answers from the installed version. Add it to your editor&apos;s MCP config
          (Cursor, Windsurf, Claude Desktop, ...):
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
        <h3>Tools</h3>
        <ul>
          <li><code>search_components</code>: find a component or block by what you need, e.g. &ldquo;date picker&rdquo;.</li>
          <li><code>get_component</code>: the full contract for one component before writing JSX.</li>
          <li><code>list_components</code>: browse everything, filtered by kind or category.</li>
          <li><code>get_tokens</code>: the design tokens that exist, filtered by group.</li>
          <li><code>check_usage</code>: validates the props you are about to use: missing required props, values outside an enum, props that do not exist.</li>
          <li><code>get_guide</code>: sections of the AGENTS.md guide, such as &ldquo;When nothing fits&rdquo;.</li>
        </ul>
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
