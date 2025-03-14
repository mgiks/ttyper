package hashing

import (
	"crypto/rand"
	b64 "encoding/base64"
	"log"
	"math/big"
	"strconv"
	"strings"

	"golang.org/x/crypto/argon2"
	"golang.org/x/crypto/bcrypt"
)

func GenerateSalt() ([]byte, error) {
	int := big.NewInt(256)
	ints := make([]byte, 0)

	for range 16 {
		n, err := rand.Int(rand.Reader, int)
		if err != nil {
			log.Printf("Random number generation failed: %v\n", err)
			return []byte{}, err
		}
		ints = append(ints, byte(n.Int64()))
	}

	return ints, nil
}

func HashAndSalt(password string, salt string) (string, error) {
	time := 1
	memory := 64 * 1024
	threads := 4
	hash := argon2.IDKey(
		[]byte(password),
		[]byte(salt),
		uint32(time),
		uint32(memory),
		uint8(threads),
		32,
	)

	b64Hash := b64.StdEncoding.EncodeToString(hash)
	b64Salt := b64.StdEncoding.EncodeToString([]byte(salt))

	conv := strconv.Itoa
	params := []string{
		"argon2",
		conv(time),
		conv(memory),
		conv(threads),
		b64Salt,
		b64Hash,
	}
	result := strings.Join(params, "$")

	return result, nil
}

func CompareToHash(password string, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		log.Printf("Comparison to hash failed: %v\n", err)
		return false
	}
	return true
}
