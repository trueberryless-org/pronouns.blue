<script setup lang="ts">
import { DEFAULT_LANG } from "~/lib/atproto/records";
import type { LanguageGroup } from "~/lib/atproto/records";

const props = defineProps<{
  initialGroups: LanguageGroup[];
  isFirstTime?: boolean;
  profileHref?: string;
}>();

// ─── Constants ────────────────────────────────────────────────────────────────

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

function commonLangLabel(tag: string): string {
  return COMMON_LANGUAGES.find((l) => l.tag === tag)?.label ?? tag;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

// ─── BCP-47 validation ────────────────────────────────────────────────────────

type TagCheck =
  | { status: "empty" }
  | { status: "invalid"; msg: string }
  | { status: "recognized"; displayName: string };

const displayNamesIntl = new Intl.DisplayNames(["en"], { type: "language" });

function checkBCP47(raw: string): TagCheck {
  const v = raw.trim();
  if (v.length < 2) return { status: "empty" };
  try {
    new Intl.Locale(v);
  } catch {
    return { status: "invalid", msg: "Not a valid BCP-47 tag" };
  }
  try {
    const name = displayNamesIntl.of(v);
    if (name && name.toLowerCase() !== v.toLowerCase())
      return { status: "recognized", displayName: name };
  } catch {
    /* ignore */
  }
  return {
    status: "invalid",
    msg: "Unrecognized language — check the IANA registry",
  };
}

// ─── Group state ──────────────────────────────────────────────────────────────

interface GroupState {
  lang: string;
  langInvalid?: boolean;
  names: string[];
  preferredNames: string[];
  pronouns: string[];
  preferredPronouns: string[];
  nameInput: string;
  pronounInput: string;
  langCustomMode: boolean;
  langCustomInput: string;
  langCheck: TagCheck;
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
    langCustomMode: !COMMON_LANGUAGES.some((l) => l.tag === g.lang),
    langCustomInput: !COMMON_LANGUAGES.some((l) => l.tag === g.lang)
      ? g.lang
      : "",
    langCheck: !COMMON_LANGUAGES.some((l) => l.tag === g.lang)
      ? checkBCP47(g.lang)
      : { status: "empty" as const },
  }));
  if (!states.some((g) => g.lang === DEFAULT_LANG)) {
    states.unshift({
      lang: DEFAULT_LANG,
      names: [],
      preferredNames: [],
      pronouns: [],
      preferredPronouns: [],
      nameInput: "",
      pronounInput: "",
      langCustomMode: false,
      langCustomInput: "",
      langCheck: { status: "empty" },
    });
  }
  return states;
}

// ─── Component state ──────────────────────────────────────────────────────────

const groups = ref<GroupState[]>(groupsToState(props.initialGroups));
const isSaving = ref(false);
const error = ref<string | null>(null);
const saved = ref(false);
const tutorialStep = ref<0 | 1 | 2>(0);

onMounted(() => {
  const done = localStorage.getItem("pronounsblue-tutorial") === "done";
  if (!done) tutorialStep.value = 1;
});

function advanceTutorial() {
  const eng = groups.value.find((g) => g.lang === DEFAULT_LANG);
  if (tutorialStep.value === 1) {
    if (eng && eng.names.length >= 2) tutorialStep.value = 2;
    else {
      tutorialStep.value = 0;
      localStorage.setItem("pronounsblue-tutorial", "done");
    }
  } else if (tutorialStep.value === 2) {
    tutorialStep.value = 0;
    localStorage.setItem("pronounsblue-tutorial", "done");
  }
}

function dismissTutorial() {
  tutorialStep.value = 0;
  localStorage.setItem("pronounsblue-tutorial", "done");
}

const usedLangs = computed(() => groups.value.map((g) => g.lang));

const canSave = computed(
  () =>
    groups.value.some((g) => g.names.length > 0 || g.pronouns.length > 0) &&
    !groups.value.some((g) => g.langInvalid) &&
    !isSaving.value,
);

// ─── Group mutations ──────────────────────────────────────────────────────────

