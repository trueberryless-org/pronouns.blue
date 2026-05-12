import { defineConfig } from "astro/config";
import netlify from "@astrojs/netlify";

export default defineConfig({
  output: "server",
  adapter: netlify(),
  vite: {
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
