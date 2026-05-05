export default function PrivacyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="mb-2 text-3xl font-bold text-[var(--text)]">
        Privacy Policy
      </h1>
      <p className="mb-8 text-sm text-[var(--muted)]">Last updated: May 2025</p>

      <div className="space-y-8">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            What this app does
          </h2>
          <p className="text-[var(--muted)]">
            pronouns.blue is an{" "}
            <a
              href="https://atproto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              AT Protocol
            </a>{" "}
            app that lets you publish your names and pronouns directly to your
            own ATProto repository (your personal data server, or PDS). Your
            data belongs to you and lives in your repo — not on our servers.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Data we store
          </h2>
          <ul className="space-y-3 text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--text)]">
                OAuth session data
              </span>{" "}
              — when you sign in, we store your DID and OAuth tokens (encrypted
              session state) in our database solely to maintain your login
              session. This data is deleted when you sign out.
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                Nothing else
              </span>{" "}
              — your names and pronouns are written directly to your PDS and
              read back from it on every page load. We do not keep a copy in our
              database.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Third-party services we contact
          </h2>
          <ul className="space-y-3 text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--text)]">
                Bluesky public appview
              </span>{" "}
              (<code className="text-xs">public.api.bsky.app</code>) — used to
              resolve handles and search for users. This is a public, unauthenticated API.
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                PLC directory
              </span>{" "}
              (<code className="text-xs">plc.directory</code>) — used to look
              up the PDS endpoint for a given DID.
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                Your PDS
              </span>{" "}
              — all record reads and writes go to your personal data server,
              authenticated via OAuth.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Cookies
          </h2>
          <p className="text-[var(--muted)]">
            We set a single session cookie containing your DID to identify your
            login session. No tracking or analytics cookies are used.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Data deletion
          </h2>
          <p className="text-[var(--muted)]">
            Sign out to remove your OAuth session from our database. Your
            name/pronoun records are stored in your own ATProto repo — delete
            them there (via your PDS or any ATProto client) to remove them from
            your repo and from public view.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Contact
          </h2>
          <p className="text-[var(--muted)]">
            Questions or concerns? Open an issue on{" "}
            <a
              href="https://github.com/trueberryless-org/pronouns.blue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
