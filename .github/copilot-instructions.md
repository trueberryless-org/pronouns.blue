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

Tests are **not currently configured** in this repository (`package.json` has no `test` script and no test files are present), so there is no single-test command yet.

## High-level architecture

This is a Next.js App Router app that combines:

1. **UI + session-aware server rendering**  
   `app/page.tsx` is a server component that reads auth state and renders the handle search and signed-in user card.
2. **ATProto OAuth client flow**  
   `/oauth/login`, `/oauth/callback`, and `/oauth/logout` routes orchestrate auth through `lib/auth/client.ts`. OAuth state/session objects are persisted in Postgres tables (`auth_state`, `auth_session`), while the browser cookie stores only the DID pointer.
3. **Name/pronoun record publishing + local projection**  
   `/api/status` publishes **one record per name/pronoun** using the `blue.pronouns.name` and `blue.pronouns.pronoun` lexicons, then updates local projection rows in `name_record` and `pronoun_record`.
4. **Handle/actor resolution via Bluesky appview**  
   Handle searches and profile-page actor lookups use `app.bsky.actor.searchActors` / `app.bsky.actor.getProfile` from the public Bluesky appview (`PUBLIC_APPVIEW_URL`).
5. **Postgres + Kysely data layer**  
   `lib/db/index.ts` creates a singleton Kysely client. When `DATABASE_URL` is set it uses Postgres (`pg`); otherwise it falls back to SQLite (`better-sqlite3`) at `DATABASE_PATH` (default `./app.db`). Migrations run automatically on `dev` and `start`.

## Key conventions in this codebase

- **Do not edit generated lexicon files manually** in `lib/lexicons/**`; edit source lexicons under `lexicons/**` and regenerate with `pnpm build:lex`.
- **Use path alias imports** (`@/...`) rather than long relative paths (configured in `tsconfig.json`).
- **Profiles are projections derived from per-entry records** in `name_record` and `pronoun_record`; avoid reintroducing single-record profile persistence.
- **User-facing order is explicit** via `sortOrder` on entry records; preserve that when transforming/aggregating data.
- **Boolean-like DB columns use integer flags** (`0 | 1`) in schema/types (for example `name_record.preferred`, `pronoun_record.preferred`).
