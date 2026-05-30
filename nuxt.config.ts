// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-30',

  nitro: {
    preset: 'cloudflare-module',
    experimental: {
      wasm: true,
    },
  },

  css: ['~/assets/globals.css'],

  // Tailwind v4 via PostCSS — picks up postcss.config.mjs automatically.
  // No separate @nuxtjs/tailwindcss module needed.
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
    },
  },

  runtimeConfig: {
    // Server-only secrets — override with env vars at deploy time
    publicUrl: process.env.PUBLIC_URL ?? '',
    privateKey: process.env.PRIVATE_KEY ?? '',
    publicAppviewUrl: process.env.PUBLIC_APPVIEW_URL ?? 'https://public.api.bsky.app',
    // Exposed to the client
    public: {
      appviewUrl: process.env.PUBLIC_APPVIEW_URL ?? 'https://public.api.bsky.app',
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, // enabled only when developing locally
  },

  modules: ['@nuxt/eslint'],

  eslint: {
    config: {
      stylistic: false,
    },
  },

  // Needed for Cloudflare Workers: suppress Node-specific polyfill warnings
  vite: {
    build: {
      minify: false,
    },
  },
});
