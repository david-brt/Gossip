-- name: GetUser :one
SELECT * FROM users WHERE user_id = $1 LIMIT 1;

-- name: ExistsUserByPhoneNumber :one
SELECT EXISTS (SELECT 1 FROM users WHERE phone_number = $1) AS exists;

-- name: GetUserByPhoneNumber :one
SELECT * FROM users WHERE phone_number = $1 LIMIT 1;

-- name: CreateUser :one
INSERT INTO users (username, phone_number)
VALUES ($1, $2)
RETURNING user_id;
