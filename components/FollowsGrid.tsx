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

// 12 skeletons = LCM(2,3,4) × 1 → clean row boundaries on every grid breakpoint:
// grid-cols-2: 6 rows, sm:grid-cols-3: 4 rows, md:grid-cols-4: 3 rows.
const SKELETON_COUNT = 12;
// 48 = LCM(2,3,4) × 4 → same clean-row guarantee for each fetched page.
const PAGE_LIMIT = 48;

export function FollowsGrid({
  initialFollows,
  initialCursor,
  did,
}: FollowsGridProps) {
  const [follows, setFollows] = useState<ActorProfile[]>(initialFollows);
  const [hasMore, setHasMore] = useState(Boolean(initialCursor));
  const [loading, setLoading] = useState(false);
  // Refs for values read inside the async observer callback — avoids stale
  // closures without re-creating the observer on every state change.
  const cursorRef = useRef<string | undefined>(initialCursor);
  const loadingRef = useRef(false);
  // Timestamp (ms) before which retries are suppressed. Set after each failed
  // fetch to break the sentinel-oscillation loop: when a fetch fails the
  // skeletons are removed, the sentinel moves back up into the IntersectionObserver
  // trigger zone, and the observer would immediately fire again — causing an
  // infinite loop. The cooldown prevents that re-trigger.
  const retryAfterRef = useRef(0);
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

        // Cooldown after a failed fetch — prevents the sentinel from
        // bouncing back into the trigger zone and immediately re-fetching.
        if (Date.now() < retryAfterRef.current) return;

        loadingRef.current = true;
        setLoading(true);

        try {
          const params = new URLSearchParams({
            actor: did,
            cursor: cursorRef.current,
            limit: String(PAGE_LIMIT),
          });
          const res = await fetch(`/api/follows?${params}`);
          if (!res.ok) {
            retryAfterRef.current = Date.now() + 3000;
            return;
          }
          const data = (await res.json()) as {
            follows: ActorProfile[];
            cursor?: string;
          };
          setFollows((prev) => [...prev, ...data.follows]);
          cursorRef.current = data.cursor;
          setHasMore(Boolean(data.cursor));
        } catch {
          retryAfterRef.current = Date.now() + 3000;
        } finally {
          loadingRef.current = false;
          setLoading(false);
        }
      },
      // Start fetching before the sentinel enters the viewport so cards appear
      // before the user scrolls all the way to the bottom.
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [did]);

  return (
    <div>
      {/* Single unified grid — skeletons are inline with follow cards so there
          is no visual gap between loaded and loading items. */}
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
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </div>

      {/* Sentinel positioned after the grid (including any inline skeletons).
          Adding skeletons pushes the sentinel down; retryAfterRef prevents an
          immediate re-fetch if removing them on failure pulls it back up. */}
      {hasMore && <div ref={sentinelRef} className="mt-8 h-px" />}

      {!hasMore && follows.length > 0 && (
        <p className="mt-8 text-center text-xs text-[var(--muted)]">
          All caught up ✓
        </p>
      )}
    </div>
  );
}
