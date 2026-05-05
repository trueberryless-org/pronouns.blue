interface DidDocument {
  service?: { id: string; type: string; serviceEndpoint: string }[];
}

interface PdsRecord<T> {
  uri: string;
  cid: string;
  value: T;
}

interface ListRecordsResponse<T> {
  records: PdsRecord<T>[];
  cursor?: string;
}

interface NameValue {
  value: string;
  preferred: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

interface PronounValue {
  value: string;
  preferred: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface PdsProfile {
  names: string[];
  pronouns: string[];
  preferredNames: string[];
  preferredPronouns: string[];
}

async function resolvePdsUrl(did: string): Promise<string | null> {
  try {
    let doc: DidDocument;
    if (did.startsWith("did:plc:")) {
      const res = await fetch(`https://plc.directory/${did}`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return null;
      doc = (await res.json()) as DidDocument;
    } else if (did.startsWith("did:web:")) {
      const host = did.slice("did:web:".length);
      const res = await fetch(`https://${host}/.well-known/did.json`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) return null;
      doc = (await res.json()) as DidDocument;
    } else {
      return null;
    }
    const pds = doc.service?.find((s) => s.type === "AtprotoPersonalDataServer");
    return pds?.serviceEndpoint ?? null;
  } catch {
    return null;
  }
}

async function listAllRecords<T>(
  pdsUrl: string,
  did: string,
  collection: string,
): Promise<PdsRecord<T>[]> {
  const records: PdsRecord<T>[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(`${pdsUrl}/xrpc/com.atproto.repo.listRecords`);
    url.searchParams.set("repo", did);
    url.searchParams.set("collection", collection);
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) break;

    const data = (await res.json()) as ListRecordsResponse<T>;
    records.push(...data.records);
    cursor = data.cursor;
  } while (cursor);

  return records;
}

function aggregateEntries(
  records: { uri: string; value: string; preferred: boolean; sortOrder: number; updatedAt: string }[],
): { values: string[]; preferred: string[] } {
  const byNorm = new Map<string, (typeof records)[0]>();
  for (const r of records) {
    const key = r.value.toLocaleLowerCase();
    const cur = byNorm.get(key);
    if (!cur || r.updatedAt > cur.updatedAt || (r.updatedAt === cur.updatedAt && r.uri > cur.uri)) {
      byNorm.set(key, r);
    }
  }
  const sorted = Array.from(byNorm.values()).sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    if (a.updatedAt !== b.updatedAt) return a.updatedAt < b.updatedAt ? 1 : -1;
    return a.value.localeCompare(b.value);
  });
  return {
    values: sorted.map((e) => e.value),
    preferred: sorted.filter((e) => e.preferred).map((e) => e.value),
  };
}

export async function getProfileRecordsFromPds(did: string): Promise<PdsProfile> {
  const pdsUrl = await resolvePdsUrl(did);

  if (!pdsUrl) return { names: [], pronouns: [], preferredNames: [], preferredPronouns: [] };

  const [nameRecords, pronounRecords] = await Promise.all([
    listAllRecords<NameValue>(pdsUrl, did, "blue.pronouns.name"),
    listAllRecords<PronounValue>(pdsUrl, did, "blue.pronouns.pronoun"),
  ]);

  const names = aggregateEntries(
    nameRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt,
    })),
  );

  const pronouns = aggregateEntries(
    pronounRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt,
    })),
  );

  return {
    names: names.values,
    pronouns: pronouns.values,
    preferredNames: names.preferred,
    preferredPronouns: pronouns.preferred,
  };
}
