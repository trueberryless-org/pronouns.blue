import { NextRequest, NextResponse } from "next/server";
import { Client } from "@atproto/lex";
import { AtUri } from "@atproto/syntax";
import { getSession } from "@/lib/auth/session";
import * as blue from "@/lib/lexicons/blue";

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

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { names, pronouns, preferredNames, preferredPronouns } =
    (await request.json()) as {
      names: unknown;
      pronouns: unknown;
      preferredNames: unknown;
      preferredPronouns: unknown;
    };
  const cleanedNames = cleanEntries(names);
  const cleanedPronouns = cleanEntries(pronouns);
  const cleanedPreferredNames = cleanEntries(preferredNames).filter((entry) =>
    cleanedNames.includes(entry),
  );
  const cleanedPreferredPronouns = cleanEntries(preferredPronouns).filter(
    (entry) => cleanedPronouns.includes(entry),
  );

  if (cleanedNames.length === 0) {
    return NextResponse.json(
      { error: "At least one name is required" },
      { status: 400 },
    );
  }
  if (cleanedPronouns.length === 0) {
    return NextResponse.json(
      { error: "At least one pronoun is required" },
      { status: 400 },
    );
  }

  const lexClient = new Client(session);
  const now = new Date().toISOString();
  const preferredNameSet = new Set(cleanedPreferredNames);
  const preferredPronounSet = new Set(cleanedPreferredPronouns);

  const [existingNameUris, existingPronounUris] = await Promise.all([
    listAllRecordUris(lexClient, blue.pronouns.name.main),
    listAllRecordUris(lexClient, blue.pronouns.pronoun.main),
  ]);

  await Promise.all([
    ...existingNameUris.map((uri) =>
      lexClient.delete(blue.pronouns.name.main, { rkey: new AtUri(uri).rkey }),
    ),
    ...existingPronounUris.map((uri) =>
      lexClient.delete(blue.pronouns.pronoun.main, {
        rkey: new AtUri(uri).rkey,
      }),
    ),
  ]);

  await Promise.all([
    ...cleanedNames.map((value, index) =>
      lexClient.create(blue.pronouns.name.main, {
        value,
        preferred: preferredNameSet.has(value),
        sortOrder: index,
        createdAt: now,
        updatedAt: now,
      }),
    ),
    ...cleanedPronouns.map((value, index) =>
      lexClient.create(blue.pronouns.pronoun.main, {
        value,
        preferred: preferredPronounSet.has(value),
        sortOrder: index,
        createdAt: now,
        updatedAt: now,
      }),
    ),
  ]);

  return NextResponse.json({
    success: true,
    counts: { names: cleanedNames.length, pronouns: cleanedPronouns.length },
  });
}
