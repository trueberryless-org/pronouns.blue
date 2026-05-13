import { AsyncLocalStorage } from "node:async_hooks";
import type { AstroCookies } from "astro";
import {
  AtprotoHandleResolverNode,
  JoseKey,
  Keyset,
  NodeOAuthClient,
  buildAtprotoLoopbackClientMetadata,
} from "@atproto/oauth-client-node";
import type {
  NodeSavedSession,
  NodeSavedState,
  OAuthClientMetadataInput,
} from "@atproto/oauth-client-node";

export const SCOPE =
  "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";

const PUBLIC_URL = process.env.PUBLIC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const IS_PROD = process.env.NODE_ENV === "production";

const STATE_COOKIE = "oauth_state";
const SESSION_COOKIE = "session";

// AsyncLocalStorage holds the current Astro request's cookies so that the
// singleton NodeOAuthClient's stores always see the correct per-request cookie jar.
const cookieStorage = new AsyncLocalStorage<AstroCookies>();

/** Wrap any OAuth operation so the singleton's cookie stores have access to the current request's cookies. */
export function runWithCookies<T>(
  cookies: AstroCookies,
  fn: () => Promise<T>,
): Promise<T> {
  return cookieStorage.run(cookies, fn);
}

function getJar(): AstroCookies {
  const jar = cookieStorage.getStore();
  if (!jar) throw new Error("No cookie store in context. Use runWithCookies().");
  return jar;
}

function isLoopbackUrl(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== "https:") return true;
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("127.")
    );
  } catch {
    return true;
  }
}

function getClientMetadata(): OAuthClientMetadataInput {
  if (PUBLIC_URL && !isLoopbackUrl(PUBLIC_URL)) {
    return {
      client_id: `${PUBLIC_URL}/oauth-client-metadata.json`,
      client_name: "pronouns.blue",
      client_uri: PUBLIC_URL,
      redirect_uris: [`${PUBLIC_URL}/oauth/callback`],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      scope: SCOPE,
      token_endpoint_auth_method: "private_key_jwt" as const,
      token_endpoint_auth_signing_alg: "ES256" as const,
      jwks_uri: `${PUBLIC_URL}/.well-known/jwks.json`,
      dpop_bound_access_tokens: true,
    };
  }

  const devPort = process.env.PORT || "4321";
  let callbackBase = `http://localhost:${devPort}`;
  if (PUBLIC_URL) {
    try {
      const { protocol, hostname, port } = new URL(PUBLIC_URL);
      callbackBase = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
    } catch {
      // keep default
    }
  }
  return buildAtprotoLoopbackClientMetadata({
    scope: SCOPE,
    redirect_uris: [`${callbackBase}/oauth/callback`],
  });
}

async function getKeyset(): Promise<Keyset | undefined> {
  if (PUBLIC_URL && !isLoopbackUrl(PUBLIC_URL) && PRIVATE_KEY) {
    return new Keyset([await JoseKey.fromJWK(JSON.parse(PRIVATE_KEY))]);
  }
  return undefined;
}

let client: NodeOAuthClient | null = null;

export async function getOAuthClient(): Promise<NodeOAuthClient> {
  if (client) return client;

  // Next.js patches globalThis.fetch; in Astro/Node we still prefer the raw fetch.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchAsAny = globalThis.fetch as any;
  const originalFetch = fetchAsAny?._nextOriginalFetch ?? globalThis.fetch;

  client = new NodeOAuthClient({
    fetch: originalFetch,
    handleResolver: new AtprotoHandleResolverNode({ fetch: originalFetch }),
    clientMetadata: getClientMetadata(),
    keyset: await getKeyset(),

    stateStore: {
      async get(key: string) {
        const jar = getJar();
        const raw = jar.get(STATE_COOKIE)?.value;
        if (!raw) return undefined;
        try {
          const parsed = JSON.parse(raw) as {
            key: string;
            value: NodeSavedState;
          };
          return parsed.key === key ? parsed.value : undefined;
        } catch {
          return undefined;
        }
      },
      async set(key: string, value: NodeSavedState) {
        try {
          const jar = getJar();
          jar.set(STATE_COOKIE, JSON.stringify({ key, value }), {
            httpOnly: true,
            secure: IS_PROD,
            sameSite: "lax",
            maxAge: 600,
            path: "/",
          });
        } catch {
          // ignore
        }
      },
      async del(_key: string) {
        try {
          const jar = getJar();
          jar.delete(STATE_COOKIE, { path: "/" });
        } catch {
          // ignore
        }
      },
    },

    sessionStore: {
      async get(_key: string) {
        const jar = getJar();
        const raw = jar.get(SESSION_COOKIE)?.value;
        if (!raw) return undefined;
        try {
          return JSON.parse(raw) as NodeSavedSession;
        } catch {
          return undefined;
        }
      },
      async set(_key: string, value: NodeSavedSession) {
        try {
          const jar = getJar();
          jar.set(SESSION_COOKIE, JSON.stringify(value), {
            httpOnly: true,
            secure: IS_PROD,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/",
          });
        } catch {
          // ignore
        }
      },
      async del(_key: string) {
        try {
          const jar = getJar();
          jar.delete(SESSION_COOKIE, { path: "/" });
        } catch {
          // ignore
        }
      },
    },
  });

  return client;
}
