import { getOAuthClient } from "@/lib/auth/client";
import { NextResponse } from "next/server";

// The URL of this endpoint IS your client_id
// Authorization servers fetch this to learn about your app

export async function GET() {
  const client = await getOAuthClient();
  return NextResponse.json(client.metadata, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
