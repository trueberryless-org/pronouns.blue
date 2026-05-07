import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { getDid } from "@/lib/auth/session";
import { ProfileDisplay } from "@/components/ProfileDisplay";
import { FollowsSection, FollowsSkeleton } from "@/components/FollowsSection";
import { FloatingProfileBack } from "@/components/FloatingProfileBack";

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

  const [did, profile] = await Promise.all([
    getDid(),
    getProfileRecordsFromPds(actor.did),
  ]);
  const title = actor.displayName ?? actor.handle;

  return (
    <>
      <ProfileDisplay
        title={title}
        handle={actor.handle}
        avatar={actor.avatar}
        groups={profile.groups}
        bskyFallbackPronouns={actor.pronouns}
        editHref={
          did?.toLowerCase() === actor.did.toLowerCase()
            ? "/settings"
            : undefined
        }
      />
      <Suspense fallback={<FollowsSkeleton />}>
        <FollowsSection did={actor.did} title={title} />
      </Suspense>
      <FloatingProfileBack title={title} avatar={actor.avatar ?? null} />
    </>
  );
}
