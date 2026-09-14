"use client";

import { Globe, AtSign } from "lucide-react";
import { ProfileCard, TeamCard } from "@sakaniui/react";
import { productImage } from "@/lib/placeholder-image";
import { PageHeader } from "@/components/docs/page-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { PropsTable } from "@/components/docs/props-table";
import { Pager } from "@/components/docs/pager";

const PROFILE = `<ProfileCard name="Amara Chen" role="Head of Design" />

// Passing bio (and/or socialLinks) switches to the centered detailed layout.
<ProfileCard
  name="Amara Chen"
  role="Head of Design"
  bio="Ten years turning messy component libraries into systems teams actually use."
  socialLinks={[
    { icon: <AtSign size={16} />, label: "X (Twitter)", href: "#" },
    { icon: <Globe size={16} />, label: "LinkedIn", href: "#" },
  ]}
/>`;

const TEAM = `<TeamCard
  image="/amara.jpg"
  name="Amara Chen"
  role="Head of Design"
  location="Lagos, NG"
  locationStatus="active"
/>`;

const SOCIALS = [
  { icon: <AtSign size={16} />, label: "X (Twitter)", href: "#" },
  { icon: <Globe size={16} />, label: "LinkedIn", href: "#" },
];

const PROFILE_PROPS = [
  { name: "name / role", type: "string", description: "Who they are and what they do." },
  { name: "avatarSrc / avatarAlt", type: "string", description: "Avatar image and alt text." },
  { name: "bio", type: "string", description: "Its presence switches the card to the centred detailed layout." },
  { name: "socialLinks", type: "{ icon: ReactNode; label: string; href?: string; onClick?: () => void }[]", description: "label is the accessible name — an icon alone doesn't have one." },
];

const TEAM_PROPS = [
  { name: "image / imageAlt", type: "string", description: "Portrait and alt text." },
  { name: "name / role", type: "string", description: "Who they are and what they do." },
  { name: "location", type: "string", description: "Rendered through LocationDot." },
  { name: "locationStatus", type: "'active' | 'remote'", description: "Colours that dot." },
  { name: "socialLinks", type: "TeamCardSocialLink[]", description: "Same shape as ProfileCard's." },
];

export default function TeamCardsPage() {
  return (
    <article>
      <PageHeader title="Team Cards" description="Two ways to present a person: a compact profile card and a portrait-led team card." />

      <div className="space-y-10">
        <ComponentPreview code={PROFILE}>
          <div className="flex w-full max-w-lg flex-col gap-6">
            <ProfileCard name="Amara Chen" role="Head of Design" />
            <ProfileCard
              name="Amara Chen"
              role="Head of Design"
              bio="Ten years turning messy component libraries into systems teams actually use."
              socialLinks={SOCIALS}
            />
          </div>
        </ComponentPreview>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Icon links still need names</h2>
          <p className="mb-3 text-sm text-ink-muted">
            <code>socialLinks</code> takes a <code>label</code> alongside the
            icon and it isn&apos;t optional — a row of unlabelled glyphs is
            unusable with a screen reader, and it&apos;s the same reason{" "}
            <a href="/docs/components/icon-button" className="font-medium text-ink underline underline-offset-2">IconButton</a>{" "}
            requires an aria-label.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">Team card</h2>
          <p className="mb-3 text-sm text-ink-muted">
            Leads with a portrait and carries a location, rendered through{" "}
            <a href="/docs/components/marketing-elements" className="font-medium text-ink underline underline-offset-2">LocationDot</a>.
          </p>
          <ComponentPreview code={TEAM}>
            <div className="w-full max-w-[16rem]">
              <TeamCard
                image={productImage}
                name="Amara Chen"
                role="Head of Design"
                location="Lagos, NG"
                locationStatus="active"
                socialLinks={SOCIALS}
              />
            </div>
          </ComponentPreview>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">ProfileCard props</h2>
          <PropsTable rows={PROFILE_PROPS} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-ink">TeamCard props</h2>
          <PropsTable rows={TEAM_PROPS} />
        </section>
      </div>

      <Pager current="/docs/components/team-cards" />
    </article>
  );
}
