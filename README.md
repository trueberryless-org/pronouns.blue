# pronouns.blue

An AT Protocol app for publishing and viewing names + pronouns from user repos.

## Current behavior

- OAuth sign in via ATProto.
- Users manage names and pronouns in **Settings**.
- Each name and each pronoun is stored as its own ATProto record:
  - `blue.pronouns.name`
  - `blue.pronouns.pronoun`
- Preferred entries are per-record (`preferred: boolean`).
- Display order is user-controlled and persisted (`sortOrder`).
- Home page includes a handle search powered by the Bluesky appview.

## Tech stack

- [Next.js App Router](https://nextjs.org/)
- PostgreSQL (Supabase-compatible) + Kysely migrations
- `@atproto/oauth-client-node` for OAuth
- `@atproto/lex` + generated bindings from local lexicons

## Setup

Node.js requirement: **24.x**.

1. Copy env file:

```bash
cp env.template .env.local
```

2. Install dependencies:

```bash
pnpm install
```

3. Run the app:

```bash
pnpm dev
```

The app will run on `http://127.0.0.1:3000` by default.

## Environment variables

Required for local development:

- `PUBLIC_URL` (default: `http://127.0.0.1:3000`)

Optional for local development:

- `DATABASE_URL` — if not set, **SQLite** is used automatically at `./app.db` (zero config)
- `DATABASE_PATH` — custom SQLite file path (default: `./app.db`, ignored when `DATABASE_URL` is set)

Required for production:

- `DATABASE_URL` (Postgres/Supabase connection string)
- `PRIVATE_KEY` (JWK, required for production-style private_key_jwt client auth — generate with `pnpm gen-key`)

Optional:

- `PUBLIC_APPVIEW_URL` (defaults to `https://public.api.bsky.app`)

Generate a `PRIVATE_KEY` value with:

```bash
pnpm gen-key
```

## Scripts

- `pnpm dev` — run migrations, then start Next.js dev server
- `pnpm migrate` — apply Kysely migrations
- `pnpm build:lex` — regenerate TypeScript lexicon bindings
- `pnpm lint` — run ESLint
- `pnpm lint:fix` — run ESLint autofix
- `pnpm format` — run Prettier write mode
- `pnpm format:check` — run Prettier check mode
- `pnpm build` — regenerate lexicon bindings, then build
- `pnpm start` — run migrations, then start production server

## CI workflows

- `.github/workflows/ci.yaml` runs lint, format check, migrate, build, and test-if-present on PRs/pushes.
- `.github/workflows/format.yaml` runs lint autofix + Prettier and commits fixes via `autofix-ci`.

`ci.yaml` starts a temporary Postgres service and uses `DATABASE_URL` against it.

## Deploying to Vercel (Supabase)

1. Create a Supabase project and copy the Postgres connection string.
2. In Vercel project settings, set:
   - `DATABASE_URL` (Supabase Postgres URI)
   - `PUBLIC_URL` (`https://your-domain`)
   - `PRIVATE_KEY` (from `pnpm gen-key`)
   - optionally `PUBLIC_APPVIEW_URL`
3. Deploy from GitHub as a Next.js project.
4. Ensure migrations are applied (this app runs `pnpm migrate` on `dev` and `start`).

## Data model summary

Primary tables:

- `name_record` — one row per `blue.pronouns.name` record
- `pronoun_record` — one row per `blue.pronouns.pronoun` record

Ordering and preference are preserved in record fields (`sortOrder`, `preferred`) and reflected in profile rendering.

## Development notes

- Edit source lexicons under `lexicons/**`.
- Do not manually edit generated files in `lib/lexicons/**`.
- After lexicon changes, run `pnpm build:lex`.
- There is currently no test script configured in this repository.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md).

## Community health

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Security Policy](./SECURITY.md)
- [Support](./SUPPORT.md)
