import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "thread-stream",
    "pino",
    "@atproto/oauth-client-node",
    "@atproto/oauth-client",
    "@atproto/lex",
    "@atproto-labs/fetch",
    "@atproto/common-web",
    "@atproto/syntax",
  ],
};

export default nextConfig;
