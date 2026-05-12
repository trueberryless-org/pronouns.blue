const APPVIEW_URL = process.env.PUBLIC_APPVIEW_URL || "https://public.api.bsky.app";
async function getActorProfile(actor) {
  try {
    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.actor.getProfile?actor=${encodeURIComponent(actor)}`
    );
    if (!response.ok) return null;
    const profile = await response.json();
    return {
      did: profile.did,
      handle: profile.handle,
      displayName: profile.displayName ?? null,
      avatar: profile.avatar ?? null,
      pronouns: profile.pronouns ?? null
    };
  } catch {
    return null;
  }
}
async function searchActors(query, limit = 8) {
  try {
    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.actor.searchActors?q=${encodeURIComponent(query)}&limit=${limit}`
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.actors.map((p) => ({
      did: p.did,
      handle: p.handle,
      displayName: p.displayName ?? null,
      avatar: p.avatar ?? null,
      pronouns: p.pronouns ?? null
    }));
  } catch {
    return [];
  }
}

export { getActorProfile as g, searchActors as s };
