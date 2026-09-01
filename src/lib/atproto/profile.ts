export interface ActorProfile {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
  pronouns: string | null;
}

export interface FollowProfile {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

const APPVIEW = "https://public.api.bsky.app";

export async function getActorProfile(actor: string): Promise<ActorProfile | null> {
  try {
    const response = await fetch(
      `${APPVIEW}/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(actor)}`,
    );
    if (!response.ok) return null;
    const value = (await response.json()) as {
      did: string;
      handle: string;
      displayName?: string;
      avatar?: string;
      pronouns?: string;
    };
    return {
      did: value.did,
      handle: value.handle,
      displayName: value.displayName ?? null,
      avatar: value.avatar ?? null,
      pronouns: value.pronouns ?? null,
    };
  } catch {
    return null;
  }
}

export async function getFollows(actor: string, cursor?: string) {
  const url = new URL(`${APPVIEW}/xrpc/app.bsky.graph.getFollows`);
  url.searchParams.set("actor", actor);
  url.searchParams.set("limit", "48");
  if (cursor) url.searchParams.set("cursor", cursor);
  const response = await fetch(url);
  if (!response.ok) return { follows: [] as FollowProfile[], cursor: undefined };
  const value = (await response.json()) as {
    follows: {
      did: string;
      handle: string;
      displayName?: string;
      avatar?: string;
    }[];
    cursor?: string;
  };
  return {
    follows: value.follows.map((follow) => ({
      did: follow.did,
      handle: follow.handle,
      displayName: follow.displayName ?? null,
      avatar: follow.avatar ?? null,
    })),
    cursor: value.cursor,
  };
}
