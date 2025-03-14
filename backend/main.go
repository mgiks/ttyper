package main

import (
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/mgiks/ttyper/typing"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Failed to load environmental variables: %v\n", err)
	}

	tsMux := typing.NewTypingServer()

	err = http.ListenAndServe(":8000", tsMux)
	if err != nil {
		panic(err)
	}
}
