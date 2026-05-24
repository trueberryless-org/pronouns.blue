import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { Client } from "@atproto/lex";
import { AtUri } from "@atproto/syntax";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { OAuthSession } from "@atproto/oauth-client-node";
import { getSession } from "@/lib/auth/session";
import { getProfileRecordsTag } from "@/lib/atproto/cache";
import { DEFAULT_LANG } from "@/lib/atproto/records";
import {
  saveProfileSaveJob,
  type ProfileJobStore,
  type ProfileSaveJob,
} from "@/lib/jobs/profile-save";
import * as blue from "@/lib/lexicons/blue";

interface IncomingGroup {
  lang: string;
  names: unknown;
  pronouns: unknown;
  preferredNames: unknown;
  preferredPronouns: unknown;
}

function cleanEntries(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Map(
      value
        .map((item) => (typeof item === "string" ? item.trim() : ""))
        .filter(Boolean)
        .slice(0, 128)
        .map((item) => [item.toLocaleLowerCase(), item]),
    ).values(),
  );
}

const serverDisplayNames = new Intl.DisplayNames(["en"], { type: "language" });

function cleanLang(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_LANG;
  const v = value.trim();
  if (v.length < 2 || v.length > 35) return DEFAULT_LANG;
  try {
    new Intl.Locale(v);
  } catch {
    return DEFAULT_LANG;
  }
  try {
    const name = serverDisplayNames.of(v);
    if (name && name.toLowerCase() !== v.toLowerCase()) return v;
  } catch {
    /* ignore */
  }
  return DEFAULT_LANG;
}

async function listAllRecordUris(
  lexClient: Client,
  schema: typeof blue.pronouns.name.main | typeof blue.pronouns.pronoun.main,
) {
  const uris: string[] = [];
  let cursor: string | undefined;
  do {
    const response = await lexClient.list(schema, { limit: 100, cursor });
    uris.push(...response.records.map((record) => record.uri));
    cursor = response.cursor;
  } while (cursor);
  return uris;
}

type CleanGroup = {
  lang: string;
  names: string[];
  pronouns: string[];
  preferredNames: string[];
  preferredPronouns: string[];
};

function getCounts(groups: CleanGroup[]) {
  return {
    names: groups.reduce((s, g) => s + g.names.length, 0),
    pronouns: groups.reduce((s, g) => s + g.pronouns.length, 0),
  };
}

async function publishProfileRecords(session: OAuthSession, groups: CleanGroup[]) {
  const lexClient = new Client(session);
  const now = new Date().toISOString();

  const [existingNameUris, existingPronounUris] = await Promise.all([
    listAllRecordUris(lexClient, blue.pronouns.name.main),
    listAllRecordUris(lexClient, blue.pronouns.pronoun.main),
  ]);

  await Promise.all([
    ...existingNameUris.map((uri) =>
      lexClient.delete(blue.pronouns.name.main, {
        rkey: new AtUri(uri).rkey,
      }),
    ),
    ...existingPronounUris.map((uri) =>
      lexClient.delete(blue.pronouns.pronoun.main, {
        rkey: new AtUri(uri).rkey,
      }),
    ),
  ]);

  await Promise.all(
    groups.flatMap(
      ({ lang, names, pronouns, preferredNames, preferredPronouns }) => {
        const preferredNameSet = new Set(preferredNames);
        const preferredPronounSet = new Set(preferredPronouns);
        return [
          ...names.map((value, index) =>
            lexClient.create(blue.pronouns.name.main, {
              value,
              preferred: preferredNameSet.has(value),
              lang,
              sortOrder: index,
              createdAt: now,
              updatedAt: now,
            }),
          ),
          ...pronouns.map((value, index) =>
            lexClient.create(blue.pronouns.pronoun.main, {
              value,
              preferred: preferredPronounSet.has(value),
              lang,
              sortOrder: index,
              createdAt: now,
              updatedAt: now,
            }),
          ),
        ];
      },
    ),
  );

  revalidateTag(getProfileRecordsTag(session.did), "seconds");
}

