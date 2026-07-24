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

const APPVIEW_URL = "https://public.api.bsky.app";

export async function getActorProfile(
  actor: string,
): Promise<ActorProfile | null> {
  try {
    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(actor)}`,
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
