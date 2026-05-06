import Image from "next/image";

export default function CreditsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-3xl font-bold text-[var(--text)]">
        Credits &amp; Inspiration
      </h1>

      <section className="relative mb-10 space-y-4 overflow-visible rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <Image
          src="/pronouns.blue-round.svg"
          alt="pronouns.blue round logo"
          width={120}
          height={120}
          className="pointer-events-none absolute right-0 top-0 h-20 w-20 -translate-y-1/3 translate-x-1/3 select-none -rotate-6 sm:h-24 sm:w-24"
        />
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Project Credits
        </h2>
        <p className="text-[var(--muted)]">
          Huge thanks to{" "}
          <a
            href="https://bsky.app/profile/alfon.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-4"
          >
            @alfon.dev
          </a>{" "}
          and{" "}
          <a
            href="https://bsky.app/profile/alexdln.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-4"
          >
            @alexdln.com
          </a>{" "}
          for their amazing assistance and help creating all logo assets for
          this project.
        </p>
        <p className="text-[var(--muted)]">
          This website was created by{" "}
          <a
            href="https://bsky.app/profile/trueberryless.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-4"
          >
            @trueberryless.org
          </a>{" "}
          and used{" "}
          <a
            href="https://github.com/bluesky-social/statusphere-example-app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-4"
          >
            bluesky-social/statusphere-example-app
          </a>{" "}
          as a very convenient starting point.
        </p>
      </section>

      <section className="mb-10 space-y-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Inspiration
        </h2>
        <p className="text-[var(--muted)]">
          pronouns.blue draws inspiration from these wonderful projects in the
          pronoun-sharing space. Please check them out!
        </p>

        <ul className="space-y-5">
          {[
            {
              name: "pronouns.cc",
              url: "https://pronouns.cc",
              description:
                "A platform for sharing your pronouns, names, and more — with a beautiful and inclusive design.",
            },
            {
              name: "pronouns.page",
              url: "https://pronouns.page",
              description:
                "A comprehensive pronoun reference and profile tool available in many languages.",
            },
            {
              name: "pronouny.xyz",
              url: "https://pronouny.xyz",
              description:
                "A simple and accessible pronoun sharing site built for the community.",
            },
          ].map(({ name, url, description }) => (
            <li
              key={url}
              className="border-b border-[var(--line)] pb-5 last:border-0 last:pb-0"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-[var(--accent)] underline underline-offset-4"
              >
                {name}
              </a>
              <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <h2 className="text-xl font-semibold text-[var(--text)]">
          Built with AI
        </h2>
        <p className="text-[var(--muted)]">
          This website was fully generated with AI assistance using{" "}
          <a
            href="https://github.com/features/copilot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] underline underline-offset-4"
          >
            GitHub Copilot
          </a>
          . All code, design decisions, and content were produced through an
          AI-assisted workflow with human direction.
        </p>
      </section>
    </main>
  );
}
