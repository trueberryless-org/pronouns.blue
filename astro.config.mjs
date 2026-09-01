import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
import { defineConfig } from "astro/config";

export default defineConfig({
  adapter: cloudflare({
    imageService: "passthrough",
  }),
  cache: {
    provider: cacheCloudflare(),
  },
  devToolbar: {
    enabled: false,
  },
  output: "static",
  session: false,
  site: "https://pronouns.blue",
  vite: {
    optimizeDeps: {
      exclude: ["@astrojs/cloudflare/entrypoints/server", "astro/assets/services/noop"],
    },
  },
});
