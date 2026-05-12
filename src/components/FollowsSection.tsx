"use client";

import { useEffect, useState } from "react";
import { FollowsGrid } from "@/components/FollowsGrid";

interface ActorProfile {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

interface FollowsSectionProps {
  did: string;
  title: string;
}

export function FollowsSection({ did, title }: FollowsSectionProps) {
  const [follows, setFollows] = useState<ActorProfile[] | null>(null);
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  useEffect(() => {
    fetch(`/api/follows?actor=${encodeURIComponent(did)}&limit=48`)
      .then((r) => r.json())
      .then((data: { follows: ActorProfile[]; cursor?: string }) => {
        setFollows(data.follows);
        setCursor(data.cursor);
      })
      .catch(() => setFollows([]));
  }, [did]);

  if (follows === null) return <FollowsSkeleton />;
  if (follows.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
      <div className="border-t border-[var(--border)] pt-10">
        <h2 className="mb-1 text-lg font-semibold text-[var(--text)]">More to explore</h2>
        <p className="mb-6 text-sm text-[var(--muted)]">People {title} follows on Bluesky</p>
        <FollowsGrid initialFollows={follows} initialCursor={cursor} did={did} />
      </div>
    </section>
  );
}

export function FollowsSkeleton() {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
      <div className="border-t border-[var(--border)] pt-10">
        <div className="mb-1 h-6 w-40 animate-pulse rounded-md bg-[var(--surface-strong)]" />
        <div className="mb-6 h-4 w-56 animate-pulse rounded-md bg-[var(--surface-strong)]" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
              <div className="h-12 w-12 animate-pulse rounded-full bg-[var(--surface-strong)]" />
              <div className="w-full space-y-1.5">
                <div className="h-3 animate-pulse rounded bg-[var(--surface-strong)]" />
                <div className="mx-auto h-3 w-3/4 animate-pulse rounded bg-[var(--surface-strong)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