async function runBackgroundPublish(
  store: ProfileJobStore,
  jobBase: Omit<ProfileSaveJob, "status" | "updatedAt" | "counts" | "error">,
  session: OAuthSession,
  groups: CleanGroup[],
) {
  try {
    await saveProfileSaveJob(store, {
      ...jobBase,
      status: "processing",
      updatedAt: new Date().toISOString(),
    });

    await publishProfileRecords(session, groups);

    await saveProfileSaveJob(store, {
      ...jobBase,
      status: "success",
      updatedAt: new Date().toISOString(),
      counts: getCounts(groups),
    });
  } catch (err) {
    console.error("[api/status] Failed to publish records:", err);
    const message =
      err instanceof Error ? err.message : "Failed to save profile";
    await saveProfileSaveJob(store, {
      ...jobBase,
      status: "error",
      updatedAt: new Date().toISOString(),
      error: message,
    });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const rawGroups = (body as { groups?: unknown }).groups;
  if (!Array.isArray(rawGroups) || rawGroups.length === 0) {
    return NextResponse.json(
      { error: "At least one language group is required" },
      { status: 400 },
    );
  }

  const groups: CleanGroup[] = [];

  for (const raw of rawGroups as IncomingGroup[]) {
    const lang = cleanLang(raw.lang);
    const names = cleanEntries(raw.names);
    const pronouns = cleanEntries(raw.pronouns);
    const preferredNames = cleanEntries(raw.preferredNames).filter((e) =>
      names.includes(e),
    );
    const preferredPronouns = cleanEntries(raw.preferredPronouns).filter((e) =>
      pronouns.includes(e),
    );
    if (names.length > 0 || pronouns.length > 0) {
      groups.push({ lang, names, pronouns, preferredNames, preferredPronouns });
    }
  }

  if (groups.length === 0) {
    return NextResponse.json(
      { error: "At least one name or pronoun is required" },
      { status: 400 },
    );
  }

  let cloudflareContext: Awaited<ReturnType<typeof getCloudflareContext>> | null =
    null;
  try {
    cloudflareContext = await getCloudflareContext({ async: true });
  } catch {
    cloudflareContext = null;
  }

  const store = (cloudflareContext?.env as Record<string, unknown> | undefined)
    ?.PROFILE_JOBS as ProfileJobStore | undefined;

  const ctx = (
    cloudflareContext as {
      ctx?: { waitUntil?: (promise: Promise<void>) => void };
    } | null
  )?.ctx;
  const waitUntil = ctx?.waitUntil?.bind(ctx);

  if (!cloudflareContext) {
    try {
      await publishProfileRecords(session, groups);
      return NextResponse.json({ success: true, counts: getCounts(groups) });
    } catch (err) {
      console.error("[api/status] Failed to publish records:", err);
      const message =
        err instanceof Error ? err.message : "Failed to save profile";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  if (!store || !waitUntil) {
    if (process.env.NODE_ENV !== "production") {
      try {
        await publishProfileRecords(session, groups);
        return NextResponse.json({ success: true, counts: getCounts(groups) });
      } catch (err) {
        console.error("[api/status] Failed to publish records:", err);
        const message =
          err instanceof Error ? err.message : "Failed to save profile";
        return NextResponse.json({ error: message }, { status: 500 });
      }
    }

    return NextResponse.json(
      { error: "Background job store is not configured" },
      { status: 500 },
    );
  }

  const jobId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const jobBase = {
    id: jobId,
    did: session.did,
    createdAt,
  };

  await saveProfileSaveJob(store, {
    ...jobBase,
    status: "pending",
    updatedAt: createdAt,
  });

  waitUntil(runBackgroundPublish(store, jobBase, session, groups));

  return NextResponse.json(
    { jobId },
    {
      status: 202,
      headers: { Location: `/api/status/${jobId}` },
    },
  );
}
