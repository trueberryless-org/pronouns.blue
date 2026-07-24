import {
  configureBrowserOAuth,
  getAuthenticatedDid,
} from "~/lib/auth/oauth.client";

export default defineNuxtPlugin(() => {
  configureBrowserOAuth();
  useState<string | null>("auth-did", () => null).value = getAuthenticatedDid();
});
