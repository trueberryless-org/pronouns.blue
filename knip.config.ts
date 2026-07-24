import type { KnipConfig } from "knip";

const config: KnipConfig = {
  // lex.config.ts is the config file consumed by @atcute/lex-cli at build time;
  // it's not imported by any TypeScript source, so tell knip it's an entry point.
  entry: ["lex.config.ts", "scripts/*.ts"],

  // These packages are used but not direct dependencies — intentional:
  // - h3: provided transitively by nuxt/nitro at the version they need; adding
  //   it directly causes version conflicts with the bundled h3 v1.
  // - @tailwindcss/postcss: referenced as a string key in nuxt.config.ts's
  //   `postcss.plugins` object, so knip can't detect it via import analysis.
  ignoreDependencies: ["h3", "@tailwindcss/postcss"],
};

export default config;
