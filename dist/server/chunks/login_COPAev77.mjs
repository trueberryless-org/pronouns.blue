import { r as runWithCookies, g as getOAuthClient, S as SCOPE } from './client_BKFXYDiu.mjs';

const prerender = false;
const POST = async ({ request, cookies }) => {
  try {
    let handle;
    try {
      const body = await request.json();
      handle = body?.handle;
    } catch {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (!handle || typeof handle !== "string") {
      return new Response(JSON.stringify({ error: "Handle is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const authUrl = await runWithCookies(cookies, async () => {
      const client = await getOAuthClient();
      return client.authorize(handle, { scope: SCOPE });
    });
    return new Response(
      JSON.stringify({ redirectUrl: authUrl.toString() }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("OAuth login error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Login failed"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
