# Contributing to pronouns.blue

Thanks for contributing.

## Prerequisites

- Node.js 24.x
- pnpm (repo is pinned in `package.json`)

## Local development

```bash
cp env.template .env.local
pnpm install
pnpm dev
```

No database setup needed — if `DATABASE_URL` is not set, the app uses SQLite at `./app.db` automatically.

## Main commands

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm migrate
pnpm build:lex
pnpm build
```

## Lexicon workflow

- Source lexicons live in `lexicons/**`.
- Generated bindings live in `lib/lexicons/**`.
- Do **not** manually edit generated bindings.
- After lexicon edits, run `pnpm build:lex`.

## Architecture notes

- Names and pronouns are stored as **individual ATProto records** (`blue.pronouns.name`, `blue.pronouns.pronoun`) directly in the user's repo.
- Profile pages and the settings page read records directly from the user's PDS via `com.atproto.repo.listRecords` — there is no local DB cache for record data.
- The local DB (SQLite or Postgres) is used **only** for OAuth session state (`auth_state`, `auth_session`).
- SSL for Postgres is enabled automatically when `DATABASE_URL` points to a non-local host.

## Pull request guidelines

1. Keep changes focused and scoped.
2. Update docs when behavior or setup changes.
3. Run `pnpm lint` and `pnpm build` before opening a PR.
4. Describe user-visible behavior changes in the PR description.

## Testing

There is currently no repository test script (`pnpm test` is not configured yet).
