import Image from "next/image";

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <div className="relative mb-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)]">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Last updated: May 2025
          </p>
        </div>
        <Image
          src="/pronouns.blue-round.svg"
          alt="pronouns.blue logo"
          width={80}
          height={80}
          className="pointer-events-none mt-1 h-16 w-16 shrink-0 select-none sm:h-20 sm:w-20"
        />
      </div>

      <p className="mb-10 text-sm text-[var(--muted)]">
        Please read these terms carefully before using pronouns.blue.
      </p>

      <div className="space-y-6">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            1. Acceptance of Terms
          </h2>
          <p className="text-[var(--muted)]">
            By accessing or using pronouns.blue (&ldquo;the Service&rdquo;), you
            agree to be bound by these Terms of Service. If you do not agree,
            please do not use the Service. Use of the Service is also subject to
            our{" "}
            <a
              href="/privacy"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              Privacy Policy
            </a>
            , which is incorporated herein by reference.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            2. Description of the Service
          </h2>
          <p className="text-[var(--muted)]">
            pronouns.blue is a web application built on the{" "}
            <a
              href="https://atproto.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              AT Protocol
            </a>{" "}
            that allows you to publish, manage, and share your preferred names
            and pronouns. Records are written directly to your own AT Protocol
            Personal Data Server (PDS) — the Service acts as a thin interface
            and does not store your personal data on its own servers.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            3. Your AT Protocol Data
          </h2>
          <p className="mb-3 text-[var(--muted)]">
            Because records live in your own PDS repo, you retain full ownership
            and control of your data. The following implications apply:
          </p>
          <ul className="space-y-3 text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--text)]">
                Public by default
              </span>{" "}
              — AT Protocol repositories are publicly readable. Any names or
              pronouns you publish via the Service will be visible to anyone who
              queries your PDS or the Bluesky network.
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                Portability
              </span>{" "}
              — you can inspect, export, or delete your records at any time
              through your PDS, any compatible AT Protocol client, or a tool
              like{" "}
              <a
                href="https://pdsls.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] underline underline-offset-4"
              >
                PDSLS
              </a>
              .
            </li>
            <li>
              <span className="font-medium text-[var(--text)]">
                No server-side storage
              </span>{" "}
              — the Service holds no copy of your names or pronouns. Your OAuth
              session is stored only as{" "}
              <code className="text-xs">httpOnly</code> browser cookies, deleted
              when you sign out.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            4. Account Requirements
          </h2>
          <p className="text-[var(--muted)]">
            To publish or manage records you must authenticate with a valid AT
            Protocol account (e.g., a Bluesky account or a self-hosted PDS). By
            signing in you confirm that you are the legitimate owner of that
            account and that you will not impersonate another person or entity.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            5. Acceptable Use
          </h2>
          <p className="mb-3 text-[var(--muted)]">
            You agree not to use the Service to:
          </p>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>
              publish content that is unlawful, abusive, threatening, or
              harassing;
            </li>
            <li>
              impersonate any individual, organisation, or AT Protocol identity
              you do not own;
            </li>
            <li>
              attempt to interfere with, disrupt, or overload the Service or any
              connected AT Protocol infrastructure;
            </li>
            <li>
              use automated means (bots, scrapers, etc.) to access the Service
              in a manner that exceeds reasonable personal use.
            </li>
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            6. Intellectual Property
          </h2>
          <p className="text-[var(--muted)]">
            The pronouns.blue source code is open-source and available on{" "}
            <a
              href="https://github.com/trueberryless-org/pronouns.blue"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] underline underline-offset-4"
            >
              GitHub
            </a>{" "}
            under the MIT license. The pronouns.blue name and logo assets are
            the property of the project maintainers. You may not use them to
            imply endorsement without permission.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            7. Disclaimer of Warranties
          </h2>
          <p className="text-[var(--muted)]">
            The Service is provided &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; without warranties of any kind, either express or
            implied, including but not limited to warranties of merchantability,
            fitness for a particular purpose, or non-infringement. We do not
            warrant that the Service will be uninterrupted, error-free, or free
            of harmful components.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            8. Limitation of Liability
          </h2>
          <p className="text-[var(--muted)]">
            To the fullest extent permitted by law, the maintainers of
            pronouns.blue shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising from your use of
            or inability to use the Service, even if advised of the possibility
            of such damages. Because your data lives on your own PDS, we are not
            responsible for data loss or availability issues caused by your PDS
            provider.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            9. Changes to These Terms
          </h2>
          <p className="text-[var(--muted)]">
            We may update these Terms of Service from time to time. When we do,
            the &ldquo;Last updated&rdquo; date at the top of this page will
            change. Continued use of the Service after any update constitutes
            your acceptance of the revised terms. We encourage you to review
            this page periodically.
          </p>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
          <h2 className="mb-3 text-xl font-semibold text-[var(--text)]">
            10. Contact
          </h2>
          <p className="text-[var(--muted)]">
            Questions about these terms? Open an issue on{" "}
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
