"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeToCookies,
  getDidPublicCookie,
} from "@/lib/auth/client-cookie";

export function PrivacyUserSection() {
  const did = useSyncExternalStore(
    subscribeToCookies,
    getDidPublicCookie,
    () => null,
  );

  if (!did) return null;

  const pronounHref = `https://pdsls.dev/at://${did}/blue.pronouns.pronoun`;
  const nameHref = `https://pdsls.dev/at://${did}/blue.pronouns.name`;

  return (
    <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
      <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
        View your records in PDSLS
      </h2>
      <p className="text-[var(--muted)]">
        Since you are signed in, you can inspect your published lexicon records
        directly in{" "}
        <a
          href="https://pdsls.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent)] underline underline-offset-4"
        >
          PDSLS
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={pronounHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          blue.pronouns.pronoun
        </a>
        <a
          href={nameHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          blue.pronouns.name
        </a>
      </div>
    </section>
  );
}
