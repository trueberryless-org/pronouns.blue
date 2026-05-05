import { notFound } from "next/navigation";
import { getCurrentProfileByDid } from "@/lib/db/queries";
import { getActorProfile } from "@/lib/atproto/profiles";
import { ProfileDisplay } from "@/components/ProfileDisplay";

export default async function HandleProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle: rawHandle } = await params;
  const handle = decodeURIComponent(rawHandle).replace(/^@/, "");

  const actor = await getActorProfile(handle);
  if (!actor) notFound();

  const profile = await getCurrentProfileByDid(actor.did);
  if (!profile) notFound();

  const title = actor.displayName ?? actor.handle;

  return (
    <ProfileDisplay
      title={title}
      handle={actor.handle}
      avatar={actor.avatar}
      names={profile.names}
      pronouns={profile.pronouns}
      preferredNames={profile.preferredNames}
      preferredPronouns={profile.preferredPronouns}
    />
  );
}
