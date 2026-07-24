import type { CookieAdapter } from "./cookie-adapter";
import { getOAuthClient } from "./client";
import type { OAuthSession } from "@atcute/oauth-node-client";
import { isDid, type Did } from "@atcute/lexicons/syntax";

export async function getSession(
  cookieAdapter: CookieAdapter,
): Promise<OAuthSession | null> {
  const did = getDid(cookieAdapter);
  if (!did) return null;

  try {
    const client = await getOAuthClient(cookieAdapter);
    return await client.restore(did);
  } catch {
    return null;
  }
}

export function getDid(cookieAdapter: CookieAdapter): Did | null {
  const did = cookieAdapter.get("did");
  if (!did || !isDid(did)) return null;
  return did;
}
