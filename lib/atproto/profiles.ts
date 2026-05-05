interface AppViewProfileResponse {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface ActorProfile {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

const APPVIEW_URL =
  process.env.PUBLIC_APPVIEW_URL || "https://public.api.bsky.app";

export async function getActorProfile(
  actor: string,
): Promise<ActorProfile | null> {
  try {
    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(actor)}`,
      { next: { revalidate: 300 } },
    );
    if (!response.ok) return null;
    const profile = (await response.json()) as AppViewProfileResponse;
    return {
      did: profile.did,
      handle: profile.handle,
      displayName: profile.displayName ?? null,
      avatar: profile.avatar ?? null,
    };
  } catch {
    return null;
  }
}

export async function getActorProfiles(
  actors: string[],
): Promise<Record<string, ActorProfile>> {
  const uniqueActors = Array.from(new Set(actors.filter(Boolean)));
  const resolved = await Promise.all(
    uniqueActors.map(
      async (actor) => [actor, await getActorProfile(actor)] as const,
    ),
  );

  return resolved.reduce<Record<string, ActorProfile>>(
    (acc, [actor, profile]) => {
      if (profile) acc[actor] = profile;
      return acc;
    },
    {},
  );
}
