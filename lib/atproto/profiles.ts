interface AppViewProfileResponse {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
  pronouns?: string;
}

export interface ActorProfile {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
  /** Free-form pronouns string from the Bluesky profile record, if set. */
  pronouns: string | null;
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
      pronouns: profile.pronouns ?? null,
    };
  } catch {
    return null;
  }
}

interface SearchActorsResponse {
  actors: AppViewProfileResponse[];
  cursor?: string;
}

export async function searchActors(
  query: string,
  limit = 8,
): Promise<ActorProfile[]> {
  try {
    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(query)}&limit=${limit}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return [];
    const data = (await response.json()) as SearchActorsResponse;
    return data.actors.map((p) => ({
      did: p.did,
      handle: p.handle,
      displayName: p.displayName ?? null,
      avatar: p.avatar ?? null,
    }));
  } catch {
    return [];
  }
}

interface GetFollowsResponse {
  follows: AppViewProfileResponse[];
  cursor?: string;
}

export async function getActorFollows(
  actor: string,
  limit = 50,
): Promise<{ follows: ActorProfile[]; cursor?: string }> {
  try {
    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.graph.getFollows?actor=${encodeURIComponent(actor)}&limit=${limit}`,
      { next: { revalidate: 300 } },
    );
    if (!response.ok) return { follows: [] };
    const data = (await response.json()) as GetFollowsResponse;
    return {
      follows: data.follows.map((p) => ({
        did: p.did,
        handle: p.handle,
        displayName: p.displayName ?? null,
        avatar: p.avatar ?? null,
      })),
      cursor: data.cursor,
    };
  } catch {
    return { follows: [] };
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
