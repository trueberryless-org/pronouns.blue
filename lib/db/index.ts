import { Kysely, PostgresDialect, SqliteDialect } from "kysely";
import { Pool } from "pg";
import Database from "better-sqlite3";

const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_PATH = process.env.DATABASE_PATH ?? "./app.db";

let _db: Kysely<DatabaseSchema> | null = null;

export const getDb = (): Kysely<DatabaseSchema> => {
  if (!_db) {
    if (DATABASE_URL) {
      const url = new URL(DATABASE_URL);
      const isLocal = ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
      const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: isLocal ? false : { rejectUnauthorized: false },
      });
      _db = new Kysely<DatabaseSchema>({
        dialect: new PostgresDialect({ pool }),
      });
    } else {
      _db = new Kysely<DatabaseSchema>({
        dialect: new SqliteDialect({
          database: new Database(DATABASE_PATH),
        }),
      });
    }
  }
  return _db;
};

export interface DatabaseSchema {
  auth_state: AuthStateTable;
  auth_session: AuthSessionTable;
}

interface AuthStateTable {
  key: string;
  value: string;
}

interface AuthSessionTable {
  key: string;
  value: string;
}