function updateGroup(index: number, updates: Partial<GroupState>) {
  groups.value = groups.value.map((g, i) =>
    i === index ? { ...g, ...updates } : g,
  );
  saved.value = false;
}

function removeGroup(index: number) {
  groups.value = groups.value.filter((_, i) => i !== index);
  saved.value = false;
}

function addLanguageGroup() {
  const nextLang =
    COMMON_LANGUAGES.find((l) => !usedLangs.value.includes(l.tag))?.tag ??
    "x-custom";
  groups.value = [
    ...groups.value,
    {
      lang: nextLang,
      names: [],
      preferredNames: [],
      pronouns: [],
      preferredPronouns: [],
      nameInput: "",
      pronounInput: "",
      langCustomMode: false,
      langCustomInput: "",
      langCheck: { status: "empty" },
    },
  ];
  saved.value = false;
}

function addNames(index: number) {
  const g = groups.value[index];
  const additions = splitInput(g.nameInput);
  if (!additions.length) return;
  updateGroup(index, {
    names: normalizeEntries([...g.names, ...additions]),
    nameInput: "",
  });
  if (tutorialStep.value === 1 && index === 0) advanceTutorial();
}

function addPronouns(index: number, extra?: string) {
  const g = groups.value[index];
  const raw = extra ?? g.pronounInput;
  const additions = splitInput(raw);
  if (!additions.length) return;
  updateGroup(index, {
    pronouns: normalizeEntries([...g.pronouns, ...additions]),
    pronounInput: "",
  });
}

function togglePreferredName(index: number, item: string) {
  const g = groups.value[index];
  const pn = g.preferredNames.includes(item)
    ? g.preferredNames.filter((e) => e !== item)
    : [...g.preferredNames, item];
  updateGroup(index, { preferredNames: pn });
  if (tutorialStep.value === 1 && index === 0) advanceTutorial();
}

function togglePreferredPronoun(index: number, item: string) {
  const g = groups.value[index];
  const pp = g.preferredPronouns.includes(item)
    ? g.preferredPronouns.filter((e) => e !== item)
    : [...g.preferredPronouns, item];
  updateGroup(index, { preferredPronouns: pp });
}

function moveNameUp(index: number, item: string) {
  const g = groups.value[index];
  const i = g.names.indexOf(item);
  updateGroup(index, { names: moveEntry(g.names, i, i - 1) });
  if (tutorialStep.value === 2 && index === 0) advanceTutorial();
}

function moveNameDown(index: number, item: string) {
  const g = groups.value[index];
  const i = g.names.indexOf(item);
  updateGroup(index, { names: moveEntry(g.names, i, i + 1) });
  if (tutorialStep.value === 2 && index === 0) advanceTutorial();
}

function movePronounUp(index: number, item: string) {
  const g = groups.value[index];
  const i = g.pronouns.indexOf(item);
  updateGroup(index, { pronouns: moveEntry(g.pronouns, i, i - 1) });
}

function movePronounDown(index: number, item: string) {
  const g = groups.value[index];
  const i = g.pronouns.indexOf(item);
  updateGroup(index, { pronouns: moveEntry(g.pronouns, i, i + 1) });
}

function removeName(index: number, item: string) {
  const g = groups.value[index];
  updateGroup(index, {
    names: g.names.filter((e) => e !== item),
    preferredNames: g.preferredNames.filter((e) => e !== item),
  });
}

function removePronoun(index: number, item: string) {
  const g = groups.value[index];
  updateGroup(index, {
    pronouns: g.pronouns.filter((e) => e !== item),
    preferredPronouns: g.preferredPronouns.filter((e) => e !== item),
  });
}

function setGroupLang(index: number, lang: string) {
  updateGroup(index, { lang, langInvalid: false });
}

function enterCustomMode(index: number) {
  updateGroup(index, {
    langCustomMode: true,
    langCheck: { status: "empty" },
    langInvalid: false,
  });
}

function exitCustomMode(index: number) {
  const g = groups.value[index];
  const first =
    COMMON_LANGUAGES.find(
      (l) => l.tag === g.lang || !usedLangs.value.includes(l.tag),
    )?.tag ?? DEFAULT_LANG;
  updateGroup(index, {
    langCustomMode: false,
    langCustomInput: "",
    langCheck: { status: "empty" },
    lang: first,
    langInvalid: false,
  });
}

