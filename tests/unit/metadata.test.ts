import { describe, expect, it } from "vitest";
import { getOAuthMetadata, OAUTH_SCOPE } from "~/lib/auth/metadata";

describe("getOAuthMetadata", () => {
  it("builds public-client metadata from the request origin", () => {
    expect(getOAuthMetadata("https://pronouns.blue")).toEqual({
      client_id: "https://pronouns.blue/oauth-client-metadata.json",
      client_name: "pronouns.blue",
      client_uri: "https://pronouns.blue/",
      redirect_uris: ["https://pronouns.blue/oauth/callback"],
      scope: OAUTH_SCOPE,
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
      application_type: "web",
      dpop_bound_access_tokens: true,
    });
  });
});
