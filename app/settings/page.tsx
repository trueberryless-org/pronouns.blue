import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getCurrentProfileByDid } from "@/lib/db/queries";
import { ProfileEditor } from "@/components/ProfileEditor";

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const accountProfile = await getCurrentProfileByDid(session.did);

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-8 sm:px-6">
      <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <h1 className="text-2xl font-semibold text-[var(--text)]">Settings</h1>
        <p className="text-sm text-[var(--muted)]">
          Update your names and pronouns.
        </p>
        <ProfileEditor
          initialNames={accountProfile?.names ?? []}
          initialPronouns={accountProfile?.pronouns ?? []}
          initialPreferredNames={accountProfile?.preferredNames ?? []}
          initialPreferredPronouns={accountProfile?.preferredPronouns ?? []}
        />
      </section>
    </main>
  );
}
