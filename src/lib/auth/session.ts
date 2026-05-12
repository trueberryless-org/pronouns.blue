import type { AstroCookies } from "astro";
import { getOAuthClient, runWithCookies } from "./client";
import type { OAuthSession } from "@atproto/oauth-client-node";

export async function getSession(
  cookies: AstroCookies,
): Promise<OAuthSession | null> {
  const did = getDid(cookies);
  if (!did) return null;
  try {
    return await runWithCookies(cookies, async () => {
      const client = await getOAuthClient();
      return await client.restore(did);
    });
  } catch {
    return null;
  }
}

export function getDid(cookies: AstroCookies): string | null {
  return cookies.get("did")?.value ?? null;
}
