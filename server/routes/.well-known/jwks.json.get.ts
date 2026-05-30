import { getOAuthClient } from "~/lib/auth/client";
import { createH3CookieAdapter } from "~/lib/auth/h3-cookie-adapter";

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Content-Type", "application/json");
  setResponseHeader(
    event,
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600",
  );

  const cookieAdapter = createH3CookieAdapter(event);
  const client = await getOAuthClient(cookieAdapter);
  return client.jwks ?? { keys: [] };
});
