import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient, SCOPE } from "@/lib/auth/client";
import { isActorIdentifier } from "@atcute/lexicons/syntax";

export async function POST(request: NextRequest) {
  try {
    const { handle } = await request.json();

    if (!handle || typeof handle !== "string") {
      return NextResponse.json(
        { error: "Handle is required" },
        { status: 400 },
      );
    }
    if (!isActorIdentifier(handle)) {
      return NextResponse.json(
        { error: "Handle is invalid" },
        { status: 400 },
      );
    }

    const client = await getOAuthClient();

    // Resolves handle, finds their auth server, returns authorization URL
    const { url } = await client.authorize({
      target: { type: "account", identifier: handle },
      scope: SCOPE,
    });

    return NextResponse.json({ redirectUrl: url.toString() });
  } catch (error) {
    console.error("OAuth login error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Login failed" },
      { status: 500 },
    );
  }
}
