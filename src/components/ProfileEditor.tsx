"use client";

import { useEffect, useMemo, useState } from "react";

import { HeartIcon } from "@/components/HeartIcon";
import { DEFAULT_LANG, type LanguageGroup } from "@/lib/atproto/records";

// ─── Common pronoun suggestions ──────────────────────────────────────────────

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

// ─── Common language options ──────────────────────────────────────────────────

const COMMON_LANGUAGES: { tag: string; label: string }[] = [
  { tag: "en", label: "English" },
  { tag: "de", label: "Deutsch (German)" },
  { tag: "fr", label: "Français (French)" },
  { tag: "es", label: "Español (Spanish)" },
  { tag: "pt", label: "Português (Portuguese)" },
  { tag: "pt-BR", label: "Português (Brazil)" },
  { tag: "it", label: "Italiano (Italian)" },
  { tag: "nl", label: "Nederlands (Dutch)" },
  { tag: "pl", label: "Polski (Polish)" },
  { tag: "ru", label: "Русский (Russian)" },
  { tag: "uk", label: "Українська (Ukrainian)" },
  { tag: "cs", label: "Čeština (Czech)" },
  { tag: "sv", label: "Svenska (Swedish)" },
  { tag: "nb", label: "Norsk bokmål (Norwegian)" },
  { tag: "fi", label: "Suomi (Finnish)" },
  { tag: "ja", label: "日本語 (Japanese)" },
  { tag: "zh", label: "中文 (Chinese)" },
  { tag: "zh-CN", label: "中文 (Simplified)" },
  { tag: "zh-TW", label: "中文 (Traditional)" },
  { tag: "ko", label: "한국어 (Korean)" },
  { tag: "ar", label: "العربية (Arabic)" },
  { tag: "tr", label: "Türkçe (Turkish)" },
  { tag: "id", label: "Bahasa Indonesia" },
  { tag: "hi", label: "हिन्दी (Hindi)" },
];

function langLabel(tag: string): string {
  return COMMON_LANGUAGES.find((l) => l.tag === tag)?.label ?? tag;
}

// ─── Small icons ──────────────────────────────────────────────────────────────

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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeEntries(entries: string[]) {
  return Array.from(
    new Map(entries.map((e) => [e.toLocaleLowerCase(), e])).values(),
  );
}

function splitInput(raw: string): string[] {
  return raw
    .split(/[,\n;]/)
    .map((e) => e.trim())
    .filter(Boolean);
}

function moveEntry(entries: string[], from: number, to: number): string[] {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= entries.length ||
    to >= entries.length
  )
    return entries;
  const next = [...entries];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

// ─── Tutorial tooltip ─────────────────────────────────────────────────────────

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

// ─── Entry list ───────────────────────────────────────────────────────────────

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
                  className={`rounded p-1.5 transition-colors ${isPreferred ? "text-[var(--danger)]" : "text-[var(--muted)] hover:text-[var(--danger)]"} ${showHeartTip ? "ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]" : ""}`}
                >
                  <HeartIcon filled={isPreferred} className="h-4 w-4" />
                </button>
              </div>
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
                  disabled={index === 0}
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
                  disabled={index === items.length - 1}
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

// ─── Language selector ────────────────────────────────────────────────────────

/**
 * BCP-47 validation — a tag must be both structurally valid (Intl.Locale)
 * AND semantically recognised (Intl.DisplayNames resolves a human name).
 *   "empty"     – too short to evaluate yet
 *   "invalid"   – fails either check → red border, blocks save
 *   "recognized"– both pass → shows live display-name preview
 */
type TagCheck =
  | { status: "empty" }
  | { status: "invalid"; msg: string }
  | { status: "recognized"; displayName: string };

const displayNames = new Intl.DisplayNames(["en"], { type: "language" });

function checkBCP47(raw: string): TagCheck {
  const v = raw.trim();
  if (v.length < 2) return { status: "empty" };
  try {
    new Intl.Locale(v);
  } catch {
    return { status: "invalid", msg: "Not a valid BCP-47 tag" };
  }
  try {
    const name = displayNames.of(v);
    if (name && name.toLowerCase() !== v.toLowerCase()) {
      return { status: "recognized", displayName: name };
    }
  } catch {
    /* ignore */
  }
  return {
    status: "invalid",
    msg: "Unrecognized language — check the IANA registry",
  };
}

