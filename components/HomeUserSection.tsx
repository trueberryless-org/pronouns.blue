"use client";

import { useEffect, useState } from "react";
import { Link } from "next-view-transitions";

interface UserInfo {
  did: string;
  handle: string | null;
  displayName: string | null;
  avatar: string | null;
}

export function HomeUserSection() {
  // undefined = loading/unknown, null = signed out, {...} = signed in
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
    if (!match) {
      Promise.resolve().then(() => setUser(null));
      return;
    }
    const did = decodeURIComponent(match[1]);
    fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`,
    )
      .then((r) => r.json())
      .then((p) =>
        setUser({
          did,
          handle: p.handle ?? null,
          displayName: p.displayName ?? null,
          avatar: p.avatar ?? null,
        }),
      )
      .catch(() => setUser(null));
  }, []);

  if (!user) return null;

  const profileHref = user.handle
    ? `/profile/${encodeURIComponent(user.handle.replace(/^@/, ""))}`
    : "/settings";

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Link
        href="/settings"
        className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]"
      >
        <p className="text-lg font-semibold text-[var(--text)]">
          Set pronouns and names
        </p>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Update your profile entries and preferred options.
        </p>
      </Link>

      <Link
        href={profileHref}
        className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--accent)]"
      >
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <span
              className="h-12 w-12 rounded-full border border-[var(--border)] bg-cover bg-center"
              style={{ backgroundImage: `url(${user.avatar})` }}
              role="img"
              aria-label={user.displayName ?? user.handle ?? undefined}
            />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg font-semibold text-[var(--text)]">
              {(user.displayName ?? user.handle ?? "U")
                .slice(0, 1)
                .toUpperCase()}
            </span>
          )}
          <span className="min-w-0">
            <p className="truncate text-lg font-semibold text-[var(--text)]">
              {user.displayName ?? user.handle ?? user.did}
            </p>
            <p className="truncate text-sm text-[var(--muted)]">
              @{user.handle ?? user.did}
            </p>
          </span>
        </div>
        <p className="mt-2 text-sm text-[var(--muted)]">View your profile</p>
      </Link>
    </section>
  );
}
