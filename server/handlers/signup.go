package handlers

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Signup(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "You are on the signup page!",
	})
}