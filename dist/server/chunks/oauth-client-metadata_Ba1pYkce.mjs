globalThis.process ??= {};
globalThis.process.env ??= {};
import { g as getOAuthClient, c as createAstroCookieAdapter } from "./astro-cookie-adapter_xxiMZNR-.mjs";
const GET = async ({ request, cookies }) => {
  const cookieAdapter = createAstroCookieAdapter(cookies, request);
  const client = await getOAuthClient(cookieAdapter);
  return new Response(JSON.stringify(client.metadata), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
};
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
