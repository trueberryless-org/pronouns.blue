import { Client } from "@atcute/client";
import {
  CompositeDidDocumentResolver,
  LocalActorResolver,
  PlcDidDocumentResolver,
  WebDidDocumentResolver,
  XrpcHandleResolver,
} from "@atcute/identity-resolver";
import {
  configureOAuth,
  createAuthorizationUrl,
  deleteStoredSession,
  finalizeAuthorization,
  getSession,
  listStoredSessions,
  OAuthUserAgent,
} from "@atcute/oauth-browser-client";
import { isActorIdentifier, type Did } from "@atcute/lexicons/syntax";
import { OAUTH_SCOPE } from "~/lib/auth/metadata";

let configured = false;

function getMetadata(origin: string) {
  const redirectUri = new URL("/oauth/callback", origin).href;
  if (origin === "http://127.0.0.1:3000") {
    return {
      client_id: `http://localhost?redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(OAUTH_SCOPE)}`,
      redirect_uri: redirectUri,
    };
  }

  return {
    client_id: new URL("/oauth-client-metadata.json", origin).href,
    redirect_uri: redirectUri,
  };
}

export function configureBrowserOAuth(origin = window.location.origin) {
  if (configured) return;

  configureOAuth({
    metadata: getMetadata(origin),
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
  configured = true;
}

export function getAuthenticatedDid(): Did | null {
  return listStoredSessions().at(-1) ?? null;
}

export async function beginLogin(handle: string) {
  if (!isActorIdentifier(handle)) {
    throw new Error("Enter a valid ATProto handle or DID.");
  }

  const url = await createAuthorizationUrl({
    target: { type: "account", identifier: handle },
    scope: OAUTH_SCOPE,
  });
  window.location.assign(url);
}

export async function finishLogin(params: URLSearchParams): Promise<Did> {
  const { session } = await finalizeAuthorization(params);
  return session.info.sub;
}

export async function getAuthenticatedClient(did: Did) {
  const session = await getSession(did);
  return new Client({ handler: new OAuthUserAgent(session) });
}

export async function signOut(did: Did) {
  try {
    const session = await getSession(did, { allowStale: true });
    await new OAuthUserAgent(session).signOut();
  } finally {
    deleteStoredSession(did);
  }
}
