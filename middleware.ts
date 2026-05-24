import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Mirrors the httpOnly `did` cookie into a non-httpOnly `did-public` cookie so
 * that client components can read the current user's DID without a server call.
 *
 * The DID is a public identifier on ATProto — exposing it to client-side JS is
 * intentional and safe. The security-sensitive OAuth session token remains in
 * the httpOnly `session` cookie and is never exposed here.
 */
export function middleware(request: NextRequest) {
  const did = request.cookies.get("did")?.value;
  const response = NextResponse.next();

  if (did) {
    response.cookies.set("did-public", did, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  } else {
    response.cookies.delete("did-public");
  }

  return response;
}

export const config = {
  // Run on all page routes; skip Next.js internals and API routes (which handle
  // auth server-side via the httpOnly cookies directly).
  matcher: ["/((?!_next/static|_next/image|favicon|api/).*)"],
};

export const runtime = "experimental-edge";
