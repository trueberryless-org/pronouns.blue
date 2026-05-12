import type { APIRoute } from "astro";
import { getDid } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const did = getDid(cookies);

  if (!did) {
    return new Response(JSON.stringify({ user: null, isFirstTime: false }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }

  const [actor, profile] = await Promise.all([
    getActorProfile(did),
    getProfileRecordsFromPds(did),
  ]);

  const isFirstTime = profile.groups.every(
    (g) => g.names.length === 0 && g.pronouns.length === 0,
  );

  return new Response(JSON.stringify({ user: actor, isFirstTime }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, max-age=60",
    },
  });
};