function LanguageSelector({
  value,
  usedLangs,
  onChange,
  onValidityChange,
}: {
  value: string;
  usedLangs: string[];
  onChange: (lang: string) => void;
  onValidityChange: (valid: boolean) => void;
}) {
  const [customMode, setCustomMode] = useState(
    !COMMON_LANGUAGES.some((l) => l.tag === value),
  );
  const [customInput, setCustomInput] = useState(customMode ? value : "");
  const [check, setCheck] = useState<TagCheck>(() =>
    customMode ? checkBCP47(value) : { status: "empty" },
  );

  const availableOptions = COMMON_LANGUAGES.filter(
    (l) => l.tag === value || !usedLangs.includes(l.tag),
  );

  function handleCustomChange(raw: string) {
    setCustomInput(raw);
    const result = checkBCP47(raw);
    setCheck(result);
    onValidityChange(result.status !== "invalid");
    if (result.status === "recognized") onChange(raw.trim());
  }

  function commitCustomTag() {
    const result = checkBCP47(customInput);
    setCheck(result);
    const valid = result.status !== "invalid";
    onValidityChange(valid);
    if (valid && result.status === "recognized") onChange(customInput.trim());
  }

  if (customMode) {
    const isInvalid = check.status === "invalid";
    const borderClass = isInvalid
      ? "border-[var(--danger)]"
      : "border-[var(--border)]";

    return (
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => {
            setCustomMode(false);
            setCheck({ status: "empty" });
            onValidityChange(true);
            onChange(availableOptions[0]?.tag ?? DEFAULT_LANG);
          }}
          className="text-xs text-[var(--muted)] hover:text-[var(--text)]"
          aria-label="Back to language list"
        >
          ↩
        </button>
        <input
          value={customInput}
          onChange={(e) => handleCustomChange(e.target.value)}
          onBlur={commitCustomTag}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitCustomTag();
            }
          }}
          placeholder="BCP-47, e.g. en-GB"
          aria-label="Custom BCP-47 language tag"
          aria-invalid={isInvalid}
          className={`w-32 rounded border bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] ${borderClass}`}
        />
        {check.status === "recognized" && (
          <span className="text-xs text-[var(--muted)]">
            → {check.displayName}
          </span>
        )}
        {check.status === "invalid" && (
          <span className="text-xs text-[var(--danger)]">
            {(check as { msg: string }).msg}
            {" · "}
            <a
              href="https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80"
              title="IANA Language Subtag Registry"
            >
              valid tags ↗
            </a>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <select
        value={value}
        onChange={(e) => {
          if (e.target.value === "__custom__") {
            setCustomMode(true);
            onValidityChange(true);
            return;
          }
          onChange(e.target.value);
        }}
        className="rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        aria-label="Language"
      >
        {availableOptions.map((l) => (
          <option key={l.tag} value={l.tag}>
            {l.label}
          </option>
        ))}
        <option value="__custom__">Other (BCP-47)…</option>
      </select>
    </div>
  );
}

// ─── Single language group card ───────────────────────────────────────────────

interface GroupState {
  lang: string;
  langInvalid?: boolean;
  names: string[];
  preferredNames: string[];
  pronouns: string[];
  preferredPronouns: string[];
  nameInput: string;
  pronounInput: string;
}

