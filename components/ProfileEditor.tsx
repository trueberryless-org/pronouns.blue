"use client";

import { useEffect, useMemo, useState } from "react";
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
  isFirstTime?: boolean;
  profileHref?: string;
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

function TutorialTooltip({
  text,
  onDismiss,
}: {
  text: string;
  onDismiss: () => void;
}) {
  return (
    <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2">
      <div className="animate-[fade-in-up_0.2s_ease-out_both]">
        <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] py-1 pl-3 pr-1.5 text-xs font-medium text-[var(--accent-contrast)] shadow-lg">
          {text}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            aria-label="Dismiss hint"
            className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-contrast)]/20 opacity-80 hover:opacity-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-2.5 w-2.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {/* Downward caret */}
        <div
          className="absolute left-1/2 top-full -translate-x-1/2"
          style={{
            width: 0,
            height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderTop: "5px solid var(--accent)",
          }}
        />
      </div>
    </div>
  );
}

function EntryList({
  label,
  items,
  preferred,
  tutorialStep = 0,
  onTogglePreferred,
  onMoveUp,
  onMoveDown,
  onRemove,
  onTutorialAdvance,
  onTutorialDismiss,
}: {
  label: string;
  items: string[];
  preferred: string[];
  tutorialStep?: 0 | 1 | 2;
  onTogglePreferred: (item: string) => void;
  onMoveUp: (item: string) => void;
  onMoveDown: (item: string) => void;
  onRemove: (item: string) => void;
  onTutorialAdvance?: () => void;
  onTutorialDismiss?: () => void;
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
        const showHeartTip = tutorialStep === 1 && index === 0;
        const showArrowTip = tutorialStep === 2 && index === 0;
        return (
          <li
            key={item}
            className="flex items-center gap-3 border-b border-[var(--line)] py-2"
          >
            <span className="flex-1 truncate text-base text-[var(--text)]">
              {item}
            </span>
            <div className="flex flex-shrink-0 items-center gap-0.5">
              {/* Heart button */}
              <div className="relative">
                {showHeartTip && (
                  <TutorialTooltip
                    text="mark as preferred"
                    onDismiss={() => onTutorialDismiss?.()}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    onTogglePreferred(item);
                    if (showHeartTip) onTutorialAdvance?.();
                  }}
                  aria-pressed={isPreferred}
                  aria-label={`${isPreferred ? "Unmark" : "Mark"} ${item} as preferred`}
                  className={`rounded p-1.5 transition-colors ${
                    isPreferred
                      ? "text-[var(--danger)]"
                      : "text-[var(--muted)] hover:text-[var(--danger)]"
                  } ${showHeartTip ? "ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]" : ""}`}
                >
                  <HeartIcon filled={isPreferred} className="h-4 w-4" />
                </button>
              </div>

              {/* Arrow buttons */}
              <div className="relative flex items-center gap-0.5">
                {showArrowTip && (
                  <TutorialTooltip
                    text="set the order"
                    onDismiss={() => onTutorialDismiss?.()}
                  />
                )}
                <button
                  type="button"
                  onClick={() => {
                    onMoveUp(item);
                    if (showArrowTip) onTutorialAdvance?.();
                  }}
                  disabled={!canMoveUp}
                  className={`rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40 ${showArrowTip ? "ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]" : ""}`}
                  aria-label={`Move ${item} up`}
                >
                  <ArrowUpIcon />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onMoveDown(item);
                    if (showArrowTip) onTutorialAdvance?.();
                  }}
                  disabled={!canMoveDown}
                  className={`rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40 ${showArrowTip ? "ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]" : ""}`}
                  aria-label={`Move ${item} down`}
                >
                  <ArrowDownIcon />
                </button>
              </div>

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
  isFirstTime = false,
  profileHref,
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
  const [tutorialStep, setTutorialStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const done = localStorage.getItem("pronounsblue-tutorial") === "done";
    if (!done) setTutorialStep(1);
  }, []);

  function advanceTutorial() {
    if (tutorialStep === 1) {
      // Only show reorder step if there are 2+ names to actually reorder
      if (names.length >= 2) {
        setTutorialStep(2);
      } else {
        setTutorialStep(0);
        localStorage.setItem("pronounsblue-tutorial", "done");
      }
    } else if (tutorialStep === 2) {
      setTutorialStep(0);
      localStorage.setItem("pronounsblue-tutorial", "done");
    }
  }

  function dismissTutorial() {
    setTutorialStep(0);
    localStorage.setItem("pronounsblue-tutorial", "done");
  }

  const canSave = useMemo(
    () => (names.length > 0 || pronouns.length > 0) && !isSaving,
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
      {isFirstTime && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <div className="flex items-start">
            {/* Step 1 – done */}
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-contrast)]">
                ✓
              </div>
              <span className="text-xs font-medium text-[var(--text)]">
                Sign in
              </span>
            </div>
            <div
              className="mt-4 h-px flex-1"
              style={{ background: "var(--accent)" }}
            />
            {/* Step 2 – current / done after save */}
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                  saved
                    ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                    : "border-2 border-[var(--accent)] text-[var(--accent)]"
                }`}
              >
                {saved ? "✓" : "2"}
              </div>
              <span className="text-xs font-medium text-[var(--text)]">
                Add your info
              </span>
            </div>
            <div
              className="mt-4 h-px flex-1 transition-colors"
              style={{
                background: saved ? "var(--accent)" : "var(--border)",
              }}
            />
            {/* Step 3 – upcoming / active after save */}
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
                  saved
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                3
              </div>
              <span
                className={`text-xs transition-colors ${saved ? "font-medium text-[var(--text)]" : "text-[var(--muted)]"}`}
              >
                Share
              </span>
            </div>
          </div>

          {saved && profileHref && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">
                    You&apos;re all set!
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    Your profile is live and ready to share.
                  </p>
                </div>
              </div>
              <a
                href={profileHref}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90"
              >
                View your profile
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </a>
            </div>
          )}
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h3 className="mb-1 text-lg font-semibold text-[var(--text)]">
            Names
          </h3>
          <p className="mb-3 text-sm text-[var(--muted)]">
            Add one or more names — you can have as many as you like.
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
            tutorialStep={tutorialStep}
            onTutorialAdvance={advanceTutorial}
            onTutorialDismiss={dismissTutorial}
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
            Pick from common options or type your own.
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
      {saved && !isFirstTime && (
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
