import type { APIRoute } from "astro";
import { getOAuthClient, runWithCookies, SCOPE } from "@/lib/auth/client";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    let handle: string | undefined;
    try {
      const body = await request.json();
      handle = body?.handle;
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!handle || typeof handle !== "string") {
      return new Response(JSON.stringify({ error: "Handle is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const authUrl = await runWithCookies(cookies, async () => {
      const client = await getOAuthClient();
      return client.authorize(handle as string, { scope: SCOPE });
    });

    return new Response(
      JSON.stringify({ redirectUrl: authUrl.toString() }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("OAuth login error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Login failed",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
