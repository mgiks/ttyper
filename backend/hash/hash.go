package hash

import (
	"log"

	"golang.org/x/crypto/bcrypt"
)

func HashAndSalt(password string) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), 12)
	if err != nil {
		log.Printf("Hashing failed: %v\n", err)
	}
	return string(hashedPassword)
}

func CompareToHash(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		log.Printf("Comparison to hash failed: %v\n", err)
		return false
	}
	return true
}
