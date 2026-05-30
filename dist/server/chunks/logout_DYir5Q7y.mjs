globalThis.process ??= {};
globalThis.process.env ??= {};
import { c as createAstroCookieAdapter, i as isDid, g as getOAuthClient } from "./astro-cookie-adapter_xxiMZNR-.mjs";
import { g as getDid } from "./session_DrG56q3V.mjs";
const POST = async ({ request, cookies }) => {
  try {
    const cookieAdapter = createAstroCookieAdapter(cookies, request);
    const did = getDid(cookieAdapter);
    if (did && isDid(did)) {
      const client = await getOAuthClient(cookieAdapter);
      await client.revoke(did);
    }
    cookies.delete("did", { path: "/" });
    cookies.delete("session", { path: "/" });
    cookies.delete("oauth_state", { path: "/" });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Logout error:", error);
    cookies.delete("did", { path: "/" });
    cookies.delete("session", { path: "/" });
    cookies.delete("oauth_state", { path: "/" });
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
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
