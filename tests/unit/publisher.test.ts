import type { Client } from "@atcute/client";
import { describe, expect, it, vi } from "vitest";
import { publishProfileRecords } from "~/lib/atproto/publisher";

describe("publishProfileRecords", () => {
  it("replaces each collection with the ordered profile entries", async () => {
    const get = vi.fn(
      async (_method: string, options: { params: { collection: string } }) => ({
        ok: true,
        data: {
          records:
            options.params.collection === "blue.pronouns.name"
              ? [{ uri: "at://did:plc:test/blue.pronouns.name/old-name" }]
              : [
                  {
                    uri: "at://did:plc:test/blue.pronouns.pronoun/old-pronoun",
                  },
                ],
        },
      }),
    );
    const post = vi.fn<
      (
        method: string,
        options: unknown,
      ) => Promise<{ ok: boolean; data: object }>
    >(async () => ({ ok: true, data: {} }));
    const rpc = { get, post } as unknown as Client;

    await publishProfileRecords(rpc, "did:plc:test", [
      {
        lang: "en",
        names: ["Alex"],
        preferredNames: ["Alex"],
        pronouns: ["they/them"],
        preferredPronouns: [],
      },
    ]);

    expect(get).toHaveBeenCalledTimes(2);
    expect(post).toHaveBeenCalledTimes(4);
    expect(post).toHaveBeenNthCalledWith(
      1,
      "com.atproto.repo.deleteRecord",
      expect.objectContaining({
        input: expect.objectContaining({
          collection: "blue.pronouns.name",
          rkey: "old-name",
        }),
      }),
    );
    expect(post).toHaveBeenNthCalledWith(
      2,
      "com.atproto.repo.deleteRecord",
      expect.objectContaining({
        input: expect.objectContaining({
          collection: "blue.pronouns.pronoun",
          rkey: "old-pronoun",
        }),
      }),
    );
    expect(post).toHaveBeenNthCalledWith(
      3,
      "com.atproto.repo.createRecord",
      expect.objectContaining({
        input: expect.objectContaining({
          collection: "blue.pronouns.name",
          record: expect.objectContaining({
            value: "Alex",
            preferred: true,
            lang: "en",
            sortOrder: 0,
          }),
        }),
      }),
    );
    expect(post).toHaveBeenNthCalledWith(
      4,
      "com.atproto.repo.createRecord",
      expect.objectContaining({
        input: expect.objectContaining({
          collection: "blue.pronouns.pronoun",
          record: expect.objectContaining({
            value: "they/them",
            preferred: false,
            lang: "en",
            sortOrder: 0,
          }),
        }),
      }),
    );
  });
});
