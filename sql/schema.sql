CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username TEXT,
  phone_number TEXT UNIQUE NOT NULL,
  profile_picture TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  user_id SERIAl REFERENCES users(user_id),
  session_id TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP + INTERVAL '5 years'
);

CREATE INDEX IF NOT EXISTS idx_users_phone_number ON users (phone_number);
CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
