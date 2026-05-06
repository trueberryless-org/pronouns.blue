"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HeartIcon } from "@/components/HeartIcon";

const COMMON_PRONOUNS = [
  "she/her",
  "he/him",
  "they/them",
  "she/they",
  "he/they",
  "xe/xem",
  "ze/zir",
  "fae/faer",
  "it/its",
  "any/all",
  "ask me",
  "name only",
];

interface ProfileEditorProps {
  initialNames: string[];
  initialPronouns: string[];
  initialPreferredNames: string[];
  initialPreferredPronouns: string[];
}

function normalizeEntries(entries: string[]) {
  return Array.from(
    new Map(
      entries.map((entry) => [entry.toLocaleLowerCase(), entry]),
    ).values(),
  );
}

function splitInput(raw: string): string[] {
  return raw
    .split(/[,\n;]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function moveEntry(entries: string[], from: number, to: number): string[] {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= entries.length ||
    to >= entries.length
  ) {
    return entries;
  }
  const next = [...entries];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}


function EntryList({
  label,
  items,
  preferred,
  onTogglePreferred,
  onMoveUp,
  onMoveDown,
  onRemove,
}: {
  label: string;
  items: string[];
  preferred: string[];
  onTogglePreferred: (item: string) => void;
  onMoveUp: (item: string) => void;
  onMoveDown: (item: string) => void;
  onRemove: (item: string) => void;
}) {
  if (items.length === 0) {
    return (
      <p className="border-b border-[var(--line)] py-3 text-sm text-[var(--muted)]">
        No {label} yet.
      </p>
    );
  }

  return (
    <ul>
      {items.map((item, index) => {
        const isPreferred = preferred.includes(item);
        const canMoveUp = index > 0;
        const canMoveDown = index < items.length - 1;
        return (
          <li
            key={item}
            className="flex items-center gap-3 border-b border-[var(--line)] py-2"
          >
            <span className="flex-1 truncate text-base text-[var(--text)]">
              {item}
            </span>
            <div className="flex flex-shrink-0 items-center gap-0.5">
              <button
                type="button"
                onClick={() => onTogglePreferred(item)}
                aria-pressed={isPreferred}
                aria-label={`${isPreferred ? "Unmark" : "Mark"} ${item} as preferred`}
                className={`rounded p-1.5 ${isPreferred ? "text-[var(--danger)]" : "text-[var(--muted)] hover:text-[var(--danger)]"}`}
              >
                <HeartIcon filled={isPreferred} className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onMoveUp(item)}
                disabled={!canMoveUp}
                className="rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Move ${item} up`}
              >
                <ArrowUpIcon />
              </button>
              <button
                type="button"
                onClick={() => onMoveDown(item)}
                disabled={!canMoveDown}
                className="rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Move ${item} down`}
              >
                <ArrowDownIcon />
              </button>
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="rounded p-1.5 text-[var(--muted)] hover:text-[var(--danger)]"
                aria-label={`Remove ${item}`}
              >
                <TrashIcon />
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ProfileEditor({
  initialNames,
  initialPronouns,
  initialPreferredNames,
  initialPreferredPronouns,
}: ProfileEditorProps) {
  const router = useRouter();
  const [names, setNames] = useState<string[]>(normalizeEntries(initialNames));
  const [pronouns, setPronouns] = useState<string[]>(
    normalizeEntries(initialPronouns),
  );
  const [preferredNames, setPreferredNames] = useState<string[]>(
    normalizeEntries(initialPreferredNames).filter((entry) =>
      initialNames.includes(entry),
    ),
  );
  const [preferredPronouns, setPreferredPronouns] = useState<string[]>(
    normalizeEntries(initialPreferredPronouns).filter((entry) =>
      initialPronouns.includes(entry),
    ),
  );
  const [nameInput, setNameInput] = useState("");
  const [pronounInput, setPronounInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const canSave = useMemo(
    () => names.length > 0 && pronouns.length > 0 && !isSaving,
    [names.length, pronouns.length, isSaving],
  );

  function addNames(raw: string) {
    const additions = splitInput(raw);
    if (additions.length === 0) return;
    setNames((current) => normalizeEntries([...current, ...additions]));
    setNameInput("");
    setSaved(false);
  }

  function addPronouns(raw: string) {
    const additions = splitInput(raw);
    if (additions.length === 0) return;
    setPronouns((current) => normalizeEntries([...current, ...additions]));
    setPronounInput("");
    setSaved(false);
  }

  async function saveProfile() {
    setIsSaving(true);
    setError(null);
    setSaved(false);
    try {
      const response = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          names,
          pronouns,
          preferredNames: preferredNames.filter((entry) =>
            names.includes(entry),
          ),
          preferredPronouns: preferredPronouns.filter((entry) =>
            pronouns.includes(entry),
          ),
        }),
      });
      const data = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? ((await response.json()) as { error?: string })
        : ({} as { error?: string });
      if (!response.ok) {
        throw new Error(data.error || `Server error ${response.status}`);
      }
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h3 className="mb-1 text-lg font-semibold text-[var(--text)]">
            Names
          </h3>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Add one or multiple names. Use hearts for preferred options and
            Up/Down to sort.
          </p>
          <div className="mb-3 flex gap-2">
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addNames(nameInput);
                }
              }}
              placeholder="Name, Name 2"
              className="min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
            />
            <button
              type="button"
              onClick={() => addNames(nameInput)}
              className="min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]"
            >
              Add
            </button>
          </div>
          <EntryList
            label="names"
            items={names}
            preferred={preferredNames}
            onTogglePreferred={(item) => {
              setPreferredNames((current) =>
                current.includes(item)
                  ? current.filter((entry) => entry !== item)
                  : [...current, item],
              );
              setSaved(false);
            }}
            onMoveUp={(item) => {
              setNames((current) => {
                const index = current.indexOf(item);
                return moveEntry(current, index, index - 1);
              });
              setSaved(false);
            }}
            onMoveDown={(item) => {
              setNames((current) => {
                const index = current.indexOf(item);
                return moveEntry(current, index, index + 1);
              });
              setSaved(false);
            }}
            onRemove={(item) => {
              setNames((current) => current.filter((entry) => entry !== item));
              setPreferredNames((current) =>
                current.filter((entry) => entry !== item),
              );
              setSaved(false);
            }}
          />
        </section>

        <section>
          <h3 className="mb-1 text-lg font-semibold text-[var(--text)]">
            Pronouns
          </h3>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Add any pronouns. Hearts mark preferred options and Up/Down controls
            sorting.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {COMMON_PRONOUNS.map((entry) => (
              <button
                key={entry}
                type="button"
                onClick={() => addPronouns(entry)}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1 text-sm text-[var(--text)] hover:border-[var(--accent)]"
              >
                {entry}
              </button>
            ))}
          </div>
          <div className="mb-3 flex gap-2">
            <input
              value={pronounInput}
              onChange={(event) => setPronounInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addPronouns(pronounInput);
                }
              }}
              placeholder="they/them, she/her"
              className="min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
            />
            <button
              type="button"
              onClick={() => addPronouns(pronounInput)}
              className="min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]"
            >
              Add
            </button>
          </div>
          <EntryList
            label="pronouns"
            items={pronouns}
            preferred={preferredPronouns}
            onTogglePreferred={(item) => {
              setPreferredPronouns((current) =>
                current.includes(item)
                  ? current.filter((entry) => entry !== item)
                  : [...current, item],
              );
              setSaved(false);
            }}
            onMoveUp={(item) => {
              setPronouns((current) => {
                const index = current.indexOf(item);
                return moveEntry(current, index, index - 1);
              });
              setSaved(false);
            }}
            onMoveDown={(item) => {
              setPronouns((current) => {
                const index = current.indexOf(item);
                return moveEntry(current, index, index + 1);
              });
              setSaved(false);
            }}
            onRemove={(item) => {
              setPronouns((current) =>
                current.filter((entry) => entry !== item),
              );
              setPreferredPronouns((current) =>
                current.filter((entry) => entry !== item),
              );
              setSaved(false);
            }}
          />
        </section>
      </div>

      {error && (
        <p className="border-b border-[var(--line)] py-2 text-sm text-[var(--danger)]">
          {error}
        </p>
      )}
      {saved && (
        <p className="border-b border-[var(--line)] py-2 text-sm text-[var(--success)]">
          Profile updated.
        </p>
      )}

      <button
        type="button"
        disabled={!canSave}
        onClick={saveProfile}
        className="min-h-12 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--accent-contrast)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving ? "Saving..." : "Save profile"}
      </button>
    </div>
  );
}
