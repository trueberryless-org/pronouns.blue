import type { APIRoute } from "astro";
import { OAUTH_SCOPE } from "../lib/auth/oauth";

export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const origin = url.origin;
  return new Response(
    JSON.stringify({
      client_id: `${origin}/oauth-client-metadata.json`,
      client_name: "pronouns.blue",
      client_uri: origin,
      redirect_uris: [`${origin}/oauth/callback`],
      scope: OAUTH_SCOPE,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      application_type: "web",
      dpop_bound_access_tokens: true,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
};
