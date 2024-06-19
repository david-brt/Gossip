package main

import (
	"Gossip/backend/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		// AllowOrigins:    []string{"http://localhost:8082"},
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Origin", "content-type", "Accept-Encoding", "Accept-Language", "Cache-Control", "Connection", "Host", "Origin", "Pragma", "Sec-Websocket-Extensions", "Sec-Websocket-Key", "Sec-Websocket-Version", "Upgrade", "User-Agent"},
		AllowWebSockets:  true,
		AllowCredentials: true,
	}))
	hub := newHub()
	go hub.run()
	r.GET("/ws", func(c *gin.Context) {
		w := c.Writer
		r := c.Request
		serveWs(hub, w, r)
	})
	r.POST("/signup", func(c *gin.Context) {
		handlers.Signup(c)
	})
	r.Run(":8910")
}
