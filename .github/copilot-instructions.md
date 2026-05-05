# Copilot Instructions for `pronouns.blue`

## Build, lint, and test commands

Use `pnpm` (repo is pinned to pnpm in `package.json`).

```bash
cp env.template .env.local
pnpm install
pnpm dev          # Next.js dev server (no migrations needed)
pnpm lint         # ESLint (Next core-web-vitals + TypeScript config)
pnpm lint:fix     # ESLint with autofix
pnpm format       # Prettier write mode
pnpm format:check # Prettier check mode
pnpm build        # runs `pnpm build:lex` then `next build`
pnpm start        # Next.js production server
pnpm build:lex    # regenerate TypeScript lexicon bindings from lexicons/
pnpm gen-key      # generate a PRIVATE_KEY JWK for OAuth private_key_jwt
```

Tests are **not currently configured** in this repository.

## High-level architecture

This is a Next.js App Router app for sharing names and pronouns on AT Protocol. **There is no database** — the entire backend is ATProto.

1. **ATProto OAuth — cookie-based sessions**  
   `/oauth/login`, `/oauth/callback`, `/oauth/logout` orchestrate auth via `lib/auth/client.ts`. OAuth state and session (tokens + DPoP private key) are stored entirely in `httpOnly` browser cookies (`oauth_state`, `session`, `did`). No server-side storage is used.

2. **Record publishing**  
   `POST /api/status` uses `@atproto/lex` to delete and recreate all `blue.pronouns.name` and `blue.pronouns.pronoun` records in the user's ATProto repo. Records live exclusively on the user's PDS.

3. **Profile reading**  
   `app/profile/[handle]/page.tsx` resolves the handle via the Bluesky appview (`app.bsky.actor.getProfile`), then fetches name/pronoun records directly from the user's PDS via `com.atproto.repo.listRecords` (`lib/atproto/records.ts`).

4. **Settings page**  
   `app/settings/page.tsx` reads current records directly from the user's PDS to pre-fill the editor form. Authentication check uses `getDid()` (reads the `did` cookie) — not `getSession()` — to avoid triggering an unnecessary token restore in a Server Component context.

5. **Handle search**  
   `GET /api/search` proxies to `app.bsky.actor.searchActors` on the Bluesky appview.

## Key conventions

- **Do not edit generated lexicon files** in `lib/lexicons/**`; edit source lexicons under `lexicons/**` and regenerate with `pnpm build:lex`.
- **Use path alias imports** (`@/...`) rather than long relative paths (configured in `tsconfig.json`).
- **Records live on the PDS, not locally.** There is no local database or caching layer.
- **Use `getDid()` in Server Components** (reads `did` cookie, fast, no token I/O). Only call `getSession()` (which calls `client.restore()`) in Route Handlers where cookies are writable, so a token refresh can be persisted.
- **`getOAuthClient()` is a singleton** but its cookie stores call `cookies()` lazily on each invocation, so they always operate on the current request's cookie jar.
- **undici's native fetch** is passed to `NodeOAuthClient` to bypass Next.js's patched `globalThis.fetch`, which would otherwise corrupt POST bodies in the DPoP flow.