function LanguageGroupCard({
  group,
  usedLangs,
  isOnly,
  tutorialStep,
  onChange,
  onRemove,
  onTutorialAdvance,
  onTutorialDismiss,
}: {
  group: GroupState;
  usedLangs: string[];
  isOnly: boolean;
  tutorialStep?: 0 | 1 | 2;
  onChange: (updated: GroupState) => void;
  onRemove: () => void;
  onTutorialAdvance?: () => void;
  onTutorialDismiss?: () => void;
}) {
  const isEnglish = group.lang === DEFAULT_LANG;

  function addNames(raw: string) {
    const additions = splitInput(raw);
    if (additions.length === 0) return;
    onChange({
      ...group,
      names: normalizeEntries([...group.names, ...additions]),
      nameInput: "",
    });
  }

  function addPronouns(raw: string) {
    const additions = splitInput(raw);
    if (additions.length === 0) return;
    onChange({
      ...group,
      pronouns: normalizeEntries([...group.pronouns, ...additions]),
      pronounInput: "",
    });
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5">
      {/* Card header: language label + remove button */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
            Language
          </span>
          <LanguageSelector
            value={group.lang}
            usedLangs={usedLangs}
            onChange={(lang) =>
              onChange({ ...group, lang, langInvalid: false })
            }
            onValidityChange={(valid) =>
              onChange({ ...group, langInvalid: !valid })
            }
          />
        </div>
        {!isEnglish || !isOnly ? (
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)] hover:border-[var(--danger)] hover:text-[var(--danger)]"
            aria-label={`Remove ${langLabel(group.lang)} group`}
          >
            <TrashIcon />
            Remove
          </button>
        ) : null}
      </div>

      {/* Names + Pronouns columns */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Names */}
        <section>
          <h3 className="mb-1 text-base font-semibold text-[var(--text)]">
            Names
          </h3>
          {isEnglish && (
            <p className="mb-3 text-sm text-[var(--muted)]">
              Add one or more names — you can have as many as you like.
            </p>
          )}
          <div className="mb-3 flex gap-2">
            <input
              value={group.nameInput}
              onChange={(e) =>
                onChange({ ...group, nameInput: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addNames(group.nameInput);
                }
              }}
              placeholder="Name, Name 2"
              className="min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
            />
            <button
              type="button"
              onClick={() => addNames(group.nameInput)}
              className="min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]"
            >
              Add
            </button>
          </div>
          <EntryList
            label="names"
            items={group.names}
            preferred={group.preferredNames}
            tutorialStep={isEnglish ? tutorialStep : 0}
            onTutorialAdvance={onTutorialAdvance}
            onTutorialDismiss={onTutorialDismiss}
            onTogglePreferred={(item) =>
              onChange({
                ...group,
                preferredNames: group.preferredNames.includes(item)
                  ? group.preferredNames.filter((e) => e !== item)
                  : [...group.preferredNames, item],
              })
            }
            onMoveUp={(item) => {
              const i = group.names.indexOf(item);
              onChange({ ...group, names: moveEntry(group.names, i, i - 1) });
            }}
            onMoveDown={(item) => {
              const i = group.names.indexOf(item);
              onChange({ ...group, names: moveEntry(group.names, i, i + 1) });
            }}
            onRemove={(item) =>
              onChange({
                ...group,
                names: group.names.filter((e) => e !== item),
                preferredNames: group.preferredNames.filter((e) => e !== item),
              })
            }
          />
        </section>

        {/* Pronouns */}
        <section>
          <h3 className="mb-1 text-base font-semibold text-[var(--text)]">
            Pronouns
          </h3>
          {isEnglish && (
            <p className="mb-3 text-sm text-[var(--muted)]">
              Pick from common options or type your own.
            </p>
          )}
          {isEnglish && (
            <div className="mb-3 flex flex-wrap gap-2">
              {COMMON_PRONOUNS.map((entry) => (
                <button
                  key={entry}
                  type="button"
                  onClick={() => addPronouns(entry)}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text)] hover:border-[var(--accent)]"
                >
                  {entry}
                </button>
              ))}
            </div>
          )}
          <div className="mb-3 flex gap-2">
            <input
              value={group.pronounInput}
              onChange={(e) =>
                onChange({ ...group, pronounInput: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addPronouns(group.pronounInput);
                }
              }}
              placeholder={isEnglish ? "they/them, she/her" : "Add pronoun…"}
              className="min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
            />
            <button
              type="button"
              onClick={() => addPronouns(group.pronounInput)}
              className="min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]"
            >
              Add
            </button>
          </div>
          <EntryList
            label="pronouns"
            items={group.pronouns}
            preferred={group.preferredPronouns}
            onTogglePreferred={(item) =>
              onChange({
                ...group,
                preferredPronouns: group.preferredPronouns.includes(item)
                  ? group.preferredPronouns.filter((e) => e !== item)
                  : [...group.preferredPronouns, item],
              })
            }
            onMoveUp={(item) => {
              const i = group.pronouns.indexOf(item);
              onChange({
                ...group,
                pronouns: moveEntry(group.pronouns, i, i - 1),
              });
            }}
            onMoveDown={(item) => {
              const i = group.pronouns.indexOf(item);
              onChange({
                ...group,
                pronouns: moveEntry(group.pronouns, i, i + 1),
              });
            }}
            onRemove={(item) =>
              onChange({
                ...group,
                pronouns: group.pronouns.filter((e) => e !== item),
                preferredPronouns: group.preferredPronouns.filter(
                  (e) => e !== item,
                ),
              })
            }
          />
        </section>
      </div>
    </div>
  );
}

// ─── ProfileEditor ────────────────────────────────────────────────────────────

interface ProfileEditorProps {
  initialGroups: LanguageGroup[];
  isFirstTime?: boolean;
  profileHref?: string;
}

