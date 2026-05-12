import type { APIRoute } from "astro";
import { searchActors } from "@/lib/atproto/profiles";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const query = url.searchParams.get("q") ?? "";
  const results = await searchActors(query, 8);
  return new Response(JSON.stringify({ results }), {
    headers: { "Content-Type": "application/json" },
  });
};
