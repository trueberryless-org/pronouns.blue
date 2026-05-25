import { NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/auth/client";

export async function GET() {
  const client = await getOAuthClient();
  const jwks = client.jwks ?? { keys: [] };
  return NextResponse.json(
    jwks,
    {
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    },
  );
}
