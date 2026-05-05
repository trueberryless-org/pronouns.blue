import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "thread-stream",
    "pino",
    "undici",
    "@atproto/oauth-client-node",
    "@atproto/oauth-client",
    "@atproto/lex",
    "@atproto-labs/fetch",
    "@atproto-labs/fetch-node",
    "@atproto/common-web",
    "@atproto/syntax",
  ],
};

export default nextConfig;
