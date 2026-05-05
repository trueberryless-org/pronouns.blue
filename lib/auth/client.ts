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
import { cookies } from "next/headers";

export const SCOPE =
  "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";

let client: NodeOAuthClient | null = null;

const PUBLIC_URL = process.env.PUBLIC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const IS_PROD = process.env.NODE_ENV === "production";

const STATE_COOKIE = "oauth_state";
const SESSION_COOKIE = "session";

function getClientMetadata(): OAuthClientMetadataInput {
  if (PUBLIC_URL) {
    return {
      client_id: `${PUBLIC_URL}/oauth-client-metadata.json`,
      client_name: "pronouns.blue",
      client_uri: PUBLIC_URL,
      redirect_uris: [`${PUBLIC_URL}/oauth/callback`],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      scope: SCOPE,
      token_endpoint_auth_method: "private_key_jwt" as const,
      token_endpoint_auth_signing_alg: "ES256" as const, // must match the alg in scripts/gen-key.ts
      jwks_uri: `${PUBLIC_URL}/.well-known/jwks.json`,
      dpop_bound_access_tokens: true,
    };
  } else {
    return buildAtprotoLoopbackClientMetadata({
      scope: SCOPE,
      redirect_uris: ["http://127.0.0.1:3000/oauth/callback"],
    });
  }
}

async function getKeyset(): Promise<Keyset | undefined> {
  if (PUBLIC_URL && PRIVATE_KEY) {
    return new Keyset([await JoseKey.fromJWK(JSON.parse(PRIVATE_KEY))]);
  } else {
    return undefined;
  }
}

export async function getOAuthClient(): Promise<NodeOAuthClient> {
  if (client) return client;

  // Next.js patches globalThis.fetch for ISR caching, which can corrupt DPoP
  // POST bodies. Use the original pre-patch fetch stored by Next at startup.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const originalFetch =
    (globalThis.fetch as any)._nextOriginalFetch ?? globalThis.fetch;

  client = new NodeOAuthClient({
    fetch: originalFetch,
    // Explicit handleResolver so it inherits the same originalFetch for consistency
    handleResolver: new AtprotoHandleResolverNode({ fetch: originalFetch }),
    clientMetadata: getClientMetadata(),
    keyset: await getKeyset(),

    stateStore: {
      async get(key: string) {
        const jar = await cookies();
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
      async del(_key: string) {
        try {
          const jar = await cookies();
          jar.delete(STATE_COOKIE);
        } catch {
          // ignore
        }
      },
    },

    sessionStore: {
      async get(_key: string) {
        const jar = await cookies();
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
          const jar = await cookies();
          jar.set(SESSION_COOKIE, JSON.stringify(value), {
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
      async del(_key: string) {
        try {
          const jar = await cookies();
          jar.delete(SESSION_COOKIE);
        } catch {
          // ignore
        }
      },
    },
  });

  return client;
}
