import { defineMiddleware } from "astro:middleware";

/**
 * Mirrors the httpOnly `did` cookie into a non-httpOnly `did-public` cookie so
 * that client-side React components can read the current user's DID without a
 * server round-trip.
 *
 * The DID is a public identifier on ATProto — exposing it to client-side JS is
 * intentional and safe. The security-sensitive OAuth session token stays in the
 * httpOnly `session` cookie and is never exposed here.
 */
export const onRequest = defineMiddleware(async (context, next) => {
  const did = context.cookies.get("did")?.value;

  if (did) {
    context.cookies.set("did-public", did, {
      httpOnly: false,
      secure: import.meta.env.PROD,
      sameSite: "lax",
      path: "/",
    });
  } else {
    context.cookies.delete("did-public", { path: "/" });
  }

  return next();
});
