"use client";

import { useState, useEffect } from "react";
import {
  fetchActorProfile,
  fetchProfileRecords,
  fetchActorFollows,
  type ClientActorProfile,
} from "@/lib/atproto/client-api";
import { ProfileDisplay } from "@/components/ProfileDisplay";
import { FollowsGrid } from "@/components/FollowsGrid";
import { FloatingProfileBack } from "@/components/FloatingProfileBack";
import type { LanguageGroup } from "@/lib/atproto/records";

interface ProfilePageClientProps {
  handle: string;
}

function ProfileSkeleton() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 min-h-screen px-4 pt-12 pb-16 sm:pt-16">
      <section className="w-full py-4">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="h-24 w-24 animate-pulse rounded-full bg-[var(--surface-strong)]" />
          <div className="mt-4 h-8 w-48 animate-pulse rounded-md bg-[var(--surface-strong)]" />
          <div className="mt-2 h-4 w-32 animate-pulse rounded-md bg-[var(--surface-strong)]" />
        </div>
        <div className="space-y-4">
          <div className="h-6 w-24 animate-pulse rounded-md bg-[var(--surface-strong)]" />
          <div className="h-4 animate-pulse rounded-md bg-[var(--surface-strong)]" />
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-[var(--surface-strong)]" />
        </div>
      </section>
    </main>
  );
}

export function ProfilePageClient({ handle }: ProfilePageClientProps) {
  const [actor, setActor] = useState<ClientActorProfile | null | undefined>(
    undefined,
  );
  const [groups, setGroups] = useState<LanguageGroup[] | null>(null);
  const [follows, setFollows] = useState<ClientActorProfile[]>([]);
  const [followsCursor, setFollowsCursor] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;

    Promise.resolve()
      .then(() => {
        if (cancelled) return;
        setActor(undefined);
        setGroups(null);
        setFollows([]);
        setFollowsCursor(undefined);
      })
      .then(() => fetchActorProfile(handle))
      .then((actorData) => {
        if (cancelled) return;
        setActor(actorData);
        if (!actorData) {
          setGroups([]);
          return;
        }

        Promise.all([
          fetchProfileRecords(actorData.did),
          fetchActorFollows(actorData.did),
        ])
          .then(([profileData, followsData]) => {
            if (cancelled) return;
            setGroups(profileData.groups);
            setFollows(followsData.follows);
            setFollowsCursor(followsData.cursor);
          })
          .catch(() => {
            if (!cancelled) setGroups([]);
          });
      })
      .catch(() => {
        if (!cancelled) {
          setActor(null);
          setGroups([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [handle]);

  if (actor === undefined || groups === null) {
    return <ProfileSkeleton />;
  }

  if (!actor) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          Profile not found
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          This user doesn&apos;t exist or hasn&apos;t signed in yet.
        </p>
      </main>
    );
  }

  const title = actor.displayName ?? actor.handle;

  return (
    <>
      <ProfileDisplay
        title={title}
        handle={actor.handle}
        avatar={actor.avatar}
        groups={groups}
        bskyFallbackPronouns={actor.pronouns}
        profileDid={actor.did}
      />
      {follows.length > 0 && (
        <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6">
          <div className="border-t border-[var(--border)] pt-10">
            <h2 className="mb-1 text-lg font-semibold text-[var(--text)]">
              More to explore
            </h2>
            <p className="mb-6 text-sm text-[var(--muted)]">
              People {title} follows on Bluesky
            </p>
            <FollowsGrid
              initialFollows={follows}
              initialCursor={followsCursor}
              did={actor.did}
            />
          </div>
        </section>
      )}
      <FloatingProfileBack title={title} avatar={actor.avatar ?? null} />
    </>
  );
}
