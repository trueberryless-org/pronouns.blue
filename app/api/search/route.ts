import { NextRequest, NextResponse } from "next/server";
import { searchActors } from "@/lib/atproto/profiles";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const results = await searchActors(query, 8);
  return NextResponse.json({ results });
}
