"use client";

import { useSyncExternalStore } from "react";
import { Link } from "next-view-transitions";

function subscribe() {
  // Cookie values don't fire DOM events; return a no-op unsubscribe.
  return () => {};
}

function getDidPublic(): string | null {
  const match = document.cookie.match(/(?:^|;\s*)did-public=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

function EditIcon() {
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
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

/**
 * Client component that shows the "Edit profile" button only when the signed-in
 * user is the owner of this profile. Reads `did-public` via useSyncExternalStore
 * so no useEffect/setState is needed and the parent profile page can be ISR-cached.
 */
export function ProfileEditButton({ profileDid }: { profileDid: string }) {
  // null on the server (no cookie access); actual DID on the client after hydration.
  const userDid = useSyncExternalStore(subscribe, getDidPublic, () => null);

  if (userDid?.toLowerCase() !== profileDid.toLowerCase()) return null;

  return (
    <div className="mb-4 flex justify-end">
      <Link
        href="/settings"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        aria-label="Edit your names and pronouns"
        title="Edit profile"
      >
        <EditIcon />
      </Link>
    </div>
  );
}
