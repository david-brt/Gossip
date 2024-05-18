import * as SQLite from "expo-sqlite";

const create_table_statements = `
  CREATE TABLE IF NOT EXISTS db_version (
    version INTEGER
  );

  CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY,
    phone_number TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    profile_picture TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS chat (
    chat_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS message (
    message_id INTEGER PRIMARY KEY,
    chat_id INTEGER,
    sender_id INTEGER,
    anonymous INTEGER NOT NULL,
    sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chat(chat_id),
    FOREIGN KEY (sender_id) REFERENCES user(user_id)
  );

  CREATE TABLE IF NOT EXISTS chat_member (
    chat_id INTEGER,
    member_id INTEGER,
    member_role TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chat(chat_id),
    FOREIGN KEY (member_id) REFERENCES user(user_id)
  );
`;

const drop_table_statements = [
  "DROP TABLE IF EXISTS chat_member;",
  "DROP TABLE IF EXISTS message;",
  "DROP TABLE IF EXISTS chat;",
  "DROP TABLE IF EXISTS user;",
];

const migration = {
  version: 0,
  up: async (db: SQLite.SQLiteDatabase) => {
    try {
      await db.execAsync(create_table_statements);
      console.log("tables created");
      await db.runAsync("INSERT INTO db_version (version) VALUES (0);");
      await db.runAsync(
        "CREATE INDEX IF NOT EXISTS idx_phone_number ON user(phone_number);",
      );
    } catch (e) {
      console.log(e);
    }
  },
  down: async (db: SQLite.SQLiteDatabase) => {
    for (const statement in drop_table_statements) {
      await db.execAsync(statement);
    }
  },
};

export default migration;
