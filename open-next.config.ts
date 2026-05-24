import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();

config.cloudflare = {
  ...config.cloudflare,
  // Avoid workerd export conditions that break jose bundling in OpenNext.
  useWorkerdCondition: false,
};

export default config;
