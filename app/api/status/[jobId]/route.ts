import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getSession } from "@/lib/auth/session";
import {
  loadProfileSaveJob,
  type ProfileJobStore,
} from "@/lib/jobs/profile-save";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ jobId: string }> },
) {
  const { jobId } = await context.params;
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let cloudflareContext: Awaited<
    ReturnType<typeof getCloudflareContext>
  > | null = null;
  try {
    cloudflareContext = await getCloudflareContext({ async: true });
  } catch {
    cloudflareContext = null;
  }

  const store = (cloudflareContext?.env as Record<string, unknown> | undefined)
    ?.PROFILE_JOBS as ProfileJobStore | undefined;

  if (!store) {
    return NextResponse.json(
      { error: "Background job store is not configured" },
      { status: 500 },
    );
  }

  const job = await loadProfileSaveJob(store, jobId);
  if (!job || job.did !== session.did) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    status: job.status,
    counts: job.counts,
    error: job.error,
    updatedAt: job.updatedAt,
  });
}
