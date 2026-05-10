"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import {
  subscribeToCookies,
  getDidPublicCookie,
  getDidPublicCookieServer,
} from "@/lib/auth/client-cookie";
import {
  fetchActorProfile,
  fetchProfileRecords,
  type ClientActorProfile,
} from "@/lib/atproto/client-api";
import { ProfileEditor } from "@/components/ProfileEditor";
import type { LanguageGroup } from "@/lib/atproto/records";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function SettingsSkeleton() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="h-8 w-48 animate-pulse rounded-md bg-[var(--surface-strong)]" />
        <div className="h-4 w-64 animate-pulse rounded-md bg-[var(--surface-strong)]" />
        <div className="h-64 animate-pulse rounded-2xl bg-[var(--surface-strong)]" />
      </section>
    </main>
  );
}

export function SettingsClient() {
  const did = useSyncExternalStore(
    subscribeToCookies,
    getDidPublicCookie,
    getDidPublicCookieServer,
  );
  const router = useRouter();
  const [actor, setActor] = useState<ClientActorProfile | null | undefined>(
    undefined,
  );
  const [groups, setGroups] = useState<LanguageGroup[] | null>(null);

  useEffect(() => {
    if (did === null) {
      router.replace("/");
      return;
    }

    Promise.all([fetchActorProfile(did), fetchProfileRecords(did)])
      .then(([actorData, profileData]) => {
        setActor(actorData);
        setGroups(profileData.groups);
      })
      .catch(() => {
        setActor(null);
        setGroups([]);
      });
  }, [did, router]);

  if (did === null || actor === undefined || groups === null) {
    return <SettingsSkeleton />;
  }

  const normalizedHandle = actor?.handle?.replace(/^@/, "");
  const profileHref = normalizedHandle
    ? `/profile/${encodeURIComponent(normalizedHandle)}`
    : null;

  const isFirstTime =
    groups.length === 0 ||
    groups.every((g) => g.names.length === 0 && g.pronouns.length === 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--text)]">
              {isFirstTime ? "Set up your profile" : "Settings"}
            </h1>
            <p className="text-sm text-[var(--muted)]">
              {isFirstTime
                ? "Add your names and pronouns to get started."
                : "Update your names and pronouns."}
            </p>
          </div>
          {profileHref && (
            <Link
              href={profileHref}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ArrowIcon />
              Show profile
            </Link>
          )}
        </div>
        <ProfileEditor
          initialGroups={groups}
          isFirstTime={isFirstTime}
          profileHref={profileHref ?? undefined}
        />
      </section>
    </main>
  );
}
