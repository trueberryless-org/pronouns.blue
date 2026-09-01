---
title: Privacy Policy
description: Privacy Policy for pronouns.blue.
updated: May 2025
order: 2
---

## What this app does

pronouns.blue is an [AT Protocol](https://atproto.com) app that lets you publish your names and pronouns directly to your own ATProto repository (your personal data server, or PDS). Your data belongs to you and lives in your repo — not on our servers.

## Data we store

- **Nothing server-side** — we run no database. Your OAuth session and DPoP key stay in your browser's local storage. When you sign out, they are deleted.
- **Names & pronouns** — your names and pronouns are written directly to your PDS and read back on every page load. We never keep a copy.

## Third-party services we contact

- **Bluesky public appview** (`public.api.bsky.app`) — used to resolve handles and search for users. This is a public, unauthenticated API.
- **PLC directory** (`plc.directory`) — used to look up the PDS endpoint for a given DID.
- **Your PDS** — all record reads and writes go to your personal data server, authenticated via OAuth.

## Cookies

We do not set authentication cookies. The ATProto OAuth client stores its session, DPoP key, and short-lived authorization state in this browser's local storage so it can make authenticated requests directly to your PDS.

- `session` — your OAuth tokens and DPoP private key, used to make authenticated requests to your PDS on your behalf.
- `state` — temporary PKCE state during the sign-in redirect. It expires after 10 minutes automatically.

<section data-privacy-records hidden></section>

## Data deletion

Sign out to delete your browser-stored OAuth session. Your name/pronoun records are stored in your own ATProto repo — delete them there (via your PDS, any ATProto client, or [PDSLS](https://pdsls.dev)) to remove them from your repo and from public view.

## Contact

Questions or concerns? Open an issue on [GitHub](https://github.com/trueberryless-org/pronouns.blue/issues/new/choose).
