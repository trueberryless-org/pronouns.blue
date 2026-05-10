import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { ProfileDisplay } from "@/components/ProfileDisplay";
import { FollowsSection, FollowsSkeleton } from "@/components/FollowsSection";
import { FloatingProfileBack } from "@/components/FloatingProfileBack";

// ISR: re-render the page at most every 5 minutes. Profile content does not
// depend on who is viewing it — the edit button is handled client-side by
// ProfileEditButton. Tag-based revalidation via /api/status handles
// immediate refreshes when the user saves their profile.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle: rawHandle } = await params;
  const handle = decodeURIComponent(rawHandle).replace(/^@/, "");
  const actor = await getActorProfile(handle);
  if (!actor) return { title: "Profile not found – pronouns.blue" };
  const name = actor.displayName ?? actor.handle;
  const description = `View ${name}'s preferred names and pronouns on pronouns.blue`;
  return {
    title: `${name} – pronouns.blue`,
    description,
    openGraph: { title: `${name} – pronouns.blue`, description },
    twitter: { title: `${name} – pronouns.blue`, description },
  };
}

export default async function HandleProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle: rawHandle } = await params;
  const handle = decodeURIComponent(rawHandle).replace(/^@/, "");

  const actor = await getActorProfile(handle);
  if (!actor) notFound();

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
      <FloatingProfileBack title={title} avatar={actor.avatar ?? null} />
    </>
  );
}
