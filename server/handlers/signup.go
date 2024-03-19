package handlers

import (
	"log"
	"net/http"

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

	log.Println(json.Number)

	c.JSON(http.StatusOK, gin.H{
		"message": "You are on the signup page!",
	})
}
