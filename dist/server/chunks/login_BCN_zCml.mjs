globalThis.process ??= {};
globalThis.process.env ??= {};
import { i as isDid, a as isHandle, c as createAstroCookieAdapter, g as getOAuthClient, S as SCOPE } from "./astro-cookie-adapter_xxiMZNR-.mjs";
const isActorIdentifier = /* @__NO_SIDE_EFFECTS__ */ (input) => {
  return isDid(input) || isHandle(input);
};
const POST = async ({ request, cookies }) => {
  try {
    const { handle } = await request.json();
    if (!handle || typeof handle !== "string") {
      return new Response(JSON.stringify({ error: "Handle is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!/* @__PURE__ */ isActorIdentifier(handle)) {
      return new Response(JSON.stringify({ error: "Handle is invalid" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const cookieAdapter = createAstroCookieAdapter(cookies, request);
    const client = await getOAuthClient(cookieAdapter);
    const { url } = await client.authorize({
      target: { type: "account", identifier: handle },
      scope: SCOPE
    });
    return new Response(JSON.stringify({ redirectUrl: url.toString() }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("OAuth login error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Login failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
