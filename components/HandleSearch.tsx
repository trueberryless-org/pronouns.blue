"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";

interface Suggestion {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

export function HandleSearch() {
  const router = useTransitionRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
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
    if (!normalizedQuery) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    // Call the public Bluesky appview directly — it supports CORS and this
    // avoids a serverless function invocation on every keystroke.
    const APPVIEW = "https://public.api.bsky.app";
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${APPVIEW}/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(normalizedQuery)}&limit=8`,
          { signal: controller.signal },
        );
        if (!response.ok) return;
        const data = (await response.json()) as {
          actors?: {
            did: string;
            handle: string;
            displayName?: string;
            avatar?: string;
          }[];
        };
        setSuggestions(
          (data.actors ?? []).map((a) => ({
            did: a.did,
            handle: a.handle,
            displayName: a.displayName ?? null,
            avatar: a.avatar ?? null,
          })),
        );
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
    router.push(`/profile/${handle}`);
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl" ref={containerRef}>
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
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-[var(--surface-strong)]"
                  >
                    {suggestion.avatar ? (
                      <Image
                        src={suggestion.avatar}
                        alt=""
                        loading="lazy"
                        width={36}
                        height={36}
                        className="size-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-strong)] text-sm font-semibold text-[var(--text)]">
                        {(suggestion.displayName ?? suggestion.handle)
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate text-sm font-medium text-[var(--text)]">
                        {suggestion.displayName ?? suggestion.handle}
                      </span>
                      <span className="truncate text-xs text-[var(--muted)]">
                        @{suggestion.handle}
                      </span>
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
