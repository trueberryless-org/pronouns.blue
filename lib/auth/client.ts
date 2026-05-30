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
import type { CookieAdapter, CookieOptions } from "@/lib/auth/cookie-adapter";

export const SCOPE =
  "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";

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
  cookieAdapter: CookieAdapter,
  name: string,
): string | undefined {
  const direct = cookieAdapter.get(name);
  if (direct) return direct;

  const prefix = `${name}.`;
  const chunks = cookieAdapter
    .getAll()
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

function clearChunkedCookie(cookieAdapter: CookieAdapter, name: string) {
  const prefix = `${name}.`;
  for (const cookie of cookieAdapter.getAll()) {
    if (cookie.name === name || cookie.name.startsWith(prefix)) {
      cookieAdapter.delete(cookie.name);
    }
  }
}

function writeChunkedCookie(
  cookieAdapter: CookieAdapter,
  name: string,
  value: string,
  options: CookieOptions,
) {
  const chunks = splitCookieValue(value, SESSION_CHUNK_SIZE);
  const prefix = `${name}.`;
  clearChunkedCookie(cookieAdapter, name);
  if (chunks.length === 1) {
    cookieAdapter.set(name, chunks[0], options);
    return;
  }
  chunks.forEach((chunk, index) => {
    cookieAdapter.set(`${prefix}${index}`, chunk, options);
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
  const base = PUBLIC_URL ?? "http://127.0.0.1:3000";
  return {
    redirect_uris: [`${base}/oauth/callback`],
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

function createStateStore(cookieAdapter: CookieAdapter): StateStore {
  return {
    async get(key: string) {
      const raw = cookieAdapter.get(STATE_COOKIE);
      if (!raw) return undefined;
      try {
        const parsed = JSON.parse(raw) as { key: string; value: StoredState };
        return parsed.key === key ? parsed.value : undefined;
      } catch {
        return undefined;
      }
    },
    async set(key: string, value: StoredState) {
      cookieAdapter.set(STATE_COOKIE, JSON.stringify({ key, value }), {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: "lax",
        maxAge: 600, // 10 minutes — enough for the OAuth redirect round-trip
        path: "/",
      });
    },
    async delete(key: string) {
      const raw = cookieAdapter.get(STATE_COOKIE);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as { key: string };
        if (parsed.key === key) {
          cookieAdapter.delete(STATE_COOKIE);
        }
      } catch {
        // ignore malformed cookie
      }
    },
    async clear() {
      cookieAdapter.delete(STATE_COOKIE);
    },
  };
}

function createSessionStore(cookieAdapter: CookieAdapter): SessionStore {
  return {
    async get(key: string) {
      const raw = readChunkedCookie(cookieAdapter, SESSION_COOKIE);
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
      writeChunkedCookie(
        cookieAdapter,
        SESSION_COOKIE,
        JSON.stringify({ key, value }),
        {
          httpOnly: true,
          secure: IS_PROD,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        },
      );
    },
    async delete(key: string) {
      const raw = readChunkedCookie(cookieAdapter, SESSION_COOKIE);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as { key: string };
        if (parsed.key === key) {
          clearChunkedCookie(cookieAdapter, SESSION_COOKIE);
        }
      } catch {
        // ignore malformed cookie
      }
    },
    async clear() {
      clearChunkedCookie(cookieAdapter, SESSION_COOKIE);
    },
  };
}

function createActorResolver() {
  return new LocalActorResolver({
    handleResolver: new XrpcHandleResolver({
      serviceUrl: PUBLIC_APPVIEW_URL,
      fetch: globalThis.fetch,
    }),
    didDocumentResolver: new CompositeDidDocumentResolver({
      methods: {
        plc: new PlcDidDocumentResolver({ fetch: globalThis.fetch }),
        web: new WebDidDocumentResolver({ fetch: globalThis.fetch }),
      },
    }),
  });
}

export async function getOAuthClient(
  cookieAdapter: CookieAdapter,
): Promise<OAuthClient> {
  const keyset = getKeyset();
  const metadata = keyset ? getConfidentialMetadata() : getPublicMetadata();

  return new OAuthClient({
    ...(keyset ? { keyset } : {}),
    metadata,
    actorResolver: createActorResolver(),
    stores: {
      states: createStateStore(cookieAdapter),
      sessions: createSessionStore(cookieAdapter),
    },
    fetch: globalThis.fetch,
  });
}
