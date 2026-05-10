"use client";

import { useEffect, useState } from "react";
import { AuthNav } from "@/components/AuthNav";
import { MobileNav } from "@/components/MobileNav";

interface UserInfo {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

/** Reads the non-httpOnly `did-public` cookie set by middleware. */
function readDidPublicCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Client-side auth island rendered inside the static AppNav.
 *
 * On mount it reads the `did-public` cookie. If a DID is present it fetches
 * `/api/me` (browser-cached for 60 s) to get the user's profile, then passes
 * the result to AuthNav (desktop) and MobileNav (mobile).
 *
 * The layout and every page that includes AppNav can therefore be statically
 * rendered / ISR-cached — no server-side cookie reads are needed.
 */
export function NavUser() {
  // undefined = loading, null = signed out, {...} = signed in
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);

  useEffect(() => {
    const did = readDidPublicCookie();
    if (!did) {
      // Defer to satisfy the no-synchronous-setState-in-effect rule while still
      // quickly updating the UI to show the login form.
      Promise.resolve().then(() => setUser(null));
      return;
    }
    fetch(
      `https://public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=${did}`,
    )
      .then((r) => r.json())
      .then((p) =>
        setUser({
          did,
          handle: p.handle,
          displayName: p.displayName ?? null,
          avatar: p.avatar ?? null,
        }),
      )
      .catch(() => setUser(null));
  }, []);

  const signedIn = user !== undefined && Boolean(user);
  const navProps = {
    signedIn,
    did: user?.did,
    handle: user?.handle,
    displayName: user?.displayName,
    avatar: user?.avatar,
  };

  return (
    <>
      {/* Desktop auth — hidden on mobile */}
      <div className="hidden items-center sm:flex">
        {user === undefined ? (
          // Skeleton while auth state loads — matches the avatar button size
          <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--surface-strong)]" />
        ) : (
          <AuthNav {...navProps} />
        )}
      </div>
      {/* Mobile burger — always rendered; auth-dependent content only shown when open */}
      <MobileNav {...navProps} />
    </>
  );
}
