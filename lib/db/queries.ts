import { getDb, AccountTable } from ".";
import { getHandle } from "@atproto/common-web";
import { getTap } from "@/lib/tap";
import { sql } from "kysely";

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

export interface PublicProfileRecord extends ProfileRecord {
  handle: string | null;
}

export interface HandleSuggestion {
  did: string;
  handle: string;
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

export async function getAccountHandle(did: string): Promise<string | null> {
  const db = getDb();
  const account = await db
    .selectFrom("account")
    .select("handle")
    .where("did", "=", did)
    .executeTakeFirst();
  if (account) return account.handle;

  try {
    const didDoc = await getTap().resolveDid(did);
    if (!didDoc) return null;
    return getHandle(didDoc) ?? null;
  } catch {
    return null;
  }
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

export async function getCurrentProfileByHandle(
  handle: string,
): Promise<PublicProfileRecord | null> {
  const db = getDb();
  const account = await db
    .selectFrom("account")
    .select(["did", "handle"])
    .where(sql`lower(account.handle)`, "=", handle.toLocaleLowerCase())
    .limit(1)
    .executeTakeFirst();
  if (!account) return null;

  const profile = await getCurrentProfileByDid(account.did);
  if (!profile) return null;

  return { ...profile, handle: account.handle };
}

export async function getFirehoseProfiles(
  limit = 200,
): Promise<PublicProfileRecord[]> {
  const db = getDb();
  const [nameLatestRows, pronounLatestRows] = await Promise.all([
    db
      .selectFrom("name_record")
      .select((eb) => [
        "authorDid",
        eb.fn.max("indexedAt").as("latestIndexedAt"),
      ])
      .groupBy("authorDid")
      .execute(),
    db
      .selectFrom("pronoun_record")
      .select((eb) => [
        "authorDid",
        eb.fn.max("indexedAt").as("latestIndexedAt"),
      ])
      .groupBy("authorDid")
      .execute(),
  ]);

  const latestByDid = new Map<string, string>();
  for (const row of nameLatestRows) {
    if (row.latestIndexedAt)
      latestByDid.set(row.authorDid, row.latestIndexedAt);
  }
  for (const row of pronounLatestRows) {
    if (!row.latestIndexedAt) continue;
    const current = latestByDid.get(row.authorDid);
    latestByDid.set(
      row.authorDid,
      current && current > row.latestIndexedAt ? current : row.latestIndexedAt,
    );
  }

  const dids = Array.from(latestByDid.entries())
    .sort((a, b) => (a[1] < b[1] ? 1 : -1))
    .slice(0, limit)
    .map(([did]) => did);
  if (dids.length === 0) return [];

  const [nameRows, pronounRows, accounts] = await Promise.all([
    db
      .selectFrom("name_record")
      .selectAll()
      .where("authorDid", "in", dids)
      .execute(),
    db
      .selectFrom("pronoun_record")
      .selectAll()
      .where("authorDid", "in", dids)
      .execute(),
    db
      .selectFrom("account")
      .select(["did", "handle"])
      .where("did", "in", dids)
      .execute(),
  ]);

  const namesByDid = new Map<string, NameRecord[]>();
  const pronounsByDid = new Map<string, PronounRecord[]>();
  for (const row of nameRows) {
    const current = namesByDid.get(row.authorDid) ?? [];
    current.push(row);
    namesByDid.set(row.authorDid, current);
  }
  for (const row of pronounRows) {
    const current = pronounsByDid.get(row.authorDid) ?? [];
    current.push(row);
    pronounsByDid.set(row.authorDid, current);
  }

  const handleByDid = new Map(
    accounts.map((account) => [account.did, account.handle]),
  );
  const profiles: PublicProfileRecord[] = [];
  for (const did of dids) {
    const nameList = namesByDid.get(did) ?? [];
    const pronounList = pronounsByDid.get(did) ?? [];
    if (nameList.length === 0 && pronounList.length === 0) continue;

    const names = aggregateEntries(nameList);
    const pronouns = aggregateEntries(pronounList);
    const createdAt =
      maxIsoTimestamp(names.latestCreatedAt, pronouns.latestCreatedAt) ??
      new Date(0).toISOString();
    const updatedAt =
      maxIsoTimestamp(names.latestUpdatedAt, pronouns.latestUpdatedAt) ??
      new Date(0).toISOString();
    const indexedAt =
      maxIsoTimestamp(names.latestIndexedAt, pronouns.latestIndexedAt) ??
      updatedAt;

    profiles.push({
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
      handle: handleByDid.get(did) ?? null,
    });
  }

  return profiles;
}

export async function searchHandles(
  query: string,
  limit = 8,
): Promise<HandleSuggestion[]> {
  const db = getDb();
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];

  const rows = await db
    .selectFrom("account")
    .select(["account.did as did", "account.handle as handle"])
    .where(sql`lower(account.handle)`, "like", `%${normalized}%`)
    .where((eb) =>
      eb.or([
        eb.exists(
          eb
            .selectFrom("name_record")
            .select("name_record.uri")
            .whereRef("name_record.authorDid", "=", "account.did"),
        ),
        eb.exists(
          eb
            .selectFrom("pronoun_record")
            .select("pronoun_record.uri")
            .whereRef("pronoun_record.authorDid", "=", "account.did"),
        ),
      ]),
    )
    .orderBy("account.handle", "asc")
    .limit(limit)
    .execute();

  return rows;
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

export async function upsertAccount(data: AccountTable) {
  await getDb()
    .insertInto("account")
    .values(data)
    .onConflict((oc) =>
      oc.column("did").doUpdateSet({
        handle: data.handle,
        active: data.active,
      }),
    )
    .execute();
}

export async function deleteAccount(did: string) {
  await getDb().deleteFrom("account").where("did", "=", did).execute();
  await getDb().deleteFrom("profile").where("authorDid", "=", did).execute();
  await getDb()
    .deleteFrom("name_record")
    .where("authorDid", "=", did)
    .execute();
  await getDb()
    .deleteFrom("pronoun_record")
    .where("authorDid", "=", did)
    .execute();
}
