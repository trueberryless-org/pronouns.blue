import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  vite: {
    // @atproto/* and related packages use Node built-ins; keep them external.
    ssr: {
      external: [
        "@atproto/oauth-client-node",
        "@atproto/oauth-client",
        "@atproto/lex",
        "@atproto-labs/fetch",
        "@atproto-labs/fetch-node",
        "@atproto/common-web",
        "@atproto/syntax",
        "thread-stream",
        "pino",
      ],
    },
  },
});
