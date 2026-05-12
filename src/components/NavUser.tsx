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

function readDidPublicCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function NavUser() {
  const [user, setUser] = useState<UserInfo | null | undefined>(undefined);

  useEffect(() => {
    const did = readDidPublicCookie();
    if (!did) {
      Promise.resolve().then(() => setUser(null));
      return;
    }
    fetch("/api/me")
      .then((r) => r.json())
      .then(({ user }: { user: UserInfo | null }) => setUser(user ?? null))
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
      <div className="hidden items-center sm:flex">
        {user === undefined ? (
          <div className="h-10 w-10 animate-pulse rounded-full bg-[var(--surface-strong)]" />
        ) : (
          <AuthNav {...navProps} />
        )}
      </div>
      <MobileNav {...navProps} />
    </>
  );
}
