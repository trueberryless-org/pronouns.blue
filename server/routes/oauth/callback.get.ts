import { getOAuthClient } from "~/lib/auth/client";
import { createH3CookieAdapter } from "~/lib/auth/h3-cookie-adapter";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const params = new URLSearchParams(
    Object.fromEntries(Object.entries(query).map(([k, v]) => [k, String(v)])),
  );

  const isProd = process.env.NODE_ENV === "production";

  try {
    const cookieAdapter = createH3CookieAdapter(event);
    const client = await getOAuthClient(cookieAdapter);
    const { session } = await client.callback(params);

    setCookie(event, "did", session.did, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return sendRedirect(event, "/", 302);
  } catch (err) {
    console.error("[oauth/callback]", err);
    return sendRedirect(event, "/?error=login_failed", 302);
  }
});
