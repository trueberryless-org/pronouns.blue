import { getOAuthMetadata } from "~/lib/auth/metadata";

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Content-Type", "application/json");
  setResponseHeader(
    event,
    "Cache-Control",
    "public, max-age=3600, s-maxage=3600",
  );

  return getOAuthMetadata(getRequestURL(event).origin);
});
