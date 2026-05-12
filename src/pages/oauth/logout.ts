import type { APIRoute } from "astro";
import { getOAuthClient, runWithCookies } from "@/lib/auth/client";

export const prerender = false;

export const POST: APIRoute = async ({ cookies }) => {
  try {
    const did = cookies.get("did")?.value;

    if (did) {
      await runWithCookies(cookies, async () => {
        const client = await getOAuthClient();
        await client.revoke(did);
      });
    }
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    cookies.delete("did", { path: "/" });
    cookies.delete("session", { path: "/" });
    cookies.delete("oauth_state", { path: "/" });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
