package utils

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnvs() {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Failed to load environmental variables: %v\n", err)
	}
}
