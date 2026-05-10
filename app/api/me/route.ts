import { getDid } from "@/lib/auth/session";
import { getActorProfile } from "@/lib/atproto/profiles";
import { getProfileRecordsFromPds } from "@/lib/atproto/records";
import { NextResponse } from "next/server";

/**
 * Returns the currently logged-in user's profile and whether their profile is
 * empty ("first time" state). Called client-side by NavUser and HomeUserSection
 * so that the root layout and home page can be statically rendered.
 *
 * Response is cached privately in the browser for 60 seconds so that repeated
 * same-session navigations do not each invoke a serverless function.
 */
export async function GET() {
  const did = await getDid();

  if (!did) {
    return NextResponse.json(
      { user: null, isFirstTime: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const [actor, profile] = await Promise.all([
    getActorProfile(did),
    getProfileRecordsFromPds(did),
  ]);

  const isFirstTime = profile.groups.every(
    (g) => g.names.length === 0 && g.pronouns.length === 0,
  );

  return NextResponse.json(
    { user: actor, isFirstTime },
    { headers: { "Cache-Control": "private, max-age=60" } },
  );
}