function groupsToState(groups: LanguageGroup[]): GroupState[] {
  const states = groups.map((g) => ({
    lang: g.lang,
    names: normalizeEntries(g.names),
    preferredNames: normalizeEntries(g.preferredNames).filter((e) =>
      g.names.includes(e),
    ),
    pronouns: normalizeEntries(g.pronouns),
    preferredPronouns: normalizeEntries(g.preferredPronouns).filter((e) =>
      g.pronouns.includes(e),
    ),
    nameInput: "",
    pronounInput: "",
  }));
  // Always ensure English group exists first
  if (!states.some((g) => g.lang === DEFAULT_LANG)) {
    states.unshift({
      lang: DEFAULT_LANG,
      names: [],
      preferredNames: [],
      pronouns: [],
      preferredPronouns: [],
      nameInput: "",
      pronounInput: "",
    });
  }
  return states;
}

export function ProfileEditor({
  initialGroups,
  isFirstTime = false,
  profileHref,
}: ProfileEditorProps) {
  const [groups, setGroups] = useState<GroupState[]>(() =>
    groupsToState(initialGroups),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [tutorialStep, setTutorialStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const done = localStorage.getItem("pronounsblue-tutorial") === "done";
    if (!done) setTutorialStep(1);
  }, []);

  function advanceTutorial() {
    const eng = groups.find((g) => g.lang === DEFAULT_LANG);
    if (tutorialStep === 1) {
      if (eng && eng.names.length >= 2) {
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
    () =>
      groups.some((g) => g.names.length > 0 || g.pronouns.length > 0) &&
      !groups.some((g) => g.langInvalid) &&
      !isSaving,
    [groups, isSaving],
  );

  const usedLangs = groups.map((g) => g.lang);

  function addLanguageGroup() {
    const nextLang =
      COMMON_LANGUAGES.find((l) => !usedLangs.includes(l.tag))?.tag ??
      "x-custom";
    setGroups((prev) => [
      ...prev,
      {
        lang: nextLang,
        names: [],
        preferredNames: [],
        pronouns: [],
        preferredPronouns: [],
        nameInput: "",
        pronounInput: "",
      },
    ]);
    setSaved(false);
  }

  async function saveProfile() {
    setIsSaving(true);
    setError(null);
    setSaved(false);
    try {
      const payload = groups
        .filter((g) => g.names.length > 0 || g.pronouns.length > 0)
        .map(
          ({ lang, names, pronouns, preferredNames, preferredPronouns }) => ({
            lang,
            names,
            pronouns,
            preferredNames: preferredNames.filter((e) => names.includes(e)),
            preferredPronouns: preferredPronouns.filter((e) =>
              pronouns.includes(e),
            ),
          }),
        );

      const response = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groups: payload }),
      });
      const data = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? ((await response.json()) as { error?: string })
        : ({} as { error?: string });
      if (!response.ok)
        throw new Error(data.error || `Server error ${response.status}`);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  }

  const hasUnusedLangs =
    COMMON_LANGUAGES.some((l) => !usedLangs.includes(l.tag)) || true;

  return (
    <div className="space-y-5">
      {isFirstTime && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4">
          <div className="flex items-start">
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
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${saved ? "bg-[var(--accent)] text-[var(--accent-contrast)]" : "border-2 border-[var(--accent)] text-[var(--accent)]"}`}
              >
                {saved ? "✓" : "2"}
              </div>
              <span className="text-xs font-medium text-[var(--text)]">
                Add your info
              </span>
            </div>
            <div
              className="mt-4 h-px flex-1 transition-colors"
              style={{ background: saved ? "var(--accent)" : "var(--border)" }}
            />
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${saved ? "border-[var(--accent)] text-[var(--accent)]" : "border-[var(--border)] text-[var(--muted)]"}`}
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

      {/* Language group cards */}
      {groups.map((group, index) => (
        <LanguageGroupCard
          key={group.lang}
          group={group}
          usedLangs={usedLangs}
          isOnly={groups.length === 1}
          tutorialStep={index === 0 ? tutorialStep : 0}
          onChange={(updated) => {
            setGroups((prev) =>
              prev.map((g, i) => (i === index ? updated : g)),
            );
            setSaved(false);
          }}
          onRemove={() => {
            setGroups((prev) => prev.filter((_, i) => i !== index));
            setSaved(false);
          }}
          onTutorialAdvance={advanceTutorial}
          onTutorialDismiss={dismissTutorial}
        />
      ))}

      {/* Add language button */}
      {hasUnusedLangs && (
        <button
          type="button"
          onClick={addLanguageGroup}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] py-3 text-sm text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
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
            <path d="M5 12h14" />
          </svg>
          Add another language
        </button>
      )}

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
