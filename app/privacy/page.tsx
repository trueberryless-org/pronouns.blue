import { getDid } from "@/lib/auth/session";

export default async function PrivacyPage() {
  const did = await getDid();
  const pronounRecordsPdslsHref = did
    ? `https://pdsls.dev/at://${did}/blue.pronouns.pronoun`
    : null;
  const nameRecordsPdslsHref = did
    ? `https://pdsls.dev/at://${did}/blue.pronouns.name`
    : null;

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
                Nothing server-side
              </span>{" "}
              — we run no database. Your OAuth session is stored entirely in
              your browser as encrypted cookies (see below). When you sign out,
              those cookies are deleted.
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                Names &amp; pronouns
              </span>{" "}
              — your names and pronouns are written directly to your PDS and
              read back on every page load. We never keep a copy.
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
              resolve handles and search for users. This is a public,
              unauthenticated API.
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                PLC directory
              </span>{" "}
              (<code className="text-xs">plc.directory</code>) — used to look up
              the PDS endpoint for a given DID.
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">Your PDS</span> —
              all record reads and writes go to your personal data server,
              authenticated via OAuth.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Cookies
          </h2>
          <p className="mb-3 text-[var(--muted)]">
            We set three <code className="text-xs">httpOnly</code> session
            cookies. They are never accessible to JavaScript and are never used
            for tracking.
          </p>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>
              <code className="text-xs font-medium text-[var(--text)]">
                did
              </code>{" "}
              — your ATProto DID, used to identify your login session.
            </li>
            <li>
              <code className="text-xs font-medium text-[var(--text)]">
                session
              </code>{" "}
              — your OAuth tokens and DPoP private key, used to make
              authenticated requests to your PDS on your behalf. Expires after
              30 days or when you sign out.
            </li>
            <li>
              <code className="text-xs font-medium text-[var(--text)]">
                oauth_state
              </code>{" "}
              — temporary PKCE state during the sign-in redirect. Expires after
              10 minutes automatically.
            </li>
          </ul>
        </section>

        {pronounRecordsPdslsHref && nameRecordsPdslsHref && (
          <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
            <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
              View your records in PDSLS
            </h2>
            <p className="text-[var(--muted)]">
              If you are signed in, you can inspect your published lexicon
              records directly in{" "}
              <a
                href="https://pdsls.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline underline-offset-4"
              >
                PDSLS
              </a>
              .
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={pronounRecordsPdslsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                blue.pronouns.pronoun
              </a>
              <a
                href={nameRecordsPdslsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                blue.pronouns.name
              </a>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Data deletion
          </h2>
          <p className="text-[var(--muted)]">
            Sign out to delete your session cookies. Your name/pronoun records
            are stored in your own ATProto repo — delete them there (via your
            PDS, any ATProto client, or{" "}
            {pronounRecordsPdslsHref && nameRecordsPdslsHref ? (
              <>
                <a
                  href={pronounRecordsPdslsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline underline-offset-4"
                >
                  PDSLS for pronouns
                </a>{" "}
                and{" "}
                <a
                  href={nameRecordsPdslsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline underline-offset-4"
                >
                  PDSLS for names
                </a>
              </>
            ) : (
              <a
                href="https://pdsls.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline underline-offset-4"
              >
                PDSLS
              </a>
            )}
            ) to remove them from your repo and from public view.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            Contact
          </h2>
          <p className="text-[var(--muted)]">
            Questions or concerns? Open an issue on{" "}
            <a
              href="https://github.com/trueberryless-org/pronouns.blue/issues/new/choose"
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
