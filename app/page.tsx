import { getDid } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { HandleSearch } from "@/components/HandleSearch";
import { Link } from "next-view-transitions";
import Image from "next/image";

export default async function Home() {
  const did = await getDid();
  const [signedInActor, profile] = did
    ? await Promise.all([getActorProfile(did), getProfileRecordsFromPds(did)])
    : [null, null];
  const profileHref = signedInActor?.handle
    ? `/profile/${encodeURIComponent(signedInActor.handle.replace(/^@/, ""))}`
    : "/settings";
  const isFirstTime =
    Boolean(did) &&
    profile !== null &&
    profile.groups.every(
      (g) => g.names.length === 0 && g.pronouns.length === 0,
    );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <main className="space-y-8">
        <div className="flex justify-center pb-2">
          <Image
            src="/pronouns.blue.png"
            alt="pronouns.blue"
            width={966}
            height={396}
            className="h-auto w-auto max-h-60 max-w-full"
            style={{ viewTransitionName: "site-logo" }}
            priority
          />
        </div>

        {isFirstTime && (
          <section className="relative overflow-hidden rounded-3xl border-2 border-[var(--accent)] bg-[var(--surface)] p-8">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at top left, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%)",
              }}
            />
            <div className="relative space-y-6">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                  Welcome 👋
                </p>
                <h2 className="text-2xl font-semibold text-[var(--text)]">
                  Let&apos;s set up your profile
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  You&apos;re signed in — now add your names and pronouns so
                  others can find you.
                </p>
              </div>

              {/* Step indicator */}
              <div className="flex items-start">
                <div className="flex shrink-0 flex-col items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-contrast)]">
                    ✓
                  </div>
                  <span className="text-xs font-medium text-[var(--text)]">
                    Sign in
                  </span>
                </div>
                <div className="mt-4 h-px flex-1 bg-[var(--accent)]" />
                <div className="flex shrink-0 flex-col items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--accent)] text-sm font-bold text-[var(--accent)]">
                    2
                  </div>
                  <span className="text-xs font-medium text-[var(--text)]">
                    Add your info
                  </span>
                </div>
                <div className="mt-4 h-px flex-1 bg-[var(--border)]" />
                <div className="flex shrink-0 flex-col items-center gap-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--border)] text-sm font-bold text-[var(--muted)]">
                    3
                  </div>
                  <span className="text-xs text-[var(--muted)]">Share</span>
                </div>
              </div>

              <Link
                href="/settings"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90"
              >
                Get started
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </section>
        )}

        <section className="space-y-5 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-lg text-[var(--muted)]">
            Find any user by handle and view their names and pronouns.
          </p>
          <HandleSearch />
        </section>

        {did && !isFirstTime && (
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
                    style={{
                      backgroundImage: `url(${signedInActor.avatar})`,
                    }}
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
                    {signedInActor?.displayName ?? signedInActor?.handle ?? did}
                  </p>
                  <p className="truncate text-sm text-[var(--muted)]">
                    @{signedInActor?.handle ?? did}
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
