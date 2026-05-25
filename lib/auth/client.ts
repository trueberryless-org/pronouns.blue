import {
  OAuthClient,
  type ClientAssertionPrivateJwk,
  type ConfidentialClientMetadata,
  type PublicClientMetadata,
  type SessionStore,
  type StateStore,
  type StoredSession,
  type StoredState,
} from "@atcute/oauth-node-client";
import {
  CompositeDidDocumentResolver,
  LocalActorResolver,
  PlcDidDocumentResolver,
  WebDidDocumentResolver,
  XrpcHandleResolver,
} from "@atcute/identity-resolver";
import { cookies } from "next/headers";

export const SCOPE =
  "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";

let client: OAuthClient | null = null;

const PUBLIC_URL = process.env.PUBLIC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_APPVIEW_URL =
  process.env.PUBLIC_APPVIEW_URL || "https://public.api.bsky.app";
const IS_PROD = process.env.NODE_ENV === "production";

const STATE_COOKIE = "oauth_state";
const SESSION_COOKIE = "session";
const SESSION_CHUNK_SIZE = 3000;

function splitCookieValue(value: string, size: number): string[] {
  if (value.length <= size) return [value];
  const chunks: string[] = [];
  for (let i = 0; i < value.length; i += size) {
    chunks.push(value.slice(i, i + size));
  }
  return chunks;
}

function readChunkedCookie(
  jar: Awaited<ReturnType<typeof cookies>>,
  name: string,
) {
  const direct = jar.get(name)?.value;
  if (direct) return direct;

  const prefix = `${name}.`;
  const all = "getAll" in jar ? jar.getAll() : [];
  const chunks = all
    .map((cookie) => {
      if (!cookie.name.startsWith(prefix)) return null;
      const indexRaw = cookie.name.slice(prefix.length);
      if (!/^\d+$/.test(indexRaw)) return null;
      return { index: Number(indexRaw), value: cookie.value };
    })
    .filter((chunk): chunk is { index: number; value: string } => !!chunk)
    .sort((a, b) => a.index - b.index);

  if (chunks.length === 0 || chunks[0].index !== 0) return undefined;
  for (let i = 1; i < chunks.length; i++) {
    if (chunks[i].index !== chunks[i - 1].index + 1) return undefined;
  }
  return chunks.map((chunk) => chunk.value).join("");
}

function clearChunkedCookie(
  jar: Awaited<ReturnType<typeof cookies>>,
  name: string,
) {
  const prefix = `${name}.`;
  const all = "getAll" in jar ? jar.getAll() : [];
  for (const cookie of all) {
    if (cookie.name === name || cookie.name.startsWith(prefix)) {
      jar.delete(cookie.name);
    }
  }
}

function writeChunkedCookie(
  jar: Awaited<ReturnType<typeof cookies>>,
  name: string,
  value: string,
  options: Parameters<typeof jar.set>[2],
) {
  const chunks = splitCookieValue(value, SESSION_CHUNK_SIZE);
  const prefix = `${name}.`;
  clearChunkedCookie(jar, name);
  if (chunks.length === 1) {
    jar.set(name, chunks[0], options);
    return;
  }
  chunks.forEach((chunk, index) => {
    jar.set(`${prefix}${index}`, chunk, options);
  });
}

function getConfidentialMetadata(): ConfidentialClientMetadata {
  if (!PUBLIC_URL || !PRIVATE_KEY) {
    throw new Error("PUBLIC_URL and PRIVATE_KEY are required for OAuth.");
  }
  return {
    client_id: `${PUBLIC_URL}/oauth-client-metadata.json`,
    client_name: "pronouns.blue",
    client_uri: PUBLIC_URL,
    redirect_uris: [`${PUBLIC_URL}/oauth/callback`],
    scope: SCOPE,
    jwks_uri: `${PUBLIC_URL}/.well-known/jwks.json`,
  };
}

function getPublicMetadata(): PublicClientMetadata {
  return {
    redirect_uris: ["http://127.0.0.1:3000/oauth/callback"],
    scope: SCOPE,
  };
}

