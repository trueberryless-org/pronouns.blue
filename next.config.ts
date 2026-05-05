import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["thread-stream", "pino"],
};

export default nextConfig;
