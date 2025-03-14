package main

import (
	"net/http"

	"github.com/mgiks/ttyper/server"
	"github.com/mgiks/ttyper/typing"
)

func main() {
	server.SetupServer()

	tsMux := typing.NewTypingServer()
	err := http.ListenAndServe(":8000", tsMux)
	if err != nil {
		panic(err)
	}
}
