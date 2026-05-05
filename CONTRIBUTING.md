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

No database or other services needed.

## Main commands

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
pnpm build:lex
pnpm build
```

## Lexicon workflow

- Source lexicons live in `lexicons/**`.
- Generated bindings live in `lib/lexicons/**`.
- Do **not** manually edit generated bindings.
- After lexicon edits, run `pnpm build:lex`.

## Architecture notes

- Names and pronouns are stored as **individual ATProto records** (`blue.pronouns.name`, `blue.pronouns.pronoun`) directly in the user's repo. There is no database.
- Profile pages and the settings page read records directly from the user's PDS via `com.atproto.repo.listRecords` (`lib/atproto/records.ts`).
- OAuth state and session (tokens + DPoP key) are stored in `httpOnly` browser cookies (`oauth_state`, `session`, `did`). `lib/auth/client.ts` implements the `stateStore`/`sessionStore` interfaces using `cookies()` from `next/headers`.
- In Server Components use `getDid()` (reads the `did` cookie). Only call `getSession()` in Route Handlers, where cookie writes (token refresh) are allowed.

## Pull request guidelines

1. Keep changes focused and scoped.
2. Update docs when behavior or setup changes.
3. Run `pnpm lint` and `pnpm build` before opening a PR.
4. Describe user-visible behavior changes in the PR description.

## Testing

There is currently no repository test script (`pnpm test` is not configured yet).
