import { describe, expect, it } from "vitest";
import { aggregateEntriesByLang } from "~/lib/atproto/records";

describe("aggregateEntriesByLang", () => {
  it("keeps the newest duplicate and preserves deterministic ordering", () => {
    const groups = aggregateEntriesByLang([
      {
        uri: "at://did:plc:test/blue.pronouns.name/old",
        value: "Alex",
        preferred: false,
        lang: "en",
        sortOrder: 1,
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
      {
        uri: "at://did:plc:test/blue.pronouns.name/new",
        value: "alex",
        preferred: true,
        lang: "en",
        sortOrder: 2,
        updatedAt: "2026-02-01T00:00:00.000Z",
      },
      {
        uri: "at://did:plc:test/blue.pronouns.name/other",
        value: "Sam",
        preferred: true,
        lang: "en",
        sortOrder: 0,
        updatedAt: "2026-01-01T00:00:00.000Z",
      },
    ]);

    expect(groups.get("en")).toEqual({
      values: ["Sam", "alex"],
      preferred: ["Sam", "alex"],
    });
  });
});
