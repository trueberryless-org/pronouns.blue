import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ cache, request }) => {
  let did: string;
  try {
    const body = (await request.json()) as { did?: unknown };
    did = typeof body.did === "string" ? body.did : "";
  } catch {
    did = "";
  }
  if (!/^did:(plc|web):[a-zA-Z0-9._:%-]+(?::[a-zA-Z0-9._:%-]+)*$/.test(did)) {
    return new Response("Invalid DID", { status: 400 });
  }
  try {
    await cache.invalidate({ tags: `profile:${did}` });
  } catch (error) {
    if (!(error instanceof TypeError && error.message.includes("cache.purge"))) throw error;
  }
  return new Response(null, { status: 204 });
};
