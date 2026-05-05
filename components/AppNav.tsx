import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { AuthNav } from "@/components/AuthNav";
import { ThemeToggle } from "@/components/ThemeToggle";

export async function AppNav() {
  const session = await getSession();
  const actor = session ? await getActorProfile(session.did) : null;

  return (
    <nav className="mb-8 mt-4 border-b border-[var(--line)] pb-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6">
        <Link href="/" className="text-2xl font-bold text-[var(--text)]">
          pronouns.blue
        </Link>
        <div className="flex w-full flex-wrap items-center justify-end gap-8 sm:w-auto sm:gap-4">
          <ThemeToggle />
          <AuthNav
            signedIn={Boolean(session)}
            did={session?.did}
            handle={actor?.handle}
            displayName={actor?.displayName}
            avatar={actor?.avatar}
          />
        </div>
      </div>
    </nav>
  );
}
