import type { APIRoute } from "astro";
import { JoseKey } from "@atproto/oauth-client-node";

export const prerender = false;

const PRIVATE_KEY = import.meta.env.PRIVATE_KEY;

export const GET: APIRoute = async () => {
  if (!PRIVATE_KEY) {
    return new Response(JSON.stringify({ keys: [] }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }

  const key = await JoseKey.fromJWK(JSON.parse(PRIVATE_KEY));
  return new Response(JSON.stringify({ keys: [key.publicJwk] }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
