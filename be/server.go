package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/googollee/go-socket.io"
)

func forEach(c socketio.Conn) {
	c.Emit("test", "testForEach")
}

func main() {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}
	server.OnConnect("/", func(s socketio.Conn) error {
		s.Emit("test", "Testdata");
		server.JoinRoom("", "test", s)
		server.BroadcastToRoom("", "test", "The test for the broadcast.")
		server.ForEach("", "test", forEach)

		// fmt.Println("connected ID:", s.ID())
		// fmt.Println("connected ROOMS:", s.Rooms())
		// fmt.Println("connected URL:", s.URL())
		return nil
	})
	server.OnEvent("/", "notice", func(s socketio.Conn, msg string) {
		// server.ForEach("" ,"test", forEach)
		fmt.Println("notice:", msg)
		s.Emit("reply", "have "+msg)
	})
	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("meet error:", e)
	})
	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("closed", reason)
	})
	go server.Serve()
	defer server.Close()

	http.Handle("/", server)
	log.Println("Serving at localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
