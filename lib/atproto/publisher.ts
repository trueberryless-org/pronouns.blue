import type { Client } from "@atcute/client";
import type { ActorIdentifier, Nsid } from "@atcute/lexicons/syntax";
import "@atcute/atproto";
import { DEFAULT_LANG, type LanguageGroup } from "~/lib/atproto/records";

const NAME_COLLECTION: Nsid = "blue.pronouns.name";
const PRONOUN_COLLECTION: Nsid = "blue.pronouns.pronoun";

function extractRecordKey(uri: string): string {
  const rkey = uri.split("/").at(-1);
  if (!uri.startsWith("at://") || !rkey) {
    throw new Error(`Invalid record URI: ${uri}`);
  }
  return rkey;
}

async function listAllRecordUris(
  rpc: Client,
  repo: ActorIdentifier,
  collection: Nsid,
): Promise<string[]> {
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

export async function publishProfileRecords(
  rpc: Client,
  did: ActorIdentifier,
  groups: LanguageGroup[],
) {
  const [nameUris, pronounUris] = await Promise.all([
    listAllRecordUris(rpc, did, NAME_COLLECTION),
    listAllRecordUris(rpc, did, PRONOUN_COLLECTION),
  ]);

  for (const [collection, uris] of [
    [NAME_COLLECTION, nameUris],
    [PRONOUN_COLLECTION, pronounUris],
  ] as const) {
    for (const uri of uris) {
      const response = await rpc.post("com.atproto.repo.deleteRecord", {
        input: { repo: did, collection, rkey: extractRecordKey(uri) },
        as: null,
      });
      if (!response.ok) {
        throw new Error(
          response.data.message ?? "Failed to delete profile record",
        );
      }
    }
  }

  const now = new Date().toISOString();
  for (const group of groups) {
    const lang = group.lang || DEFAULT_LANG;
    const preferredNames = new Set(group.preferredNames);
    const preferredPronouns = new Set(group.preferredPronouns);

    for (const [collection, values, preferred] of [
      [NAME_COLLECTION, group.names, preferredNames],
      [PRONOUN_COLLECTION, group.pronouns, preferredPronouns],
    ] as const) {
      for (const [sortOrder, value] of values.entries()) {
        const response = await rpc.post("com.atproto.repo.createRecord", {
          input: {
            repo: did,
            collection,
            record: {
              $type: collection,
              value,
              preferred: preferred.has(value),
              lang,
              sortOrder,
              createdAt: now,
              updatedAt: now,
            },
          },
          as: null,
        });
        if (!response.ok) {
          throw new Error(
            response.data.message ?? "Failed to create profile record",
          );
        }
      }
    }
  }
}
