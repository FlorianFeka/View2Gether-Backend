package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/googollee/go-socket.io"
)

func main() {
	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.OnConnect("/", func(s socketio.Conn) error {
		fmt.Println("Connected: ", s.ID())
		return nil
	})

	server.OnEvent("/", "joinRoom", func(s socketio.Conn, room string) {
		server.JoinRoom("", room, s)
		fmt.Println("ID: ", s.ID())
		fmt.Println("Joined Room: ", room)
		fmt.Println("Rooms: ", s.Rooms())
	})

	server.OnEvent("/", "sendCommandToRoom", func(s socketio.Conn, room, command string) {
		server.BroadcastToRoom("", room, command)
	})

	server.OnError("/", func(s socketio.Conn, e error) {
		fmt.Println("Error: ", e)
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("Closed: ", reason)
	})

	go server.Serve()
	defer server.Close()

	http.Handle("/", server)
	log.Println("Serving at localhost:8000...")
	log.Fatal(http.ListenAndServe(":8000", nil))
}
