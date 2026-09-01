import "@atcute/atproto";
import type { Client } from "@atcute/client";
import type { ActorIdentifier, Nsid } from "@atcute/lexicons/syntax";
import type { LanguageGroup } from "./records";

const COLLECTIONS = ["blue.pronouns.name", "blue.pronouns.pronoun"] as const;

async function listKeys(rpc: Client, repo: ActorIdentifier, collection: Nsid) {
  const keys: string[] = [];
  let cursor: string | undefined;
  do {
    const response = await rpc.get("com.atproto.repo.listRecords", {
      params: { repo, collection, limit: 100, cursor },
    });
    if (!response.ok) throw new Error(response.data.message ?? "Unable to read records");
    keys.push(...response.data.records.map((record) => record.uri.split("/").at(-1)!));
    cursor = response.data.cursor;
  } while (cursor);
  return keys;
}

export async function publishProfile(rpc: Client, did: ActorIdentifier, groups: LanguageGroup[]) {
  const keys = await Promise.all(COLLECTIONS.map((collection) => listKeys(rpc, did, collection)));
  const timestamp = new Date().toISOString();
  const writes: (
    | {
        $type: "com.atproto.repo.applyWrites#delete";
        collection: Nsid;
        rkey: string;
      }
    | {
        $type: "com.atproto.repo.applyWrites#create";
        collection: Nsid;
        value: Record<string, unknown>;
      }
  )[] = COLLECTIONS.flatMap((collection, index) =>
    keys[index].map((rkey) => ({
      $type: "com.atproto.repo.applyWrites#delete" as const,
      collection,
      rkey,
    })),
  );
  for (const group of groups) {
    for (const [collection, entries, preferred] of [
      ["blue.pronouns.name", group.names, group.preferredNames],
      ["blue.pronouns.pronoun", group.pronouns, group.preferredPronouns],
    ] as const) {
      for (const [sortOrder, value] of entries.entries()) {
        writes.push({
          $type: "com.atproto.repo.applyWrites#create",
          collection,
          value: {
            $type: collection,
            value,
            preferred: preferred.includes(value),
            lang: group.lang,
            sortOrder,
            createdAt: timestamp,
            updatedAt: timestamp,
          },
        });
      }
    }
  }
  if (writes.length > 200) {
    throw new Error(
      "This update contains more than 200 record changes. Remove some entries and try again.",
    );
  }
  const response = await rpc.post("com.atproto.repo.applyWrites", {
    input: { repo: did, writes },
    as: null,
  });
  if (!response.ok) throw new Error(response.data.message ?? "Unable to publish records");
}
