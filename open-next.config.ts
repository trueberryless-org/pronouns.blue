import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

config.cloudflare = {
  ...config.cloudflare,
  // Prefer workerd export conditions to avoid Node-only polyfills in Workers.
  useWorkerdCondition: true,
};

export default config;
