import { redirect } from "next/navigation";
import { getDid } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { ProfileEditor } from "@/components/ProfileEditor";
import { Link } from "next-view-transitions";

export default async function SettingsPage() {
  const did = await getDid();
  if (!did) redirect("/");

  const [profile, signedInActor] = await Promise.all([
    getProfileRecordsFromPds(did),
    getActorProfile(did),
  ]);
  const normalizedHandle = signedInActor?.handle?.replace(/^@/, "");
  const profileHref = normalizedHandle
    ? `/profile/${encodeURIComponent(normalizedHandle)}`
    : null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--text)]">
              Settings
            </h1>
            <p className="text-sm text-[var(--muted)]">
              Update your names and pronouns.
            </p>
          </div>
          {profileHref && (
            <Link
              href={profileHref}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
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
              Show profile
            </Link>
          )}
        </div>
        <ProfileEditor
          initialNames={profile.names}
          initialPronouns={profile.pronouns}
          initialPreferredNames={profile.preferredNames}
          initialPreferredPronouns={profile.preferredPronouns}
        />
      </section>
    </main>
  );
}
