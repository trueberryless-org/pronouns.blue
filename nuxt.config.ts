// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-30",

  // Prerender static pages — served directly from Cloudflare's asset CDN,
  // zero CPU cost on Workers free plan.
  routeRules: {
    "/privacy": { prerender: true },
    "/terms": { prerender: true },
    "/credits": { prerender: true },
  },

  nitro: {
    preset: "cloudflare-module",
    experimental: {
      wasm: true,
    },
  },

  experimental: {
    // Enable the browser View Transition API on client-side navigation
    viewTransition: true,
  },

  css: ["~/assets/globals.css"],

  // Tailwind v4 via PostCSS — picks up postcss.config.mjs automatically.
  // No separate @nuxtjs/tailwindcss module needed.
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },

  runtimeConfig: {
    // Server-only secrets — override with env vars at deploy time
    publicUrl: process.env.PUBLIC_URL ?? "",
    privateKey: process.env.PRIVATE_KEY ?? "",
    publicAppviewUrl:
      process.env.PUBLIC_APPVIEW_URL ?? "https://public.api.bsky.app",
    // Exposed to the client
    public: {
      appviewUrl:
        process.env.PUBLIC_APPVIEW_URL ?? "https://public.api.bsky.app",
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, // enabled only when developing locally
  },

  modules: ["@nuxt/eslint"],

  eslint: {
    config: {
      stylistic: false,
    },
  },

  // Bind dev server to 127.0.0.1 so the OAuth redirect_uri
  // (http://127.0.0.1:3000/oauth/callback from getPublicMetadata) resolves correctly.
  // On macOS, "localhost" resolves to ::1 (IPv6) but the OAuth redirect uses 127.0.0.1.
  devServer: {
    host: "127.0.0.1",
  },

  vite: {
    build: {
      minify: false,
    },
  },
});
