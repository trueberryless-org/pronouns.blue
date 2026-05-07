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

function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function SearchModal() {
  const router = useTransitionRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const normalizedQuery = useMemo(() => query.trim(), [query]);

  // Open with Cmd/Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (open) {
      // rAF ensures the modal is rendered before we focus
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Fetch search results
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

  function closeModal() {
    setOpen(false);
    setQuery("");
    setSuggestions([]);
  }

  function openHandle(handle: string) {
    closeModal();
    router.push(`/profile/${handle}`);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search handles (Ctrl+K)"
        className="flex h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors"
      >
        <SearchIcon className="h-4 w-4 shrink-0" />
        <span className="hidden text-sm sm:inline">Search…</span>
        <kbd className="hidden items-center gap-0.5 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] leading-none lg:inline-flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="mx-4 w-full max-w-lg overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value.replace(/^@/, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && normalizedQuery) {
                    openHandle(normalizedQuery);
                  }
                  if (e.key === "Escape") closeModal();
                }}
                placeholder="Search handle…"
                className="flex-1 bg-transparent text-base text-[var(--text)] placeholder-[var(--muted)] outline-none"
              />
              <kbd className="inline-flex h-6 items-center rounded border border-[var(--border)] px-1.5 font-mono text-xs text-[var(--muted)]">
                esc
              </kbd>
            </div>

            {(loading || suggestions.length > 0 || normalizedQuery) && (
              <div className="max-h-72 overflow-auto p-2">
                {loading ? (
                  <p className="px-3 py-2 text-sm text-[var(--muted)]">
                    Searching…
                  </p>
                ) : suggestions.length === 0 ? (
                  <p className="px-3 py-2 text-sm text-[var(--muted)]">
                    No results for &ldquo;{normalizedQuery}&rdquo;
                  </p>
                ) : (
                  <ul>
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
        </div>
      )}
    </>
  );
}
