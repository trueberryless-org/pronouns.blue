# Copilot Instructions for `pronouns.blue`

## Build, lint, and test commands

Use `pnpm` (repo is pinned to pnpm in `package.json`).

```bash
cp env.template .env.local
pnpm install
pnpm dev          # runs `pnpm migrate` first, then Next dev server
pnpm lint         # ESLint (Next core-web-vitals + TypeScript config)
pnpm lint:fix     # ESLint with autofix
pnpm format       # Prettier write mode
pnpm format:check # Prettier check mode
pnpm build        # runs `pnpm build:lex` then `next build`
pnpm start        # runs `pnpm migrate` first, then Next production server
pnpm migrate      # apply Kysely migrations to latest
pnpm build:lex    # regenerate TypeScript lexicon bindings from lexicons/
pnpm gen-key      # generate a PRIVATE_KEY JWK for OAuth private_key_jwt
```

Tests are **not currently configured** in this repository.

## High-level architecture

This is a Next.js App Router app for sharing names and pronouns on AT Protocol.

1. **ATProto OAuth**  
   `/oauth/login`, `/oauth/callback`, `/oauth/logout` orchestrate auth via `lib/auth/client.ts`. OAuth state/session is persisted in Postgres/SQLite (`auth_state`, `auth_session`). The browser cookie stores only the DID.

2. **Record publishing**  
   `POST /api/status` uses `@atproto/lex` to delete and recreate all `blue.pronouns.name` and `blue.pronouns.pronoun` records in the user's ATProto repo. No local DB write happens — records live exclusively on the user's PDS.

3. **Profile reading**  
   `app/[handle]/page.tsx` resolves the handle via the Bluesky appview (`app.bsky.actor.getProfile`), then fetches name/pronoun records directly from the user's PDS via `com.atproto.repo.listRecords` (`lib/atproto/records.ts`). No local DB read is involved.

4. **Settings page**  
   `app/settings/page.tsx` also reads current records directly from the user's PDS to pre-fill the editor form.

5. **Database — OAuth only**  
   `lib/db/index.ts` creates a singleton Kysely client. If `DATABASE_URL` is set → Postgres (`pg`) with auto-SSL for non-local hosts. Otherwise → SQLite (`better-sqlite3`) at `DATABASE_PATH`. The DB schema contains only `auth_state` and `auth_session`. Migrations run on cold start via `instrumentation.ts`.

6. **Handle search**  
   `GET /api/search` proxies to `app.bsky.actor.searchActors` on the Bluesky appview.

## Key conventions

- **Do not edit generated lexicon files** in `lib/lexicons/**`; edit source lexicons under `lexicons/**` and regenerate with `pnpm build:lex`.
- **Use path alias imports** (`@/...`) rather than long relative paths (configured in `tsconfig.json`).
- **Records live on the PDS, not in the local DB.** Do not add local projection tables for name/pronoun data.
- **SSL is auto-detected** from `DATABASE_URL` hostname — no `DATABASE_SSL` env var.
- **Migrations are idempotent** and run automatically via `instrumentation.ts` on every server cold start (Vercel) or via `pnpm dev`/`pnpm start` locally.
