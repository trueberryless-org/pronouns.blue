globalThis.process ??= {};
globalThis.process.env ??= {};
const DEFAULT_LANG = "en";
async function resolvePdsUrl(did) {
  try {
    let doc;
    if (did.startsWith("did:plc:")) {
      const res = await fetch(`https://plc.directory/${did}`);
      if (!res.ok) return null;
      doc = await res.json();
    } else if (did.startsWith("did:web:")) {
      const host = did.slice("did:web:".length);
      const res = await fetch(`https://${host}/.well-known/did.json`);
      if (!res.ok) return null;
      doc = await res.json();
    } else {
      return null;
    }
    const pds = doc.service?.find(
      (s) => s.type === "AtprotoPersonalDataServer"
    );
    return pds?.serviceEndpoint ?? null;
  } catch {
    return null;
  }
}
async function listAllRecords(pdsUrl, did, collection) {
  const records = [];
  let cursor;
  do {
    const url = new URL(`${pdsUrl}/xrpc/com.atproto.repo.listRecords`);
    url.searchParams.set("repo", did);
    url.searchParams.set("collection", collection);
    url.searchParams.set("limit", "100");
    if (cursor) url.searchParams.set("cursor", cursor);
    const res = await fetch(url.toString());
    if (!res.ok) break;
    const data = await res.json();
    records.push(...data.records);
    cursor = data.cursor;
  } while (cursor);
  return records;
}
function aggregateEntriesByLang(records) {
  const byLang = /* @__PURE__ */ new Map();
  for (const r of records) {
    let langMap = byLang.get(r.lang);
    if (!langMap) {
      langMap = /* @__PURE__ */ new Map();
      byLang.set(r.lang, langMap);
    }
    const key = r.value.toLocaleLowerCase();
    const cur = langMap.get(key);
    if (!cur || r.updatedAt > cur.updatedAt || r.updatedAt === cur.updatedAt && r.uri > cur.uri) {
      langMap.set(key, r);
    }
  }
  const result = /* @__PURE__ */ new Map();
  for (const [lang, langMap] of byLang) {
    const sorted = Array.from(langMap.values()).sort((a, b) => {
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      if (a.updatedAt !== b.updatedAt)
        return a.updatedAt < b.updatedAt ? 1 : -1;
      return a.value.localeCompare(b.value);
    });
    result.set(lang, {
      values: sorted.map((e) => e.value),
      preferred: sorted.filter((e) => e.preferred).map((e) => e.value)
    });
  }
  return result;
}
async function getProfileRecordsFromPds(did) {
  const pdsUrl = await resolvePdsUrl(did);
  if (!pdsUrl) return { groups: [] };
  const [nameRecords, pronounRecords] = await Promise.all([
    listAllRecords(pdsUrl, did, "blue.pronouns.name"),
    listAllRecords(pdsUrl, did, "blue.pronouns.pronoun")
  ]);
  const namesByLang = aggregateEntriesByLang(
    nameRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      lang: r.value.lang ?? DEFAULT_LANG,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt
    }))
  );
  const pronounsByLang = aggregateEntriesByLang(
    pronounRecords.map((r) => ({
      uri: r.uri,
      value: r.value.value,
      preferred: r.value.preferred,
      lang: r.value.lang ?? DEFAULT_LANG,
      sortOrder: r.value.sortOrder ?? 0,
      updatedAt: r.value.updatedAt
    }))
  );
  const allLangs = /* @__PURE__ */ new Set([
    ...namesByLang.keys(),
    ...pronounsByLang.keys()
  ]);
  const sortedLangs = [
    DEFAULT_LANG,
    ...Array.from(allLangs).filter((l) => l !== DEFAULT_LANG).sort()
  ].filter((l) => allLangs.has(l));
  const groups = sortedLangs.map((lang) => {
    const n = namesByLang.get(lang) ?? { values: [], preferred: [] };
    const p = pronounsByLang.get(lang) ?? { values: [], preferred: [] };
    return {
      lang,
      names: n.values,
      preferredNames: n.preferred,
      pronouns: p.values,
      preferredPronouns: p.preferred
    };
  });
  return { groups };
}
export {
  DEFAULT_LANG as D,
  getProfileRecordsFromPds as g
};
