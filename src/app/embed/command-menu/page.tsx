import { EmbedCommandMenu } from "./embed";

// A small live demo that the homepage frames inside a card. It is not a page to rank or link to.
export const metadata = { title: "Command Menu demo", robots: { index: false, follow: false } };

export default async function Page({ searchParams }: { searchParams: Promise<{ theme?: string }> }) {
  const { theme } = await searchParams;
  return <EmbedCommandMenu theme={theme === "light" ? "light" : "dark"} />;
}
