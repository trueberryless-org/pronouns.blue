"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { navigate } from "astro:transitions/client";

interface Suggestion {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

export function HandleSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const normalizedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setSuggestions([]);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSuggestions([]);
    }
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!normalizedQuery) { setSuggestions([]); return; }
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(normalizedQuery)}`, { signal: controller.signal });
        if (!response.ok) return;
        const data = (await response.json()) as { results?: Suggestion[] };
        setSuggestions(data.results ?? []);
      } catch { setSuggestions([]); } finally { setLoading(false); }
    }, 120);
    return () => { clearTimeout(timeout); controller.abort(); };
  }, [normalizedQuery]);

  function openHandle(handle: string) {
    void navigate(`/profile/${handle}`);
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl" ref={containerRef}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value.replace(/^@/, ""))}
        onKeyDown={(e) => { if (e.key === "Enter" && normalizedQuery) openHandle(normalizedQuery); }}
        placeholder="Search handle (for example: trueberryless.org)"
        className="min-h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-lg text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
      />
      {(loading || suggestions.length > 0) && (
        <div className="absolute left-0 right-0 top-16 z-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
          {loading ? (
            <p className="px-3 py-2 text-sm text-[var(--muted)]">Searching…</p>
          ) : (
            <ul className="max-h-72 overflow-auto">
              {suggestions.map((s) => (
                <li key={s.did}>
                  <button type="button" onClick={() => openHandle(s.handle)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[var(--surface-strong)]">
                    {s.avatar ? (
                      <img src={s.avatar} alt="" loading="lazy" width={36} height={36} className="size-9 shrink-0 rounded-full object-cover" />
                    ) : (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-strong)] text-sm font-semibold text-[var(--text)]">
                        {(s.displayName ?? s.handle).charAt(0).toUpperCase()}
                      </span>
                    )}
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-[var(--text)]">{s.displayName ?? s.handle}</span>
                      <span className="truncate text-xs text-[var(--muted)]">@{s.handle}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
