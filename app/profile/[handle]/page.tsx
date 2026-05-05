import { notFound } from "next/navigation";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { getDid } from "@/lib/auth/session";
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

  const [did, profile] = await Promise.all([
    getDid(),
    getProfileRecordsFromPds(actor.did),
  ]);
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
      editHref={
        did?.toLowerCase() === actor.did.toLowerCase() ? "/settings" : undefined
      }
    />
  );
}
