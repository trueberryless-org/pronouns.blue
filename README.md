# pronouns.blue

A small [AT Protocol](https://atproto.com/) app for sharing your names and pronouns.

Users sign in with their ATProto account (Bluesky, etc.), then set their names and pronouns from the Settings page. Each name and pronoun is published as its own record in their ATProto repo under the `blue.pronouns.name` and `blue.pronouns.pronoun` lexicons. Anyone can view a profile at `pronouns.blue/@handle` — no account required.

## Tech stack

- [Next.js](https://nextjs.org/) App Router
- `@atproto/oauth-client-node` — sign in with any ATProto account
- `@atproto/lex` + generated bindings from local lexicons
- SQLite (local dev, zero config) or Postgres/Supabase (production)
- Kysely for type-safe migrations and queries

## Local setup

Node.js 24.x and pnpm required.

```bash
cp env.template .env.local
pnpm install
pnpm dev
```

No database setup needed — SQLite is used automatically at `./app.db`.

## Environment variables

**Required for production:**

| Variable | Description |
|---|---|
| `PUBLIC_URL` | Canonical URL, e.g. `https://pronouns.blue` |
| `DATABASE_URL` | Postgres connection string (Supabase or similar) |
| `PRIVATE_KEY` | JWK for OAuth — generate with `pnpm gen-key` |

**Optional:**

| Variable | Description | Default |
|---|---|---|
| `DATABASE_PATH` | SQLite file path (local dev only) | `./app.db` |
| `PUBLIC_APPVIEW_URL` | Bluesky appview base URL | `https://public.api.bsky.app` |

SSL is enabled automatically when `DATABASE_URL` points to a non-local host — no extra flag needed.

## Scripts

```bash
pnpm dev           # migrate + Next.js dev server
pnpm build         # regenerate lexicon bindings + Next.js build
pnpm start         # migrate + Next.js production server
pnpm migrate       # apply DB migrations
pnpm build:lex     # regenerate TypeScript bindings from lexicons/
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with autofix
pnpm format        # Prettier write
pnpm format:check  # Prettier check
pnpm gen-key       # generate a PRIVATE_KEY JWK
```

## CI

- `ci.yaml` — lint, format check, migrate, build on every PR/push (starts a local Postgres service)
- `format.yaml` — autofix lint + Prettier and commits via `autofix-ci`

## Deploying to Vercel

1. Create a [Supabase](https://supabase.com/) project and copy the Postgres connection string.
2. In Vercel project settings add:
   - `DATABASE_URL` — Supabase Postgres URI
   - `PUBLIC_URL` — your domain, e.g. `https://pronouns.blue`
   - `PRIVATE_KEY` — from `pnpm gen-key`
3. Deploy from GitHub as a Next.js project. Migrations run automatically on every cold start via `instrumentation.ts`.

## Lexicon development

Source lexicons live in `lexicons/**`. Generated TypeScript bindings in `lib/lexicons/**` must not be edited by hand — regenerate with `pnpm build:lex` after any change.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md), and [SECURITY.md](./SECURITY.md).
