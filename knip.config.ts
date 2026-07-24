import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // lex.config.ts is the config file consumed by @atcute/lex-cli at build time;
  // it's not imported by any TypeScript source, so tell knip it's an entry point.
  entry: ["lex.config.ts", "scripts/*.ts"],

  // h3 is provided transitively by Nuxt/Nitro; adding it directly would cause
  // a version conflict with Nuxt's bundled dependency.
  ignoreDependencies: ["h3"],
};

export default config;
