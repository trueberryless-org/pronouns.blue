import { HeartIcon } from "@/components/HeartIcon";
import { Link } from "next-view-transitions";

interface ProfileDisplayProps {
  title: string;
  handle: string;
  avatar: string | null;
  names: string[];
  pronouns: string[];
  preferredNames: string[];
  preferredPronouns: string[];
  editHref?: string;
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function BlueskyIcon({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.202 2.857C7.954 4.922 10.913 9.11 12 11.358c1.087-2.247 4.046-6.436 6.798-8.501C20.783 1.366 24 .213 24 3.883c0 .732-.42 6.156-.667 7.037-.856 3.061-3.978 3.842-6.755 3.37 4.854.826 6.089 3.562 3.422 6.299-5.065 5.196-7.28-1.304-7.847-2.97-.104-.305-.152-.448-.153-.327 0-.121-.05.022-.153.327-.568 1.666-2.782 8.166-7.847 2.97-2.667-2.737-1.432-5.473 3.422-6.3-2.777.473-5.899-.308-6.755-3.369C.42 10.04 0 4.615 0 3.883c0-3.67 3.217-2.517 5.202-1.026" />
    </svg>
  );
}

function Avatar({ src, label }: { src: string | null; label: string }) {
  if (src) {
    return (
      <div
        className="h-24 w-24 rounded-full border border-[var(--border)] bg-cover bg-center"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={label}
      />
    );
  }
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--tag-bg)] text-3xl font-semibold text-[var(--text)]">
      {label.slice(0, 1).toUpperCase()}
    </div>
  );
}

function EntryColumn({
  label,
  items,
  preferred,
}: {
  label: string;
  items: string[];
  preferred: string[];
}) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
        {label}
      </h2>
      <ul>
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center justify-between border-b border-[var(--line)] py-2 text-base text-[var(--text)]"
          >
            <span>{item}</span>
            {preferred.includes(item) && (
              <span title="Preferred">
                <HeartIcon filled className="h-5 w-5 text-[var(--danger)]" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProfileDisplay(props: ProfileDisplayProps) {
  const hasNames = props.names.length > 0;
  const hasPronouns = props.pronouns.length > 0;
  const hasAny = hasNames || hasPronouns;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-12 pb-16 sm:pt-16">
      <section className="w-full py-4">
        {props.editHref && (
          <div className="mb-4 flex justify-end">
            <Link
              href={props.editHref}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-label="Edit your names and pronouns"
              title="Edit profile"
            >
              <EditIcon />
            </Link>
          </div>
        )}
        <div className="mb-8 flex flex-col items-center text-center">
          <Avatar src={props.avatar} label={props.title} />
          <h1 className="mt-4 text-3xl font-bold text-[var(--text)]">
            {props.title}
          </h1>
          <p className="mt-1 flex items-center gap-2 text-base text-[var(--muted)]">
            <span>@{props.handle}</span>
            <a
              href={`https://bsky.app/profile/${props.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Bluesky"
              title="View on Bluesky"
              className="translate-y-0.3 text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
            >
              <BlueskyIcon className="h-4 w-4" />
            </a>
          </p>
        </div>

        {hasAny ? (
          <div
            className={`grid gap-6 ${hasNames && hasPronouns ? "md:grid-cols-2" : ""}`}
          >
            {hasNames && (
              <EntryColumn
                label="Names"
                items={props.names}
                preferred={props.preferredNames}
              />
            )}
            {hasPronouns && (
              <EntryColumn
                label="Pronouns"
                items={props.pronouns}
                preferred={props.preferredPronouns}
              />
            )}
          </div>
        ) : (
          <p className="text-center text-[var(--muted)]">
            This user hasn&apos;t set any names or pronouns yet.
          </p>
        )}
      </section>
    </main>
  );
}
