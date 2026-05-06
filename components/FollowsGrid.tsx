"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "next-view-transitions";

interface ActorProfile {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

interface FollowsGridProps {
  initialFollows: ActorProfile[];
  initialCursor?: string;
  did: string;
}

function FollowCard({
  handle,
  displayName,
  avatar,
}: {
  handle: string;
  displayName: string | null;
  avatar: string | null;
}) {
  const label = displayName ?? handle;
  return (
    <Link
      href={`/profile/${encodeURIComponent(handle)}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center transition-colors hover:border-[var(--accent)]"
    >
      {avatar ? (
        <div
          className="h-12 w-12 flex-shrink-0 rounded-full border border-[var(--border)] bg-cover bg-center"
          style={{ backgroundImage: `url(${avatar})` }}
          role="img"
          aria-label={label}
        />
      ) : (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-lg font-semibold text-[var(--text)]">
          {label.slice(0, 1).toUpperCase()}
        </div>
      )}
      <div className="min-w-0 w-full">
        <p className="truncate text-sm font-medium text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
          {label}
        </p>
        <p className="truncate text-xs text-[var(--muted)]">@{handle}</p>
      </div>
    </Link>
  );
}

function CardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="h-12 w-12 animate-pulse rounded-full bg-[var(--surface-strong)]" />
      <div className="w-full space-y-1.5">
        <div className="h-3 animate-pulse rounded bg-[var(--surface-strong)]" />
        <div className="mx-auto h-3 w-3/4 animate-pulse rounded bg-[var(--surface-strong)]" />
      </div>
    </div>
  );
}

export function FollowsGrid({
  initialFollows,
  initialCursor,
  did,
}: FollowsGridProps) {
  const [follows, setFollows] = useState<ActorProfile[]>(initialFollows);
  const [hasMore, setHasMore] = useState(Boolean(initialCursor));
  const [loading, setLoading] = useState(false);
  // Use refs for values read inside the async observer callback to avoid
  // stale closures without re-creating the observer on every state change.
  const cursorRef = useRef<string | undefined>(initialCursor);
  const loadingRef = useRef(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (
          !entries[0].isIntersecting ||
          loadingRef.current ||
          !cursorRef.current
        )
          return;

        loadingRef.current = true;
        setLoading(true);

        try {
          const params = new URLSearchParams({
            actor: did,
            cursor: cursorRef.current,
            limit: "50",
          });
          const res = await fetch(`/api/follows?${params}`);
          if (!res.ok) return;
          const data = (await res.json()) as {
            follows: ActorProfile[];
            cursor?: string;
          };
          setFollows((prev) => [...prev, ...data.follows]);
          cursorRef.current = data.cursor;
          setHasMore(Boolean(data.cursor));
        } catch {
          // silently fail — user can scroll back and trigger another attempt
        } finally {
          loadingRef.current = false;
          setLoading(false);
        }
      },
      // Start fetching before the sentinel actually enters the viewport so
      // cards appear before the user hits the very bottom.
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [did]);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {follows.map((actor) => (
          <FollowCard
            key={actor.did}
            handle={actor.handle}
            displayName={actor.displayName}
            avatar={actor.avatar}
          />
        ))}
        {loading &&
          Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>

      {/* Sentinel — observed by IntersectionObserver to trigger the next page */}
      {hasMore && <div ref={sentinelRef} className="mt-8 h-px" />}

      {!hasMore && follows.length > 0 && (
        <p className="mt-8 text-center text-xs text-[var(--muted)]">
          All caught up ✓
        </p>
      )}
    </div>
  );
}
