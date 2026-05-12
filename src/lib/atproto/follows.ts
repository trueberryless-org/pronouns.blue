const APPVIEW_URL = import.meta.env.PUBLIC_APPVIEW_URL || "https://public.api.bsky.app";

export interface FollowActor {
  did: string;
  handle: string;
  displayName: string | null;
  avatar: string | null;
}

interface GetFollowsResponse {
  follows: { did: string; handle: string; displayName?: string; avatar?: string }[];
  cursor?: string;
}

export async function getFollows(
  actor: string,
  limit = 48,
  cursor?: string,
): Promise<{ follows: FollowActor[]; cursor?: string }> {
  try {
    const params = new URLSearchParams({ actor, limit: String(limit) });
    if (cursor) params.set("cursor", cursor);
    const res = await fetch(`${APPVIEW_URL}/xrpc/app.bsky.graph.getFollows?${params}`);
    if (!res.ok) return { follows: [] };
    const data = (await res.json()) as GetFollowsResponse;
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
