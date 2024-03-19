package handlers

import (
	"context"
	"log"
	"net/http"

	"github.com/jackc/pgx/v5"

	"Gossip/backend/dataaccess"

	"github.com/gin-gonic/gin"
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

	exists, err := numberExists(json.Number)
	if err != nil {
		log.Println(err.Error())
		c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occured."})
		return
	}

	if exists {
		c.JSON(http.StatusOK, gin.H{
			"message": "User exists",
		})
		return
	}
}

func numberExists(number string) (bool, error) {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, "host=db user=gossip dbname=gossip password=postgres")
	if err != nil {
		return false, err
	}

	defer conn.Close(ctx)

	queries := dataaccess.New(conn)

	exists, err := queries.ExistsUserByPhoneNumber(ctx, number)

	if err != nil {
		return false, err
	}

	return exists, nil
}
