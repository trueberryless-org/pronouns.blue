<script setup lang="ts">
useHead({ title: "Privacy Policy – pronouns.blue" });
</script>

<template>
  <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
    <h1 class="mb-2 text-3xl font-bold text-[var(--text)]">Privacy Policy</h1>
    <p class="mb-8 text-sm text-[var(--muted)]">Last updated: May 2025</p>

    <div class="space-y-8">
      <section
        class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <h2 class="mb-3 text-xl font-semibold text-[var(--text)]">
          What this app does
        </h2>
        <p class="text-[var(--muted)]">
          pronouns.blue is an
          <a
            href="https://atproto.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--accent)] underline underline-offset-4"
            >AT Protocol</a
          >
          app that lets you publish your names and pronouns directly to your own
          ATProto repository (your personal data server, or PDS). Your data
          belongs to you and lives in your repo — not on our servers.
        </p>
      </section>

      <section
        class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <h2 class="mb-3 text-xl font-semibold text-[var(--text)]">
          Data we store
        </h2>
        <ul class="space-y-3 text-[var(--muted)]">
          <li>
            <span class="font-medium text-[var(--text)]"
              >Nothing server-side</span
            >
            — we run no database. Your OAuth session and DPoP key stay in your
            browser's local storage. When you sign out, they are deleted.
          </li>
          <li>
            <span class="font-medium text-[var(--text)]"
              >Names &amp; pronouns</span
            >
            — your names and pronouns are written directly to your PDS and read
            back on every page load. We never keep a copy.
          </li>
        </ul>
      </section>

      <section
        class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <h2 class="mb-3 text-xl font-semibold text-[var(--text)]">
          Third-party services we contact
        </h2>
        <ul class="space-y-3 text-[var(--muted)]">
          <li>
            <span class="font-medium text-[var(--text)]"
              >Bluesky public appview</span
            >
            (<code class="text-xs">public.api.bsky.app</code>) — used to resolve
            handles and search for users. This is a public, unauthenticated API.
          </li>
          <li>
            <span class="font-medium text-[var(--text)]">PLC directory</span>
            (<code class="text-xs">plc.directory</code>) — used to look up the
            PDS endpoint for a given DID.
          </li>
          <li>
            <span class="font-medium text-[var(--text)]">Your PDS</span> — all
            record reads and writes go to your personal data server,
            authenticated via OAuth.
          </li>
        </ul>
      </section>

      <section
        class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <h2 class="mb-3 text-xl font-semibold text-[var(--text)]">Cookies</h2>
        <p class="mb-3 text-[var(--muted)]">
          We do not set authentication cookies. The ATProto OAuth client stores
          its session, DPoP key, and short-lived authorization state in this
          browser's local storage so it can make authenticated requests directly
          to your PDS.
        </p>
        <ul class="space-y-2 text-[var(--muted)]">
          <li>
            <code class="text-xs font-medium text-[var(--text)]">session</code>
            — your OAuth tokens and DPoP private key, used to make authenticated
            requests to your PDS on your behalf.
          </li>
          <li>
            <code class="text-xs font-medium text-[var(--text)]">state</code> —
            temporary PKCE state during the sign-in redirect. It expires after
            10 minutes automatically.
          </li>
        </ul>
      </section>

      <PrivacyUserSection />

      <section
        class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <h2 class="mb-3 text-xl font-semibold text-[var(--text)]">
          Data deletion
        </h2>
        <p class="text-[var(--muted)]">
          Sign out to delete your browser-stored OAuth session. Your
          name/pronoun records are stored in your own ATProto repo — delete them
          there (via your PDS, any ATProto client, or
          <a
            href="https://pdsls.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--accent)] underline underline-offset-4"
            >PDSLS</a
          >) to remove them from your repo and from public view.
        </p>
      </section>

      <section
        class="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
      >
        <h2 class="mb-3 text-xl font-semibold text-[var(--text)]">Contact</h2>
        <p class="text-[var(--muted)]">
          Questions or concerns? Open an issue on
          <a
            href="https://github.com/trueberryless-org/pronouns.blue/issues/new/choose"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--accent)] underline underline-offset-4"
            >GitHub</a
          >.
        </p>
      </section>
    </div>
  </main>
</template>
