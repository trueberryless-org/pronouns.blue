import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.bsky.app" }],
  },
  serverExternalPackages: [
    "thread-stream",
    "pino",
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
