import { r as runWithCookies, g as getOAuthClient } from './client_BKFXYDiu.mjs';

const prerender = false;
const IS_PROD = true;
const GET = async ({ url, cookies, redirect }) => {
  try {
    const params = url.searchParams;
    const { session } = await runWithCookies(cookies, async () => {
      const client = await getOAuthClient();
      return client.callback(params);
    });
    cookies.set("did", session.did, {
      httpOnly: true,
      secure: IS_PROD,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });
    return redirect("/");
  } catch (error) {
    console.error("OAuth callback error:", error);
    return redirect("/?error=login_failed");
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
