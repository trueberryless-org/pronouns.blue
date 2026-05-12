import { AsyncLocalStorage } from 'node:async_hooks';
import { NodeOAuthClient, AtprotoHandleResolverNode, Keyset, JoseKey, buildAtprotoLoopbackClientMetadata } from '@atproto/oauth-client-node';

const SCOPE = "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";
const PUBLIC_URL = process.env.PUBLIC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const IS_PROD = process.env.NODE_ENV === "production";
const STATE_COOKIE = "oauth_state";
const SESSION_COOKIE = "session";
const cookieStorage = new AsyncLocalStorage();
function runWithCookies(cookies, fn) {
  return cookieStorage.run(cookies, fn);
}
function getJar() {
  const jar = cookieStorage.getStore();
  if (!jar) throw new Error("No cookie store in context. Use runWithCookies().");
  return jar;
}
function isLoopbackUrl(url) {
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== "https:") return true;
    return hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("127.");
  } catch {
    return true;
  }
}
function getClientMetadata() {
  if (PUBLIC_URL && !isLoopbackUrl(PUBLIC_URL)) {
    return {
      client_id: `${PUBLIC_URL}/oauth-client-metadata.json`,
      client_name: "pronouns.blue",
      client_uri: PUBLIC_URL,
      redirect_uris: [`${PUBLIC_URL}/oauth/callback`],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      scope: SCOPE,
      token_endpoint_auth_method: "private_key_jwt",
      token_endpoint_auth_signing_alg: "ES256",
      jwks_uri: `${PUBLIC_URL}/.well-known/jwks.json`,
      dpop_bound_access_tokens: true
    };
  }
  let callbackBase = "http://127.0.0.1:4321";
  if (PUBLIC_URL) {
    try {
      const { protocol, hostname, port } = new URL(PUBLIC_URL);
      callbackBase = `${protocol}//${hostname}${port ? `:${port}` : ""}`;
    } catch {
    }
  }
  return buildAtprotoLoopbackClientMetadata({
    scope: SCOPE,
    redirect_uris: [`${callbackBase}/oauth/callback`]
  });
}
async function getKeyset() {
  if (PUBLIC_URL && !isLoopbackUrl(PUBLIC_URL) && PRIVATE_KEY) {
    return new Keyset([await JoseKey.fromJWK(JSON.parse(PRIVATE_KEY))]);
  }
  return void 0;
}
let client = null;
async function getOAuthClient() {
  if (client) return client;
  const fetchAsAny = globalThis.fetch;
  const originalFetch = fetchAsAny?._nextOriginalFetch ?? globalThis.fetch;
  client = new NodeOAuthClient({
    fetch: originalFetch,
    handleResolver: new AtprotoHandleResolverNode({ fetch: originalFetch }),
    clientMetadata: getClientMetadata(),
    keyset: await getKeyset(),
    stateStore: {
      async get(key) {
        const jar = getJar();
        const raw = jar.get(STATE_COOKIE)?.value;
        if (!raw) return void 0;
        try {
          const parsed = JSON.parse(raw);
          return parsed.key === key ? parsed.value : void 0;
        } catch {
          return void 0;
        }
      },
      async set(key, value) {
        try {
          const jar = getJar();
          jar.set(STATE_COOKIE, JSON.stringify({ key, value }), {
            httpOnly: true,
            secure: IS_PROD,
            sameSite: "lax",
            maxAge: 600,
            path: "/"
          });
        } catch {
        }
      },
      async del(_key) {
        try {
          const jar = getJar();
          jar.delete(STATE_COOKIE, { path: "/" });
        } catch {
        }
      }
    },
    sessionStore: {
      async get(_key) {
        const jar = getJar();
        const raw = jar.get(SESSION_COOKIE)?.value;
        if (!raw) return void 0;
        try {
          return JSON.parse(raw);
        } catch {
          return void 0;
        }
      },
      async set(_key, value) {
        try {
          const jar = getJar();
          jar.set(SESSION_COOKIE, JSON.stringify(value), {
            httpOnly: true,
            secure: IS_PROD,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
          });
        } catch {
        }
      },
      async del(_key) {
        try {
          const jar = getJar();
          jar.delete(SESSION_COOKIE, { path: "/" });
        } catch {
        }
      }
    }
  });
  return client;
}

export { SCOPE as S, getOAuthClient as g, runWithCookies as r };
