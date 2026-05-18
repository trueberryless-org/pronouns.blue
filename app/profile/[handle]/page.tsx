import type { Metadata } from "next";
import { Suspense } from "react";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { ProfileDisplay } from "@/components/ProfileDisplay";
import { FollowsSection, FollowsSkeleton } from "@/components/FollowsSection";
import { FloatingProfileBack } from "@/components/FloatingProfileBack";

// Regenerate at most once per hour; revalidateTag(profileRecordsTag) in
// /api/status immediately busts this page when the owner saves their profile.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const handle = decodeURIComponent((await params).handle).replace(/^@/, "");
  return {
    title: `@${handle} – pronouns.blue`,
    description: `View @${handle}'s preferred names and pronouns on pronouns.blue`,
  };
}

export default async function HandleProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const handle = decodeURIComponent((await params).handle).replace(/^@/, "");

  const actor = await getActorProfile(handle);

  if (!actor) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 text-center">
        <h1 className="text-2xl font-bold text-[var(--text)]">
          Profile not found
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          This user doesn&apos;t exist or hasn&apos;t signed in yet.
        </p>
      </main>
    );
  }

  const profile = await getProfileRecordsFromPds(actor.did);
  const title = actor.displayName ?? actor.handle;

  return (
    <>
      <ProfileDisplay
        title={title}
        handle={actor.handle}
        avatar={actor.avatar}
        groups={profile.groups}
        bskyFallbackPronouns={actor.pronouns}
        profileDid={actor.did}
      />
      <Suspense fallback={<FollowsSkeleton />}>
        <FollowsSection did={actor.did} title={title} />
      </Suspense>
      <FloatingProfileBack title={title} avatar={actor.avatar} />
    </>
  );
}
