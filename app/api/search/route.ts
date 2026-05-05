import { NextRequest, NextResponse } from "next/server";
import { searchHandles } from "@/lib/db/queries";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const results = await searchHandles(query, 8);
  return NextResponse.json({ results });
}
