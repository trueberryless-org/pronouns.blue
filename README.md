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
- Home page includes searchable handles and recent profile updates.

## Tech stack

- [Next.js App Router](https://nextjs.org/)
- SQLite (`better-sqlite3`) + Kysely migrations
- `@atproto/oauth-client-node` for OAuth
- `@atproto/lex` + generated bindings from local lexicons
- Tap webhook ingestion for network sync

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

- `TAP_URL` (default in template: `http://localhost:2480`)
- `PUBLIC_URL` (default in template: `http://127.0.0.1:3000`)

Optional:

- `PRIVATE_KEY` (JWK, required for production-style private_key_jwt client auth)
- `PUBLIC_APPVIEW_URL` (defaults to `https://public.api.bsky.app`)
- `TAP_ADMIN_PASSWORD` (enforces admin auth for `/api/webhook`)
- `DATABASE_PATH` (defaults to `app.db`)

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

## Data model summary

Primary synced tables:

- `account` — DID/handle projection from Tap identity events
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
