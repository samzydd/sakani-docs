import { PageHeader } from "@/components/docs/page-header";
import { CodeBlock } from "@/components/code-block";
import { Pager } from "@/components/docs/pager";

export const metadata = { title: "Installation" };

const INSTALL = `npm install @sakaniui/react`;

const TOKENS_IMPORT = `// app/layout.tsx (or your app's single entry point)
import '@sakaniui/react/tokens.css';`;

const USAGE = `import { Button } from '@sakaniui/react';

export function Example() {
  return <Button variant="primary">Click me</Button>;
}`;

const BLOCKS_IMPORT = `// blocks live on a separate subpath from components
import { PricingTableBlock } from '@sakaniui/react/blocks';`;

const DARK_MODE = `// toggle dark mode anywhere in your app
document.documentElement.classList.toggle('dark');`;

export default function InstallationPage() {
  return (
    <article>
      <PageHeader title="Installation" description="Get Sakani running in a fresh or existing React project." />

      <div className="doc-prose">
        <h2>1. Install the package</h2>
        <p>Sakani requires React 19 as a peer dependency.</p>
      </div>
      <div className="mt-4">
        <CodeBlock code={INSTALL} lang="bash" />
      </div>

      <div className="doc-prose">
        <h2>2. Import the tokens once</h2>
        <p>
          Every component references CSS variables for color, spacing, radius, and
          shadow — <code>tokens.css</code> is what actually defines them. Import it
          exactly once, at your app&apos;s root, before any component renders.
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={TOKENS_IMPORT} lang="tsx" />
      </div>

      <div className="doc-prose">
        <h2>3. Import a component</h2>
        <p>Components are named exports from the package root.</p>
      </div>
      <div className="mt-4">
        <CodeBlock code={USAGE} lang="tsx" />
      </div>

      <div className="doc-prose">
        <h2>4. Blocks live on their own subpath</h2>
        <p>
          Blocks are kept out of the main bundle so importing a component never
          pulls in an entire page section&apos;s worth of code. Import them from{" "}
          <code>@sakaniui/react/blocks</code> instead.
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={BLOCKS_IMPORT} lang="tsx" />
      </div>

      <div className="doc-prose">
        <h2>Dark mode</h2>
        <p>
          Every token has a light and dark definition. Sakani doesn&apos;t ship a theme
          switcher — toggle the <code>.dark</code> class on any ancestor element
          (typically <code>&lt;html&gt;</code>) and every component underneath it
          re-themes automatically.
        </p>
      </div>
      <div className="mt-4">
        <CodeBlock code={DARK_MODE} lang="js" />
      </div>

      <Pager current="/docs/installation" />
    </article>
  );
}
