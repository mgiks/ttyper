package main

import (
	"log"
	"net/http"

	"github.com/mgiks/ttyper/server"
	"github.com/mgiks/ttyper/utils"
)

func main() {
	utils.LoadEnvs()
	if err := http.ListenAndServe(":8000", server.New()); err != nil {
		log.Fatal(err)
	}
}
