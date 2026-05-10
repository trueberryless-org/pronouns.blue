import { NextResponse } from "next/server";

/**
 * Legacy compatibility stub.
 *
 * The FollowsGrid component now calls the Bluesky appview directly (CORS is
 * supported), so this route is no longer used by current clients.
 *
 * Old cached JavaScript bundles (from before that change) still call this
 * endpoint. Returning an empty page with cursor=null causes the old
 * IntersectionObserver loop to terminate gracefully:
 *
 *   setHasMore(Boolean(null))  →  false  →  sentinel <div> removed  →  loop stops
 *
 * Without this stub the request gets a 404, which the old code treats as a
 * non-ok response and keeps looping — much faster than before because the
 * 404 round-trip is ~10 ms vs ~300 ms for the Bluesky API.
 */
export async function GET() {
  return NextResponse.json(
    { follows: [], cursor: null },
    {
      headers: {
        // Tell CDN and browsers not to cache this stub response.
        "Cache-Control": "no-store",
      },
    },
  );
}
