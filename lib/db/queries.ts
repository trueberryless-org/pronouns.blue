import { getDb } from ".";

export interface ProfileRecord {
  uri: string;
  authorDid: string;
  names: string[];
  pronouns: string[];
  preferredNames: string[];
  preferredPronouns: string[];
  createdAt: string;
  updatedAt: string;
  indexedAt: string;
  current: 0 | 1;
}

export interface EntryRecord {
  uri: string;
  authorDid: string;
  value: string;
  preferred: 0 | 1;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  indexedAt: string;
}

export type NameRecord = EntryRecord;
export type PronounRecord = EntryRecord;

function maxIsoTimestamp(
  first: string | null | undefined,
  second: string | null | undefined,
) {
  if (!first) return second ?? null;
  if (!second) return first;
  return first > second ? first : second;
}

function chooseBetterEntry(current: EntryRecord, candidate: EntryRecord) {
  if (candidate.updatedAt !== current.updatedAt) {
    return candidate.updatedAt > current.updatedAt ? candidate : current;
  }
  if (candidate.indexedAt !== current.indexedAt) {
    return candidate.indexedAt > current.indexedAt ? candidate : current;
  }
  return candidate.uri > current.uri ? candidate : current;
}

function aggregateEntries(rows: EntryRecord[]) {
  const byNormalizedValue = new Map<string, EntryRecord>();

  for (const row of rows) {
    const key = row.value.toLocaleLowerCase();
    const current = byNormalizedValue.get(key);
    if (!current) {
      byNormalizedValue.set(key, row);
      continue;
    }
    byNormalizedValue.set(key, chooseBetterEntry(current, row));
  }

  const entries = Array.from(byNormalizedValue.values()).sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    if (a.updatedAt !== b.updatedAt) return a.updatedAt < b.updatedAt ? 1 : -1;
    if (a.indexedAt !== b.indexedAt) return a.indexedAt < b.indexedAt ? 1 : -1;
    return a.value.localeCompare(b.value);
  });

  const values = entries.map((entry) => entry.value);
  const preferred = entries
    .filter((entry) => entry.preferred === 1)
    .map((entry) => entry.value);

  let latestUri: string | null = null;
  let latestCreatedAt: string | null = null;
  let latestUpdatedAt: string | null = null;
  let latestIndexedAt: string | null = null;
  let latestEntry: EntryRecord | null = null;
  for (const entry of entries) {
    latestCreatedAt = maxIsoTimestamp(latestCreatedAt, entry.createdAt);
    latestUpdatedAt = maxIsoTimestamp(latestUpdatedAt, entry.updatedAt);
    latestIndexedAt = maxIsoTimestamp(latestIndexedAt, entry.indexedAt);
    if (
      !latestEntry ||
      entry.updatedAt > latestEntry.updatedAt ||
      (entry.updatedAt === latestEntry.updatedAt &&
        entry.indexedAt > latestEntry.indexedAt)
    ) {
      latestEntry = entry;
      latestUri = entry.uri;
    }
  }

  return {
    values,
    preferred,
    latestUri,
    latestCreatedAt,
    latestUpdatedAt,
    latestIndexedAt,
  };
}

export async function getCurrentProfileByDid(
  did: string,
): Promise<ProfileRecord | null> {
  const db = getDb();
  const [nameRows, pronounRows] = await Promise.all([
    db
      .selectFrom("name_record")
      .selectAll()
      .where("authorDid", "=", did)
      .execute(),
    db
      .selectFrom("pronoun_record")
      .selectAll()
      .where("authorDid", "=", did)
      .execute(),
  ]);

  if (nameRows.length === 0 && pronounRows.length === 0) return null;

  const names = aggregateEntries(nameRows);
  const pronouns = aggregateEntries(pronounRows);

  const createdAt =
    maxIsoTimestamp(names.latestCreatedAt, pronouns.latestCreatedAt) ??
    new Date(0).toISOString();
  const updatedAt =
    maxIsoTimestamp(names.latestUpdatedAt, pronouns.latestUpdatedAt) ??
    new Date(0).toISOString();
  const indexedAt =
    maxIsoTimestamp(names.latestIndexedAt, pronouns.latestIndexedAt) ??
    updatedAt;

  return {
    uri: names.latestUri ?? pronouns.latestUri ?? did,
    authorDid: did,
    names: names.values,
    pronouns: pronouns.values,
    preferredNames: names.preferred,
    preferredPronouns: pronouns.preferred,
    createdAt,
    updatedAt,
    indexedAt,
    current: 1,
  };
}

export async function upsertNameRecord(data: NameRecord) {
  await getDb()
    .insertInto("name_record")
    .values(data)
    .onConflict((oc) =>
      oc.column("uri").doUpdateSet({
        value: data.value,
        preferred: data.preferred,
        sortOrder: data.sortOrder,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        indexedAt: data.indexedAt,
      }),
    )
    .execute();
}

export async function upsertPronounRecord(data: PronounRecord) {
  await getDb()
    .insertInto("pronoun_record")
    .values(data)
    .onConflict((oc) =>
      oc.column("uri").doUpdateSet({
        value: data.value,
        preferred: data.preferred,
        sortOrder: data.sortOrder,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        indexedAt: data.indexedAt,
      }),
    )
    .execute();
}

export async function deleteNameRecord(uri: string) {
  await getDb().deleteFrom("name_record").where("uri", "=", uri).execute();
}

export async function deletePronounRecord(uri: string) {
  await getDb().deleteFrom("pronoun_record").where("uri", "=", uri).execute();
}

export async function deleteNameRecordsByDid(did: string) {
  await getDb()
    .deleteFrom("name_record")
    .where("authorDid", "=", did)
    .execute();
}

export async function deletePronounRecordsByDid(did: string) {
  await getDb()
    .deleteFrom("pronoun_record")
    .where("authorDid", "=", did)
    .execute();
}
