import { r as runWithCookies, g as getOAuthClient } from './client_BKFXYDiu.mjs';

const prerender = false;
const GET = async ({ cookies }) => {
  const client = await runWithCookies(cookies, () => getOAuthClient());
  return new Response(JSON.stringify(client.clientMetadata), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
