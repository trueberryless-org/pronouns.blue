export const DEFAULT_LANG = "en";

export interface LanguageGroup {
  lang: string;
  names: string[];
  preferredNames: string[];
  pronouns: string[];
  preferredPronouns: string[];
}

interface RecordValue {
  value: string;
  preferred: boolean;
  lang?: string;
  sortOrder?: number;
  updatedAt: string;
}

interface PdsRecord {
  uri: string;
  value: RecordValue;
}

async function resolvePdsUrl(did: string) {
  try {
    let url: string | null = null;
    if (did.startsWith("did:plc:")) {
      url = `https://plc.directory/${did}`;
    } else if (did.startsWith("did:web:")) {
      const [host, ...path] = did.slice("did:web:".length).split(":").map(decodeURIComponent);
      url =
        path.length === 0
          ? `https://${host}/.well-known/did.json`
          : `https://${host}/${path.join("/")}/did.json`;
    }
    if (!url) return null;
    const response = await fetch(url);
    if (!response.ok) return null;
    const document = (await response.json()) as {
      service?: { type: string; serviceEndpoint: string }[];
    };
    return (
      document.service?.find((service) => service.type === "AtprotoPersonalDataServer")
        ?.serviceEndpoint ?? null
    );
  } catch {
    return null;
  }
}

async function listRecords(pds: string, did: string, collection: string) {
  const records: PdsRecord[] = [];
  let cursor: string | undefined;
  do {
    const url = new URL("/xrpc/com.atproto.repo.listRecords", pds);
    url.searchParams.set("repo", did);
    url.searchParams.set("collection", collection);
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);
    const response = await fetch(url);
    if (!response.ok) break;
    const value = (await response.json()) as { records: PdsRecord[]; cursor?: string };
    records.push(...value.records);
    cursor = value.cursor;
  } while (cursor);
  return records;
}

function aggregate(records: PdsRecord[]) {
  const languages = new Map<string, Map<string, PdsRecord>>();
  for (const record of records) {
    const language = record.value.lang ?? DEFAULT_LANG;
    const entries = languages.get(language) ?? new Map<string, PdsRecord>();
    const key = record.value.value.toLocaleLowerCase();
    const existing = entries.get(key);
    if (
      !existing ||
      record.value.updatedAt > existing.value.updatedAt ||
      (record.value.updatedAt === existing.value.updatedAt && record.uri > existing.uri)
    ) {
      entries.set(key, record);
    }
    languages.set(language, entries);
  }
  return new Map(
    [...languages].map(([language, entries]) => {
      const sorted = [...entries.values()].toSorted(
        (a, b) =>
          (a.value.sortOrder ?? 0) - (b.value.sortOrder ?? 0) ||
          a.value.value.localeCompare(b.value.value),
      );
      return [
        language,
        {
          values: sorted.map((record) => record.value.value),
          preferred: sorted
            .filter((record) => record.value.preferred)
            .map((record) => record.value.value),
        },
      ];
    }),
  );
}

export async function getProfileRecords(did: string) {
  const pds = await resolvePdsUrl(did);
  if (!pds) return { groups: [] as LanguageGroup[] };
  const [nameRecords, pronounRecords] = await Promise.all([
    listRecords(pds, did, "blue.pronouns.name"),
    listRecords(pds, did, "blue.pronouns.pronoun"),
  ]);
  const names = aggregate(nameRecords);
  const pronouns = aggregate(pronounRecords);
  const languages = new Set([...names.keys(), ...pronouns.keys()]);
  const ordered = [...languages].toSorted((a, b) => {
    if (a === DEFAULT_LANG) return -1;
    if (b === DEFAULT_LANG) return 1;
    return a.localeCompare(b);
  });
  return {
    groups: ordered.map((lang) => ({
      lang,
      names: names.get(lang)?.values ?? [],
      preferredNames: names.get(lang)?.preferred ?? [],
      pronouns: pronouns.get(lang)?.values ?? [],
      preferredPronouns: pronouns.get(lang)?.preferred ?? [],
    })),
  };
}
