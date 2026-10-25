"use client";

import { useSyncExternalStore } from "react";
import { GITHUB_URL } from "@/lib/site";

/**
 * The repository's live star count, straight from the GitHub API.
 *
 * The browser asks GitHub itself (its CORS headers allow it), so every visitor sees the current
 * number rather than whatever the last deploy saw, and the 60 requests an hour GitHub gives an
 * anonymous caller are the visitor's own, not shared across the site. One store serves every
 * badge on the page: a single request, then a refresh each minute while the tab is visible and
 * whenever it becomes visible again. A failed request (offline, rate limited) keeps the last
 * number; before the first answer there is no number, so nothing wrong is ever shown.
 */

const API = `https://api.github.com/repos/${GITHUB_URL.replace("https://github.com/", "")}`;
const REFRESH_MS = 60_000;
const CACHE_KEY = "sakaniui:github-stars";

let count: number | null = null;
let fetchedAt = 0;
let timer: ReturnType<typeof setInterval> | undefined;
let inFlight = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { count?: unknown; at?: unknown };
    if (typeof parsed.count === "number" && typeof parsed.at === "number") {
      count = parsed.count;
      fetchedAt = parsed.at;
    }
  } catch { /* storage blocked or corrupt: fetch instead */ }
}

async function refresh() {
  if (inFlight || Date.now() - fetchedAt < REFRESH_MS - 1000) return;
  inFlight = true;
  try {
    const res = await fetch(API, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return;
    const data = (await res.json()) as { stargazers_count?: unknown };
    if (typeof data.stargazers_count !== "number") return;
    fetchedAt = Date.now();
    if (data.stargazers_count !== count) { count = data.stargazers_count; emit(); }
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ count, at: fetchedAt })); } catch { /* ignore */ }
  } catch { /* offline: keep the last number */ } finally {
    inFlight = false;
  }
}

const onVisible = () => { if (document.visibilityState === "visible") void refresh(); };

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    if (count === null) { readCache(); if (count !== null) emit(); }
    void refresh();
    timer = setInterval(() => { if (document.visibilityState === "visible") void refresh(); }, REFRESH_MS);
    document.addEventListener("visibilitychange", onVisible);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    }
  };
}

/** The star count, or null until GitHub has answered. */
export function useGithubStars(): number | null {
  return useSyncExternalStore(subscribe, () => count, () => null);
}

/** 90 -> "90", 1234 -> "1.2k". */
export function formatStars(n: number): string {
  if (n < 1000) return String(n);
  const k = n / 1000;
  return `${k >= 10 ? Math.round(k) : Math.round(k * 10) / 10}k`;
}
