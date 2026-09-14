"use client";

import { Badge, AvatarGroup, Switch, StatCard, Toast, Progress } from "@sakaniui/react";

/**
 * Decorative background for the hero: real Sakani components scattered
 * around the periphery of the headline (never behind it -- see the mask
 * on the dot grid and the chips' own positions, all clear of the centered
 * max-w-3xl text column). Reads as atmosphere, not another UI to parse:
 * hidden below lg (there's no room to keep it clear of the text on a
 * narrow viewport) and fully static under prefers-reduced-motion.
 */
const CHIPS = [
  {
    key: "stat",
    className: "left-[2%] top-[8%] -rotate-6",
    delayMs: 0,
    node: (
      <StatCard
        title="Active deals"
        value="128"
        delta="+12.4%"
        trend="up"
        sparkline={[4, 6, 5, 8, 7, 10, 9, 13]}
        className="w-[200px] shadow-lg"
      />
    ),
  },
  {
    key: "toast",
    className: "right-[4%] top-[4%] rotate-6",
    delayMs: 120,
    node: (
      <Toast
        status="success"
        title="Deployed to production"
        description="v0.3.3 · 2 minutes ago"
        className="w-[240px] shadow-lg"
      />
    ),
  },
  {
    key: "team",
    className: "left-[6%] bottom-[14%] rotate-3",
    delayMs: 240,
    node: (
      <div className="flex w-[190px] items-center gap-3 rounded-xl border border-line-subtle bg-surface p-3 shadow-lg">
        <AvatarGroup
          size="sm"
          max={3}
          avatars={[{ initials: "AK" }, { initials: "CD" }, { initials: "FM" }, { initials: "DR" }]}
        />
        <span className="text-xs font-medium text-ink-muted">4 online now</span>
      </div>
    ),
  },
  {
    key: "theme",
    className: "right-[2%] bottom-[10%] -rotate-3",
    delayMs: 360,
    node: (
      <div className="flex w-[172px] items-center justify-between gap-3 rounded-xl border border-line-subtle bg-surface p-3 shadow-lg">
        <span className="text-xs font-medium text-ink">Dark mode</span>
        <Switch defaultChecked aria-label="Dark mode" />
      </div>
    ),
  },
  {
    key: "sync",
    className: "left-[3%] top-[36%] rotate-2",
    delayMs: 480,
    node: (
      <div className="flex w-[188px] flex-col gap-2 rounded-xl border border-line-subtle bg-surface p-3 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ink">Tokens synced</span>
          <Badge variant="success" emphasis="subtle">
            92%
          </Badge>
        </div>
        <Progress value={92} size="sm" label="Tokens synced" />
      </div>
    ),
  },
] as const;

export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft brand-colored glow behind the headline. */}
      <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-brand/20 blur-[110px]" />

      {/* Dot grid, faded out toward the center so it frames the text
          rather than sitting behind it. */}
      <div
        className="absolute inset-0 opacity-40 [background-image:radial-gradient(var(--color-line-default)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_55%_60%_at_50%_38%,transparent_35%,black_75%)]"
      />

      {/* Scattered component chips -- desktop only, clear of the text column.
          Rotation lives on this outer element (a static transform) and the
          continuous float lives on the inner one -- animating translateY
          directly here would fight the rotate for the same `transform`
          property and the rotation would be lost every frame. */}
      <div className="relative hidden h-full lg:block">
        {CHIPS.map((chip) => (
          <div
            key={chip.key}
            className={`hero-chip-in absolute ${chip.className}`}
            style={{ animationDelay: `${chip.delayMs}ms` }}
          >
            <div className="hero-chip-float" style={{ animationDelay: `${chip.delayMs}ms` }}>
              {chip.node}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
