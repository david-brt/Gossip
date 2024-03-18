package main

import (
	"Gossip/backend/handlers"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	r := gin.Default()
	r.GET("/ws", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.GET("/signup", func(c *gin.Context) {
		handlers.Signup(c)
	})
	r.GET("/login", func(c *gin.Context) {
		handlers.Login(c)
	})
	r.Run(":8910")
}
