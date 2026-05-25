import { cookies } from "next/headers";
import { getOAuthClient } from "./client";
import type { OAuthSession } from "@atcute/oauth-node-client";
import { isDid, type Did } from "@atcute/lexicons/syntax";

export async function getSession(): Promise<OAuthSession | null> {
  const did = await getDid();
  if (!did) return null;

  try {
    const client = await getOAuthClient();
    return await client.restore(did);
  } catch {
    return null;
  }
}

export async function getDid(): Promise<Did | null> {
  const cookieStore = await cookies();
  const did = cookieStore.get("did")?.value;
  if (!did || !isDid(did)) return null;
  return did;
}
