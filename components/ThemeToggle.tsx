"use client";

import { useState } from "react";

type Theme = "light" | "dark" | "black";

const STORAGE_KEY = "pronounsblue-theme";
const THEMES: Theme[] = ["light", "dark", "black"];

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(STORAGE_KEY, theme);
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved && THEMES.includes(saved)) return saved;
    const attrTheme = document.documentElement.getAttribute(
      "data-theme",
    ) as Theme | null;
    if (attrTheme && THEMES.includes(attrTheme)) return attrTheme;
    return "dark";
  });

  return (
    <label className="text-sm text-[var(--muted)]">
      <span className="sr-only">Theme</span>
      <select
        value={theme}
        onChange={(event) => {
          const nextTheme = event.target.value as Theme;
          if (!THEMES.includes(nextTheme)) return;
          setTheme(nextTheme);
          setThemeState(nextTheme);
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
