import { flushSync } from "react-dom";

/** The cross-fade length. The same number is in globals.css (`::view-transition-*`) and in the CRM demo's lib/theme.ts. */
const FADE_MS = 380;

type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => { finished: Promise<unknown> } };

/**
 * Changes a theme with one smooth cross-fade of the page, and keeps the components inside from animating on their own.
 *
 * A component that declares a colour transition (most of them do, for hover and focus) runs it whenever its colour
 * token changes value, theme-driven or not. Flip a theme on a panel full of components and each one starts its own
 * 150 or 220ms fade at a slightly different moment: measured on the CRM demo, 600+ elements. That is the "twitching".
 * So everything gets `transition: none` (the `.theme-swap` rule in globals.css, held on <html>) for the change, and the
 * only thing that moves is a View Transition: the browser photographs the page, the theme changes underneath, and it
 * blends the old picture into the new one on the compositor.
 *
 * The class goes on <html>, not on the element whose theme changes: that element's `className` is rendered by React,
 * and React replaces the whole string on its next render, which would silently wipe a class added by hand.
 *
 * The "new" side of a view transition is the live page, so the suppression is held until the fade has finished, not
 * just for one frame. Without View Transitions, or with reduced motion, it is a clean instant switch.
 *
 * `update` must apply the change synchronously (it is flushed), because the browser takes the new picture right after.
 */
export function withThemeTransition(update: () => void) {
  const el = document.documentElement;
  const release = () => el.classList.remove("theme-swap");

  el.classList.add("theme-swap");
  // Forces "transitions off" to be applied before the change, instead of being batched into one style recalculation
  // with it -- otherwise the suppression would never actually take effect first.
  void el.offsetHeight;

  const doc = document as ViewTransitionDocument;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (doc.startViewTransition && !reduced) {
    const transition = doc.startViewTransition(() => flushSync(update));
    transition.finished.then(release, release);
    // Backs up `finished` (a transition can be skipped, or deferred in a background tab) so the suppression can never
    // stick and silently kill every later hover transition.
    window.setTimeout(release, FADE_MS + 500);
    return;
  }

  flushSync(update);
  requestAnimationFrame(release);
  window.setTimeout(release, 100);
}
