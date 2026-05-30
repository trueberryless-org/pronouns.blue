# Contributing to pronouns.blue

Thanks for contributing.

## Prerequisites

- Node.js 24.x
- pnpm (repo is pinned in `package.json`)

## Local development

```bash
pnpm install
pnpm dev
```

No database, no environment variables needed for local development. The dev server runs at `http://127.0.0.1:3000`.

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
- Each record carries an optional **`lang`** field — a [BCP-47](https://www.rfc-editor.org/rfc/rfc5646) language tag (e.g. `en`, `de`, `zh-CN`). Records without `lang` default to English. New saves always write the field.
- `lib/atproto/records.ts` groups records by `lang` and returns `LanguageGroup[]` — the data shape used by both `ProfileDisplay` and `ProfileEditor`.
- Profile pages and the settings page read records directly from the user's PDS via `com.atproto.repo.listRecords` (`lib/atproto/records.ts`).
- OAuth state and session (tokens + DPoP key) are stored in `httpOnly` browser cookies (`oauth_state`, `session`, `did`). `lib/auth/client.ts` implements the `stateStore`/`sessionStore` interfaces using a custom H3 cookie adapter (`lib/auth/h3-cookie-adapter.ts`).
- In server routes / middleware use `getDid()` (reads the `did` cookie) for auth checks. Call `getSession()` only when you need a live ATProto client (it may refresh tokens and write back updated cookies).
- Server-side code lives in `server/` and is handled by Nitro (H3). Vue components and pages live in `components/` and `pages/`. Shared composables are in `composables/`.

## Pull request guidelines

1. Keep changes focused and scoped.
2. Update docs when behavior or setup changes.
3. Run `pnpm lint` and `pnpm build` before opening a PR.
4. Describe user-visible behavior changes in the PR description.

## Testing

There is currently no repository test script (`pnpm test` is not configured yet).
