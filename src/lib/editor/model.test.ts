import { describe, expect, it } from "vitest";
import {
  addEntries,
  createGroup,
  moveEntry,
  normalizeGroups,
  splitEntries,
  validLanguageTag,
} from "./model";

describe("profile editor model", () => {
  it("splits comma, semicolon, and newline separated values", () => {
    expect(splitEntries("Ada, Alex; Sky\nRiver")).toEqual(["Ada", "Alex", "Sky", "River"]);
  });

  it("deduplicates values without changing the first position", () => {
    expect(addEntries(["Ada"], "ada, Alex")).toEqual(["Ada", "Alex"]);
  });

  it("moves entries only within array bounds", () => {
    expect(moveEntry(["one", "two"], 1, -1)).toEqual(["two", "one"]);
    expect(moveEntry(["one", "two"], 0, -1)).toEqual(["one", "two"]);
  });

  it("creates an English group for a new profile", () => {
    expect(normalizeGroups([])).toEqual([createGroup("en")]);
  });

  it("validates language tags with the platform Intl implementation", () => {
    expect(validLanguageTag("en-GB")).toBe(true);
    expect(validLanguageTag("not a language")).toBe(false);
  });
});
