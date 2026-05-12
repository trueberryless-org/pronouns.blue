import { l, Client } from '@atproto/lex';
import { AtUri } from '@atproto/syntax';
import { a as getSession } from './session_B4aNHuDL.mjs';
import { r as runWithCookies } from './client_BKFXYDiu.mjs';
import { D as DEFAULT_LANG } from './records_BqEqK-mF.mjs';

const $nsid$1 = "blue.pronouns.name";
const main$1 = l.record(
  "tid",
  $nsid$1,
  l.object({
    value: l.string({ maxLength: 64, minLength: 1, maxGraphemes: 64 }),
    preferred: l.boolean(),
    lang: l.optional(l.string({ maxLength: 35, minLength: 2 })),
    sortOrder: l.optional(l.integer({ minimum: 0, maximum: 127 })),
    createdAt: l.string({ format: "datetime" }),
    updatedAt: l.string({ format: "datetime" })
  })
);
main$1.$type;

const $nsid = "blue.pronouns.pronoun";
const main = l.record(
  "tid",
  $nsid,
  l.object({
    value: l.string({ maxLength: 64, minLength: 1, maxGraphemes: 64 }),
    preferred: l.boolean(),
    lang: l.optional(l.string({ maxLength: 35, minLength: 2 })),
    sortOrder: l.optional(l.integer({ minimum: 0, maximum: 127 })),
    createdAt: l.string({ format: "datetime" }),
    updatedAt: l.string({ format: "datetime" })
  })
);
main.$type;

const prerender = false;
function cleanEntries(value) {
  if (!Array.isArray(value)) return [];
  return Array.from(
    new Map(
      value.map((item) => typeof item === "string" ? item.trim() : "").filter(Boolean).slice(0, 128).map((item) => [item.toLocaleLowerCase(), item])
    ).values()
  );
}
const serverDisplayNames = new Intl.DisplayNames(["en"], { type: "language" });
function cleanLang(value) {
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
  }
  return DEFAULT_LANG;
}
async function listAllRecordUris(lexClient, schema) {
  const uris = [];
  let cursor;
  do {
    const response = await lexClient.list(schema, { limit: 100, cursor });
    uris.push(...response.records.map((record) => record.uri));
    cursor = response.cursor;
  } while (cursor);
  return uris;
}
const POST = async ({ request, cookies }) => {
  const session = await runWithCookies(cookies, () => getSession(cookies));
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const rawGroups = body.groups;
  if (!Array.isArray(rawGroups) || rawGroups.length === 0) {
    return new Response(
      JSON.stringify({ error: "At least one language group is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  const groups = [];
  for (const raw of rawGroups) {
    const lang = cleanLang(raw.lang);
    const names = cleanEntries(raw.names);
    const pronouns = cleanEntries(raw.pronouns);
    const preferredNames = cleanEntries(raw.preferredNames).filter(
      (e) => names.includes(e)
    );
    const preferredPronouns = cleanEntries(raw.preferredPronouns).filter(
      (e) => pronouns.includes(e)
    );
    if (names.length > 0 || pronouns.length > 0) {
      groups.push({ lang, names, pronouns, preferredNames, preferredPronouns });
    }
  }
  if (groups.length === 0) {
    return new Response(
      JSON.stringify({ error: "At least one name or pronoun is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    const lexClient = new Client(session);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const [existingNameUris, existingPronounUris] = await Promise.all([
      listAllRecordUris(lexClient, main$1),
      listAllRecordUris(lexClient, main)
    ]);
    await Promise.all([
      ...existingNameUris.map(
        (uri) => lexClient.delete(main$1, {
          rkey: new AtUri(uri).rkey
        })
      ),
      ...existingPronounUris.map(
        (uri) => lexClient.delete(main, {
          rkey: new AtUri(uri).rkey
        })
      )
    ]);
    await Promise.all(
      groups.flatMap(
        ({ lang, names, pronouns, preferredNames, preferredPronouns }) => {
          const preferredNameSet = new Set(preferredNames);
          const preferredPronounSet = new Set(preferredPronouns);
          return [
            ...names.map(
              (value, index) => lexClient.create(main$1, {
                value,
                preferred: preferredNameSet.has(value),
                lang,
                sortOrder: index,
                createdAt: now,
                updatedAt: now
              })
            ),
            ...pronouns.map(
              (value, index) => lexClient.create(main, {
                value,
                preferred: preferredPronounSet.has(value),
                lang,
                sortOrder: index,
                createdAt: now,
                updatedAt: now
              })
            )
          ];
        }
      )
    );
    return new Response(
      JSON.stringify({
        success: true,
        counts: {
          names: groups.reduce((s, g) => s + g.names.length, 0),
          pronouns: groups.reduce((s, g) => s + g.pronouns.length, 0)
        }
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[api/status] Failed to publish records:", err);
    const message = err instanceof Error ? err.message : "Failed to save profile";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
