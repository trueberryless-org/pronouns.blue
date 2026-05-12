import type { APIRoute } from "astro";
import { getOAuthClient, runWithCookies } from "@/lib/auth/client";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
  const client = await runWithCookies(cookies, () => getOAuthClient());
  return new Response(JSON.stringify(client.clientMetadata), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
