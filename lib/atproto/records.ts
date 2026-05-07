import { getProfileRecordsTag } from "@/lib/atproto/cache";

export const DEFAULT_LANG = "en";

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
  lang?: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

interface PronounValue {
  value: string;
  preferred: boolean;
  lang?: string;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LanguageGroup {
  /** BCP-47 language tag, e.g. "en", "de", "zh-CN" */
  lang: string;
  names: string[];
  preferredNames: string[];
  pronouns: string[];
  preferredPronouns: string[];
}

export interface PdsProfile {
  groups: LanguageGroup[];
}

async function resolvePdsUrl(did: string): Promise<string | null> {
  try {
    const profileRecordsTag = getProfileRecordsTag(did);
    let doc: DidDocument;
    if (did.startsWith("did:plc:")) {
      const res = await fetch(`https://plc.directory/${did}`, {
        next: { revalidate: 3600, tags: [profileRecordsTag] },
      });
      if (!res.ok) return null;
      doc = (await res.json()) as DidDocument;
    } else if (did.startsWith("did:web:")) {
      const host = did.slice("did:web:".length);
      const res = await fetch(`https://${host}/.well-known/did.json`, {
        next: { revalidate: 3600, tags: [profileRecordsTag] },
      });
      if (!res.ok) return null;
      doc = (await res.json()) as DidDocument;
    } else {
      return null;
    }
    const pds = doc.service?.find(
      (s) => s.type === "AtprotoPersonalDataServer",
    );
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
  const profileRecordsTag = getProfileRecordsTag(did);
  const records: PdsRecord<T>[] = [];
  let cursor: string | undefined;

  do {
    const url = new URL(`${pdsUrl}/xrpc/com.atproto.repo.listRecords`);
    url.searchParams.set("repo", did);
    url.searchParams.set("collection", collection);
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);

    const res = await fetch(url.toString(), {
      next: { revalidate: 60, tags: [profileRecordsTag] },
    });
    if (!res.ok) break;

    const data = (await res.json()) as ListRecordsResponse<T>;
    records.push(...data.records);
    cursor = data.cursor;
  } while (cursor);

  return records;
}

function aggregateEntriesByLang(
  records: {
    uri: string;
    value: string;
    preferred: boolean;
    lang: string;
    sortOrder: number;
    updatedAt: string;
  }[],
): Map<string, { values: string[]; preferred: string[] }> {
  // Group by lang, then deduplicate by (lang, value) keeping the freshest record
  const byLang = new Map<string, Map<string, (typeof records)[0]>>();

  for (const r of records) {
    let langMap = byLang.get(r.lang);
    if (!langMap) {
      langMap = new Map();
      byLang.set(r.lang, langMap);
    }
    const key = r.value.toLocaleLowerCase();
    const cur = langMap.get(key);
    if (
      !cur ||
      r.updatedAt > cur.updatedAt ||
      (r.updatedAt === cur.updatedAt && r.uri > cur.uri)
    ) {
      langMap.set(key, r);
    }
  }

  const result = new Map<string, { values: string[]; preferred: string[] }>();
  for (const [lang, langMap] of byLang) {
    const sorted = Array.from(langMap.values()).sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      if (a.updatedAt !== b.updatedAt)
        return a.updatedAt < b.updatedAt ? 1 : -1;
      return a.value.localeCompare(b.value);
    });
    result.set(lang, {
      values: sorted.map((e) => e.value),
      preferred: sorted.filter((e) => e.preferred).map((e) => e.value),
    });
  }
  return result;
}

export async function getProfileRecordsFromPds(
  did: string,
): Promise<PdsProfile> {
  const pdsUrl = await resolvePdsUrl(did);

  if (!pdsUrl) return { groups: [] };

  const [nameRecords, pronounRecords] = await Promise.all([
    listAllRecords<NameValue>(pdsUrl, did, "blue.pronouns.name"),
    listAllRecords<PronounValue>(pdsUrl, did, "blue.pronouns.pronoun"),
  ]);

  const namesByLang = aggregateEntriesByLang(
    nameRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      lang: r.value.lang ?? DEFAULT_LANG,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt,
    })),
  );

  const pronounsByLang = aggregateEntriesByLang(
    pronounRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      lang: r.value.lang ?? DEFAULT_LANG,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt,
    })),
  );

  // Collect all langs, English first
  const allLangs = new Set<string>([
    ...namesByLang.keys(),
    ...pronounsByLang.keys(),
  ]);
  const sortedLangs = [
    DEFAULT_LANG,
    ...Array.from(allLangs)
      .filter((l) => l !== DEFAULT_LANG)
      .sort(),
  ].filter((l) => allLangs.has(l));

  const groups: LanguageGroup[] = sortedLangs.map((lang) => {
    const n = namesByLang.get(lang) ?? { values: [], preferred: [] };
    const p = pronounsByLang.get(lang) ?? { values: [], preferred: [] };
    return {
      lang,
      names: n.values,
      preferredNames: n.preferred,
      pronouns: p.values,
      preferredPronouns: p.preferred,
    };
  });

  return { groups };
}
