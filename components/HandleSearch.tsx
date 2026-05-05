"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

interface Suggestion {
  did: string;
  handle: string;
}

export function HandleSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    if (!normalizedQuery) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(normalizedQuery)}`,
          { signal: controller.signal },
        );
        if (!response.ok) return;
        const data = (await response.json()) as { results?: Suggestion[] };
        setSuggestions(data.results ?? []);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 120);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [normalizedQuery]);

  function openHandle(handle: string) {
    router.push(`/${handle}`);
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value.replace(/^@/, ""))}
        onKeyDown={(event) => {
          if (event.key === "Enter" && normalizedQuery) {
            openHandle(normalizedQuery);
          }
        }}
        placeholder="Search handle (for example: trueberryless.org)"
        className="min-h-14 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-lg text-[var(--text)] shadow-sm outline-none focus:border-[var(--accent)]"
      />
      {(loading || suggestions.length > 0) && (
        <div className="absolute left-0 right-0 top-16 z-20 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
          {loading ? (
            <p className="px-3 py-2 text-sm text-[var(--muted)]">Searching…</p>
          ) : (
            <ul className="max-h-72 overflow-auto">
              {suggestions.map((suggestion) => (
                <li key={suggestion.did}>
                  <button
                    type="button"
                    onClick={() => openHandle(suggestion.handle)}
                    className="w-full rounded-xl px-3 py-2 text-left text-sm text-[var(--text)] hover:bg-[var(--surface-strong)]"
                  >
                    @{suggestion.handle}
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
