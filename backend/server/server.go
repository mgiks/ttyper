package server

import (
	"context"
	"log"

	"github.com/joho/godotenv"
	"github.com/mgiks/ttyper/db"
)

type serverConfig struct {
	Db *db.Database
}

var sc serverConfig

func ConfigureServer() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Failed to load environmental variables: %v\n", err)
	}

	db := db.ConnectToDB(context.Background())
	sc.Db = db
}

func GetServerConfig() *serverConfig {
	return &sc
}
