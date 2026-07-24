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
pnpm test
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
- OAuth runs in the browser through `@atcute/oauth-browser-client`. Its state, session, and DPoP key are stored in browser local storage and authenticated PDS writes happen directly from `lib/atproto/publisher.ts`.
- The Worker intentionally has no Node compatibility layer. `build/prevent-node-builtins.ts` fails production builds if application code or ATCute imports a Node builtin.
- Server-side code lives in `server/` and is handled by Nitro (H3). Vue components and pages live in `components/` and `pages/`. Shared composables are in `composables/`.

## Pull request guidelines

1. Keep changes focused and scoped.
2. Update docs when behavior or setup changes.
3. Run `pnpm lint` and `pnpm build` before opening a PR.
4. Describe user-visible behavior changes in the PR description.

## Testing

`pnpm test` runs unit, Nuxt route integration, and Chromium E2E coverage. Run
`pnpm exec playwright install chromium` once before running E2E tests locally.
