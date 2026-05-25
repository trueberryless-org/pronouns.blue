import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { Client } from "@atcute/client";
import type {} from "@atcute/atproto";
import type { ActorIdentifier, Nsid } from "@atcute/lexicons/syntax";
import { getSession } from "@/lib/auth/session";
import { getProfileRecordsTag } from "@/lib/atproto/cache";
import { DEFAULT_LANG } from "@/lib/atproto/records";

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

const NAME_COLLECTION: Nsid = "blue.pronouns.name";
const PRONOUN_COLLECTION: Nsid = "blue.pronouns.pronoun";

function extractRecordKey(uri: string): string {
  if (!uri.startsWith("at://")) {
    throw new Error(`Invalid record URI: ${uri}`);
  }
  const parts = uri.split("/");
  const rkey = parts.at(-1);
  if (!rkey) {
    throw new Error(`Missing record key in URI: ${uri}`);
  }
  return rkey;
}

async function listAllRecordUris(
  rpc: Client,
  repo: ActorIdentifier,
  collection: Nsid,
) {
  const uris: string[] = [];
  let cursor: string | undefined;
  do {
    const response = await rpc.get("com.atproto.repo.listRecords", {
      params: { repo, collection, limit: 100, cursor },
    });
    if (!response.ok) {
      throw new Error(
        response.data.message ?? "Failed to list profile records",
      );
    }
    uris.push(...response.data.records.map((record) => record.uri));
    cursor = response.data.cursor;
  } while (cursor);
  return uris;
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

  const groups: {
    lang: string;
    names: string[];
    pronouns: string[];
    preferredNames: string[];
    preferredPronouns: string[];
  }[] = [];

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

  try {
    const rpc = new Client({ handler: session });
    const now = new Date().toISOString();

    const [existingNameUris, existingPronounUris] = await Promise.all([
      listAllRecordUris(rpc, session.did, NAME_COLLECTION),
      listAllRecordUris(rpc, session.did, PRONOUN_COLLECTION),
    ]);

    await Promise.all([
      ...existingNameUris.map(async (uri) => {
        const response = await rpc.post("com.atproto.repo.deleteRecord", {
          input: {
            repo: session.did,
            collection: NAME_COLLECTION,
            rkey: extractRecordKey(uri),
          },
          as: null,
        });
        if (!response.ok) {
          throw new Error(
            response.data.message ?? "Failed to delete name record",
          );
        }
      }),
      ...existingPronounUris.map(async (uri) => {
        const response = await rpc.post("com.atproto.repo.deleteRecord", {
          input: {
            repo: session.did,
            collection: PRONOUN_COLLECTION,
            rkey: extractRecordKey(uri),
          },
          as: null,
        });
        if (!response.ok) {
          throw new Error(
            response.data.message ?? "Failed to delete pronoun record",
          );
        }
      }),
    ]);

    await Promise.all(
      groups.flatMap(
        ({ lang, names, pronouns, preferredNames, preferredPronouns }) => {
          const preferredNameSet = new Set(preferredNames);
          const preferredPronounSet = new Set(preferredPronouns);
          return [
            ...names.map(async (value, index) => {
              const response = await rpc.post(
                "com.atproto.repo.createRecord",
                {
                  input: {
                    repo: session.did,
                    collection: NAME_COLLECTION,
                    record: {
                      $type: NAME_COLLECTION,
                      value,
                      preferred: preferredNameSet.has(value),
                      lang,
                      sortOrder: index,
                      createdAt: now,
                      updatedAt: now,
                    },
                  },
                  as: null,
                },
              );
              if (!response.ok) {
                throw new Error(
                  response.data.message ?? "Failed to create name record",
                );
              }
            }),
            ...pronouns.map(async (value, index) => {
              const response = await rpc.post(
                "com.atproto.repo.createRecord",
                {
                  input: {
                    repo: session.did,
                    collection: PRONOUN_COLLECTION,
                    record: {
                      $type: PRONOUN_COLLECTION,
                      value,
                      preferred: preferredPronounSet.has(value),
                      lang,
                      sortOrder: index,
                      createdAt: now,
                      updatedAt: now,
                    },
                  },
                  as: null,
                },
              );
              if (!response.ok) {
                throw new Error(
                  response.data.message ?? "Failed to create pronoun record",
                );
              }
            }),
          ];
        },
      ),
    );

    revalidateTag(getProfileRecordsTag(session.did), "seconds");

    return NextResponse.json({
      success: true,
      counts: {
        names: groups.reduce((s, g) => s + g.names.length, 0),
        pronouns: groups.reduce((s, g) => s + g.pronouns.length, 0),
      },
    });
  } catch (err) {
    console.error("[api/status] Failed to publish records:", err);
    const message =
      err instanceof Error ? err.message : "Failed to save profile";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
