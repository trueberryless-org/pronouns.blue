---
title: Privacy Policy
description: How pronouns.blue handles account and profile data.
updated: September 2026
order: 2
---

## The short version

pronouns.blue has no account or profile database. Your names and pronouns live in your public AT Protocol repository. Your OAuth session and DPoP private key remain in your browser.

## Data we store

We do not store authentication credentials, profile records, or analytics in an application database. The ATCute OAuth client stores your session, DPoP key, and short-lived authorization state in browser storage. Signing out removes the stored session.

Public profile pages are cached by Cloudflare for speed. That cache is invalidated after you successfully update your pronouns.blue records.

## Third-party services

The Service contacts the Bluesky public AppView at `public.api.bsky.app` to resolve handles, search profiles, and display public Bluesky profile information. It contacts `plc.directory` or a `did:web` document to locate an account’s PDS, then reads public records directly from that PDS.

Cloudflare hosts the website and can process ordinary request information such as IP addresses and request metadata under its own privacy terms.

## Browser storage

The Service does not use an authentication cookie. OAuth tokens, the DPoP private key, and temporary PKCE authorization state are held in browser storage by the ATCute OAuth client. Theme and editor tutorial preferences can also be stored locally.

## Public records and deletion

Records in `blue.pronouns.name` and `blue.pronouns.pronoun` are public. Delete those records through the settings page, your PDS, another compatible client, or [PDSLS](https://pdsls.dev) to remove them from your repository. Copies outside your repository may remain in caches until invalidated or evicted.

## Contact

For privacy questions, open an issue in the project’s [GitHub repository](https://github.com/trueberryless-org/pronouns.blue/issues/new/choose).
