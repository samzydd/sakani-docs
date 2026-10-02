"use client";

import type { CSSProperties, ReactNode } from "react";
import { Button, Card, LiquidGlass } from "@sakaniui/react";

/**
 * Live demos for the glass docs and the home page. Every one is the real
 * library over a real photograph: glass only reads over something colorful
 * and detailed, so there is no flat-color version of these.
 */

export const GLASS_BACKDROP = "/glass/backdrop.jpg";

const photo: CSSProperties = {
  backgroundImage: `url(${GLASS_BACKDROP})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export function PhotoStage({
  children,
  height = 240,
  className = "",
}: {
  children?: ReactNode;
  height?: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ ...photo, height }}>
      {children}
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      {children}
      <p className="mt-2 text-center text-xs text-ink-muted">{label}</p>
    </div>
  );
}

const sample = (
  <Card
    title="Revenue"
    description="Last 30 days"
    actions={<Button size="sm">View report</Button>}
  />
);

/** The same Card on the same photo in each Surface mode. */
export function SurfaceTrio() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Labeled label="Solid — the default">
        <PhotoStage>
          <div data-surface="solid" className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-[240px]">{sample}</div>
          </div>
        </PhotoStage>
      </Labeled>
      <Labeled label='Glass — data-surface="glass"'>
        <PhotoStage>
          <div data-surface="glass" className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-[240px]">{sample}</div>
          </div>
        </PhotoStage>
      </Labeled>
      <Labeled label="Liquid — <LiquidGlass>">
        <PhotoStage>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <LiquidGlass variant="regular" radius={16} style={{ width: "100%", maxWidth: 240 }}>
              {sample}
            </LiquidGlass>
          </div>
        </PhotoStage>
      </Labeled>
    </div>
  );
}

/** The recipe in three frames: photo, one overlay, components. */
export function RecipeStages() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Labeled label="1 · Background — the photo">
        <PhotoStage height={200} />
      </Labeled>
      <Labeled label="2 · Overlay — one glass sheet">
        <PhotoStage height={200}>
          <LiquidGlass variant="clear" radius={0} style={{ position: "absolute", inset: 0 }} />
        </PhotoStage>
      </Labeled>
      <Labeled label="3 · Components — on top">
        <PhotoStage height={200}>
          <LiquidGlass variant="clear" radius={0} style={{ position: "absolute", inset: 0 }} />
          <div data-surface="liquid" className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
            <LiquidGlass variant="regular" radius={14} style={{ width: "100%", maxWidth: 210 }}>
              <div className="px-4 py-3 text-sm font-medium text-ink">Card on the glass</div>
            </LiquidGlass>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary">Export</Button>
              <Button size="sm">Share</Button>
            </div>
          </div>
        </PhotoStage>
      </Labeled>
    </div>
  );
}
