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

No database or environment variables are needed for local development. Astro starts the development server at `http://localhost:4321`, and the application redirects local browser sessions to `http://127.0.0.1:4321` for AT Protocol OAuth compatibility.

## Main commands

```bash
pnpm test
pnpm check
pnpm build
pnpm exec wrangler deploy --dry-run
```

## Lexicon workflow

- Source lexicons live in `lexicons/**`.
- `lexicons.json` lists the schemas published by the project.
- Keep schema changes backward compatible with existing public records.

## Architecture notes

- Names and pronouns are stored as **individual ATProto records** (`blue.pronouns.name`, `blue.pronouns.pronoun`) directly in the user's repo. There is no database.
- Each record carries an optional **`lang`** field — a [BCP-47](https://www.rfc-editor.org/rfc/rfc5646) language tag (e.g. `en`, `de`, `zh-CN`). Records without `lang` default to English. New saves always write the field.
- `src/lib/atproto/records.ts` groups records by language for profile display and editing.
- Profile pages and settings read records directly from the user's PDS through `com.atproto.repo.listRecords`.
- OAuth runs in the browser through `@atcute/oauth-browser-client`. Its state, session, and DPoP key remain in browser storage, and authenticated writes go directly to the user's PDS.
- Dynamic profiles and cache invalidation run in the Cloudflare Worker through Astro routes.
- The Worker intentionally has no Node compatibility layer.

## Pull request guidelines

1. Keep changes focused and scoped.
2. Update docs when behavior or setup changes.
3. Run `pnpm test`, `pnpm check`, and `pnpm build` before opening a PR.
4. Describe user-visible behavior changes in the PR description.

## Testing

`pnpm test` runs the Vitest unit test suite. `pnpm check` validates Astro and TypeScript, and `pnpm build` verifies the production Cloudflare build.
