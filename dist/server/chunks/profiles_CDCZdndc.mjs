globalThis.process ??= {};
globalThis.process.env ??= {};
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
export {
  getActorProfile as g
};
