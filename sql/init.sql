CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) UNIQUE NOT NULL,
  profile_picture VARCHAR(255)
);
