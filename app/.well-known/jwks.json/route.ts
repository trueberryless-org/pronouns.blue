import { NextResponse } from "next/server";
import { JoseKey } from "@atproto/oauth-client-node";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

export async function GET() {
  if (!PRIVATE_KEY) {
    return NextResponse.json({ keys: [] });
  }

  const key = await JoseKey.fromJWK(JSON.parse(PRIVATE_KEY));
  return NextResponse.json({
    keys: [key.publicJwk],
  });
}
