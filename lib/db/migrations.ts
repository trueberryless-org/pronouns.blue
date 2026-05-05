import { Kysely, Migration } from "kysely";
import { getDb } from ".";
import { Migrator } from "kysely";

const migrations: Record<string, Migration> = {
  "001": {
    async up(db: Kysely<unknown>) {
      await db.schema
        .createTable("auth_state")
        .addColumn("key", "text", (col) => col.primaryKey())
        .addColumn("value", "text", (col) => col.notNull())
        .execute();

      await db.schema
        .createTable("auth_session")
        .addColumn("key", "text", (col) => col.primaryKey())
        .addColumn("value", "text", (col) => col.notNull())
        .execute();

      await db.schema
        .createTable("account")
        .addColumn("did", "text", (col) => col.primaryKey())
        .addColumn("handle", "text", (col) => col.notNull())
        .addColumn("active", "integer", (col) => col.notNull().defaultTo(1))
        .execute();

      await db.schema
        .createTable("status")
        .addColumn("uri", "text", (col) => col.primaryKey())
        .addColumn("authorDid", "text", (col) => col.notNull())
        .addColumn("status", "text", (col) => col.notNull())
        .addColumn("createdAt", "text", (col) => col.notNull())
        .addColumn("indexedAt", "text", (col) => col.notNull())
        .addColumn("current", "integer", (col) => col.notNull().defaultTo(0))
        .execute();

      await db.schema
        .createIndex("status_current_idx")
        .on("status")
        .columns(["current", "indexedAt"])
        .execute();
    },
    async down(db: Kysely<unknown>) {
      await db.schema.dropTable("status").execute();
      await db.schema.dropTable("account").execute();
      await db.schema.dropTable("auth_session").execute();
      await db.schema.dropTable("auth_state").execute();
    },
  },
  "002": {
    async up(db: Kysely<unknown>) {
      await db.schema
        .createTable("profile")
        .addColumn("uri", "text", (col) => col.primaryKey())
        .addColumn("authorDid", "text", (col) => col.notNull())
        .addColumn("names", "text", (col) => col.notNull())
        .addColumn("pronouns", "text", (col) => col.notNull())
        .addColumn("createdAt", "text", (col) => col.notNull())
        .addColumn("updatedAt", "text", (col) => col.notNull())
        .addColumn("indexedAt", "text", (col) => col.notNull())
        .addColumn("current", "integer", (col) => col.notNull().defaultTo(0))
        .execute();

      await db.schema
        .createIndex("profile_current_idx")
        .on("profile")
        .columns(["current", "indexedAt"])
        .execute();
    },
    async down(db: Kysely<unknown>) {
      await db.schema.dropTable("profile").execute();
    },
  },
  "003": {
    async up(db: Kysely<unknown>) {
      await db.schema
        .alterTable("profile")
        .addColumn("preferredNames", "text", (col) =>
          col.notNull().defaultTo("[]"),
        )
        .execute();
      await db.schema
        .alterTable("profile")
        .addColumn("preferredPronouns", "text", (col) =>
          col.notNull().defaultTo("[]"),
        )
        .execute();
    },
    async down(db: Kysely<unknown>) {
      await db.schema
        .alterTable("profile")
        .dropColumn("preferredPronouns")
        .execute();
      await db.schema
        .alterTable("profile")
        .dropColumn("preferredNames")
        .execute();
    },
  },
  "004": {
    async up(db: Kysely<unknown>) {
      await db.schema
        .createTable("name_record")
        .addColumn("uri", "text", (col) => col.primaryKey())
        .addColumn("authorDid", "text", (col) => col.notNull())
        .addColumn("value", "text", (col) => col.notNull())
        .addColumn("preferred", "integer", (col) => col.notNull().defaultTo(0))
        .addColumn("createdAt", "text", (col) => col.notNull())
        .addColumn("updatedAt", "text", (col) => col.notNull())
        .addColumn("indexedAt", "text", (col) => col.notNull())
        .execute();
      await db.schema
        .createIndex("name_record_author_idx")
        .on("name_record")
        .columns(["authorDid", "updatedAt"])
        .execute();
      await db.schema
        .createIndex("name_record_indexed_idx")
        .on("name_record")
        .columns(["indexedAt"])
        .execute();

      await db.schema
        .createTable("pronoun_record")
        .addColumn("uri", "text", (col) => col.primaryKey())
        .addColumn("authorDid", "text", (col) => col.notNull())
        .addColumn("value", "text", (col) => col.notNull())
        .addColumn("preferred", "integer", (col) => col.notNull().defaultTo(0))
        .addColumn("createdAt", "text", (col) => col.notNull())
        .addColumn("updatedAt", "text", (col) => col.notNull())
        .addColumn("indexedAt", "text", (col) => col.notNull())
        .execute();
      await db.schema
        .createIndex("pronoun_record_author_idx")
        .on("pronoun_record")
        .columns(["authorDid", "updatedAt"])
        .execute();
      await db.schema
        .createIndex("pronoun_record_indexed_idx")
        .on("pronoun_record")
        .columns(["indexedAt"])
        .execute();
    },
    async down(db: Kysely<unknown>) {
      await db.schema.dropTable("pronoun_record").execute();
      await db.schema.dropTable("name_record").execute();
    },
  },
  "005": {
    async up(db: Kysely<unknown>) {
      await db.schema
        .alterTable("name_record")
        .addColumn("sortOrder", "integer", (col) => col.notNull().defaultTo(0))
        .execute();
      await db.schema
        .createIndex("name_record_author_sort_idx")
        .on("name_record")
        .columns(["authorDid", "sortOrder", "updatedAt"])
        .execute();

      await db.schema
        .alterTable("pronoun_record")
        .addColumn("sortOrder", "integer", (col) => col.notNull().defaultTo(0))
        .execute();
      await db.schema
        .createIndex("pronoun_record_author_sort_idx")
        .on("pronoun_record")
        .columns(["authorDid", "sortOrder", "updatedAt"])
        .execute();
    },
    async down(db: Kysely<unknown>) {
      await db.schema.dropIndex("pronoun_record_author_sort_idx").execute();
      await db.schema
        .alterTable("pronoun_record")
        .dropColumn("sortOrder")
        .execute();

      await db.schema.dropIndex("name_record_author_sort_idx").execute();
      await db.schema
        .alterTable("name_record")
        .dropColumn("sortOrder")
        .execute();
    },
  },
};

export function getMigrator() {
  const db = getDb();
  return new Migrator({
    db,
    provider: {
      getMigrations: async () => migrations,
    },
  });
}
