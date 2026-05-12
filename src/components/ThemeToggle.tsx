"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark" | "black";

const STORAGE_KEY = "pronounsblue-theme";
const THEMES: Theme[] = ["light", "dark", "black"];
const THEME_EVENT = "pronounsblue-theme-change";

function getThemeSnapshot(): Theme {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (saved && THEMES.includes(saved)) return saved;
  const attr = document.documentElement.getAttribute(
    "data-theme",
  ) as Theme | null;
  if (attr && THEMES.includes(attr)) return attr;
  return "dark";
}

function subscribeToTheme(callback: () => void): () => void {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "dark" as Theme,
  );

  return (
    <label className="text-sm text-[var(--muted)]">
      <span className="sr-only">Theme</span>
      <select
        value={theme}
        onChange={(event) => {
          const nextTheme = event.target.value as Theme;
          if (!THEMES.includes(nextTheme)) return;
          setTheme(nextTheme);
        }}
        className="min-h-10 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm capitalize text-[var(--text)]"
      >
        {THEMES.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
