import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "passthrough",
    prerenderEnvironment: "node",
  }),
  integrations: [react()],
  experimental: {
    advancedRouting: true,
  },
  vite: {
    build: {
      minify: false,
    },
    optimizeDeps: {
      include: ["react", "react-dom"],
    },
  },
});
