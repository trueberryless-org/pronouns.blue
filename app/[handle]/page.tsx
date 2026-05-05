import { notFound } from "next/navigation";
import {
  getCurrentProfileByDid,
  getCurrentProfileByHandle,
} from "@/lib/db/queries";
import { getActorProfile } from "@/lib/atproto/profiles";
import { ProfileDisplay } from "@/components/ProfileDisplay";

export default async function HandleProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle: rawHandle } = await params;
  const handle = decodeURIComponent(rawHandle).replace(/^@/, "");

  const direct = await getCurrentProfileByHandle(handle);
  const actorFromHandle = direct ? null : await getActorProfile(handle);
  const did = direct?.authorDid ?? actorFromHandle?.did;
  if (!did) notFound();

  const profile = direct ?? (await getCurrentProfileByDid(did));
  if (!profile) notFound();

  const actor = actorFromHandle ?? (await getActorProfile(did));
  const finalHandle = actor?.handle ?? handle;
  const title = actor?.displayName ?? finalHandle;

  return (
    <ProfileDisplay
      title={title}
      handle={finalHandle}
      avatar={actor?.avatar ?? null}
      names={profile.names}
      pronouns={profile.pronouns}
      preferredNames={profile.preferredNames}
      preferredPronouns={profile.preferredPronouns}
    />
  );
}
