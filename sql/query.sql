-- name: CreateUser :one
INSERT INTO users (username, phone_number)
VALUES ($1, $2)
RETURNING user_id;
