"use client";

import { useState } from "react";
import { IconButton, Input, Textarea } from "@sakaniui/react";
import { IconArrowUp, IconMicrophone, IconPlus } from "@sakaniui/react/icons";

/** Round action buttons for the prompt box. The secondary fill matches the box fill, so the "+" takes bg/muted to stay visible. */
const ROUND = { borderRadius: 999, boxShadow: "none" } as const;
const MUTED = { ...ROUND, background: "var(--color-bg-muted)", borderColor: "transparent" } as const;

/** One-line prompt box: a "+" on the left, a mic on the right that becomes a send button once there is text. */
export function PromptInputDemo({ glow, placeholder = "Ask anything" }: { glow?: "pulse" | "focus" | "off"; placeholder?: string }) {
  const [value, setValue] = useState("");
  return (
    <div className="w-full max-w-xl">
      <Input
        variant="ai"
        glow={glow}
        aria-label="Ask anything"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        leading={<IconButton icon={IconPlus} variant="secondary" aria-label="Add" style={MUTED} />}
        trailing={value.trim()
          ? <IconButton icon={IconArrowUp} aria-label="Send" style={ROUND} />
          : <IconButton icon={IconMicrophone} variant="ghost" aria-label="Use the microphone" style={ROUND} />}
      />
    </div>
  );
}

/** Multi-line prompt box: the field grows with the text, the buttons sit underneath. */
export function PromptTextareaDemo({ glow, maxRows, initial = "" }: { glow?: "pulse" | "focus" | "off"; maxRows?: number; initial?: string }) {
  const [value, setValue] = useState(initial);
  return (
    <div className="w-full max-w-xl">
      <Textarea
        variant="ai"
        glow={glow}
        maxRows={maxRows}
        aria-label="Ask anything"
        placeholder="Ask anything"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        leading={<IconButton icon={IconPlus} variant="secondary" aria-label="Add" style={MUTED} />}
        trailing={value.trim()
          ? <IconButton icon={IconArrowUp} aria-label="Send" style={ROUND} />
          : <IconButton icon={IconMicrophone} variant="ghost" aria-label="Use the microphone" style={ROUND} />}
      />
    </div>
  );
}
