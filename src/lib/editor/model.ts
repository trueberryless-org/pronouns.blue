import type { LanguageGroup } from "../atproto/records";
import { DEFAULT_LANG } from "../atproto/records";

export function createGroup(lang = DEFAULT_LANG): LanguageGroup {
  return {
    lang,
    names: [],
    preferredNames: [],
    pronouns: [],
    preferredPronouns: [],
  };
}

export function normalizeGroups(groups: LanguageGroup[]) {
  return groups.length > 0 ? structuredClone(groups) : [createGroup()];
}

export function splitEntries(value: string) {
  return value
    .split(/[,\n;]/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function addEntries(current: string[], value: string) {
  const entries = [...current, ...splitEntries(value)];
  const entriesByKey = new Map<string, string>();
  for (const entry of entries) {
    const key = entry.toLocaleLowerCase();
    if (!entriesByKey.has(key)) entriesByKey.set(key, entry);
  }
  return [...entriesByKey.values()];
}

export function moveEntry(entries: string[], index: number, offset: number) {
  const target = index + offset;
  if (target < 0 || target >= entries.length) return entries;
  const next = [...entries];
  const [entry] = next.splice(index, 1);
  next.splice(target, 0, entry);
  return next;
}

export function validLanguageTag(tag: string) {
  try {
    return new Intl.Locale(tag).toString().length > 0;
  } catch {
    return false;
  }
}
