import { HeartIcon } from "@/components/HeartIcon";
import type { LanguageGroup } from "@/lib/atproto/records";
import { ProfileEditButton } from "@/components/ProfileEditButton";

const LANG_NAMES = new Intl.DisplayNames(["en"], { type: "language" });

function langLabel(tag: string): string {
  try {
    return LANG_NAMES.of(tag) ?? tag;
  } catch {
    return tag;
  }
}

interface ProfileDisplayProps {
  title: string;
  handle: string;
  avatar: string | null;
  groups: LanguageGroup[];
  /** Pronouns string from the Bluesky profile record — shown only when no blue.pronouns records exist. */
  bskyFallbackPronouns?: string | null;
  /** DID of the profile owner. When provided, a client-side edit button is shown to the profile owner. */
  profileDid?: string;
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
  bskyFallback,
}: {
  label: string;
  items: string[];
  preferred: string[];
  bskyFallback?: string | null;
}) {
  const isFallback = items.length === 0 && !!bskyFallback;
  const effectiveItems = isFallback ? [bskyFallback!] : items;
  if (effectiveItems.length === 0) return null;

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          {label}
        </h2>
        {isFallback && (
          <span className="flex items-center gap-1 rounded-full border border-[var(--border)] px-1.5 py-0.5 text-[10px] text-[var(--muted)]">
            <BlueskyIcon className="h-2.5 w-2.5" />
            from Bluesky
          </span>
        )}
      </div>
      <ul>
        {effectiveItems.map((item) => (
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

function LanguageGroupSection({
  group,
  showLangLabel,
}: {
  group: LanguageGroup;
  showLangLabel: boolean;
}) {
  const hasNames = group.names.length > 0;
  const hasPronouns = group.pronouns.length > 0;
  if (!hasNames && !hasPronouns) return null;

  return (
    <div className="space-y-4">
      {showLangLabel && (
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 text-xs font-medium text-[var(--muted)]">
            {langLabel(group.lang)}
          </span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>
      )}
      <div
        className={`grid gap-6 ${hasNames && hasPronouns ? "md:grid-cols-2" : ""}`}
      >
        {hasNames && (
          <EntryColumn
            label="Names"
            items={group.names}
            preferred={group.preferredNames}
          />
        )}
        {hasPronouns && (
          <EntryColumn
            label="Pronouns"
            items={group.pronouns}
            preferred={group.preferredPronouns}
          />
        )}
      </div>
    </div>
  );
}

export function ProfileDisplay(props: ProfileDisplayProps) {
  const activeGroups = props.groups.filter(
    (g) => g.names.length > 0 || g.pronouns.length > 0,
  );
  const hasAny = activeGroups.length > 0;
  const hasBskyPronouns = !hasAny && !!props.bskyFallbackPronouns;
  const showLangLabels = activeGroups.length > 1;

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 min-h-screen px-4 pt-12 pb-16 sm:pt-16">
      <section className="w-full py-4">
        {props.profileDid && <ProfileEditButton profileDid={props.profileDid} />}
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
          <div className="space-y-8">
            {activeGroups.map((group) => (
              <LanguageGroupSection
                key={group.lang}
                group={group}
                showLangLabel={showLangLabels}
              />
            ))}
          </div>
        ) : hasBskyPronouns ? (
          <div className="grid gap-6">
            <EntryColumn
              label="Pronouns"
              items={[]}
              preferred={[]}
              bskyFallback={props.bskyFallbackPronouns}
            />
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
