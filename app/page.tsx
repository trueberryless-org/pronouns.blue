import { getSession } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { HandleSearch } from "@/components/HandleSearch";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default async function Home() {
  const session = await getSession();
  const signedInActor = session ? await getActorProfile(session.did) : null;
  const profileHref = signedInActor?.handle
    ? `/${encodeURIComponent(signedInActor.handle.replace(/^@/, ""))}`
    : "/settings";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <main className="space-y-8">
        <div className="flex justify-center pb-2">
          <Image
            src="/pronouns.blue.svg"
            alt="pronouns.blue"
            width={242}
            height={99}
            className="h-40 w-auto"
            style={{ viewTransitionName: "site-logo" }}
            priority
          />
        </div>

        <section className="space-y-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-lg text-[var(--muted)]">
            Find any user by handle and view their names and pronouns.
          </p>
          <HandleSearch />
        </section>

        {session && (
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
                {signedInActor?.avatar ? (
                  <span
                    className="h-12 w-12 rounded-full border border-[var(--border)] bg-cover bg-center"
                    style={{ backgroundImage: `url(${signedInActor.avatar})` }}
                    role="img"
                    aria-label={
                      signedInActor.displayName ?? signedInActor.handle
                    }
                  />
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-lg font-semibold text-[var(--text)]">
                    {(
                      signedInActor?.displayName ??
                      signedInActor?.handle ??
                      "U"
                    )
                      .slice(0, 1)
                      .toUpperCase()}
                  </span>
                )}
                <span className="min-w-0">
                  <p className="truncate text-lg font-semibold text-[var(--text)]">
                    {signedInActor?.displayName ??
                      signedInActor?.handle ??
                      session.did}
                  </p>
                  <p className="truncate text-sm text-[var(--muted)]">
                    @{signedInActor?.handle ?? session.did}
                  </p>
                </span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                View your profile
              </p>
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}
