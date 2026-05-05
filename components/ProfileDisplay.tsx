import { HeartIcon } from "@/components/HeartIcon";

interface ProfileDisplayProps {
  title: string;
  handle: string;
  avatar: string | null;
  names: string[];
  pronouns: string[];
  preferredNames: string[];
  preferredPronouns: string[];
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
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center px-4 pb-8">
      <section className="w-full py-4">
        <div className="mb-8 flex flex-col items-center text-center">
          <Avatar src={props.avatar} label={props.title} />
          <h1 className="mt-4 text-3xl font-bold text-[var(--text)]">
            {props.title}
          </h1>
          <p className="mt-1 text-base text-[var(--muted)]">@{props.handle}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <EntryColumn
            label="Names"
            items={props.names}
            preferred={props.preferredNames}
          />
          <EntryColumn
            label="Pronouns"
            items={props.pronouns}
            preferred={props.preferredPronouns}
          />
        </div>
      </section>
    </main>
  );
}
