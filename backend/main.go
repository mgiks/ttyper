package main

import (
	"log"
	"net/http"

	"github.com/mgiks/ttyper/server"
	"github.com/mgiks/ttyper/typing"
)

func main() {
	server.ConfigureServer()

	tsMux := typing.NewTypingServer()
	err := http.ListenAndServe(":8000", tsMux)
	if err != nil {
		log.Fatal(err)
	}
}
