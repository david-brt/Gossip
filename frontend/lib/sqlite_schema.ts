export const schema = `
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

  CREATE INDEX phone_number ON user(phone_number);
  INSERT INTO db_version (version_number) VALUES (0);
`;
