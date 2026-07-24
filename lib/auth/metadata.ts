export const OAUTH_SCOPE =
  "atproto repo:blue.pronouns.name repo:blue.pronouns.pronoun";

export function getOAuthMetadata(origin: string) {
  const baseUrl = new URL(origin);
  return {
    client_id: new URL("/oauth-client-metadata.json", baseUrl).href,
    client_name: "pronouns.blue",
    client_uri: baseUrl.href,
    redirect_uris: [new URL("/oauth/callback", baseUrl).href],
    scope: OAUTH_SCOPE,
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    token_endpoint_auth_method: "none",
    application_type: "web",
    dpop_bound_access_tokens: true,
  };
}
