// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
  },
  ignores: ["lib/lexicons/**"],
});
