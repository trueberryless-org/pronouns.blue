# pronouns.blue

A small [AT Protocol](https://atproto.com/) app for sharing your names and pronouns.

Users sign in with their ATProto account (Bluesky, etc.), then set their names and pronouns from the Settings page. Each name and pronoun is published as its own record in their ATProto repo under the `blue.pronouns.name` and `blue.pronouns.pronoun` lexicons. Anyone can view a profile at `pronouns.blue/profile/@handle` — no account required.

## Tech stack

- [Nuxt 3](https://nuxt.com/) (Vue) with [Nitro](https://nitro.unjs.io/) server engine
- Deployed to [Cloudflare Workers](https://workers.cloudflare.com/) (`cloudflare-module` preset)
- `@atcute/oauth-browser-client` — Web Crypto OAuth for any ATProto account
- `@atcute/client` — XRPC client for ATProto
- No database — OAuth state, sessions, and DPoP keys stay in browser storage

## Local setup

Node.js 24.x and pnpm required.

```bash
pnpm install
pnpm dev
```

The dev server binds to `http://127.0.0.1:3000`. No environment variables or
secrets are needed: OAuth uses the ATProto public-client flow and the browser's
Web Crypto API.

## Scripts

```bash
pnpm dev           # Nuxt dev server (127.0.0.1:3000)
pnpm build         # regenerate lexicon bindings + Nuxt build → .output/
pnpm preview       # preview the production build locally with Nitro
pnpm deploy        # build + deploy to Cloudflare Workers via wrangler
pnpm build:lex     # regenerate TypeScript bindings from lexicons/
pnpm lint          # ESLint
pnpm lint:fix      # ESLint with autofix
pnpm format        # Prettier write
pnpm format:check  # Prettier check
pnpm test          # unit, integration, and browser E2E tests
```

## Deploying to Cloudflare Workers

1. **Build and deploy:**
   ```bash
   pnpm deploy
   ```

The build produces `.output/server/index.mjs` (Worker entry) and
`.output/public/` (static assets), both configured in `wrangler.jsonc`. It
fails if application code or ATCute introduces a Node.js builtin; Workers run
without `nodejs_compat`.

## CI

- `ci.yaml` — lint, format check, build on every PR/push
- `format.yaml` — autofix lint + Prettier and commits via `autofix-ci`

## Lexicon development

Source lexicons live in `lexicons/**`. Generated TypeScript bindings in `lib/lexicons/**` must not be edited by hand — regenerate with `pnpm build:lex` after any change.

### Language field

Both `blue.pronouns.name` and `blue.pronouns.pronoun` records carry an optional `lang` field — a [BCP-47](https://www.rfc-editor.org/rfc/rfc5646) language tag (e.g. `en`, `de`, `zh-CN`). When absent the UI treats the record as English (`en`). New records always write the field explicitly.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md), [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md), and [SECURITY.md](./SECURITY.md).

## Credits & AI disclosure

This project was **fully generated with AI assistance** using [GitHub Copilot](https://github.com/features/copilot). All code, architecture decisions, and content were produced through an AI-assisted workflow with human direction.

Inspired by these great projects in the pronoun-sharing space:

- [pronouns.cc](https://pronouns.cc)
- [pronouns.page](https://pronouns.page)
- [pronouny.xyz](https://pronouny.xyz)
