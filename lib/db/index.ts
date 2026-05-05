import Database from "better-sqlite3";
import { Kysely, SqliteDialect } from "kysely";

const DATABASE_PATH = process.env.DATABASE_PATH || "app.db";

let _db: Kysely<DatabaseSchema> | null = null;

export const getDb = (): Kysely<DatabaseSchema> => {
  if (!_db) {
    const sqlite = new Database(DATABASE_PATH);
    sqlite.pragma("journal_mode = WAL");

    _db = new Kysely<DatabaseSchema>({
      dialect: new SqliteDialect({ database: sqlite }),
    });
  }
  return _db;
};

export interface DatabaseSchema {
  auth_state: AuthStateTable;
  auth_session: AuthSessionTable;
  account: AccountTable;
  status: StatusTable;
  profile: ProfileTable;
  name_record: NameRecordTable;
  pronoun_record: PronounRecordTable;
}

interface AuthStateTable {
  key: string;
  value: string;
}

interface AuthSessionTable {
  key: string;
  value: string;
}

export interface AccountTable {
  did: string;
  handle: string;
  active: 0 | 1;
}

export interface StatusTable {
  uri: string;
  authorDid: string;
  status: string;
  createdAt: string;
  indexedAt: string;
  current: 0 | 1;
}

export interface ProfileTable {
  uri: string;
  authorDid: string;
  names: string;
  pronouns: string;
  preferredNames: string;
  preferredPronouns: string;
  createdAt: string;
  updatedAt: string;
  indexedAt: string;
  current: 0 | 1;
}

export interface NameRecordTable {
  uri: string;
  authorDid: string;
  value: string;
  preferred: 0 | 1;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  indexedAt: string;
}

export interface PronounRecordTable {
  uri: string;
  authorDid: string;
  value: string;
  preferred: 0 | 1;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  indexedAt: string;
}