function handleCustomLangInput(index: number, raw: string) {
  const result = checkBCP47(raw);
  updateGroup(index, {
    langCustomInput: raw,
    langCheck: result,
    langInvalid: result.status === "invalid",
  });
  if (result.status === "recognized") updateGroup(index, { lang: raw.trim() });
}

function commitCustomLang(index: number) {
  const g = groups.value[index];
  const result = checkBCP47(g.langCustomInput);
  updateGroup(index, {
    langCheck: result,
    langInvalid: result.status === "invalid",
  });
  if (result.status === "recognized")
    updateGroup(index, { lang: g.langCustomInput.trim() });
}

// ─── Save ─────────────────────────────────────────────────────────────────────

async function saveProfile() {
  isSaving.value = true;
  error.value = null;
  saved.value = false;
  try {
    const payload = groups.value
      .filter((g) => g.names.length > 0 || g.pronouns.length > 0)
      .map(({ lang, names, pronouns, preferredNames, preferredPronouns }) => ({
        lang,
        names,
        pronouns,
        preferredNames: preferredNames.filter((e) => names.includes(e)),
        preferredPronouns: preferredPronouns.filter((e) =>
          pronouns.includes(e),
        ),
      }));
    const { getAuthenticatedClient } = await import("~/lib/auth/oauth.client");
    const { publishProfileRecords } = await import("~/lib/atproto/publisher");
    const did = useState<string | null>("auth-did").value;
    if (!did)
      throw new Error("Your session has expired. Please sign in again.");
    const rpc = await getAuthenticatedClient(did);
    await publishProfileRecords(rpc, did, payload);
    saved.value = true;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to save profile";
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- First-time setup progress bar -->
    <div
      v-if="isFirstTime"
      class="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-4"
    >
      <div class="flex items-start">
        <div class="flex shrink-0 flex-col items-center gap-1.5">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-[var(--accent-contrast)]"
          >
            ✓
          </div>
          <span class="text-xs font-medium text-[var(--text)]">Sign in</span>
        </div>
        <div
          class="mt-4 h-px flex-1"
          :style="{ background: 'var(--accent)' }"
        />
        <div class="flex shrink-0 flex-col items-center gap-1.5">
          <div
            :class="[
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
              saved
                ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                : 'border-2 border-[var(--accent)] text-[var(--accent)]',
            ]"
          >
            {{ saved ? "✓" : "2" }}
          </div>
          <span class="text-xs font-medium text-[var(--text)]"
            >Add your info</span
          >
        </div>
        <div
          class="mt-4 h-px flex-1 transition-colors"
          :style="{ background: saved ? 'var(--accent)' : 'var(--border)' }"
        />
        <div class="flex shrink-0 flex-col items-center gap-1.5">
          <div
            :class="[
              'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors',
              saved
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--muted)]',
            ]"
          >
            3
          </div>
          <span
            :class="[
              'text-xs transition-colors',
              saved ? 'font-medium text-[var(--text)]' : 'text-[var(--muted)]',
            ]"
            >Share</span
          >
        </div>
      </div>
      <div
        v-if="saved && profileHref"
        class="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4"
      >
        <div class="flex items-center gap-2">
          <span class="text-xl">🎉</span>
          <div>
            <p class="text-sm font-semibold text-[var(--text)]">
              You're all set!
            </p>
            <p class="text-xs text-[var(--muted)]">
              Your profile is live and ready to share.
            </p>
          </div>
        </div>
        <NuxtLink
          :to="profileHref"
          class="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-[var(--accent-contrast)] transition-opacity hover:opacity-90"
        >
          View your profile
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </NuxtLink>
      </div>
    </div>

    <!-- Language group cards -->
    <div
      v-for="(group, gIdx) in groups"
      :key="group.lang"
      class="rounded-2xl border border-[var(--border)] bg-[var(--surface-strong)] p-5"
    >
      <!-- Card header -->
      <div class="mb-4 flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span
            class="text-xs font-medium uppercase tracking-wide text-[var(--muted)]"
            >Language</span
          >
          <!-- Custom BCP-47 mode -->
          <div
            v-if="group.langCustomMode"
            class="flex flex-wrap items-center gap-1.5"
          >
            <button
              type="button"
              class="text-xs text-[var(--muted)] hover:text-[var(--text)]"
              aria-label="Back to language list"
              @click="exitCustomMode(gIdx)"
            >
              ↩
            </button>
            <input
              :value="group.langCustomInput"
              placeholder="BCP-47, e.g. en-GB"
              aria-label="Custom BCP-47 language tag"
              :aria-invalid="group.langCheck.status === 'invalid'"
              :class="[
                'w-32 rounded border bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]',
                group.langCheck.status === 'invalid'
                  ? 'border-[var(--danger)]'
                  : 'border-[var(--border)]',
              ]"
              @input="
                handleCustomLangInput(
                  gIdx,
                  ($event.target as HTMLInputElement).value,
                )
              "
              @blur="commitCustomLang(gIdx)"
              @keydown.enter.prevent="commitCustomLang(gIdx)"
            >
            <span
              v-if="group.langCheck.status === 'recognized'"
              class="text-xs text-[var(--muted)]"
              >→
              {{
                (
                  group.langCheck as {
                    status: "recognized";
                    displayName: string;
                  }
                ).displayName
              }}</span
            >
            <span
              v-if="group.langCheck.status === 'invalid'"
              class="text-xs text-[var(--danger)]"
            >
              {{ (group.langCheck as { status: "invalid"; msg: string }).msg }}
              ·
              <a
                href="https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry"
                target="_blank"
                rel="noopener noreferrer"
                class="underline underline-offset-2 hover:opacity-80"
                title="IANA Language Subtag Registry"
                >valid tags ↗</a
              >
            </span>
          </div>
          <!-- Select dropdown mode -->
          <select
            v-else
            :value="group.lang"
            class="rounded border border-[var(--border)] bg-[var(--surface)] px-2 py-0.5 text-xs text-[var(--text)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
            aria-label="Language"
            @change="
              (e) => {
                const v = (e.target as HTMLSelectElement).value;
                if (v === '__custom__') {
                  enterCustomMode(gIdx);
                } else {
                  setGroupLang(gIdx, v);
                }
              }
            "
          >
            <option
              v-for="l in COMMON_LANGUAGES.filter(
                (l) => l.tag === group.lang || !usedLangs.includes(l.tag),
              )"
              :key="l.tag"
              :value="l.tag"
            >
              {{ l.label }}
            </option>
            <option value="__custom__">Other (BCP-47)…</option>
          </select>
        </div>
        <button
          v-if="group.lang !== DEFAULT_LANG || groups.length > 1"
          type="button"
          class="flex items-center gap-1 rounded-full border border-[var(--border)] px-2.5 py-1 text-xs text-[var(--muted)] hover:border-[var(--danger)] hover:text-[var(--danger)]"
          :aria-label="`Remove ${commonLangLabel(group.lang)} group`"
          @click="removeGroup(gIdx)"
        >
          <svg
            viewBox="0 0 24 24"
            class="h-4 w-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          Remove
        </button>
      </div>

      <!-- Names + Pronouns grid -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Names -->
        <section>
          <h3 class="mb-1 text-base font-semibold text-[var(--text)]">Names</h3>
          <p
            v-if="group.lang === DEFAULT_LANG"
            class="mb-3 text-sm text-[var(--muted)]"
          >
            Add one or more names — you can have as many as you like.
          </p>
          <div class="mb-3 flex gap-2">
            <input
              :value="group.nameInput"
              placeholder="Name, Name 2"
              class="min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
              @input="
                updateGroup(gIdx, {
                  nameInput: ($event.target as HTMLInputElement).value,
                })
              "
              @keydown.enter.prevent="addNames(gIdx)"
            >
            <button
              type="button"
              class="min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]"
              @click="addNames(gIdx)"
            >
              Add
            </button>
          </div>
          <p
            v-if="group.names.length === 0"
            class="border-b border-[var(--line)] py-3 text-sm text-[var(--muted)]"
          >
            No names yet.
          </p>
          <ul v-else>
            <li
              v-for="(item, iIdx) in group.names"
              :key="item"
              class="flex items-center gap-3 border-b border-[var(--line)] py-2"
            >
              <span class="flex-1 truncate text-base text-[var(--text)]">{{
                item
              }}</span>
              <div class="flex flex-shrink-0 items-center gap-0.5">
                <!-- Heart tooltip -->
                <div class="relative">
                  <div
                    v-if="tutorialStep === 1 && gIdx === 0 && iIdx === 0"
                    class="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2"
                  >
                    <div
                      class="flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] py-1 pl-3 pr-1.5 text-xs font-medium text-[var(--accent-contrast)] shadow-lg"
                    >
                      mark as preferred
                      <button
                        type="button"
                        aria-label="Dismiss hint"
                        class="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-contrast)]/20 opacity-80 hover:opacity-100"
                        @click.stop="dismissTutorial"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          class="h-2.5 w-2.5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          aria-hidden="true"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <div
                      class="absolute left-1/2 top-full -translate-x-1/2"
                      style="
                        width: 0;
                        height: 0;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 5px solid var(--accent);
                      "
                    />
                  </div>
                  <button
                    type="button"
                    :aria-pressed="group.preferredNames.includes(item)"
                    :aria-label="`${group.preferredNames.includes(item) ? 'Unmark' : 'Mark'} ${item} as preferred`"
                    :class="[
                      'rounded p-1.5 transition-colors',
                      group.preferredNames.includes(item)
                        ? 'text-[var(--danger)]'
                        : 'text-[var(--muted)] hover:text-[var(--danger)]',
                      tutorialStep === 1 && gIdx === 0 && iIdx === 0
                        ? 'ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]'
                        : '',
                    ]"
                    @click="togglePreferredName(gIdx, item)"
                  >
                    <HeartIcon
                      :filled="group.preferredNames.includes(item)"
                      class="h-4 w-4"
                    />
                  </button>
                </div>
                <!-- Order buttons -->
                <div class="relative flex items-center gap-0.5">
                  <div
                    v-if="tutorialStep === 2 && gIdx === 0 && iIdx === 0"
                    class="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2"
                  >
                    <div
                      class="flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--accent)] py-1 pl-3 pr-1.5 text-xs font-medium text-[var(--accent-contrast)] shadow-lg"
                    >
                      set the order
                      <button
                        type="button"
                        aria-label="Dismiss hint"
                        class="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-contrast)]/20 opacity-80 hover:opacity-100"
                        @click.stop="dismissTutorial"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          class="h-2.5 w-2.5"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          aria-hidden="true"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                    <div
                      class="absolute left-1/2 top-full -translate-x-1/2"
                      style="
                        width: 0;
                        height: 0;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 5px solid var(--accent);
                      "
                    />
                  </div>
                  <button
                    type="button"
                    :disabled="iIdx === 0"
                    :class="[
                      'rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40',
                      tutorialStep === 2 && gIdx === 0 && iIdx === 0
                        ? 'ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]'
                        : '',
                    ]"
                    :aria-label="`Move ${item} up`"
                    @click="moveNameUp(gIdx, item)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 19V5" />
                      <path d="m5 12 7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    :disabled="iIdx === group.names.length - 1"
                    :class="[
                      'rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40',
                      tutorialStep === 2 && gIdx === 0 && iIdx === 0
                        ? 'ring-2 ring-[var(--accent)] ring-offset-1 ring-offset-[var(--surface)]'
                        : '',
                    ]"
                    :aria-label="`Move ${item} down`"
                    @click="moveNameDown(gIdx, item)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  class="rounded p-1.5 text-[var(--muted)] hover:text-[var(--danger)]"
                  :aria-label="`Remove ${item}`"
                  @click="removeName(gIdx, item)"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </section>

        <!-- Pronouns -->
        <section>
          <h3 class="mb-1 text-base font-semibold text-[var(--text)]">
            Pronouns
          </h3>
          <p
            v-if="group.lang === DEFAULT_LANG"
            class="mb-3 text-sm text-[var(--muted)]"
          >
            Pick from common options or type your own.
          </p>
          <div
            v-if="group.lang === DEFAULT_LANG"
            class="mb-3 flex flex-wrap gap-2"
          >
            <button
              v-for="entry in COMMON_PRONOUNS"
              :key="entry"
              type="button"
              class="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-sm text-[var(--text)] hover:border-[var(--accent)]"
              @click="addPronouns(gIdx, entry)"
            >
              {{ entry }}
            </button>
          </div>
          <div class="mb-3 flex gap-2">
            <input
              :value="group.pronounInput"
              :placeholder="
                group.lang === DEFAULT_LANG
                  ? 'they/them, she/her'
                  : 'Add pronoun…'
              "
              class="min-h-11 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-base text-[var(--text)]"
              @input="
                updateGroup(gIdx, {
                  pronounInput: ($event.target as HTMLInputElement).value,
                })
              "
              @keydown.enter.prevent="addPronouns(gIdx)"
            >
            <button
              type="button"
              class="min-h-11 rounded-lg bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-contrast)]"
              @click="addPronouns(gIdx)"
            >
              Add
            </button>
          </div>
          <p
            v-if="group.pronouns.length === 0"
            class="border-b border-[var(--line)] py-3 text-sm text-[var(--muted)]"
          >
            No pronouns yet.
          </p>
          <ul v-else>
            <li
              v-for="(item, iIdx) in group.pronouns"
              :key="item"
              class="flex items-center gap-3 border-b border-[var(--line)] py-2"
            >
              <span class="flex-1 truncate text-base text-[var(--text)]">{{
                item
              }}</span>
              <div class="flex flex-shrink-0 items-center gap-0.5">
                <button
                  type="button"
                  :aria-pressed="group.preferredPronouns.includes(item)"
                  :aria-label="`${group.preferredPronouns.includes(item) ? 'Unmark' : 'Mark'} ${item} as preferred`"
                  :class="[
                    'rounded p-1.5 transition-colors',
                    group.preferredPronouns.includes(item)
                      ? 'text-[var(--danger)]'
                      : 'text-[var(--muted)] hover:text-[var(--danger)]',
                  ]"
                  @click="togglePreferredPronoun(gIdx, item)"
                >
                  <HeartIcon
                    :filled="group.preferredPronouns.includes(item)"
                    class="h-4 w-4"
                  />
                </button>
                <div class="flex items-center gap-0.5">
                  <button
                    type="button"
                    :disabled="iIdx === 0"
                    class="rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
                    :aria-label="`Move ${item} up`"
                    @click="movePronounUp(gIdx, item)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 19V5" />
                      <path d="m5 12 7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    :disabled="iIdx === group.pronouns.length - 1"
                    class="rounded p-1.5 text-[var(--muted)] hover:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
                    :aria-label="`Move ${item} down`"
                    @click="movePronounDown(gIdx, item)"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      class="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  class="rounded p-1.5 text-[var(--muted)] hover:text-[var(--danger)]"
                  :aria-label="`Remove ${item}`"
                  @click="removePronoun(gIdx, item)"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Add language button -->
    <button
      type="button"
      class="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--border)] py-3 text-sm text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
      @click="addLanguageGroup"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-4 w-4"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
      Add another language
    </button>

    <p
      v-if="error"
      class="border-b border-[var(--line)] py-2 text-sm text-[var(--danger)]"
    >
      {{ error }}
    </p>
    <p
      v-if="saved && !isFirstTime"
      class="border-b border-[var(--line)] py-2 text-sm text-[var(--success)]"
    >
      Profile updated.
    </p>

    <button
      type="button"
      :disabled="!canSave"
      class="min-h-12 rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-semibold text-[var(--accent-contrast)] disabled:cursor-not-allowed disabled:opacity-50"
      @click="saveProfile"
    >
      {{ isSaving ? "Saving..." : "Save profile" }}
    </button>
  </div>
</template>
