# pronouns.blue

pronouns.blue is an Astro application for publishing and sharing names and pronouns through the AT Protocol. Profile records remain in each user’s Personal Data Server.

## Architecture

- Astro prerenders the home, settings shell, OAuth callback shell, and policy content.
- `src/pages/profile/[handle].astro` renders public profiles on demand in a Cloudflare Worker.
- Astro’s Cloudflare cache provider caches profile responses for ten years in practice and tags each response with the profile DID.
- A successful settings update purges that DID’s cache tag.
- ATCute’s browser OAuth client stores OAuth sessions and DPoP keys locally. Credentials never pass through the Worker.
- Settings reads and writes the `blue.pronouns.name` and `blue.pronouns.pronoun` collections directly against the user’s PDS.
- Profile updates use one `com.atproto.repo.applyWrites` transaction so an unsuccessful update cannot leave a partially replaced profile.

The Worker-side application uses Web Platform APIs only. The Wrangler configuration intentionally does not enable `nodejs_compat`.

## Development

Enter the Node development environment first:

```sh
dev-node
pnpm install
pnpm dev
```

The Astro development server runs in background mode. Manage it with:

```sh
pnpm dev:status
pnpm dev:logs
pnpm dev:stop
```

Run validation:

```sh
pnpm test
pnpm check
pnpm build
pnpm exec wrangler deploy --dry-run
```

Preview the production Worker build:

```sh
pnpm build
pnpm preview
```

## Deployment

Deploy to Cloudflare Workers with:

```sh
pnpm deploy
```

The production origin must be `https://pronouns.blue` because it is used as the OAuth client identifier and redirect origin. Cloudflare’s adapter supplies its cache purge API in production; Wrangler’s local runtime currently lacks `cache.purge`, so local cache invalidation is treated as a successful no-op.

## Lexicons

The lexicon schemas are in `lexicons/` and listed by `lexicons.json`.
