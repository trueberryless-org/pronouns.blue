import { r as runWithCookies, g as getOAuthClient } from './client_BKFXYDiu.mjs';

const prerender = false;
const POST = async ({ cookies }) => {
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
    headers: { "Content-Type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
