-- name: GetUser :one
SELECT * FROM users WHERE user_id = $1 LIMIT 1;

-- name: ExistsUserByPhoneNumber :one
SELECT EXISTS (SELECT 1 FROM users WHERE phone_number = $1) AS exists;

-- name: GetUserByPhoneNumber :one
SELECT * FROM users WHERE phone_number = $1 LIMIT 1;

-- name: GetSession :one
SELECT * FROM sessions
WHERE user_id = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (phone_number)
VALUES ($1)
RETURNING user_id;

-- name: CreateSession :one
INSERT INTO sessions (user_id, session_id)
VALUES ($1, $2)
RETURNING *;
