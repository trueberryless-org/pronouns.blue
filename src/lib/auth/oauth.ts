import {
  CompositeDidDocumentResolver,
  LocalActorResolver,
  PlcDidDocumentResolver,
  WebDidDocumentResolver,
  XrpcHandleResolver,
} from "@atcute/identity-resolver";
import { isActorIdentifier, type Did } from "@atcute/lexicons/syntax";
import {
  configureOAuth,
  createAuthorizationUrl,
  deleteStoredSession,
  finalizeAuthorization,
  getSession,
  listStoredSessions,
  OAuthUserAgent,
} from "@atcute/oauth-browser-client";
import { Client } from "@atcute/client";

export const OAUTH_SCOPE =
  "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";

let configuredOrigin: string | undefined;

export function configureBrowserOAuth(origin = window.location.origin) {
  if (configuredOrigin === origin) return;

  const redirectUri = new URL("/oauth/callback", origin).href;
  const clientId =
    origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")
      ? `http://localhost?redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(OAUTH_SCOPE)}`
      : new URL("/oauth-client-metadata.json", origin).href;

  configureOAuth({
    metadata: { client_id: clientId, redirect_uri: redirectUri },
    identityResolver: new LocalActorResolver({
      handleResolver: new XrpcHandleResolver({
        serviceUrl: "https://public.api.bsky.app",
      }),
      didDocumentResolver: new CompositeDidDocumentResolver({
        methods: {
          plc: new PlcDidDocumentResolver(),
          web: new WebDidDocumentResolver(),
        },
      }),
    }),
    storageName: "pronounsblue-oauth",
  });
  configuredOrigin = origin;
}

export function getAuthenticatedDid(): Did | null {
  configureBrowserOAuth();
  return listStoredSessions().at(-1) ?? null;
}

export async function beginLogin(identifier: string) {
  configureBrowserOAuth();
  if (!isActorIdentifier(identifier)) {
    throw new Error("Enter a valid AT Protocol handle or DID.");
  }
  const url = await createAuthorizationUrl({
    target: { type: "account", identifier },
    scope: OAUTH_SCOPE,
  });
  await new Promise((resolve) => setTimeout(resolve, 200));
  window.location.assign(url);
}

export async function finishLogin(params: URLSearchParams) {
  configureBrowserOAuth();
  const { session } = await finalizeAuthorization(params);
  return session.info.sub;
}

export async function getAuthenticatedClient(did: Did) {
  configureBrowserOAuth();
  const session = await getSession(did);
  return new Client({ handler: new OAuthUserAgent(session) });
}

export async function signOut(did: Did) {
  configureBrowserOAuth();
  try {
    const session = await getSession(did, { allowStale: true });
    await new OAuthUserAgent(session).signOut();
  } finally {
    deleteStoredSession(did);
  }
}
