import type { APIRoute } from "astro";
import { getOAuthClient, runWithCookies } from "@/lib/auth/client";

export const prerender = false;

const IS_PROD = import.meta.env.PROD;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
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
      path: "/",
    });

    return redirect("/");
  } catch (error) {
    console.error("OAuth callback error:", error);
    return redirect("/?error=login_failed");
  }
};
