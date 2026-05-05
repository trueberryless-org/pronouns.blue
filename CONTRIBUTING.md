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

No database setup needed for local dev — if `DATABASE_URL` is not set, the app automatically uses SQLite at `./app.db`.

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
- After lexicon edits, run:

```bash
pnpm build:lex
```

## Data model conventions

- Names and pronouns are stored as **individual records** (`blue.pronouns.name`, `blue.pronouns.pronoun`).
- Local projection tables are `name_record` and `pronoun_record`.
- Preserve per-entry ordering via `sortOrder`.
- Use existing query helpers in `lib/db/queries.ts` instead of ad-hoc DB writes.

## Pull request guidelines

1. Keep changes focused and scoped.
2. Update docs when behavior/setup changes.
3. Run `pnpm lint` and `pnpm build` before opening a PR.
4. Describe user-visible behavior changes in the PR description.

## Testing

There is currently no repository test script (`pnpm test` is not configured yet).
