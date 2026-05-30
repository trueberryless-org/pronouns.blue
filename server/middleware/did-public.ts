import { getCookie, setCookie, deleteCookie } from "h3";

/**
 * Mirror the httpOnly `did` cookie into a non-httpOnly `did-public` cookie so
 * client-side Vue composables (useAuth) can read the current user's DID without
 * an API call. Runs on every request via Nitro middleware.
 */
export default defineEventHandler((event) => {
  const did = getCookie(event, "did");
  const isProd = process.env.NODE_ENV === "production";

  if (did) {
    setCookie(event, "did-public", did, {
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      path: "/",
    });
  } else {
    deleteCookie(event, "did-public", { path: "/" });
  }
});
