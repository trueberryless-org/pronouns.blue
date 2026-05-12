import { r as runWithCookies, g as getOAuthClient } from './client_BKFXYDiu.mjs';

const prerender = false;
const PUBLIC_URL = "http://127.0.0.1:3000";
const GET = async ({ url, cookies }) => {
  try {
    const params = url.searchParams;
    const { session } = await runWithCookies(cookies, async () => {
      const client = await getOAuthClient();
      return client.callback(params);
    });
    const isSecure = new URL(PUBLIC_URL).protocol === "https:";
    cookies.set("did", session.did, {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });
    return new Response(null, {
      status: 302,
      headers: { Location: "/" }
    });
  } catch (error) {
    console.error("OAuth callback error:", error);
    return new Response(null, {
      status: 302,
      headers: { Location: "/?error=login_failed" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
