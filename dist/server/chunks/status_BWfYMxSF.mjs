globalThis.process ??= {};
globalThis.process.env ??= {};
import { a as getSession } from "./session_DrG56q3V.mjs";
import { c as createAstroCookieAdapter } from "./astro-cookie-adapter_xxiMZNR-.mjs";
import { D as DEFAULT_LANG } from "./records_Dm89wn-w.mjs";
const buildFetchHandler = (handler) => {
  if (typeof handler === "object") {
    return handler.handle.bind(handler);
  }
  return handler;
};
const JSON_CONTENT_TYPE_RE = /\bapplication\/json\b/;
class Client {
  constructor({ handler, proxy = null }) {
    this.handler = buildFetchHandler(handler);
    this.proxy = proxy;
  }
  /**
   * clones this XRPC client
   * @param opts options to merge with
   * @returns the cloned XRPC client
   */
  clone({ handler = this.handler, proxy = this.proxy } = {}) {
    return new Client({ handler, proxy });
  }
  get(name, options = {}) {
    return this.#perform("get", name, options);
  }
  post(name, options = {}) {
    return this.#perform("post", name, options);
  }
  async call(schema, options = {}) {
    {
      return;
    }
  }
  async #perform(method, name, { signal, as: format = "json", headers, input, params }) {
    const isWebInput = input && (input instanceof Blob || ArrayBuffer.isView(input) || input instanceof ArrayBuffer || input instanceof ReadableStream);
    const url = `/xrpc/${name}` + _constructSearchParams(params);
    const response = await this.handler(url, {
      method,
      signal,
      body: input && !isWebInput ? JSON.stringify(input) : input,
      headers: _mergeHeaders(headers, {
        "content-type": input && !isWebInput ? "application/json" : null,
        "atproto-proxy": this.proxy
      }),
      duplex: input instanceof ReadableStream ? "half" : void 0
    });
    {
      const status = response.status;
      const headers2 = response.headers;
      const type = headers2.get("content-type");
      if (status !== 200) {
        let json;
        if (type != null && JSON_CONTENT_TYPE_RE.test(type)) {
          try {
            const parsed = await response.json();
            if (isXRPCErrorPayload(parsed)) {
              json = parsed;
            }
          } catch {
          }
        } else {
          await response.body?.cancel();
        }
        return {
          ok: false,
          status,
          headers: headers2,
          data: json ?? {
            error: `UnknownXRPCError`,
            message: `Request failed with status code ${status}`
          }
        };
      }
      {
        let data;
        switch (format) {
          case "json": {
            if (type != null && JSON_CONTENT_TYPE_RE.test(type)) {
              data = await response.json();
            } else {
              await response.body?.cancel();
              throw new TypeError(`Invalid response content-type (got ${type})`);
            }
            break;
          }
          case null: {
            data = null;
            await response.body?.cancel();
            break;
          }
          case "blob": {
            data = await response.blob();
            break;
          }
          case "bytes": {
            data = new Uint8Array(await response.arrayBuffer());
            break;
          }
          case "stream": {
            data = response.body;
            break;
          }
        }
        return {
          ok: true,
          status,
          headers: headers2,
          data
        };
      }
    }
  }
}
const _constructSearchParams = (params) => {
  let searchParams;
  for (const key in params) {
    const value = params[key];
    if (value !== void 0) {
      searchParams ??= new URLSearchParams();
      if (Array.isArray(value)) {
        for (let idx = 0, len = value.length; idx < len; idx++) {
          const val = value[idx];
          searchParams.append(key, "" + val);
        }
      } else {
        searchParams.set(key, "" + value);
      }
    }
  }
  return searchParams ? `?` + searchParams.toString() : "";
};
const _mergeHeaders = (init, defaults) => {
  let headers;
  for (const name in defaults) {
    const value = defaults[name];
    if (value !== null) {
      headers ??= new Headers(init);
      if (!headers.has(name)) {
        headers.set(name, value);
      }
    }
  }
  return headers ?? init;
};
const isXRPCErrorPayload = (input) => {
  if (typeof input !== "object" || input == null) {
    return false;
  }
  const kindType = typeof input.error;
  const messageType = typeof input.message;
  return kindType === "string" && (messageType === "undefined" || messageType === "string");
};
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
const NAME_COLLECTION = "blue.pronouns.name";
const PRONOUN_COLLECTION = "blue.pronouns.pronoun";
function extractRecordKey(uri) {
  if (!uri.startsWith("at://")) throw new Error(`Invalid record URI: ${uri}`);
  const parts = uri.split("/");
  const rkey = parts.at(-1);
  if (!rkey) throw new Error(`Missing record key in URI: ${uri}`);
  return rkey;
}
async function listAllRecordUris(rpc, repo, collection) {
  const uris = [];
  let cursor;
  do {
    const response = await rpc.get("com.atproto.repo.listRecords", {
      params: { repo, collection, limit: 100, cursor }
    });
    if (!response.ok) {
      throw new Error(response.data.message ?? "Failed to list profile records");
    }
    uris.push(...response.data.records.map((record) => record.uri));
    cursor = response.data.cursor;
  } while (cursor);
  return uris;
}
const POST = async ({ request, cookies, locals }) => {
  const cookieAdapter = createAstroCookieAdapter(cookies, request);
  const session = await getSession(cookieAdapter);
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
    const rpc = new Client({ handler: session });
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const [existingNameUris, existingPronounUris] = await Promise.all([
      listAllRecordUris(rpc, session.did, NAME_COLLECTION),
      listAllRecordUris(rpc, session.did, PRONOUN_COLLECTION)
    ]);
    await Promise.all([
      ...existingNameUris.map(async (uri) => {
        const response = await rpc.post("com.atproto.repo.deleteRecord", {
          input: {
            repo: session.did,
            collection: NAME_COLLECTION,
            rkey: extractRecordKey(uri)
          },
          as: null
        });
        if (!response.ok) {
          throw new Error(response.data.message ?? "Failed to delete name record");
        }
      }),
      ...existingPronounUris.map(async (uri) => {
        const response = await rpc.post("com.atproto.repo.deleteRecord", {
          input: {
            repo: session.did,
            collection: PRONOUN_COLLECTION,
            rkey: extractRecordKey(uri)
          },
          as: null
        });
        if (!response.ok) {
          throw new Error(
            response.data.message ?? "Failed to delete pronoun record"
          );
        }
      })
    ]);
    await Promise.all(
      groups.flatMap(
        ({ lang, names, pronouns, preferredNames, preferredPronouns }) => {
          const preferredNameSet = new Set(preferredNames);
          const preferredPronounSet = new Set(preferredPronouns);
          return [
            ...names.map(async (value, index) => {
              const response = await rpc.post("com.atproto.repo.createRecord", {
                input: {
                  repo: session.did,
                  collection: NAME_COLLECTION,
                  record: {
                    $type: NAME_COLLECTION,
                    value,
                    preferred: preferredNameSet.has(value),
                    lang,
                    sortOrder: index,
                    createdAt: now,
                    updatedAt: now
                  }
                },
                as: null
              });
              if (!response.ok) {
                throw new Error(
                  response.data.message ?? "Failed to create name record"
                );
              }
            }),
            ...pronouns.map(async (value, index) => {
              const response = await rpc.post("com.atproto.repo.createRecord", {
                input: {
                  repo: session.did,
                  collection: PRONOUN_COLLECTION,
                  record: {
                    $type: PRONOUN_COLLECTION,
                    value,
                    preferred: preferredPronounSet.has(value),
                    lang,
                    sortOrder: index,
                    createdAt: now,
                    updatedAt: now
                  }
                },
                as: null
              });
              if (!response.ok) {
                throw new Error(
                  response.data.message ?? "Failed to create pronoun record"
                );
              }
            })
          ];
        }
      )
    );
    const cfContext = locals.cfContext;
    if (cfContext) {
      const profileUrl = new URL(request.url);
      profileUrl.pathname = `/profile/${session.did}`;
      cfContext.waitUntil(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        caches.default.delete(profileUrl.toString()).catch(() => {
        })
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        counts: {
          names: groups.reduce((s, g) => s + g.names.length, 0),
          pronouns: groups.reduce((s, g) => s + g.pronouns.length, 0)
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
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
const _page = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: "Module" }));
const page = () => _page;
export {
  page
};
