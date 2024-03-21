package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/google/uuid"

	"Gossip/backend/dataaccess"

	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgtype"
)

type PhoneNumber struct {
	Number string `json:"number"`
}

func Signup(c *gin.Context) {
	var json PhoneNumber
	if err := c.ShouldBindJSON(&json); err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusBadRequest, gin.H{"error": "An error occured."})
		return
	}

	userId, err := numberExists(json.Number)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occured."})
		return
	}

	message := "User signed in"
	if userId == -1 {
		message = "User created"
		userId, err = createUser(json.Number)
		if err != nil {
			log.Println(err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occured."})
			return
		}
	}

	sessionId, err := createSession(userId)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occured."})
		return

	}

	c.JSON(http.StatusOK, gin.H{
		"message": message,
		"session": sessionId})
	return

}

func numberExists(number string) (int32, error) {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, "host=db user=gossip dbname=gossip password=postgres")
	if err != nil {
		return -1, err
	}

	defer conn.Close(ctx)

	queries := dataaccess.New(conn)

	id, err := queries.GetUserByPhoneNumber(ctx, number)
	if err != nil {
		if err == pgx.ErrNoRows {
			return -1, nil
		}
		return -1, err
	}
	return id.UserID, nil
}

func createUser(number string) (int32, error) {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, "host=db user=gossip dbname=gossip password=postgres")
	if err != nil {
		return 0, err
	}

	defer conn.Close(ctx)

	queries := dataaccess.New(conn)

	userId, err := queries.CreateUser(ctx, number)
	return userId, err
}

func createSession(userId int32) (string, error) {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, "host=db user=gossip dbname=gossip password=postgres")
	if err != nil {
		return "", err
	}

	defer conn.Close(ctx)

	queries := dataaccess.New(conn)

	params := dataaccess.CreateSessionParams{
		UserID:    pgtype.Int4{Int32: userId, Valid: true},
		SessionID: uuid.New().String(),
	}

	s, err := queries.CreateSession(ctx, params)
	return s.SessionID, err
}
