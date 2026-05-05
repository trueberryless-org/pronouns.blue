# pronouns.blue

A small [AT Protocol](https://atproto.com/) app for sharing your names and pronouns.

Users sign in with their ATProto account (Bluesky, etc.), then set their names and pronouns from the Settings page. Each name and pronoun is published as its own record in their ATProto repo under the `blue.pronouns.name` and `blue.pronouns.pronoun` lexicons. Anyone can view a profile at `pronouns.blue/profile/@handle` — no account required.

## Tech stack

- [Next.js](https://nextjs.org/) App Router
- `@atproto/oauth-client-node` — sign in with any ATProto account
- `@atproto/lex` + generated bindings from local lexicons
- No database — OAuth state and sessions are stored in `httpOnly` cookies

## Local setup

Node.js 24.x and pnpm required.

```bash
cp env.template .env.local
pnpm install
pnpm dev
```

## Environment variables

**Required for production:**

| Variable      | Description                                  |
| ------------- | -------------------------------------------- |
| `PUBLIC_URL`  | Canonical URL, e.g. `https://pronouns.blue`  |
| `PRIVATE_KEY` | JWK for OAuth — generate with `pnpm gen-key` |

**Optional:**

| Variable             | Description              | Default                       |
| -------------------- | ------------------------ | ----------------------------- |
| `PUBLIC_APPVIEW_URL` | Bluesky appview base URL | `https://public.api.bsky.app` |

## Scripts

```bash
pnpm dev           # Next.js dev server
pnpm build         # regenerate lexicon bindings + Next.js build
pnpm start         # Next.js production server
pnpm build:lex     # regenerate TypeScript bindings from lexicons/
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with autofix
pnpm format        # Prettier write
pnpm format:check  # Prettier check
pnpm gen-key       # generate a PRIVATE_KEY JWK
```

## CI

- `ci.yaml` — lint, format check, build on every PR/push
- `format.yaml` — autofix lint + Prettier and commits via `autofix-ci`

## Deploying to Vercel

1. In Vercel project settings add:
   - `PUBLIC_URL` — your domain, e.g. `https://pronouns.blue`
   - `PRIVATE_KEY` — from `pnpm gen-key`
2. Deploy from GitHub as a Next.js project. No database or migrations needed.

## Lexicon development

Source lexicons live in `lexicons/**`. Generated TypeScript bindings in `lib/lexicons/**` must not be edited by hand — regenerate with `pnpm build:lex` after any change.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md), and [SECURITY.md](./SECURITY.md).

## Credits & AI disclosure

This project was **fully generated with AI assistance** using [GitHub Copilot](https://github.com/features/copilot). All code, architecture decisions, and content were produced through an AI-assisted workflow with human direction.

Inspired by these great projects in the pronoun-sharing space:
- [pronouns.cc](https://pronouns.cc)
- [pronouns.page](https://pronouns.page)
- [pronouny.xyz](https://pronouny.xyz)
