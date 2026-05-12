import type { APIRoute } from "astro";

export const prerender = false;

const APPVIEW_URL =
  import.meta.env.PUBLIC_APPVIEW_URL || "https://public.api.bsky.app";

interface AppViewProfileResponse {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

interface GetFollowsResponse {
  follows: AppViewProfileResponse[];
  cursor?: string;
}

export const GET: APIRoute = async ({ url }) => {
  const actor = url.searchParams.get("actor");
  const cursor = url.searchParams.get("cursor");
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "50"), 100);

  if (!actor) {
    return new Response(JSON.stringify({ error: "actor is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const params = new URLSearchParams({ actor, limit: String(limit) });
    if (cursor) params.set("cursor", cursor);

    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.graph.getFollows?${params}`,
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ follows: [], cursor: null }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = (await response.json()) as GetFollowsResponse;

    return new Response(
      JSON.stringify({
        follows: data.follows.map((p) => ({
          did: p.did,
          handle: p.handle,
          displayName: p.displayName ?? null,
          avatar: p.avatar ?? null,
        })),
        cursor: data.cursor ?? null,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch {
    return new Response(JSON.stringify({ follows: [], cursor: null }), {
      headers: { "Content-Type": "application/json" },
    });
  }
};
