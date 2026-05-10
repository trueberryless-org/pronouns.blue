import type { Metadata } from "next";
import { ProfilePageClient } from "@/components/ProfilePageClient";

// Cache indefinitely — all content is loaded client-side.
// Tag-based revalidation via /api/status handles profile saves.
export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const handle = decodeURIComponent((await params).handle).replace(/^@/, "");
  return {
    title: `@${handle} – pronouns.blue`,
    description: `View @${handle}'s preferred names and pronouns on pronouns.blue`,
  };
}

export default async function HandleProfilePage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const handle = decodeURIComponent((await params).handle).replace(/^@/, "");
  return <ProfilePageClient handle={handle} />;
}
