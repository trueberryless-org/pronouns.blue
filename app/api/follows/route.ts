import { NextRequest, NextResponse } from "next/server";

const APPVIEW_URL =
  process.env.PUBLIC_APPVIEW_URL || "https://public.api.bsky.app";

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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const actor = searchParams.get("actor");
  const cursor = searchParams.get("cursor");
  const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 100);

  if (!actor) {
    return NextResponse.json({ error: "actor is required" }, { status: 400 });
  }

  try {
    const params = new URLSearchParams({ actor, limit: String(limit) });
    if (cursor) params.set("cursor", cursor);

    const response = await fetch(
      `${APPVIEW_URL}/xrpc/app.bsky.graph.getFollows?${params}`,
      { next: { revalidate: 300 } },
    );

    if (!response.ok) return NextResponse.json({ follows: [], cursor: null });

    const data = (await response.json()) as GetFollowsResponse;

    return NextResponse.json({
      follows: data.follows.map((p) => ({
        did: p.did,
        handle: p.handle,
        displayName: p.displayName ?? null,
        avatar: p.avatar ?? null,
      })),
      cursor: data.cursor ?? null,
    });
  } catch {
    return NextResponse.json({ follows: [], cursor: null });
  }
}
