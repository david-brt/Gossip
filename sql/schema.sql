CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  phone_number TEXT UNIQUE NOT NULL,
  profile_picture TEXT
);

CREATE INDEX IF NOT EXISTS idx_users_phone_number ON users (phone_number);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