function getKeyset(): ClientAssertionPrivateJwk[] | undefined {
  if (PUBLIC_URL && !PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is required when PUBLIC_URL is set.");
  }
  if (PUBLIC_URL && PRIVATE_KEY) {
    return [JSON.parse(PRIVATE_KEY) as ClientAssertionPrivateJwk];
  }
  return undefined;
}

function getOriginalFetch(): typeof globalThis.fetch {
  // Next.js patches globalThis.fetch for ISR caching, which can corrupt DPoP
  // POST bodies. Use the original pre-patch fetch stored by Next at startup.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchAsAny = globalThis.fetch as any;
  return fetchAsAny._nextOriginalFetch || globalThis.fetch;
}

function createStateStore(): StateStore {
  return {
    async get(key: string) {
      const jar = await cookies();
      const raw = jar.get(STATE_COOKIE)?.value;
      if (!raw) return undefined;
      try {
        const parsed = JSON.parse(raw) as {
          key: string;
          value: StoredState;
        };
        return parsed.key === key ? parsed.value : undefined;
      } catch {
        return undefined;
      }
    },
    async set(key: string, value: StoredState) {
      try {
        const jar = await cookies();
        jar.set(STATE_COOKIE, JSON.stringify({ key, value }), {
          httpOnly: true,
          secure: IS_PROD,
          sameSite: "lax",
          maxAge: 600, // 10 minutes — enough for the OAuth redirect round-trip
          path: "/",
        });
      } catch {
        // cookies() is read-only in Server Components; ignore if called there
      }
    },
    async delete(key: string) {
      try {
        const jar = await cookies();
        const raw = jar.get(STATE_COOKIE)?.value;
        if (!raw) return;
        const parsed = JSON.parse(raw) as { key: string };
        if (parsed.key === key) {
          jar.delete(STATE_COOKIE);
        }
      } catch {
        // ignore
      }
    },
    async clear() {
      try {
        const jar = await cookies();
        jar.delete(STATE_COOKIE);
      } catch {
        // ignore
      }
    },
  };
}

function createSessionStore(): SessionStore {
  return {
    async get(key: string) {
      const jar = await cookies();
      const raw = jar.get(SESSION_COOKIE)?.value;
      if (!raw) return undefined;
      try {
        const parsed = JSON.parse(raw) as {
          key: string;
          value: StoredSession;
        };
        return parsed.key === key ? parsed.value : undefined;
      } catch {
        return undefined;
      }
    },
    async set(key: string, value: StoredSession) {
      try {
        const jar = await cookies();
        jar.set(SESSION_COOKIE, JSON.stringify({ key, value }), {
          httpOnly: true,
          secure: IS_PROD,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
      } catch {
        // ignore — token refresh in a Server Component won't persist,
        // but the session will be refreshed again on the next Route Handler call
      }
    },
    async delete(key: string) {
      try {
        const jar = await cookies();
        const raw = jar.get(SESSION_COOKIE)?.value;
        if (!raw) return;
        const parsed = JSON.parse(raw) as { key: string };
        if (parsed.key === key) {
          jar.delete(SESSION_COOKIE);
        }
      } catch {
        // ignore
      }
    },
    async clear() {
      try {
        const jar = await cookies();
        jar.delete(SESSION_COOKIE);
      } catch {
        // ignore
      }
    },
  };
}

function createActorResolver(fetchImpl: typeof globalThis.fetch) {
  return new LocalActorResolver({
    handleResolver: new XrpcHandleResolver({
      serviceUrl: PUBLIC_APPVIEW_URL,
      fetch: fetchImpl,
    }),
    didDocumentResolver: new CompositeDidDocumentResolver({
      methods: {
        plc: new PlcDidDocumentResolver({ fetch: fetchImpl }),
        web: new WebDidDocumentResolver({ fetch: fetchImpl }),
      },
    }),
  });
}

export async function getOAuthClient(): Promise<OAuthClient> {
  if (client) return client;
  const originalFetch = getOriginalFetch();
  const keyset = getKeyset();
  const metadata = keyset ? getConfidentialMetadata() : getPublicMetadata();

  client = new OAuthClient({
    ...(keyset ? { keyset } : {}),
    metadata,
    actorResolver: createActorResolver(originalFetch),
    stores: {
      states: createStateStore(),
      sessions: createSessionStore(),
    },
    fetch: originalFetch,
  });

  return client;
}
