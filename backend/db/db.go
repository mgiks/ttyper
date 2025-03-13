package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/mgiks/ttyper/hashing"
)

type database struct {
	url     string
	pool    *pgxpool.Pool
	context context.Context
}

func ConnectToDB(ctx context.Context) *database {
	envs := map[string]string{
		"dbPass": "POSTGRES_PASSWORD",
		"dbPort": "POSTGRES_PORT",
		"dbName": "POSTGRES_DB",
	}

	foundEnvs := make(map[string]string)

	for k, v := range envs {
		env := os.Getenv(v)

		if len(env) == 0 {
			log.Fatalf("Env `%v` not found", v)
		}

		foundEnvs[k] = env
	}

	dbPass := foundEnvs["dbPass"]
	dbPort := foundEnvs["dbPort"]
	dbName := foundEnvs["dbName"]

	dbUrl := fmt.Sprintf(
		"postgres://postgres:%s@localhost:%s/%s",
		dbPass,
		dbPort,
		dbName,
	)

	dbPool, err := pgxpool.New(ctx, dbUrl)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}

	db := database{url: dbUrl, pool: dbPool, context: ctx}

	err = db.pool.Ping(ctx)
	if err != nil {
		log.Fatalf("Unable to ping database: %v\n", err)
	}

	return &db
}

func (db *database) Query(query string, args ...any) (pgx.Rows, error) {
	rows, err := db.pool.Query(db.context, query, args...)
	if err != nil {
		log.Printf("Query `%v` failed: %v\n", query, err)
		return nil, err
	}

	return rows, err
}

func (db *database) QueryRow(query string, args ...any) pgx.Row {
	row := db.pool.QueryRow(db.context, query, args...)

	return row
}

func (db *database) AddText(text string, uploaderName string) (pgx.Rows, error) {
	rows, err := db.Query(
		`INSERT INTO "text"(content, uploader_name) 
		VALUES ($1, $2) RETURNING text, uploader_name`,
		text,
		uploaderName,
	)
	if err != nil {
		return nil, err
	}

	return rows, err
}

func (db *database) AddUser(name string, email string, password string) (pgx.Rows, error) {
	hashedPassword, err := hashing.HashAndSalt(password)
	if err != nil {
		return nil, err
	}

	rows, err := db.Query(
		`INSERT INTO "user"(username, email, password)
		VALUES ($1, $2, $3) RETURNING username, email`,
		name,
		email,
		hashedPassword,
	)
	if err != nil {
		return nil, err
	}

	return rows, nil
}

func (db *database) GetRandomText() pgx.Row {
	row := db.QueryRow(`SELECT * FROM "user" ORDER BY RANDOM()`)

	return row
}
