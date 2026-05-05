import { getSession } from "@/lib/auth/session";
import { getFirehoseProfiles } from "@/lib/db/queries";
import { getActorProfiles } from "@/lib/atproto/profiles";
import { HandleSearch } from "@/components/HandleSearch";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  const firehose = await getFirehoseProfiles();

  const actorMap = await getActorProfiles(
    Array.from(
      new Set([
        ...firehose.map((profile) => profile.authorDid),
        ...(session ? [session.did] : []),
      ]),
    ),
  );
  const signedInActor = session ? actorMap[session.did] : null;
  const profileHref = signedInActor?.handle
    ? `/${encodeURIComponent(signedInActor.handle.replace(/^@/, ""))}`
    : "/settings";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <main className="space-y-8">
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

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Recent profile updates
          </h2>
          <ul>
            {firehose.map((profile, index) => {
              const actor = actorMap[profile.authorDid];
              const handle =
                actor?.handle ?? profile.handle ?? profile.authorDid;
              const pronounsSummary = summarizeEntries(profile.pronouns, 3);
              const itemClassName =
                index < firehose.length - 1
                  ? "flex flex-col gap-2 border-b border-[var(--line)] py-3 text-sm sm:flex-row sm:items-start sm:gap-4"
                  : "flex flex-col gap-2 py-3 text-sm sm:flex-row sm:items-start sm:gap-4";
              return (
                <li key={profile.uri} className={itemClassName}>
                  <a
                    href={`/${handle}`}
                    className="min-w-0 shrink-0 font-medium text-[var(--text)] hover:text-[var(--accent)] sm:w-60"
                  >
                    @{handle}
                  </a>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p
                      className="truncate text-[var(--text)]"
                      title={pronounsSummary.full}
                    >
                      <span className="text-[var(--muted)]">Pronouns:</span>{" "}
                      {pronounsSummary.preview}
                    </p>
                  </div>
                  <span className="shrink-0 text-[var(--muted)] sm:w-12 sm:text-right">
                    {timeAgo(profile.updatedAt)}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

function summarizeEntries(items: string[], limit: number) {
  const full = items.join(", ");
  const previewItems = items.slice(0, limit);
  const suffix = items.length > limit ? ", ..." : "";
  const preview = `${previewItems.join(", ")}${suffix}`;
  return { full, preview };
}

function timeAgo(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return "now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}
