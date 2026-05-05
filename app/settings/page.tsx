import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { ProfileEditor } from "@/components/ProfileEditor";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const profile = await getProfileRecordsFromPds(session.did);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h1 className="text-2xl font-semibold text-[var(--text)]">Settings</h1>
        <p className="text-sm text-[var(--muted)]">
          Update your names and pronouns.
        </p>
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
